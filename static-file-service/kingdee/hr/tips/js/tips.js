"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function initTipsDOM(model, props) {
    var w = !model.metaData.w ? "100%" : model.metaData.w[model.lang] ? model.metaData.w[model.lang] : model.metaData.w[Object.keys(model.metaData.w)[0]];
    // 46 = 30 + 16  30: 默认高度。16：展开收起
    var h = !model.metaData.h ? "30px" : model.metaData.h[model.lang] ? model.metaData.h[model.lang] : model.metaData.h[Object.keys(model.metaData.h)[0]];
    if (h == "") h = "30px";
    if (w == "") w = "100%";
    // const wrapDom = model.dom.getElementsByClassName('TipsWrap')[0]
    model.dom.style.height = h;
    model.dom.style.width = w;
    // model.dom.style.zIndex = 1050
    // wrapDom.parentNode.style.height = h
    // wrapDom.parentNode.style.width = w
    var textDom = model.dom.getElementsByClassName('tips')[0];
    // wrapDom.style.height = '100%'
    // wrapDom.style.width = '100%'
    // props.data 可能传过来是一个{content:'',id: ''} 也可能是一个string
    var textData;
    if (props.data instanceof Object) {
        textData = props.data.content;
    } else {
        textData = props.data;
    }
    try {
        // textDom.append(textData)
        // 初始化的时候做的一些事情
        getModelData(model);
        var resultStr = handleATab(textData);
        var imgStr = imgVariable(resultStr); //图片变量
        var customStr = customDialog(imgStr); //自定义弹窗
        textDom.innerHTML = customStr;
        var lis = model.dom.getElementsByTagName('li');
        if (lis.length > 0) {
            handleUlOl(lis[0]);
        }
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
    var domArr = model.dom.getElementsByClassName('clicktab');
    if (domArr && domArr.length != 0) {
        domArr.forEach(function (item) {
            item.onclick = function () {
                var id = item.getAttribute('id');
                var name = item.text;
                var key = item.getAttribute('key');
                var type = item.getAttribute('type');
                var data = { name: name, type: type };
                if (key == "id") {
                    Object.assign(data, { id: id });
                } else if (key == "no") {
                    Object.assign(data, { no: id });
                }
                model.invokeCustomMethod('clickContent', data);
            };
        });
    }

    //右键点击复制事件 pc端才有复制事件
    if (props.data && props.data.no) {
        if (window.deviceType == "pc") {
            copyEvent(model, props.data.no || props.data.id);
        } else if (window.deviceType == "mobile") {
            touchCopyId(model, props.data);
        }
    }
    // 测试移动端长按
    if (window.deviceType == "mobile") {
        touchCopyId(model, props.data);
    }
    if (window.deviceType == "pc") {
        $(model.dom).on('click', ".tips_copyOperator", function (e) {
            // e.stopPropagation()
            var input = document.createElement('input');
            input.value = model.Tips.inputValue;
            input.setAttribute('value', model.Tips.inputValue);
            document.body.appendChild(input);
            input.select();
            if (document.execCommand('copy')) {
                document.execCommand('copy');
                $(model.dom).find('.tips_copytips').remove();
            }
            document.body.removeChild(input);
        });
    }

    document.body.onclick = function (e) {
        var _copytips = $('.tips_copytips');
        if (!_copytips.is(e.target)) {
            _copytips.remove();
        }
    };
}
/*
  pc端弹出关联提示语弹窗
*/
function showTipsDialog(model, data) {
    // $(model.dom).css({'z-index': 1051})
    var closeBtn = KDApi.getLangMsg(model, "closeBtn");
    var str = "<div tabindex=\"-1\" class=\"tipsDialog\" id=\"tipsDialog\">" + "<div tabindex=\"0\" class=\"hr-tips\" id=\"hr-tips\">" + ("<div class=\"tipsDialogTitle\">" + data.name + "</div>") + "<div class=\"hr-tips-body\" id=\"hr-tips-body\">" + "<div id=\"mainContent\" class=\"mainContent\">" + ("<div class=\"contentChild\"><div>" + data.content) + "</div></div></div>" + "<div class=\"tips_dialog_close_btn\"> " + ("<span id=\"closeDialogTips\" class=\"_131-FpCt _2Ye720tx secondary-text-in-light hover-theme-fc1 hover-theme-border-color1 active-theme-active-fc1 active-theme-active-bdcolor1\">" + closeBtn + "</span/>") + "</div/></div>" + "<i class=\"kdfont kdfont-guanbiyulan kd-hover-color closeTips\"></i></div></div>";
    $('#TipsWrap', model.dom).parent().append(str);
    //  关闭关联弹窗
    $(model.dom).on("click", "#closeDialogTips, .closeTips", function () {
        // $(model.dom).css({'z-index': 1050})
        if (!$('#tipsDialog', model.dom)) return;
        $('#tipsDialog', model.dom).remove();
    });
    //关联提示语是提示语控件类型，让他支持右键复制提示语id   
    if (!data.no) return;
    document.oncontextmenu = function (e) {
        e.preventDefault();
    };
    $(model.dom).on("mousedown", "#mainContent", function (e) {
        createCopyView(model, e, data.no);
    });
    // 拖拉改变大小的功能，暂时拿掉
    // new DragResize(model, '#tipsDialog', { minW: 100, minH: 100 })
}

