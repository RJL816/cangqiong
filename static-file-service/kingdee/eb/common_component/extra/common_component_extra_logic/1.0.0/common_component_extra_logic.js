/**
 * 对js中不同数据的布尔值类型总结:false:空字符串("");null;undefined;0;NaN
 * true:除了上面的false的情况其他都为true
 */
(function (global, factory) {
  "use strict";
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = global.document ?
      factory(global, true) :
      function (w) {
        if (!w.document) {
          throw new Error("Require a window with a document");
        }
        return factory(w);
      };
  } else {
    factory(global);
  }
})(typeof window !== "undefined" ? window : this, function (window) {
  if (window.CommonComponentExtraLogic_1_0_0) {
    return window.CommonComponentExtraLogic_1_0_0;
  }
  var CommonComponentExtraLogic = {
    StringConstant: {
      width: "width",
      height: "height",
      eventExtraPojo: "eventExtraPojo",
      select_row_array: "select_row_array"
    },
    setWidthAndHeight(elString, argMap) {
      if (!elString || !argMap) {
        return
      }
      var element = $("#" + elString);
      if (!element) {
        return;
      }
      argMap.set(CommonComponentExtraLogic.StringConstant.width, element.width());
      argMap.set(CommonComponentExtraLogic.StringConstant.height, element.height());
    },
    edit_rule_batch_cell(componentPojo, eventPojo, eventExtraPojo) {
      var vm = componentPojo.vm;
      var elString = componentPojo.elString;

      var paramMap = new Map();
      paramMap.set(vm.CommonUtils.EVENT_NAME_STRING, eventExtraPojo.methodNameString);
      CommonComponentExtraLogic.setWidthAndHeight(elString, paramMap);
      if (eventExtraPojo) {
        paramMap.set(CommonComponentExtraLogic.StringConstant.eventExtraPojo, eventExtraPojo);
      }
      vm.$options.methods.invoke(paramMap);
    },
    delete_rule_batch_cell_content(componentPojo, eventPojo, eventExtraPojo) {
      var vm = componentPojo.vm;
      var elString = componentPojo.elString;

      var paramMap = new Map();
      paramMap.set(vm.CommonUtils.EVENT_NAME_STRING, eventExtraPojo.methodNameString);
      CommonComponentExtraLogic.setWidthAndHeight(elString, paramMap);
      if (eventExtraPojo) {
        paramMap.set(CommonComponentExtraLogic.StringConstant.eventExtraPojo, eventExtraPojo);
      }
      vm.$options.methods.invoke(paramMap);
    },
    release_or_deal_rule_batch(componentPojo, eventPojo, eventExtraPojo, argMap) {
      var elString = componentPojo.elString;
      CommonComponentExtraLogic.setWidthAndHeight(elString, argMap);
      //获取选择的行
      var selectString = "#" + elString + " input[type='checkbox']:checked";
      var elementArray = $(selectString);
      if (elementArray && elementArray.length && elementArray.length > 0) {
        var array = [];
        for(var item of elementArray) {
          array.push(item.value);
        }
        argMap.set(CommonComponentExtraLogic.StringConstant.select_row_array, array);
      }
    },
    save_rule_batch_model_pojo(componentPojo, eventPojo, eventExtraPojo, argMap) {
      var elString = componentPojo.elString;
      CommonComponentExtraLogic.setWidthAndHeight(elString, argMap);
    },
    delete_rule_batch_cell_item_content(componentPojo, eventPojo, eventExtraPojo) {
      var vm = componentPojo.vm;
      var elString = componentPojo.elString;

      var paramMap = new Map();
      paramMap.set(vm.CommonUtils.EVENT_NAME_STRING, eventExtraPojo.methodNameString);
      CommonComponentExtraLogic.setWidthAndHeight(elString, paramMap);
      if (eventExtraPojo) {
        paramMap.set(CommonComponentExtraLogic.StringConstant.eventExtraPojo, eventExtraPojo);
      }
      vm.$options.methods.invoke(paramMap);
    },
    rule_batch_rule_click_prop(componentPojo, eventPojo, eventExtraPojo) {
      var vm = componentPojo.vm;
      var elString = componentPojo.elString;

      var paramMap = new Map();
      paramMap.set(vm.CommonUtils.EVENT_NAME_STRING, eventExtraPojo.methodNameString);
      CommonComponentExtraLogic.setWidthAndHeight(elString, paramMap);
      if (eventExtraPojo) {
        paramMap.set(CommonComponentExtraLogic.StringConstant.eventExtraPojo, eventExtraPojo);
      }
      vm.$options.methods.invoke(paramMap);
    },
    call_back(componentPojo, eventPojo, eventExtraPojo) {
      var vm = componentPojo.vm;
      var elString = componentPojo.elString;

      var paramMap = new Map();
      if (eventExtraPojo.callBackKeyNameString) {
        paramMap.set(vm.CommonUtils.EVENT_NAME_STRING, eventExtraPojo.callBackKeyNameString);
      } else {
        paramMap.set(vm.CommonUtils.EVENT_NAME_STRING, eventExtraPojo.methodNameString);
      }
      CommonComponentExtraLogic.setWidthAndHeight(elString, paramMap);
      if (eventExtraPojo) {
        paramMap.set(CommonComponentExtraLogic.StringConstant.eventExtraPojo, eventExtraPojo);
      }
      vm.$options.methods.invoke(paramMap);
    }
  }
  //挂载到window中作为全局变量
  window.CommonComponentExtraLogic_1_0_0 = CommonComponentExtraLogic;
  return window.CommonComponentExtraLogic_1_0_0;
});