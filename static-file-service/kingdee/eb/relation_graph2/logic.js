//初始化VUE,由于不在同一个范围内,因此方法名应唯一
function relationGraph2LogicMethod(model, props, componentMap) {
  //区分工具类版本,以防相互影响
  var CommonUtils = window.CommonUtils_1_0_1;
  //是否启用日志(通过CommonUtils打印的日志)
  CommonUtils.enableLogBoolean = false;
  //后端传过来的数据
  var relationGraphModelPojoJsonString = props.data.endToFrontObject;
  //将字符串转为对象
  var relationGraphModelPojo = JSON.parse(relationGraphModelPojoJsonString);
  //获取命名空间
  var namespaceString = KDApi.getNameSpace(model);
  //曾尝试使用平台的如下方法,但发现"vue_template.html"不会被复用,且vueTemplateString始终为空
  //window.KDApi.getTemplateStringByFilePath("vue_template.html", model, {}).then(function (vueTemplateString) {})
  //关系图模板的KEY
  var RELATION_GRAPH_VUE_TEMPLATE_STRING = "relation_graph__vue_template";
  var vueTemplateString = componentMap.get(RELATION_GRAPH_VUE_TEMPLATE_STRING);
  if (vueTemplateString) {
    //复用模板(就如同复用CSS、JS等文件),刷新浏览器即可重置(因为这些数据都存储在内存中)
    render(vueTemplateString);
  } else {
    //VUE模板
    var vueTemplateUrlString = CommonUtils.format("{}vue_template.html?version={}", namespaceString, new Date().getTime());
    //./kingdee/eb/relation_graph/vue_template.html?version=1648200643567
    CommonUtils.log(CommonUtils.props, props, "vueTemplateUrlString", vueTemplateUrlString);
    $.get(vueTemplateUrlString, {}, function (vueTemplateString) {
      componentMap.set(RELATION_GRAPH_VUE_TEMPLATE_STRING, vueTemplateString);
      render(vueTemplateString);
    });
  }

  //内置函数,以便将model、props、componentMap作为局部变量使用,防止在多页签时出错
  function render(vueTemplateString) {
    var elString = componentMap.get(model.pageId).elString;
    CommonUtils.log("componentMap", componentMap, 'elString', elString);
    //注意:由于允许同时存在多个页签,为了避免相互影响,这里使用唯一的ID
    model.dom.innerHTML = CommonUtils.format('<div id="{}">', elString) + vueTemplateString + '</div>';
    //关系图组件
    var relationGraph = window['relation-graph'];
    //字符串常量
    var StringConstant = {
      //点击
      CLICK: "CLICK",
      //鼠标(如移入)
      MOURCE: "MOURCE",
      //右键
      CONTEXTMENU: "CONTEXTMENU",
      //点击节点时回调后端
      CLICK_BACK_END: "CLICK_BACK_END",
      //展开节点前继节点
      NODE_PREVIOUS_EXPANDE: "NODE_PREVIOUS_EXPANDE",
      //展开节点后继节点
      NODE_LATER_EXPANDE: "NODE_LATER_EXPANDE",
      //干掉当前节点
      NODE_REMOVE_CURRENT: "NODE_REMOVE_CURRENT",
      //类型
      typeString: "typeString",
      //节点ID
      idString: "idString",
      //节点
      nodeObject: "nodeObject",
      //BACKGROUND_COLOR
      BACKGROUND_COLOR: "BACKGROUND_COLOR",
      //backgroundColor
      backgroundColor: "backgroundColor",
      //stylePojo
      stylePojo: "stylePojo",
      //RULE_MEMBER
      RULE_MEMBER: "RULE_MEMBER",
      //分解图对象
      relationGraphModelPojo: "relationGraphModelPojo",
      //修改右侧信息的内容
      infoHtmlString: "infoHtmlString",
      //关系图节点数据对象
      relationGraphDataPojo: "relationGraphDataPojo",
      //失焦事件
      blur: "blur"
    }
    var vm = null;
    new Vue({
      //根节点
      el: CommonUtils.format("#{}", elString),
      //组件
      components: {
        //关系图组件
        'vue_relation_graph': relationGraph,
        //弹框组件(经测试,relation_graph_show_box.vue会被复用)
        'relation_graph_show_box': httpVueLoader(CommonUtils.format("{}components/relation_graph_show_box.vue?version={}", namespaceString, new Date().getTime()))
      },
      //数据
      data: {
        //平台的模型对象
        model: model,
        //字符串常量
        StringConstant,
        //传入工具类(以便在模板中使用)
        CommonUtils,
        //关系图模型对象
        relationGraphModelPojo: relationGraphModelPojo,
        //关系图REF,用于后续计算鼠标位置
        vueRelationGraphRefString: CommonUtils.getUuidString(),
        //用于展示的弹框对象(非relationGraphModelPojo.relationGraphShowBoxPojoList)
        relationGraphShowBoxPojoList: [],
        //左边的控制台
        rightBoxRefString: CommonUtils.getUuidString(),
        //关系图高度
        vueRelationGraphHeightInteger: 650,
        //关系图宽度
        vueRelationGraphWidthInteger: 650,
        //定时器
        timer: 0
      },
      //在实例创建完成后被立即调用
      created() {
        vm = this;
      },
      //计算属性
      computed: {
        //关系图高度
        vueRelationGraphHeightIntegerString: function () {
          return vm.$data.vueRelationGraphHeightInteger + CommonUtils.px;
        },
        //右侧的维度信息的高度
        //50为关系图标题的高度
        infoHtmlHeightIntegerString: function () {
          return vm.$data.vueRelationGraphHeightInteger + 50 + CommonUtils.px;
        },
        //关系图宽度
        vueRelationGraphWidthIntegerString: function () {
          return vm.$data.vueRelationGraphWidthInteger + CommonUtils.px;
        },
        //维度信息
        showInfoHtmlString: function () {
          if (vm.$data.relationGraphModelPojo && vm.$data.relationGraphModelPojo.infoHtmlString) {
            //兼容处理
            if (vm.$data.relationGraphModelPojo.infoHtmlString.indexOf("<") !== -1) {
              return vm.$data.relationGraphModelPojo.infoHtmlString;
            }
            return Base64.decode(vm.$data.relationGraphModelPojo.infoHtmlString);
          }
          return '';
        }
      },
      //VUE渲染完后调用
      mounted() {
        //Vue.nextTick(callback)：在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM
        //vm.$nextTick(callback)：将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上。
        //易知:vm.$nextTick存在DOM未更新的风险,因此建议同时使用
        Vue.nextTick(function () {
          vm.$nextTick(function () {
            //立即重置关系图
            vm.$options.methods.resetRelationGraph();
            //在mounted声明周期中创建定时器
            vm.$data.timer = setInterval((function temp() {
              //重置关系图
              vm.$options.methods.resetRelationGraph();
              return temp;
            })(), 3000);
          })
        })
      },
      //销毁前调用
      beforeDestroy() {
        //销毁前清除定时器
        clearInterval(vm.$data.timer)
      },
      //函数方法
      methods: {
        //多语言
        getLangMsg(key, defaultValueString) {
          if (!vm || !vm.$data || !vm.$data.model || !KDApi) {
            return defaultValueString;
          }
          var valueString = KDApi.getLangMsg(vm.$data.model, key)
          if (!valueString) {
            return defaultValueString;
          }
          return valueString;
        },
        //执行字符串对应的js代码
        eval(dataPojo) {
          CommonUtils.log("dataPojo", dataPojo);
          if (!dataPojo) {
            return;
          }
          vm.$options.methods.evalByEventPojo(dataPojo.endToFrontObject);
        },
        //执行字符串对应的js代码
        evalByEventPojo(eventPojoBase64String) {
          if (!eventPojoBase64String) {
            return;
          }
          if (CommonUtils.isNotString(eventPojoBase64String)) {
            return;
          }
          //为了防止转义错误及将多个参数合并为一个,将原始的对象转为json字符串,而后再将json字符串转为base64字符串,而前端接受后要先用base64解密,而后将json转为对象
          var eventPojoString = Base64.decode(eventPojoBase64String);
          var eventPojo = JSON.parse(eventPojoString);
          if (!eventPojo) {
            return;
          }
          if (event && eventPojo.preventDefaultBoolean === true) {
            if (event.stopPropagation) {
              event.stopPropagation();
            }
            if (event.preventDefault) {
              event.preventDefault();
            }
          }
          var evalPojo = eventPojo.evalPojo;
          if (!evalPojo) {
            return;
          }
          var consoleBoolean = evalPojo.consoleBoolean === true;
          if (consoleBoolean) {
            CommonUtils.log(eventPojo);
          }
          var evalStringList = evalPojo.evalStringList;
          if (!evalStringList || !evalStringList.length || evalStringList.length === 0) {
            return;
          }
          for (var evalString of evalStringList) {
            if (consoleBoolean) {
              CommonUtils.log(evalString);
            }
            eval(evalString);
          }
          if (eventPojo.preventDefaultBoolean === true) {
            return false;
          }
        },
        //前端方法代理
        frontMethodProxy() {
          var argMap = CommonUtils.getArgMap(arguments);
          if (!argMap) {
            return;
          }
          argMap.set(CommonUtils.METHOD_PARENT_OBJECT_KEY_STRING, vm.$options.methods);
          CommonUtils.frontMethodProxy(argMap);
        },
        //外部的方法建议在mothods包装一下,这样其他地方可以直接通过"vm.$options.methods.方法名"进行调用,与外部依赖解耦
        //调后端接口,通过通过customEvent方法接收
        //arguments[0]:事件名称
        invoke(argMap) {
          CommonUtils.log(CommonUtils.argMap, argMap);
          if (!argMap) {
            return;
          }
          var argMapSizeInt = argMap.size;
          if (argMapSizeInt === 0) {
            return;
          }
          var eventNameString = argMap.get(CommonUtils.EVENT_NAME_STRING);
          if (!eventNameString) {
            return;
          }
          if (argMapSizeInt === 1) {
            vm.$data.model.invoke(eventNameString);
            return;
          }
          vm.$data.model.invoke(eventNameString, CommonUtils.convertMapToObject(argMap));
        },
        //后端调用前端更新modelPojo的方法
        updateModelPojo(data) {
          var relationGraphModelPojoJsonString = data.endToFrontObject;
          CommonUtils.log("relationGraphModelPojoJsonString", relationGraphModelPojoJsonString);
          var relationGraphModelPojo = JSON.parse(relationGraphModelPojoJsonString);
          var eventPojoBase64String = relationGraphModelPojo.eventPojoBase64String;
          relationGraphModelPojo.eventPojoBase64String = null;
          Vue.set(vm.$data, 'relationGraphModelPojo', relationGraphModelPojo);
          vm.$options.methods.updateRelationGraphByVueData();
          vm.$options.methods.evalByEventPojo(eventPojoBase64String);
        },
        //显示关系图
        //Vue.nextTick(callback)：在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM
        //vm.$nextTick(callback)：将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上。
        updateRelationGraph(graphOptions, graphJsonData) {
          //设置布局
          Vue.nextTick(function () {
            vm.$nextTick(function () {
              var seeksRelationGraph = vm.$refs.seeksRelationGraph;
              if (!seeksRelationGraph) {
                return;
              }
              if (graphOptions) {
                seeksRelationGraph.setOptions(graphOptions, (seeksRGGraph) => {
                })
              }
              if (graphJsonData) {
                //设置关系图数据
                seeksRelationGraph.setJsonData(graphJsonData, (seeksRGGraph) => {
                })
              }
              //刷新
              seeksRelationGraph.refresh();
            })
          })
        },
        //刷新关系图
        updateRelationGraphByVueData() {
          var relationGraphModelPojo = vm.$data.relationGraphModelPojo;
          if (!relationGraphModelPojo) {
            return;
          }
          vm.$options.methods.updateRelationGraph(relationGraphModelPojo.relationGraphOptionsPojo, relationGraphModelPojo.relationGraphDataPojo);
        },
        //右键
        showContextmenu(argMap) {
          var nodeObject = argMap.get(StringConstant.nodeObject);
          var event = argMap.get(CommonUtils.event);
          if (!vm.$data.relationGraphModelPojo.relationGraphShowBoxParent || !vm.$data.relationGraphModelPojo.relationGraphShowBoxParent.relationGraphShowBoxPojoList) {
            return;
          }
          var relationGraphShowBoxPojoList = vm.$data.relationGraphModelPojo.relationGraphShowBoxParent.relationGraphShowBoxPojoList;
          if (!Array.isArray(relationGraphShowBoxPojoList) || relationGraphShowBoxPojoList.length === 0) {
            return;
          }
          //找到右键弹框对象
          var targetRelationGraphShowBoxPojoList = relationGraphShowBoxPojoList.filter((item) => {
            if (!item) {
              return false;
            }
            if (!(item.typeString === StringConstant.CONTEXTMENU)) {
              return false;
            }
            return true;
          });
          if (!targetRelationGraphShowBoxPojoList || targetRelationGraphShowBoxPojoList.length === 0) {
            return;
          }
          var targetRelationGraphShowBoxPojo = targetRelationGraphShowBoxPojoList[0];
          var relationGraphShowBoxPojo = {};
          //节点的唯一ID
          relationGraphShowBoxPojo.idString = nodeObject.id;
          relationGraphShowBoxPojo.showBoxBoolean = true;
          relationGraphShowBoxPojo.typeString = StringConstant.CONTEXTMENU;
          //这里不使用深复制也没有问题(因为目前不会对下面这个对象进行修改),但为了防止以后可能出现的问题,还是使用深复制
          relationGraphShowBoxPojo.contextmenuItemComponentList = _.cloneDeep(targetRelationGraphShowBoxPojo.contextmenuItemComponentList);
          //生成CSS样式
          relationGraphShowBoxPojo.relationGraphShowBoxStylePojo = vm.$options.methods.getRelationGraphShowBoxStylePojo(event, targetRelationGraphShowBoxPojo);
          var newRelationGraphShowBoxPojoList = vm.$data.relationGraphShowBoxPojoList.filter((item) => {
            if (!item) {
              return false;
            }
            if (!(item.typeString === StringConstant.CONTEXTMENU)) {
              return true;
            }
            if (!(item.showBoxBoolean === true)) {
              return false;
            }
            if (item.idString === nodeObject.id) {
              return false;
            }
            return true;
          });
          newRelationGraphShowBoxPojoList.push(relationGraphShowBoxPojo);
          Vue.set(vm.$data, 'relationGraphShowBoxPojoList', newRelationGraphShowBoxPojoList);
        },
        //生成弹框STYLE对象
        getRelationGraphShowBoxStylePojo(event, targetRelationGraphShowBoxPojo, defaultWidthString, defaultHeightString) {
          var relationGraphShowBoxStylePojo = {};
          //经测试,getBoundingClientRect与getElementAbsPointPojo返回的对象中相关内容一致
          //CommonUtils.getElementAbsPointPojo($(CommonUtils.format("#{}", vueRelationGraphRefString))[0])
          var basePosition = vm.$refs[vm.$data.vueRelationGraphRefString].getBoundingClientRect();
          //注意,该绝对路径是基于父元素(position: relative),即vueRelationGraphRefString对于的元素,所以需要减去vueRelationGraphRefString对于的元素的坐标
          relationGraphShowBoxStylePojo.left = event.clientX - basePosition.x + 10 + CommonUtils.px;
          relationGraphShowBoxStylePojo.top = event.clientY - basePosition.y + 10 + CommonUtils.px;
          //CommonUtils.log('basePosition', basePosition, 'relationGraphShowBoxStylePojo', relationGraphShowBoxStylePojo, "event", event, "event.clientX", event.clientX, "event.clientY", event.clientY);
          if (defaultWidthString) {
            relationGraphShowBoxStylePojo.width = defaultWidthString;
          }
          if (defaultHeightString) {
            relationGraphShowBoxStylePojo.height = defaultHeightString;
          }
          //鼠标右键没有targetRelationGraphShowBoxPojo对象
          if (targetRelationGraphShowBoxPojo && targetRelationGraphShowBoxPojo.stylePojo) {
            if (targetRelationGraphShowBoxPojo.stylePojo.width) {
              //注意:如果不使用深复制,可能会报:[Vue warn]: $attrs is readonly.
              relationGraphShowBoxStylePojo.width = _.cloneDeep(targetRelationGraphShowBoxPojo.stylePojo.width);
            }
            if (targetRelationGraphShowBoxPojo.stylePojo.height) {
              //注意:如果不使用深复制,可能会报:[Vue warn]: $attrs is readonly.
              relationGraphShowBoxStylePojo.height = _.cloneDeep(targetRelationGraphShowBoxPojo.stylePojo.height);
            }
          }
          return relationGraphShowBoxStylePojo;
        },
        getRightBoxWidthInteger() {
          //盒子的位置(优先从vue实例的$refs中取,因为jquery根据ID取非常耗费性能)
          if (!vm.$refs[vm.$data.rightBoxRefString]) {
            return 0;
          }
          var basePosition = vm.$refs[vm.$data.rightBoxRefString].getBoundingClientRect();
          if (!basePosition || !basePosition.width) {
            return 0;
          }
          return basePosition.width;
        },
        getVueRelationGraphStylePojo() {
          //根节点的位置信息
          if (!vm.$el) {
            return null;
          }
          //如果element不可见则不处理
          if (window.jQuery(vm.$el).is(':hidden') === true) {
            return null;
          }
          //在低版本的浏览器中,下列语句返回的对象中没有x和y字段
          var rootPosition = vm.$el.getBoundingClientRect();
          //右边的信息框的宽度
          var rightBoxWidthInteger = vm.$options.methods.getRightBoxWidthInteger();
          //窗口宽度
          var windowWidthInteger = window.innerWidth || document.body.clientWidth;
          //关系图的宽度=当前窗口的宽度-距左边框的距离-边距
          var targetWidthInteger = windowWidthInteger - rightBoxWidthInteger - rootPosition.left - 30;
          //窗口高度
          var windowHeightInteger = window.innerHeight || document.body.clientHeight;
          //自定义控件的最合适的高度(这里之所以-20是为了防止出现滚动条)
          var targetHeightInteger = windowHeightInteger - rootPosition.top - 20;
          if (vm.$data.relationGraphModelPojo.graphTitleString) {
            //减去标题的长度
            targetHeightInteger = targetHeightInteger - 50;
          }
          var stylePojo = {};
          stylePojo.widthInteger = targetWidthInteger;
          stylePojo.heightInteger = targetHeightInteger;
          return stylePojo;
        },
        //重置关系图
        resetRelationGraph() {
          if (vm.$refs && vm.$refs.seeksRelationGraph && vm.$refs.seeksRelationGraph.graphSetting && vm.$refs.seeksRelationGraph.graphSetting.fullscreen === true) {
            return;
          }
          var vueRelationGraphStylePojo = vm.$options.methods.getVueRelationGraphStylePojo();
          if (!vueRelationGraphStylePojo || !vueRelationGraphStylePojo.widthInteger || !vueRelationGraphStylePojo.heightInteger) {
            return;
          }
          if (vm.$data.vueRelationGraphWidthInteger === vueRelationGraphStylePojo.widthInteger && vm.$data.vueRelationGraphHeightInteger === vueRelationGraphStylePojo.heightInteger) {
            return;
          }
          //自定义控件的宽度和高度
          Vue.set(vm.$data, 'vueRelationGraphWidthInteger', vueRelationGraphStylePojo.widthInteger);
          Vue.set(vm.$data, 'vueRelationGraphHeightInteger', vueRelationGraphStylePojo.heightInteger);
          //刷新关系图
          vm.$options.methods.updateRelationGraphByVueData();
        },
        //前后端交互
        actionMethod(argMap) {
          var typeString = argMap.get(StringConstant.typeString);
          var relationGraphActionPojo = {};
          relationGraphActionPojo.idString = argMap.get(StringConstant.idString);
          relationGraphActionPojo.typeString = typeString;
          //是否需要坐标信息
          if (!(argMap.get(StringConstant.NOT_NEED_RELATION_GRAPH_ACTION_POSITION_POJO_BOOLEAN_KEY_STRING) === true)) {
            //坐标
            var relationGraphActionPositionPojo = {};
            var relMapCanvasElement = window.jQuery("#" + vm.$el.id + " div[class='rel-map-canvas']")[0];
            CommonUtils.log("relMapCanvasElement", relMapCanvasElement);
            relationGraphActionPositionPojo.marginLeftString = $(relMapCanvasElement).css('margin-left');
            relationGraphActionPositionPojo.marginTopString = $(relMapCanvasElement).css('margin-top');
            relationGraphActionPojo.relationGraphActionPositionPojo = relationGraphActionPositionPojo;
            var nodeObjectArray = vm.$refs.seeksRelationGraph.getNodes();
            if (nodeObjectArray && nodeObjectArray.length > 0) {
              var axisPojoList = [];
              for (var nodeObject of nodeObjectArray) {
                var axisPojo = {};
                axisPojo.idString = nodeObject.id;
                axisPojo.xaxisInteger = nodeObject.x;
                axisPojo.yaxisInteger = nodeObject.y;
                axisPojoList.push(axisPojo);
              }
              relationGraphActionPositionPojo.axisPojoList = axisPojoList;
            }
          }
          var relationGraphModelPojo = vm.$data.relationGraphModelPojo;
          relationGraphModelPojo.relationGraphActionPojo = relationGraphActionPojo;
          vm.$options.methods.invoke(CommonUtils.getMap(CommonUtils.EVENT_NAME_STRING, typeString, 'relationGraphModelPojo', relationGraphModelPojo));
        },
        //单元格鼠标移入
        cellMethod(argMap) {
          //单元格对象
          var relationGraphNodeDataCellPojo = argMap.get('relationGraphNodeDataCellPojo');
          if (!relationGraphNodeDataCellPojo) {
            return;
          }
          var typeStringList = relationGraphNodeDataCellPojo.typeStringList;
          if (CommonUtils.isEmpty(typeStringList)) {
            return;
          }
          //绑定的函数
          if (!relationGraphNodeDataCellPojo.methodPojoList) {
            return;
          }
          //单元格绑定的函数
          var methodPojoList = relationGraphNodeDataCellPojo.methodPojoList;
          if (CommonUtils.isEmpty(methodPojoList)) {
            return;
          }
          //监听的事件名称,如:mouseover,mouseout,click
          var listenMethodNameString = argMap.get('listenMethodNameString');
          if (!listenMethodNameString) {
            return;
          }
          //找出指定的事件对象
          var filterMethodPojoList = methodPojoList.filter((item) => {
            return item && item.listenMethodNameString === listenMethodNameString;
          });
          //如果事件对象不存在或存在多个则直接return
          if (!(filterMethodPojoList.length === 1)) {
            return;
          }
          //事件对象
          var methodPojo = filterMethodPojoList[0];
          //鼠标移入
          if (CommonUtils.mouseover === listenMethodNameString) {
            //设置单元格背景颜色
            if (CommonUtils.contain(typeStringList, StringConstant.BACKGROUND_COLOR)) {
              if (!(relationGraphNodeDataCellPojo.notUpdateBackgroundColorBoolean) === true) {
                //单元格CSS样式对象
                if (!relationGraphNodeDataCellPojo.stylePojo) {
                  Vue.set(relationGraphNodeDataCellPojo, StringConstant.stylePojo, {});
                }
                //设置背景颜色
                Vue.set(relationGraphNodeDataCellPojo.stylePojo, StringConstant.backgroundColor, '#F6F7F9');
              }
            }
            //显示维度及维度成员弹框
            if (CommonUtils.contain(typeStringList, 'RULE_MEMBER')) {
              if (!relationGraphNodeDataCellPojo.idString) {
                return;
              }
              var relationGraphShowBoxParent = vm.$data.relationGraphModelPojo.relationGraphShowBoxParent;
              if (!relationGraphShowBoxParent) {
                return;
              }
              //是否启用鼠标弹框
              if (!(relationGraphShowBoxParent.enableMourceBoxBoolean === true)) {
                return;
              }
              var relationGraphShowBoxPojoList = relationGraphShowBoxParent.relationGraphShowBoxPojoList;
              if (!relationGraphShowBoxPojoList || !relationGraphShowBoxPojoList.length || relationGraphShowBoxPojoList.length === 0) {
                return;
              }
              //找到该节点对应的弹框对象
              var targetRelationGraphShowBoxPojoList = relationGraphShowBoxPojoList.filter((item) => {
                return item && item.idString === relationGraphNodeDataCellPojo.idString && item.typeString === StringConstant.MOURCE;
              });
              if (targetRelationGraphShowBoxPojoList.length === 0) {
                return;
              }
              var targetRelationGraphShowBoxPojo = targetRelationGraphShowBoxPojoList[0];
              var relationGraphShowBoxPojo = {};
              //节点的唯一ID
              relationGraphShowBoxPojo.idString = relationGraphNodeDataCellPojo.idString;
              relationGraphShowBoxPojo.showBoxBoolean = true;
              relationGraphShowBoxPojo.typeString = StringConstant.MOURCE;
              relationGraphShowBoxPojo.boxStyleTypeString = targetRelationGraphShowBoxPojo.boxStyleTypeString;
              //注意:如果不使用深复制,可能会报:[Vue warn]: $attrs is readonly.
              relationGraphShowBoxPojo.showMessageString = _.cloneDeep(targetRelationGraphShowBoxPojo.messageString);
              var event = argMap.get(CommonUtils.event);
              relationGraphShowBoxPojo.relationGraphShowBoxStylePojo = vm.$options.methods.getRelationGraphShowBoxStylePojo(event, targetRelationGraphShowBoxPojo, "100%", "100%");
              CommonUtils.log('vm.$data.relationGraphShowBoxPojoList', vm.$data.relationGraphShowBoxPojoList);
              //剔除关闭的弹框,剔除同一节点上的弹框
              var newRelationGraphShowBoxPojoList = vm.$data.relationGraphShowBoxPojoList.filter((item) => {
                if (!item) {
                  return false;
                }
                if (!(item.showBoxBoolean === true)) {
                  return false;
                }
                return !(item.idString === relationGraphNodeDataCellPojo.idString && item.typeString === StringConstant.MOURCE);
              });
              newRelationGraphShowBoxPojoList.push(relationGraphShowBoxPojo);
              Vue.set(vm.$data, 'relationGraphShowBoxPojoList', newRelationGraphShowBoxPojoList);
            }
            return;
          }
          //鼠标移出
          if (CommonUtils.mouseout === listenMethodNameString) {
            //取消单元格背景颜色
            if (CommonUtils.contain(typeStringList, StringConstant.BACKGROUND_COLOR)) {
              if (!(relationGraphNodeDataCellPojo.notUpdateBackgroundColorBoolean) === true) {
                //单元格CSS样式对象
                if (!relationGraphNodeDataCellPojo.stylePojo) {
                  Vue.set(relationGraphNodeDataCellPojo, StringConstant.stylePojo, {});
                }
                //不设置背景颜色
                Vue.set(relationGraphNodeDataCellPojo.stylePojo, StringConstant.backgroundColor, CommonUtils.unset);
              }
            }
            //显示维度及维度成员弹框
            if (CommonUtils.contain(typeStringList, 'RULE_MEMBER')) {
              if (!relationGraphNodeDataCellPojo.idString) {
                return;
              }
              var relationGraphShowBoxParent = vm.$data.relationGraphModelPojo.relationGraphShowBoxParent;
              if (!relationGraphShowBoxParent) {
                return;
              }
              //是否启用鼠标弹框
              if (!(relationGraphShowBoxParent.enableMourceBoxBoolean === true)) {
                return;
              }
              var relationGraphShowBoxPojoList = relationGraphShowBoxParent.relationGraphShowBoxPojoList;
              if (!relationGraphShowBoxPojoList || !relationGraphShowBoxPojoList.length || relationGraphShowBoxPojoList.length === 0) {
                return;
              }
              //剔除关闭的弹框,剔除同一节点上的弹框
              var newRelationGraphShowBoxPojoList = vm.$data.relationGraphShowBoxPojoList.filter((item) => {
                if (!item) {
                  return false;
                }
                if (!(item.showBoxBoolean === true)) {
                  return false;
                }
                return !(item.idString === relationGraphNodeDataCellPojo.idString && item.typeString === StringConstant.MOURCE);
              });
              newRelationGraphShowBoxPojoList.push(relationGraphShowBoxPojo);
              Vue.set(vm.$data, 'relationGraphShowBoxPojoList', newRelationGraphShowBoxPojoList);
            }
            return;
          }
          //点击事件
          if (CommonUtils.click === listenMethodNameString) {
            if (CommonUtils.contain(typeStringList, StringConstant.BACKGROUND_COLOR)) {
              //单元格CSS样式对象
              if (!relationGraphNodeDataCellPojo.stylePojo) {
                Vue.set(relationGraphNodeDataCellPojo, StringConstant.stylePojo, {});
              }
              //不设置背景颜色
              Vue.set(relationGraphNodeDataCellPojo.stylePojo, StringConstant.backgroundColor, '#E1E7EE');
              //回调后端
              if (methodPojo.eventNameString) {
                var relationGraphActionPojo = {};
                var nodeObject = argMap.get(StringConstant.nodeObject);
                //兼容历史数据,默认为节点ID
                relationGraphActionPojo.idString = nodeObject.id;
                //单元格ID
                relationGraphActionPojo.cellIdString = relationGraphNodeDataCellPojo.idString;
                //坐标
                var relationGraphActionPositionPojo = {};
                //关系图DIV
                var relMapCanvasElement = window.jQuery("#" + vm.$el.id + " div[class='rel-map-canvas']")[0];
                //左边距
                relationGraphActionPositionPojo.marginLeftString = $(relMapCanvasElement).css('margin-left');
                //上边距
                relationGraphActionPositionPojo.marginTopString = $(relMapCanvasElement).css('margin-top');
                var axisPojoList = [];
                var axisPojo = {};
                axisPojo.idString = nodeObject.id;
                axisPojo.xaxisInteger = nodeObject.x;
                axisPojo.yaxisInteger = nodeObject.y;
                axisPojoList.push(axisPojo);
                relationGraphActionPositionPojo.axisPojoList = axisPojoList;
                relationGraphActionPojo.relationGraphActionPositionPojo = relationGraphActionPositionPojo;
                Vue.set(vm.$data.relationGraphModelPojo, 'relationGraphActionPojo', relationGraphActionPojo);
                //构造参数
                var paramMap = new Map();
                paramMap.set(CommonUtils.EVENT_NAME_STRING, methodPojo.eventNameString);
                paramMap.set('relationGraphModelPojo', vm.$data.relationGraphModelPojo);
                paramMap.set('relationGraphNodeDataCellPojo', relationGraphNodeDataCellPojo);
                vm.$options.methods.invoke(paramMap);
              }
            }
          }
        },
        //修改右侧信息的内容
        updateInfoHtmlString(data) {
          Vue.set(vm.$data.relationGraphModelPojo, vm.$data.StringConstant.infoHtmlString, data.endToFrontObject);
        },
        //局部更新
        partial_updates(data) {
          var relationGraphModelPojoJsonString = data.endToFrontObject;
          CommonUtils.log("relationGraphModelPojoJsonString", relationGraphModelPojoJsonString);
          var relationGraphModelPojo = JSON.parse(relationGraphModelPojoJsonString);
          for(var keyString in relationGraphModelPojo) {
            Vue.set(vm.$data.relationGraphModelPojo, keyString, relationGraphModelPojo[keyString]);
          }
          vm.$options.methods.evalByEventPojo(relationGraphModelPojo.eventPojoBase64String);
        }
      }
    })
    //将vue实例的引用存储到Map中,以便在update时可以获取到VUE实例
    var componentPojo = componentMap.get(model.pageId);
    if (componentPojo) {
      //将vue实例的引用存储到Map中
      componentPojo.vm = vm;
    }
  }
}