/*
  mobile端弹出关联提示语弹窗
*/
function showMobileTipsDialog(model, data) {
    var contentHeight = document.body.clientHeight && document.body.clientHeight * 0.8 - 100 + "px";
    var iKnow = KDApi.getLangMsg(model, 'iKnow');
    var str = "<div tabindex=\"-1\" class=\"mobileTipsDialog\" id=\"mobileTipsDialog\">" + "<div tabindex=\"0\" class=\"mobile-hr-tips\" id=\"mobile-hr-tips\">" + "<div class=\"mobileHeader\">" + ("<div class=\"HeaderDes\">" + data.name + "</div>") + "</div>" + "<div class=\"mobileBody\">" + ("<div class=\"mobileContent\" style=\"max-height:" + contentHeight + "\">" + data.content + "</div>") + ("<div class=\"mobileIKnowBtn\"><span class=\"clickIKnow\">" + iKnow + "</span></div>") + "</div></div></div>";
    var parentDom = model.dom.getElementsByClassName('TipsWrap')[0].parentNode;
    var appendDom = document.createElement('div');
    appendDom.id = "mobileTipsDialogWrap";
    appendDom.className = "mobileTipsDialogWrap";
    appendDom.innerHTML = str;
    parentDom.append(appendDom);
    var IKnowDom = model.dom.getElementsByClassName('clickIKnow')[0];
    IKnowDom.onclick = function () {
        model.dom.getElementsByClassName('mobileTipsDialogWrap')[0].remove();
    };
}

/**
 * 创建复制提示语id的弹窗
 * @param {*} model 
 * @param {*} e 
 * @param {*} data 
 */
