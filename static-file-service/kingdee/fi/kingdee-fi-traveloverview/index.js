/**
 *  自定义控件书写模板
 */
  var travelOverViewChart;
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
			setHtml(this.model, props, isUpdate);
        },
        update: function (props) {
            isUpdate = true;
			console.log('update');
            setHtml(this.model, props, isUpdate)
        },
        destoryed: function () {
        }
    }

    var setHtml = function (model, props, isUpdate) {
		
        var jsPath = ["./js/china.js","./css/tripboard.css"];
		if(!props ||!props.data||Object.keys(props.data).length==0){
			KDApi.templateFilePath('./html/container_traveloverview.html', model, {}).then(
                function (result) {
					model.dom.innerHTML = result;
		var chartDom = document.getElementById('container_traveloverview');
		var emptyDom = document.getElementsByClassName('kd-cq-empty-traveloverview');
		emptyDom[0].setAttribute("style","display:block;text-align:center;mix-blend-mode:multiply;");
		chartDom.setAttribute("style","display:none");
				})

		}else if (isUpdate&&props.data&&Object.keys(props.data).length>0) {
		 KDApi.loadFile("./js/echarts.min.traveloverew.js", model, function (){
		 if(echarts){
         		  travelOverViewChart=echarts;
         		   }

			KDApi.loadFile(jsPath, model, function () {
                   if(echarts){
                  			  echarts=undefined;
                  			  }
				   KDApi.templateFilePath('./html/container_traveloverview.html', model, {}).then(
                function (result) {
                    model.dom.innerHTML = result;
                    loadData(model, props,travelOverViewChart);
					loadCityData(model,props);
                }
            )


        })
			
			 });
 }
    }
	
	
		// 辅助函数：获取奖牌图标路径
