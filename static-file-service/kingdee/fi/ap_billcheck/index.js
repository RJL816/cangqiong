(function (KDApi, _) {
  // console.log('fi_ap_billcheck版本：', '20221205')
  // 构造函数
  function MyComponent (model) {
    this._setModel(model)
  }

  var themeColor;

  MyComponent.prototype = {
    // 绑定model
    _setModel: function (model) {
      this.model = model
    },
    // 生命周期：初始化
    init: function (props) {
      // console.log('-----init', this.model.pageId)
      themeColor = getThemeColor(props.themeColor);
      setHtml(this.model, props)
    },
    // 生命周期：更新
    update: function (props) {
      // console.log('-----update', this.model.pageId, props)
      themeColor = getThemeColor(props.theme)
      updateHtml(this.model, props, true)
    },
    // 生命周期：销毁
    destoryed: function () {
      // console.log('-----destoryed', this.model.pageId)
    }
  }

  // 加载文件和模板
  var setHtml = function (model, props, isUpdate) {
    KDApi.loadFile('./css/billcheck.css', model, function () {
      // 加载模板
      updateHtml(model, props, isUpdate)
    });
  }

  var updateHtml = function (model, props, isUpdate) {
    if (!isUpdate) {
      model.invoke('loadData',props);
    } else if (props.data && props.data.length > 0) {
      KDApi.templateFilePath("./html/billcheck.html", model, {
        domainName:KDApi.nameSpace(model),
        titleText:KDApi.getLangMsg(model, 'billcheck.key0000')
      }).then(function (result) {
        // console.log(result)
        model.dom.innerHTML = result;
        // 创建dom
        createCheckList(model, props, $);
        // 绑定DOM操作事件
        initEvent(model, props);
      });
    }
  }

  // 获取主题色
  function getThemeColor (themeColor) {
    switch (themeColor) {
      case 'blue':
        return '#5582F3'
      case 'green':
        return '#29C392'
      case 'orange':
        return '#FC8555'
      case 'purple':
        return '#6869FB'
      default:
        return '#5582F3'
    }
  }

  var createCheckList = function (model, props, $) {
    var $body = $('.smart-panel-body',model.dom);
    var fragment = document.createDocumentFragment();

    //
    var wrapperDom=document.createElement('DIV');
    wrapperDom.className='smart-panel-dialog';
    wrapperDom.style.cssText = 'border-top-width: 2px; border-top-color: rgb(50, 170, 112);';
    wrapperDom.setAttribute('id', '1');

    var titleDom=document.createElement('DIV');
    titleDom.className='smart-panel-body-item-title';
    titleDom.innerText = KDApi.getLangMsg(model, 'billcheck.key0001');
    wrapperDom.appendChild(titleDom);

    createItemList(model, props.data, wrapperDom, $);

    fragment.appendChild(wrapperDom);
    $body.append(fragment);
  }

  var createItemList = function (model, items, wrapperDom, $) {
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var rowDom=document.createElement('DIV');
      rowDom.className='smart-panel-body-item-row';
      rowDom.style.cssText = '';
      rowDom.setAttribute('id', item.id);

      var itemDom=document.createElement('DIV');
      itemDom.className="smart-panel-body-item-name";
      itemDom.style.cssText = 'width: 91%;';

      var iconWrapper=document.createElement('DIV');
      iconWrapper.className='smart-panel-icon';
      iconWrapper.style.cssText = '';
      itemDom.appendChild(iconWrapper);
      var imgDom=document.createElement('img');
      var imgSrc = KDApi.nameSpace(model) + "./img/" + item.type + ".png";
      imgDom.src=imgSrc;
      imgDom.style.cssText = '';
      iconWrapper.appendChild(imgDom);

      var contentDom=document.createElement('DIV');
      var content = item.content;
      contentDom.innerText = content;
      contentDom.title = content;
      contentDom.className="smart-panel-body-row-item";
      contentDom.style.cssText='margin-right:4px;';
      itemDom.appendChild(contentDom);

      if (item.link) {
        var linkDom=document.createElement('DIV');
        var fix = KDApi.getLangMsg(model, 'billcheck.key0002');
        linkDom.innerText = fix;
        linkDom.title = fix;
        linkDom.className='smart-panel-body-row-item smart-panel-item-link';
        linkDom.style.cssText='left:20px;';
        linkDom.setAttribute('id', item.id);

        itemDom.appendChild(linkDom);
      }
      rowDom.appendChild(itemDom);

      wrapperDom.appendChild(rowDom);
    }
  }

  var initEvent = function (model, props) {
    $("#shouqi").click(function () {
      var show = $(".smart-panel-header").css("display");
      if (show == "none") {
        show = "flex";
      } else {
        show = "none";
      }
      $(".smart-panel-header").css("display", show);
      $(".smart-panel-body").css("display", show);
    });

    $('.smart-panel-item-link', model.dom).on('click',function(){
      var paramStr = this.getAttribute("id");
      if(paramStr){
        model.invoke('showForm', paramStr);
      }
    });
  }

  // 注册自定义控件
  KDApi.register('ap_billcheck', MyComponent, {
    isMulLang : true
  })
})(window.KDApi, jQuery, _);
