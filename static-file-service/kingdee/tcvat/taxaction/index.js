(function (KDApi, $, _) {
    function MyComponent(model) {
        this._setModel(model);
    }
    MyComponent.prototype = {
        _setModel: function (model) {
            this.model = model;
        },
        init: function (props) {
            setHtml(this.model, props);
        },
        update: function (props) {
            setHtml(this.model, props);
        },
        destoryed: function () {
        }
    }

    //选中/非选中颜色枚举
    const colorMap = {
        light: '0.3', //非选中颜色 浅色
        deep: '1' //选中暗色 深色
    }
    let bakData = {};

    var setHtml = function (model, props) {
        if (props && props.data && props.data.data) {
            KDApi.loadFile("../static/echart/echarts.min.all.4.9.0.js", model, () => {
                KDApi.templateFilePath("./html/taxaction.html", model, {}).then(
                    result => {
                        model.dom.innerHTML = result;
                        initDiagram(model, props.data.data);//
                    }
                );
            });
        }
    }

    function focusData(nameArr, datas) {
        bakData = datas;
        return datas.map(function (data) {
            if (nameArr.includes(data.name)) {
                data.itemStyle.color = data.itemStyle.color.replace(/(,)(?!.*\1).{1,5}\)$/, ',' + colorMap.deep + ')');
            } else {
                data.itemStyle.color = data.itemStyle.color.replace(/(,)(?!.*\1).{1,5}\)$/, ',' + colorMap.light + ')');
            }
            return data;
        });
    }

    function showList(model, month) {

        //清空弹窗
        $("#ranklist").empty();
        //按month获取对应事项数据并排序
        //获取month对应月索引
        let index = bakData[0].xAxis.findIndex(function (d) {
            return d === month;
        });
        //过滤并排序
        bakData.map(function (d) {
            return {
                value: d.data[index],
				status:d.status[index],
                item: d.name,
				hideItem: d.nameId,
                color: d.itemStyle.color.replace(/(,)(?!.*\1).{1,5}\)$/, ',' + colorMap.deep + ')')
            };
        }).sort(function (c, d) {
            return d.status - c.status;
        }).sort(function (a, b) {
            return b.value - a.value;
        }).forEach(function (data, index) {
            $("#ranklist").append('<li>' +
                '<div style="width:20%;text-align:center">No.' + (index + 1) + '</div>' +
                '<div class="specialrow" style="width: 58%;">' +
                '<div class="bit" style="background-color:' + data.color + '"></div>' +
                '<div class="item">' + data.item + '</div>' +
				'<div class="value" style="display: none;">' + data.value + '</div>' +
				'<div class="status" style="display: none;">' + data.status + '</div>' +
				'<div class="hideItem" style="display: none;">' + data.hideItem + '</div>'+
                '</div>' +
                '<div class="hrefline">'+KDApi.getLangMsg(model, "detail")+'</div>' +
                '<div style="width:5%">' +
                '<div class="rightarrow"></div>' +
                '</div>' +
                '</li>')
        });
        //document.getElementById("ranklist").appendChild(list);
    }

    var initDiagram = function (model, formData) {
		document.getElementById('event').innerHTML=KDApi.getLangMsg(model, "title");
		bakData = formData;
        var option = {
            title: {
                // text: '折线图堆叠'
            },
            tooltip: {
                trigger: 'axis',
                textStyle: {
                    align: 'left'
                }             
            },
            //legend: {
                // data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
            //},
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: formData[0].xAxis,
				name: formData[0].nameX
            },
            yAxis: {
                type: 'value',
				name: formData[0].nameY,
				axisLine:{
					show: false
				},
				axisLabel:{
					show: true
				},
				axisTick: {
					show: false
				},
				splitLine: {
					show: true
				}
            },
            series: formData//focusData(['事项一', '事项二'], formData)
        };

        let diagram = echarts.init(document.getElementById("taxactionEchart"));
        diagram.on('click', function (params) {
            let x = params.event.event.clientX;
            let y = params.event.event.clientY;
            let dialog = document.getElementById("taxactionDialog");
            dialog.style.display = 'block';
            dialog.style.left = x + 20 + 'px';
            let top = y - (dialog.clientHeight / 2) + 'px';
            if (y + dialog.clientHeight / 2 + 20 > document.body.clientHeight) {
                top = document.body.clientHeight - dialog.clientHeight - 20 + 'px';
            }
            dialog.style.top = top;

            //获取x轴数据
            let name = params.name;
			//let nameX = x.nameX;
            showList(model,name);
            params.event.event.stopPropagation();
            $(".hrefline").click(function (e) {
                let taxName = $(this).parent().find(".hideItem").text();
				let valueTotal = $(this).parent().find(".value").text();
				let status = $(this).parent().find(".status").text();
				model.invoke('detail', { "taxName": taxName,"valueTotal": valueTotal,"taxDate": name,"status": status});
            });
            $(".rightarrow").click(function (e) {
                let taxName = $(this).parent().find(".hideItem").text();
				let valueTotal = $(this).parent().find(".value").text();
				let status = $(this).parent().find(".status").text();
				model.invoke('detail', { "taxName": taxName,"valueTotal": valueTotal,"taxDate": name,"status": status});
            });
        });
        document.addEventListener('DOMContentLoaded', function () {            
            
        });
        document.getElementById("taxactionDialog").onmouseout = function (e) {
            // this.style.display = 'none';
        };
        document.getElementById("taxactionDialog").onclick = function (e) {
            e.stopPropagation();
        }
        document.addEventListener('click', function () {
            document.getElementById("taxactionDialog").style.display = 'none';
        });

        diagram.setOption(option);
    }

	KDApi.register('taxaction', MyComponent, {
  isMulLang: true
})

})(window.KDApi, jQuery);
