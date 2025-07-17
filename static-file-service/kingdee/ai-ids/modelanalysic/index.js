(function (KDApi, $) {
  function ModelAnalysic(model) {
    this._setModel(model);
    this.modelPath = KDApi.nameSpace(model);
    // console.log("modelPath is ",this.modelPath);
    console.log("model is ", model);
  }
  ModelAnalysic.havedInit = false;
  ModelAnalysic.version = "0.1.5";
  ModelAnalysic.prototype = {
    _setModel: function (model) {
      this.model = model;
    },
    init: function (props) {},
    update: function (props) {
      if (!props.data) return;
      try {
        console.log("props is ", props);
        this.chartType = props.data.chartType;
        this.propsData = props.data;
        var data = props.data;
      } catch (ex) {
        console.log("update exceptions is ", ex);
      }
      let model = this.model;
      let modelPath = this.modelPath;
      //优先加载d3 库，避免后面加载执行不能满足D3库  //./lib/d3.min.js  ./lib/d3.min.7.8.2.js
      KDApi.loadFile(["./lib/d3.min.v4.js"], model, function (c) {
        initChart(props, model, modelPath);
      });
    },
    destoryed: function () {
      // window.ai_ids['initScript'].$remove({
      //   chartType: this.chartType,
      //   componentName: 'ai-ids__toolTip',
      // })
      console.log("ai-ids destoryed!!!", this.chartType);
      // window.IDS_ModelAna_RenderUtils.$$page = {}
      let delKey = this.propsData.uniqueCode
        ? this.propsData.uniqueCode.replace(/\-\>|\./g, "_")
        : this.propsData.chartType;

      let pageKey = this.model.chartType;
      ai_ids.setting.delPageDataByKey(delKey);
      if (this.chartType == "predict_error_trend") {
        const predictTrendData = this.propsData.data;
        console.log("predictTrendData is ", predictTrendData);
        console.log("$$page  is ", window.IDS_ModelAna_RenderUtils.$$page);
        predictTrendData.forEach(function (item) {
          const fmodeltypeid = item.fmodeltypeid;
          ai_ids.setting.delPageDataByKey(fmodeltypeid);
        });
      } else if (this.chartType == "error_mark_line") {
        const data = this.propsData;
        console.log("error_mark_line is ", data);
        console.log("setting data is ", ai_ids.setting._$$page);
        // const uniqueCode = data.uniqueCode
        const typeReg = /([\S]+)_(item|bill)$/gi;
        const res = typeReg.exec(delKey);
        if (res) {
          const pageId = res[1];
          const type = res[2];
          let delKey1 = pageId + "_bill"; // `${pageId}_bill`;  // ie11 兼容
          ai_ids.setting.removeChartInstanceFromPage(delKey1);
          let delKey2 = pageId + "_item"; //  `${pageId}_item`;
          ai_ids.setting.removeChartInstanceFromPage(delKey2);
        }
      }
    }
  };
  function getRadarData(pieData, model, templateData) {
    var maxValue = 0;
    var maxId = 0;
    var maxName = "";
    pieData.forEach(function (item) {
      item.name = item.text;
      if (item.value > maxValue) {
        maxValue = item.value;
        maxId = item.id;
      }
    });
    // IDS_ModelAna_ChartUtils.chartData.pieData=pieData;

    var firstData = {
      id: maxId,
      value: maxValue
    };
    if (firstData) {
      replaceRadarChartData(templateData, firstData.id);
      IDS_ModelAna_Utils.sendEvent("click", { id: firstData.id }, model);
    }
  }
  //替换雷达图的显示数据，data字段替换成parentId
  function replaceRadarChartData(templateData, id) {
    let secondTemplateData = templateData.templateData[0].children[1];
    let radarTempldate = secondTemplateData && secondTemplateData.children[2];
    if (radarTempldate) {
      radarTempldate.series[0].data = id;
    }
  }
  function dealBar_RadarChart(data, model, templateData) {
    //做个过渡 兼容 柱状_雷达图
    var parentId = data.parentId;
    if (parentId == 0) {
      //兼容后端没有chartType类型，设为雷达图
      let pieData = data.data;
      getRadarData(pieData, model, templateData);

      ai_ids.setting.setChartDataToPage("pie_radar_ids__modelAna_container", {
        pieData: pieData
      });
    } else {
      let partialRadarData = data.data;
      let radarData = ai_ids.setting.getChartDataByKey(
        "pie_radar_ids__modelAna_container"
      );
      // radarData = {
      //   ...radarData,
      //   [parentId]: partialRadarData
      // };  // ie11 兼容
      radarData[parentId] = partialRadarData;
      ai_ids.setting.setChartDataToPage(
        "pie_radar_ids__modelAna_container",
        radarData
      );
      replaceRadarChartData(templateData, parentId);
    }
  }
  function initChart(props, model, modelPath, cb) {
    var propsData = props.data;
    var propsDataType = typeof propsData;
    var uniqueCode = propsData.uniqueCode; //propsData.uniqueCode //这个字段用来区分是否可以开多个页签，如果可以开多个页签，不能直接挂载在model.dom上
    if (uniqueCode) {
      uniqueCode = uniqueCode.replace(/\-\>|\./g, "_");
    }

    var uniqueCode_contianerId = uniqueCode
      ? "ids_modelanalysic_" + uniqueCode // `ids_modelanalysic_${uniqueCode}`    ie11 兼容
      : "";
    try {
      if (propsDataType === "string") {
        // console.log("propsData is ",propsData);
        propsData = JSON.parse(propsData);
      }
    } catch (ex) {
      console.error("exceptions is ", ex.message);
    }

    let loadFiles = [
      // './lib/d3.min.js',
      // './lib/d3.min.7.8.2.js',
      "./lib/d3.min.v4.js",
      "./lib/svgHelper.js",
      "./ai_ids_setting.js",
      "./templateScript.js",
      "./utils.js",
      "./renderUtils.js",
      "./chartUtils.js",
      "./chartSetting.js",
      "./lib/echart.min.js", //'./lib/chart35.js',
      "./customChartUtils.js",
      "./css/index.css"
      // './lib/d3-selection.min.js',
    ];
    let chartType = propsData.chartType;

    if (!chartType) {
      //兼容柱状图-雷达图
      chartType = propsData.chartType = "pie_radar_ids__modelAna_container";
    }

    let chartFiles = [];
    if (chartType == "saleContribute_circlePack") {
      //圆圈图
      chartFiles = ["./circlePackModel.js", "./lib/d3-hierarchy.min.js"];
    } else if (chartType == "sale_analysic_samKey") {
      //桑吉图
      chartFiles = ["./lib/sankey2.js", "./material_sale_ananlysic_model.js"]; //'./data.js',   material_sale_ananlysic_model
    } else if (chartType == "error_mark_line") {
      //错误标注图
      chartFiles = ["./errorlinemodel.js"];
    } else if (chartType == "pie_radar_ids__modelAna_container") {
      chartFiles = ["./model.js"];
    } else if (chartType == "predict_error_trend") {
      chartFiles = ["./predict_error_trend.js"];
    } else if (chartType == "analysic_trend") {
      chartFiles = ["./analysic_trend.js"]; // 模型分析
    } else if (chartType == "homePage") {
      chartFiles = [
        "./homepage.js",
        "./homePage/js/movin.js",
        "./homePage/js/movin1.js",
        "./homePage/js/xiaok.js",
        "./homePage/js/imgAnimatin.js",
        "./homePage/js/xiaok_calc.js",
        "./homePage/js/xiaok_calc_data.js",
        "./homePage/js/xiaok_default.js",
        "./homePage/js/xiaok_default_data.js",
        "./homePage/js/partical_line.js",
        "./homePage/js/partical_line_animData.js"
      ];
    } else if (chartType == "tag_influence_ana") {
      chartFiles = ["./tag_influence_ana.js"]; // 标签影响分析
    } else if (chartType == "tag_mark_ana") {
      chartFiles = ["./tag_mark_ana1.js"]; // 标注分析
    } else if (chartType == "ids_sku_pie") {
      chartFiles = ["./ids_sku_pie.js"];
    } else if (chartType == "ids_predict_result") {
      chartFiles = ["./ids_predict_result.js"];
    } else if (chartType == "ids_part_ana") {
      chartFiles = ["./ids_part_ana.js"];
    } else if (chartType == "ids_sku_ana") {
      chartFiles = ["./ids_sku_ana.js"];
    } else if (chartType == "ids_sku_bar") {
      chartFiles = ["./ids_sku_bar.js"];
    } else if (chartType == "ids_require_ana") {
      //需求计划单明细标注分析
      chartFiles = ["./ids_require_ana.js"];
    } else if (chartType == "ids_lineage_graph") {
      chartFiles = [
        // './lib/data.js', // 接入测试数据
        "./lib/g6.min.js",
        "./ids_lineage_graph.js"
      ]; // './lib/dagre-d3.js'
    }
    let finalFiles = loadFiles.concat(chartFiles);

    KDApi.loadFile(finalFiles, model, function () {
      //缓存model
      const tempStr = chartType + "_template";
      let templateData = ai_ids[tempStr]; // `${chartType}_template`
      cacheModel(model);
      // if (chartType == 'tag_mark_ana') {
      //   //特殊处理
      //   if (
      //     ai_ids.setting._$$page &&
      //     ai_ids.setting._$$page.hasOwnProperty('tag_mark_ana')
      //   ) {
      //     ai_ids.setting._$$page['ai_ids.setting._$$page'] = null
      //     const wrapper = document.querySelector('#ai_ids_data_mark_analysis')
      //     const lastChild = wrapper.lastElementChild
      //     if (lastChild) {
      //       wrapper.removeChild(lastChild)
      //     }
      //   }
      //   console.log('ai_ids.setting._$$page is ', ai_ids.setting._$$page)
      // }
      if (chartType == "pie_radar_ids__modelAna_container") {
        dealBar_RadarChart(propsData, model, templateData);
        ai_ids.setting.setPageInfoToPage(uniqueCode ? uniqueCode : chartType, {
          pageId: model.pageId,
          uniqueCode: uniqueCode ? uniqueCode : chartType
        });
        if (propsData.parentId == 0) return;
      } else {
        ai_ids.setting.setContainerIdToPage(
          uniqueCode ? uniqueCode : chartType,
          uniqueCode ? uniqueCode_contianerId : propsData.containerId
        );
        ai_ids.setting.setChartDataToPage(
          uniqueCode ? uniqueCode : chartType,
          propsData.data
        );

        ai_ids.setting.setPageInfoToPage(uniqueCode ? uniqueCode : chartType, {
          pageId: model.pageId,
          uniqueCode: uniqueCode ? uniqueCode : chartType
        });
      }

      //   window.sankeyData //桑吉图测试数据
      IDS_ModelAna_RenderUtils.model = model;
      // if (propsData) {
      //   var parentId = propsData.parentId
      //   if (parentId == 0) {
      //     var pieData = propsData.data
      //     var maxValue = 0
      //     var maxId = 0
      //     var maxName = ''
      //     pieData.forEach((item) => {
      //       item.name = item.text
      //       var val = Number(item.value)
      //       if (val > maxValue) {
      //         maxValue = val
      //         maxId = item.id
      //       }
      //     })
      //     IDS_ModelAna_ChartUtils.chartData.pieData = pieData
      //     var firstData = {
      //       id: maxId,
      //       value: maxValue,
      //     }
      //     console.log('firstData is ', firstData)
      //     cb && cb(firstData)
      //     // console.log("pieData is ",pieData);
      //     // IDS_ModelAna_Utils.sendEvent('click',{id:pieData[0].id})
      //   } else {
      //   }
      // }
      KDApi.getTemplateStringByFilePath("./html/report.html", model, {
        title: model.title || "数据分析过程报告"
      }).then(function (result) {
        //   model.dom.innerHTML = result
        let container = model.dom;
        if (uniqueCode) {
          let containerHeight = IDS_ModelAna_Utils.getDesignContainerHeight(
            propsData.containerId
          );
          container = document.querySelector("#" + uniqueCode_contianerId);
          if (!container) {
            container = document.createElement("div");
            container.id = uniqueCode_contianerId;
            if (containerHeight) {
              container.style.height = "392px"; //containerHeight
            }
            model.dom.appendChild(container);
          }
          // container = document.createElement('div')
          // container.id = uniqueCode_contianerId
          // if (containerHeight) {
          //   container.style.height = '392px' //containerHeight
          // }
          // model.dom.appendChild(container)
        }

        templateData.uniqueCode = uniqueCode ? uniqueCode : chartType;
        templateData.pageId = model.pageId;
        if (templateData && templateData.templateData) {
          if (chartType == "sale_analysic_samKey" && !d3) {
            KDApi.loadFile(
              ["./lib/d3.min.v4.js", "./lib/sankey2.js"], //'./lib/d3.min.js' './lib/d3.min.7.8.2.js',
              model,
              function () {
                setTimeout(function () {
                  render(templateData, container, propsData);
                }, 100);
              }
            );
          } else {
            setTimeout(function () {
              render(templateData, container, propsData);
            }, 100);
          }
        } else {
          console.error("配置模板数据有问题!");
        }
      });
    });
  }
  //缓存model，为了之后的往服务端发送消息
  function cacheModel(model) {
    // const { pageId } = model;
    let pageId = model && model.pageId;
    console.log("cacheModel pageId is ", pageId);
    ai_ids.setting.setModel(pageId, model);
  }
  //
  function isInitOrUpdate() {}
  function render(templateData, container, propsData) {
    //在开始绘图前清空之前的图形（如果有的话）
    // window.IDS_ModelAna_ChartUtils.clear()
    var chartType = propsData.chartType;
    var containerId = propsData.containerId;

    let chartInstance = ai_ids.setting.getChartInstanceByKey(chartType);
    let hasRendered = container.innerHTML ? true : false;

    if (chartType == "predict_error_trend") {
      // pre
      let bizData = propsData.data;
      const wrapperRes = document.querySelectorAll("#cardentryrowap");
      if (wrapperRes && wrapperRes.length > 0) {
        let len = wrapperRes.length;
        for (let i = 0; i < len; i++) {
          let wrapper = wrapperRes[i];
          const modelIdDom = wrapperRes[i].querySelector("#fmodeltypeid"); //fmodeltypeid  fmodeltypeidfname
          const container = wrapper.querySelector("#custompredicterror");
          console.log("modelNameDom text is ", modelIdDom.textContent);
          let modelTypeId = modelIdDom.textContent;
          console.log("modelTypeIdName is ", modelTypeId);
          let curBizData = bizData.filter(function (item) {
            return item.fmodeltypeid == modelTypeId;
          })[0];
          // let modeltypeId = curBizData.fmodeltypeid
          // container.textContent = modelNameDom.textContent
          container.setAttribute("data_id", modelTypeId);
          templateData.uniqueCode = modelTypeId;
          IDS_ModelAna_RenderUtils.main(templateData, container);
        }
      }
      console.log("wrapperRes is ", wrapperRes);
      console.log("propsData is ", propsData);
      return;
    }
    if (hasRendered) {
      //如果已经渲染过了，
      console.log(" update");
      IDS_ModelAna_RenderUtils.updateRender(
        chartType,
        templateData.templateData,
        templateData.uniqueCode,
        templateData.pageId
      );
    } else {
      console.log(" render");
      IDS_ModelAna_RenderUtils.main(templateData, container); //IDS_ModelAna_RenderUtils
    }
  }

  KDApi.register("modelanalysic", ModelAnalysic);
})(window.KDApi, jQuery);

// if(!container){
//   container = document.createElement('div')
//   container.id = uniqueCode_contianerId
//   if (containerHeight) {
//     container.style.height = '392px' //containerHeight
//   }
//   model.dom.appendChild(container)
// }