var getMedalIcon=function (rank) {
    switch (rank) {
        case 'gold':
            return 'kingdee/fi/kingdee-fi-traveloverview/css/rank_1_2x.png';
        case 'silver':
            return 'kingdee/fi/kingdee-fi-traveloverview/css/rank_2_2x.png';
        case 'bronze':
            return 'kingdee/fi/kingdee-fi-traveloverview/css/rank_3_2x.png';
        default:
            return '';
    }
}

	var loadCityData=function (model,props){
		
		if(props.data.mapData.length==0){
		
			return;
		}
		// 数据
		var returnData=props.data.mapData;
		console.log(returnData);
		
		// 表格容器
		var tableContainer = document.getElementById('traveloverview-table-container');
		var headerTable = document.getElementById('headtable-traveloverview');

		// 创建表格
		var table = document.createElement('table');
		table.className = 'table';

		// 创建表头
		var header = document.createElement('tr');
		header.className = 'row header';
		var headers = [KDApi.getLangMsg(model, 'Travel_rank'), KDApi.getLangMsg(model, 'Travel_city'), KDApi.getLangMsg(model, 'Travel_orders'), KDApi.getLangMsg(model, 'Travel_percentage'), KDApi.getLangMsg(model, 'Travel_totalamount')]
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
		scondTable.id = 'secondTable-traveloverview';
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
var scrollTable=document.getElementById('secondTable-traveloverview');
var rowHeight=scrollTable.rows[0].offsetHeight;
var currentScrollTop=0;

function Marquee() {

	var topRow=scrollTable.rows[0].cloneNode(true);
	scrollTable.appendChild(topRow);
	scrollTable.deleteRow(0);
	scrollTable.scrollTop=rowHeight;
}
var MyMar = setInterval(Marquee, speed);

scrollTable.onmouseover = function() {
	clearInterval(MyMar);
}

scrollTable.onmouseout = function() {
	MyMar = setInterval(Marquee, speed);
}
	}
		var rangeColor= ['#a297fa', '#ffbc7e', '#00e1b4']

	    // 转换数据用于 scatter series
       var mapData = function (data) {
		   console.log(data.mapData);
            return data.mapData.map(function (item) {
                return {
                    name: item.name,
                    value: item.value,
					city:item.city,
					orders:item.orders,
					percentage:item.percentage,
					amount:item.amount,
					className:item.className
                };
            });
        };
		
		// 分三个梯度
		function splitArrayIntoThree(arr) {
    // 总长度
    const totalLength = arr.length;
    
    // 每组的基准长度
    const baseLength = Math.floor(totalLength / 3);
    
    // 前两组的实际长度
    const extraItems = totalLength % 3;
    const group1Length = baseLength + (extraItems > 0 ? 1 : 0);
    const group2Length = baseLength + (extraItems > 1 ? 1 : 0);
    
    // 分割数组
    const group1 = arr.slice(0, group1Length);
    const group2 = arr.slice(group1Length, group1Length + group2Length);
    const group3 = arr.slice(group1Length + group2Length);

    return [group1, group2, group3];
}
    var loadData = function (model, props,travelOverViewChart) {
        var option = {};
		var chartDom = document.getElementById('container_traveloverview');
		var emptyDom = document.getElementsByClassName('kd-cq-empty-traveloverview');
		emptyDom[0].setAttribute("style","display:none");
		chartDom.setAttribute("style","display:block;height:405px;width:100%;overflow:hidden;");
		var result=[];
			result=splitArrayIntoThree(mapData(props.data));

		
		
		 // 计算最小值和最大值 作为左侧导航使用
        var min = Infinity;
        var max = -Infinity;
        props.data.mapData.forEach(function(item) {
            if (item.value[2] < min) min = item.value[2];
            if (item.value[2] > max) max = item.value[2];
        });
	


        var myChart = travelOverViewChart.init(chartDom);
        option = {

            tooltip: {
                trigger: 'item'
            },
series: [

{
        name: '',
        type: 'scatter',
		coordinateSystem: 'geo',     
        symbol:function(value,param){
				if(result.length>2){
				// 从大到小的排序
				var arr_1=result[0];
				var arr_1_length=arr_1.length;
				var arr_2=result[1];
				var arr_2_length=arr_2.length;
				var arr_3=result[2];
				var arr_3_length=arr_3.length;
				  if(value[2]>=arr_1[arr_1_length-1].orders&&value[2]<=arr_1[0].orders){
				  return 'image://kingdee/fi/kingdee-fi-traveloverview/css/green.png'
				  }else if(value[2]>=arr_2[arr_2_length-1].orders&&value[2]<=arr_2[0].orders){
				   return 'image:// kingdee/fi/kingdee-fi-traveloverview/css/yellow.png'
				  }else{
				   return 'image:// kingdee/fi/kingdee-fi-traveloverview/css/purple.png'
				  }
				}
				
				},
		symbolSize:[30,60],
	
       
        data: mapData(props.data),
        
    }
            ],

            geo:[
			
			
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
          itemStyle:{
			borderWidth:1,
			borderColor:'#fff'
			
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
          }
			],
			
			  tooltip: {
        trigger: 'item',
		backgroundColor: 'rgba(16,46,134,0.60)', // 设置背景为半透明
        borderColor: 'rgba(255, 255, 255, 0)', // 设置边框为完全透明
        formatter: function (params) {
            var data = params.data;
			var cityName=data.name;
			var htmlStr='';
			var className=data.className;
			var orders=data.orders;
			var rate=data.percentage;
			var amount=data.amount;
			htmlStr+='<div class="echarts-tooltip"><div class="title">'+cityName;
			if(className&&className!=''){
				htmlStr+='<img src="'+getMedalIcon(className)+'" alt="Medal">'
			}
			htmlStr+='</div>';
			htmlStr+='<div class="content"><div class="labels">';
			htmlStr+='<span>'+KDApi.getLangMsg(model, 'Travel_orders_pen')+'</span>';
			htmlStr+='<span>'+KDApi.getLangMsg(model, 'Travel_percentage_rate')+'</span>';
			htmlStr+='<span>'+KDApi.getLangMsg(model, 'Travel_totalamount_yuan')+'</span>';
			htmlStr+='</div>';
			htmlStr+='<div class="values">';
			htmlStr+='<span>'+orders+'</span>';
			htmlStr+='<span>'+rate.replace('%','')+'</span>';
			htmlStr+='<span>'+amount+'</span>';
			htmlStr+='</div></div></div>';
			return htmlStr;
        }
    },
	// 左侧小导航图
/*visualMap: {
                min: min,
                max: max,
                type: 'continuous',
                inRange: {
                    color: ['#a297fa', '#ffbc7e', '#00e1b4'] // 颜色梯度
                },
                calculable: true,
				text:['高','低']
            },*/
            
        };
		
        option && myChart.setOption(option);
		window.onresize=function(){
			myChart.resize();
		}
    };
	


    // 你只需知道第一个参数是你接下来要新增控件方案时填的方案id，第二个参数是上面声明的构造函数
    KDApi.register('kingdee-fi-traveloverview', ChinaMap,{ isMulLang: true})
})(window.KDApi) // 这里的jQuery不是必须要传进去的，可移除，要用到的时候才传，PC端系统默认会有jQuery对象，版本是1.12.4