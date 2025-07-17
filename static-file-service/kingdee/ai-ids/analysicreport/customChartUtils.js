;window.IDS_CUSTOM_CHART_UTILS=(function(){

    function renderRect(option){
        
        var data=option.data;
        var xAxisIndex=option.xAxisIndex || 0;
        var yAxisIndex=option.yAxisIndex || 0;
        return {
                type: 'custom',
                xAxisIndex,
                yAxisIndex,
                renderItem: function (params, api) {
                  var yValue = api.value(2);
                  var start = api.coord([api.value(0), yValue]);
                  var size = api.size([api.value(1) - api.value(0) - 10, yValue]);
                  var style = api.style();
                  return {
                    type: 'rect',
                    shape: {
                      x: start[0],
                      y: start[1],
                      width: size[0] - 1,
                      height: size[1]
                    },
                    style: style
                  };
                },
                label: {
                  show: true,
                  position: 'top',
                  formatter:function(e){
                    return e.data.value[3];
                  } 
                },
                encode: {
                  x: [0, 1],
                  y: 2,
                  tooltip: [0, 1, 2],
                  itemName: 3
                },
                data: data
              };
            
    }
    return {
        renderCustomShape:function(type,data){
            switch(type){
                case 'rect':
                    return renderRect(data);
                break;
            }
        },
        getRectToolTip:function(xAxisName,yAxisName){
            var newXAxisName=xAxisName;
            var newYAxisName=yAxisName;
            return function(){
              return {
                formatter:function(params){
                  var data=params.data.value;
                  var date=data[1] - data[0];
                  var yValue=data[2];
                  return '<div><div><label>'+newYAxisName+'：</label><span>'+yValue+'</span></div></div>'
                }
              }
            }

        }
    }
})();