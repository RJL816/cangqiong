window.IDS_ModelAna_RenderUtils = (function () {
  // console.log("IDS_ModelAna_Utils is ",IDS_ModelAna_Utils);
  var TITLE_CLASS = "ids__analysis-report_title";
  var DESC_CLASS = "ids__analysis-report_desc";
  var EMPTY_VIEW = "ids_analysis-report_view";
  return {
    $$curIndicatorEl: null, //当前选中的指示器
    $$container: document.querySelector("#ids__modelAna_container"),
    $$page: {}, //存储已经渲染过的页面，如果初次渲染过后，key-value 为true
    _renderChildren: function (children, containerWrapper, uniqueCode) {
      var _this = this;
      children.forEach(function (child) {
        var viewType = child.viewType || child.type;
        switch (viewType) {
          case "chart":
          case "d3chart":
            //图形
            // renderCharts(shape,fragment);
            console.log("temp containerWrapper chart width is ", child);
            IDS_ModelAna_ChartUtils.createChart({
              viewData: child,
              container: containerWrapper,
              rootWrapper: IDS_ModelAna_ChartUtils.$$container,
              uniqueCode: uniqueCode
            });
            break;
          case "container":
            _this._renderContainer(child, containerWrapper, uniqueCode);
            break;
          case "view":
            console.log("_renderChildren view is ", child);
            _this._renderView(child, containerWrapper);

            break;
        }
      });
    },
    _renderContainer: function (containerData, fragment, uniqueCode) {
      var style = containerData.style;
      var $$containerWrapper = document.createElement("DIV");
      var styleStr = IDS_ModelAna_Utils.transformStyleStr(style);
      $$containerWrapper.style.cssText = styleStr;
      $$containerWrapper.className = containerData.className
        ? containerData.className
        : "ids__model_analysic_container" + Math.random();

      if (containerData.children) {
        this._renderChildren(
          containerData.children,
          $$containerWrapper,
          uniqueCode
        );
      }
      fragment.appendChild($$containerWrapper);
    },
    main: function (resData, container) {
      var _this = this;
      // this.render(resData);
      // console.log('renderUtils is ', resData)
      var fragment = IDS_ModelAna_Utils.$$createDocFragment();
      let templateData = resData.templateData;
      let uniqueCode = resData.uniqueCode;
      let pageId = resData.pageId;
      templateData.forEach(function (renderItem) {
        var type = renderItem.type;

        if (!type) {
          // type 为空，直接渲染图形
          IDS_ModelAna_ChartUtils.createChart({
            viewData: renderItem,
            container: container,
            rootWrapper: IDS_ModelAna_ChartUtils.$$container,
            uniqueCode: uniqueCode,
            pageId: pageId
          });
          return;
        } else {
          _this._renderContainer(renderItem, fragment, uniqueCode);
        }

        // _this._renderContainer(renderItem, fragment)
      });
      this.$$container = IDS_ModelAna_ChartUtils.$$container = container;
      // console.log('container is ', container)
      // this.$$container=IDS_ModelAna_ChartUtils.$$container=document.querySelector('#ids__modelAna_container');
      this.$$container.appendChild(fragment);
    },
    _setInitStatus: function (key) {
      var _this = this;
      var indicatorKey = "ids_indicator_" + key;

      //滚动到
      setTimeout(function () {
        _this._scrollElement(document.getElementById(key));
        var $$indicatorEl = document.getElementById(indicatorKey);

        if ($$indicatorEl) {
          $$indicatorEl.classList.add("ids__report_cur_selected");
          _this.$$curIndicatorEl = $$indicatorEl;
          _this.curIndicatorKey = key;
        }
      }, 200);
    },
    //报告时间
    _renderReportTime: function (reportTime, timeStyle, fragment) {
      var $$time = document.createElement("DIV");
      var styleStr = "";
      for (var key in timeStyle) {
        styleStr += key + ":" + timeStyle[key] + ";";
      }
      // console.log('title styleStr is ', styleStr)
      $$time.style.cssText = styleStr;
      $$time.textContent = reportTime;
      fragment.appendChild($$time);
    },
    //报告标题
    _renderReportTitle: function (title, titleStyle, fragment) {
      //titleStyle
      var $$title = document.createElement("H1");
      console.log("titleStyle is ", titleStyle);
      var styleStr = "";
      for (var key in titleStyle) {
        styleStr += key + ":" + titleStyle[key] + ";";
      }
      console.log("title styleStr is ", styleStr);
      $$title.style.cssText = styleStr;
      $$title.textContent = title;
      fragment.appendChild($$title);
    },
    _renderLayouts: function (layouts, fragment, shapes) {
      var _this = this;
      layouts.forEach(function (layout) {
        const key = layout.key;

        const title = layout.title;
        const desc = layout.desc;

        var $$l = document.createElement("DIV");
        $$l.setAttribute("id", key);
        $$l.className = "ids__report-block";

        if (title) {
          var $$title = document.createElement("H1");
          $$title.textContent = title;
          $$l.appendChild($$title);
        }

        if (desc) {
          var $$desc = document.createElement("SPAN");
          $$desc.className = DESC_CLASS;
          $$desc.textContent = desc;
          $$l.appendChild($$desc);
        }
        let shapesData = shapes[key]; //对应的图、表和其他视图
        fragment.appendChild($$l);
        _this._renderShapes(shapesData, $$l);
      });
    },
    _renderView: function (shape, fragment) {
      var content = shape.content;
      var styleObj = shape.style;
      var tagName = shape.tagName;
      var shapeType = typeof content;
      var contentArr;
      if (shapeType == "string") {
        contentArr = content.split("\n");
      }
      var $$emptyDiv = document.createElement(tagName ? tagName : "DIV");
      if (shape.id) {
        $$emptyDiv.setAttribute("id", shape.id);
      }
      if (tagName) {
        $$emptyDiv.innerHTML = content;
        fragment.appendChild($$emptyDiv);
        return;
      }
      $$emptyDiv.className = EMPTY_VIEW;
      if (styleObj) {
        var styleStr = "";
        for (var key in styleObj) {
          var templateStr = key + ":" + styleObj[key] + ";";
          // styleStr += `${key}:${styleObj[key]};`;  // ie11
          styleStr += templateStr;
        }
        $$emptyDiv.style.cssText = styleStr;
      }
      var templateStr = "";
      contentArr.forEach(function (content) {
        templateStr += "<div>" + content + "</div>";
      });
      $$emptyDiv.innerHTML = templateStr;
      fragment.appendChild($$emptyDiv);
    },
    //change
    _renderList: function (shape, fragment) {
      console.log("shape is ", shape);
      var content = shape.data;
      var $$el = document.createElement("UL");
      var str = "";
      for (var i = 0; i < content.length; i++) {
        str += "<li class='ids__report_list_item'>" + content[i] + "</li>";
      }
      $$el.innerHTML = str;
      fragment.appendChild($$el);
    },
    _renderShapes: function (shapes, fragment) {
      var _this = this;
      if (!shapes || shapes.length == 0) return;

      shapes.forEach(function (shape) {
        var viewType = shape.viewType;
        if (viewType == "table") {
          //renderTable(shape,fragment);
          Table_Utils.renderTable(shape, fragment);
        } else if (viewType == "view") {
          this._renderView(shape, fragment);
        } else if (viewType == "list") {
          //change
          this._renderList(shape, fragment);
        } else {
          //图形
          // renderCharts(shape,fragment);
          console.log("shape is ", shape);
          IDS_ModelAna_ChartUtils.createChart({
            viewData: shape,
            container: fragment,
            rootWrapper: _this.$$container
          });
        }
      });
    },
    //更新视图
    updateRender: function (chartKey, templateData, uniqueCode, pageId) {
      IDS_ModelAna_ChartUtils.updateChart(
        chartKey,
        templateData,
        uniqueCode,
        pageId
      );
    },
    //渲染页面指示器
    _renderIndicator: function (layouts) {
      const _this = this;
      var $$indicatorWrapper = document.querySelector("#ids__report_indicator");

      $$indicatorWrapper.style.top = 170 + "px"; //设置苍穹平台的top值

      var content = "";
      layouts.map(function (layout) {
        const title = layout.title;
        content +=
          "<div class='ids__report_indicator_item' id='ids_indicator_" +
          layout.key +
          "' data-key='" +
          layout.key +
          "'>" +
          title +
          "</div>";
      });
      $$indicatorWrapper.innerHTML = content;
      $$indicatorWrapper.addEventListener(
        "click",
        _this._eventCallback.bind(_this), // ie11
        false
      );
    },
    _clearCurSelected: function (curKey) {
      if (this.$$curIndicatorEl) {
        this.$$curIndicatorEl.classList.remove("ids__report_cur_selected");
      }
    },
    _dealElVisible: function (entry) {
      var intersectionRatio = entry.intersectionRatio;
      var target = entry.target;

      if (intersectionRatio - 0 > 0.00001 && this.$$curIndicatorEl) {
        //
        // 滚动元素的id值
        var intersectionId = target.getAttribute("id");
        // ids_indicator_anchor1
        var indicatorKey = "ids_indicator_" + intersectionId;
        // console.log("indicatorKey is ",indicatorKey);
        if (indicatorKey == this.curIndicatorKey) return;
        var indicatorTarget = document.querySelector("#" + indicatorKey);
        if (this.curIndicatorKey && this.curIndicatorKey != intersectionId) {
          this._clearCurSelected(indicatorKey);
          this.$$curIndicatorEl = indicatorTarget;
          indicatorTarget.classList.add("ids__report_cur_selected");
          this.curIndicatorKey = indicatorKey;
        }
      }
    },
    _createIntersectionOb: function (key) {
      var $$blockEl = this.$$container.querySelector("#" + key);
      var _this = this;
      var observer = new IntersectionObserver(
        function (entities) {
          // console.log("entities is ",entities.length);
          var entity = entities[0];
          _this._dealElVisible(entity);
        },
        {
          threshold: [0]
        }
      );
      observer.observe($$blockEl);
    },
    _eventCallback: function (event) {
      // console.log("event ",event.target);
      var target = event.target;
      var key = target.dataset.key;

      this._clearCurSelected(key);
      this.$$curIndicatorEl = target;
      target.classList.add("ids__report_cur_selected");
      var $el = this.$$container.querySelector("#" + key);
      this._scrollElement($el);
    },
    _scrollElement: function (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };
})();
