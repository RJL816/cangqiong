(function (KDApi, $, _) {
	function MyComponent(model) {
		this._setModel(model);
	}
	var isUpdate = false;
	MyComponent.prototype = {
		_setModel: function (model) {
			this.model = model;
		},
		init: function (props) {
			console.log('-----init', this.model, props)
			isUpdate = false;
			setHtml(this.model, props, isUpdate);
		},
		update: function (props) {
			console.log('-----update', this.model, props)
			isUpdate = true;
			setHtml(this.model, props, isUpdate);
		},
		destoryed: function () {
			console.log('-----destoryed', this.model)
		}

	}

	var setHtml = function (model, props, isUpdate) {
		var pagedata = {};
		if (props != null && props.data != null) {
			var popsData = props.data;
			pagedata = popsData['pagedata'];
		}
		/*KDApi.loadFile("../static/echart/echarts.min.all.4.9.0.js", model, () => {
			KDApi.loadFile("../static/echart/china.js", model, () => {
				KDApi.templateFilePath("./html/map.html", model, pagedata).then(
					result => {
						model.dom.innerHTML = result;
						//loadEchearts(model, props);
						loadmapchina(model, props);
					}
				);
			});
		});
		*/
		KDApi.loadFile("../static/echart/echarts.min.all.4.9.0.js", model,  function (){
			KDApi.loadFile("../static/echart/china.js", model, function (){
			KDApi.templateFilePath("./html/map.html", model, pagedata).then(
			function (result){
				

				
						model.dom.innerHTML = result;
						//loadEchearts(model, props);
						loadmapchina(model, props);
					}
				);
			});
		});
	}

	//各省纳税最大值
	let maxCityVal = 0;
	/**
	 * 生成top5图例
	 * @param {*} arr 
	 */
	function createTopHtml(model,arr) {
		document.getElementById('topfive').innerHTML=KDApi.getLangMsg(model, "tax.top");

		let htmlstr = "";
		if (arr && arr.length != 0) {
			let colorArr = ["#003A8C", "#096DD9", "#40A9FF", "#91D5FF"];
			document.getElementById("middleLine").style.height = 32 * arr.length + 'px';
			let sortarr = arr.sort(function(a, b){
				return b.value - a.value;
			});
			maxCityVal = sortarr[0].value;
			sortarr.map(function(val, idx){
				let value = val.value == 0 ? 0 : ((val.value / maxCityVal) * 166).toFixed(2);
				let color = colorArr[3];
				if (val.value >= 100) {
					color = colorArr[0];
				} else if (val.value < 100 && val.value >= 50) {
					color = colorArr[1];
				} else if (val.value < 50 && val.value >= 10) {
					color = colorArr[2];
				}
				htmlstr += "<li>" +
					"<span class='city'>" + val.name + "</span>" +
					"<p title='" + val.value + "' style='width:" + (value !== 0 && value < 2 ? 2 : value) + "px;background:" + color + "'>" +
					// "<span>" + val.value + "</span>" +
					"</p>" +
					"</li>";
			});
		}

		return htmlstr;
	}

	var loadmapchina = function (model, props) {
			var mapCoord = {};
			mapCoord[KDApi.getLangMsg(model,'Heilongjiang')] =  [127.9688, 45.368,'Heilongjiang'];
			mapCoord[KDApi.getLangMsg(model,'InnerMongolia')] =  [110.3467, 41.4899,'InnerMongolia'];
			mapCoord[KDApi.getLangMsg(model,'Jilin')] = [125.8154, 44.2584,'Jilin'];
			mapCoord[KDApi.getLangMsg(model,'Beijing')] = [116.4551, 40.2539,'Beijing'];
			mapCoord[KDApi.getLangMsg(model,'Liaoning')] = [123.1238, 42.1216,'Liaoning'];
			mapCoord[KDApi.getLangMsg(model,'Hebei')] = [114.4995, 38.1006,'Hebei'];
			mapCoord[KDApi.getLangMsg(model,'Tianjin')] = [117.4219, 39.4189,'Tianjin'];
			mapCoord[KDApi.getLangMsg(model,'Shanxi')] = [112.3352, 37.9413,'Shanxi'];
			mapCoord[KDApi.getLangMsg(model,'Shaanxi')] = [109.1162, 34.2004,'Shaanxi'];
			mapCoord[KDApi.getLangMsg(model,'Gansu')] = [103.5901, 36.3043,'Gansu'];
			mapCoord[KDApi.getLangMsg(model,'Ningxia')] = [106.3586, 38.1775,'Ningxia'];
			mapCoord[KDApi.getLangMsg(model,'Qinghai')] = [101.4038, 36.8207,'Qinghai'];
			mapCoord[KDApi.getLangMsg(model,'Xinjiang')] = [87.9236, 43.5883,'Xinjiang'];
			mapCoord[KDApi.getLangMsg(model,'Tibet')] = [91.11, 29.97,'Tibet'];
			mapCoord[KDApi.getLangMsg(model,'Sichuan')] = [103.9526, 30.7617,'Sichuan'];
			mapCoord[KDApi.getLangMsg(model,'Chongqing')] = [108.384366, 30.439702,'Chongqing'];
			mapCoord[KDApi.getLangMsg(model,'Shandong')] = [117.1582, 36.8701,'Shandong'];
			mapCoord[KDApi.getLangMsg(model,'Henan')] = [113.4668, 34.6234,'Henan'];
			mapCoord[KDApi.getLangMsg(model,'Jiangsu')] = [118.8062, 31.9208,'Jiangsu'];
			mapCoord[KDApi.getLangMsg(model,'Anhui')] = [117.29, 32.0581,'Anhui'];
			mapCoord[KDApi.getLangMsg(model,'Hubei')] = [114.3896, 30.6628,'Hubei'];
			mapCoord[KDApi.getLangMsg(model,'Zhejiang')] = [119.5313, 29.8773,'Zhejiang'];
			mapCoord[KDApi.getLangMsg(model,'Fujian')] = [119.4543, 25.9222,'Fujian'];
			mapCoord[KDApi.getLangMsg(model,'Jiangxi')] = [116.0046, 28.6633,'Jiangxi'];
			mapCoord[KDApi.getLangMsg(model,'Hunan')] = [113.0823, 28.2568,'Hunan'];
			mapCoord[KDApi.getLangMsg(model,'Guizhou')] = [106.6992, 26.7682,'Guizhou'];
			mapCoord[KDApi.getLangMsg(model,'Yunnan')] = [102.9199, 25.4663,'Yunnan'];
			mapCoord[KDApi.getLangMsg(model,'Guangdong')] = [113.12244, 23.009505,'Guangdong'];
			mapCoord[KDApi.getLangMsg(model,'Guangxi')] = [108.479, 23.1152,'Guangxi'];
			mapCoord[KDApi.getLangMsg(model,'Hainan')] = [110.3893, 19.8516,'Hainan'];
			mapCoord[KDApi.getLangMsg(model,'Shanghai')] = [121.4648, 31.2891,'Shanghai'];
			mapCoord[KDApi.getLangMsg(model,'Taiwan')] = [120.63599694100014, 23.222805080000114,'Taiwan'];

		var convertData = function (data) {
			var res = [];
			for (var i = 0; i < data.length; i++) {
				var geoCoord = mapCoord[data[i].name];
				if (geoCoord) {
					// if(data[i].value==0){
					// 	data[i].itemStyle.normal.color = "#E7EAF1";
					// }
					res.push({
						name: data[i].name,
						value: geoCoord.slice(0, 2).concat(data[i].value),
						index: i + 1,
						itemStyle:data[i].itemStyle		,
                        number:	geoCoord.slice(2, 3)	
					});
				}
			}
			return res;
		};

		var chinaCity = {};
		var topData = {};
		var topProvince = new Array();
		if (props != null && props.data != null) {
			var popsData = props.data;
			var str = JSON.stringify(popsData['data']);
			if (str != null) {
				chinaCity = JSON.parse(str);
			}
			var str3 = JSON.stringify(popsData['topData']);
			if (str3 != null) {
				topData = JSON.parse(str3);
				//初始化top5实例
				$("#taxmapul").append(createTopHtml(model,topData));
				for (var p in topData) {
					topProvince[p] = topData[p].name;
				}
			}
		}



		var option = {
			backgroundColor: 'white',
			grid: {
				left: 0,//'5px',
				right: '15px',
				bottom: '3%',
				//width: '100px',
				//height: '100px',
				top: 0,//'25px',
				//x: 50,
				//y: 50,
				borderWidth: 0,
				containLabel: true
			},
			title: {
				text: '',
				subtext: '',
				sublink: 'http://www.pm25.in',
				left: 'center',
				textStyle: {
					color: '#fff'
				}
			},
			tooltip: [{
				trigger: 'item',
				formatter: function (data) {
					if(data.data&&data.data.value[2]!==null){
						/*return ((data.data.index<=5&& data.data.index>=1)?`<div>No.${data.data.index}<div>`:``) + 
						`<div>${data.name}<div><div>${data.data.value[2]}(万元)`;*/
						return ((data.data.index<=5&& data.data.index>=1)?'<div>No.' + data.data.index + '</div>':'') + 
						'<div>' + data.name + '<div><div>' + data.data.value[2] +KDApi.getLangMsg(model, "Tenthousandyuan");
					}					
				}
			}],
			legend: {
				orient: 'vertical',
				y: 'bottom',
				x: 'right',
				data: ['pm2.5'],
				textStyle: {
					color: '#fff'
				}
			},
			// geo: {
			// 	name: '纳税总额',
			// 	map: 'china',
			// 	label: {//图形上的文本标签
			// 		show: false
			// 	},
			// 	emphasis: {//高亮状态下的多边形和标签样式。
			// 		label: {
			// 			show: true
			// 		}
			// 	},
			// 	itemStyle: {
			// 		borderWidth: 1,
			// 		borderColor: 'rgb(207, 219, 242)',
			// 		borderType: 'dotted'
			// 	},
			// 	roam: true,
			// 	zoom: 1.2,
			// 	regions: chinaCity
			// },
			series: [
				// {
				// 	name: '纳税总额',
				// 	type:'scatter',
				// 	coordinateSystem: 'geo',
				// 	data: convertData(chinaCity),
				// 	symbolSize: function (val) {
				// 		return 5;
				// 	},
				// 	label: {
				// 		normal: {
				// 			formatter: '{b}',
				// 			position: 'right',
				// 			show: false
				// 		},
				// 		emphasis: {
				// 			show: true
				// 		}
				// 	},
				// 	itemStyle: {
				// 		normal: {
				// 			color: 'rgb(247,211,53)',//'#FF6F6F',//'rgb(255,111,111)'//'#f4e925'
				// 			show:true
				// 		}
				// 	},
				// 	tooltip: {
				// 		trigger: 'item',
				// 		formatter: function (data) {
				// 			return `<div>${data.seriesName}<div>` + `<div>${data.data.value[2]}(万元)`;
				// 		}
				// 	}
				// },
				{
					name: KDApi.getLangMsg(model,'nsze'),
					type: "map",
					roam:true,//支持鼠标缩放和移动
					mapType: "china",
					zoom: 1.2,
					//coordinateSystem: "geo",
					label: {//图形上的文本标签,拥有label的一系列属性
						show: false
					},
					emphasis: {//高亮状态下的样式
						label: {
							show: false
						}						
					},
					itemStyle: {
						borderWidth: 1,
						borderColor: 'rgb(207, 219, 242)',
						borderType: 'dotted'
					},				
					data: convertData(chinaCity),
					regions: chinaCity,
					showLegendSymbol:false
				}
				// {
				// 	name: '纳税总额 Top5',
				// 	type: 'effectScatter',
				// 	coordinateSystem: 'geo',
				// 	data: convertData(topData),				
				// 	symbolSize: function (val) {
				// 		return val[2] == 0 ? 5 : ((val[2] / maxCityVal) * 20 + 5).toFixed(2);//val[2] / 10;//15;
				// 	},
				// 	showEffectOn: 'render',
				// 	rippleEffect: {
				// 		brushType: 'stroke'
				// 	},
				// 	hoverAnimation: false,
				// 	label: {
				// 		normal: {
				// 			show: false,
				// 			formatter: '{b}',
				// 			position: 'right',
				// 			show: true
				// 		}
				// 	},
				// 	itemStyle: {
				// 		normal: {
				// 			color: 'rgb(247,211,53)',//'rgb(255,111,111)',//'#f4e925',
				// 			shadowBlur: 10,
				// 			shadowColor: '#333',
				// 			opacity: 0.6
				// 		}
				// 	},
				// 	zlevel: 1
				// }
			]
		};
		//初始化echarts实例
		//let myChart = echarts.init(document.getElementById('chinaMapId'));
		var myChart = echarts.init(document.getElementById('mapBox'));

		//使用制定的配置项和数据显示图表
		myChart.setOption(option, true);
		myChart.on('click', function (params) {
			model.invoke('detail', { "name": params.name, "value": params.value , "number": params.data.number});
		});
		myChart.on("mouseover", function (params){
            if(params.data&&params.data.value != undefined){
                myChart.dispatchAction({
                    type: 'downplay'
                });
			}			
        });
	}
	var loadEchearts = function (model, props) {
		var data = {};
		var topData = {};
		var topProvince = new Array();
		if (props != null && props.data != null) {
			var popsData = props.data;
			var str = JSON.stringify(popsData['data']);
			if (str != null) {
				data = JSON.parse(str);
			}
			var str3 = JSON.stringify(popsData['topData']);
			if (str3 != null) {
				topData = JSON.parse(str3);
				for (var p in topData) {
					topProvince[p] = topData[p].name;
				}
			}
		}

		// 指定相关的配置项和数据
		var mapBoxOption = {
			title: {
				show: false,
				text: KDApi.getLangMsg(model,'nsze'),
				subtext: '2019-01',
				x: 'center',
			},
			tooltip: [{
				trigger: 'item',
				formatter: function (data) {
					return KDApi.getLangMsg(model,'nsze') +":"+ data.value +KDApi.getLangMsg(model, "yuan") ;
				}
			}],
			toolbox: {
				show: false,
				orient: 'vertical',
				x: 'right',
				y: 'center',
				feature: {
					mark: { show: true },
					dataView: {
						show: true,
						readOnly: false
					}
				}
			},
			xAxis: {
				type: 'value',
				show: false,
				splitLine: { show: false },
				splitArea: { show: false },
				axisLine: { show: false },
				axisTick: { show: false },
			},
			yAxis: {
				type: 'category',
				show: true,
				splitLine: { show: false },
				splitArea: { show: false },
				axisLine: { show: false },
				axisTick: { show: false },
				data: topProvince
			},
			grid: {
				left: '2',
				right: '15px',
				bottom: '3%',
				width: '100px',
				height: '100px',
				x: 50,
				y: 50,
				borderWidth: 0,
				containLabel: true
			},
			series: [
				{
					name: KDApi.getLangMsg(model,'nsze'),
					type: 'map',
					mapType: 'china',
					mapLocation: {
						x: 'right'
					},
					itemStyle: {
						normal: {
							label: { show: true }
						},
						emphasis: {
							label: { show: true }
						}
					},
					data: data
				},
				{
					name: KDApi.getLangMsg(model, "ssze"),
					type: 'bar',
					barGap: 10,
					barWidth: 10,
					barCategoryGap: 10,
					barBorderWidth: 10,
					itemStyle: {
						normal: {
							color: function (params) {
								var colorList = [
									'#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
									'#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
									'#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'

								];

								return colorList[params.dataIndex]

							},
							label: {
								show: true,
								position: 'right',
								textStyle: {
									color: 'red'
								},
								formatter: function (p) {
									return p.value + KDApi.getLangMsg(model, "yuan");
								}
							}
						}
					},
					formatter: "{a} <br/>{b} : {c} ({d})",
					data: topData
				}
			],
			animation: false
		};

		var myChart = echarts.init(document.getElementById('mapBox'));
		myChart.setOption(mapBoxOption);
		myChart.on('click', function (params) {
			model.invoke('detail', { "name": params.name, "value": params.value,"number": params.data.number });
		});
	}
	KDApi.register('taxmap', MyComponent, {
  isMulLang: true
})

})(window.KDApi, jQuery);
