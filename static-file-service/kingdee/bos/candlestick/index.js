/**
 *  自定义控件书写模板
 */
(function (KDApi, $) {
    // 构造函数，变量名随意，与最后一句代码的KDApi.register的第二个参数一致即可
    function Candlestick(model) {
        this._setModel(model)
    }

    // 原型中封装生命周期函数，固定格式
    var isUpdate = false;
    Candlestick.prototype = {
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
        KDApi.loadFile('./echarts.min.js?v1', model, function () {
            KDApi.templateFilePath('./html/container.html', model, {}).then(
                function (result) {
                    model.dom.innerHTML = result;
                    loadData(model, props);
                }
            )
        })
    }

    var loadData = function (model, props) {
        var option = {};
        if (props != null && props.data != null) {
            option = props.data;
        }
        var chartDom = document.getElementById('container');
        var myChart = echarts.init(chartDom);
        // var option = {
        //   xAxis: {
        //     data: ['2017-10-24', '2017-10-25', '2017-10-26', '2017-10-27']
        //   },
        //   yAxis: {},
        //   series: [
        //     {
        //       type: 'candlestick',
        //       data: [
        //         [20, 34, 10, 38],
        //         [40, 35, 30, 50],
        //         [31, 38, 33, 44],
        //         [38, 15, 5, 42]
        //       ]
        //     }
        //   ]
        // };
        
        option && myChart.setOption(option);

    }

    // 你只需知道第一个参数是你接下来要新增控件方案时填的方案id，第二个参数是上面声明的构造函数
    KDApi.register('candlestick', Candlestick)
})(window.KDApi, jQuery) // 这里的jQuery不是必须要传进去的，可移除，要用到的时候才传，PC端系统默认会有jQuery对象，版本是1.12.4