function createCopyView(model, e, data) {
    e.stopPropagation();
    model.Tips.inputValue = data;
    if (e.button == 2) {
        //   同一个页面只会出现一个复制弹窗
        $('.tips_copytips').remove();
        var descriptionInfo = KDApi.getLangMsg(model, 'descriptionInfo');
        var descriptionCode = KDApi.getLangMsg(model, 'descriptionCode');
        var descriptionCopy = KDApi.getLangMsg(model, 'copy');
        $(model.dom).append('<div class="tips_copytips"><div class="tips_copycontent">' + descriptionInfo + '<br>' + descriptionCode + '：' + '<span class="tips_copyno">' + data + '</span>' + '<a class="tips_copyOperator">' + descriptionCopy + '</a>' + '</div></div>');
        var posInfo = { left: e.clientX, top: e.clientY };
        var bodyRect = document.getElementsByTagName('body')[0].getBoundingClientRect();
        // eRect 280 * 50
        if (e.clientX + 280 > bodyRect.right) {
            posInfo.left = e.clientX - 280;
        }
        if (e.clientY + 50 > bodyRect.bottom) {
            posInfo.top = e.clientY - 50;
        }
        $('.tips_copytips', model.dom).css({ left: posInfo.left + "px", top: posInfo.top + "px" });
    }
}
function handleATab(str) {
    if (!str && str != '') return;
    var resultStr = str;
    var len = str.split('③#{').length - 1;
    if (len === 0) {
        return str;
    } else {
        for (var i = 0; i < len; i++) {
            var numsStarts = searchSubStr(resultStr, '③#{');
            var numsEnds = searchSubStr(resultStr, '}#');
            var numsStart = numsStarts[0];
            var numsEnd = getNumsEnd(numsEnds, numsStart);
            if (numsStart > numsEnd) {
                break;
            }
            resultStr = getResultStrByJson(resultStr, numsStart, numsEnd, "tips");
        }
    }
    return resultStr;
}

//图片变量
function imgVariable(str) {
    if (!str && str != "") return;
    var resultStr = str;
    var len = str.split('<img>').length - 1;
    if (len === 0) {
        return str;
    } else {
        for (var i = 0; i < len; i++) {
            var numsStarts = searchSubStr(resultStr, '<img>');
            var numsEnds = searchSubStr(resultStr, '</img>');
            var numsStart = numsStarts[0];
            var numsEnd = getNumsEnd(numsEnds, numsStart);
            if (numsStart > numsEnd) {
                break;
            }
            var imgstr = resultStr.substring(numsStart + 5, numsEnd);
            var replaceAtab = "<img src=\"" + imgstr + "\"></img>";
            resultStr = replaceStr(resultStr, numsStart, numsEnd + 6, replaceAtab);
        }
    }
    return resultStr;
}

//自定义弹窗
function customDialog(str) {
    if (!str && str != "") return;
    var resultStr = str;
    var len = str.split('④#{').length - 1;
    if (len == 0) {
        return str;
    } else {
        for (var i = 0; i < len; i++) {
            var numsStarts = searchSubStr(resultStr, '④#{');
            var numsEnds = searchSubStr(resultStr, '}#');
            var numsStart = numsStarts[0];
            var numsEnd = getNumsEnd(numsEnds, numsStart);
            if (numsStart > numsEnd) {
                break;
            }
            resultStr = getResultStrByJson(resultStr, numsStart, numsEnd, "diywindow");
        }
    }
    return resultStr;
}

function searchSubStr(str, subStr) {
    var nums = [];
    var pos = str.indexOf(subStr);
    while (pos > -1) {
        nums.push(pos);
        pos = str.indexOf(subStr, pos + 1);
    }
    return nums;
}

function replaceStr(text, start, end, replaceText) {
    var myStr = text.substring(0, start) + replaceText + text.substring(end);
    return myStr;
}

function getNumsEnd(numsEnds, numsStart) {
    var numsEnd = 0;
    for (var j = 0; j < numsEnds.length; j++) {
        if (numsEnds[j] > numsStart) {
            numsEnd = numsEnds[j];
            break;
        }
    }
    return numsEnd;
}

