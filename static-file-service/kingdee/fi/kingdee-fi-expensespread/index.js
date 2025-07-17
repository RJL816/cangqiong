/**
 *  自定义控件书写模板
 */
 	var expenseSpreadChart;
(function (KDApi, $) {
    // 构造函数，变量名随意，与最后一句代码的KDApi.register的第二个参数一致即可
    function ExpenseSpread(model) {
        this._setModel(model)
    }

    // 原型中封装生命周期函数，固定格式
    var isUpdate = false;
    ExpenseSpread.prototype = {
        _setModel: function (model) {
            this.model = model
        },
        init: function (props) {
        isUpdate = false;
		setHtml(this.model, props, isUpdate)
        },
        update: function (props) {
            isUpdate = true;
            setHtml(this.model, props, isUpdate)
        },
        destoryed: function () {
        }
    }

    var setHtml = function (model, props, isUpdate) {
        
		if(!isUpdate){
			 KDApi.templateFilePath('./html/container_expensespread.html', model, {}).then(
                function (result) {
                    model.dom.innerHTML = result;
                    var data=props.data;
		if(!data){
			var chartDom = document.getElementById('container_trip_expensespread');
			var emptyDom=document.getElementsByClassName('kd-cq-empty-expensespread');
			emptyDom[0].setAttribute("style","display:block;text-align:center");
			chartDom.setAttribute("style","display:none");
			return;
		}
                }
            )
		}

		 if (isUpdate&&props.data&&Object.keys(props.data).length>0) {
		 KDApi.loadFile("./js/echarts.min.expensesespread.js", model, function (){
		 if(echarts){
		  expenseSpreadChart=window.echarts;
		 }
			 KDApi.loadFile("./js/echarts-liquidfill.js", model, function () {
			  if(echarts){
			  echarts=undefined;
			  }
				   KDApi.templateFilePath('./html/container_expensespread.html', model, {}).then(
                function (result) {
                    model.dom.innerHTML = result;
                    loadData(model, props,expenseSpreadChart);
                }
            )


        })})};
    };
	

    var loadData = function (model, props,expenseSpreadChart) {
        var option = {};
		var chartDom = document.getElementById('container_trip_expensespread');
        var myChart = expenseSpreadChart.init(chartDom);
        if (props == null || props.data == null) {
			var emptyDom=document.getElementsByClassName('kd-cq-empty-expensespread');
			emptyDom[0].setAttribute("style","display:block;text-align:center");
			chartDom.setAttribute("style","display:none");
          return;
        }
		var clientWidth=chartDom.clientWidth;
		var clientHeight=chartDom.clientHeight;
		var centerX=clientWidth*0.3;
		var centerY=clientHeight*0.5;
		var min=Math.min(clientWidth,clientHeight)/2;
		var radius=min*0.7*1.2;
       
		var amount=props.data.centerText;
		var data=props.data.seriesData;
		if(JSON.stringify(data)=='{}'){
			var emptyDom=document.getElementsByClassName('kd-cq-empty-expensespread');
			emptyDom[0].setAttribute("style","display:block;text-align:center");
			chartDom.setAttribute("style","display:none");
			return;
		}else{
			var emptyDom=document.getElementsByClassName('kd-cq-empty-expensespread');
			emptyDom[0].setAttribute("style","display:none");
			chartDom.setAttribute("style","display:block;height:284px;width:100%;overflow:hidden;");
		}
        option = {
			legend:{
				orient:'vertical',
				show:true,
				right:'5%',
				itemGap:30,
				itemWidth:10,
				itemHeight:10,
				top:'middle',
				 textStyle: {//文字颜色
                 fontSize: 13,
                 color: '#212121',
                 padding:[0,3]//文字与图形之间的左右间距
            },
			formatter: function(name) {	// 添加
            var total = 0
            var target=0;
            for (var i = 0; i < data.length; i++) {
              total += data[i].value
              if (data[i].name === name) {
                target = data[i].value
              }
            }
			var p = ((target / total) * 100).toFixed(2);
			var xsd=p.toString().split(".");
			var value=target.toString().split(".");
			if(xsd.length==1){
			 if(p.indexOf(".")!=-1){
            	 p=p.toString()+'00';
             }else{
                 p=p.toString()+'.00';
            }

			}else if(xsd.length>1&&xsd[1].length<2){
				p=p.toString()+'0';
			}
			if(value!=0&&value.length==1){
			if(value.indexOf(".")!=-1){
                target=target.toString()+'00';
            }else{
                 target=target.toString()+'.00';
            }

			}else if (value.length>1&& value[1].length<2){
				target=target.toString()+'0';
			}
            return name + "\t\t"+target + "\t\t" + p + "%";
          }
			},
			
	  tooltip: {
        show: true,
        formatter: "{b}<br/>{c} ({d}%)",
        trigger: "item"
      },
	   // 使用 graphic 绘制光晕效果
            graphic: {
                elements: [{
                    type: 'circle',
                    left:centerX-radius,
                    top:centerY-radius,
                    shape: {
                        r: radius  // 光晕半径，要比饼图半径略大
                    },
                 style: {
                        fill: 'none',
                        stroke: new expenseSpreadChart.graphic.LinearGradient(
                            0, 0, 1, 1,  // 渐变方向
                            [
                                { offset: 0, color: 'rgba(246, 249, 255, 0)' },  
                                { offset: 1, color: 'rgba(255, 255, 255, 0.8)' }  // 外部透明
                            ]
                        ),
                        lineWidth: 10,  // 光晕的宽度
                        shadowBlur: 25,  // 阴影模糊半径
                        shadowColor: 'rgba(0, 0, 0, 0.5)'  // 阴影颜色
                    }
                }]
            },
	  series:[
            
            {
                type: 'liquidFill',
                radius: '45%', // 水球的半径
                center: ['30%', '50%'], // 水球的位置
                data: [0.2,0.33], // 水的填充比例
				color:['rgba(195,208,252,0.8)','rgba(237,246,255,0.0)'],
                backgroundStyle: {
                    borderWidth: 0,
                    color: 'rgba(219,231,253,0.2)' // 水球的背景
                },
                label: {
                    normal: {
                        formatter: function(param){
							
							return amount;
						}, // 水球中显示的文本
                        textStyle: {
                        color:'#666',
                            fontSize: 18
                        }
                    }
                },
                outline: {
                    borderDistance: 0,
                    itemStyle: {
                        borderWidth: 0
                    }
                },
                waveAnimation: true // 启用波浪动画
            },
			{
                type: 'pie',
                radius: ['60%', '70%'], // 饼图的内外半径
                data: props.data.seriesData,
				center: [
            "30%",
            "50%"
          ],
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
		   itemStyle: {
                  color: '#fff',
                  shadowColor: 'rgba(0, 0, 0, 0.2)',
                  shadowBlur: 15,
                  shadowOffsetX: 2,
                  shadowOffsetY: 2,
                },
            },
			
			]
        };

        option && myChart.setOption(option);
	window.addEventListener('resize',function(){
			console.log("expensespread resizing");
			var clientWidth=chartDom.clientWidth;
		var clientHeight=chartDom.clientHeight;
		var centerX=clientWidth*0.3;
		var centerY=clientHeight*0.5;
		var min=Math.min(clientWidth,clientHeight)/2;
		var radius=min*0.7*1.2;
		var currentOption=myChart.getOption();
		currentOption.graphic={
                elements: [{
                    type: 'circle',
                    left:centerX-radius,
                    top:centerY-radius,
                    shape: {
                        r: radius  // 光晕半径，要比饼图半径略大
                    },
                 style: {
                        fill: 'none',
                        stroke: new echarts.graphic.LinearGradient(
                            0, 0, 1, 1,  // 渐变方向
                            [
                                { offset: 0, color: 'rgba(246, 249, 255, 0)' },  
                                { offset: 1, color: 'rgba(255, 255, 255, 0.8)' }  // 外部透明
                            ]
                        ),
                        lineWidth: 10,  // 光晕的宽度
                        shadowBlur: 25,  // 阴影模糊半径
                        shadowColor: 'rgba(0, 0, 0, 0.5)'  // 阴影颜色
                    }
                }]
            };
			myChart.setOption(currentOption,true);
			myChart.resize();
		});
		window.addEventListener('load',function(){
			console.log("expensespread resizing");
        			var clientWidth=chartDom.clientWidth;
        		var clientHeight=chartDom.clientHeight;
        		var centerX=clientWidth*0.3;
        		var centerY=clientHeight*0.5;
        		var min=Math.min(clientWidth,clientHeight)/2;
        		var radius=min*0.7*1.2;
        		var currentOption=myChart.getOption();
        		currentOption.graphic={
                        elements: [{
                            type: 'circle',
                            left:centerX-radius,
                            top:centerY-radius,
                            shape: {
                                r: radius  // 光晕半径，要比饼图半径略大
                            },
                         style: {
                                fill: 'none',
                                stroke: new echarts.graphic.LinearGradient(
                                    0, 0, 1, 1,  // 渐变方向
                                    [
                                        { offset: 0, color: 'rgba(246, 249, 255, 0)' },
                                        { offset: 1, color: 'rgba(255, 255, 255, 0.8)' }  // 外部透明
                                    ]
                                ),
                                lineWidth: 10,  // 光晕的宽度
                                shadowBlur: 25,  // 阴影模糊半径
                                shadowColor: 'rgba(0, 0, 0, 0.5)'  // 阴影颜色
                            }
                        }]
                    };
        			myChart.setOption(currentOption,true);
        			myChart.resize();

		})
		
    };
	

    // 你只需知道第一个参数是你接下来要新增控件方案时填的方案id，第二个参数是上面声明的构造函数
    KDApi.register('kingdee-fi-expensespread', ExpenseSpread)
})(window.KDApi) // 这里的jQuery不是必须要传进去的，可移除，要用到的时候才传，PC端系统默认会有jQuery对象，版本是1.12.4