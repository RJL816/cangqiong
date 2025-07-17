/**
 * F7已选人员列表
 * 
 * 列表视图选择列表一条数据时，发addItems指令，已选列表中就会新增一个人员；当已选人员移除时，
 * 发removeItem,列表中的选择标志就会移除，点击全部清除发指令removeAllItems
 *    addItems发的数据格式：args:[{"items":[{"value":"495333908670438450","text":"程孝先"}]}],key:"f7SelectedPerson",methodname:"addItems"
 *    removeItem发的数据格式：args:["495333908670438450"],key:"f7SelectedPerson",methodname:"removeItem"
 *    removeAllItems发的数据格式：args:[],key:"f7SelectedPerson",methodname:"removeAllItems"
 */
(function (KDApi, $) {
  function MyComponent(model) {
    this._setModel(model);
  }
  MyComponent.prototype = {
    _setModel: function (model) {
      this.model = model;
    },
    init: function (props) {
      setHtml(this.model, props);
    },
    update: function (props) {
      updateHtml(this.model, props);
    },
    destoryed: function (props) {
      clearLocalStorage(this.model);
    }
  }

  var setHtml = function (model, props) {
    KDApi.loadFile('./css/f7SelectedPerson.css', model, function () {
      var template = '<div class="f7SelectedPersonList">' +
        '<div class="f7SelectedPersonList-action">' +
        '<div class="f7SelectedPersonList-selected">' + KDApi.getLangMsg(model, 'f7selectedperson.key0001') + '（<label class="f7SelectedPersonList-selectednum">0</label>）</div>' +
        '<div class="f7SelectedPersonList-removeAll">' + KDApi.getLangMsg(model, 'f7selectedperson.key0002') + '</div>' +
        '</div>' +
        '<div class="f7SelectedPersonlist-content">' +
        '</div>' +
        '</div>'
      var result = KDApi.getHTMLStringBytemplate(template, {});
      model.dom.innerHTML = result;
      initEvent(model, props);
	  updateHtml(model, props);
    })
  }
  
  var updateHtml = function(model, props) {
	var data = props.data;
      if (data && data["methodname"]) {
        /**
         * 指令驱动
         * addItems：添加人员
         * removeItem：删除人员
         * removeAllItems：清空全部人员
         */
        switch (data["methodname"]) {
          case "addItems":
            addPerson(model, props);
            break;
          case "removeItem":
            removePerson(model, props);
            break;
          case "removeAllItems":
            removeAllPerson(model, props);
            break;
          default:
            break;
        }
      }
  }
  
  var initEvent = function (model, props) {
    $(".f7SelectedPersonList-removeAll").click(function (e) {
      model.invoke("removeAllItems", JSON.stringify([]));
    });
    $(".f7SelectedPersonlist-content", model.dom).on("click", ".head-delete", function (e) {
      var value = $(e.currentTarget).parent().parent().attr("data-value");
      model.invoke("removeItem", JSON.stringify([value]));
    }).on("mouseenter", ".hr-avatar", function (e) {
      $(".head-delete", e.currentTarget).show();
    }).on("mouseleave", ".hr-avatar", function (e) {
      $(".head-delete", e.currentTarget).hide();
    })
  }

  var addPerson = function (model, props) {
    /**
     * 添加人员，多选和重复点击一条数据（添加了又删除了）时，使用的都是addItems指令
     *    1.将接收到的args里的items放入缓存argsCacher中；
     *    2.比较新数据args和旧缓存argsCacher的差异，找出减少的那一个项；
     *    3.如果args.length < argCacher.length,则为新增人员，反之则为重复点击一条数据（添加了又删除了）
     */
    var args = props.data["args"][0]["items"];
    if (!getLocalStorage(model)) {
      updateLocalStorage(model, []);
    }
    var argsCacher = getLocalStorage(model);
    var personObjList = args;
    var personListString = personObjList.reduce(function (total, item) {
      return total + getAvatarString(model, item);
    }, '');
    $(".f7SelectedPersonlist-content", model.dom).empty();
    $(".f7SelectedPersonlist-content", model.dom).append(personListString);
    $(".f7SelectedPersonList-selectednum", model.dom).text(args.length);
    updateLocalStorage(model, args);
  }
  var removePerson = function (model, props) {
    /**
     * 删除人员，hover人员头像时出现的小icon，点击即删除人员，使用的是removeItem
     *    1.获取被删除的那一项args;
     *    2.找出args在缓存argsCacher中的index;
     *    3.删除该index下人员头像的dom节点，删除argsCacher中与args相同的那一项;
     *    4.更新缓存
     */
    var args = props.data["args"][0];
    var $selectedNum = $(".f7SelectedPersonList-selectednum", model.dom);
    var argsCacher = getLocalStorage(model);
    var index = findObjIndex(argsCacher, args);
    $(".f7SelectedPerson", model.dom).eq(index).remove();
    $selectedNum.text(parseInt($selectedNum.text()) - 1);
    argsCacher.splice(index, 1);
    updateLocalStorage(model, argsCacher);
  }
  var removeAllPerson = function (model, props) {
    /**
     * 全部清空，点击全部清空标签触发removeAllItems指令
     *    1.删除所有已选人员dom节点;
     *    2.更新缓存argsCacher = [];
     */
    var args = props.data["args"];
    var $selectedNum = $(".f7SelectedPersonList-selectednum", model.dom);
    $(".f7SelectedPersonlist-content", model.dom).empty();
    $selectedNum.text(0);
    updateLocalStorage(model, []);
  }

  //创建缓存key
  var createLocalStorageKey = function(model){
    return model.pageId + model.key + "_args_items";
  }
  //获取缓存
  var getLocalStorage = function (model) {
    var localStorageKey = createLocalStorageKey(model)
    var argsCacher = JSON.parse(window.localStorage.getItem(localStorageKey));
    return argsCacher;
  }
  //更新缓存
  var updateLocalStorage = function (model, newCacher) {
    var localStorageKey = createLocalStorageKey(model)
    window.localStorage.setItem(localStorageKey, JSON.stringify(newCacher));
  }
  //清空缓存
  var clearLocalStorage = function (model) {
    var localStorageKey = createLocalStorageKey(model)
    window.localStorage.removeItem(localStorageKey);
  }
  //求找出对象数组匹配某个对象value的index
  var findObjIndex = function (objArray, value) {
    for (var i = 0; i < objArray.length; i++) {
      if (objArray[i].value === value) {
        return i;
      }
    }
  }
  //获取图片的全路径
  var getFullUrl = function (model, path) {
    if (/^data:?/.test(path) || /^http(s)?/.test(path)) {
      return path
    }
    return model.fileServer + path
  }
  //获取用户头像字符串
  var getAvatarString = function (model, personObj) {
    var personString = '<div class="f7SelectedPerson" data-value="' + personObj.value + '">' +
      '<div class="hr-avatar">' +
      '<img class="hr-head" src="' + getFullUrl(model, personObj.path) + '" onerror="onerror=null;src=\'' + KDApi.getNameSpace(model) + './img/test.png' + '\'"/>' +
      '<div class="head-delete" style="display:none;" >' +
      '<div class="delete-jian"></div>' +
      '</div>' +
      '</div>' +
      '<div class="f7SelectedPerson-name" title="' + personObj.text + '">' + personObj.text + '</div>' +
      '</div>';
    return personString;
  }
  /*
   * KDApi.register新增第三个参数：config，object类型，没有传入时默认为空
   * isMulLang：是否使用多语言， 默认为false
  */
  KDApi.register('f7selectedperson', MyComponent, {isMulLang:true});
})(window.KDApi, jQuery)