function getResultStrByJson(resultStr, numsStart, numsEnd, type) {
    try {
        var tab = resultStr.substring(numsStart + 2, numsEnd + 1);
        var tabObj = JSON.parse(tab); // 原来一定是一个对象，现在产品说要兼容用户自定义
        var name = tabObj.name,
            id = tabObj.id,
            no = tabObj.no; // 原来是id，现在是no，不会同时传 id和no，产品说要兼容

        var key = Object.keys(tabObj).indexOf('id') > -1 ? 'id' : 'no';
        var eleId = no || id;
        var replaceAtab = "<a id=" + eleId + " class=\"clicktab\" type=" + type + " key=" + key + ">" + name + "</a>";
        resultStr = replaceStr(resultStr, numsStart, numsEnd + 2, replaceAtab);
        return resultStr;
    } catch (error) {
        return resultStr;
    }
}
// 判断是不是JSON字符串
function isJsonString(str) {

    try {
        $.parseJSON(str);
    } catch (error) {
        return false;
    }
    return true;
}
/*
   移动端长按复制编码
*/
function touchCopyId(model, data) {
    var no = data.no || data.id || KDApi.getLangMsg(model, "copyTest");
    var tipsDom = model.dom.getElementsByClassName('TipsWrap')[0];
    tipsDom.addEventListener('touchstart', function (e) {
        // e.preventDefault();
        //   model.Tips.timer = setTimeout(function() {
        //       var copyInput = document.createElement('input');
        //       document.body.appendChild(copyInput);
        //       copyInput.setAttribute('value', no);
        //       copyInput.select();
        //       if (document.execCommand) {
        //           document.execCommand('copy');
        //       }
        //       document.body.removeChild(copyInput)
        //   }, 700)
        var copyInput = document.createElement('input');
        document.body.appendChild(copyInput);
        copyInput.setAttribute('value', no);
        copyInput.select();
        if (document.execCommand) {
            document.execCommand('copy');
        }
        document.body.removeChild(copyInput);
    });
    tipsDom.addEventListener('touchend', function (e) {
        // e.preventDefault();
        clearTimeout(model.Tips.timer);
    });
}

// 复制弹窗
function copyEvent(model, no) {
    document.oncontextmenu = function (e) {
        e.preventDefault();
    };
    $(model.dom).on("mousedown", "#TipsWrap", function (e) {
        createCopyView(model, e, no);
    });
}

