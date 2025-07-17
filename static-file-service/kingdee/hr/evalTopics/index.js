"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//2021/09/02   libing Edit NEW
(function (KDApi, $) {
  function MyComponent(model) {
    this._setModel(model);
  }
  var themeColor = null;
  MyComponent.prototype = {
    _setModel: function _setModel(model) {
      this.model = model;
    },
    init: function init(props) {
      //获取主题色
      themeColor = getThemeColor(props.themeColor);
      //初始化
      setHtml(this, this.model, false);
    },
    update: function update(props) {
      //获取主题色
      themeColor = getThemeColor(props.themeColor);
      if (props.data && props.data.submit) {
        //提交触发
        getFormData(this.model, "submit");
      } else if (props.data && props.data.save) {
        //保存触发
        getFormData(this.model, "save");
      } else if (props.data && props.data.initData) {
        //初始化数据
        dataquestion = JSON.parse(props.data.initData);
        setHtml(this, this.model, false);
      } else if (props.data && props.data.initDataView) {
        //初始化（查看）
        dataquestion = JSON.parse(props.data.initDataView);
        setHtml(this, this.model, "view");
      } else if (props.data && props.data.initDataPreView) {
        //初始化（选择和预览）
        dataquestion = JSON.parse(props.data.initDataPreView);
        setHtml(this, this.model, "preview");
      }
    },
    destroy: function destroy(props) {}

    /**
     * 评价题目数据
     */
  };var dataquestion;
  //  = [{ "content": [{ "haveComment": true, "index": 0, "items": [{ "index": 0, "name": "111111111111", "sId": "1158526adg807671069696" },{ "index": 0, "name": "111611111", "sId": "1158556607gad671069696" },{ "index": 0, "name": "11111hkjkjkj111", "sId": "1158ggd526807671069696" },{ "index": 0, "name": "111111111111", "sId": "1158526807671069gga696" },{ "index": 0, "name": "111111111111", "sId": "1158ggg526807671069696" },{ "index": 0, "name": "111111111111", "sId": "11585268076710696aet96" },{ "index": 0, "name": "111111111111", "sId": "115852680767106yyw9696" },{ "index": 0, "name": "111111111111", "sId": "1158526807nb671069696" },{ "index": 0, "name": "111111111111", "sId": "11cx58526807671069696" },{ "index": 0, "name": "111111111111", "sId": "11585za26807671069696" },{ "index": 0, "name": "111111111111", "sId": "11585268mk07671069696" },{ "index": 0, "name": "111111111111", "sId": "1158526807lo671069696" },{ "index": 0, "name": "111111111111", "sId": "1158526807671pp069696" },{ "index": 0, "name": "111111111111", "sId": "115yyt8526807671069696" }, { "index": 1, "name": "111111111111111111111", "sId": "11585268rtryry07671068673" }], "qId": "1158526807671068672", "qTitle": "111111111111", "reqComment": false, "required": true, "type": "radio" }], "description": "1111", "id": "1158526661306637312", "index": 0, "title": "11111" }, { "content": [{ "haveComment": true, "index": 0, "items": [{ "index": 0, "name": "23", "sId": "null" }, { "index": 1, "name": "232323222", "sId": "null" }], "qId": "null", "qTitle": "23223", "reqComment": true, "required": true, "type": "radio" }, { "haveComment": true, "index": 1, "items": [{ "index": 0, "name": "23", "sId": "null" }, { "index": 1, "name": "232323222", "sId": "null" }], "qId": "null", "qTitle": "23223", "reqComment": true, "required": true, "type": "radio" }, { "haveComment": false, "index": 2, "qId": "null", "qTitle": "233", "reqComment": false, "required": true, "type": "simpleAnswer" }, { "haveComment": true, "index": 3, "items": [{ "index": 0, "name": "safasf", "sId": "null" }, { "index": 1, "name": "sadfasdf", "sId": "null" }, { "index": 2, "name": "safasfasf", "sId": "null" }], "qId": "null", "qTitle": "safasf", "reqComment": true, "required": true, "type": "checkbox" }], "description": "232", "id": "1159228981841521664", "index": 1, "title": "222222222" }];

  /**
   * 初始化页面
   * @param {*} self
   * @param {*} model
   * @param {*} isForbid 是否禁止操作
   */
  var setHtml = function setHtml(self, model, isForbid) {
    var data = dataquestion;
    console.log(data)
    if (dataquestion) {
      KDApi.loadFile('./css/evalTopics.css', model, function () {
        KDApi.getTemplateStringByFilePath('./html/evalTopics.html', model, {
          listItem: data
        }).then(function (result) {
          model.dom.innerHTML = result;
          //初始化所有已选项的颜色
          $("input[type='radio']:checked+label,input[type='checkbox']:checked+label").children().css('color', themeColor);
          //初始化标题边框颜色
          $(".dimensions_title").css("borderLeftColor", themeColor);
          //初始化文本域最大填写数
          $(".dimensions_box textarea").attr("maxlength", "1000");
          //添加事件
          isForbid ? isForbid == "view" ? forbiddenOp() : $(".dimensions_box").css("pointer-events", "none") : initActive(model);
        });
      });
    }
  };

  /**
   * 初始化页面元素事件
   * @param {*} model
   */
  function initActive(model) {
    //文本域鼠标滑入效果
    $(".textareaBox").hover(function () {
      console.log($(this).next());
      if ($(this).next().css("display") == undefined || $(this).next().css("display") == 'none') {
        $(this).css("border", "1px solid " + themeColor);
      }
    }, function () {
      if ($(this).next().css("display") == undefined || $(this).next().css("display") == 'none') {
        $(this).css("border", "1px solid #d9d9d9");
      }
    });
    //单选框鼠标滑入效果
    $(".dimensions_box input[type='radio']+label").hover(function () {
      $(this).css("color", themeColor);
      $(this).children().css("color", themeColor);
    }, function () {
      $(this).css("color", "#212121");
      if (!$(this).prev()[0].checked) {
        $(this).children().css("color", "#212121");
      }
    });
    //复选框鼠标滑入效果
    $(".dimensions_box input[type='checkbox']+label").hover(function () {
      $(this).css("color", themeColor);
      $(this).children().css("color", themeColor);
    }, function () {
      $(this).css("color", "#212121");
      if (!$(this).prev()[0].checked) {
        $(this).children().css("color", "#D9D9D9");
      }
    });
    //单选框鼠标选中效果
    $(".dimensions_box input[type='radio']+label").click(function () {
      $(this).parent().siblings().css('color', '#212121');
      $(this).children().css("color", themeColor);
      //如有未填提示语出现，则隐藏它
      $("#tip_" + $(this).parent().parent()[0].id).css("display", "none");
      getFormData(model, "cache"); //获取页面选择填写数据
    });
    //复选框鼠标选中效果
    $(".dimensions_box input[type='checkbox']+label").click(function () {
      if ($(this).prev()[0].checked) {
        $(this).prev().prop("checked", false);
        $(this).children().css("color", "#D9D9D9");
      } else {
        $(this).prev().prop("checked", true);
        $(this).children().css("color", themeColor);
      }
      //提示语是否显示
      var name = $(this).prev().attr("name"); //获取name
      var checkedNum = $("input[name=" + name + "]:checked").length; //获取当前多选框选中的个数
      checkedNum == 0 ? $("#tip_" + $(this).parent().parent()[0].id).css("display", "inline-block") : $("#tip_" + $(this).parent().parent()[0].id).css("display", "none");
      getFormData(model, "cache"); //获取页面选择填写数据
    });
    //文本框填写效果
    $(".dimensions_box textarea").focus(function () {
      if ($(this).parent().next().length == 1) {
        $(this).keyup(function () {
          if ($(this)[0].value === '') {
            $(this).parent().css({ "border": "1px solid red" });
            $(this).parent().next().show();
          } else {
            $(this).parent().css({ "border": "1px solid " + themeColor });
            $(this).parent().next().hide();
          }
        });
      }
    });
    $(".dimensions_box textarea").focusout(function () {
      $(this).unbind('keyup');
    });
    $(".dimensions_box textarea").change(function () {
      getFormData(model, "cache"); //获取页面选择填写数据
    });
  }

  function forbiddenOp() {
    //修改页面显示样式为禁用样式
    $(".dimensions_box textarea").attr("disabled", true);
    $(".dimensions_box textarea").attr("placeholder", "");
    $(".dimensions_box textarea").css({ "backgroundColor": "#f5f5f5", "cursor": "not-allowed" });
    $(".textareaBox").css("backgroundColor", "#f5f5f5");
    $(".dimensions_box label").css("color", "#B2B2B2");
    $(".dimensions_box input[type='radio']+label span").css({ "color": "#bbb", "backgroundColor": "#f1f1f1" });
    $(".dimensions_box input[type='checkbox']+label span").css({ "color": "#bbb", "backgroundColor": "#f1f1f1" });
    $(".radioBox,.checkBox").css("pointer-events", "none");
  }

  /**
   * 获取页面填写结果
   * @param {*} model model
   * @param {*} source 获取源
   */
  function getFormData(model, source) {
    var evalResult = [];
    var isTestPass = true;
    var notFillDimens = [];
    for (var i = 0; i < dataquestion.length; i++) {
      var dId = dataquestion[i].id;
      for (var j = 0; j < dataquestion[i].content.length; j++) {
        var qId = dataquestion[i].content[j].qId;
        if (dataquestion[i].content[j].type == "simpleAnswer") {
          var text = $("#" + qId)[0].value;
          if (text === '' && dataquestion[i].content[j].isRequired && source == "submit") {
            $("#" + qId).parent().css({ "border": "1px solid red" });
            $("#" + qId).parent().next().show();
            isTestPass = false;
            notFillDimens.push(dataquestion[i].title);
          }
          evalResult.push({
            inspectDimid: dId,
            inspectQuid: qId,
            subAnswer: text,
            suboptionId: null
          });
        } else {
          var selects = $('input[name=' + qId + ']');
          var isHaveSelected = false;
          var subComtText = '';
          if (dataquestion[i].content[j].isHaveComment) {
            subComtText = $("#" + qId + 'comment')[0].value;
            if (subComtText === '' && dataquestion[i].content[j].isReqComment && source == "submit") {
              $("#" + qId + 'comment').parent().css({ "border": "1px solid red" });
              $("#" + qId + 'comment').parent().next().show();
              isTestPass = false;
              notFillDimens.push(dataquestion[i].title);
            }
          }
          for (var x in selects) {
            if (selects[x].checked) {
              isHaveSelected = true;
              evalResult.push({
                inspectDimid: dId,
                inspectQuid: qId,
                subAnswer: null,
                suboptionId: selects[x].value,
                comment: subComtText
              });
            }
          }
          if (!isHaveSelected && dataquestion[i].content[j].isRequired && source == "submit") {
            $("#tip_" + qId).css("display", "inline-block");
            isTestPass = false;
            notFillDimens.push(dataquestion[i].title);
          }
        }
      }
    }
    // console.log({ "isTestPass": isTestPass, "evalResult": evalResult, "notFillDimens": [].concat(_toConsumableArray(new Set(notFillDimens))) })
    model.invoke(source, { "isTestPass": isTestPass, "evalResult": evalResult, "notFillDimens": [].concat(_toConsumableArray(new Set(notFillDimens))) });
  }

  /**
   * 获取平台主题色
   * @param {*} themeColor 主题色名称
   */
  var getThemeColor = function getThemeColor(themeColor) {
    switch (themeColor) {
      case 'blue':
        return '#5582F3';
      case 'green':
        return '#29C392';
      case 'orange':
        return '#FC8555';
      case 'purple':
        return '#6869FB';
      case 'red':
        return '#E94E4F';
      default:
        return '#5582F3';
    }
  };
  KDApi.register('evalTopics', MyComponent);
})(window.KDApi, jQuery);