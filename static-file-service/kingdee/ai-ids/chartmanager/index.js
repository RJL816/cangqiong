(function (KDApi, $) {
  var _outerRadius = 200;
  var _innerRadius = 170;
  var _pointerInnerRadius = 40;
  var _insidePanelRadius = 140;
  var _currentDataIndex = 0;
  var _panelImageURL;
  var _animationDuration = 1000;
  var _animationDurationUpdate = 1000;
  var _animationEasingUpdate = "quarticInOut";
  var _valOnRadianMax = 200;
  function ChartManager(model) {
    this._setModel(model);
    this.modelPath = KDApi.nameSpace(model);
    console.log("modelPath is ", this.modelPath);
    console.log("model is ", model);
  }
  ChartManager.prototype = {
    _setModel: function (model) {
      this.model = model;
    },
    init: function (props) {
      //initFunc(props,this.model,this.modelPath)
      console.log("prop data in init is ", props);
      //   initChart(props, this.model, this.modelPath)
    },
    update: function (props) {
      console.log("prop data in update is ", props);
      if (props && props.data) {
        initChart(props, this.model, this.modelPath);
      }
    },
    destoryed: function () {},
  };
  function initChart(props, model, modelPath) {
    var propsData = props.data;
    console.log("propsData xxx is ", propsData);
    KDApi.loadFile(
      ["./lib/echarts.8.js", "./lib/d3.min5.5.js", "./lib/index.css"],
      model,
      function () {
        KDApi.loadFile(["./lib/bundle.js"], model, function () {
          KDApi.getTemplateStringByFilePath("./html/custom.html", model, {
            title: model.title || "数据健康度",
          }).then(function (result) {
            console.log("result is ", result);
            // model.dom.innerHTML = result
            // const mock_container = document.getElementById('mock_container')

            const jsonTemplateList = [
              {
                id: "pie",
                name: "饼图",
                uniqueCode: "pie_wrapper",
              },
              {
                id: "test",
                name: "测试",
                uniqueCode: "test_wrapper",
              },
              {
                id: "modelAnalysic",
                name: "模型分析",
                uniqueCode: "model_ana",
              },
            ];

            function runChart(chartData) {
              const aiIdsEl = ai_ids.AiIdsEl.run(model, props); //chartData.id
            }
            setTimeout(function () {
              runChart(); //jsonTemplateList[0]
            }, 200);
          });
        });
      }
    );
  }

  KDApi.register("chartmanager", ChartManager);
})(window.KDApi, jQuery);