var DragResize = function () {
    function DragResize(model, select) {
        var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        _classCallCheck(this, DragResize);

        this.box = model.dom.querySelector(select);
        if (!this.box) {
            throw new Error('无效的dom元素');
        } else {
            this.init(params);
        }
    }

    _createClass(DragResize, [{
        key: "init",
        value: function init(params) {
            var actions = params.actions || ['m', 'l', 'r', 'b', 'lt', 'rt', 'rb', 'lb'];
            this.minW = params.minW || 0;
            this.minH = params.minH || 0;
            this.maxW = params.maxW || window.innerWidth;
            this.maxH = params.maxH || window.innerHeight;

            // 保存window的原有事件，用作后续还原
            this.lastWindowMousemove = window.onmousemove;
            this.lastWindowMouseup = window.onmouseup;
            this.createHtml(actions);
            this.makeStyle();
        }
    }, {
        key: "mousedown",
        value: function mousedown(e) {
            var _this = this;

            var className = e.target.className;
            var isMove = className.lastIndexOf('m') > 7;
            var isT = className.lastIndexOf('t') > 7;
            var isR = className.lastIndexOf('r') > 7;
            var isL = className.lastIndexOf('l') > 7;
            var isB = className.lastIndexOf('b') > 7;
            var parent = this.box;
            var lastX = e.pageX;
            var lastY = e.pageY;

            var _parent$getBoundingCl = parent.getBoundingClientRect(),
                left = _parent$getBoundingCl.left,
                top = _parent$getBoundingCl.top,
                width = _parent$getBoundingCl.width,
                height = _parent$getBoundingCl.height;

            window.onmousemove = function (ev) {
                e.preventDefault();
                var disX = ev.pageX - lastX;
                var disY = ev.pageY - lastY;
                parent.style.transform = 'none';
                parent.style.top = top + "px";
                // 拖动弹窗，产品没说，暂时拿掉，不会触发
                if (isMove) {
                    var l = left + disX;
                    var t = top + disY;
                    var maxW = window.innerWidth - width;
                    var maxH = window.innerHeight - height;
                    l = l <= 0 ? 0 : l >= maxW ? maxW : l;
                    t = t <= 0 ? 0 : t >= maxH ? maxH : t;
                    parent.style.left = l + "px";
                    parent.style.top = t + "px";
                }
                if (isT) {
                    disY = disY >= height - _this.minH ? height - _this.minH : disY <= height - _this.maxH ? height - _this.maxH : disY;
                    var h = height - disY;
                    var _t = top + disY;
                    parent.style.height = h + "px";
                    parent.style.left = left + "px";
                    parent.style.top = _t + "px";
                } else if (isB) {
                    var _h = height + disY;
                    if (_h <= _this.minH) {
                        _h = _this.minH;
                    } else if (_h >= _this.minH) {
                        _h = _this.maxH;
                    }
                    parent.style.height = _h + "px";
                    parent.style.left = left + "px";
                }
                if (isR) {
                    var w = width + disX;
                    if (w <= _this.minW) {
                        w = _this.minW;
                    } else if (w >= _this.maxW) {
                        w = _this.maxW;
                    }
                    parent.style.width = w + "px";
                    parent.style.left = left + "px";
                } else if (isL) {
                    if (disX >= width - _this.minW) {
                        disX = width - _this.minW;
                    } else if (disX <= width - _this.maxW) {
                        disX = width - _this.maxW;
                    }
                    var _w = width - disX;
                    var _l = left + disX;
                    parent.style.width = _w + "px";
                    parent.style.left = _l + "px";
                }
            };
            // 还原window事件
            window.onmouseup = function () {
                window.onmousemove = this.lastWindowMousemove;
                window.onmouseup = this.lastWindowMouseup;
            };
        }
    }, {
        key: "createHtml",
        value: function createHtml(actions) {
            if (Array.isArray(actions) && actions.length > 0) {
                for (var i = 0; i < actions.length; i++) {
                    var a = document.createElement('a');
                    a.className = 'js-drag-' + actions[i];
                    this.box.appendChild(a);
                    this.addEvent(a);
                }
            } else {
                return;
            }
        }
    }, {
        key: "addEvent",
        value: function addEvent(el) {
            el.addEventListener('mousedown', this.mousedown.bind(this), false);
        }
    }, {
        key: "makeStyle",
        value: function makeStyle() {
            var style = document.createElement('style');
            style.innerHTML = "\n        .js-drag-lt, .js-drag-rt, .js-drag-lb, .js-drag-rb{\n            z-index: 1050;\n            position: absolute;\n            width: 10px;\n            height: 10px;\n        }\n        .js-drag-t, .js-drag-m, .js-drag-b{\n            z-index: 1050;\n            position: absolute;\n            width: 100%;\n            height: 10px;\n        }\n        .js-drag-l, .js-drag-r{\n            z-index: 1050;\n            position: absolute;\n            width: 10px;\n            height: 100%;\n        }\n        .js-drag-t, .js-drag-m, .js-drag-l, .js-drag-r, .js-drag-lt, .js-drag-rt{\n            top: 0;\n        }\n        .js-drag-lb, .js-drag-b, .js-drag-rb{\n            bottom: 0;\n        }\n        .js-drag-t, .js-drag-m, .js-drag-l, .js-drag-b, .js-drag-lb, .js-drag-lt{\n            left: 0;\n        }\n        .js-drag-r, .js-drag-rb, .js-drag-rt{\n            right: 0;\n        }\n        .js-drag-m{\n            cursor: move;\n        }\n        .js-drag-t, .js-drag-b{\n            cursor: ns-resize;\n        }\n        .js-drag-l, .js-drag-r{\n            cursor: ew-resize;\n        }\n        .js-drag-rb, .js-drag-lt{\n            cursor: nwse-resize;\n        }\n        .js-drag-lb, .js-drag-rt{\n            cursor: nesw-resize;\n        }";
            document.head.appendChild(style);
        }
    }]);

    return DragResize;
}();

/*
  处理ul，ol被平台样式覆盖的问题，强制覆盖回来
*/


function handleUlOl(data) {
    if (!data) return;
    var parentDom = data.parentNode;
    var type = parentDom.style.listStyleType;
    if (type == "") {
        if (parentDom.nodeName == "OL") {
            parentDom.style.listStyleType = "decimal";
        } else if (parentDom.nodeName == "UL") {
            parentDom.style.listStyleType = 'initial';
        }
    }
}

