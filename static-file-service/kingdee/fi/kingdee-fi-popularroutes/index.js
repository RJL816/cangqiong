/**
 *  自定义控件书写模板
 */
  var popularRoutesChart;
(function (KDApi, $) {
    // 构造函数，变量名随意，与最后一句代码的KDApi.register的第二个参数一致即可
    function ChinaMap(model) {

        this._setModel(model)
    }

    // 原型中封装生命周期函数，固定格式
    var isUpdate = false;
    ChinaMap.prototype = {
        _setModel: function (model) {
            this.model = model
        },
        init: function (props) {
            isUpdate = false;
			
		setHtml(this.model, props, isUpdate)
        },
        update: function (props) {
            isUpdate = true;
			console.log('update_popularLine');
            setHtml(this.model, props, isUpdate)
        },
        destoryed: function () {
        }
    }

    var setHtml = function (model, props, isUpdate) {
        var jsPath = ["./js/china.js","./css/tripboard.css"];
		if(!props ||!props.data||Object.keys(props.data).length==0){
			KDApi.templateFilePath('./html/container_popularroutes.html', model, {}).then(
                function (result) {
					model.dom.innerHTML = result;
		var chartDom = document.getElementById('container_popularroutes');
		var emptyDom = document.getElementsByClassName('kd-cq-empty-popularroutes');
		emptyDom[0].setAttribute("style","display:block;text-align:center;mix-blend-mode:multiply;");
		chartDom.setAttribute("style","display:none");
				})

		}else if (isUpdate&&props.data&&Object.keys(props.data).length>0) {
		 KDApi.loadFile("./js/echarts.min.popularroutes.js", model, function (){
		   if(echarts){
		   popularRoutesChart=echarts;
		   }

			 KDApi.loadFile(jsPath, model, function () {
                    if(echarts){
                   			  echarts=undefined;
                   			  }
				   KDApi.templateFilePath('./html/container_popularroutes.html', model, {}).then(
                function (result) {
                    model.dom.innerHTML = result;
                    loadData(model, props,popularRoutesChart);
					loadCityData(model,props);
                }
            )


        })}) };

    }
	
	
		// 辅助函数：获取奖牌图标路径
var getMedalIcon=function (rank) {
    switch (rank) {
        case 'gold':
            return 'kingdee/fi/kingdee-fi-traveloverview/css/1.png';
        case 'silver':
            return 'kingdee/fi/kingdee-fi-traveloverview/css/2.png';
        case 'bronze':
            return 'kingdee/fi/kingdee-fi-traveloverview/css/3.png';
        default:
            return '';
    }
}

	var loadCityData=function (model,props){
		if(props.data.lineData.tableCityData.length==0){
			return;
		}
		
		
		console.log('loadCityData');
		// 数据
		var returnData=props.data.lineData.tableCityData;
		console.log(returnData);
		
		// 表格容器
		var tableContainer = document.getElementById('table-container-lines');
		var headerTable = document.getElementById('headtable');

		// 创建表格
		var table = document.createElement('table');
		table.className = 'table';

		// 创建表头
		var header = document.createElement('tr');

		header.className = 'row header';
		var headers = [KDApi.getLangMsg(model, 'PopularRoutes_rank'), KDApi.getLangMsg(model, 'PopularRoutes_lines'), KDApi.getLangMsg(model, 'PopularRoutes_orders'), KDApi.getLangMsg(model, 'PopularRoutes_percentage'), KDApi.getLangMsg(model, 'PopularRoutes_totalamount')];
		headers.forEach(text => {
			const cell = document.createElement('td');
			cell.className = 'cell';
			cell.textContent = text;
			header.appendChild(cell);
		});
		table.appendChild(header);
		headerTable.appendChild(table);

		var scondTable = document.createElement('table');
		scondTable.className = 'table';
		scondTable.id = 'secondTable';
		// 创建数据行
		var rankIndex=0;
		var rows = [];
		returnData.forEach(item => {

			rankIndex++;
			const row = document.createElement('tr');
			row.className = 'row';
			['rank', 'city', 'orders', 'percentage', 'amount'].forEach(key => {
				const cell = document.createElement('td');
				cell.className = 'cell';
				if (key === 'rank') cell.classList.add(item.className); // 添加颜色
				cell.textContent = item[key];
				row.appendChild(cell);
			});
			rows.push(row);
		});
   // 将行添加到表格中
    rows.forEach(row => scondTable.appendChild(row));
		// 插入表格
	tableContainer.appendChild(scondTable);
    var speed = 1000;
//var lines_1=document.getElementById('table-container-lines_1');
//var lines=document.getElementById('table-container-lines');
//var lines_0=document.getElementById('table-container-lines_0');
var scrollTable=document.getElementById('secondTable');
var rowHeight=scrollTable.rows[0].offsetHeight;
var currentScrollTop=0;
//lines_1.innerHTML = lines.innerHTML;
function Marquee() {
	/*if (lines_1.offsetTop - lines_0.scrollTop <= 0) {
		lines_0.scrollTop -= lines.offsetHeight;
	} else {
		lines_0.scrollTop++;
	}*/
	var topRow=scrollTable.rows[0].cloneNode(true);
	scrollTable.appendChild(topRow);
	scrollTable.deleteRow(0);
	scrollTable.scrollTop=rowHeight;
	/*currentScrollTop+=rowHeight;
	scrollTable.scrollTop=currentScrollTop;
	if(currentScrollTop>=scrollTable.scrollHeight-scrollTable.clientHeight){
		currentScrollTop=0;
		scrollTable.scrollTop=currentScrollTop;
	}*/
}
var MyMar = setInterval(Marquee, speed);

scrollTable.onmouseover = function() {
	clearInterval(MyMar);
}

scrollTable.onmouseout = function() {
	MyMar = setInterval(Marquee, speed);
}
	}




      // 将路线数据转换为符合 ECharts 格式的数据
        var convertData = function (data) {
		var returnData=data.lineData;
			
		// 城市坐标数据
        var geoCoordMap = returnData.geoCoord;
		// 路线数据
        var flightRoutes = returnData.routes;
            var res = [];
            for (var i = 0; i < flightRoutes.length; i++) {
                var dataItem = flightRoutes[i];
                var fromCoord = geoCoordMap[dataItem[0].name];
                var toCoord = geoCoordMap[dataItem[1].name];
                if (fromCoord && toCoord) {
                    res.push({
                        fromName: dataItem[0].name,
                        toName: dataItem[1].name,
                        coords: [fromCoord, toCoord],
                        value: dataItem[1].value
                    });
                }
            }
            return res;
        };
    var loadData = function (model, props,popularRoutesChart) {
        var option = {};
			
        var chartDom = document.getElementById('container_popularroutes');
		
        if (props == null || props.data == null) {
			console.log('后台无数据');
			return;
        }

		var emptyDom=document.getElementsByClassName('kd-cq-empty-popularroutes');
		emptyDom[0].setAttribute("style","display:none");
		chartDom.setAttribute("style","display:block;height:405px;width:100%;overflow:hidden;");

		console.log('路线数据');
		console.log(props.data.lineData.routes);
		console.log(convertData(props.data));
        var myChart = popularRoutesChart.init(chartDom);
		

        option = {

            tooltip: {
                trigger: 'item'
            },


            geo: [
			
          {
            map: 'china',
            aspectScale: 1.1,
            zoom: 1.3,// 放大
            layoutCenter: ['50%', '50%'],
            layoutSize: '130%',
            show: true,
            roam: false,
            label: {
              show: false, // 各个省市县的名字
              color: '#fff',
            },
          
            emphasis: {
              itemStyle: {
                show: false,
                color: '#fff',
                areaColor: 'rgba(114,143,249,0.6)',
              },
              label: {
                show: true,
                color: '#fff',
              },
            },
			itemStyle:{
			borderWidth:1,
			borderColor:'#fff'
			
			},
			regions:[
			
			
			 { 
                name: '南海诸岛',
                itemStyle: {
                   color:'#6895FE'
                }
            },
			{
					name:'台湾',
					itemStyle:{
						color:'#D9E7FE'
					}
				},
			{
					name:'吉林',
					itemStyle:{
						color:'#D9E7FE'
					}
				},
			{
					name:'新疆',
					itemStyle:{
						color:'#D9E7FE'
					}
				},
				{
					name:'黑龙江',
					itemStyle:{
						color:'#D9E7FE'
					}
				},
				{
					name:'四川',
					itemStyle:{
						color:'#D9E7FE'
					}
				},
					{
					name:'云南',
					itemStyle:{
						color:'#D9E7FE'
					}
				},
				{
					name:'内蒙古',
					itemStyle:{
						color:'#D9E7FE'
					}
				},
				{
					name:'西藏',
					itemStyle:{
						color:'#BFD4FB'
					}
				},
				{
					name:'青海',
					itemStyle:{
						color:'#BFD4FB'
					}
				},
				{
					name:'山西',
					itemStyle:{
						color:'#BFD4FB'
					}
				},
				{
					name:'江西',
					itemStyle:{
						color:'#BFD4FB'
					}
				},
				{
					name:'浙江',
					itemStyle:{
						color:'#BFD4FB'
					}
				},
				{
					name:'福建',
					itemStyle:{
						color:'#6895FE'
					}
				},
				{
					name:'甘肃',
					itemStyle:{
						color:'#6895FE'
					}
				},
				{
					name:'广东',
					itemStyle:{
						color:'#6895FE'
					}
				},
					{
					name:'海南',
					itemStyle:{
						color:'#6895FE'
					}
				},
				
				{
					name:'陕西',
					itemStyle:{
						color:'#6895FE'
					}
				},
				{
					name:'广西',
					itemStyle:{
						color:'#6895FE'
					}
				},
				{
					name:'贵州',
					itemStyle:{
						color:'#6895FE'
					}
				},
				{
					name:'湖北',
					itemStyle:{
						color:'#6895FE'
					}
				},
				{
					name:'重庆',
					itemStyle:{
						color:'#6895FE'
					}
				},
				{
					name:'湖南',
					itemStyle:{
						color:'#6895FE'
					}
				},
				{
					name:'安徽',
					itemStyle:{
						color:'#6895FE'
					}
				},
				{
					name:'河南',
					itemStyle:{
						color:'#6895FE'
					}
				},
				{
					name:'江苏',
					itemStyle:{
						color:'#6895FE'
					}
				},
					{
					name:'河北',
					itemStyle:{
						color:'#6895FE'
					}
				},
					{
					name:'北京',
					itemStyle:{
						color:'#6895FE'
					}
				},
				{
					name:'天津',
					itemStyle:{
						color:'#6895FE'
					}
				},
				{
					name:'辽宁',
					itemStyle:{
						color:'#6895FE'
					}
				},
				{
					name:'山东',
					itemStyle:{
						color:'#BCD5FD'
					}
				},
				
				{
					name:'宁夏',
					itemStyle:{
						color:'#BCD5FD'
					}
				},
				]
          },
          // 重影
          {
            type: 'map',
            map: 'china',
            zlevel: -1,
            aspectScale: 1.1,
            zoom: 1.3,
            layoutCenter: ['50%', '51%'],
            layoutSize: '130%',
            roam: false,
            silent: true,
            itemStyle: {
              borderWidth: 1,
              borderColor: 'gray',
              shadowColor: 'rgba(219,231,253,0.5)',
              shadowOffsetY: 5,
              shadowBlur: 15,
              areaColor: 'rgba(5,21,35,0.1)',
            },
			  regions: [
            { // 隐藏南海诸岛,因为顶层已经添加过了
                name: '南海诸岛',
                itemStyle: {
                    normal: {
                    	opacity: 0 // 为 0 时不绘制该图形
                    }
                },
                label: {
                    show: false
                }
            },
			{
					name:'台湾',
					itemStyle:{
						color:'#D9E7FE'
					}
				},
			{
					name:'吉林',
					itemStyle:{
						color:'#D9E7FE'
					}
				},
			{
					name:'新疆',
					itemStyle:{
						color:'#D9E7FE'
					}
				},
				{
					name:'黑龙江',
					itemStyle:{
						color:'#D9E7FE'
					}
				},
				{
					name:'四川',
					itemStyle:{
						color:'#D9E7FE'
					}
				},
					{
					name:'云南',
					itemStyle:{
						color:'#D9E7FE'
					}
				},
				{
					name:'内蒙古',
					itemStyle:{
						color:'#D9E7FE'
					}
				},
				{
					name:'西藏',
					itemStyle:{
						color:'#BFD4FB'
					}
				},
				{
					name:'青海',
					itemStyle:{
						color:'#BFD4FB'
					}
				},
				{
					name:'山西',
					itemStyle:{
						color:'#BFD4FB'
					}
				},
				{
					name:'江西',
					itemStyle:{
						color:'#BFD4FB'
					}
				},
				{
					name:'浙江',
					itemStyle:{
						color:'#BFD4FB'
					}
				},
				{
					name:'福建',
					itemStyle:{
						color:'#6895FE'
					}
				},
				{
					name:'甘肃',
					itemStyle:{
						color:'#6895FE'
					}
				},
				{
					name:'广东',
					itemStyle:{
						color:'#6895FE'
					}
				},
					{
					name:'海南',
					itemStyle:{
						color:'#6895FE'
					}
				},
				
				{
					name:'陕西',
					itemStyle:{
						color:'#6895FE'
					}
				},
				{
					name:'广西',
					itemStyle:{
						color:'#6895FE'
					}
				},
				{
					name:'贵州',
					itemStyle:{
						color:'#6895FE'
					}
				},
				{
					name:'湖北',
					itemStyle:{
						color:'#6895FE'
					}
				},
				{
					name:'重庆',
					itemStyle:{
						color:'#6895FE'
					}
				},
				{
					name:'湖南',
					itemStyle:{
						color:'#6895FE'
					}
				},
				{
					name:'安徽',
					itemStyle:{
						color:'#6895FE'
					}
				},
				{
					name:'河南',
					itemStyle:{
						color:'#6895FE'
					}
				},
				{
					name:'江苏',
					itemStyle:{
						color:'#6895FE'
					}
				},
					{
					name:'河北',
					itemStyle:{
						color:'#6895FE'
					}
				},
					{
					name:'北京',
					itemStyle:{
						color:'#6895FE'
					}
				},
				{
					name:'天津',
					itemStyle:{
						color:'#6895FE'
					}
				},
				{
					name:'辽宁',
					itemStyle:{
						color:'#6895FE'
					}
				},
				{
					name:'山东',
					itemStyle:{
						color:'#BCD5FD'
					}
				},
				
				{
					name:'宁夏',
					itemStyle:{
						color:'#BCD5FD'
					}
				},
				
        ]
          },
          {
            type: 'map',
            map: 'china',
            zlevel: -2,
            aspectScale: 1.1,
            zoom: 1.3,
            layoutCenter: ['50%', '52%'],
            layoutSize: '130%',
            roam: false,
            silent: true,
            itemStyle: {
              borderWidth: 1,
              borderColor: 'gray',
              shadowColor: 'rgba(34,27,69,0.6)',
              shadowOffsetY: 5,
              shadowBlur: 15,
              areaColor: 'rgba(5,21,35,0.1)',
            },
			  regions: [
            { // 隐藏南海诸岛,因为顶层已经添加过了
                name: '南海诸岛',
                itemStyle: {
                    normal: {
                    	opacity: 0 // 为 0 时不绘制该图形
                    }
                },
                label: {
                    show: false
                }
            },
			{
					name:'台湾',
					itemStyle:{
						color:'#D9E7FE'
					}
				},
			{
					name:'吉林',
					itemStyle:{
						color:'#D9E7FE'
					}
				},
			{
					name:'新疆',
					itemStyle:{
						color:'#D9E7FE'
					}
				},
				{
					name:'黑龙江',
					itemStyle:{
						color:'#D9E7FE'
					}
				},
				{
					name:'四川',
					itemStyle:{
						color:'#D9E7FE'
					}
				},
					{
					name:'云南',
					itemStyle:{
						color:'#D9E7FE'
					}
				},
				{
					name:'内蒙古',
					itemStyle:{
						color:'#D9E7FE'
					}
				},
				{
					name:'西藏',
					itemStyle:{
						color:'#BFD4FB'
					}
				},
				{
					name:'青海',
					itemStyle:{
						color:'#BFD4FB'
					}
				},
				{
					name:'山西',
					itemStyle:{
						color:'#BFD4FB'
					}
				},
				{
					name:'江西',
					itemStyle:{
						color:'#BFD4FB'
					}
				},
				{
					name:'浙江',
					itemStyle:{
						color:'#BFD4FB'
					}
				},
				{
					name:'福建',
					itemStyle:{
						color:'#6895FE'
					}
				},
				{
					name:'甘肃',
					itemStyle:{
						color:'#6895FE'
					}
				},
				{
					name:'广东',
					itemStyle:{
						color:'#6895FE'
					}
				},
					{
					name:'海南',
					itemStyle:{
						color:'#6895FE'
					}
				},
				
				{
					name:'陕西',
					itemStyle:{
						color:'#6895FE'
					}
				},
				{
					name:'广西',
					itemStyle:{
						color:'#6895FE'
					}
				},
				{
					name:'贵州',
					itemStyle:{
						color:'#6895FE'
					}
				},
				{
					name:'湖北',
					itemStyle:{
						color:'#6895FE'
					}
				},
				{
					name:'重庆',
					itemStyle:{
						color:'#6895FE'
					}
				},
				{
					name:'湖南',
					itemStyle:{
						color:'#6895FE'
					}
				},
				{
					name:'安徽',
					itemStyle:{
						color:'#6895FE'
					}
				},
				{
					name:'河南',
					itemStyle:{
						color:'#6895FE'
					}
				},
				{
					name:'江苏',
					itemStyle:{
						color:'#6895FE'
					}
				},
					{
					name:'河北',
					itemStyle:{
						color:'#6895FE'
					}
				},
					{
					name:'北京',
					itemStyle:{
						color:'#6895FE'
					}
				},
				{
					name:'天津',
					itemStyle:{
						color:'#6895FE'
					}
				},
				{
					name:'辽宁',
					itemStyle:{
						color:'#6895FE'
					}
				},
				{
					name:'山东',
					itemStyle:{
						color:'#BCD5FD'
					}
				},
				
				{
					name:'宁夏',
					itemStyle:{
						color:'#BCD5FD'
					}
				},
				
        ]
          }],
			
		  tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    if (params.seriesType === 'lines') {
                        return params.data.fromName + ' → ' + params.data.toName + '<br />' + '订单数: ' + params.data.value;
                    } else if (params.seriesType === 'effectScatter') {
                        return params.data.name + '<br />订单数: ' + params.data.value[2];
                    } else {
                        return params.name;
                    }
                }
            },

            series: [
			{
                    name: '出行路线',
                    type: 'lines',
                    zlevel: 1,
					coordinateSystem:"geo",
					effect: {
                        show: true,
						period: 6,
						trailLength: 0,
						symbol: 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z',
						symbolSize: 15
						},
                    lineStyle: {
                        normal: {
                            color: 'orange',
                            width: 2,
                            curveness:-0.4,
							opacity: 0.7,
                        }
                    },
                    data: convertData(props.data)
                },
                
                {
                    name: '终点',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    zlevel: 3,
					symbol: 'circle',
					 rippleEffect: {
                        brushType: 'stroke'
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            formatter: '{b}'
                        }
                    },
                  
                    itemStyle: {
                        normal: {
                            color: 'orange'
                        }
                    },
                    data: props.data.lineData.routes.map(function (dataItem) {
                        return {
                            name: dataItem[1].name,
                            value: props.data.lineData.geoCoord[dataItem[1].name].concat([dataItem[1].value])
                        };
                    })
                },
				
				
            ],
        };

        option && myChart.setOption(option);
		window.onresize=function(){
			myChart.resize();
		}
    };
	


    // 你只需知道第一个参数是你接下来要新增控件方案时填的方案id，第二个参数是上面声明的构造函数
    KDApi.register('kingdee-fi-popularroutes', ChinaMap,{ isMulLang: true})
})(window.KDApi) // 这里的jQuery不是必须要传进去的，可移除，要用到的时候才传，PC端系统默认会有jQuery对象，版本是1.12.4