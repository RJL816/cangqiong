//初始化VUE
function logicMethod(model, props, componentMap) {
  //区分工具类版本,以防相互影响
  var CommonUtils = window.CommonUtils_2_0_0;
  //是否启用日志(通过CommonUtils打印的日志)
  CommonUtils.enableLogBoolean = false;
  //后端传过来的数据
  var jsonString = props.data.endToFrontObject;
  //将字符串转为对象
  var tableCustomControlapPojo = JSON.parse(jsonString);
  var tableCustomCellPojoListMap = new Map();
  if (tableCustomControlapPojo.tableCustomCellPojoList) {
    for (var cellPojo of tableCustomControlapPojo.tableCustomCellPojoList) {
      tableCustomCellPojoListMap.set(CommonUtils.getJoinString("_", cellPojo.y, cellPojo.x), cellPojo);
    }
  }
  //获取命名空间
  var namespaceString = KDApi.getNameSpace(model);
  //曾尝试使用平台的如下方法,但发现"vue_template.html"不会被复用,且vueTemplateString始终为空
  //window.KDApi.getTemplateStringByFilePath("vue_template.html", model, {}).then(function (vueTemplateString) {})
  //关系图模板的KEY
  var TABLECUSTOMCONTROLAP_VUE_TEMPLATE_STRING = "tablecustomcontrolap__vue_template";
  var vueTemplateString = componentMap.get(TABLECUSTOMCONTROLAP_VUE_TEMPLATE_STRING);
  if (vueTemplateString) {
    //复用模板(就如同复用CSS、JS等文件),刷新浏览器即可重置(因为这些数据都存储在内存中)
    render(vueTemplateString);
  } else {
    //VUE模板
    var vueTemplateUrlString = CommonUtils.format("{}vue_template.html?version={}", namespaceString, new Date().getTime());
    //./kingdee/eb/relation_graph/vue_template.html?version=1648200643567
    CommonUtils.log(CommonUtils.props, props, "vueTemplateUrlString", vueTemplateUrlString);
    $.get(vueTemplateUrlString, {}, function (vueTemplateString) {
      componentMap.set(TABLECUSTOMCONTROLAP_VUE_TEMPLATE_STRING, vueTemplateString);
      render(vueTemplateString);
    });
  }

  //内置函数,以便将model、props、componentMap作为局部变量使用,防止在多页签时出错
  function render(vueTemplateString) {
    var elString = componentMap.get(model.pageId).elString;
    CommonUtils.log("componentMap", componentMap, 'elString', elString);
    //注意:由于允许同时存在多个页签,为了避免相互影响,这里使用唯一的ID
    model.dom.innerHTML = CommonUtils.format('<div id="{}">', elString) + vueTemplateString + '</div>';
    //字符串常量
    var StringConstant = {
      tableCustomControlapPojo: 'tableCustomControlapPojo',
      tableCustomCellPojoListMap: 'tableCustomCellPojoListMap'
    }
    var vm = null;
    new Vue({
      //根节点
      el: CommonUtils.format("#{}", elString),
      //数据
      data: {
        //平台的模型对象
        model,
        //字符串常量
        StringConstant,
        //传入工具类(以便在模板中使用)
        CommonUtils,
        //表单对象
        tableCustomControlapPojo,
        //表单单元格对象Map
        tableCustomCellPojoListMap
      },
      //在实例创建完成后被立即调用
      created() {
        vm = this;
      },
      //函数方法
      methods: {
        //前端方法代理
        frontMethodProxy() {
          var argMap = CommonUtils.getArgMap(arguments);
          if (!argMap) {
            return;
          }
          var backEndEventNameString = argMap.get(CommonUtils.BACK_END_CUSTOM_EVENT_NAME_STRING);
          if (backEndEventNameString) {
            vm.$data.model.invoke(backEndEventNameString, CommonUtils.convertMapToObject(argMap));
            return;
          }
          argMap.set(CommonUtils.METHOD_PARENT_OBJECT_KEY_STRING, vm.$options.methods);
          CommonUtils.frontMethodProxy(argMap);
        },
        //外部的方法建议在mothods包装一下,这样其他地方可以直接通过"vm.$options.methods.方法名"进行调用,与外部依赖解耦
        //调后端接口,通过通过customEvent方法接收
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
        //整体更新
        updateTableCustomControlapPojo() {
          var jsonString = data.endToFrontObject;
          CommonUtils.log("jsonString", jsonString);
          var tableCustomControlapPojo = JSON.parse(tableCustomControlapPojoJsonString);
          Vue.set(vm.$data, StringConstant.tableCustomControlapPojo, tableCustomControlapPojo);
          var tableCustomCellPojoListMap = new Map();
          if (tableCustomControlapPojo.tableCustomCellPojoList) {
            for (var cellPojo of tableCustomControlapPojo.tableCustomCellPojoList) {
              tableCustomCellPojoListMap.set(CommonUtils.getJoinString("_", cellPojo.y, cellPojo.x), cellPojo);
            }
          }
          Vue.set(vm.$data, StringConstant.tableCustomCellPojoListMap, tableCustomCellPojoListMap);
          //强制重新渲染视图就行了
          vm.$forceUpdate();
        },
        //部分更新
        updateTableCustomCellPojoList(data) {
          var jsonString = data.endToFrontObject;
          CommonUtils.log("jsonString", jsonString);
          var tableCustomControlapPojo = JSON.parse(jsonString);
          if (tableCustomControlapPojo.tableCustomCellPojoList) {
            for (var cellPojo of tableCustomControlapPojo.tableCustomCellPojoList) {
              vm.$data.tableCustomCellPojoListMap.set(CommonUtils.getJoinString("_", cellPojo.y, cellPojo.x), cellPojo);
            }
          }
          //强制重新渲染视图就行了
          vm.$forceUpdate();
        },
        //清空单元格,使其恢复默认显示
        removeTableCustomCellPojoList(data) {
          var jsonString = data.endToFrontObject;
          CommonUtils.log("jsonString", jsonString);
          var cellKeyStringSet = JSON.parse(jsonString);
          for (var cellKeyString of cellKeyStringSet) {
            vm.$data.tableCustomCellPojoListMap.delete(cellKeyString);
          }
          //强制重新渲染视图就行了
          vm.$forceUpdate();
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