/*
   初始化向后端发送请求
   getHintScroll: 是否设置滚动加载
   getIsExpand: 是否设置展开收起 只有pc端有
*/
function getModelData(model) {
    model.invokeCustomMethod('getHintScroll');
    if (window.deviceType == "pc") {
        model.invokeCustomMethod('getIsExpand');
    }
}
/**
 * 设置展开收起
 * model: 当前组件
 * data: true  or false
 * icon: 展开： kdfont kdfont-zhankai4，收起：kdfont kdfont-shouqi7
 * 设置展开收起，提示语控件分为左右两个部分，展开收起图标独占16px的位置
 */
function setIsExpand(model) {
    try {
        var wrapDom = model.dom.getElementsByClassName('TipsWrap')[0];
        var expandTips = KDApi.getLangMsg(model, "expand");
        var pickUpTips = KDApi.getLangMsg(model, "pickUp");
        $(model.dom).css({ 'position': 'relative' });
        var w = !model.metaData.w ? "100%" : model.metaData.w[model.lang] ? model.metaData.w[model.lang] : model.metaData.w[Object.keys(model.metaData.w)[0]];
        $('.TipsWrap', model.dom).css({ width: "calc(" + w + " - 16px)" });
        var expandDom = "<div expand=false title=\"" + expandTips + "\" class=\"hrTipsShowExpand\"><i class=\"tipsExpandAndPickupIcon kdfont kdfont kdfont-shouqi7\"></i></div>";
        $('#TipsWrap', model.dom).parent().append(expandDom);
        $(model.dom).on('click', ".hrTipsShowExpand", function (e) {
            var isExpand = this.getAttribute('expand');
            if (isExpand == "false") {
                //文字是收起，显示的是展开两个字
                wrapDom.style.height = 'auto';
                wrapDom.parentNode.style.height = "auto";
                this.setAttribute('expand', "true");
                this.innerHTML = "<i class=\"tipsExpandAndPickupIcon kdfont kdfont kdfont-zhankai4\"></i>";
                this.setAttribute('title', pickUpTips);
            } else if (isExpand == "true") {
                this.innerHTML = "<i class=\"tipsExpandAndPickupIcon kdfont kdfont-shouqi7\"></i>";
                var h = !model.metaData.h ? "30px" : model.metaData.h[model.lang] ? model.metaData.h[model.lang] : model.metaData.h[Object.keys(model.metaData.h)[0]];
                if (h == "") h = "30px";
                var tempH = Number(h.trim().replace(/[^\d.]/g, ''));
                wrapDom.parentNode.style.height = tempH + "px";
                wrapDom.style.height = h;
                this.setAttribute('expand', "false");
                this.setAttribute('title', expandTips);
            }
        });
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

/**
 * 暂时去掉，计算场景考虑不周全
 * 1.计算最多显示行数
 * 2.不要把文字截断
 * 3.图片直接截断
 */
function calculateShowLines(model) {
    try {
        //内边距
        var paddingTB = model.dom.style.paddingTop.replace(/[^\d.]/g, '') + model.dom.style.paddingBottom.replace(/[^\d.]/g, '');
        // let contentHeight = $('#TipsWrap', model.dom).height()
        var modelHeight = model.dom.offsetHeight;
        var lineHeight = $('.tips', model.dom).css('line-height');
        if (lineHeight == "normal") lineHeight = 1.25; // 默认是1.33，实际不同浏览器取值是1~1.33
        var fontSize = $('.tips', model.dom).css('font-size').replace(/[^\d.]/g, '');
        fontSize = Number(fontSize);
        // 计算出最多显示行数
        var maxLine = (Number(modelHeight) - Number(paddingTB)) / (Number(lineHeight) * fontSize);
        maxLine = Math.floor(maxLine); // 最后行数向下取整
    } catch (error) {
        throw new Error(error);
    }
}