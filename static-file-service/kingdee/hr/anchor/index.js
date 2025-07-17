(function(KDApi,$,_){
    function MyComponent(model){
        this._setModel(model);
    }

    MyComponent.prototype = {
        _setModel: function(model) {
            this.model = model;
        },
        init:function(props){
          if(props.data){
              setHtml(this.model,props);
          }
        },
        update:function(props){
          if(props.data){
              setHtml(this.model,props);
          }
        },
        destoryed:function(){

        }
    }

    var setHtml = function(model,props){
        KDApi.loadFile('./css/anchor.css', model, function(){
            KDApi.getTemplateStringByFilePath('./html/anchor.html', model,{
                openPic: KDApi.getNameSpace(model) + './img/open.png',
                anchorPic:  KDApi.getNameSpace(model) + './img/anchor.png',
                childList: props.data.childList,
                childNameList: props.data.childNameList
            }).then(
                function(result){
                    model.dom.innerHTML = result;
                    initEvent(model,props);
                }
            )
        })
    }

    var initEvent = function(model,props){
        //锁定锚点面板
        var lock = false;
        //鼠标是否进入锚点面板
        var isEnterAnchorPanel = false;
        //后台传来的数据：props.data = undefined || { parent:"flex",chirldList:["flex1","flex2","flex3","flex4","flex5"],chirldNameList:["flex面板1"，"flex面板2"，"flex面板3"，"flex面板4"，"flex面板5"]}
        var pageId = model.pageId;
        //锚点集合 var anchorList = ['#flexpanelap','#flexpanelap1','#flexpanelap2','#flexpanelap3','#flexpanelap4'];
        var anchorList = props.data.childList || [];

        //所有锚点关联的div的公共父节点
        var parentDomName = props.data.parent;
        var parentId = pageId + '_' + parentDomName;
        //单页面多单据中唯一的一个dom节点的获取方式：根据data-page-id获取，格式：pageId + _ + domId，选择器：$('[data-page-id="data-page-id"]')
        var parentDom = $('[data-page-id="' + parentId+ '"]');
        var parentDomOffsetTop = parentDom.offset().top;
        //viewport可视区窗口大小
        var viewHeight = $(window).height();
        //是否点击定位锚点
        var isClickAnchor = false;
        //是否滚动后锚点位置变化
        var isScrollAnchor = false;
        //由于点击锚点导致页面滚动
        var isClickScrollAnchor = false;

        //锚点面板出现时机
        parentDom.on('scroll',_.throttle(function(){
            isClickAnchor = false;
            isScrollAnchor = true;
            //获取viewport高度，当滚动条位置大于viewport高度时，锚点面板出现并fixed
            var contentListTop = parentDom.scrollTop();
            if(contentListTop >= viewHeight - parentDomOffsetTop){
                anchorPanelPosition(model);
            }
            if(contentListTop < viewHeight - parentDomOffsetTop && !lock && !isEnterAnchorPanel){
                $('.hr-achor',model.dom).css({
                    'right':'-10000px',
                    'top':'-10000px'
                })
            }
            if(!isClickAnchor && isScrollAnchor && !isClickScrollAnchor){
                anchorChange(model,props,pageId,parentDomOffsetTop);
            }
        },16))

        //锚点定位
        var anchor = $('.hr-achor-li',model.dom);
        anchor.click(function(){
            isClickAnchor = true;
            isScrollAnchor = false;
            isClickScrollAnchor = true;
            var data_page_id = pageId + '_' + $(this).attr('target')
            var target = $('[data-page-id="' + data_page_id+ '"]');
            parentDom.animate({
                scrollTop: parentDom.scrollTop() + target.offset().top - parentDomOffsetTop - 50
            },
            200,function(){
                isClickScrollAnchor = false;
            });
            if(isClickAnchor && !isScrollAnchor){
                var index = parseInt($(this).attr('index'));
                //$('.arrow').css('top',10+30*(index-1));
                $('.arrow',model.dom).animate({
                    top: 7 + 33*(index)
                },200)                
            }
        })

        //将锚点面板固定
        $('.hr-achor-lock',model.dom).click(function(){
            if(lock === false){
                lock = true;
                $('.hr-achor-lock',model.dom).attr('src',KDApi.nameSpace(model) + './img/lock.png');
            }else {
                lock = false;
                $('.hr-achor-lock',model.dom).attr('src',KDApi.nameSpace(model) + './img/open.png');
            }
        })

        //当鼠标移入锚点控件图标时，锚点面板的定位
        $('.hr-achor-icon',model.dom).mouseenter(function(){
            isEnterAnchorPanel = true;
            anchorPanelPosition(model);
        })

        //鼠标移出锚点面板时，在非锁定时锚点面板消失
        $('.hr-achor',model.dom).mouseleave(function(){
            isEnterAnchorPanel = false;
            if(!lock){
                $('.hr-achor',model.dom).css({
                    'right':'-10000px',
                    'top':'-10000px'
                })
            }       
        })   
    }

    //锚点面板定位
    function anchorPanelPosition(model){
        //锚点控件图标的位置和宽度
        var icontop = $(model.dom).offset().top;
        var iconwidth = $('.hr-achor-icon',model.dom).width();
        var iconright = $(window).width() - $(model.dom).offset().left - iconwidth;
        //锚点面板的宽度和高度
        var width = $('.hr-achor',model.dom).width();
        var height = $('.hr-achor',model.dom).height();
        if(width < iconright + iconwidth){
            $('.hr-achor',model.dom).css({
                'right': iconright + iconwidth - width +'px'
            });
        }else {
            $('.hr-achor',model.dom).css({
                'right': iconright + 'px'
            });
        }
        $('.hr-achor',model.dom).css({
            'top': icontop - 100 + 'px'
        })
    }

    //锚点面板内箭头图标移动
    function anchorChange(model,props,pageId,parentDomOffsetTop){
        //锚点集合 var anchorList = ['#flexpanelap','#flexpanelap1','#flexpanelap2','#flexpanelap3','#flexpanelap4'];
        var anchorList = props.data.childList || null;
        anchorList.forEach(function(value,index){
            var data_page_id = pageId + '_' + value;
            var top = $('[data-page-id="' + data_page_id+ '"]').offset().top;
            if(top - parentDomOffsetTop <= 50 && top - parentDomOffsetTop > -50){
                $('.arrow',model.dom).css('top',7+33*index);
            }
        })
    }
    KDApi.register('anchor', MyComponent)
})(window.KDApi,jQuery,_);