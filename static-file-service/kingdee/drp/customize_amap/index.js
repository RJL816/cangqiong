(function (KDApi) {
  function MyComponent(model) {
    this._setModel(model);
  }

  MyComponent.prototype = {
    _setModel: function (model) {
      this.model = model;
    },
    init: function (props) {
      this.model.invoke("getPointData", "");
    },
    update: function (props) {
      if (typeof AMapLoader === "undefined") {
        window._AMapSecurityConfig = {
          securityJsCode: "b1eac57789338914bec6be1d60b5991e",
        };
        var url = "https://webapi.amap.com/loader.js";
        var jsapi = document.createElement("script");
        jsapi.src = url;
        document.head.appendChild(jsapi);
      }
      if(props&&props.data){
        setHtml(this.model, props); //设置html
      }
    },
    destoryed: function () {},
  };
  var map;
  function initList(res, model) {
    document.querySelectorAll('#cusMapPanel')[0].setAttribute('type',res.type);
    if(res.type === 3){
      if(navigator.userAgent.match(/Mobile/)){
        document.querySelectorAll('#cusMapPanel')[0].style.width = document.body.clientWidth + 'px';
        document.querySelectorAll('#cusMapPanel')[0].style.height = document.body.clientHeight + 'px';
      }else{
        var w = $('#cusMapPanel').closest('body')[0].clientWidth
        var h = $('#cusMapPanel').closest('body')[0].clientHeight
        document.querySelectorAll('#cusMapPanel')[0].style.width = w + 'px';
        document.querySelectorAll('#cusMapPanel')[0].style.height = h + 'px';
      }
    }else{
      var w = document.querySelectorAll('#container')[0].parentElement.parentElement.clientWidth
      var h = document.querySelectorAll('#container')[0].parentElement.parentElement.clientHeight
      document.querySelectorAll('#container')[0].style.width = w + 'px';
      document.querySelectorAll('#container')[0].style.height = h + 'px';
    }
    var pointlist = res.pointlist;
    AMapLoader.load({
      key: "bea635339d01702e6a2be105559c120d", // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "1.4.15", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      AMapUI: {
        // 是否加载 AMapUI，缺省不加载
        version: "1.1", // AMapUI 缺省 1.1
        plugins: ["overlay/SimpleMarker"], // 需要加载的 AMapUI ui插件
      },
      Loca: {
        // 是否加载 Loca， 缺省不加载
        version: "1.3.2", // Loca 版本，缺省 1.3.2
      },
    })
      .then((AMap) => {
        let mapobj = { 
          zoom: 15, //设置地图显示的缩放级别
          viewMode: "2D", //设置地图模式
          lang: "zh_cn", //设置地图语言类型
          resizeEnable: true,
        };
        if (res.type === 1) {
          let center;
          if (pointlist && pointlist.length > 0) {
            center = pointlist.find((p) => {
              return p.radius && p.radius > 0;
            });
            if (!center) {
              center = pointlist[0];
            }
          }
          if (center) {
            mapobj["center"] = [center.point.lng, center.point.lat];
          }
          map = new AMap.Map("container", mapobj);
          map.on("complete", function () {
            console.log("地图1加载完成！");
            model.invoke("mapComplete",'');
          });
          for (var i = 0; i < pointlist.length; i++) {
            let obj = {
              position: new AMap.LngLat(
                pointlist[i].point.lng,
                pointlist[i].point.lat
              ),
              title: pointlist[i].title,
              clickable: true,
            };
            if (pointlist[i].icon) {
              //显示自定义图标的标记点
              // 创建 AMap.Icon 实例：
              var icon = new AMap.Icon({
                size: new AMap.Size(20, 20),
                image: pointlist[i].icon,
                imageOffset: new AMap.Pixel(0, 0),
                imageSize: new AMap.Size(20, 20),
              });
              obj["icon"] = icon;
            }
            if (pointlist[i].radius) {
              if (pointlist[i].icon) {
                obj["offset"] = new AMap.Pixel(-10, -10);
              } else {
                obj["offset"] = new AMap.Pixel(-10, -30);
              }
            }
            var marker = new AMap.Marker(obj);
            map.add(marker);
            var content = $("<div class='info' index='"+i+"'><i class='iconfont icon-guanbi'></i><div></div></div>")
            if(!pointlist[i].showtitle){
              content.addClass('not-show')
            }
            if(pointlist[i].title){
              content.find('i+div').append("<p>"  + pointlist[i].title + "</p>")
            }
            if(pointlist[i].province || pointlist[i].city){
                content.find('i+div').append("<p><span>"  + (pointlist[i].province||'') + '</span><span>' + (pointlist[i].city||'') + "</span></p>")
            }
            if(pointlist[i].address){
              content.find('i+div').append("<p>"  + pointlist[i].address + "</p>")
            }
            var labelobj = {
              offset: new AMap.Pixel(0, -10),
              content:content[0].outerHTML,
              direction: "top",
              index:i
            }
            marker.setLabel(labelobj);
            AMap.event.addListener(marker, 'click', function(e) {
              var obj = e.target.getLabel();
              $('.info[index="'+obj.index+'"]').removeClass('not-show').removeClass('p-hide');
            })
            if (pointlist[i].radius) {
              var fpx = metreConvertToPx(pointlist[i].radius,pointlist[i])
              //带圆圈范围的标记点
              var circle = new AMap.Circle({
                center: new AMap.LngLat(
                  pointlist[i].point.lng,
                  pointlist[i].point.lat
                ),
                radius: fpx,
                fillColor: "rgba(39, 111, 245,0.2)",
                strokeColor: "rgb(39, 111, 245)",
                strokeWeight: 1,
              });
              map.add(circle);
            }
          }
          setTimeout(function(){
            $('.not-show').addClass('p-hide')
          },500)
        }else if(res.type === 2){
          //货车路线
          let center;
          if (pointlist && pointlist.length > 0) {
            center = pointlist.find((p) => {
              return p.radius && p.radius > 0;
            });
            if (!center) {
              center = pointlist[0];
            }
          }
          if (center) {
            mapobj["center"] = [center.point.lng, center.point.lat];
          }
          mapobj.zoom = 17
          map = new AMap.Map("container", mapobj);
          map.on("complete", function () {
            console.log("地图type2加载完成！");
            model.invoke("mapComplete", '');
          });
          var path = [];
          var startMarkerOptions,midMarkerOptions,endMarkerOptions;
          for (var i = 0; i < pointlist.length; i++) {
            path.push([pointlist[i].point.lng, pointlist[i].point.lat]);
            let obj = {
                position: new AMap.LngLat(
                  pointlist[i].point.lng,
                  pointlist[i].point.lat
                ),
                title: pointlist[i].title,
                clickable: true,
              };
              if (pointlist[i].icon) {
                //显示自定义图标的标记点
                // 创建 AMap.Icon 实例：
                var icon = new AMap.Icon({
                  size: new AMap.Size(20, 20),
                  image: pointlist[i].icon,
                  imageOffset: new AMap.Pixel(0, 0),
                  imageSize: new AMap.Size(20, 20),
                });
                obj["icon"] = icon;
              }else{
                if(i === 0){
                  defaulticon = 'https://webapi.amap.com/theme/v1.3/markers/n/start.png'
                }else if(i === pointlist.length - 1){
                  defaulticon = 'https://webapi.amap.com/theme/v1.3/markers/n/end.png'
                }else{
                  defaulticon = 'https://webapi.amap.com/theme/v1.3/markers/n/mid.png'
                }
                obj["icon"] = defaulticon;
              }
              if (pointlist[i].radius) {
                if (pointlist[i].icon) {
                  obj["offset"] = new AMap.Pixel(-10, -10);
                } else {
                  obj["offset"] = new AMap.Pixel(-10, -30);
                }
              }
              var content = $("<div class='info' index='"+i+"'><i class='iconfont icon-guanbi'></i><div></div></div>")
              if(!pointlist[i].showtitle){
                content.addClass('not-show')
              }
              if(pointlist[i].title){
                content.find('i+div').append("<p>"  + pointlist[i].title + "</p>")
              }
              if(pointlist[i].province || pointlist[i].city){
                content.find('i+div').append("<p><span>"  + (pointlist[i].province||'') + "</span><span>" + (pointlist[i].city||'') + "</span></p>")
              }
              if(pointlist[i].address){
                content.find('i+div').append("<p>"  + pointlist[i].address + "</p>")
              }
              var labelobj = {
                offset: new AMap.Pixel(0, -10),
                content:content[0].outerHTML,
                direction: "top",
                index:i,
                extData:i
              }
              obj['label'] = labelobj
            var marker = new AMap.Marker(obj);
            map.add(marker);
            if(i === 0){
              startMarkerOptions = marker;
            }else if(i === pointlist.length -1){
              endMarkerOptions = marker;
            }else{
              midMarkerOptions = marker;
            }
            marker.setLabel(labelobj);
            AMap.event.addListener(marker, 'click', function(e) {
              var obj = e.target.getLabel();
              $('.info[index="'+obj.index+'"]').removeClass('not-show').removeClass('p-hide');
            })
              if (pointlist[i].radius) {
                var fpx = metreConvertToPx(pointlist[i].radius,pointlist[i])
                //带圆圈范围的标记点
                var circle = new AMap.Circle({
                  center: new AMap.LngLat(
                    pointlist[i].point.lng,
                    pointlist[i].point.lat
                  ),
                  radius: fpx,
                  fillColor: "rgba(39, 111, 245,0.2)",
                  strokeColor: "rgb(39, 111, 245)",
                  strokeWeight: 1,
                });
                map.add(circle);
              }
          }
          setTimeout(function(){
            $('.not-show').addClass('p-hide')
          },500)
          startMarkerOptions['content'] = ' '
          midMarkerOptions['content'] = ' '
          endMarkerOptions['content'] = ' '
          map.plugin("AMap.DragRoute", function () {
            route = new AMap.DragRoute(map, path, AMap.DrivingPolicy.LEAST_FEE,{startMarkerOptions,midMarkerOptions,endMarkerOptions});
            route.search();
          });
        }else if(res.type === 3){
          map = new AMap.Map("container", mapobj);
          var MSearch = null;
          var auto=null;
          var isFromItemClick=false;
          map.plugin(['AMap.PlaceSearch'], function() {
            var PlaceSearchOptions = { //设置PlaceSearch属性
                city: '',
                type: "",
                pageSize: 10,
                pageIndex: 1,
                extensions: "base"
            };
            MSearch = new AMap.PlaceSearch(PlaceSearchOptions);
            AMap.event.addListener(MSearch, "complete", function(res){
              $('#cusMapPanel #searchResult').empty();
              res.poiList.pois.forEach(p=>{
                map.getCity(function(rescity){
                  var locdata = {data:JSON.stringify({
                    address:p.address,
                    title:p.name,
                    city:rescity.city,
                    province:rescity.province,
                    point:{
                      lat:p.location.lat,
                      lng:p.location.lng
                    }
                  })}
                  var n = $('<div class="item" locdata="'+JSON.stringify(locdata)+'"><div><div class="title">'+p.name+'</div><div><span class="detl">'+p.address+'</span></div></div><i class="iconfont icon-duigou"></i></div>')
                  n.attr('locdata',JSON.stringify(locdata))
                  $('#cusMapPanel #searchResult').append(n)
                },[p.location.lng,p.location.lat])
              })
            });
          });
          map.plugin(['AMap.Autocomplete'], function() {
            //let autoOptions = {
            //  city: result.addressComponent.city
            //}
            let autoOptions = {
            }
            auto = new AMap.Autocomplete(autoOptions);
            AMap.event.addListener(auto, "complete", function(response){
              if(isFromItemClick){
                isFromItemClick = false;
                return;
              }
              $('#cusMapPanel #searchResult').empty();
              if(response.tips && response.tips[0]){
                response.tips.forEach(p=>{
                  map.getCity(function(rescity){
                    var locdata = {data:JSON.stringify({
                      address:p.address,
                      title:p.name,
                      city:rescity.city,
                      province:rescity.province,
                      point:{
                        lat:p.location.lat,
                        lng:p.location.lng
                      }
                    })}
                    var n = $('<div class="item" locdata="'+JSON.stringify(locdata)+'"><div><div class="title">'+p.name+'</div><div><span class="detl">'+p.address+'</span></div></div><i class="iconfont icon-duigou"></i></div>')
                    n.attr('locdata',JSON.stringify(locdata))
                    $('#cusMapPanel #searchResult').append(n)
                  },[p.location.lng,p.location.lat])
                })
                // var n = $('<div class="item" locdata="'+JSON.stringify(locdata)+'"><div><div class="title">'+p.name+'</div><div><span class="detl">'+p.address+'</span></div></div><i class="iconfont icon-duigou"></i></div>')
                //   n.attr('locdata',JSON.stringify(locdata))
                //   $('#cusMapPanel #searchResult').append(n)

                // MSearch.searchNearBy(response.tips[0].name,response.tips[0].location,5000);
              }
            })
          });

          AMap.plugin('AMap.Geolocation', function () {
            var geolocation = new AMap.Geolocation();
            var curLocation = null;
            geolocation.getCurrentPosition(function (status, result) {
              var fromclick = false  
              if (status == 'complete') {
                if ($('#cusMapPanel #mapSearchInput').val()!=""){
                   return;
                }
                  if (curLocation==null){
                    curLocation = {
                      title:result.addressComponent.businessAreas[0].name,
                      address:result.formattedAddress,
                      city:result.addressComponent.city,
                      province:result.addressComponent.province,
                      point:{
                        lat:result.position.lat,
                        lng:result.position.lng,
                      }
                    }
                    map.setCenter([result.position.lng, result.position.lat]);//传入经纬度移动地图的方法
                    auto.setCity(result.addressComponent.city);
                    if (MSearch!=null){
                      MSearch.searchNearBy('',new AMap.LngLat(
                        result.position.lng,
                        result.position.lat
                      ),5000);
                   }
                  }
                } else {
                  console.log('失败原因排查信息:' + result.message);
                }
                $('#cusMapPanel #mapSearchInput').on('blur change',function(){
                  auto.search($(this).val()); 
                })
                $('body').on('click','#cusMapPanel #searchResult .item',function(){
                  $(this).addClass('active').siblings().removeClass('active');
                  curLocation = JSON.parse($(this).attr('locdata'))
                  curLocation = JSON.parse(curLocation.data)
                  var lat = curLocation.point.lat
                  var lng = curLocation.point.lng
                  fromclick = true
                  isFromItemClick=true
                  map.setCenter([lng, lat]);
                })
                $('body').on('click','#cusMapPanel .cancel.btn',function(){
                  $(this).closest('#cusMapPanel').remove();
                  model.invoke("close");
                })
                $('body').on('click','#cusMapPanel .confirm.btn',function(){
                  model.invoke("updateValue",JSON.stringify(curLocation));
                  $(this).closest('#cusMapPanel').remove();
                  model.invoke("close");
                })
                AMapUI.loadUI(['misc/PositionPicker'], function (PositionPicker) {
                  var positionPicker = new PositionPicker({
                      mode: 'dragMap',//dragMap：拖拽地图，dragMarker：拖拽点
                      map: map
                  });
                  positionPicker.on('success', function (positionResult) {
                      //拖拽成功的回调 positionResult里有你想要的东西
                      if(fromclick){
                        setTimeout(function(){
                          fromclick = false
                        },10)
                      }else{
                        $('#cusMapPanel #mapSearchInput').val('')
                        $('#cusMapPanel #searchResult').empty();
                        var city = positionResult.regeocode.addressComponent.city
                        var province = positionResult.regeocode.addressComponent.province
                        var address = positionResult.regeocode.formattedAddress.replace(city,'').replace(province,'')                        
                        curLocation = {
                          address:address,
                          title:positionResult.regeocode.addressComponent.building,
                          city:city,
                          province:province,
                          point:{
                            lat:positionResult.position.lat,
                            lng:positionResult.position.lng
                          }
                        }
                        positionResult.regeocode.pois.forEach(p=>{
                          var locdata = {data:JSON.stringify({
                            address:p.address,
                            title:p.name,
                            city:city,
                            province:province,
                            point:{
                              lat:p.location.lat,
                              lng:p.location.lng
                            }
                          })}
                          var n = $('<div class="item"><div><div class="title">'+p.name+'</div><div><span class="detl">'+p.address+'</span></div></div><i class="iconfont icon-duigou"></i></div>')
                          n.attr('locdata',JSON.stringify(locdata))
                          $('#cusMapPanel #searchResult').append(n)
                        })
                      }
                  });
                  positionPicker.start();
                });
            });
          });
        }
      })
      .catch((e) => {
        console.error(e); //加载错误提示
      });
  }
  function metreConvertToPx(m,p){
    m = Number(m)
    var pointA = new AMap.LngLat(p.point.lng,p.point.lat)
    var latitude = pointA.lat+(m*Math.cos(0*Math.PI/180))/111
    var longitude = pointA.lng+(m*Math.sin(0*Math.PI/180))/(111*Math.cos(pointA.lat*Math.PI/180))
    var pointB = new AMap.LngLat(longitude,latitude)

    // 根据输入范围值(单位：米) 计算出需要画的区域像素：px
    var pointAPixel = map.lnglatToPixel(pointA);   
    var pointBPixel = map.lnglatToPixel(pointB);
    //像素距离
    var piexlDistanceBetween2Points = Math.abs(pointBPixel.y - pointAPixel.y);
    var realDistanceBetween2Points = AMap.GeometryUtil.distance(pointA,pointB);

    var pixelDistance = m / (realDistanceBetween2Points / piexlDistanceBetween2Points);

    return pixelDistance;
  }
  var setHtml = function (model, props) {
    KDApi.loadFile("./assets/js/u-jquery-3.6.0.min.js", model, () => {
      KDApi.loadFile("./css/avatar.css", model, () => {
      KDApi.templateFilePath("./html/avatar.html", model, {
        path: KDApi.nameSpace(model) + "./img/time.png",
      }).then((result) => {
        model.dom.innerHTML = result;
        setTimeout(function () {
          if (!props.data) {
            props.data = "{}";
          }
          initList(JSON.parse(props.data), model);
          initEvent(model, props);
        }, 800);
      });
    })
    })
  };
  var initEvent = function (model, props) {
    console.log("绑定点击事件");
    $('body').on('click','.info .icon-guanbi',function(){
      $(this).closest('.info').addClass('not-show').addClass('p-hide');
    })
  };
  KDApi.register("customize_amap", MyComponent);
})(window.KDApi);
