;window.Ids_ChartSetting=(function(){
    let title={

    };
    let xAxis={
        axisLabel: {
            interval: 0,
        },
        axisPointer: {
            type: 'shadow', //坐标轴指示器设置为阴影指示器
        },
        nameTextStyle: {
            lineHeight: 30,
            verticalAlign: 'top',
            padding: [0, 0, 0, -10],
            color: '#666',
        },
    };
    let legend= {
        top: 0,
        right: 40,
        itemWidth: 8,
        itemHeight: 8,
    }; // 设置显示图例，非必选
    let tooltip= {
        trigger: 'axis',
        formatter: function (params, ticket, callback) {
          var htmlStr = ''
          var valMap = {}
          for (var i = 0; i < params.length; i++) {
            var param = params[i]
            var xName = param.name //x轴的名称
            var seriesName = param.seriesName //图例名称
            var value = param.value //y轴值
            var color = param.color //图例颜色
            //过滤无效值
            if (value == '-') {
              continue
            }
            //过滤重叠值
            if (valMap[seriesName] == value) {
              continue
            }
            if (i === 0) {
              htmlStr += xName + '<br/>' //x轴的名称
            }
            htmlStr += '<div>'
            //为了保证和原来的效果一样，这里自己实现了一个点的效果
            htmlStr +=
              '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:' +
              color +
              ';"></span>'
    
            //圆点后面显示的文本
            htmlStr += seriesName + '：' + value
            htmlStr += '</div>'
            valMap[seriesName] = value
          }
          return htmlStr
        },
      };
    
    return {
        legend,
        tooltip,
        xAxis,
        title,
        color:['#B06EFF','#FFB813','#40A9FF']
    };
})()