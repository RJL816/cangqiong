window.ai_ids = window.ai_ids || {};
ai_ids.svgHelper = (function () {
  return {
    baseSetting: {
      axis: {
        pathAttrs: {
          show: true,
          stroke: "#E5E5E5" //
        },
        textAttrs: {
          show: true,
          fill: "rgba(0,0,0,.4)", //#999
          splitVisNum: 0 //配置隔多少个显示，默认为0
        },

        labelAttrs: {
          show: true,
          label: "",
          fill: "#555",
          x: 12,
          y: -10,
          style: {
            "font-size": "12px"
          }
        }
      }
    },
    /**
     * 创建 svg 画布
     */
    createSvg: function (containerSelector, options) {
      // 兼容ie11
      if (!containerSelector) {
        containerSelector = "body";
      }
      // const { attrs, styles } = options;
      var attrs = options && options.attrs,
        styles = options && options.styles;
      containerSelector =
        containerSelector == "body"
          ? containerSelector
          : "#" + containerSelector; //`#${containerSelector}`;
      const svg = d3.select(containerSelector).append("svg");
      const containerRect =
        ai_ids.svgHelper.getContainerRect(containerSelector);
      if (containerRect) {
        if (attrs.hasOwnProperty("width")) {
          attrs.width = containerRect.width;
        }
        if (attrs.hasOwnProperty("height")) {
          const svgPrecent = attrs.svgPrecent || 1;
          attrs.height = containerRect.height * svgPrecent;
        }
      }

      if (Array.isArray(attrs)) {
        attrs.forEach(function (attr) {
          ai_ids.svgHelper.addAttrs(svg, attr);
        });
      } else {
        ai_ids.svgHelper.addAttrs(svg, attrs);
      }
      return svg;
    },
    /**
     * 为svg 元素添加attr属性
     */
    addAttrs: function (svgEl, attrs) {
      const keys = Object.keys(attrs);
      keys.forEach(function (key) {
        let val = attrs[key];
        if (key == "transform") {
          //ie11
          // let temp = {
          //   [key]: val
          // };
          let temp = {};
          temp[key] = val;
          ai_ids.svgHelper.dealWithAttr(temp);
          val = temp[key];
        } else if (key == "className") {
          key = "class";
        }
        svgEl.attr(key, val);
      });
    },
    addStyles: function (svgEl, styles) {
      if (svgEl.empty()) return;
      const keys = Object.keys(styles);
      keys.forEach(function (key) {
        const val = styles[key];
        svgEl.style(key, val);
      });
    },
    //用来处理特殊的attr transform:['translate',x,y] 这种
    dealWithAttr: function (attrs) {
      const keys = Object.keys(attrs);
      console.log("keys is ", keys);
      keys.forEach(function (key) {
        let val = attrs[key];
        if (key == "transform") {
          //ie11
          const tempStr = val[0] + "(" + val[1] + "," + val[2] + ")"; //`${val[0]}(${val[1]},${val[2]})`;
          attrs[key] = tempStr;
        }
      });
    },
    /**
     * 创建x轴
     */
    createAxis: function (svg, scale, options) {
      // const {
      //   attrs,
      //   styles,
      //   axisType,
      //   wrapperClsName,
      //   tickOptions,
      //   cAttrs,
      //   pathAttrs,
      //   textAttrs,
      //   labelAttrs,
      //   renderSecondTick
      // } = options;
      const attrs = options && options.attrs,
        styles = options && options.styles,
        axisType = options && options.axisType,
        wrapperClsName = options && options.wrapperClsName,
        tickOptions = options && options.tickOptions,
        cAttrs = options && options.cAttrs,
        pathAttrs = options && options.pathAttrs,
        textAttrs = options && options.textAttrs,
        labelAttrs = options && options.labelAttrs,
        renderSecondTick = options && options.renderSecondTick;
      if (!svg) {
        console.error("请设置容器!");
        return;
      }
      const gContainer = svg.append("g").attr("class", wrapperClsName);
      if (cAttrs) {
        // console.log('cAttrs is ',cAttrs)
        // svgHelper.dealWithAttr(cAttrs)
        ai_ids.svgHelper.addAttrs(gContainer, cAttrs);
      }

      let axis = null;
      switch (axisType) {
        case "top":
          axis = d3.axisTop(scale);
          break;
        case "bottom":
          axis = d3.axisBottom(scale);
          break;
        case "left":
          axis = d3.axisLeft(scale);
          break;
        case "right":
          axis = d3.axisRight(scale);
          break;
      }

      // debugger
      if (axis) {
        if (tickOptions) {
          /**
           * 可以设置ticks、tickFormat、tickValue、tickPadding
           */
          const tickKeys = Object.keys(tickOptions);
          tickKeys.forEach(function (tickKey) {
            axis[tickKey](tickOptions[tickKey]);
          });
        }
        // debugger
        gContainer.call(axis);
      }
      if (Array.isArray(attrs)) {
        attrs.forEach(function (attr) {
          ai_ids.svgHelper.addAttrs(axis, attr);
        });
      } else {
        if (attrs) {
          ai_ids.svgHelper.addAttrs(axis, attrs);
        }
      }

      let axisStyle = ai_ids.svgHelper.baseSetting.axis;
      //同步 轴配置
      if (pathAttrs) {
        //qhx_need_recover
        // axisStyle = {
        //   ...axisStyle,
        //   pathAttrs: {
        //     ...axisStyle.pathAttrs,
        //     ...pathAttrs
        //   }
        // };
      }
      if (textAttrs) {
        // qhx_need_recover
        // axisStyle = {
        //   ...axisStyle,
        //   textAttrs: {
        //     ...axisStyle.textAttrs,
        //     ...textAttrs
        //   }
        // };
      }
      if (labelAttrs) {
        // qhx_need_recover
        // axisStyle = {
        //   ...axisStyle,
        //   labelAttrs: {
        //     ...axisStyle.labelAttrs,
        //     ...labelAttrs
        //   }
        // };
      }
      console.log("labelArrr sisifsldf ", axisStyle);
      if (renderSecondTick) {
        svg
          .selectAll("." + wrapperClsName + " .tick text") // `.${wrapperClsName} .tick text`
          .append("tspan")
          .attr("x", -5)
          .attr("y", 16)
          .text(function (d) {
            console.log("qhx d", d);
            const secondText = renderSecondTick(d);
            return secondText;
          });
        // renderSecondTick()
      }
      ai_ids.svgHelper._changeAxisStyle(wrapperClsName, axisStyle, gContainer);

      return axis;
    },
    //为x轴、y轴样式 做修改
    _changeAxisStyle: function (wrapperClsName, styles, gContainer) {
      // const { pathAttrs, textAttrs, labelAttrs } = styles;
      var pathAttrs = styles && styles.pathAttrs,
        textAttrs = styles && styles.textAttrs,
        labelAttrs = styles && styles.labelAttrs;
      if (pathAttrs) {
        const path_d3 = d3.select("." + wrapperClsName + " path"); //`.${wrapperClsName} path`
        // let { show, ...newPathAttrs } = pathAttrs;
        let show = pathAttrs && pathAttrs.show;
        let newPathAttrs = pathAttrs; // qhx_need_recover
        console.log("newPathAttrs is ", newPathAttrs);
        if (!show) {
          newPathAttrs["opacity"] = 0;
        }
        if (!path_d3.empty()) {
          ai_ids.svgHelper.addAttrs(path_d3, newPathAttrs);
        }
      }
      if (textAttrs) {
        const texts_d3 = d3.selectAll("." + wrapperClsName + " .tick text"); //`.${wrapperClsName} .tick text`  ie11
        // let { show, splitVisNum, ...newTextAttrs } = textAttrs;
        let show = textAttrs && textAttrs.show,
          splitVisNum = textAttrs && textAttrs.splitVisNum,
          newTextAttrs = textAttrs; // qhx_need_recover
        if (!show) {
          newTextAttrs["opacity"] = 0;
        }
        if (!texts_d3.empty()) {
          ai_ids.svgHelper.addAttrs(texts_d3, newTextAttrs);
        }

        if (splitVisNum) {
          texts_d3.text(function (d, i) {
            if (d.length > 5) return d.substring(0, 2) + "...";
            return d;
          });
          texts_d3
            .filter(function (d, i) {
              console.log("i is ", i);
              if (i % splitVisNum != 0) return true;
            })
            .attr("opacity", 0);
        }
      }
      if (labelAttrs) {
        // const { label, show, style, ...otherLabelAttrs } = labelAttrs;
        const label = labelAttrs && labelAttrs.label,
          show = labelAttrs && labelAttrs.show,
          style = labelAttrs && labelAttrs.style,
          otherLabelAttrs = labelAttrs; // qhx_need_recover
        if (show) {
          const label_d3 = gContainer.append("text").text(label);
          if (otherLabelAttrs) {
            ai_ids.svgHelper.addAttrs(label_d3, otherLabelAttrs);
          }
          if (style) {
            ai_ids.svgHelper.addStyles(label_d3, style);
          }
        }
      }
    },
    /**
     * 创建比例尺
     */
    createScale: function (options) {
      // const { scaleType, domain, range } = options;
      let scaleType = options && options.scaleType,
        domain = options && options.domain,
        range = options && options.range;
      let scale = null;
      switch (scaleType) {
        case "linear":
          scale = d3.scaleLinear();
          break;
        case "band":
          scale = d3.scaleBand();
          break;
        default:
          break;
      }
      if (scale) {
        let domainArr = [];
        /**
         * 设置定义域，也就是数据的域
         */
        if (Array.isArray(domain)) {
          domainArr = domain.slice(0); // [...domain];  //qhx_need_recover
        } else {
          domainArr[0] = domain;
        }
        scale.domain(domainArr);
        /**
         * 设置值域，也就是对应图形上的域
         */
        let rangeArr = [];
        if (Array.isArray(range)) {
          rangeArr = range.slice(0); //[...range];//qhx_need_recover
        } else {
          rangeArr[0] = range;
        }
        scale.range(rangeArr);
      }
      return scale;
    },
    /**
     * 没有数据时，渲染没有数据的提示
     * @param {*} container
     */
    renderEmpty: function (container) {
      const emptyPath = "./kingdee/ai-ids/modelanalysic/img/empty.png";
      //'./kingdee/ai-ids/modelanalysic/img/empty.png'
      if (container.select(".ids_emtpy").empty()) {
        const emtpyContainer = container
          .append("div")
          .attr("class", "ids_empty");
        emtpyContainer.append("img").attr("src", emptyPath);
        emtpyContainer.append("span").text("暂无数据");
      }
    },
    /**
     * 有数据时，清除空提示，如果有的话
     */
    clearEmpty: function (container) {
      const emtpyContainer = container.select(".ids_empty");
      if (!emtpyContainer.empty()) {
        emtpyContainer.remove();
      }
    },

    /**
     * d3 shape
     */
    /**
     * 创建 path 的d属性
     * 接受一个数组的数据
     * 返回一个作为d值的字符串
     */
    createLine: function (options) {
      // const {
      //   x = function() {},
      //   y = () => {},
      //   defined = () => {},
      //   data = [],
      //   curve = () => {}
      // } = options;
      //qhx_need_recover
      let x = options && options.x,
        y = options && options.y,
        defined = options && options.defined,
        data = options && options.data,
        curve = options && options.curve;
      const lineGenerator = d3.line(data);
      lineGenerator.x(x).y(y).defined(defined).curve(curve);
    },
    /**
     * 画直线
     * @param {*} container
     * @param {*} options
     * @returns
     */
    renderLine: function (container, options) {
      // const { attrs } = options;
      var attrs = options && options.attrs;
      if (container.empty()) {
        console.error("容器元素不能为空!");
        return;
      }
      const line = container.append("line");
      if (attrs) {
        ai_ids.svgHelper.addAttrs(line, attrs);
      }
    },
    //画辅助线 主要是以X轴、Y轴为基准画线
    drawAssistantLine: function (container, options) {
      // let {
      //   lineType = "horizontal",
      //   width,
      //   height,
      //   margin,
      //   ...others
      // } = options;
      var lineType = options && options.lineType,
        width = options && options.width,
        height = options && options.height,
        margin = options && options.margin,
        others = options;
      if (container.empty()) {
        console.error("容器元素不能为空!");
        return;
      }
      let pos = {};
      if (lineType == "horizontal" || lineType == "h") {
        //水平线
        pos = {
          x1: 0,
          y1: 0,
          x2: width - margin * 2,
          y2: 0
        };
      } else if (lineType == "vertical" || lineType == "v") {
        //垂直线
        pos = {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: height - margin * 2
        };
      }
    },

    getTranslateVal: function (translateVal) {
      const transformReg = /translate\(([\d|\.]+),([\d]+)\)/;
      const regResult = transformReg.exec(translateVal);
      if (regResult && regResult.length > 0) {
        return regResult[1];
      }
      return 0;
    },
    getTranslateYVal: function (translateVal) {
      const transformReg = /translate\(([\d|\.]+),([\d|\.]+)\)/;
      const regResult = transformReg.exec(translateVal);
      if (regResult && regResult.length > 0) {
        return regResult[2];
      }
      return 0;
    },
    drawRect: function (container, options) {
      if (container.empty()) {
        console.error("容器元素不能为空!");
        return;
      }
      // const { attrs } = options;
      const attrs = options && options.attrs;
      const rect = container.append("rect");
      if (attrs) {
        ai_ids.svgHelper.addAttrs(rect, attrs);
      }
      return rect;
    },
    //画圆
    drawCircle: function (container, options) {
      if (container.empty()) {
        console.error("容器元素不能为空!");
        return;
      }
      const circle = container.append("circle");
      // const { attrs } = options;
      const attrs = options && options.attrs;
      if (attrs) {
        ai_ids.svgHelper.addAttrs(circle, attrs);
      }
      return circle;
    },
    //获取容器外层的rect
    getContainerRect: function (containerSelector) {
      const container = document.querySelector(containerSelector);
      if (container) {
        const rect = container.getBoundingClientRect();
        console.log("container rect is ", rect);
        return rect;
      } else {
        return {
          width: 1000,
          height: 400
        };
      }
    },

    createRadialLine: function (options) {
      // const { angle = () => {}, radius = () => {}, data = [] } = options;
      var angle = options && options.angle,
        radius = options && options.radius,
        data = (options && options.data) || [];
      const radialLineGenerator = d3.radialLine(data);
      radialLineGenerator.angle(angle).radius(radius);

      return radialLineGenerator;
    },
    createArea: function () {},
    //创建tip
    createTip: function (container, options) {
      if (container.empty()) {
        console.error("容器不能为空!");
        return;
      }
      // const { attrs } = options;
      const attrs = options && options.attrs;
      let className = "ids_";
      let tipContainer = null;
      if (!container.select("." + attrs.className).empty()) {
        //`.${attrs.className}`
        tipContainer = container.select("." + attrs.className);
      } else {
        tipContainer = container.append("div");

        if (attrs) {
          if (attrs.className) {
            className = attrs.className;
          }
          ai_ids.svgHelper.addAttrs(tipContainer, attrs);
        }
      }

      return {
        tipContainer: tipContainer,
        tipContainerNode: tipContainer && tipContainer.node(),
        html: function (rowData) {
          let content = "";
          rowData.forEach(function (item) {
            let rowContent = "<div>";
            // const { key, value } = item;
            const key = item && item.key,
              value = item && item.value;
            if (key) {
              let tempStr =
                "<span class=" + className + "_key" + ">" + key + "：</span>";
              rowContent += tempStr;
              // rowContent += `<span class='${className}_key'>${key}：</span>`;
            }
            if (value) {
              let tempStr =
                "<span class=" + className + "_value" + ">" + value + "</span>";
              rowContent += tempStr; //`<span class='${className}_value'>${value}</span>`;
            }
            rowContent += "</div>";
            content += rowContent;
          });
          let node = tipContainer.node();
          node.innerHTML = content;
        }
      };
    },

    /**
     * 清除svg下的第一个g 容器
     */
    clearContainer: function (svg, className) {
      const container = svg.select("g." + className); // `g.${className}`
      if (!container.empty()) {
        container.remove();
      }
    },
    /**
     * 是否已经存在指定className的g容器
     * @param {*} svg
     * @param {*} className
     * @returns
     */
    ifExitContainer: function (svg, className) {
      const container = svg.select("g." + className); //`g.${className}`
      return !container.empty();
    },
    /**
     * 再svg下创建一个class为className的g容器
     * @param {*} svg
     * @param {*} className
     */
    createContainer: function (svg, attrs) {
      let className = attrs.className;
      if (!ai_ids.svgHelper.ifExitContainer(svg, className)) {
        const container = svg.append("g");
        if (attrs) {
          ai_ids.svgHelper.addAttrs(container, attrs);
        }
        return container;
      }
      return null;
    },

    /**
     * 获取tool tip 位置
     */
    getToolTipPos: function (options) {
      // const { pageX, pageY, barWidth, tipCls } = options;
      var pageX = options && options.pageX,
        pageY = options && options.pageY,
        barWidth = options && options.barWidth,
        tipCls = options && options.tipCls;
      console.log("pageX is " + pageX + " and pageY is " + pageY);
      const bodyNode = d3.select("body").node();
      const bodyRect = bodyNode.getBoundingClientRect();

      const tipNode = d3.select("." + tipCls).node(); // `.${tipCls}`
      const tipRect = tipNode.getBoundingClientRect();
      console.log("bodyRect is ", bodyRect);
      console.log("tipRect is ", tipRect);
      if (bodyRect) {
        const bodyWidth = bodyRect.width;
        const bodyHeight = bodyRect.height;
        const tipRectWidth = tipRect.width;
        const tipRectHeight = tipRect.height || 70;
        let left = pageX;
        PageTop = pageY;
        if (tipRectWidth + pageX + 30 > bodyWidth) {
          left = pageX - tipRectWidth - barWidth - 50;
        }
        if (tipRectHeight + pageY + 20 > bodyHeight) {
          PageTop = pageY - 70;
        }
        return {
          left: left,
          PageTop: PageTop
        };
      }
      return null;
    }
  };
})();
