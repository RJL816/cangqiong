//初始化VUE,由于不在同一个范围内,因此方法名应唯一
function commonComponentLogicMethod(model, props, componentMap) {
  //区分工具类版本,以防相互影响
  var CommonUtils = window.CommonUtils_1_0_1;
  //是否启用日志(通过CommonUtils打印的日志)
  CommonUtils.enableLogBoolean = false;
  //后端传过来的数据
  var commonComponentModelPojoJsonString = props.data.endToFrontObject;
  //将字符串转为对象
  var commonComponentModelPojo = JSON.parse(commonComponentModelPojoJsonString);
  render();

  //内置函数,以便将model、props、componentMap作为局部变量使用,防止在多页签时出错
  function render() {
    //获取VUE实例唯一标识
    function getElString(model) {
      return btoa(encodeURIComponent(model.key + "_" + model.pageId)).replaceAll("=", "a");
    }
    //字符串静态常量
    var StringConstant = {
      commonComponentModelPojo: "commonComponentModelPojo",
      elString: "elString",
      componentMap: "componentMap",
      dataPojo: "dataPojo",
      //兼容处理,以防后端转换对象为null
      compatible: "compatible"
    }
    var elString = getElString(model);
    CommonUtils.log(StringConstant.componentMap, componentMap, StringConstant.elString, elString);
    //注意:由于允许同时存在多个页签,为了避免相互影响,这里使用唯一的ID
    //model.dom.innerHTML = '<div id="' + elString + '" :style="commonComponentModelPojo.rootStylePojo" v-html="commonComponentModelPojo.vueHtmlString" v-text="commonComponentModelPojo.vueTextString">' + commonComponentModelPojo.insideHtmlString + '</div>';
    if (commonComponentModelPojo.insideHtmlString) {
      model.dom.innerHTML = '<div id="' + elString + '" :style="commonComponentModelPojo.rootStylePojo">' + commonComponentModelPojo.insideHtmlString + '</div>';
    } else if (commonComponentModelPojo.vueHtmlString) {
      model.dom.innerHTML = '<div id="' + elString + '" :style="commonComponentModelPojo.rootStylePojo" v-html="commonComponentModelPojo.vueHtmlString"></div>';
    } else if (commonComponentModelPojo.vueTextString) {
      model.dom.innerHTML = '<div id="' + elString + '" :style="commonComponentModelPojo.rootStylePojo" v-text="commonComponentModelPojo.vueTextString"></div>';
    }
    //多语言
    function getLangMsgString(model, key, defaultValueString) {
      var valueString = KDApi.getLangMsg(model, key)
      if (!valueString) {
        return defaultValueString;
      }
      return valueString;
    }

    var confirmString = getLangMsgString(model, 'el___colorpicker___confirm', "确定");
    var clearString = getLangMsgString(model, 'el___colorpicker___clear', "清空");

    Vue.use(VueI18n)
    const i18n = new VueI18n({
      //语言标识
      locale: 'zh',
      messages: {
        'zh': {
          'el': {
            'colorpicker': {
              'confirm': confirmString,
              'clear': clearString
            }
          }
        }
      }
    })
    Vue.use(ELEMENT, {
      i18n: (function (key, value) {
        return i18n.t(key, value);
      })
    })

    var vm = null;
    new Vue({
      //根节点
      el: CommonUtils.format("#{}", elString),
      //数据
      data: {
        //平台的模型对象
        model: model,
        //传入工具类(以便在模板中使用)
        CommonUtils,
        //字符串静态常量
        StringConstant,
        //前后端交互对象
        commonComponentModelPojo: commonComponentModelPojo,
        //生成的模块ID
        elString: elString
      },
      //在实例创建完成后被立即调用
      created() {
        vm = this;
      },
      //VUE渲染完后调用
      mounted() {
        Vue.nextTick(function () {
          vm.$nextTick(function () {
            vm.$options.methods.injectcss();
          })
        })
      },
      //函数方法
      methods: {
        //执行字符串对应的js代码
        eval(dataPojo) {
          CommonUtils.log(vm.$data.StringConstant.dataPojo, dataPojo);
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
          var evalStringList = evalPojo.evalStringList;
          if (!evalStringList || !evalStringList.length || evalStringList.length === 0) {
            return;
          }
          for (var evalString of evalStringList) {
            CommonUtils.log(evalString);
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
          var commonComponentModelPojoJsonString = data.endToFrontObject;
          CommonUtils.log(vm.$data.StringConstant.commonComponentModelPojo, commonComponentModelPojoJsonString);
          var commonComponentModelPojo = JSON.parse(commonComponentModelPojoJsonString);
          var eventPojoBase64String = commonComponentModelPojo.eventPojoBase64String;
          commonComponentModelPojo.eventPojoBase64String = null;
          Vue.set(vm.$data, vm.$data.StringConstant.commonComponentModelPojo, commonComponentModelPojo);
          vm.$options.methods.evalByEventPojo(eventPojoBase64String);
        },
        //保存,将对象发送给后端
        saveModelPojo(data) {
          var argMap = new Map();
          argMap.set(CommonUtils.EVENT_NAME_STRING, data.callbackEndMethodNameString);
          //不推荐使用evalPojo
          if (data.endToFrontObject && data.endToFrontObject.evalPojo && data.endToFrontObject.evalPojo.evalStringList && data.endToFrontObject.evalPojo.evalStringList.length && data.endToFrontObject.evalPojo.evalStringList.length > 0) {
            //参数:eventPojo.paramString
            var base64EncodeBoolean = data.endToFrontObject.evalPojo.base64EncodeBoolean === true;
            for (var evalString of data.endToFrontObject.evalPojo.evalStringList) {
              CommonUtils.log(evalString);
              if (base64EncodeBoolean) {
                eval(Base64.decode(evalString));
              } else {
                eval(evalString);
              }
            }
          }
          //推荐使用eventPojo,以便将函数定义在前端,利于前后端分离
          if (data.endToFrontObject) {
            var eventPojo = data.endToFrontObject.eventPojo;
            if (eventPojo && eventPojo.eventExtraPojoList && eventPojo.eventExtraPojoList.length && eventPojo.eventExtraPojoList.length > 0) {
              if (window.CommonComponentExtraLogic_1_0_0) {
                var componentPojo = window.componentMap.get(vm.$data.elString);
                for (var eventExtraPojo of eventPojo.eventExtraPojoList) {
                  if (eventExtraPojo && eventExtraPojo.methodNameString) {
                    window.CommonComponentExtraLogic_1_0_0[eventExtraPojo.methodNameString](componentPojo, eventPojo, eventExtraPojo, argMap);
                  }
                }
              }
            }
          }
          //兼容勾稽关系,返回空对象
          var cloneCommonComponentModelPojo = {};
          //兼容后端
          cloneCommonComponentModelPojo.typeString = vm.$data.StringConstant.compatible;
          //预制字段
          if (vm.$data.commonComponentModelPojo && vm.$data.commonComponentModelPojo.prefabricatedValueString) {
            cloneCommonComponentModelPojo.prefabricatedValueString = vm.$data.commonComponentModelPojo.prefabricatedValueString;
          }
          argMap.set(vm.$data.StringConstant.commonComponentModelPojo, cloneCommonComponentModelPojo);
          //回调后端方法
          vm.$options.methods.invoke(argMap);
        },
        //预制CSS
        injectcss() {
          if (!vm.$data.commonComponentModelPojo || !vm.$data.commonComponentModelPojo.injectCssString || !window.jQuery || !window.jQuery.injectCSS) {
            return;
          }
          window.jQuery.injectCSS(JSON.parse(vm.$data.commonComponentModelPojo.injectCssString));
        }
      }
    })
    //将vue实例的引用存储到Map中,以便在update时可以获取到VUE实例
    var componentPojo = componentMap.get(elString);
    if (componentPojo) {
      //将vue实例的引用存储到Map中
      componentPojo.vm = vm;
      componentPojo.elString = elString;
    }
  }
}

//后端生成html调用前端方法的代理
if (!window.windowFrontMethodProxyV2) {
  window.windowFrontMethodProxyV2 = function windowFrontMethodProxyV2() {
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
    var componentPojo = window.componentMap.get(btoa(encodeURIComponent(eventPojo.customControlKeyString + "_" + eventPojo.pageIdString)).replaceAll("=", "a"));
    if (!componentPojo) {
      return;
    }
    var vm = componentPojo.vm;
    if (!vm) {
      return;
    }
    if (eventPojo && eventPojo.eventExtraPojoList && eventPojo.eventExtraPojoList.length && eventPojo.eventExtraPojoList.length > 0) {
      if (window.CommonComponentExtraLogic_1_0_0) {
        for (var eventExtraPojo of eventPojo.eventExtraPojoList) {
          if (eventExtraPojo && eventExtraPojo.methodNameString) {
            window.CommonComponentExtraLogic_1_0_0[eventExtraPojo.methodNameString](componentPojo, eventPojo, eventExtraPojo);
          }
        }
      }
    }
    var evalPojo = eventPojo.evalPojo;
    if (!evalPojo) {
      if (eventPojo && eventPojo.preventDefaultBoolean === true) {
        return false;
      }
      return;
    }
    var evalStringList = evalPojo.evalStringList;
    if (!evalStringList || !evalStringList.length || evalStringList.length === 0) {
      if (eventPojo && eventPojo.preventDefaultBoolean === true) {
        return false;
      }
      return;
    }
    //参数:eventPojo.paramString
    for (var evalString of evalStringList) {
      CommonUtils.log(evalString);
      eval(evalString);
    }
    if (eventPojo && eventPojo.preventDefaultBoolean === true) {
      return false;
    }
  }
}