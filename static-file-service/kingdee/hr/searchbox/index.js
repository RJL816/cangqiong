(function (KDApi, $, _) {
  function MyComponent(model) {
    this._setModel(model);
  }
  //是否有业务数据更新
  var isUpdate = false;
  //轮询列表（这个声明的作用是为了解决init和update两个方法里存在异步函数执行顺序的问题）
  var eventLoopList = [];
  MyComponent.prototype = {
    _setModel: function (model) {
      this.model = model;
    },
    init: function (props) {
      isUpdate = false;
      eventLoopList.push(1);
      setHtml(this.model, props, isUpdate);
    },
    update: function (props) {
      isUpdate = true;
      eventLoopList.push(1);
      var self = this;
      var interval = setInterval(function(){
        if(eventLoopList.length === 1){
          setHtml(self.model, props, isUpdate);
          clearInterval(interval);
        }
      },26);
    },
    destoryed: function () {

    }
  }

  function SearchBox(model, props, searchInput, history) {
    //this指向
    var self = this;
    //下拉面板是否显示
    var isSelectPanelShow = false;
    //下拉选项的索引
    var itemIndex = -1;
    //关键字集
    this.keyItem = props.data && props.data[2] ? props.data[2]['全部'] : [];
    //关键字索引
    var keyIndex = -1;
    //搜索框
    //var searchInput = $('.search-value');
    //下拉面板
    var selectMenu = null;
    //下拉选项集
    this.selectItemList = props.data && props.data[0] ? props.data[0]['全部'] : ['个人信息', '教育信息', '工作经历', '本司任职经历', '员工标签'];
    //历史记录
    this.history = history || [];

    //搜索框点击事件
    this.handleInputClick = function (e) {
      e.stopPropagation();
      e.stopPropagation();
      var searchInput = $(e.target);
      searchInput.focus();
      self.showPlaceHolder(e);
      if (searchInput.val() !== '') {
        isSelectPanelShow = true;
        renderSelectPanel(searchInput.val(), props);
      }else if (this.hasKeyItem()) {
        isSelectPanelShow = false;
      } else {
        isSelectPanelShow = true;
        renderHistoryPanel(self.history);
      }
      return;
    }
    //搜索框失去焦点
    this.handleInputBlur = function (e) {
      var target = e.target;
      while (target) {
        if (target !== $('.search-input',model.dom)[0]) {
          target = target.parentNode;
        } else {
          break;
        }
      }
      if (target !== $('.search-input',model.dom)[0]) {
        isSelectPanelShow = false;
        destorySelectPanel();
      }
    }
    //历史记录面板显示
    var renderHistoryPanel = function (history) {
      itemIndex = -1;
      var selectMenuItem = '';
      if (history.length === 0) {
        selectMenu = ''
      } else {
        for (var i = 0; i < history.length; i++) {
          if(history[i] !== ''){
            selectMenuItem += '<p><label class="keyItem">' + history[i] + '</label></p>';
          }
        }
        selectMenuItem += '<div class="clearHistory">清空历史记录</div>'
        selectMenu = '<div class="search-menu">' + selectMenuItem +
          '</div>'
      }
      // if ($('.search-menu', model.dom).length !== 0) {
      //   $('.search-menu', model.dom).replaceWith($(selectMenu));
      // } else {
        $('.search-input', model.dom).append(selectMenu);
      //}
      $('.search-menu p.active', model.dom).removeClass('active');
      if (itemIndex !== -1) {
        $('.search-menu p', model.dom).eq(itemIndex).addClass('active');
      }
    }
    //下拉面板显示
    var renderSelectPanel = function (searchInput, props) {
      itemIndex = -1;
      var relativeData = props.data && props.data.relativeData ? props.data.relativeData : [];
      var selectMenuItem = '';
      if (relativeData.length > 0) {
        for (var i = 0; i < relativeData.length; i++) {
          selectMenuItem += '<p><label class="keyItem">' + relativeData[i] + '</label></p>';
        }
        selectMenu = '<div class="search-menu">' + selectMenuItem +
          '</div>'
      } else {
        selectMenu = '<div class="search-menu">';
        for (var i = 0; i < self.selectItemList.length; i++) {
          selectMenu += '<p><label class="keyItem">' + self.selectItemList[i] + ':' + searchInput + '</label><label class="searchFast">直接搜</label></p>'
        }
        selectMenu += '</div>';
      }
      if ($('.search-menu', model.dom).length !== 0) {
        $('.search-menu', model.dom).replaceWith($(selectMenu));
      } else {
        $('.search-input', model.dom).append(selectMenu);
      }
      $('.search-menu p.active', model.dom).removeClass('active');
      if (itemIndex !== -1) {
        $('.search-menu p', model.dom).eq(itemIndex).addClass('active');
      }
    }
    //选择下拉项
    this.handleSelectItem = function (e) {
      createKeyItem($('.keyItem', e.target).text());
      searchInput.val('');
      isSelectPanelShow = false;
      destorySelectPanel();
      searchInput.focus();
    }
    //鼠标移入下拉项
    this.handleItemEnter = function (e) {
      $('.search-menu p.active', model.dom).removeClass('active');
      $('.search-menu p .searchFast.active', model.dom).removeClass('active');
      $(e.target).addClass('active');
      $('.searchFast', e.target).addClass('active');
      itemIndex = $('.search-menu p', model.dom).index($(e.target));
      //syncValue(itemIndex);
    }
    //鼠标移出下拉项
    this.handleItemLeave = function (e) {
      $('.search-menu p.active', model.dom).removeClass('active');
      $('.search-menu p .searchFast.active', model.dom).removeClass('active');
      itemIndex = -1;
    }
    //鼠标移入关键字
    this.handleKeyEnter = function (e) {
      if(e.target.className !== 'hr-delLabel'){
        e.target = e.currentTarget
      }
      keyIndex = $('.hr-delLabel', model.dom).index($(e.target));
      $(e.target).addClass('active');
      $(e.target).find('.hr-delLabel-icon').addClass('active');
    }
    //鼠标移出关键字
    this.handleKeyLeave = function (e) {
      if(e.target.className !== 'hr-delLabel'){
        e.target = e.currentTarget
      }
      $(e.target).removeClass('active');
      $(e.target).find('.hr-delLabel-icon').removeClass('active');
      keyIndex = -1;
    }
    //下拉面板消失
    var destorySelectPanel = function () {
      $('.search-menu', model.dom).remove();
      selectMenu = null;
      itemIndex = -1;
    }
    //搜索框值改变事件
    var handleValueChange = function (e) {
      _.debounce(function() {
        if(e.target.value !== ''){
          isSelectPanelShow = true
          renderSelectPanel(e.target.value, props);
        } else {
          isSelectPanelShow = false;
          destorySelectPanel();
        }
        //model.invoke('valueChange',e.target.value);
      }, 400)();
    }
    //创建关键字
    var createKeyItem = function (value) {
      if (self.keyItem.length >= 6) {
        isSelectPanelShow = false;
        destorySelectPanel();
        return;
      }
      var string = '<div title="' + value + '" class="hr-delLabel">' +
        '<div class="hr-delLabel-text">' + value + '</div>' +
        '<div class="hr-delLabel-icon"></div>' +
        '</div>';
      //生成的关键字可能会出现重复的情况，需要去重
      if (self.keyItem.indexOf(value) === -1) {
        self.keyItem.push(value);
        $('.search-value', model.dom).parent().before($(string));
      }
      isSelectPanelShow = false;
      destorySelectPanel();
    }
    //删除关键字
    this.deleteKeyItem = function () {
      $('.hr-delLabel:last', model.dom).remove();
      self.keyItem.pop();
      if(!self.keyItem.length && !$('.hr-delLabel',model.dom).length){
        searchInput.attr('placeholder','请输入关键字搜索，多个关键字空格隔开，如“产品设计 环球集团”');
      }
    }
    this.deleteKeyClick = function (e) {
      $(e.target).parent().remove();
      self.keyItem.splice(keyIndex, 1);
      if(!self.keyItem.length && !$('.hr-delLabel',model.dom).length){
        searchInput.attr('placeholder','请输入关键字搜索，多个关键字空格隔开，如“产品设计 环球集团”');
      }
    }
    //是否有关键字
    this.hasKeyItem = function () {
      return $('.hr-delLabel', model.dom).length > 0
    }
    //执行搜索操作
    this.doSearch = function () {
      //console.log('执行搜索操作，搜索的范围是：' + $('.dropdown-list-value').val() + '；搜索的关键字有：' + self.keyItem);
      if(searchInput.val() !== '') {
        createKeyItem(searchInput.val());
        searchInput.val('');
      }
      if(self.keyItem.length === 0){
        return ;
      }
      model.invoke('search', [$('.dropdown-list-value', model.dom).val(), self.keyItem.join('↓')].join('↓'));
    }
    //点击直接搜
    this.searchFast = function (e) {
      //console.log('执行搜索操作，搜索的范围是：' + $('.dropdown-list-value').val() + '；搜索的关键字有：' + $('.keyItem',e.target.parentNode).text());
      model.invoke('search', [$('.dropdown-list-value', model.dom).val(), [$('.keyItem', e.target.parentNode).text()]].join('↓'));
    }
    //值与下拉选项同步
    var syncValue = function (itemIndex) {
      searchInput.val($('.search-menu p', model.dom).eq(itemIndex).text());
    }
    //处理键盘事件
    this.handlePressEvent = function (e) {
      switch (e.keyCode) {
        case 13:
          if (itemIndex < 0) {
            if (e.target.value !== '') {
              createKeyItem(e.target.value);
              e.target.value = '';
            }
            self.doSearch();
          } else {
            if (isSelectPanelShow) {
              createKeyItem($('.search-menu p .keyItem', model.dom).eq(itemIndex).text());
              e.target.value = '';
            }
          }
          break;
        case 8:
          handleValueChange(e);
          break;
        case 39: //右键
          break;
        case 40: //下键
          e.preventDefault();
          e.stopPropagation();
          if ($('.search-menu p', model.dom).length !== 0 && isSelectPanelShow) {
            itemIndex = (itemIndex + 1) % $('.search-menu p', model.dom).length;
            $('.search-menu p.active', model.dom).removeClass('active');
            $('.search-menu p', model.dom).eq(itemIndex).addClass('active');
          }
          break;
        case 37: //左键
          break;
        case 38: //上键
          e.preventDefault();
          e.stopPropagation();
          if (itemIndex === -1) {
            destorySelectPanel();
            return;
          }
          if ($('.search-menu p', model.dom).length !== 0 && isSelectPanelShow) {
            itemIndex = ((itemIndex - 1) + $('.search-menu p', model.dom).length) % $('.search-menu p', model.dom).length;
            $('.search-menu p.active', model.dom).removeClass('active');
            $('.search-menu p', model.dom).eq(itemIndex).addClass('active');
          }
          break;
        default:
          handleValueChange(e);
          break;
      }
    }
    //清空历史记录事件
    this.handelClearHistory = function () {
      model.invoke('clearHistory', history);
      history = [];
    }
    //选择范围之后，下拉面板的下拉项会被过滤
    this.changeSelectItemList = function (selectItemList) {
      if(selectItemList){
        self.selectItemList = selectItemList;
      }else{
        self.selectItemList = ['个人信息', '教育信息', '工作经历', '本司任职经历', '员工标签'];
      }
    }
    //选择范围之后，历史记录会被过滤
    this.changeHistory = function (history) {
      self.history = history ? history : [];
    }
    //处理无输入时placeholder的函数
    this.showPlaceHolder = function (e) {
      if(self.keyItem.length !== 0 && $('.hr-delLabel',model.dom).length !== 0){
        searchInput.attr('placeholder', '');
      }else {
        searchInput.attr('placeholder', '请输入关键字搜索，多个关键字空格隔开，如“产品设计 环球集团”');
      }
    }
  }

  function RangeList(model, props, rangeInput) {
    //范围列表是否显示
    var isRangePanelShow = false;
    //范围列表选中值，默认‘全部’
    var rangeValue = '全部';
    //范围列表
    var rangeList = null;
    //范围框
    //var rangeInput = $('.dropdown-list-value');

    //范围列表输入框点击事件
    this.handleRangeListClick = function () {
      $('.down-icon', model.dom).addClass('rotate');
      if (!isRangePanelShow) {
        isRangePanelShow = true;
        renderRangeList();
      } else {
        isRangePanelShow = false;
        destoryRangeList();
      }
    }
    //范围列表显示
    var renderRangeList = function () {
      rangeList = '<div class="dropdown-menu">' +
        '<p>全部</p>' +
        // '<p>员工</p>' +
        '</div>'
      $('.dropdown-list', model.dom).append(rangeList);
    }
    //选择列表选项
    this.handleListSelect = function (e) {
      rangeInput.val($(e.target).text());
      isRangePanelShow = false;
      destoryRangeList();
    }
    //鼠标移入列表选项
    this.handleListItemEnter = function (e) {
      $(e.target).addClass('active');
    }
    //鼠标移出列表选项
    this.handleListItemLeave = function (e) {
      $('.dropdown-menu p', model.dom).removeClass('active');
    }
    //范围列表消失
    var destoryRangeList = function () {
      $('.down-icon', model.dom).removeClass('rotate');
      $('.dropdown-menu', model.dom).remove();
      rangeList = null;
    }
    //点击其他地方列表收起
    this.handleRangeInputBlur = function (e) {
      var target = e.target;
      while (target) {
        if (target !== $('.dropdown-list',model.dom)[0]) {
          target = target.parentNode;
        } else {
          break;
        }
      }
      if (target !== $('.dropdown-list',model.dom)[0]) {
        isRangePanelShow = false;
        destoryRangeList();
      }
    }
  }

  var setHtml = function (model, props, isUpdate) {
    KDApi.loadFile('./css/SearchBox.css', model, function() {
      var template = '<div class="hr-searchbox">' +
                      '<div class="dropdown-list">' +
                        '<div>' +
                          '<input readonly="readonly" class="dropdown-list-value" type="text" value="全部" />' +
                          '<i class="down-icon"></i>' +
                        '</div>' +
                      '</div>' +
                      '<div class="split-line"></div>' +
                      '<div class="search-input">' +
                        '<% for(var i=0;i < keyItem.length;i++){ %>' +
                          '<% if(keyItem[i] !== ""){ %>' +
                            '<div title="<%= keyItem[i] %>" class="hr-delLabel">' +
                              '<div class="hr-delLabel-text">' +
                                '<%= keyItem[i] %>' +
                              '</div>' +
                              '<div class="hr-delLabel-icon"></div>' +
                            '</div>' +
                          '<% } %>' +
                        '<% } %>' +
                        '<div class="search-input-content">' +
                          '<input class="search-value" type="text" placeholder="' + '<%= keyItem.length ? "" : "请输入关键字搜索，多个关键字空格隔开，如“产品设计 环球集团”"%>" />' +
                          '<i class="search-icon"></i>' +
                        '</div>' +
                      '</div>' +
                    '</div>'
      var result = KDApi.getHTMLStringBytemplate(template, {
        keyItem: props.data && props.data[2] ? props.data[2]['全部'] : []
      })
      // if (model.dom.innerHTML === "" || isUpdate) {
      //   model.dom.innerHTML = result;
      // }
      // initEvent(model, props);
      if(isUpdate && model.dom.innerHTML !== ""){
        var childnode = model.dom.removeChild(model.dom.childNodes[0]);
        childnode = null;
      }
      model.dom.innerHTML = result;
      initEvent(model, props);
      eventLoopList.pop();
    })
  }
  var initEvent = function (model, props) {
    $(model.dom).css("overflow", "visible");
    var range = props.data ? props.data[0] : {};
    var history = props.data ? props.data[1] : {};
    var searchInput = $('.search-value', model.dom);
    var searchBox = new SearchBox(model, props, searchInput, history['全部']);
    var rangeInput = $('.dropdown-list-value', model.dom);
    var rangeList = new RangeList(model, props, rangeInput);
    //添加事件
    searchInput.click(function (e) {
      searchBox.handleInputClick(e);
    }).keyup(function (e) {
      searchBox.handlePressEvent(e);
    }).keydown(function (e) {
      if (e.keyCode === 38 || e.keyCode === 40) {
        e.preventDefault();
      }
      if (e.keyCode === 8 && e.target.value === '' && searchBox.hasKeyItem()) {
        searchBox.deleteKeyItem();
      }
    }).on('blur focus', function (e) {
      searchBox.showPlaceHolder(e);
    });
    $('.search-input', model.dom).on('click', '.search-menu p', function (e) {
      if (e.target !== this) {
        e.target = e.target.parentNode;
      }
      searchBox.handleSelectItem(e);
    }).on('mouseenter', '.search-menu p', function (e) {
      searchBox.handleItemEnter(e);
    }).on('mouseleave', '.search-menu p', function (e) {
      searchBox.handleItemLeave(e);
    }).on('mouseenter', '.hr-delLabel', function (e) {
      searchBox.handleKeyEnter(e);
    }).on('mouseleave', '.hr-delLabel', function (e) {
      searchBox.handleKeyLeave(e);
    }).on('click', '.hr-delLabel-icon', function (e) {
      searchBox.deleteKeyClick(e);
    }).on('click', '.search-menu p .searchFast', function (e) {
      searchBox.searchFast(e);
    }).on('click', '.search-menu .clearHistory', function () {
      searchBox.handelClearHistory();
    }).on('click', '.search-icon', function (e) {
      e.stopPropagation();
      searchBox.doSearch();
    })

    rangeInput.click(function () {
      rangeList.handleRangeListClick();
    })
    $('.dropdown-list', model.dom).on('click', '.dropdown-menu p', function (e) {
      rangeList.handleListSelect(e);
      searchBox.changeSelectItemList(range[$(e.target).text()]);
      searchBox.changeHistory(history[$(e.target).text()]);
    }).on('mouseenter', '.dropdown-menu p', function (e) {
      rangeList.handleListItemEnter(e);
    }).on('mouseleave', '.dropdown-menu p', function (e) {
      rangeList.handleListItemLeave(e);
    });
    $(window).on('click', function (e) {
      searchBox.handleInputBlur(e);
      rangeList.handleRangeInputBlur(e);
    })
  }
  KDApi.register('searchbox', MyComponent)
})(window.KDApi, jQuery, _)
/**
 * 
 * props.data = [
 * {
 * 员工:['个人信息','标签'],
 * 全部:['个人信息','教育信息','工作经历']
 * },
 * {
 * 人员:['标签:AAAA','标签:BBBB','标签:CCCC'],
 * 全部:['教育信息:aaaaaa','个人信息:dfdf','个人信息:hther']
 * },
 * {
 * ['教育信息:aaaaaa','个人信息:dfdf','个人信息:hther']
 * }
 * ]
 */