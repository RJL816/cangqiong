// 做ie11 的兼容性
window.IDS_ModelAna_ChartUtils = (function () {
  function getDimensionMax(originalData, dimension) {
    var keys = Object.keys(originalData);
    var key = keys[dimension];
    var targetArr = originalData[key];
    var maxNum = IDS_ModelAna_Utils.getMaxFromArr(targetArr);
    maxNum = Math.ceil(maxNum);
    return maxNum;
  }
  function createPieData(keyMap, originalData) {
    if (!keyMap.hasOwnProperty("name")) {
      console.error("饼图数据不规范!");
      return;
    }
    if (!keyMap.hasOwnProperty("value")) {
      console.error("饼图数据不规范!");
      return;
    }
    var nameKey = keyMap.name;
    var valKey = keyMap.value;

    var l = originalData[nameKey].length;
    var tempArr = [];
    for (var i = 0; i < l; i++) {
      var tempObj = {};
      tempObj["name"] = originalData[nameKey][i];
      tempObj["value"] = originalData[valKey][i];
      tempArr.push(tempObj);
    }
    return tempArr;
  }
  function getDataByGroupKey(data, keys) {
    var keys = Object.keys(data);
    var firstKeyVal = data[keys[0]];
    var l = firstKeyVal.length;
    var result = [];
    for (var i = 0; i < l; i++) {
      var tempArr = [];
      keys.forEach(function (key) {
        var val = data[key][i];
        // if(key=='金额占比'){

        //     val=val * 1000;
        // }
        tempArr.push(val);
      });
      result.push(tempArr);
    }
    return result;
  }
  return {
    chartData: {}, //图形数据
    chartMap: {},
    //echart 内置组件
    echartComs: [
      "title",
      "color",
      "aria",
      "backgroundColor",
      "legend",
      "grid",
      "xAxis",
      "yAxis",
      "radar",
      "dataZoom",
      "visualMap",
      "tooltip",
      "toolbox",
      "timeline",
      "dataset",
      "series",
      "textStyle",
      "type"
    ],
    $$container: document.querySelector("#ids__report_container"),
    _createSingleXAxisByName: function (name, viewData) {
      var finalXAxis = IDS_ModelAna_Utils.extend(
        {},
        Ids_ModelAna_ChartSetting.xAxis,
        {
          axisLabel: {
            rotate: 60
          },
          name: name,
          nameLocation: "center",
          type: "category",
          data: viewData.data[name] //getData(viewData.data,name)
        }
      );
      return finalXAxis;
    },
    _getDataForAxis: function (uniqueCode, xAxis) {
      let tempData = ai_ids.setting.getChartDataByKey(uniqueCode);
      if (tempData) {
        return tempData[xAxis.data];
      }
      return null;
    },
    _getSingleXAxis: function (xAxis, viewData, uniqueCode) {
      var t = typeof xAxis;
      var finalXAxis;
      // console.log('xAis.name is ', xAxis.name + 'viewData is ', viewData)
      if (t == "string") {
        finalXAxis = this._createSingleXAxisByName(xAxis, viewData);
      } else {
        var temp = IDS_ModelAna_Utils.extend(
          {
            // ...xAxis   // qhx_need_recover
          },
          {
            name: xAxis.name || null,
            nameLocation: "center",
            nameGap: 40,
            type: "category",
            data: this._getDataForAxis(uniqueCode, xAxis)
          }
        );
        if (uniqueCode == "pie_radar_ids__modelAna_container") {
          temp.type = "value";
        }
        finalXAxis = temp;
        // finalXAxis = IDS_ModelAna_Utils.extend(temp, {
        //   axisLabel: {
        //     rotate: 0,
        //   },
        //   name: xAxis.name || null,
        //   nameLocation: 'center',
        //   nameGap: 40,
        //   type: 'category',
        //   data: ai_ids.setting.getChartDataByKey(uniqueCode)[xAxis.data],
        // })
      }
      return finalXAxis;
    },
    _createToolbox: function (toolboxData, echartOptions) {
      echartOptions["toolbox"] = toolboxData;
    },
    _createXAxis: function (xAxisData, echartOptions, viewData, uniqueCode) {
      // debugger
      const _this = this;
      if (!xAxisData)
        return {
          type: "category"
        };
      if (Array.isArray(xAxisData)) {
        let result = xAxisData.map(function (xAxis, index) {
          return _this._getSingleXAxis(xAxis, viewData, uniqueCode);
        });
        echartOptions["xAxis"] = result;
      } else {
        //obj
        let result = this._getSingleXAxis(xAxisData, viewData, uniqueCode);
        echartOptions["xAxis"] = result;
      }
    },
    _getXAxis_old: function (viewData) {
      const _this = this;
      var xAxisData = viewData.xAxis;
      if (!xAxisData)
        return {
          type: "category"
        };
      if (Array.isArray(xAxisData)) {
        return xAxisData.map(function (xAxis, index) {
          return _this._getSingleXAxis(xAxis, viewData);
        });
      } else {
        //obj
        return this._getSingleXAxis(xAxisData, viewData);
      }
    },
    _createGrids: function (viewData) {
      return viewData.grid;
    },
    _createLegend: function (viewData) {
      return IDS_ModelAna_Utils.extend(
        {},
        {
          top: "2%",
          right: "100px",
          orient: "vertical"
        },
        viewData.legend
      );
    },
    _createSingleSeries: function (seriesData, viewData, uniqueCode) {
      // debugger
      var type = seriesData.type;
      var data = seriesData.data;
      var color = viewData.color;
      //自定义系列
      if (type == "custom") {
        // console.log("curtomsdkfjldskfs",data);
        // console.log("curtomsdkfjldskfs",type);
        var colors = IDS_ModelAna_Utils.extend(
          [],
          Ids_ModelAna_ChartSetting.color,
          color
        );
        data =
          data &&
          data.map(function (item, index) {
            return {
              value: item,
              itemStyle: {
                color: colors[index] //Ids_ModelAna_ChartSetting.color[index]
              }
            };
          });
        seriesData.data = data;
      }
      function getSeriesData() {}
      if (typeof data == "string" || !data) {
        let tempData = ai_ids.setting.getChartDataByKey(uniqueCode);
        var temp = IDS_ModelAna_Utils.extend({}, seriesData);
        return IDS_ModelAna_Utils.extend(temp, {
          type: type,
          name: seriesData.data,
          data: (tempData && tempData[data]) || null //tempData[data], //[30, 40, 50, 60], //ai_ids.setting.getChartDataByKey(uniqueCode).data[data],
        });
      }
    },
    _createSeries: function (seriesData, echartOptions, viewData, uniqueCode) {
      var _this = this;
      if (Array.isArray(seriesData)) {
        let result = seriesData.map(function (series) {
          return _this._createSingleSeries(series, viewData, uniqueCode); //viewData.data
        });
        // return result
        echartOptions["series"] = result;
      } else if (typeof seriesData == "object") {
        let result = this._createSingleSeries(seriesData, viewData, uniqueCode); //viewData.data
        echartOptions["series"] = result;
      }
    },
    _createSeries_old: function (viewData) {
      var seriesData = viewData.series;
      var viewType = seriesData.type;
      var data = seriesData.data;
      var _this = this;

      if (Array.isArray(seriesData)) {
        let result = seriesData.map(function (series) {
          return _this._createSingleSeries(series, viewData); //viewData.data
        });
        return result;
      } else if (typeof seriesData == "object") {
        return this._createSingleSeries(seriesData, viewData); //viewData.data
      }
    },
    _createSingleYAxis: function (yAxisData, viewData, uniqueCode) {
      // debugger
      var dataKey = yAxisData["data"];
      var data;
      if (yAxisData.hasOwnProperty("data")) {
        if (
          yAxisData.hasOwnProperty("dataFrom") &&
          yAxisData.dataFrom == "props"
        ) {
          dataKey = dataKey.split(".");
          let tempArr = ai_ids.setting.getChartDataByKey(uniqueCode);
          tempArr = tempArr[dataKey[0]]; //data
          data = tempArr.map(function (item) {
            return item[dataKey[1]];
          });
        } else {
          const data = ai_ids.setting.getChartDataByKey(uniqueCode)[dataKey];
        }
      }
      var temp = IDS_ModelAna_Utils.extend(
        {
          type: "value",
          nameLocation: "center",
          nameGap: 80
        },
        yAxisData
      );
      temp = IDS_ModelAna_Utils.extend(temp, {
        data: data
      });
      return IDS_ModelAna_Utils.extend({}, temp);
    },
    _createYAxis: function (yAxisData, echartOptions, viewData, uniqueCode) {
      var that = this;

      if (!yAxisData) {
        //默认返回
        echartOptions["yAxis"] = {
          type: "value"
        };
        return;
      }
      if (Array.isArray(yAxisData)) {
        let result = yAxisData.map(function (yAxis) {
          return that._createSingleYAxis(yAxis, viewData, uniqueCode);
        });
        echartOptions["yAxis"] = result;
      } else {
        var yAxisResult = this._createSingleYAxis(
          yAxisData,
          viewData,
          uniqueCode
        );
        echartOptions["yAxis"] = yAxisResult;
      }
    },
    _createYAxis_old: function (viewData) {
      var that = this;
      var yAxis = viewData.yAxis;
      if (!yAxis) {
        //默认返回
        return {
          type: "value"
        };
      }
      if (Array.isArray(yAxis)) {
        return yAxis.map(function (yAxisData) {
          return that._createSingleYAxis(yAxisData, viewData);
        });
      } else {
        var yAxisResult = this._createSingleYAxis(yAxis, viewData);
        return yAxisResult;
      }
    },
    _createChartTitle: function (chartTitle) {
      if (typeof chartTitle == "object") {
        return chartTitle;
      } else if (typeof chartTitle == "string") {
        return {
          text: chartTitle,
          left: "center",
          top: "2%",
          textStyle: {
            color: "#333"
          }
        };
      }
    },
    _createTooltip: function (tooltipData, echartOptions, viewData) {
      // var tooltip = viewData.tooltip
      let result = IDS_ModelAna_Utils.extend(
        {},
        IDS_ModelAna_Utils.extend(
          Ids_ModelAna_ChartSetting.tooltip,
          tooltipData
        )
      );
      echartOptions["tooltip"] = result;
    },
    _createTooltip_old: function (viewData) {
      //   debugger
      var tooltip = viewData.tooltip;
      return IDS_ModelAna_Utils.extend(
        {},
        Ids_ModelAna_ChartSetting.tooltip,
        tooltip
      );
    },
    _createColor: function (viewData) {
      var color = viewData.color;
      return IDS_ModelAna_Utils.extend(
        [],
        Ids_ModelAna_ChartSetting.color,
        color
      );
    },
    //生成 echart options
    _generalOptionsNew: function (viewData, uniqueCode) {
      var echartOptions = {};
      var _this = this;
      window.IDS_ModelAna_ChartUtils.echartComs.forEach(function (comName) {
        // debugger
        if (comName in viewData) {
          var method =
            "_create" + comName.charAt(0).toUpperCase() + comName.substring(1);
          if (!_this.hasOwnProperty(method)) {
            console.error("没有实现对" + comName + "的方法");
          } else {
            _this[method](
              viewData[comName],
              echartOptions,
              viewData,
              uniqueCode
            );
          }
        }
      });
      return echartOptions;
    },
    _createGrid: function (gridData, echartOptions) {
      console.log("_createGrid is ", gridData);
      console.log("_createGrid is ", echartOptions);
      let result = IDS_ModelAna_Utils.extend(
        {},
        IDS_ModelAna_Utils.extend(
          Ids_ModelAna_ChartSetting.grid || {},
          gridData
        )
      );
      echartOptions["grid"] = result;
    },
    _createDataZoom: function (dataZoom, echartOptions) {
      echartOptions["dataZoom"] = dataZoom;
    },
    //生成chart的options
    _generalOptions: function (viewData) {
      let chartData = viewData.data;
      let series = this._createSeries_old(viewData);
      let xAxis = this._getXAxis_old(viewData);
      let grids = this._createGrids(viewData);
      let chartTitle = this._createChartTitle(viewData.chartTitle);
      let yAxis = this._createYAxis_old(viewData);
      let legend = this._createLegend(viewData);
      let optionObj = {
        tooltip: this._createTooltip_old(viewData),
        xAxis: xAxis,
        title: chartTitle,
        grid: grids,
        yAxis: yAxis,
        series: series,
        legend: legend,
        color: this._createColor(viewData)
      };
      return optionObj;
    },
    bindChartEvent: function (chartEl, eventOptions) {
      var _this = this;
      if (Array.isArray(eventOptions)) {
        eventOptions.forEach(function (eventOption) {
          _this.bindChartEvent(chartEl, eventOption);
        });
      } else {
        var eventName = eventOptions.eventName || "click";
        var eventFn = eventOptions.eventFn;
        chartEl.on(eventName, function (params) {
          if (typeof eventFn == "string") {
            _this[eventFn].call(_this, params);
          } else if (typeof eventFn == "function") {
            eventFn.call(_this, {
              params: params,
              chartMap: IDS_ModelAna_ChartUtils.chartMap,
              chartData: ai_ids.setting.getChartDataByKey(
                "pie_radar_ids__modelAna_container"
              ), //IDS_ModelAna_ChartUtils.chartData,
              chartEl: chartEl,
              uniqueCode: eventOptions.uniqueCode,
              pageId: eventOptions.pageId
            });
          }
        });
      }
    },
    _changeRadarDataByPieClick: function (params) {
      const pieData = IDS_ModelAna_ChartUtils.chartData.pieData; //window.ids_data.pieData;
      const targetItem = pieData.filter(function (item) {
        return item.name == params.name;
      });
      const targetId = targetItem[0].id;
      //测试
      var dataObj = {
        historical_trend: [
          { max: 100.0, id: "weather_effect", text: "天气因素", value: 38.46 },
          { max: 100.0, id: "spring_festival", text: "春节", value: 46.23 },
          { max: 100.0, id: "new_arrival", text: "新品", value: 31.23 },
          { max: 100.0, id: "covid_19", text: "疫情", value: 77.73 },
          { max: 100.0, id: "holidays", text: "节假日", value: 29.54 }
        ],
        growth_trend: [
          { max: 100.0, id: "weather_effect", text: "天气因素", value: 48.46 },
          { max: 100.0, id: "spring_festival", text: "春节", value: 36.23 },
          { max: 100.0, id: "new_arrival", text: "新品", value: 31.23 },
          { max: 100.0, id: "covid_19", text: "疫情", value: 77.73 },
          { max: 100.0, id: "holidays", text: "节假日", value: 29.54 }
        ],
        other: [
          { max: 100.0, id: "weather_effect", text: "天气因素", value: 28.46 },
          { max: 100.0, id: "spring_festival", text: "春节", value: 56.23 },
          { max: 100.0, id: "new_arrival", text: "新品", value: 31.23 },
          { max: 100.0, id: "covid_19", text: "疫情", value: 77.73 },
          { max: 100.0, id: "holidays", text: "节假日", value: 29.54 }
        ]
      };
      IDS_ModelAna_ChartUtils.chartData[targetId] = dataObj[targetId];
      IDS_ModelAna_ChartUtils.update(targetId);

      // 正式
      // IDS_ModelAna_Utils.sendEvent('click',{id:targetId});
    },
    _transformRadar: function (data) {
      console.log("_transformRadar data is ", data);
      if (!data) {
        return {
          indicator: null,
          dataVal: null
        };
      }
      let indicator = [];
      let dataVal = [];
      data.forEach(function (item) {
        let indicatorObj = { text: item.text, max: item.max, min: 0 };
        indicator.push(indicatorObj);
        dataVal.push(item.value);
      });
      return {
        indicator: indicator,
        dataVal: dataVal
      };
    },
    //根据chartEl 和配置项重新渲染
    reRenderChart: function (chartEl, options) {
      if (chartEl) {
        chartEl.setOption(options);
      }
    },
    update: function (key) {
      const radarData = IDS_ModelAna_ChartUtils.chartData[key];
      let transformResult;
      if (radarData) {
        transformResult = this._transformRadar(radarData);
      }
      console.log("transformResult is ", transformResult);
      console.log(
        "IDS_ModelAna_ChartUtils is ",
        IDS_ModelAna_ChartUtils.chartMap
      );
      var radarChartEl = IDS_ModelAna_ChartUtils.chartMap["radarKey"];
      console.log("radarChartEl is ", radarChartEl);
      if (radarChartEl) {
        var options = radarChartEl.getOption();
        this._createRadarOptions(options, transformResult, key);

        console.log("transformResult.dataVal is ", transformResult.dataVal);
        console.log("transformResult.indicator is ", transformResult.indicator);

        console.log("options is ", options);
        radarChartEl.setOption(options);
      }
    },
    _createRadarOptions: function (chartOptions, transformDataResult, key) {
      var indicator = transformDataResult.indicator || [];
      var dataVal = transformDataResult.dataVal || [];
      chartOptions.color = ["#1890FF"];
      chartOptions.radar = {
        type: "polygon",
        indicator: indicator, //transformDataResult['indicator'],
        center: ["50%", "46%"],
        radius: "60%",
        splitNumber: 4,
        splitArea: {
          areaStyle: {
            color: [
              "#fff",
              "rgba(0,0,0,.06)",
              "#fff",
              "rgba(0,0,0,.06)",
              "#fff"
            ]
          }
        },
        name: {
          show: true,
          color: "#333"
        },
        nameGap: 6,
        axisLine: {
          lineStyle: {
            color: "#eee"
          }
        },

        splitLine: {
          lineStyle: {
            color: "#eee"
          }
        }
      };
      if (dataVal.length == 0) {
        chartOptions.series[0].data = [];
      } else {
        var name = chartOptions.series[0].name;
        if (key) {
          name = key;
        }

        let pieData = ai_ids.setting.getChartDataByKey(
          "pie_radar_ids__modelAna_container"
        ).pieData;
        var targetItem = pieData.filter(function (item) {
          return item.id == name;
        });
        if (targetItem) {
          name = targetItem[0].name;
        }
        chartOptions.series[0].data = [
          {
            value: dataVal,
            name: name,
            lineStyle: {
              color: "#1890FF" //
            }
          }
        ];
      }

      chartOptions.tooltip = {
        trigger: "item"
      };

      delete chartOptions.xAxis;
      delete chartOptions.yAxis;
      return chartOptions;
    },
    _renderRadar: function (
      series,
      chartOptions,
      originalData,
      aisIndexs,
      seriesIndex,
      chartEl
    ) {
      // debugger
      var dataTransform = series.dataTransform;
      var dataKey = series.name;
      var dataFrom = series.dataFrom;
      let transformDataResult;
      let radarData;
      if (dataFrom == "props") {
        //"pie_radar_ids__modelAna_container"
        radarData = ai_ids.setting.getChartDataByKey(
          "pie_radar_ids__modelAna_container"
        )[dataKey]; // IDS_ModelAna_ChartUtils.chartData[dataKey]
      } else {
        radarData = originalData[dataKey];
      }
      if (dataTransform) {
        transformDataResult = this._transformRadar(radarData);
      }
      chartOptions.tooltip = {
        trigger: "item"
      };

      this._createRadarOptions(chartOptions, transformDataResult);
    },
    //饼图 重置数据格式
    _renderPie: function (
      series,
      chartOptions,
      originalData,
      aisIndexs,
      seriesIndex,
      chartEl
    ) {
      var xAisIndexs = aisIndexs[0];
      var xAxis = chartOptions.xAxis[xAisIndexs];
      console.log("dataTransform value is ", series.dataTransform);
      var bindEvent = series.bindEvent;
      if (bindEvent) {
        // this.bindChartEvent(chartEl, bindEvent)
      }
      if (!series.dataTransform || series.dataTransform == "false") {
        var dataKey = series.name;
        var data;
        if (series.dataFrom == "props") {
          // data=window.ids_data[dataKey]
          data = IDS_ModelAna_ChartUtils.chartData[dataKey];
        } else {
          data = originalData[dataKey];
        }
        //没有数据
        if (!data || data.length == 0) {
          chartOptions.series = [];
          chartOptions.title = {
            text: "没有数据",
            left: "50%",
            top: "50%"
          };
        }
        console.log("serkljsdlkfjsdd data is ", data);
        chartOptions.series.forEach(function (serie) {
          if (serie.type == "pie") {
            serie.data = data;
          }
        });
        delete chartOptions.xAxis;
        delete chartOptions.yAxis;
        return;
      }

      // var series=chartOptions.series;
      var keyMap = {
        name: xAxis && typeof xAxis == "object" ? xAxis.name : "",
        value: series && typeof series == "object" ? series.name : ""
      };

      var data = createPieData(keyMap, originalData);
      delete chartOptions.xAxis;
      delete chartOptions.yAxis;
      chartOptions.series.forEach(function (serie) {
        serie.data = data;
      });
      chartOptions.tooltip = {
        trigger: "item",
        formatter: "{b}:{c}"
      };
      // chartOptions.series.data=data;
    },
    //折线图
    _renderLine: function () {},
    __scatterVM: function () {},
    //自定义图形
    _renderCustom: function (series, chartOptions, data) {
      console.log("custom chartOptions is ", chartOptions);
      var xAxisIndex = series.xAxisIndex;
      var yAxisIndex = series.yAxisIndex;
      var xAxisName = "";
      var yAxisName = "";

      var xAxis = chartOptions.xAxis;
      var yAxis = chartOptions.yAxis;
      if (Array.isArray(xAxis)) {
        xAxisName = xAxis[xAxisIndex].name;
      } else {
        xAxisName = xAxis.name;
      }
      if (Array.isArray(yAxis)) {
        yAxisName = yAxis[yAxisIndex].name;
      } else {
        yAxisName = yAxis.name;
      }
      console.log("custom ", xAxisName);
      chartOptions.tooltip = IDS_ModelAna_CUSTOM_CHART_UTILS.getRectToolTip(
        xAxisName,
        yAxisName
      )();
    },
    //渲染圆圈图
    _renderCirclePack: function (series, chartOptions, data) {
      // var seriesData =
      //   IDS_ModelAna_ChartUtils.chartData['saleContribute_circlePack']
      const showDepth = 3;
      let curMaxDepth = 0;
      var sourceData = ai_ids.setting.getChartDataByKey(
        "saleContribute_circlePack"
      );
      //决定展示多少深度的数据
      function decideDepth(displayRoot, initDepth) {
        let maxDepth = (curMaxDepth = initDepth + showDepth - 1);
        displayRoot.descendants().forEach(function (node) {
          // const { depth } = node;
          const depth = node && node.depth;
          if (depth == maxDepth) {
            node.children = null;
          }
        });
      }

      var displayRoot = stratify();
      function stratify() {
        let displayRoot = d3
          .hierarchy(sourceData)
          .sum(function (d) {
            return d.value;
          })
          .sort(function (a, b) {
            return a.value - b.value;
          });
        return displayRoot;
      }
      let seriesData = [];
      function each(arr) {
        arr.forEach(function (item) {
          // const {
          //   children,
          //   data: { id, name },
          //   value,
          //   depth
          // } = item;
          const children = item && item.children,
            value = item && item.value,
            depth = item && item.depth,
            id = item && item.data && item.data.id,
            name = item && item.data && item.data.name;
          seriesData.push({ id: id, name: name, value: value, depth: depth });
          if (children) {
            each(children);
          }
        });
      }
      // const displayRoot=displayRoot
      function prepareData(data) {
        const beginArr = [data];
        each(beginArr, "");
      }
      prepareData(displayRoot);

      decideDepth(displayRoot, 0);
      console.log("displayRoot is ", displayRoot);
      function overallLayout(params, api) {
        var context = params.context;
        d3
          .pack()
          .size([api.getWidth() - 2, api.getHeight() - 2])
          .padding(3)(displayRoot);
        context.nodes = {};
        displayRoot.descendants().forEach(function (node, index) {
          // const {
          //   data: { id }
          // } = node;
          var id = node && node.data && node.data.id;
          context.nodes[id] = node;
          // context.nodes[node.id] = node
        });
      }

      function renderItem(params, api) {
        var context = params.context;
        // Only do that layout once in each time `setOption` called.
        if (!context.layout) {
          context.layout = true;
          window.ai_ids["saleContribute_circlePack_template"].overallLayout(
            params,
            api,
            displayRoot
          );
        }
        var nodePath = api.value("id");
        var node = context.nodes[nodePath];
        if (!node) {
          // Reder nothing.
          return;
        }
        var isLeaf = !node.children || !node.children.length;
        var focus = new Uint32Array(
          node.descendants().map(function (node) {
            return node.data.index;
          })
        );

        var nodeName =
          node.depth == curMaxDepth || isLeaf ? node.data.name : "";
        var z2 = api.value("depth") * 2;
        return {
          type: "circle",
          focus: focus,
          shape: {
            cx: node.x,
            cy: node.y,
            r: node.r
          },
          transition: ["shape"],
          z2: z2,
          textContent: {
            type: "text",
            style: {
              // transition: isLeaf ? 'fontSize' : null,
              text: nodeName,
              fontFamily: "Arial",
              width: node.r * 1.3,
              overflow: "truncate",
              fontSize: node.r / 4
            },
            emphasis: {
              style: {
                overflow: null,
                fontSize: Math.max(node.r / 3, 12)
              }
            }
          },
          textConfig: {
            position: "inside"
          },
          style: {
            fill: api.visual("color")
          },
          emphasis: {
            style: {
              fontFamily: "Arial",
              fontSize: 12,
              shadowBlur: 20,
              shadowOffsetX: 3,
              shadowOffsetY: 5,
              shadowColor: "rgba(0,0,0,0.3)"
            }
          }
        };
      }
      chartOptions.dataset = {
        source: seriesData
      };
      chartOptions.visualMap = [
        {
          show: false,
          min: 0,
          max: 3,
          dimension: "depth",
          inRange: {
            color: ["#006edd", "#e0ffff"]
          }
        }
      ];
      //   hoverLayerThreshold: Infinity,
      chartOptions.hoverLayerThreshold = Infinity;
      series.type = "custom";
      series.renderItem = renderItem;

      delete chartOptions.xAxis;
      delete chartOptions.yAxis;
    },
    //桑吉图
    _renderSanKey: function (series, chartOptions, data) {
      console.log("series is ", series);
      series.data =
        ai_ids.setting.getChartDataByKey("sale_analysic_samKey")["nodes"] || [];
      series.links =
        ai_ids.setting.getChartDataByKey("sale_analysic_samKey")["links"] || [];

      delete chartOptions.xAxis;
      delete chartOptions.yAxis;
      delete chartOptions.color;
    },
    _createScatterTooltip: function (seriesData) {
      var scatterVal = seriesData.scatterVal;
      return function () {
        return {
          formatter: function (params) {
            var data = params.data;
            var xAisStr =
              "<label>" +
              scatterVal[0] +
              "：</label><span style='margin-right:8px;'>" +
              data[0] +
              "</span>";
            var yAisStr =
              "<label>" +
              scatterVal[1] +
              "：</label><span style='margin-right:8px;'>" +
              data[1] +
              "</span>";
            var thirdStr =
              "<label>" +
              scatterVal[2] +
              "：</label><span style='margin-right:8px;'>" +
              data[2] +
              "</span>";
            return "<div>" + xAisStr + yAisStr + thirdStr + "</div>";
          }
        };
      };
    },
    _renderScatter: function (seriesData, chartOptions, originalData) {
      var scatterVal = seriesData.scatterVal;
      var finalData = getDataByGroupKey(originalData, scatterVal);
      chartOptions.series.data = finalData;
      chartOptions.series.itemStyle = {
        opacity: 0.8,
        shadowBlur: 0,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowColor: "rgba(0,0,0,0)"
      };
      chartOptions.tooltip = this._createScatterTooltip(seriesData)();
      delete chartOptions.xAxis.data;
      chartOptions.xAxis.type = null;
      chartOptions.visualMap = [
        {
          show: false,
          type: "piecewise",
          dimension: 2,
          min: 0,
          max: getDimensionMax(originalData, 2),
          inRange: {
            color: Ids_ModelAna_ChartSetting.color,
            symbolSize: [10, 60]
          },
          outOfRange: {
            color: ["green"]
          },
          top: 20,
          textStyle: {
            color: "#fff"
          },
          realtime: false
        }
      ];
    },
    _renderSingleBar: function (serie, chartOptins, viewData) {
      if (serie.hasOwnProperty("calculate")) {
        var result = serie.calculate(
          IDS_ModelAna_ChartUtils.chartData["pieData"]
        );
        serie.data = result;
      }
    },
    _renderBar: function (
      serie,
      chartOptions,
      viewData,
      chartEl,
      uniqueCode,
      pageId
    ) {
      var series = chartOptions.series;
      var _this = this;
      var bindEvent = serie.bindEvent;
      if (bindEvent) {
        // this.bindChartEvent(chartEl, { ...bindEvent[0], uniqueCode, pageId });
        this.bindChartEvent(chartEl, {
          uniqueCode: uniqueCode,
          pageId: pageId
        }); // qhx_need_recover
      }
      // chartOptions.colorBy = 'data'
      console.log("temp bar chartOptions is ", chartOptions);
      if (Array.isArray(series)) {
        series.forEach(function (serie) {
          _this._renderSingleBar(serie, chartOptions, viewData);
        });
      } else {
        if (series.label && series.label.labelKey) {
          let labelKey = series.label.labelKey;
          series.label.formatter = function (params) {
            let result = viewData[labelKey][params.dataIndex];
            return result;
          };
        }
      }
    },
    _getFinalOptions: function (
      chartOptions,
      viewData,
      chartEl,
      uniqueCode,
      pageId
    ) {
      var series = chartOptions.series;
      var _this = this;
      // debugger
      if (Array.isArray(series)) {
        console.log("_renderCustom series");
        series.forEach(function (serie, index) {
          var type = serie.type;
          var xAxisIndex = serie.xAxisIndex || 0;
          var yAxisIndex = serie.yAxisIndex || 0;

          switch (type) {
            case "scatter":
              _this._renderScatter(serie, chartOptions, viewData.data);
              break;
            case "pie":
              _this._renderPie(
                serie,
                chartOptions,
                viewData.data,
                [xAxisIndex, yAxisIndex],
                index,
                chartEl
              );
              break;
            case "radar":
              _this._renderRadar(
                serie,
                chartOptions,
                viewData.data,
                [xAxisIndex, yAxisIndex],
                index,
                chartEl
              );
              break;
            case "bar":
              _this._renderBar(
                serie,
                chartOptions,
                viewData.data,
                chartEl,
                uniqueCode,
                pageId
              );
              break;
            case "sankey":
              _this._renderSanKey(serie, chartOptions, viewData.data, chartEl);
              break;
            case "custom":
              //_this._renderCustom(serie, chartOptions, viewData.data)
              break;
            case "circlePack":
              // _this._renderCirclePack(
              //   serie,
              //   chartOptions,
              //   viewData.data,
              //   chartEl,
              // )
              break;
          }
        });
      } else if (typeof series == "object") {
        var type = series.type;
        switch (type) {
          case "scatter":
            _this._renderScatter(series, chartOptions, viewData.data);
            break;
          case "pie":
            _this._renderPie(series, chartOptions, viewData.data);
            break;
          case "bar":
            _this._renderBar(
              series,
              chartOptions,
              viewData.data,
              chartEl,
              uniqueCode,
              pageId
            );
            break;
          case "custom":
            // _this._renderCustom(series, chartOptions, viewData.data)
            break;
          case "circlePack":
            // _this._renderCirclePack(series, chartOptions, viewData.data)
            break;
        }
      }
      console.log("chartOptins dfiusldfdsis ", chartOptions);
      return chartOptions;
    },
    _addResizeEvent: function (chartEl) {
      var clientWidth = document.body.clientWidth;
      var wrapperW = (clientWidth - 260 - 50) * 0.92;
      wrapperW = Math.floor(wrapperW);
      chartEl.resize({
        width: 200
      });
    },
    //清除图形
    clear: function () {
      // let chartEl=ai_ids.setting.getChartInstanceByKey()
      // if (this.chartEl) {
      //   this.chartEl.clear()
      // }
    },
    //设置chart的宽度和高度
    _setChartStyle: function (viewData) {
      var chartStyleStr = "";
      var wrapperW = "900px";
      var chartStyle = {
        width: wrapperW,
        height: "600px",
        "margin-top": "40px"
      };
      console.log("qhx initchart ", document.body.clientWidth);
      var clientWidth = document.body.clientWidth;
      wrapperW = (clientWidth - 260 - 50) * 0.92;
      wrapperW = Math.floor(wrapperW) + "px";

      if (wrapperW) {
        chartStyle.width = wrapperW;
      }
      if (viewData.hasOwnProperty("chartStyle")) {
        chartStyle = viewData.chartStyle;
      }
      if (chartStyle) {
        for (var key in chartStyle) {
          chartStyleStr += key + ":" + chartStyle[key] + ";";
        }
      }
      return chartStyleStr;
    },
    _updateRadarChart: function (chartType, templateData) {
      let chartMap = ai_ids.setting.getChartInstanceByKey(chartType);
      let radarTempldateData = templateData[0].children[1].children[2];
      let radarData = radarTempldateData.series[0].data;
      var radarChartEl = chartMap.radarKey;
      let chartData = ai_ids.setting.getChartDataByKey(chartType);
      var newRadarData = chartData[radarData] || [];
      var indicator = [];
      var valArr = [];
      newRadarData.forEach(function (item) {
        if (!item) return;
        // const { value, max, text } = item;
        const value = item && item.value,
          max = item && item.max,
          text = item && item.text;
        indicator.push({ max: max, min: 0, text: text });
        valArr.push(value);
      });
      let radarOption = radarChartEl.getOption();
      console.log("radarOptions is ", radarOption);

      radarOption.radar[0].indicator = indicator;
      radarOption.series[0].data[0].value = valArr;
      radarChartEl.setOption(radarOption);
    },
    updateChart: function (chartKey, templateData, uniqueCode, pageId) {
      console.log("template ksdjfsdf updateChart is ", templateData);
      if (chartKey == "analysic_trend") {
        const opts = templateData[0];
        opts.pageId = pageId; //添加pageId
        this.updateD3Chart(uniqueCode, opts);
        return;
      }
      if (
        (Array.isArray(templateData) &&
          templateData[0].viewType == "d3chart") ||
        templateData.viewType == "d3chart"
      ) {
        const opts = templateData[0];
        opts.pageId = pageId; //添加pageId
        this.updateD3Chart(chartKey, opts);
        return;
      }
      //更新柱状-雷达图的雷达图
      if (chartKey == "pie_radar_ids__modelAna_container") {
        this._updateRadarChart(chartKey, templateData);
        return;
      }

      if (templateData.containerId == "customcontrolapsankey") {
        this.updateD3Chart(chartKey, templateData.templateData[0]);
        return;
      }
      if (!chartKey) {
        console.error("chartKey 不能为空!");
        return;
      }
      let chartEl = ai_ids.setting.getChartInstanceByKey(uniqueCode);
      if (!chartEl) {
        console.error("错误，没有chart实例，请检查!");
        return;
      }
      if (chartKey == "saleContribute_circlePack") {
        // ie11兼容
        // let { reRenderChart } =
        //   ai_ids["saleContribute_circlePack_template"].templateData[0].series;
        let tempObj =
          ai_ids["saleContribute_circlePack_template"].templateData[0].series;
        let reRenderChart = tempObj && tempObj.reRenderChart;
        /////////////  // ie11兼容
        let chartData = ai_ids.setting.getChartDataByKey(chartKey);
        let chartEl = ai_ids.setting.getChartInstanceByKey(chartKey);
        reRenderChart &&
          reRenderChart({
            // 兼容IE11 写法
            chartData: chartData,
            chartEl: chartEl
          });
        return;
      }
      var chartOptions = chartEl.getOption();
      // var updateOption=templateData[0].series.updateOption()

      const result = this.lifeStyleEvent(
        "updateOption",
        {
          chartOptions: chartOptions,
          viewData: templateData[0],
          chartData: ai_ids.setting.getChartDataByKey(uniqueCode),
          chartEl: chartEl
        },
        uniqueCode
      );
      console.log("update resul tis ", result);
      //如果显式返回
      if (result === false) {
        chartEl.clear();
        console.log("chartOptions is ", chartEl.getOption());
        return;
      }
      chartOptions = this._getFinalOptions(chartOptions, {}, chartEl);

      console.log("temp final chartoptions is ", chartOptions);
      chartEl.setOption(chartOptions);
    },
    //更新D3
    updateD3Chart: function (uniqueCode, option) {
      this.renderD3Chart(option, uniqueCode, true);
    },
    //使用D3来渲染
    renderD3Chart: function (options, uniqueCode, isUpdate, pageId) {
      // const { beforeMount } = options;
      var beforeMount = options && options.beforeMount;
      let chartData = ai_ids.setting.getChartDataByKey(uniqueCode);
      beforeMount &&
        beforeMount({
          chartData: chartData,
          uniqueCode: uniqueCode,
          isUpdate: isUpdate,
          pageId: pageId || options.pageId
        });
    },
    createChart: function (options) {
      // debugger
      var _this = this;
      const viewData = options.viewData;

      let uniqueCode = options.uniqueCode;
      let pageId = options.pageId;
      let chartStyle = viewData.chartStyle;
      if (viewData.viewType == "d3chart") {
        setTimeout(function () {
          _this.renderD3Chart(viewData, uniqueCode, false, pageId);
        }, 200);

        return;
      }
      const wrapperEl = options.container;
      let isFirst = false;

      let chartEl = ai_ids.setting.getChartInstanceByKey(uniqueCode);
      if (viewData.chartKey == "error_mark_line") {
        const typeReg = /([\S]+)_(item|bill)$/gi;
        const res = typeReg.exec(uniqueCode);
        if (res) {
          const pageId = res[1];
          const type = res[2];
          let hideIdStr = "";
          if (type == "item") {
            hideIdStr = "ids_modelanalysic_" + pageId + "_bill"; //ie11 `ids_modelanalysic_${pageId}_bill`;
          } else {
            hideIdStr = "ids_modelanalysic_" + pageId + "_item"; // `ids_modelanalysic_${pageId}_item`;
          }
          const hideDom = document.querySelector("#" + hideIdStr); // ie11 `#${hideIdStr}`
          if (hideDom) {
            hideDom.style.display = "none";
          }
        }
        console.log("res is ", res);
      }
      if (uniqueCode == "pie_radar_ids__modelAna_container") {
        //如果是饼图-雷达图，暂时屏蔽
        // chartEl = ai_ids.setting.getChartInstanceByKey(uniqueCode)
        const chartKey = viewData.chartKey;
        chartEl = chartEl && chartEl[chartKey];
      }
      if (!chartEl) {
        isFirst = true;
        const beforeMountResult = this.lifeStyleEvent(
          "beforeMount",
          {
            viewData: options.viewData,
            uniqueCode: uniqueCode,
            pageId: pageId
          },
          uniqueCode
        );
        if (beforeMountResult === false) return;

        const el = options.el;

        const $$chartEl =
          typeof el == "string" || !el ? document.createElement("DIV") : el;

        var chartStyleStr = this._setChartStyle(viewData);
        $$chartEl.setAttribute("id", "chart_" + Math.random());

        //   $$chartEl.style.cssText = chartStyleStr
        wrapperEl.appendChild($$chartEl);
        chartEl = this._initChart($$chartEl, uniqueCode, chartStyle);
        if (uniqueCode == "pie_radar_ids__modelAna_container") {
          const chartKey = viewData.chartKey;
          // let tempChart = {
          //   [chartKey]: chartEl
          // };
          let tempChart = {};
          tempChart[chartKey] = chartEl;
          ai_ids.setting.setChartInstanceToPage(uniqueCode, tempChart);
        } else {
          ai_ids.setting.setChartInstanceToPage(uniqueCode, chartEl);
        }
      }
      console.log("chartEl is ", chartEl);

      // var chartOptions = this._generalOptions(viewData)
      var chartOptions = this._generalOptionsNew(viewData, uniqueCode);
      //   if (!this.chartEl) {
      //     this.chartEl = this._initChart($$chartEl)
      //   }

      //   IDS_ModelAna_ChartUtils.chartMap[chartKey] = this.chartEl
      //   debugger
      chartOptions = this._getFinalOptions(
        chartOptions,
        viewData,
        chartEl,
        uniqueCode,
        pageId
      );
      // chartOptions.type = 'bar'
      console.log("finalOptions is ", chartOptions);
      let result = this.lifeStyleEvent(
        "updateOption",
        {
          chartOptions: chartOptions,
          viewData: options.viewData,
          chartData: ai_ids.setting.getChartDataByKey(uniqueCode),
          chartEl: chartEl
        },
        uniqueCode
      );

      chartEl.setOption(chartOptions);
      if (result === false) {
        chartEl.clear();
      }
      // setTimeout(function () {
      window.onresize = function () {
        //如果是总览里的图表，不要绑定resize函数，而是放到配置中的mounted去分别绑定
        if (options.viewData.chartKey == "predict_error_trend") {
          // let tempChartEl = ai_ids.setting.getChartInstanceByKey(uniqueCode)
          // if (tempChartEl) {
          //   tempChartEl.resize()
          // }
        } else {
          chartEl.resize();
        }
      };
      // }, 50)
      if (isFirst) {
        this.lifeStyleEvent(
          "mounted",
          {
            chartOptions: chartOptions,
            viewData: options.viewData,
            chartEl: chartEl,
            pageId: pageId
          },
          uniqueCode
        );
      }
      this.bindEvent(viewData, uniqueCode, pageId);
      isFirst = false;
    },
    bindEvent: function (viewData, uniqueCode, pageId) {
      // debugger
      console.log("bindEvent viewData is fksdflsdf ", viewData);
      var _this = this;
      // ai_ids.setting.
      let chartEl = ai_ids.setting.getChartInstanceByKey(uniqueCode);
      // console.log('chartEl is ', chartEl)
      if ("bindEvent" in viewData && chartEl) {
        var eventData = viewData["bindEvent"];
        chartEl.on(eventData.eventName, function (params) {
          eventData["eventFn"].call(_this, {
            chartEventObj: params,
            chartEl: chartEl,
            chartMap: IDS_ModelAna_ChartUtils.chartMap,
            chartData: ai_ids.setting.getChartDataByKey(uniqueCode),
            uniqueCode: uniqueCode,
            pageId: pageId
            // pageInfo:ai_ids.setting
          });
        });
      }
    },
    //执行生命周期钩子
    lifeStyleEvent: function (eventName, params, uniqueCode) {
      var _this = this;
      var viewData = params.viewData;
      var series = viewData.series;
      if (Array.isArray(series)) {
        series.forEach(function (serie) {
          //   params.viewData.series = serie
          _this.lifeStyleEvent(
            eventName,
            {
              // ...params, // qhx_need_recover
              viewData: { series: serie } //...params.viewData,  // qhx_need_recover
            },
            uniqueCode
          );
        });
      } else {
        var chartOptions = params.chartOptions;
        var viewData = params.viewData;
        var chartEl = params.chartEl;
        var pageId = params.pageId;
        var eventFn = viewData.series[eventName];
        if (typeof eventFn == "function") {
          return eventFn({
            sourceData: ai_ids.setting.getChartDataByKey(uniqueCode), //图形数据，放在chartKey下
            chartEl: chartEl, // 图形实例
            viewData: viewData, // 配置文件的选项，但里面的series 是经过调整的
            chartOptions: chartOptions, // 最后的，调用myChart.setOption 前的options
            uniqueCode: uniqueCode,
            pageId: pageId
          });
        }
      }
    },
    _getContainerBox: function (containerId, dimension) {
      const container = document.querySelector("#" + containerId); // `#${containerId}`
      if (container) {
        let dimensionVal = getComputedStyle(container)[dimension];
        if (
          dimensionVal.indexOf("px") > -1 ||
          typeof parseFloat(dimensionVal) == "number"
        ) {
          if (typeof dimensionVal == "number") {
            return dimensionVal;
          } else {
            let t = /^\s*([\d|\.]+)px\s*$/.exec(dimensionVal);
            // console.log('t is ', t)
            if (t && t.length > 0) {
              t = t[1];
              return Math.floor(t);
            }
          }
        }
      }
      return 0;
    },
    _initChart: function ($$chartEl, chartKey, chartStyle) {
      let minHeight = 1200;
      let height;
      const containerId = ai_ids.setting.getChartContainerByKey(chartKey);

      let chartParams = {
        // renderer: 'svg',
      };
      const container = document.querySelector("#" + containerId); // ie11 `#${containerId}`

      if (container) {
        let tempHeight = getComputedStyle(container).height; //container.getComputedStyle().clientHeight
        // let tempWidth = getComputedStyle(container).width
        console.log("tempHeight is ", tempHeight);
        // console.log('tempWidth is ', tempWidth)
        if (
          tempHeight.indexOf("px") > -1 ||
          typeof parseFloat(tempHeight) == "number"
        ) {
          if (typeof tempHeight == "number") {
            height = tempHeight - 30;
          } else {
            let t = /^\s*(\d+)px\s*$/.exec(tempHeight);
            console.log("t is ", t);
            if (t && t.length > 0) {
              t = t[1];
              height = t - 40;
            }
          }
        }
        console.log("heightStr is ", height);
      }

      if (chartKey == "sale_analysic_samKey") {
        height = 800;
      }
      if (chartKey == "pie_radar_ids__modelAna_container") {
        let containerId = "if_customcontrolap";
        let tempWidth = this._getContainerBox(containerId, "width");
        // console.log('tempWidth is ', tempWidth)
        if (tempWidth) {
          chartParams.width = tempWidth / 2;
        }
      }
      if (!height) {
        //默认
        height = minHeight;
      }
      // chartKey == 'sale_analysic_samKey' ? 8000 : 420
      if (chartStyle && chartStyle.height) {
        height = chartStyle.height;
      }
      chartParams.height = height;

      // {
      //   // height: '800px',
      //   //sankey 1500 其他 600
      //   height,
      //   // width: 300, //到时候要注销
      //   // renderer: 'svg',
      // }
      return echarts.init($$chartEl, null, chartParams);
    }
  };
})(window);
