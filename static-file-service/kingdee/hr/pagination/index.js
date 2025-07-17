(function (KDApi, $) {
  function MyComponent(model) {
    this._setModel(model);
  }
  var isUpdate = false;
  MyComponent.prototype = {
    _setModel: function (model) {
      this.model = model;
    },
    init: function (props) {
      isUpdate = false;
      setHtml(this.model, props, isUpdate);
    },
    update: function (props) {
      isUpdate = true;
      setHtml(this.model, props, isUpdate);
    },
    destory: function (props) {

    }
  }

  function PageDropDownList(model, props) {
    //指针
    var self = this;
    //页数列表是否显示
    var isPDDLShow = false;
    //页数列表
    var pageDropDownListString = null;
    //当前页
    this.pageNum = 1;
    //每页数据数
    this.pageInfoCount = props.data ? props.data.pageInfoCount : 10;
    //每页数据数索引
    var pDDListIndex = 1;
    //总页数
    var pageCount = props.data ? props.data.pageCount : 3;

    //是否可左翻页
    this.canLeftClick = false;
    //是否可右翻页
    this.canRightClick = false;
    //是否可最左翻页
    this.canLeftEndClick = false;
    //是否可最右翻页
    this.canRightEndClick = false;

    //根据翻页状态改变按钮样式
    var changeBtnState = function (state, ClassName) {
      if (!state) {
        $('.' + ClassName, model.dom).addClass('button_disabled').removeClass('kd-hover-bdcolor');
      } else {
        $('.' + ClassName, model.dom).removeClass('button_disabled').addClass('kd-hover-bdcolor');
      }
    }
    //翻页状态值改变
    var canBtnClick = function(canLeftClick, canRightClick, canLeftEndClick, canRightEndClick){
      self.canLeftClick = canLeftClick;
      self.canRightClick = canRightClick;
      self.canLeftEndClick = canLeftEndClick;
      self.canRightEndClick = canRightEndClick;
    }
    //改变翻页状态
    var changeState = function () {
      if (pageCount <= 1) {
        canBtnClick(false, false, false, false)
      } else {
        if (self.pageNum === pageCount) {
          canBtnClick(true, false, true, false)
        } else if (self.pageNum < pageCount) {
          if (self.pageNum === 1) {
            canBtnClick(false, true, false, true)
          } else {
            canBtnClick(true, true, true, true)
          }
        }
      }
    }
    //所有翻页按钮样式刷新
    var refleshBtn = function () {
      changeBtnState(self.canLeftClick, 'pagination_leftdiv');
      changeBtnState(self.canLeftEndClick, 'pagination_left_enddiv');
      changeBtnState(self.canRightClick, 'pagination_rightdiv');
      changeBtnState(self.canRightEndClick, 'pagination_right_enddiv');
    }
    //初始化所有翻页的状态
    this.init = function () {
      changeState();
      refleshBtn();
    }
    //处理左翻页事件
    this.handleTurnLeft = function () {
      if (self.canLeftClick) {
        $('.pagination_num_value', model.dom).val(--self.pageNum).change();
      }
    }
    //处理最左翻页事件
    this.handleTurnLeftEnd = function () {
      if (self.canLeftEndClick) {
        $('.pagination_num_value', model.dom).val(1).change();
      }
    }
    //处理右翻页事件
    this.handleTurnRight = function () {
      if (self.canRightClick) {
        $('.pagination_num_value', model.dom).val(++self.pageNum).change();
      }
    }
    //处理最右翻页事件
    this.handleTurnRightEnd = function () {
      if (self.canRightEndClick) {
        $('.pagination_num_value', model.dom).val(pageCount).change();
      }
    }
    //处理值改变事件
    this.handleValueChange = function (e) {
      if(e.target.value === ""){
        return;
      }
      self.pageNum = parseInt(e.target.value);
      changeState();
      refleshBtn();
      model.invoke("query", [self.pageNum, self.pageInfoCount].toString())
    }
    //限制输入的数字范围
    this.handleNumRangeInput = function (e) {
      if (parseInt(e.target.value) > pageCount) {
        e.target.value = self.pageNum;
        return;
      }
      var reg = new RegExp("[^\\d]", "g");
      e.target.value = e.target.value.replace(reg, '');
      $(e.target).change();
    }
    //页数列表点击事件
    this.handlePDDListClick = function () {
      $('.pagination_page_down', model.dom).addClass('rotate');
      if (!isPDDLShow) {
        isPDDLShow = true;
        renderPDDList();
      } else {
        isPDDLShow = false;
        destoryPDDList();
      }
    }
    //页数列表显示
    var renderPDDList = function () {
      pageDropDownListString = '<div class="pagination_page_dropdown_list">' +
        '<ul class="pagination_page_dropdown_list_ul">' +
        '<li class="pagination_page_dropdown_list_li kd-hover"><span class="pagination_page_value">5条 / 页</span></li>' +
        '<li class="pagination_page_dropdown_list_li kd-hover"><span class="pagination_page_value">10条 / 页</span></li>' +
        '<li class="pagination_page_dropdown_list_li kd-hover"><span class="pagination_page_value">20条 / 页</span></li>' +
        '<li class="pagination_page_dropdown_list_li kd-hover"><span class="pagination_page_value">50条 / 页</span></li>' +
        '</ul>' +
        '</div>'
      if($(window).height()-$(model.dom).height()-($(model.dom).offset().top-$(document).scrollTop()) > 130){
        $('.pagination_pagediv', model.dom).append(pageDropDownListString);
      }
      else{
        $('.pagination_pagediv', model.dom).prepend(pageDropDownListString);
        $('.pagination_page_dropdown_list', model.dom).css("top","-134px");
      }
      $('.pagination_page_dropdown_list .pagination_page_value', model.dom).eq(pDDListIndex).addClass('select-selected');
    }
    //页数列表选项选择
    this.handleListSelect = function (e) {
      e.stopPropagation();
      $('.pagination_page .pagination_page_value', model.dom).text($(e.target).text());
      $('.pagination_page_dropdown_list_ul .pagination_page_value', model.dom).removeClass('select-selected');
      $(e.target).addClass('select-selected');
      self.pageInfoCount = parseInt($(e.target).text());
      if(pDDListIndex !== $('.pagination_page_dropdown_list .pagination_page_value', model.dom).index($(e.target))){
        pDDListIndex = $('.pagination_page_dropdown_list .pagination_page_value', model.dom).index($(e.target));
        self.pageNum = 1;
        $('.pagination_num_value', model.dom).val(self.pageNum);
        model.invoke("query", [self.pageNum, self.pageInfoCount].toString());        
      }
      isPDDLShow = false;
      destoryPDDList();
    }
    //页数列表消失
    var destoryPDDList = function () {
      $('.pagination_page_down', model.dom).removeClass('rotate');
      $('.pagination_page_dropdown_list', model.dom).remove();
      pageDropDownListString = null;
    }
    //点击其他地方列表收起
    this.handlePDDListBlur = function (e) {
      var target = e.target;
      while (target) {
        if (target !== model.dom.getElementsByClassName('pagination_pagediv')[0]) {
          target = target.parentNode;
        } else {
          break;
        }
      }
      if (target !== model.dom.getElementsByClassName('pagination_pagediv')[0]) {
        isPDDLShow = false;
        destoryPDDList();
      }
    }
  }
  var setHtml = function (model, props, isUpdate) {
    KDApi.loadFile('./css/pagination.css', model, function() {
      var template = '<div class="pagination">' +
                        '<label>共<%= pageCount %>页</label>' +
                        '<div class="pagination_num">' +
                          '第<input maxlength="<%= pageCount.toString().length %>" class="pagination_num_value kd-hover-bdcolor" value="1" style="margin: 0px 4px;">页' +
                        '</div>' +
                        '<div class="pagination_left_enddiv kd-hover-bdcolor">' +
                          '<div class="pagination_left_end">' + 
                            '<div class="left_endline"></div>' +
                          '</div>' +
                        '</div>' +
                        '<div class="pagination_leftdiv kd-hover-bdcolor">' +
                          '<div class="pagination_left"></div>' +
                        '</div>' +
                        '<div class="pagination_rightdiv kd-hover-bdcolor">' +
                          '<div class="pagination_right"></div>' +
                        '</div>' +
                        '<div class="pagination_right_enddiv kd-hover-bdcolor">' +
                          '<div class="pagination_right_end">' + 
                            '<div class="right_endline"></div>' +
                          '</div>' +
                        '</div>' +
                        '<div class="pagination_pagediv kd-hover-bdcolor">' +
                          '<div class="pagination_page">' +
                            '<span style="width: 71px;">' +
                              '<span class="pagination_page_value"><%= pageInfoCount %>条 / 页</span>' +
                            '</span>' +
                          '</div>' +
                          '<div class="pagination_page_down"></div>' +
                          '</div>' +
                        '</div>';
      var result = KDApi.getHTMLStringBytemplate(template, {
        pageCount: props.data ? props.data.pageCount : 3,
        pageInfoCount: props.data ? props.data.pageInfoCount : 10
      })
      if (model.dom.innerHTML === '' || isUpdate) {
        model.dom.innerHTML = result;
      }
      initEvent(model, props);
    })
  }
  var initEvent = function (model, props) {
    $(model.dom).css("overflow", "visible");
    var pageDropDownList = new PageDropDownList(model, props);
    pageDropDownList.init();
    $('.pagination_left_enddiv', model.dom).click(function () {
      pageDropDownList.handleTurnLeftEnd();
    })
    $('.pagination_right_enddiv', model.dom).click(function () {
      pageDropDownList.handleTurnRightEnd();
    })
    $('.pagination_leftdiv', model.dom).click(function () {
      pageDropDownList.handleTurnLeft();
    })
    $('.pagination_rightdiv', model.dom).click(function () {
      pageDropDownList.handleTurnRight();
    })
    $('.pagination_num_value', model.dom).change(function (e) {
      pageDropDownList.handleValueChange(e);
    }).bind('input propertychange', function (e) {
      pageDropDownList.handleNumRangeInput(e);
    })
    $('.pagination', model.dom).on('click', '.pagination_pagediv', function () {
      pageDropDownList.handlePDDListClick();
    }).on('click', '.pagination_page_dropdown_list_li', function (e) {
      pageDropDownList.handleListSelect(e);
    })
    $(window).on('click', function (e) {
      pageDropDownList.handlePDDListBlur(e);
    })
  }
  KDApi.register('pagination', MyComponent);
})(window.KDApi, jQuery)
/** 
 * 翻页器选择每页数据时弹出的列表的位置，需要做判断
 * 如果翻页器下方空间不够，列表需要往上弹，如果下方空间足够，就可以往下方弹
 * 翻页器下方空间长度=$(window).height()-$(model.dom).height()-($(model.dom).offset().top-$(document).scrollTop())
*/