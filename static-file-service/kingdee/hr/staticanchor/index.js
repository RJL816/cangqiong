(function (KDApi, $, _) {
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
        destoryed: function () {

        }
    }

    var setHtml = function (model, props, isUpdate) {
        if (isUpdate) {
            initEvent(model, props);
        }
    }
    var initEvent = function (model, props) {
        var data = props.data;
        //模块的父容器所在页面的pageId
        var parentPageId = data.parentPageId;
        //锚点集所在的页面的pageId
        var anchorListPageId = findPageIdByFid(parentPageId, data.anchorListPage) || parentPageId;
        //每个模块的标识的集合
        var flexList = _.map(data.flexList, function (n) {
            return parentPageId + '_' + n;
        });
        //可用于定位每一个模块的锚点的集合
        var flexAnchor = _.map(data.flexAnchor, function (n) {
            return anchorListPageId + '_' + n;
        });
        //模块的父容器（可滚动）的标识
        var parentFlex = getDataPageId(parentPageId, data.parentFlex);
        var $parentFlex = $('[data-page-id="' + parentFlex + '"]');

        $parentFlex.wait(function () {
            var self = this;
            flexAnchor.forEach(function (value, index) {
                return (function (value, index) {
                    var $flexAnchor = $('[data-page-id="' + value + '"]');
					$flexAnchor.wait(function(){
						$('body').on('click', '[data-page-id="' + value + '"]', function (e) {
							// if(e.target !== this){
							// e.target = target;
							// }
							$parentFlex.animate({
								scrollTop: self.scrollTop() + $('[data-page-id="' + flexList[index] + '"]').offset().top - 51 - self.offset().top
							}, 200);
						})					
					})
                })(value, index)
            })
        })

    }

    //在总页面homePageId下找到页面标识为childFid的pageId
    var findPageIdByFid = function (homePageId, childFid) {
        return $('#' + homePageId).find('[data-form-id=' + childFid + ']').attr('id');
    }

    //将标识转化为data-page-id
    var getDataPageId = function (pageId, name) {
        return pageId + '_' + name;
    }

    //等待某个节点加载完后才执行操作
    $.fn.wait = function (func, times, interval) {
        var _times = times || -1, //100次
            _interval = interval || 20, //20毫秒每次 
            _self = this,
            _selector = this.selector, //选择器
            _iIntervalID; //定时器id
        if (this.length) { //如果已经获取到了，就直接执行函数
            func && func.call(this);
        } else {
            _iIntervalID = setInterval(function () {
                if (!_times) { //是0就退出
                    clearInterval(_iIntervalID);
                }
                _times <= 0 || _times--; //如果是正数就 --

                _self = $(_selector); //再次选择
                if (_self.length) { //判断是否取到
                    func && func.call(_self);
                    clearInterval(_iIntervalID);
                }
            }, _interval);
        }
        return this;
    }
    KDApi.register('staticanchor', MyComponent)
})(window.KDApi, jQuery, _)