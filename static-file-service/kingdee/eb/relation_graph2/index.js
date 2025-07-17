(function (KDApi, $) {
  //使用Map并根据页面ID区分多页签
  var componentMap = window.componentMap;
  if (!componentMap) {
    componentMap = new Map();
    window.componentMap = componentMap;
  }
  //构造函数
  function MyComponent(model) {
    this._setModel(model)
  }
  MyComponent.prototype = {
    //绑定model
    _setModel: function (model) {
      this.model = model
    },
    //生命周期：初始化
    init: function (props) {
      //根据页面ID获取对象
      var componentPojo = componentMap.get(this.model.pageId);
      if (!componentPojo) {
        componentPojo = {};
        //这里特意在页面ID前面拼接上"vue"字符串,一是防止页面ID重复,而是防止页面ID由数字开头,防止vue对应elString出现问题
        componentPojo.elString = "vue" + this.model.pageId;
        //放到Map中
        componentMap.set(this.model.pageId, componentPojo);
      }
      setHtml(this.model, props);
    },
    //生命周期：更新
    update: function (props) {
      var componentPojo = componentMap.get(this.model.pageId);
      //页面加载的时候第一次不用执行
      if (!componentPojo) {
        return;
      }
      updateHtml(this.model, props);
    },
    //生命周期：销毁
    destoryed: function () {
      //根据页面ID获取对象
      var componentPojo = componentMap.get(this.model.pageId);
      if (componentPojo && componentPojo.vm && componentPojo.vm.$destroy) {
        //调用vue的$destroy,销毁该vue实例的各种监听等
        componentPojo.vm.$destroy();
        //从Map中移除该页面ID对应的元素
        componentMap.delete(this.model.pageId);
      }
    }
  }
  //初始化页面,该方法只会执行一次
  var setHtml = function (model, props) {
    //后端传过来的初始数据
    var relationGraphModelPojoJsonString = (props && props.data && props.data.endToFrontObject) ? props.data.endToFrontObject : null;
    if (!relationGraphModelPojoJsonString) {
      return;
    }
    //通用型强CSS的放最后
    var cssPathStringArray = [];
    //element_ui的CSS
    cssPathStringArray.push('lib/prod/element_ui/2.15.5/index.css');
    //经测试,自定义主题(以便与平台的颜色等保持一致)独立使用没问题,但如果之后再打开业务规则自定义控件,相关CSS会被还原,因此不建议使用自定义主题
    //自定义的CSS,由于改了element_ui(按钮的背景颜色)的CSS,因此需要放在element_ui下面,通过class对原始的css进行覆盖(如:.relation_graph .el-textarea__inner)
    cssPathStringArray.push('css/relation_graph_css.css');
    loadAllCssFile(cssPathStringArray, afterLoadCssCallBackMethod);
    //注意:下面这些函数不要移出,这样可以将model和props作为局部变量使用,否则存在多个页签时,可能会有问题(即model和props不是局部变量而是全局变量,后面的对象可能会覆盖前面的对象)
    //载入css文件,通用型最强的放最后
    function loadAllCssFile(cssPathStringArray, callBackMethod) {
      //获取命名空间
      var namespaceString = KDApi.getNameSpace(model);
      loadCssFile(namespaceString, cssPathStringArray, 0, callBackMethod);
    }
    //按顺序加载CSS
    function loadCssFile(namespaceString, cssPathStringArray, currentIndexInt, callBackMethod) {
      if (!cssPathStringArray || cssPathStringArray.length === 0 || currentIndexInt >= cssPathStringArray.length) {
        return;
      }
      //CSS路径
      var cssPathString = cssPathStringArray[currentIndexInt];
      //注意:这个时候还没有加载JS工具类,因此不能使用工具类中的方法
      var cssUriString = namespaceString + cssPathString;
      //判断当前CSS是否已被加载
      if ($('link[href="' + cssUriString + '"]').length === 0) {
        //加载CSS文件
        KDApi.loadFile(cssPathString, model, function () {
          if (currentIndexInt + 1 === cssPathStringArray.length && typeof callBackMethod === "function") {
            //回调函数
            callBackMethod();
          } else {
            //迭代下一个
            loadCssFile(namespaceString, cssPathStringArray, currentIndexInt + 1, callBackMethod);
          }
        })
      } else {
        //当前CSS已被加载则迭代下一个
        loadCssFile(namespaceString, cssPathStringArray, currentIndexInt + 1, callBackMethod);
      }
    }
    //加载完CSS的回调函数
    function afterLoadCssCallBackMethod() {
      //注意:被依赖的JS的顺序放前面,比如relation-graph依赖vue,那么relation-graph要放在vue后面
      var jsPathStringArray = [];
      //封装的一些工具类
      jsPathStringArray.push('lib/dev/common/1.0.1/common_utils.js');
      //VUE
      jsPathStringArray.push('lib/dev/vue/2.6.14/vue.js');
      //element_ui
      jsPathStringArray.push('lib/prod/element_ui/2.15.5/index.js');
      //全屏
      jsPathStringArray.push('lib/prod/screenfull/5.2.0/screenfull.min.js');
      //由于relation-graph提供的下载图片的功能有问题(没有连接线),因此下载的按钮被隐藏,相关JS也就没有必要加载了
      //jsPathStringArray.push('lib/prod/html2canvas/0.5.0-beta4/html2canvas.min.js');
      //relation-graph
      jsPathStringArray.push('lib/prod/relation-graph/1.1.0/dist_relation-graph.min.js');
      //vue组件工具
      jsPathStringArray.push('lib/prod/http-vue-loader/1.4.2/httpVueLoader.min.js');
      //xe-utils工具类(暂时未用到,目前主要使用lodash,lodash在前端界使用得更普遍)
      //jsPathStringArray.push('lib/prod/xe-utils/3.3.1/xe-utils.js');
      //lodash工具类
      jsPathStringArray.push('lib/prod/lodash/4.17.15/lodash.min.js');
      //base64
      jsPathStringArray.push('lib/prod/base64/3.7.2/base64_min.js');
      //业务逻辑代码
      jsPathStringArray.push('logic.js');
      //由于此时尚未加载'logic.js',因此logicMethod方法不存在,所以需要在initMethod方法中调用logicMethod
      loadAllJsFile(jsPathStringArray, initMethod);
    }
    //载入JS文件,通用型最强的放最后
    function loadAllJsFile(jsPathStringArray, callBackMethod) {
      loadJsFile(jsPathStringArray, 0, callBackMethod);
    }
    //按顺序加载JS
    function loadJsFile(jsPathStringArray, currentIndexInt, callBackMethod) {
      if (!jsPathStringArray || jsPathStringArray.length === 0 || currentIndexInt >= jsPathStringArray.length || !jsPathStringArray[currentIndexInt]) {
        return;
      }
      var jsPathString = jsPathStringArray[currentIndexInt];
      KDApi.loadFile(jsPathString, model, function () {
        //最后一个JS且callBackMethod为函数,则回调
        if (currentIndexInt + 1 === jsPathStringArray.length && typeof callBackMethod === "function") {
          //回调函数
          callBackMethod();
        } else {
          //迭代加载
          loadJsFile(jsPathStringArray, currentIndexInt + 1, callBackMethod);
        }
      })
    }
    //调用业务逻辑方法
    function initMethod() {
      relationGraph2LogicMethod(model, props, componentMap);
    }
  }

  //监听对象发生变化则更新页面
  var updateHtml = function (model, props) {
    if (!props || !props.data || !props.data.frontMethodNameString) {
      return;
    }
    //根据页面ID获取对象
    var componentPojo = componentMap.get(model.pageId);
    if (!componentPojo) {
      return;
    }
    //VUE实例
    var vm = componentPojo.vm;
    //调用前端方法
    if (vm && vm.$options.methods[props.data.frontMethodNameString]) {
      vm.$options.methods[props.data.frontMethodNameString](props.data);
    }
  }
  //注册自定义控件
  KDApi.register('relation_graph2', MyComponent, {
    isMulLang: true
  })
})(window.KDApi, jQuery)