//后端生成html调用前端方法的代理
if (!window.windowFrontMethodProxy) {
  window.windowFrontMethodProxy = function windowFrontMethodProxy() {
    //区分工具类版本,以防相互影响
    var CommonUtils = window.CommonUtils_1_0_1;
    CommonUtils.log(CommonUtils.arguments, arguments, CommonUtils.event, event);
    if (!arguments || !arguments.length || !(arguments.length === 1)) {
      return;
    }
    if (CommonUtils.isNotString(arguments[0])) {
      return;
    }
    var jsonString = Base64.decode(arguments[0]);
    var eventPojo = JSON.parse(jsonString);
    if (!eventPojo) {
      return;
    }
    if (event && eventPojo.preventDefaultBoolean === true) {
      if (event.stopPropagation) {
        event.stopPropagation();
      }
      if (event.preventDefault) {
        event.preventDefault();
      }
    }
    if (!eventPojo.pageIdString) {
      return;
    }
    var componentPojo = window.componentMap.get(eventPojo.pageIdString);
    if (!componentPojo) {
      return;
    }
    var vm = componentPojo.vm;
    if (!vm) {
      return;
    }
    var evalPojo = eventPojo.evalPojo;
    if (!evalPojo) {
      return;
    }
    var consoleBoolean = evalPojo.consoleBoolean === true;
    if (consoleBoolean) {
      CommonUtils.log(eventPojo);
    }
    var evalStringList = evalPojo.evalStringList;
    if (!evalStringList || !evalStringList.length || evalStringList.length === 0) {
      return;
    }
    //参数:eventPojo.paramString
    for (var evalString of evalStringList) {
      if (consoleBoolean) {
        CommonUtils.log(evalString);
      }
      eval(evalString);
    }
    if (eventPojo.preventDefaultBoolean === true) {
      return false;
    }
  }
}