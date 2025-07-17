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
		KDApi.loadFile("./echarts.min.js", model, () => {
			KDApi.loadFile("./china.js", model, () => {
				KDApi.templateFilePath("./html/map.html", model, pagedata).then(
					result => {
						model.dom.innerHTML = result;
						//loadEchearts(model, props);
						loadmapchina(model, props);
					}
				);
			});
		});
	}
	var loadmapchina = function (model, props) {
		var mapCoord = {
			'黑龙江': [127.9688, 45.368],
			'内蒙古': [110.3467, 41.4899],
			"吉林": [125.8154, 44.2584],
			'北京': [116.4551, 40.2539],
			"辽宁": [123.1238, 42.1216],
			"河北": [114.4995, 38.1006],
			"天津": [117.4219, 39.4189],
			"山西": [112.3352, 37.9413],
			"陕西": [109.1162, 34.2004],
			"甘肃": [103.5901, 36.3043],
			"宁夏": [106.3586, 38.1775],
			"青海": [101.4038, 36.8207],
			"新疆": [87.9236, 43.5883],
			"西藏": [91.11, 29.97],
			"四川": [103.9526, 30.7617],
			"重庆": [108.384366, 30.439702],
			"山东": [117.1582, 36.8701],
			"河南": [113.4668, 34.6234],
			"江苏": [118.8062, 31.9208],
			"安徽": [117.29, 32.0581],
			"湖北": [114.3896, 30.6628],
			"浙江": [119.5313, 29.8773],
			"福建": [119.4543, 25.9222],
			"江西": [116.0046, 28.6633],
			"湖南": [113.0823, 28.2568],
			"贵州": [106.6992, 26.7682],
			"云南": [102.9199, 25.4663],
			"广东": [113.12244, 23.009505],
			"广西": [108.479, 23.1152],
			"海南": [110.3893, 19.8516],
			'上海': [121.4648, 31.2891]
		};

		var convertData = function (data) {
			var res = [];
			for (var i = 0; i < data.length; i++) {
				var geoCoord = mapCoord[data[i].name];
				if (geoCoord) {
					res.push({
						name: data[i].name,
						value: geoCoord.concat(data[i].value),
						itemStyle: data[i].itemStyle
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
				for (var p in topData) {
					topProvince[p] = topData[p].name;
				}
			}
		}

		var option = {
			backgroundColor: 'white',
			grid: {
				left: '15px',
				right: '15px',
				bottom: '3%',
				//width: '100px',
				//height: '100px',
				top: '3%',
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
					return `<div>${data.seriesName}<div>` + `<div>${data.value[2]}(万元)`;
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
			geo: {
				name: '纳税总额',
				map: 'china',
				label: {//图形上的文本标签
					show: false
				},
				emphasis: {//高亮状态下的多边形和标签样式。
					label: {
						show: false
					}
				},
				//left: '10%',
				roam: true,
				zoom: 1.2,
				itemStyle: {
					normal: {
						//areaColor: ["rgb(123,217,180)","rgb(124,207,151)","rgb(160,211,180)","rgb(170,213,255)"],//['rgba(22,119,205,1.5)',],//'#3D84F3',
						borderColor: '#ffffff'
					},
					emphasis: {
						areaColor: '#3D84F3'
					}
				},
				regions: chinaCity
			},
			series: [
				{
					name: '纳税总额',
					type: 'scatter',
					coordinateSystem: 'geo',
					data: convertData(chinaCity),
					symbolSize: function (val) {
						return 6;
					},
					label: {
						normal: {
							formatter: '{b}',
							position: 'right',
							show: false
						},
						emphasis: {
							show: true
						}
					},
					itemStyle: {
						normal: {
							color: '#FF6F6F',//'rgb(255,111,111)'//'#f4e925'
						}
					},
					tooltip: {
						trigger: 'item'
					}
				},
				{
					name: '纳税总额 Top5',
					type: 'effectScatter',
					coordinateSystem: 'geo',
					data: convertData(topData),
					// convertData(chinaCity.sort(function (a, b) {
					// 	return b.value - a.value;
					// }).slice(0, 5)),
					symbolSize: function (val) {
						return 15;//val[2] / 100;
					},
					showEffectOn: 'render',
					rippleEffect: {
						brushType: 'stroke'
					},
					hoverAnimation: false,
					label: {
						normal: {
							formatter: '{b}',
							position: 'right',
							show: true
						}
					},
					itemStyle: {
						normal: {
							color: '#FF6F6F',//'rgb(255,111,111)',//'#f4e925',
							shadowBlur: 10,
							shadowColor: '#333'
						}
					},
					zlevel: 1
				}
			]
		};
		//初始化echarts实例
		//let myChart = echarts.init(document.getElementById('chinaMapId'));
		var myChart = echarts.init(document.getElementById('mapBox'));

		//使用制定的配置项和数据显示图表
		myChart.setOption(option, true);
		myChart.on('click', function (params) {
			model.invoke('detail', { "name": params.name, "value": params.value });
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
				text: '纳税总额',
				subtext: '2019-01',
				x: 'center',
			},
			tooltip: [{
				trigger: 'item',
				formatter: function (data) {
					return '纳税总额:' + data.value + '元';
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
					name: '纳税总额',
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
					name: '税收总额TOP',
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
									return p.value + '元';
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
			model.invoke('detail', { "name": params.name, "value": params.value });
		});
	}
	KDApi.register('taxmap', MyComponent)
})(window.KDApi, jQuery);
