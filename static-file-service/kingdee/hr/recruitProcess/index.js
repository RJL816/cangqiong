//2021/08/12
(function (KDApi, $) {
    function MyComponent(model) {
        this._setModel(model)
    }

    var themeColor = null
    MyComponent.prototype = {
        _setModel: function (model) {
            this.model = model
        },
        init: function (props) {

            themeColor = getThemeColor(props.themeColor)
            // setHtml(this, this.model, props)

        },
        update: function (props) {

            themeColor = getThemeColor(props.themeColor)
            if (props.data && props.data.initData) { //初始化数据
                processData = JSON.parse(props.data.initData);
                setHtml(this, this.model, props)
            }

        },
        destroy: function (props) {

        }
    }
    var showNum = 8; //一行展示的最大流程数
    var processData = [];
    var pageId = '0001';
    var setHtml = function (self, model, props) {
        pageId = Math.floor(Math.random() * 100000);
        var data = {
            processData: processData,
            pageId: pageId
        };
        if (props.configItems) {
            for (let x in props.configItems) {
                data[props.configItems[x].key] = props.configItems[x].value;
            }
        }
        if (processData) {
            KDApi.loadFile((data.name && data.name === 'peopleRecruit') ? './css/recruitProcessStyle1.css' : './css/recruitProcess.css', model, function () {
                KDApi.getTemplateStringByFilePath('./html/recruitProcess.html', model, {
                    listData: data
                }).then(
                    function (result) {
                        model.dom.innerHTML = result
                        if (processData.length > 0) {
                            initActive(model);
                        }
                    }
                )
            })
        }

    }

    function myEvent(obj, ev, fu) {
        obj.attachEvent ? obj.attachEvent('on' + ev, fu) : obj.addEventListener(ev, fu, false);
    }

    function initActive(model) {


        var oBox = $("#" + pageId)[0];
        var oLeft = $("#" + pageId + ' #left');
        var oRight = $("#" + pageId + ' #right');
        var oConter = $("#" + pageId + ' #conter')[0];
        var oUl = $("#" + pageId + ' ul')[0];
        var oLi = $("#" + pageId + ' li')[0];
        var oLis = $("#" + pageId + ' li');
        var oScroll = $("#" + pageId + ' #scroll')[0];
        var oSpan = $("#" + pageId + ' #scroll span')[0];

        //点击跳转职位详情
        $("#" + pageId + " .processItem").click(function () {
            var num = $(this).attr("name");
            var id = $(this).attr("id");
            if (Number(num) > 0) {
                model.invoke("processId", id);
            }

        })

        if (processData.length <= showNum) {
            oRight.css("visibility", "hidden");
            oLeft.css("visibility", "hidden");
            $("#" + pageId + " ul").addClass("itemCenter");
        }

        oLeft.css({"color": "#D9D9D9", "cursor": "default"})
        for (var i = 0; i < oLis.length; i++) {
            oLis[i].style.width = oConter.offsetWidth / showNum + "px";
        }
        oUl.style.width = oLi.offsetWidth * processData.length + 10 + 'px';
        var iWidth = (oScroll.offsetWidth - oSpan.offsetWidth) / (oUl.offsetWidth / oConter.offsetWidth - 1)
        // var iWidth=416;
        oLeft.mouseover(function () {
            // this.className = 'hover';
            oLeft.click(function () {
                var butscroll = oSpan.offsetLeft - iWidth;
                oscroll(butscroll);
            })
        })
        oRight.mouseover(function () {
            // this.className = 'hover';
            oRight.click(function () {
                var butscroll = oSpan.offsetLeft + iWidth;
                oscroll(butscroll);
            })
        })
        //点击滚动条
        oScroll.onclick = function (e) {
            var oEvent = e || event;
            var butscroll = oEvent.clientX - oBox.offsetLeft - 53 - oSpan.offsetWidth / 2;
            oscroll(butscroll);
        };
        oSpan.onclick = function (e) {
            var oEvent = e || event;
            oEvent.cancelBubble = true;
        }
        oLeft.mouseout(function () {
            this.className = '';
        })
        oRight.mouseout(function () {
            this.className = '';
        })
        //拖拽滚动条
        var iX = 0;
        oSpan.onmousedown = function (e) {
            var oEvent = e || event;
            iX = oEvent.clientX - oSpan.offsetLeft;
            document.onmousemove = function (e) {
                var oEvent = e || event;
                var l = oEvent.clientX - iX;
                td(l);
                return false;
            };
            document.onmouseup = function () {
                document.onmousemove = null;
                document.onmouseup = null;
            };
            return false;
        };

        //滚轮事件
        function fuScroll(e) {
            var oEvent = e || event;
            var l = oSpan.offsetLeft;
            oEvent.wheelDelta ? (oEvent.wheelDelta > 0 ? l -= iWidth : l += iWidth) : (oEvent.detail ? l += iWidth : l -= iWidth);
            oscroll(l)
            if (oEvent.PreventDefault) {
                oEvent.PreventDefault();
            }
        }

        myEvent(oConter, 'mousewheel', fuScroll);
        myEvent(oConter, 'DOMMouseScroll', fuScroll);

        //滚动事件
        function oscroll(l) {
            //重置左右侧按钮属性
            oLeft.css({"color": 'var(--theme-color)', "cursor": "pointer"});
            oRight.css({"color": 'var(--theme-color)', "cursor": "pointer"});
            if (l < 0) {
                l = 0;
                //左侧按钮置灰
                oLeft.css({"color": "#D9D9D9", "cursor": "default"})
            } else if (l > oScroll.offsetWidth - oSpan.offsetWidth) {
                l = oScroll.offsetWidth - oSpan.offsetWidth;
                //右侧按钮置灰
                oRight.css({"color": "#D9D9D9", "cursor": "default"})
            }
            var scrol = l / (oScroll.offsetWidth - oSpan.offsetWidth);
            sMove(oSpan, 'left', Math.ceil(l));
            sMove(oUl, 'left', '-' + Math.ceil((oUl.offsetWidth - (oConter.offsetWidth)) * scrol));
        }

        function td(l) {
            if (l < 0) {
                l = 0;
            } else if (l > oScroll.offsetWidth - oSpan.offsetWidth) {
                l = oScroll.offsetWidth - oSpan.offsetWidth;
            }
            var scrol = l / (oScroll.offsetWidth - oSpan.offsetWidth);
            oSpan.style.left = l + 'px';
            oUl.style.left = '-' + (oUl.offsetWidth - (oConter.offsetWidth)) * scrol + 'px';
        }


    }

    //运动框架
    function getStyle(obj, attr) {
        return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
    }

    function sMove(obj, attr, iT, onEnd) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            dMove(obj, attr, iT, onEnd);
        }, 30);
    }

    function dMove(obj, attr, iT, onEnd) {
        var iCur = 0;
        attr == 'opacity' ? iCur = parseInt(parseFloat(getStyle(obj, attr) * 100)) : iCur = parseInt(getStyle(obj, attr));
        var iS = (iT - iCur) / 5;
        iS = iS > 0 ? Math.ceil(iS) : Math.floor(iS);
        if (iCur == iT) {
            clearInterval(obj.timer);
            if (onEnd) {
                onEnd();
            }
        } else {
            if (attr == 'opacity') {
                obj.style.ficter = 'alpha(opacity:' + (iCur + iS) + ')';
                obj.style.opacity = (iCur + iS) / 100;
            } else {
                obj.style[attr] = iCur + iS + 'px';
            }
        }
    }

    var getThemeColor = function (themeColor) {
        switch (themeColor) {
            case 'blue':
                return '#5582F3'
            case 'green':
                return '#29C392'
            case 'orange':
                return '#FC8555'
            case 'purple':
                return '#6869FB'
            case 'red':
                return '#E94E4F'
            default:
                return '#5582F3'
        }
    }
    KDApi.register('recruitProcess', MyComponent)
})(window.KDApi, jQuery)
