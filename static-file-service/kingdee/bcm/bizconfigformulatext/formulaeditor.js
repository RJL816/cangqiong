/**
 * ueditor完整配置项
 * 可以在这里配置整个编辑器的特性
 */
/**************************提示********************************
 * 所有被注释的配置项均为UEditor默认值。
 * 修改默认配置请首先确保已经完全明确该参数的真实用途。
 * 主要有两种修改方案，一种是取消此处注释，然后修改成对应参数；另一种是在实例化编辑器时传入对应参数。
 * 当升级编辑器时，可直接使用旧版配置文件替换新版配置文件,不用担心旧版配置文件中因缺少新功能所需的参数而导致脚本报错。
 **************************提示********************************/

(function () {

    /**
     * 编辑器资源文件根路径。它所表示的含义是：以编辑器实例化页面为当前路径，指向编辑器资源文件（即dialog等文件夹）的路径。
     * 鉴于很多同学在使用编辑器的时候出现的种种路径问题，此处强烈建议大家使用"相对于网站根目录的相对路径"进行配置。
     * "相对于网站根目录的相对路径"也就是以斜杠开头的形如"/myProject/ueditor/"这样的路径。
     * 如果站点中有多个不在同一层级的页面需要实例化编辑器，且引用了同一UEditor的时候，此处的URL可能不适用于每个页面的编辑器。
     * 因此，UEditor提供了针对不同页面的编辑器可单独配置的根路径，具体来说，在需要实例化编辑器的页面最顶部写上如下代码即可。当然，需要令此处的URL等于对应的配置。
     * window.UEDITOR_HOME_URL = "/xxxx/xxxx/";
     */
    var URL = window.UEDITOR_HOME_URL || getUEBasePath();

    /**
     * 配置项主体。注意，此处所有涉及到路径的配置别遗漏URL变量。
     */
    window.UEDITOR_CONFIG = {

        //为编辑器实例添加一个路径，这个不能被注释
        UEDITOR_HOME_URL: URL

        // 服务器统一请求接口路径
        , serverUrl: URL + "jsp/controller.jsp"

        //工具栏上的所有的功能按钮和下拉框，可以在new编辑器的实例时选择自己需要的重新定义
        , toolbars: [[
        ]]
		// xss 过滤是否开启,inserthtml等操作
		,xssFilterRules: true
		//input xss过滤
		,inputXssFilter: true
		//output xss过滤
		,outputXssFilter: true
		// xss过滤白名单
		,whitList: {
			img:    ['src', 'alt', 'title', 'width', 'height', 'id','loadingclass', 'class', 'data-latex','style','f7key'],
			u:      []
		}
    };

    function getUEBasePath(docUrl, confUrl) {

        return getBasePath(docUrl || self.document.URL || self.location.href, confUrl || getConfigFilePath());

    }

    function getConfigFilePath() {

        var configPath = document.getElementsByTagName('script');

        return configPath[ configPath.length - 1 ].src;

    }

    function getBasePath(docUrl, confUrl) {

        var basePath = confUrl;


        if (/^(\/|\\\\)/.test(confUrl)) {

            basePath = /^.+?\w(\/|\\\\)/.exec(docUrl)[0] + confUrl.replace(/^(\/|\\\\)/, '');

        } else if (!/^[a-z]+:/i.test(confUrl)) {

            docUrl = docUrl.split("#")[0].split("?")[0].replace(/[^\\\/]+$/, '');

            basePath = docUrl + "" + confUrl;

        }

        return optimizationPath(basePath);

    }

    function optimizationPath(path) {

        var protocol = /^[a-z]+:\/\//.exec(path)[ 0 ],
            tmp = null,
            res = [];

        path = path.replace(protocol, "").split("?")[0].split("#")[0];

        path = path.replace(/\\/g, '/').split(/\//);

        path[ path.length - 1 ] = "";

        while (path.length) {

            if (( tmp = path.shift() ) === "..") {
                res.pop();
            } else if (tmp !== ".") {
                res.push(tmp);
            }

        }

        return protocol + res.join("/");

    }

    window.UE_biz = {
        getUEBasePath: getUEBasePath
    };


})();
;/*!
 * UEditor
 * version: ueditor
 * build: Wed Aug 10 2016 11:06:16 GMT+0800 (CST)
 */

(function(){

// editor.js
UEDITOR_CONFIG = window.UEDITOR_CONFIG || {};

var baidu = window.baidu || {};

window.baidu = baidu;

window.UE_biz = baidu.editor =  window.UE_biz || {};

UE_biz.plugins = {};

UE_biz.commands = {};

UE_biz.instants = {};

UE_biz.I18N = {};

UE_biz._customizeUI = {};

UE_biz.version = "1.4.3";

var dom = UE_biz.dom = {};

// core/browser.js

/**
 * 提供浏览器检测的模块
 * @unfile
 * @module UE_biz.browser
 */
var browser = UE_biz.browser = function(){
    var agent = navigator.userAgent.toLowerCase(),
        opera = window.opera,
        browser = {
        ie		:  /(msie\s|trident.*rv:)([\w.]+)/.test(agent),
        opera	: ( !!opera && opera.version ),
        webkit	: ( agent.indexOf( ' applewebkit/' ) > -1 ),
        mac	: ( agent.indexOf( 'macintosh' ) > -1 ),
        quirks : ( document.compatMode == 'BackCompat' )
    };

    browser.gecko =( navigator.product == 'Gecko' && !browser.webkit && !browser.opera && !browser.ie);

    var version = 0;

    // Internet Explorer 6.0+
    if ( browser.ie ){

        var v1 =  agent.match(/(?:msie\s([\w.]+))/);
        var v2 = agent.match(/(?:trident.*rv:([\w.]+))/);
        if(v1 && v2 && v1[1] && v2[1]){
            version = Math.max(v1[1]*1,v2[1]*1);
        }else if(v1 && v1[1]){
            version = v1[1]*1;
        }else if(v2 && v2[1]){
            version = v2[1]*1;
        }else{
            version = 0;
        }

        browser.ie11Compat = document.documentMode == 11;
        browser.ie9Compat = document.documentMode == 9;
        browser.ie8 = !!document.documentMode;
        browser.ie8Compat = document.documentMode == 8;
        browser.ie7Compat = ( ( version == 7 && !document.documentMode )
                || document.documentMode == 7 );
        browser.ie6Compat = ( version < 7 || browser.quirks );
        browser.ie9above = version > 8;
        browser.ie9below = version < 9;
        browser.ie11above = version > 10;
        browser.ie11below = version < 11;
    }

    // Gecko.
    if ( browser.gecko ){
        var geckoRelease = agent.match( /rv:([\d\.]+)/ );
        if ( geckoRelease )
        {
            geckoRelease = geckoRelease[1].split( '.' );
            version = geckoRelease[0] * 10000 + ( geckoRelease[1] || 0 ) * 100 + ( geckoRelease[2] || 0 ) * 1;
        }
    }


    if (/chrome\/(\d+\.\d)/i.test(agent)) {
        browser.chrome = + RegExp['\x241'];
    }

    if(/(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(agent) && !/chrome/i.test(agent)){
    	browser.safari = + (RegExp['\x241'] || RegExp['\x242']);
    }


    // Opera 9.50+
    if ( browser.opera )
        version = parseFloat( opera.version() );

    // WebKit 522+ (Safari 3+)
    if ( browser.webkit )
        version = parseFloat( agent.match( / applewebkit\/(\d+)/ )[1] );


    browser.version = version;
    browser.isCompatible =
        !browser.mobile && (
        ( browser.ie && version >= 6 ) ||
        ( browser.gecko && version >= 10801 ) ||
        ( browser.opera && version >= 9.5 ) ||
        ( browser.air && version >= 1 ) ||
        ( browser.webkit && version >= 522 ) ||
        false );
    return browser;
}();
//快捷方式
var ie = browser.ie,
    webkit = browser.webkit,
    gecko = browser.gecko,
    opera = browser.opera;

// core/utils.js
/**
 * UEditor封装使用的静态工具函数
 * @module UE_biz.utils
 * @unfile
 */

var utils = UE_biz.utils = {
    /**
     * 用给定的迭代器遍历数组或类数组对象
     * @method each
     * @param { Array } array 需要遍历的数组或者类数组
     * @param { Function } iterator 迭代器， 该方法接受两个参数， 第一个参数是当前所处理的value， 第二个参数是当前遍历对象的key
     */
    each : function(obj, iterator, context) {
        if (obj == null) return;
        if (obj.length === +obj.length) {
            for (var i = 0, l = obj.length; i < l; i++) {
                if(iterator.call(context, obj[i], i, obj) === false)
                    return false;
            }
        } else {
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if(iterator.call(context, obj[key], key, obj) === false)
                        return false;
                }
            }
        }
    },

    /**
     * 以给定对象作为原型创建一个新对象
     * @method makeInstance
     * @param { Object } protoObject 该对象将作为新创建对象的原型
     * @return { Object } 新的对象， 该对象的原型是给定的protoObject对象
     */
    makeInstance:function (obj) {
        var noop = new Function();
        noop.prototype = obj;
        obj = new noop;
        noop.prototype = null;
        return obj;
    },


    /**
     * 将source对象中的属性扩展到target对象上， 根据指定的isKeepTarget值决定是否保留目标对象中与
     * 源对象属性名相同的属性值。
     * @method extend
     * @param { Object } target 目标对象， 新的属性将附加到该对象上
     * @param { Object } source 源对象， 该对象的属性会被附加到target对象上
     * @param { Boolean } isKeepTarget 是否保留目标对象中与源对象中属性名相同的属性
     * @return { Object } 返回target对象
     */
    extend:function (t, s, b) {
        if (s) {
            for (var k in s) {
                if (!b || !t.hasOwnProperty(k)) {
                    t[k] = s[k];
                }
            }
        }
        return t;
    },

    /**
     * 将给定的多个对象的属性复制到目标对象target上
     * @method extend2
     * @remind 该方法将强制把源对象上的属性复制到target对象上
     * @remind 该方法支持两个及以上的参数， 从第二个参数开始， 其属性都会被复制到第一个参数上。 如果遇到同名的属性，
     *          将会覆盖掉之前的值。
     * @param { Object } target 目标对象， 新的属性将附加到该对象上
     * @param { Object... } source 源对象， 支持多个对象， 该对象的属性会被附加到target对象上
     * @return { Object } 返回target对象
     * ```
     */
    extend2:function (t) {
        var a = arguments;
        for (var i = 1; i < a.length; i++) {
            var x = a[i];
            for (var k in x) {
                if (!t.hasOwnProperty(k)) {
                    t[k] = x[k];
                }
            }
        }
        return t;
    },

    /**
     * 模拟继承机制， 使得subClass继承自superClass
     * @method inherits
     * @param { Object } subClass 子类对象
     * @param { Object } superClass 超类对象
     * @warning 该方法只能让subClass继承超类的原型， subClass对象自身的属性和方法不会被继承
     * @return { Object } 继承superClass后的子类对象
     */
    inherits:function (subClass, superClass) {
        var oldP = subClass.prototype,
            newP = utils.makeInstance(superClass.prototype);
        utils.extend(newP, oldP, true);
        subClass.prototype = newP;
        return (newP.constructor = subClass);
    },

    /**
     * 用指定的context对象作为函数fn的上下文
     * @method bind
     * @param { Function } fn 需要绑定上下文的函数对象
     * @param { Object } content 函数fn新的上下文对象
     * @return { Function } 一个新的函数， 该函数作为原始函数fn的代理， 将完成fn的上下文调换工作。
     */
    bind:function (fn, context) {
        return function () {
            return fn.apply(context, arguments);
        };
    },

    /**
     * 创建延迟指定时间后执行的函数fn, 如果在延迟时间内再次执行该方法， 将会根据指定的exclusion的值，
     * 决定是否取消前一次函数的执行， 如果exclusion的值为true， 则取消执行，反之，将继续执行前一个方法。
     * @method defer
     * @param { Function } fn 需要延迟执行的函数对象
     * @param { int } delay 延迟的时间， 单位是毫秒
     * @param { Boolean } exclusion 如果在延迟时间内再次执行该函数，该值将决定是否取消执行前一次函数的执行，
     *                     值为true表示取消执行， 反之则将在执行前一次函数之后才执行本次函数调用。
     * @warning 该方法的时间控制是不精确的，仅仅只能保证函数的执行是在给定的时间之后，
     *           而不能保证刚好到达延迟时间时执行。
     * @return { Function } 目标函数fn的代理函数， 只有执行该函数才能起到延时效果
     */
    defer:function (fn, delay, exclusion) {
        var timerID;
        return function () {
            if (exclusion) {
                clearTimeout(timerID);
            }
            timerID = setTimeout(fn, delay);
        };
    },

    /**
     * 获取元素item数组array中首次出现的位置, 如果未找到item， 则返回-1。通过start的值可以指定搜索的起始位置。
     * @method indexOf
     * @remind 该方法的匹配过程使用的是恒等“===”
     * @param { Array } array 需要查找的数组对象
     * @param { * } item 需要在目标数组中查找的值
     * @param { int } start 搜索的起始位置
     * @return { int } 返回item在目标数组array中的start位置之后首次出现的位置， 如果在数组中未找到item， 则返回-1
     */
    indexOf:function (array, item, start) {
        var index = -1;
        start = this.isNumber(start) ? start : 0;
        this.each(array, function (v, i) {
            if (i >= start && v === item) {
                index = i;
                return false;
            }
        });
        return index;
    },

    /**
     * 移除数组array中所有的元素item
     * @method removeItem
     * @param { Array } array 要移除元素的目标数组
     * @param { * } item 将要被移除的元素
     * @remind 该方法的匹配过程使用的是恒等“===”
     */
    removeItem:function (array, item) {
        for (var i = 0, l = array.length; i < l; i++) {
            if (array[i] === item) {
                array.splice(i, 1);
                i--;
            }
        }
    },

    /**
     * 删除字符串str的首尾空格
     * @method trim
     * @param { String } str 需要删除首尾空格的字符串
     * @return { String } 删除了首尾的空格后的字符串
     */
    trim:function (str) {
        return str.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g, '');
    },
    /**
     * 将字符串数组转换成哈希对象， 其生成的hash对象的key为数组中的元素， value为1
     * @method listToMap
     * @warning 该方法在生成的hash对象中，会为每一个key同时生成一个另一个全大写的key。
     * @param { Array } arr 字符串数组
     * @return { Object } 转化之后的hash对象
     */
    listToMap:function (list) {
        if (!list)return {};
        list = utils.isArray(list) ? list : list.split(',');
        for (var i = 0, ci, obj = {}; ci = list[i++];) {
            obj[ci.toUpperCase()] = obj[ci] = 1;
        }
        return obj;
    },

    /**
     * 将str中的html符号转义,将转义“'，&，<，"，>”五个字符
     * @method unhtml
     * @param { String } str 需要转义的字符串
     * @return { String } 转义后的字符串
     */
    unhtml:function (str, reg) {
        return str ? str.replace(reg || /[&<">'](?:(amp|lt|quot|gt|#39|nbsp|#\d+);)?/g, function (a, b) {
            if (b) {
                return a;
            } else {
                return {
                    '<':'&lt;',
                    '&':'&amp;',
                    '"':'&quot;',
                    '>':'&gt;',
                    "'":'&#39;'
                }[a]
            }

        }) : '';
    },

    /**
     * 将str中的转义字符还原成html字符
     * @see UE_biz.utils.unhtml(String);
     * @method html
     * @param { String } str 需要逆转义的字符串
     * @return { String } 逆转义后的字符串
     * ```
     */
    html:function (str) {
        return str ? str.replace(/&((g|l|quo)t|amp|#39|nbsp);/g, function (m) {
            return {
                '&lt;':'<',
                '&amp;':'&',
                '&quot;':'"',
                '&gt;':'>',
                '&#39;':"'",
                '&nbsp;':' '
            }[m]
        }) : '';
    },

    /**
     * 将css样式转换为驼峰的形式
     * @method cssStyleToDomStyle
     * @param { String } cssName 需要转换的css样式名
     * @return { String } 转换成驼峰形式后的css样式名
     */
    cssStyleToDomStyle:function () {
        var test = document.createElement('div').style,
            cache = {
                'float':test.cssFloat != undefined ? 'cssFloat' : test.styleFloat != undefined ? 'styleFloat' : 'float'
            };

        return function (cssName) {
            return cache[cssName] || (cache[cssName] = cssName.toLowerCase().replace(/-./g, function (match) {
                return match.charAt(1).toUpperCase();
            }));
        };
    }(),

    /**
     * 动态加载文件到doc中，加载成功后执行的回调函数fn
     * @method loadFile
     * @param { DomDocument } document 需要加载资源文件的文档对象
     * @param { Object } options 加载资源文件的属性集合， 该集合支持的值是script标签和style标签支持的所有属性。
     * @param { Function } fn 资源文件加载成功之后执行的回调
     * @warning 对于在同一个文档中多次加载同一URL的文件， 该方法会在第一次加载之后缓存该请求，
     *           在此之后的所有同一URL的请求， 将会直接触发回调。
     */
    loadFile:function () {
        var tmpList = [];

        function getItem(doc, obj) {
            try {
                for (var i = 0, ci; ci = tmpList[i++];) {
                    if (ci.doc === doc && ci.url == (obj.src || obj.href)) {
                        return ci;
                    }
                }
            } catch (e) {
                return null;
            }

        }

        return function (doc, obj, fn) {
            var item = getItem(doc, obj);
            if (item) {
                if (item.ready) {
                    fn && fn();
                } else {
                    item.funs.push(fn)
                }
                return;
            }
            tmpList.push({
                doc:doc,
                url:obj.src || obj.href,
                funs:[fn]
            });
            if (!doc.body) {
                var html = [];
                for (var p in obj) {
                    if (p == 'tag')continue;
                    html.push(p + '="' + obj[p] + '"')
                }
                doc.write('<' + obj.tag + ' ' + html.join(' ') + ' ></' + obj.tag + '>');
                return;
            }
            if (obj.id && doc.getElementById(obj.id)) {
                return;
            }
            var element = doc.createElement(obj.tag);
            delete obj.tag;
            for (var p in obj) {
                element.setAttribute(p, obj[p]);
            }
            element.onload = element.onreadystatechange = function () {
                if (!this.readyState || /loaded|complete/.test(this.readyState)) {
                    item = getItem(doc, obj);
                    if (item.funs.length > 0) {
                        item.ready = 1;
                        for (var fi; fi = item.funs.pop();) {
                            fi();
                        }
                    }
                    element.onload = element.onreadystatechange = null;
                }
            };
            element.onerror = function () {
                throw Error('The load ' + (obj.href || obj.src) + ' fails,check the url settings of file ueditor.config.js ')
            };
            doc.getElementsByTagName("head")[0].appendChild(element);
        }
    }(),

    /**
     * 判断obj对象是否为空
     * @method isEmptyObject
     * @param { * } obj 需要判断的对象
     * @remind 如果判断的对象是NULL， 将直接返回true， 如果是数组且为空， 返回true， 如果是字符串， 且字符串为空，
     *          返回true， 如果是普通对象， 且该对象没有任何实例属性， 返回true
     * @return { Boolean } 对象是否为空
     */
    isEmptyObject:function (obj) {
        if (obj == null) return true;
        if (this.isArray(obj) || this.isString(obj)) return obj.length === 0;
        for (var key in obj) if (obj.hasOwnProperty(key)) return false;
        return true;
    },

    /**
     * 把rgb格式的颜色值转换成16进制格式
     * @method fixColor
     * @param { String } rgb格式的颜色值
     * @param { String }
     * @example
     * rgb(255,255,255)  => "#ffffff"
     */
    fixColor:function (name, value) {
        if (/color/i.test(name) && /rgba?/.test(value)) {
            var array = value.split(",");
            if (array.length > 3)
                return "";
            value = "#";
            for (var i = 0, color; color = array[i++];) {
                color = parseInt(color.replace(/[^\d]/gi, ''), 10).toString(16);
                value += color.length == 1 ? "0" + color : color;
            }
            value = value.toUpperCase();
        }
        return  value;
    },

	
    /**
     * 深度克隆对象，将source的属性克隆到target对象， 会覆盖target重名的属性。
     * @method clone
     * @param { Object } source 源对象
     * @param { Object } target 目标对象
     * @return { Object } 附加了source对象所有属性的target对象
     */
    clone:function (source, target) {
        var tmp;
        target = target || {};
        for (var i in source) {
            if (source.hasOwnProperty(i)) {
                tmp = source[i];
                if (typeof tmp == 'object') {
                    target[i] = utils.isArray(tmp) ? [] : {};
                    utils.clone(source[i], target[i])
                } else {
                    target[i] = tmp;
                }
            }
        }
        return target;
    },

    /**
     * 把cm／pt为单位的值转换为px为单位的值
     * @method transUnitToPx
     * @param { String } 待转换的带单位的字符串
     * @return { String } 转换为px为计量单位的值的字符串
     */
    transUnitToPx:function (val) {
        if (!/(pt|cm)/.test(val)) {
            return val
        }
        var unit;
        val.replace(/([\d.]+)(\w+)/, function (str, v, u) {
            val = v;
            unit = u;
        });
        switch (unit) {
            case 'cm':
                val = parseFloat(val) * 25;
                break;
            case 'pt':
                val = Math.round(parseFloat(val) * 96 / 72);
        }
        return val + (val ? 'px' : '');
    },

    /**
     * 在dom树ready之后执行给定的回调函数
     * @method domReady
     * @remind 如果在执行该方法的时候， dom树已经ready， 那么回调函数将立刻执行
     * @param { Function } fn dom树ready之后的回调函数
     */
    domReady:function () {

        var fnArr = [];

        function doReady(doc) {
            //确保onready只执行一次
            doc.isReady = true;
            for (var ci; ci = fnArr.pop(); ci()) {
            }
        }

        return function (onready, win) {
            win = win || window;
            var doc = win.document;
            onready && fnArr.push(onready);
            if (doc.readyState === "complete") {
                doReady(doc);
            } else {
                doc.isReady && doReady(doc);
                if (browser.ie && browser.version != 11) {
                    (function () {
                        if (doc.isReady) return;
                        try {
                            doc.documentElement.doScroll("left");
                        } catch (error) {
                            setTimeout(arguments.callee, 0);
                            return;
                        }
                        doReady(doc);
                    })();
                    win.attachEvent('onload', function () {
                        doReady(doc)
                    });
                } else {
                    doc.addEventListener("DOMContentLoaded", function () {
                        doc.removeEventListener("DOMContentLoaded", arguments.callee, false);
                        doReady(doc);
                    }, false);
                    win.addEventListener('load', function () {
                        doReady(doc)
                    }, false);
                }
            }

        }
    }(),

    /**
     * 动态添加css样式
     * @method cssRule
     * @param { String } 节点名称
     * @grammar UE_biz.utils.cssRule('添加的样式的节点名称',['样式'，'放到哪个document上'])
     * @grammar UE_biz.utils.cssRule('body','body{background:#ccc}') => null  //给body添加背景颜色
     * @grammar UE_biz.utils.cssRule('body') =>样式的字符串  //取得key值为body的样式的内容,如果没有找到key值先关的样式将返回空，例如刚才那个背景颜色，将返回 body{background:#ccc}
     * @grammar UE_biz.utils.cssRule('body',document) => 返回指定key的样式，并且指定是哪个document
     * @grammar UE_biz.utils.cssRule('body','') =>null //清空给定的key值的背景颜色
     */
    cssRule:browser.ie && browser.version != 11 ? function (key, style, doc) {
        var indexList, index;
        if(style === undefined || style && style.nodeType && style.nodeType == 9){
            //获取样式
            doc = style && style.nodeType && style.nodeType == 9 ? style : (doc || document);
            indexList = doc.indexList || (doc.indexList = {});
            index = indexList[key];
            if(index !==  undefined){
                return doc.styleSheets[index].cssText
            }
            return undefined;
        }
        doc = doc || document;
        indexList = doc.indexList || (doc.indexList = {});
        index = indexList[key];
        //清除样式
        if(style === ''){
            if(index!== undefined){
                doc.styleSheets[index].cssText = '';
                delete indexList[key];
                return true
            }
            return false;
        }

        //添加样式
        if(index!== undefined){
            sheetStyle =  doc.styleSheets[index];
        }else{
            sheetStyle = doc.createStyleSheet('', index = doc.styleSheets.length);
            indexList[key] = index;
        }
        sheetStyle.cssText = style;
    }: function (key, style, doc) {
        var head, node;
        if(style === undefined || style && style.nodeType && style.nodeType == 9){
            //获取样式
            doc = style && style.nodeType && style.nodeType == 9 ? style : (doc || document);
            node = doc.getElementById(key);
            return node ? node.innerHTML : undefined;
        }
        doc = doc || document;
        node = doc.getElementById(key);

        //清除样式
        if(style === ''){
            if(node){
                node.parentNode.removeChild(node);
                return true
            }
            return false;
        }

        //添加样式
        if(node){
            node.innerHTML = style;
        }else{
            node = doc.createElement('style');
            node.id = key;
            node.innerHTML = style;
            doc.getElementsByTagName('head')[0].appendChild(node);
        }
    },
    sort:function(array,compareFn){
        compareFn = compareFn || function(item1, item2){ return item1.localeCompare(item2);};
        for(var i= 0,len = array.length; i<len; i++){
            for(var j = i,length = array.length; j<length; j++){
                if(compareFn(array[i], array[j]) > 0){
                    var t = array[i];
                    array[i] = array[j];
                    array[j] = t;
                }
            }
        }
        return array;
    },
    formatUrl:function (url) {
        var u = url.replace(/&&/g, '&');
        u = u.replace(/\?&/g, '?');
        u = u.replace(/&$/g, '');
        u = u.replace(/&#/g, '#');
        u = u.replace(/&+/g, '&');
        return u;
    },

    str2json : function(s){

        if (!utils.isString(s)) return null;
        if (window.JSON) {
            return JSON.parse(s);
        } else {
            return (new Function("return " + utils.trim(s || '')))();
        }

    },
    json2str : (function(){

        if (window.JSON) {

            return JSON.stringify;

        } else {

            var escapeMap = {
                "\b": '\\b',
                "\t": '\\t',
                "\n": '\\n',
                "\f": '\\f',
                "\r": '\\r',
                '"' : '\\"',
                "\\": '\\\\'
            };

            function encodeString(source) {
                if (/["\\\x00-\x1f]/.test(source)) {
                    source = source.replace(
                        /["\\\x00-\x1f]/g,
                        function (match) {
                            var c = escapeMap[match];
                            if (c) {
                                return c;
                            }
                            c = match.charCodeAt();
                            return "\\u00"
                            + Math.floor(c / 16).toString(16)
                            + (c % 16).toString(16);
                        });
                }
                return '"' + source + '"';
            }

            function encodeArray(source) {
                var result = ["["],
                    l = source.length,
                    preComma, i, item;

                for (i = 0; i < l; i++) {
                    item = source[i];

                    switch (typeof item) {
                        case "undefined":
                        case "function":
                        case "unknown":
                            break;
                        default:
                            if(preComma) {
                                result.push(',');
                            }
                            result.push(utils.json2str(item));
                            preComma = 1;
                    }
                }
                result.push("]");
                return result.join("");
            }

            function pad(source) {
                return source < 10 ? '0' + source : source;
            }

            function encodeDate(source){
                return '"' + source.getFullYear() + "-"
                + pad(source.getMonth() + 1) + "-"
                + pad(source.getDate()) + "T"
                + pad(source.getHours()) + ":"
                + pad(source.getMinutes()) + ":"
                + pad(source.getSeconds()) + '"';
            }

            return function (value) {
                switch (typeof value) {
                    case 'undefined':
                        return 'undefined';

                    case 'number':
                        return isFinite(value) ? String(value) : "null";

                    case 'string':
                        return encodeString(value);

                    case 'boolean':
                        return String(value);

                    default:
                        if (value === null) {
                            return 'null';
                        } else if (utils.isArray(value)) {
                            return encodeArray(value);
                        } else if (utils.isDate(value)) {
                            return encodeDate(value);
                        } else {
                            var result = ['{'],
                                encode = utils.json2str,
                                preComma,
                                item;

                            for (var key in value) {
                                if (Object.prototype.hasOwnProperty.call(value, key)) {
                                    item = value[key];
                                    switch (typeof item) {
                                        case 'undefined':
                                        case 'unknown':
                                        case 'function':
                                            break;
                                        default:
                                            if (preComma) {
                                                result.push(',');
                                            }
                                            preComma = 1;
                                            result.push(encode(key) + ':' + encode(item));
                                    }
                                }
                            }
                            result.push('}');
                            return result.join('');
                        }
                }
            };
        }

    })()

};

/**
 * 判断给定的对象是否是一个普通对象
 * @method isObject 
 * @param { * } object 需要判断的对象
 * @return { Boolean } 给定的对象是否是普通对象
 */
utils.each(['String', 'Function', 'Array', 'Number', 'RegExp', 'Object', 'Date'], function (v) {
    UE_biz.utils['is' + v] = function (obj) {
        return Object.prototype.toString.apply(obj) == '[object ' + v + ']';
    }
});


// core/EventBase.js
/**
 * 通过此构造器，子类可以继承EventBase获取事件监听的方法
 * @constructor
 * @example
 * ```javascript
 * UE_biz.EventBase.call(editor);
 * ```
 */
var EventBase = UE_biz.EventBase = function () {};

EventBase.prototype = {

    /**
     * 注册事件监听器
     * @method addListener
     * @param { String } types 监听的事件名称，同时监听多个事件使用空格分隔
     * @param { Function } fn 监听的事件被触发时，会执行该回调函数
     * @waining 事件被触发时，监听的函数假如返回的值恒等于true，回调函数的队列中后面的函数将不执行
     * @see UE_biz.EventBase:fireEvent(String)
     */
    addListener:function (types, listener) {
        types = utils.trim(types).split(/\s+/);
        for (var i = 0, ti; ti = types[i++];) {
            getListener(this, ti, true).push(listener);
        }
    },

    on : function(types, listener){
      return this.addListener(types,listener);
    },
    off : function(types, listener){
        return this.removeListener(types, listener)
    },
    trigger:function(){
        return this.fireEvent.apply(this,arguments);
    },
    /**
     * 移除事件监听器
     * @method removeListener
     * @param { String } types 移除的事件名称，同时移除多个事件使用空格分隔
     * @param { Function } fn 移除监听事件的函数引用
     * @example
     * ```javascript
     * //changeCallback为方法体
     * editor.removeListener("selectionchange",changeCallback);
     * ```
     */
    removeListener:function (types, listener) {
        types = utils.trim(types).split(/\s+/);
        for (var i = 0, ti; ti = types[i++];) {
            utils.removeItem(getListener(this, ti) || [], listener);
        }
    },

    /**
     * 触发事件
     * @method fireEvent
     * @param { String } types 触发的事件名称，同时触发多个事件使用空格分隔
     * @param { *... } options 可选参数，可以传入一个或多个参数，会传给事件触发的回调函数
     * @return { * } 返回触发事件的队列中，最后执行的回调函数的返回值
     */
    fireEvent:function () {
        var types = arguments[0];
        types = utils.trim(types).split(' ');
        for (var i = 0, ti; ti = types[i++];) {
            var listeners = getListener(this, ti),
                r, t, k;
            if (listeners) {
                k = listeners.length;
                while (k--) {
                    if(!listeners[k])continue;
                    t = listeners[k].apply(this, arguments);
                    if(t === true){
                        return t;
                    }
                    if (t !== undefined) {
                        r = t;
                    }
                }
            }
            if (t = this['on' + ti.toLowerCase()]) {
                r = t.apply(this, arguments);
            }
        }
        return r;
    }
};
/**
 * 获得对象所拥有监听类型的所有监听器
 * @unfile
 * @module UE_biz
 * @since 1.2.6.1
 * @method getListener
 * @public
 * @param { Object } obj  查询监听器的对象
 * @param { String } type 事件类型
 * @param { Boolean } force  为true且当前所有type类型的侦听器不存在时，创建一个空监听器数组
 * @return { Array } 监听器数组
 */
function getListener(obj, type, force) {
    var allListeners;
    type = type.toLowerCase();
    return ( ( allListeners = ( obj.__allListeners || force && ( obj.__allListeners = {} ) ) )
        && ( allListeners[type] || force && ( allListeners[type] = [] ) ) );
}



// core/dtd.js
///import editor.js
///import core/dom/dom.js
///import core/utils.js
/**
 * dtd html语义化的体现类
 * @constructor
 * @namespace dtd
 */
var dtd = dom.dtd = (function() {
    function _( s ) {
        for (var k in s) {
            s[k.toUpperCase()] = s[k];
        }
        return s;
    }
    var X = utils.extend2;
    var A = _({isindex:1,fieldset:1}),
        B = _({input:1,button:1,select:1,textarea:1,label:1}),
        C = X( _({a:1}), B ),
        D = X( {iframe:1}, C ),
        E = _({hr:1,ul:1,menu:1,div:1,blockquote:1,noscript:1,table:1,center:1,address:1,dir:1,pre:1,h5:1,dl:1,h4:1,noframes:1,h6:1,ol:1,h1:1,h3:1,h2:1}),
        F = _({ins:1,del:1,script:1,style:1}),
        G = X( _({b:1,acronym:1,bdo:1,'var':1,'#':1,abbr:1,code:1,br:1,i:1,cite:1,kbd:1,u:1,strike:1,s:1,tt:1,strong:1,q:1,samp:1,em:1,dfn:1,span:1}), F ),
        H = X( _({sub:1,img:1,embed:1,object:1,sup:1,basefont:1,map:1,applet:1,font:1,big:1,small:1}), G ),
        I = X( _({p:1}), H ),
        J = X( _({iframe:1}), H, B ),
        K = _({img:1,embed:1,noscript:1,br:1,kbd:1,center:1,button:1,basefont:1,h5:1,h4:1,samp:1,h6:1,ol:1,h1:1,h3:1,h2:1,form:1,font:1,'#':1,select:1,menu:1,ins:1,abbr:1,label:1,code:1,table:1,script:1,cite:1,input:1,iframe:1,strong:1,textarea:1,noframes:1,big:1,small:1,span:1,hr:1,sub:1,bdo:1,'var':1,div:1,object:1,sup:1,strike:1,dir:1,map:1,dl:1,applet:1,del:1,isindex:1,fieldset:1,ul:1,b:1,acronym:1,a:1,blockquote:1,i:1,u:1,s:1,tt:1,address:1,q:1,pre:1,p:1,em:1,dfn:1}),

        L = X( _({a:0}), J ),//a不能被切开，所以把他
        M = _({tr:1}),
        N = _({'#':1}),
        O = X( _({param:1}), K ),
        P = X( _({form:1}), A, D, E, I ),
        Q = _({li:1,ol:1,ul:1}),
        R = _({style:1,script:1}),
        S = _({base:1,link:1,meta:1,title:1}),
        T = X( S, R ),
        U = _({head:1,body:1}),
        V = _({html:1});

    var block = _({address:1,blockquote:1,center:1,dir:1,div:1,dl:1,fieldset:1,form:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,hr:1,isindex:1,menu:1,noframes:1,ol:1,p:1,pre:1,table:1,ul:1}),

        empty =  _({area:1,base:1,basefont:1,br:1,col:1,command:1,dialog:1,embed:1,hr:1,img:1,input:1,isindex:1,keygen:1,link:1,meta:1,param:1,source:1,track:1,wbr:1});

    return  _({

        // $ 表示自定的属性

        // body外的元素列表.
        $nonBodyContent: X( V, U, S ),

        //块结构元素列表
        $block : block,

        //内联元素列表
        $inline : L,

        $inlineWithA : X(_({a:1}),L),

        $body : X( _({script:1,style:1}), block ),

        $cdata : _({script:1,style:1}),

        //自闭和元素
        $empty : empty,

        //不是自闭合，但不能让range选中里边
        $nonChild : _({iframe:1,textarea:1}),
        //列表元素列表
        $listItem : _({dd:1,dt:1,li:1}),

        //列表根元素列表
        $list: _({ul:1,ol:1,dl:1}),

        //不能认为是空的元素
        $isNotEmpty : _({table:1,ul:1,ol:1,dl:1,iframe:1,area:1,base:1,col:1,hr:1,img:1,embed:1,input:1,link:1,meta:1,param:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1}),

        //如果没有子节点就可以删除的元素列表，像span,a
        $removeEmpty : _({a:1,abbr:1,acronym:1,address:1,b:1,bdo:1,big:1,cite:1,code:1,del:1,dfn:1,em:1,font:1,i:1,ins:1,label:1,kbd:1,q:1,s:1,samp:1,small:1,span:1,strike:1,strong:1,sub:1,sup:1,tt:1,u:1,'var':1}),

        $removeEmptyBlock : _({'p':1,'div':1}),

        //在table元素里的元素列表
        $tableContent : _({caption:1,col:1,colgroup:1,tbody:1,td:1,tfoot:1,th:1,thead:1,tr:1,table:1}),
        //不转换的标签
        $notTransContent : _({pre:1,script:1,style:1,textarea:1}),
        html: U,
        head: T,
        style: N,
        script: N,
        body: P,
        base: {},
        link: {},
        meta: {},
        title: N,
        col : {},
        tr : _({td:1,th:1}),
        img : {},
        embed: {},
        colgroup : _({thead:1,col:1,tbody:1,tr:1,tfoot:1}),
        noscript : P,
        td : P,
        br : {},
        th : P,
        center : P,
        kbd : L,
        button : X( I, E ),
        basefont : {},
        h5 : L,
        h4 : L,
        samp : L,
        h6 : L,
        ol : Q,
        h1 : L,
        h3 : L,
        option : N,
        h2 : L,
        form : X( A, D, E, I ),
        select : _({optgroup:1,option:1}),
        font : L,
        ins : L,
        menu : Q,
        abbr : L,
        label : L,
        table : _({thead:1,col:1,tbody:1,tr:1,colgroup:1,caption:1,tfoot:1}),
        code : L,
        tfoot : M,
        cite : L,
        li : P,
        input : {},
        iframe : P,
        strong : L,
        textarea : N,
        noframes : P,
        big : L,
        small : L,
        //trace:
        span :_({'#':1,br:1,b:1,strong:1,u:1,i:1,em:1,sub:1,sup:1,strike:1,span:1}),
        hr : L,
        dt : L,
        sub : L,
        optgroup : _({option:1}),
        param : {},
        bdo : L,
        'var' : L,
        div : P,
        object : O,
        sup : L,
        dd : P,
        strike : L,
        area : {},
        dir : Q,
        map : X( _({area:1,form:1,p:1}), A, F, E ),
        applet : O,
        dl : _({dt:1,dd:1}),
        del : L,
        isindex : {},
        fieldset : X( _({legend:1}), K ),
        thead : M,
        ul : Q,
        acronym : L,
        b : L,
        a : X( _({a:1}), J ),
        blockquote :X(_({td:1,tr:1,tbody:1,li:1}),P),
        caption : L,
        i : L,
        u : L,
        tbody : M,
        s : L,
        address : X( D, I ),
        tt : L,
        legend : L,
        q : L,
        pre : X( G, C ),
        p : X(_({'a':1}),L),
        em :L,
        dfn : L
    });
})();


// core/domUtils.js
/**
 * Dom操作工具包
 * @unfile
 * @module UE_biz.dom.domUtils
 */
function getDomNode(node, start, ltr, startFromChild, fn, guard) {
    var tmpNode = startFromChild && node[start],
        parent;
    !tmpNode && (tmpNode = node[ltr]);
    while (!tmpNode && (parent = (parent || node).parentNode)) {
        if (parent.tagName == 'BODY' || guard && !guard(parent)) {
            return null;
        }
        tmpNode = parent[ltr];
    }
    if (tmpNode && fn && !fn(tmpNode)) {
        return  getDomNode(tmpNode, start, ltr, false, fn);
    }
    return tmpNode;
}
var attrFix = ie && browser.version < 9 ? {
        tabindex:"tabIndex",
        readonly:"readOnly",
        "for":"htmlFor",
        "class":"className",
        maxlength:"maxLength",
        cellspacing:"cellSpacing",
        cellpadding:"cellPadding",
        rowspan:"rowSpan",
        colspan:"colSpan",
        usemap:"useMap",
        frameborder:"frameBorder"
    } : {
        tabindex:"tabIndex",
        readonly:"readOnly"
    },
    styleBlock = utils.listToMap([
        '-webkit-box', '-moz-box', 'block' ,
        'list-item' , 'table' , 'table-row-group' ,
        'table-header-group', 'table-footer-group' ,
        'table-row' , 'table-column-group' , 'table-column' ,
        'table-cell' , 'table-caption'
    ]);
var domUtils = dom.domUtils = {
    //节点常量
    NODE_ELEMENT:1,
    NODE_DOCUMENT:9,
    NODE_TEXT:3,
    NODE_COMMENT:8,
    NODE_DOCUMENT_FRAGMENT:11,

    //位置关系
    POSITION_IDENTICAL:0,
    POSITION_DISCONNECTED:1,
    POSITION_FOLLOWING:2,
    POSITION_PRECEDING:4,
    POSITION_IS_CONTAINED:8,
    POSITION_CONTAINS:16,
    //ie6使用其他的会有一段空白出现
    fillChar:ie && browser.version == '6' ? '\ufeff' : '\u200B',
    //-------------------------Node部分--------------------------------
    keys:{
        /*Backspace*/ 8:1, /*Delete*/ 46:1,
        /*Shift*/ 16:1, /*Ctrl*/ 17:1, /*Alt*/ 18:1,
        37:1, 38:1, 39:1, 40:1,
        13:1 /*enter*/
    },
    /**
     * 获取节点A相对于节点B的位置关系
     * @method getPosition
     * @param { Node } nodeA 需要查询位置关系的节点A
     * @param { Node } nodeB 需要查询位置关系的节点B
     * @return { Number } 节点A与节点B的关系
     */
    getPosition:function (nodeA, nodeB) {
        // 如果两个节点是同一个节点
        if (nodeA === nodeB) {
            // domUtils.POSITION_IDENTICAL
            return 0;
        }
        var node,
            parentsA = [nodeA],
            parentsB = [nodeB];
        node = nodeA;
        while (node = node.parentNode) {
            // 如果nodeB是nodeA的祖先节点
            if (node === nodeB) {
                // domUtils.POSITION_IS_CONTAINED + domUtils.POSITION_FOLLOWING
                return 10;
            }
            parentsA.push(node);
        }
        node = nodeB;
        while (node = node.parentNode) {
            // 如果nodeA是nodeB的祖先节点
            if (node === nodeA) {
                // domUtils.POSITION_CONTAINS + domUtils.POSITION_PRECEDING
                return 20;
            }
            parentsB.push(node);
        }
        parentsA.reverse();
        parentsB.reverse();
        if (parentsA[0] !== parentsB[0]) {
            // domUtils.POSITION_DISCONNECTED
            return 1;
        }
        var i = -1;
        while (i++, parentsA[i] === parentsB[i]) {
        }
        nodeA = parentsA[i];
        nodeB = parentsB[i];
        while (nodeA = nodeA.nextSibling) {
            if (nodeA === nodeB) {
                // domUtils.POSITION_PRECEDING
                return 4
            }
        }
        // domUtils.POSITION_FOLLOWING
        return  2;
    },

    /**
     * 检测节点node在父节点中的索引位置， 根据给定的mergeTextNode参数决定是否要合并多个连续的文本节点为一个节点
     * @method getNodeIndex
     * @param { Node } node 需要检测的节点对象
     * @param { Boolean } mergeTextNode 是否合并多个连续的文本节点为一个节点
     * @return { Number } 该节点在父节点中的位置
     */
    getNodeIndex:function (node, ignoreTextNode) {
        var preNode = node,
            i = 0;
        while (preNode = preNode.previousSibling) {
            if (ignoreTextNode && preNode.nodeType == 3) {
                if(preNode.nodeType != preNode.nextSibling.nodeType ){
                    i++;
                }
                continue;
            }
            i++;
        }
        return i;
    },

    /**
     * 检测节点node是否在给定的document对象上
     * @method inDoc
     * @param { Node } node 需要检测的节点对象
     * @param { DomDocument } doc 需要检测的document对象
     * @return { Boolean } 该节点node是否在给定的document的dom树上
     */
    inDoc:function (node, doc) {
        return domUtils.getPosition(node, doc) == 10;
    },

    /**
     * 根据给定的过滤规则filterFn， 查找符合该过滤规则的node节点的第一个祖先节点，
     * 如果includeSelf的值为true，则查找的起点是给定的节点node， 否则， 起点是node的父节点
     * @method findParent
     * @param { Node } node 需要查找的节点
     * @param { Function } filterFn 自定义的过滤方法。
     * @param { Boolean } includeSelf 查找过程是否包含自身
     * @warning 查找的终点是到body节点为止
     * @remind 自定义的过滤方法filterFn接受一个Node对象作为参数， 该对象代表当前执行检测的祖先节点。 如果该
     *          节点满足过滤条件， 则要求返回true， 这时将直接返回该节点作为findParent()的结果， 否则， 请返回false。
     * @remind 如果includeSelf为true， 则过滤器第一次执行时的参数会是节点本身。
     *          反之， 过滤器第一次执行时的参数将是该节点的父节点。
     * @return { Node | Null } 如果找到符合过滤条件的节点， 就返回该节点， 否则返回NULL
     */
    findParent:function (node, filterFn, includeSelf) {
        if (node && !domUtils.isBody(node)) {
            node = includeSelf ? node : node.parentNode;
            while (node) {
                if (!filterFn || filterFn(node) || domUtils.isBody(node)) {
                    return filterFn && !filterFn(node) && domUtils.isBody(node) ? null : node;
                }
                node = node.parentNode;
            }
        }
        return null;
    },

    /**
     * 查找node的节点名为tagName的祖先节点， 如果includeSelf的值为true，则查找的起点是给定的节点node，
     * 否则， 起点是node的父节点。
     * @method findParentByTagName
     * @param { Node } node 需要查找的节点对象
     * @param { Array } tagNames 需要查找的父节点的名称数组
     * @param { Boolean } includeSelf 查找过程是否包含node节点自身
     * @warning 查找的终点是到body节点为止
     * @return { Node | NULL } 如果找到符合条件的节点， 则返回该节点， 否则返回NULL
     */
    findParentByTagName:function (node, tagNames, includeSelf, excludeFn) {
        tagNames = utils.listToMap(utils.isArray(tagNames) ? tagNames : [tagNames]);
        return domUtils.findParent(node, function (node) {
            return tagNames[node.tagName] && !(excludeFn && excludeFn(node));
        }, includeSelf);
    },

    /**
     * 查找节点node的祖先节点集合， 如果includeSelf的值为true，
     * 则返回的结果集中允许出现当前给定的节点， 否则， 该节点不会出现在其结果集中。
     * @method findParents
     * @param { Node } node 需要查找的节点对象
     * @param { Boolean } includeSelf 查找的结果中是否允许包含当前查找的节点对象
     * @return { Array } 给定节点的祖先节点数组
     */
    findParents:function (node, includeSelf, filterFn, closerFirst) {
        var parents = includeSelf && ( filterFn && filterFn(node) || !filterFn ) ? [node] : [];
        while (node = domUtils.findParent(node, filterFn)) {
            parents.push(node);
        }
        return closerFirst ? parents : parents.reverse();
    },

    /**
     * 在节点node后面插入新节点newNode
     * @method insertAfter
     * @param { Node } node 目标节点
     * @param { Node } newNode 新插入的节点， 该节点将置于目标节点之后
     * @return { Node } 新插入的节点
     */
    insertAfter:function (node, newNode) {
        return node.nextSibling ? node.parentNode.insertBefore(newNode, node.nextSibling):
            node.parentNode.appendChild(newNode);
    },


    /**
     * 删除节点node，并根据keepChildren的值决定是否保留子节点
     * @method remove
     * @param { Node } node 需要删除的节点对象
     * @param { Boolean } keepChildren 是否需要保留子节点
     * @return { Node } 返回刚删除的节点对象
     */
    remove:function (node, keepChildren) {
        var parent = node.parentNode,
            child;
        if (parent) {
            if (keepChildren && node.hasChildNodes()) {
                while (child = node.firstChild) {
                    parent.insertBefore(child, node);
                }
            }
            parent.removeChild(node);
        }
        return node;
    },

    /**
     * 取得node节点的下一个兄弟节点， 如果startFromChild的值为ture，则先获取其子节点，
     * 如果有子节点则直接返回第一个子节点；如果没有子节点或者startFromChild的值为false，
     * 则执行<a href="#UE_biz.dom.domUtils.getNextDomNode(Node)">getNextDomNode(Node node)</a>的查找过程。
     * @method getNextDomNode
     * @param { Node } node 需要获取其后的兄弟节点的节点对象
     * @param { Boolean } startFromChild 查找过程是否从其子节点开始
     * @return { Node | NULL } 如果找满足条件的节点， 则返回该节点， 否则返回NULL
     * @see UE_biz.dom.domUtils.getNextDomNode(Node)
     */
    getNextDomNode:function (node, startFromChild, filterFn, guard) {
        return getDomNode(node, 'firstChild', 'nextSibling', startFromChild, filterFn, guard);
    },
    getPreDomNode:function (node, startFromChild, filterFn, guard) {
        return getDomNode(node, 'lastChild', 'previousSibling', startFromChild, filterFn, guard);
    },
    /**
     * 检测节点node是否属是UEditor定义的bookmark节点
     * @method isBookmarkNode
     * @private
     * @param { Node } node 需要检测的节点对象
     * @return { Boolean } 是否是bookmark节
     */
    isBookmarkNode:function (node) {
        return node.nodeType == 1 && node.id && /^_baidu_bookmark_/i.test(node.id);
    },
    /**
     * 获取节点node所属的window对象
     * @method  getWindow
     * @param { Node } node 节点对象
     * @return { Window } 当前节点所属的window对象
     */
    getWindow:function (node) {
        var doc = node.ownerDocument || node;
        return doc.defaultView || doc.parentWindow;
    },
    /**
     * 获取离nodeA与nodeB最近的公共的祖先节点
     * @method  getCommonAncestor
     * @param { Node } nodeA 第一个节点
     * @param { Node } nodeB 第二个节点
     * @remind 如果给定的两个节点是同一个节点， 将直接返回该节点。
     * @return { Node | NULL } 如果未找到公共节点， 返回NULL， 否则返回最近的公共祖先节点。
     */
    getCommonAncestor:function (nodeA, nodeB) {
        if (nodeA === nodeB)
            return nodeA;
        var parentsA = [nodeA] , parentsB = [nodeB], parent = nodeA, i = -1;
        while (parent = parent.parentNode) {
            if (parent === nodeB) {
                return parent;
            }
            parentsA.push(parent);
        }
        parent = nodeB;
        while (parent = parent.parentNode) {
            if (parent === nodeA)
                return parent;
            parentsB.push(parent);
        }
        parentsA.reverse();
        parentsB.reverse();
        while (i++, parentsA[i] === parentsB[i]) {
        }
        return i == 0 ? null : parentsA[i - 1];

    },

    /**
     * 将一个文本节点textNode拆分成两个文本节点，offset指定拆分位置
     * @method split
     * @param { Node } textNode 需要拆分的文本节点对象
     * @param { int } offset 需要拆分的位置， 位置计算从0开始
     * @return { Node } 拆分后形成的新节点
     */
    split:function (node, offset) {
        var doc = node.ownerDocument;
        if (browser.ie && offset == node.nodeValue.length) {
            var next = doc.createTextNode('');
            return domUtils.insertAfter(node, next);
        }
        var retval = node.splitText(offset);
        //ie8下splitText不会跟新childNodes,我们手动触发他的更新
        if (browser.ie8) {
            var tmpNode = doc.createTextNode('');
            domUtils.insertAfter(retval, tmpNode);
            domUtils.remove(tmpNode);
        }
        return retval;
    },

    /**
     * 检测文本节点textNode是否为空节点（包括空格、换行、占位符等字符）
     * @method  isWhitespace
     * @param { Node } node 需要检测的节点对象
     * @return { Boolean } 检测的节点是否为空
     */
    isWhitespace:function (node) {
        return !new RegExp('[^ \t\n\r' + domUtils.fillChar + ']').test(node.nodeValue);
    },
    /**
     * 获取元素element相对于viewport的位置坐标
     * @method getXY
     * @param { Node } element 需要计算位置的节点对象
     * @return { Object } 返回形如{x:left,y:top}的一个key-value映射对象， 其中键x代表水平偏移距离，
     *                          y代表垂直偏移距离。
     */
    getXY:function (element) {
        var x = 0, y = 0;
        while (element.offsetParent) {
            y += element.offsetTop;
            x += element.offsetLeft;
            element = element.offsetParent;
        }
        return { 'x':x, 'y':y};
    },

    /**
     * 为元素element绑定原生DOM事件，type为事件类型，handler为处理函数
     * @method on
     * @param { Node } element 需要绑定事件的节点对象
     * @param { Array } type 绑定的事件类型数组
     * @param { Function } handler 事件处理器
     * @example
     * ```javascript
     * UE_biz.dom.domUtils.on(document.body,["click","mousedown"],function(evt){
     *     //evt为事件对象，this为被点击元素对象
     * });
     * ```
     */
    on:function (element, type, handler) {

        var types = utils.isArray(type) ? type : utils.trim(type).split(/\s+/),
            k = types.length;
        if (k) while (k--) {
            type = types[k];
            if (element.addEventListener) {
                element.addEventListener(type, handler, false);
            } else {
                if (!handler._d) {
                    handler._d = {
                        els : []
                    };
                }
                var key = type + handler.toString(),index = utils.indexOf(handler._d.els,element);
                if (!handler._d[key] || index == -1) {
                    if(index == -1){
                        handler._d.els.push(element);
                    }
                    if(!handler._d[key]){
                        handler._d[key] = function (evt) {
                            return handler.call(evt.srcElement, evt || window.event);
                        };
                    }


                    element.attachEvent('on' + type, handler._d[key]);
                }
            }
        }
        element = null;
    },

    /**
     * 解除DOM事件绑定
     * @method un
     * @param { Node } element 需要解除事件绑定的节点对象
     * @param { Array } type 需要接触绑定的事件类型数组
     * @param { Function } handler 对应的事件处理器
     * @example
     * ```javascript
     * UE_biz.dom.domUtils.un(document.body, ["click","mousedown"],function(evt){
     *     //evt为事件对象，this为被点击元素对象
     * });
     * ```
     */
    un:function (element, type, handler) {
        var types = utils.isArray(type) ? type : utils.trim(type).split(/\s+/),
            k = types.length;
        if (k) while (k--) {
            type = types[k];
            if (element.removeEventListener) {
                element.removeEventListener(type, handler, false);
            } else {
                var key = type + handler.toString();
                try{
                    element.detachEvent('on' + type, handler._d ? handler._d[key] : handler);
                }catch(e){}
                if (handler._d && handler._d[key]) {
                    var index = utils.indexOf(handler._d.els,element);
                    if(index!=-1){
                        handler._d.els.splice(index,1);
                    }
                    handler._d.els.length == 0 && delete handler._d[key];
                }
            }
        }
    },

    /**
     * 比较节点nodeA与节点nodeB是否具有相同的标签名、属性名以及属性值
     * @method  isSameElement
     * @param { Node } nodeA 需要比较的节点
     * @param { Node } nodeB 需要比较的节点
     * @return { Boolean } 两个节点是否具有相同的标签名、属性名以及属性值
     */
    isSameElement:function (nodeA, nodeB) {
        if (nodeA.tagName != nodeB.tagName) {
            return false;
        }
        var thisAttrs = nodeA.attributes,
            otherAttrs = nodeB.attributes;
        if (!ie && thisAttrs.length != otherAttrs.length) {
            return false;
        }
        var attrA, attrB, al = 0, bl = 0;
        for (var i = 0; attrA = thisAttrs[i++];) {
            if (attrA.nodeName == 'style') {
                if (attrA.specified) {
                    al++;
                }
                if (domUtils.isSameStyle(nodeA, nodeB)) {
                    continue;
                } else {
                    return false;
                }
            }
            if (ie) {
                if (attrA.specified) {
                    al++;
                    attrB = otherAttrs.getNamedItem(attrA.nodeName);
                } else {
                    continue;
                }
            } else {
                attrB = nodeB.attributes[attrA.nodeName];
            }
            if (!attrB.specified || attrA.nodeValue != attrB.nodeValue) {
                return false;
            }
        }
        // 有可能attrB的属性包含了attrA的属性之外还有自己的属性
        if (ie) {
            for (i = 0; attrB = otherAttrs[i++];) {
                if (attrB.specified) {
                    bl++;
                }
            }
            if (al != bl) {
                return false;
            }
        }
        return true;
    },

    /**
     * 判断节点nodeA与节点nodeB的元素的style属性是否一致
     * @method isSameStyle
     * @param { Node } nodeA 需要比较的节点
     * @param { Node } nodeB 需要比较的节点
     * @return { Boolean } 两个节点是否具有相同的style属性值
     */
    isSameStyle:function (nodeA, nodeB) {
        var styleA = nodeA.style.cssText.replace(/( ?; ?)/g, ';').replace(/( ?: ?)/g, ':'),
            styleB = nodeB.style.cssText.replace(/( ?; ?)/g, ';').replace(/( ?: ?)/g, ':');
        if (browser.opera) {
            styleA = nodeA.style;
            styleB = nodeB.style;
            if (styleA.length != styleB.length)
                return false;
            for (var p in styleA) {
                if (/^(\d+|csstext)$/i.test(p)) {
                    continue;
                }
                if (styleA[p] != styleB[p]) {
                    return false;
                }
            }
            return true;
        }
        if (!styleA || !styleB) {
            return styleA == styleB;
        }
        styleA = styleA.split(';');
        styleB = styleB.split(';');
        if (styleA.length != styleB.length) {
            return false;
        }
        for (var i = 0, ci; ci = styleA[i++];) {
            if (utils.indexOf(styleB, ci) == -1) {
                return false;
            }
        }
        return true;
    },
    /**
     * 检查节点node是否为block元素
     * @method isBlockElm
     * @param { Node } node 需要检测的节点对象
     * @return { Boolean } 是否是block元素节点
     * @warning 该方法的判断规则如下： 如果该元素原本是block元素， 则不论该元素当前的css样式是什么都会返回true；
     *          否则，检测该元素的css样式， 如果该元素当前是block元素， 则返回true。 其余情况下都返回false。
     */
    isBlockElm:function (node) {
        return node.nodeType == 1 && (dtd.$block[node.tagName] || styleBlock[domUtils.getComputedStyle(node, 'display')]) && !dtd.$nonChild[node.tagName];
    },
    /**
     * 检测node节点是否为body节点
     * @method isBody
     * @param { Element } node 需要检测的dom元素
     * @return { Boolean } 给定的元素是否是body元素
     */
    isBody:function (node) {
        return  node && node.nodeType == 1 && node.tagName.toLowerCase() == 'body';
    },
    /**
     * 以node节点为分界，将该节点的指定祖先节点parent拆分成两个独立的节点，
     * 拆分形成的两个节点之间是node节点
     * @method breakParent
     * @param { Node } node 作为分界的节点对象
     * @param { Node } parent 该节点必须是node节点的祖先节点， 且是block节点。
     * @return { Node } 给定的node分界节点
     */
    breakParent:function (node, parent) {
        var tmpNode,
            parentClone = node,
            clone = node,
            leftNodes,
            rightNodes;
        do {
            parentClone = parentClone.parentNode;
            if (leftNodes) {
                tmpNode = parentClone.cloneNode(false);
                tmpNode.appendChild(leftNodes);
                leftNodes = tmpNode;
                tmpNode = parentClone.cloneNode(false);
                tmpNode.appendChild(rightNodes);
                rightNodes = tmpNode;
            } else {
                leftNodes = parentClone.cloneNode(false);
                rightNodes = leftNodes.cloneNode(false);
            }
            while (tmpNode = clone.previousSibling) {
                leftNodes.insertBefore(tmpNode, leftNodes.firstChild);
            }
            while (tmpNode = clone.nextSibling) {
                rightNodes.appendChild(tmpNode);
            }
            clone = parentClone;
        } while (parent !== parentClone);
        tmpNode = parent.parentNode;
        tmpNode.insertBefore(leftNodes, parent);
        tmpNode.insertBefore(rightNodes, parent);
        tmpNode.insertBefore(node, rightNodes);
        domUtils.remove(parent);
        return node;
    },
    /**
     * 检查节点node是否是空inline节点
     * @method  isEmptyInlineElement
     * @param { Node } node 需要检测的节点对象
     * @return { Number }  如果给定的节点是空的inline节点， 则返回1, 否则返回0。
     * @example
     * ```html
     * <b><i></i></b> => 1
     * <b><i></i><u></u></b> => 1
     * <b></b> => 1
     * <b>xx<i></i></b> => 0
     * ```
     */
    isEmptyInlineElement:function (node) {
        if (node.nodeType != 1 || !dtd.$removeEmpty[ node.tagName ]) {
            return 0;
        }
        node = node.firstChild;
        while (node) {
            //如果是创建的bookmark就跳过
            if (domUtils.isBookmarkNode(node)) {
                return 0;
            }
            if (node.nodeType == 1 && !domUtils.isEmptyInlineElement(node) ||
                node.nodeType == 3 && !domUtils.isWhitespace(node)
                ) {
                return 0;
            }
            node = node.nextSibling;
        }
        return 1;

    },

    /**
     * 删除node节点下首尾两端的空白文本子节点
     * @method trimWhiteTextNode
     * @param { Element } node 需要执行删除操作的元素对象
     */
    trimWhiteTextNode:function (node) {
        function remove(dir) {
            var child;
            while ((child = node[dir]) && child.nodeType == 3 && domUtils.isWhitespace(child)) {
                node.removeChild(child);
            }
        }
        remove('firstChild');
        remove('lastChild');
    },

    /**
     * 原生方法getElementsByTagName的封装
     * @method getElementsByTagName
     * @param { Node } node 目标节点对象
     * @param { String } tagName 需要查找的节点的tagName， 多个tagName以空格分割
     * @return { Array } 符合条件的节点集合
     */
    getElementsByTagName:function (node, name,filter) {
        if(filter && utils.isString(filter)){
           var className = filter;
           filter =  function(node){return domUtils.hasClass(node,className)}
        }
        name = utils.trim(name).replace(/[ ]{2,}/g,' ').split(' ');
        var arr = [];
        for(var n = 0,ni;ni=name[n++];){
            var list = node.getElementsByTagName(ni);
            for (var i = 0, ci; ci = list[i++];) {
                if(!filter || filter(ci))
                    arr.push(ci);
            }
        }

        return arr;
    },

    /**
     * 合并节点node的左右兄弟节点，可以根据给定的条件选择是否忽略合并左右节点。
     * @method mergeSibling
     * @param { Element } node 需要合并的目标节点
     * @param { Boolean } ignorePre 是否忽略合并左节点
     * @param { Boolean } ignoreNext 是否忽略合并右节点
     * @remind 如果同时忽略左右节点， 则该操作什么也不会做
     */
    mergeSibling:function (node, ignorePre, ignoreNext) {
        function merge(rtl, start, node) {
            var next;
            if ((next = node[rtl]) && !domUtils.isBookmarkNode(next) && next.nodeType == 1 && domUtils.isSameElement(node, next)) {
                while (next.firstChild) {
                    if (start == 'firstChild') {
                        node.insertBefore(next.lastChild, node.firstChild);
                    } else {
                        node.appendChild(next.firstChild);
                    }
                }
                domUtils.remove(next);
            }
        }
        !ignorePre && merge('previousSibling', 'firstChild', node);
        !ignoreNext && merge('nextSibling', 'lastChild', node);
    },

    /**
     * 设置节点node及其子节点不会被选中
     * @method unSelectable
     * @param { Element } node 需要执行操作的dom元素
     * @remind 执行该操作后的节点， 将不能被鼠标选中
     * @example
     * ```javascript
     * UE_biz.dom.domUtils.unSelectable( document.body );
     * ```
     */
    unSelectable:ie && browser.ie9below || browser.opera ? function (node) {
        //for ie9
        node.onselectstart = function () {
            return false;
        };
        node.onclick = node.onkeyup = node.onkeydown = function () {
            return false;
        };
        node.unselectable = 'on';
        node.setAttribute("unselectable", "on");
        for (var i = 0, ci; ci = node.all[i++];) {
            switch (ci.tagName.toLowerCase()) {
                case 'iframe' :
                case 'textarea' :
                case 'input' :
                case 'select' :
                    break;
                default :
                    ci.unselectable = 'on';
                    node.setAttribute("unselectable", "on");
            }
        }
    } : function (node) {
        node.style.MozUserSelect =
            node.style.webkitUserSelect =
                node.style.msUserSelect =
                    node.style.KhtmlUserSelect = 'none';
    },

    /**
     * 删除节点node上的指定属性名称的属性
     * @method  removeAttributes
     * @param { Node } node 需要删除属性的节点对象
     * @param { Array } attrNames 需要删除的属性名数组
     */
    removeAttributes:function (node, attrNames) {
        attrNames = utils.isArray(attrNames) ? attrNames : utils.trim(attrNames).replace(/[ ]{2,}/g,' ').split(' ');
        for (var i = 0, ci; ci = attrNames[i++];) {
            ci = attrFix[ci] || ci;
            switch (ci) {
                case 'className':
                    node[ci] = '';
                    break;
                case 'style':
                    node.style.cssText = '';
                    var val = node.getAttributeNode('style');
                    !browser.ie && val && node.removeAttributeNode(val);
            }
            node.removeAttribute(ci);
        }
    },
    /**
     * 在doc下创建一个标签名为tag，属性为attrs的元素
     * @method createElement
     * @param { DomDocument } doc 新创建的元素属于该document节点创建
     * @param { String } tagName 需要创建的元素的标签名
     * @param { Object } attrs 新创建的元素的属性key-value集合
     * @return { Element } 新创建的元素对象
     */
    createElement:function (doc, tag, attrs) {
        return domUtils.setAttributes(doc.createElement(tag), attrs)
    },
    /**
     * 为节点node添加属性attrs，attrs为属性键值对
     * @method setAttributes
     * @param { Element } node 需要设置属性的元素对象
     * @param { Object } attrs 需要设置的属性名-值对
     * @return { Element } 设置属性的元素对象
     */
    setAttributes:function (node, attrs) {
        for (var attr in attrs) {
            if(attrs.hasOwnProperty(attr)){
                var value = attrs[attr];
                switch (attr) {
                    case 'class':
                        //ie下要这样赋值，setAttribute不起作用
                        node.className = value;
                        break;
                    case 'style' :
                        node.style.cssText = node.style.cssText + ";" + value;
                        break;
                    case 'innerHTML':
                        node[attr] = value;
                        break;
                    case 'value':
                        node.value = value;
                        break;
                    default:
                        node.setAttribute(attrFix[attr] || attr, value);
                }
            }
        }
        return node;
    },

    /**
     * 获取元素element经过计算后的样式值
     * @method getComputedStyle
     * @param { Element } element 需要获取样式的元素对象
     * @param { String } styleName 需要获取的样式名
     * @return { String } 获取到的样式值
     */
    getComputedStyle:function (element, styleName) {
        //一下的属性单独处理
        var pros = 'width height top left';

        if(pros.indexOf(styleName) > -1){
            return element['offset' + styleName.replace(/^\w/,function(s){return s.toUpperCase()})] + 'px';
        }
        //忽略文本节点
        if (element.nodeType == 3) {
            element = element.parentNode;
        }
        //ie下font-size若body下定义了font-size，则从currentStyle里会取到这个font-size. 取不到实际值，故此修改.
        if (browser.ie && browser.version < 9 && styleName == 'font-size' && !element.style.fontSize &&
            !dtd.$empty[element.tagName] && !dtd.$nonChild[element.tagName]) {
            var span = element.ownerDocument.createElement('span');
            span.style.cssText = 'padding:0;border:0;font-family:simsun;';
            span.innerHTML = '.';
            element.appendChild(span);
            var result = span.offsetHeight;
            element.removeChild(span);
            span = null;
            return result + 'px';
        }
        try {
            var value = domUtils.getStyle(element, styleName) ||
                (window.getComputedStyle ? domUtils.getWindow(element).getComputedStyle(element, '').getPropertyValue(styleName) :
                    ( element.currentStyle || element.style )[utils.cssStyleToDomStyle(styleName)]);

        } catch (e) {
            return "";
        }
        return utils.transUnitToPx(utils.fixColor(styleName, value));
    },

    /**
     * 删除元素element指定的className
     * @method removeClasses
     * @param { Element } ele 需要删除class的元素节点
     * @param { Array } classNames 需要删除的className数组
     */
    removeClasses:function (elm, classNames) {
        classNames = utils.isArray(classNames) ? classNames :
            utils.trim(classNames).replace(/[ ]{2,}/g,' ').split(' ');
        for(var i = 0,ci,cls = elm.className;ci=classNames[i++];){
            cls = cls.replace(new RegExp('\\b' + ci + '\\b'),'')
        }
        cls = utils.trim(cls).replace(/[ ]{2,}/g,' ');
        if(cls){
            elm.className = cls;
        }else{
            domUtils.removeAttributes(elm,['class']);
        }
    },

    /**
     * 给元素element添加className
     * @method addClass
     * @param { Node } ele 需要增加className的元素
     * @param { Array } classNames 需要添加的className的数组
     * @remind 相同的类名不会被重复添加
     */
    addClass:function (elm, classNames) {
        if(!elm)return;
        classNames = utils.trim(classNames).replace(/[ ]{2,}/g,' ').split(' ');
        for(var i = 0,ci,cls = elm.className;ci=classNames[i++];){
            if(!new RegExp('\\b' + ci + '\\b').test(cls)){
                cls += ' ' + ci;
            }
        }
        elm.className = utils.trim(cls);
    },

    /**
     * 判断元素element是否包含给定的样式类名className
     * @method hasClass
     * @param { Node } ele 需要检测的元素
     * @param { Array } classNames 需要检测的className数组
     * @return { Boolean } 元素是否包含所有给定的className
     */
    hasClass:function (element, className) {
        if(utils.isRegExp(className)){
            return className.test(element.className)
        }
        className = utils.trim(className).replace(/[ ]{2,}/g,' ').split(' ');
        for(var i = 0,ci,cls = element.className;ci=className[i++];){
            if(!new RegExp('\\b' + ci + '\\b','i').test(cls)){
                return false;
            }
        }
        return i - 1 == className.length;
    },

    /**
     * 阻止事件默认行为
     * @method preventDefault
     * @param { Event } evt 需要阻止默认行为的事件对象
     * @example
     * ```javascript
     * UE_biz.dom.domUtils.preventDefault( evt );
     * ```
     */
    preventDefault:function (evt) {
        evt.preventDefault ? evt.preventDefault() : (evt.returnValue = false);
    },

    /**
     * 获取元素element的style属性的指定值
     * @method getStyle
     * @param { Element } element 需要获取属性值的元素
     * @param { String } styleName 需要获取的style的名称
     * @warning 该方法仅获取元素style属性中所标明的值
     * @return { String } 该元素包含指定的style属性值
     */
    getStyle:function (element, name) {
        var value = element.style[ utils.cssStyleToDomStyle(name) ];
        return utils.fixColor(name, value);
    },
    /**
     * 为元素element设置样式属性值
     * @method setStyle
     * @param { Element } element 需要设置样式的元素
     * @param { String } styleName 样式名
     * @param { String } styleValue 样式值
     */
    setStyle:function (element, name, value) {
        element.style[utils.cssStyleToDomStyle(name)] = value;
        if(!utils.trim(element.style.cssText)){
            this.removeAttributes(element,'style')
        }
    },
    /**
     * 为元素element设置多个样式属性值
     * @method setStyles
     * @param { Element } element 需要设置样式的元素
     * @param { Object } styles 样式名值对
     */
    setStyles:function (element, styles) {
        for (var name in styles) {
            if (styles.hasOwnProperty(name)) {
                domUtils.setStyle(element, name, styles[name]);
            }
        }
    },

    /**
     * 根据给定的过滤规则， 获取符合条件的子节点的数量
     * @method getChildCount
     * @param { Element } node 需要检测的元素
     * @param { Function } fn 过滤器， 要求对符合条件的子节点返回true， 反之则要求返回false
     * @return { Number } 符合过滤条件的node元素的子节点数量
     */
    getChildCount:function (node, fn) {
        var count = 0, first = node.firstChild;
        fn = fn || function () {
            return 1;
        };
        while (first) {
            if (fn(first)) {
                count++;
            }
            first = first.nextSibling;
        }
        return count;
    },

    /**
     * 判断给定节点是否为空节点
     * @method isEmptyNode
     * @param { Node } node 需要检测的节点对象
     * @return { Boolean } 节点是否为空
     */
    isEmptyNode:function (node) {
        return !node.firstChild || domUtils.getChildCount(node, function (node) {
            return  !domUtils.isBr(node) && !domUtils.isBookmarkNode(node) && !domUtils.isWhitespace(node)
        }) == 0
    },

    /**
     * 将显示区域滚动到指定节点的位置
     * @method scrollToView
     * @param    {Node}   node    节点
     * @param    {window}   win      window对象
     * @param    {Number}    offsetTop    距离上方的偏移量
     */
    scrollToView:function (node, win, offsetTop) {
        var getViewPaneSize = function () {
                var doc = win.document,
                    mode = doc.compatMode == 'CSS1Compat';
                return {
                    width:( mode ? doc.documentElement.clientWidth : doc.body.clientWidth ) || 0,
                    height:( mode ? doc.documentElement.clientHeight : doc.body.clientHeight ) || 0
                };
            },
            getScrollPosition = function (win) {
                if ('pageXOffset' in win) {
                    return {
                        x:win.pageXOffset || 0,
                        y:win.pageYOffset || 0
                    };
                }
                else {
                    var doc = win.document;
                    return {
                        x:doc.documentElement.scrollLeft || doc.body.scrollLeft || 0,
                        y:doc.documentElement.scrollTop || doc.body.scrollTop || 0
                    };
                }
            };
        var winHeight = getViewPaneSize().height, offset = winHeight * -1 + offsetTop;
        offset += (node.offsetHeight || 0);
        var elementPosition = domUtils.getXY(node);
        offset += elementPosition.y;
        var currentScroll = getScrollPosition(win).y;
        // offset += 50;
        if (offset > currentScroll || offset < currentScroll - winHeight) {
            win.scrollTo(0, offset + (offset < 0 ? -20 : 20));
        }
    },
    /**
     * 判断给定节点是否为br
     * @method isBr
     * @param { Node } node 需要判断的节点对象
     * @return { Boolean } 给定的节点是否是br节点
     */
    isBr:function (node) {
        return node.nodeType == 1 && node.tagName == 'BR';
    },
    /**
     * 判断给定的节点是否是一个“填充”节点
     * @private
     * @method isFillChar
     * @param { Node } node 需要判断的节点
     * @param { Boolean } isInStart 是否从节点内容的开始位置匹配
     * @returns { Boolean } 节点是否是填充节点
     */
    isFillChar:function (node,isInStart) {
        if(node.nodeType != 3)
            return false;
        var text = node.nodeValue;
        if(isInStart){
            return new RegExp('^' + domUtils.fillChar).test(text)
        }
        return !text.replace(new RegExp(domUtils.fillChar,'g'), '').length
    },

    /**
     * 根据指定的判断规则判断给定的元素是否是一个空元素
     * @method isEmptyBlock
     * @param { Element } node 需要判断的元素
     * @param { RegExp } reg 对内容执行判断的正则表达式对象
     * @return { Boolean } 是否是空元素
     */
    isEmptyBlock:function (node,reg) {
        if(node.nodeType != 1)
            return 0;
        reg = reg || new RegExp('[ \xa0\t\r\n' + domUtils.fillChar + ']', 'g');

        if (node[browser.ie ? 'innerText' : 'textContent'].replace(reg, '').length > 0) {
            return 0;
        }
        for (var n in dtd.$isNotEmpty) {
            if (node.getElementsByTagName(n).length) {
                return 0;
            }
        }
        return 1;
    },

    /**
     * 移动元素使得该元素的位置移动指定的偏移量的距离
     * @method setViewportOffset
     * @param { Element } element 需要设置偏移量的元素
     * @param { Object } offset 偏移量， 形如{ left: 100, top: 50 }的一个键值对， 表示该元素将在
     *                                  现有的位置上向水平方向偏移offset.left的距离， 在竖直方向上偏移
     *                                  offset.top的距离
     */
    setViewportOffset:function (element, offset) {
        var left = parseInt(element.style.left) | 0;
        var top = parseInt(element.style.top) | 0;
        var rect = element.getBoundingClientRect();
        var offsetLeft = offset.left - rect.left;
        var offsetTop = offset.top - rect.top;
        if (offsetLeft) {
            element.style.left = left + offsetLeft + 'px';
        }
        if (offsetTop) {
            element.style.top = top + offsetTop + 'px';
        }
    },

    /**
     * 检测节点是否是UEditor所使用的辅助节点
     * @method isCustomeNode
     * @private
     * @param { Node } node 需要检测的节点
     * @remind 辅助节点是指编辑器要完成工作临时添加的节点， 在输出的时候将会从编辑器内移除， 不会影响最终的结果。
     * @return { Boolean } 给定的节点是否是一个辅助节点
     */
    isCustomeNode:function (node) {
        return node.nodeType == 1 && node.getAttribute('_ue_custom_node_');
    },

    isBoundaryNode : function (node,dir){
        var tmp;
        while(!domUtils.isBody(node)){
            tmp = node;
            node = node.parentNode;
            if(tmp !== node[dir]){
                return false;
            }
        }
        return true;
    },
    fillHtml :  browser.ie11below ? '&nbsp;' : '<br/>'
};
var fillCharReg = new RegExp(domUtils.fillChar, 'g');

// core/Range.js
/**
 * Range实现类，本类是UEditor底层核心类，封装不同浏览器之间的Range操作。
 * @unfile
 * @module UE_biz.dom
 * @class Range
 */


(function () {
    var guid = 0,
        fillChar = domUtils.fillChar,
        fillData;

    /**
     * 更新range的collapse状态
     * @param  {Range}   range    range对象
     */
    function updateCollapse(range) {
        range.collapsed =
            range.startContainer && range.endContainer &&
                range.startContainer === range.endContainer &&
                range.startOffset == range.endOffset;
    }

    function selectOneNode(rng){
        return !rng.collapsed && rng.startContainer.nodeType == 1 && rng.startContainer === rng.endContainer && rng.endOffset - rng.startOffset == 1
    }
    function setEndPoint(toStart, node, offset, range) {
        //如果node是自闭合标签要处理
        if (node.nodeType == 1 && (dtd.$empty[node.tagName] || dtd.$nonChild[node.tagName])) {
            offset = domUtils.getNodeIndex(node) + (toStart ? 0 : 1);
            node = node.parentNode;
        }
        if (toStart) {
            range.startContainer = node;
            range.startOffset = offset;
            if (!range.endContainer) {
                range.collapse(true);
            }
        } else {
            range.endContainer = node;
            range.endOffset = offset;
            if (!range.startContainer) {
                range.collapse(false);
            }
        }
        updateCollapse(range);
        return range;
    }

    function execContentsAction(range, action) {
        //调整边界
        //range.includeBookmark();
        var start = range.startContainer,
            end = range.endContainer,
            startOffset = range.startOffset,
            endOffset = range.endOffset,
            doc = range.document,
            frag = doc.createDocumentFragment(),
            tmpStart, tmpEnd;
        if (start.nodeType == 1) {
            start = start.childNodes[startOffset] || (tmpStart = start.appendChild(doc.createTextNode('')));
        }
        if (end.nodeType == 1) {
            end = end.childNodes[endOffset] || (tmpEnd = end.appendChild(doc.createTextNode('')));
        }
        if (start === end && start.nodeType == 3) {
            frag.appendChild(doc.createTextNode(start.substringData(startOffset, endOffset - startOffset)));
            //is not clone
            if (action) {
                start.deleteData(startOffset, endOffset - startOffset);
                range.collapse(true);
            }
            return frag;
        }
        var current, currentLevel, clone = frag,
            startParents = domUtils.findParents(start, true), endParents = domUtils.findParents(end, true);
        for (var i = 0; startParents[i] == endParents[i];) {
            i++;
        }
        for (var j = i, si; si = startParents[j]; j++) {
            current = si.nextSibling;
            if (si == start) {
                if (!tmpStart) {
                    if (range.startContainer.nodeType == 3) {
                        clone.appendChild(doc.createTextNode(start.nodeValue.slice(startOffset)));
                        //is not clone
                        if (action) {
                            start.deleteData(startOffset, start.nodeValue.length - startOffset);
                        }
                    } else {
                        clone.appendChild(!action ? start.cloneNode(true) : start);
                    }
                }
            } else {
                currentLevel = si.cloneNode(false);
                clone.appendChild(currentLevel);
            }
            while (current) {
                if (current === end || current === endParents[j]) {
                    break;
                }
                si = current.nextSibling;
                clone.appendChild(!action ? current.cloneNode(true) : current);
                current = si;
            }
            clone = currentLevel;
        }
        clone = frag;
        if (!startParents[i]) {
            clone.appendChild(startParents[i - 1].cloneNode(false));
            clone = clone.firstChild;
        }
        for (var j = i, ei; ei = endParents[j]; j++) {
            current = ei.previousSibling;
            if (ei == end) {
                if (!tmpEnd && range.endContainer.nodeType == 3) {
                    clone.appendChild(doc.createTextNode(end.substringData(0, endOffset)));
                    //is not clone
                    if (action) {
                        end.deleteData(0, endOffset);
                    }
                }
            } else {
                currentLevel = ei.cloneNode(false);
                clone.appendChild(currentLevel);
            }
            //如果两端同级，右边第一次已经被开始做了
            if (j != i || !startParents[i]) {
                while (current) {
                    if (current === start) {
                        break;
                    }
                    ei = current.previousSibling;
                    clone.insertBefore(!action ? current.cloneNode(true) : current, clone.firstChild);
                    current = ei;
                }
            }
            clone = currentLevel;
        }
        if (action) {
            range.setStartBefore(!endParents[i] ? endParents[i - 1] : !startParents[i] ? startParents[i - 1] : endParents[i]).collapse(true);
        }
        tmpStart && domUtils.remove(tmpStart);
        tmpEnd && domUtils.remove(tmpEnd);
        return frag;
    }

    /**
     * 创建一个跟document绑定的空的Range实例
     * @constructor
     * @param { Document } document 新建的选区所属的文档对象
     */

    /**
     * @property { Node } startContainer 当前Range的开始边界的容器节点, 可以是一个元素节点或者是文本节点
     */

    /**
     * @property { Node } startOffset 当前Range的开始边界容器节点的偏移量, 如果是元素节点，
     *                              该值就是childNodes中的第几个节点， 如果是文本节点就是文本内容的第几个字符
     */

    /**
     * @property { Node } endContainer 当前Range的结束边界的容器节点, 可以是一个元素节点或者是文本节点
     */

    /**
     * @property { Node } endOffset 当前Range的结束边界容器节点的偏移量, 如果是元素节点，
     *                              该值就是childNodes中的第几个节点， 如果是文本节点就是文本内容的第几个字符
     */

    /**
     * @property { Boolean } collapsed 当前Range是否闭合
     * @default true
     * @remind Range是闭合的时候， startContainer === endContainer && startOffset === endOffset
     */

    /**
     * @property { Document } document 当前Range所属的Document对象
     * @remind 不同range的的document属性可以是不同的
     */
    var Range = dom.Range = function (document) {
        var me = this;
        me.startContainer =
            me.startOffset =
                me.endContainer =
                    me.endOffset = null;
        me.document = document;
        me.collapsed = true;
    };

    /**
     * 删除fillData
     * @param doc
     * @param excludeNode
     */
    function removeFillData(doc, excludeNode) {
        try {
            if (fillData && domUtils.inDoc(fillData, doc)) {
                if (!fillData.nodeValue.replace(fillCharReg, '').length) {
                    var tmpNode = fillData.parentNode;
                    domUtils.remove(fillData);
                    while (tmpNode && domUtils.isEmptyInlineElement(tmpNode) &&
                        //safari的contains有bug
                        (browser.safari ? !(domUtils.getPosition(tmpNode,excludeNode) & domUtils.POSITION_CONTAINS) : !tmpNode.contains(excludeNode))
                        ) {
                        fillData = tmpNode.parentNode;
                        domUtils.remove(tmpNode);
                        tmpNode = fillData;
                    }
                } else {
                    fillData.nodeValue = fillData.nodeValue.replace(fillCharReg, '');
                }
            }
        } catch (e) {
        }
    }

    /**
     * @param node
     * @param dir
     */
    function mergeSibling(node, dir) {
        var tmpNode;
        node = node[dir];
        while (node && domUtils.isFillChar(node)) {
            tmpNode = node[dir];
            domUtils.remove(node);
            node = tmpNode;
        }
    }

    Range.prototype = {


        /**
         * 删除当前选区范围中的所有内容
         * @method deleteContents
         * @remind 执行完该操作后， 当前Range对象变成了闭合状态
         * @return { UE_biz.dom.Range } 当前操作的Range对象
         */
        deleteContents:function () {
            var txt;
            if (!this.collapsed) {
                execContentsAction(this, 1);
            }
            if (browser.webkit) {
                txt = this.startContainer;
                if (txt.nodeType == 3 && !txt.nodeValue.length) {
                    this.setStartBefore(txt).collapse(true);
                    domUtils.remove(txt);
                }
            }
            return this;
        },

        /**
         * 设置Range的开始容器节点和偏移量
         * @method  setStart
         * @remind 如果给定的节点是元素节点，那么offset指的是其子元素中索引为offset的元素，
         *          如果是文本节点，那么offset指的是其文本内容的第offset个字符
         * @remind 如果提供的容器节点是一个不能包含子元素的节点， 则该选区的开始容器将被设置
         *          为该节点的父节点， 此时， 其距离开始容器的偏移量也变成了该节点在其父节点
         *          中的索引
         * @param { Node } node 将被设为当前选区开始边界容器的节点对象
         * @param { int } offset 选区的开始位置偏移量
         * @return { UE_biz.dom.Range } 当前range对象
         */
        setStart:function (node, offset) {
            return setEndPoint(true, node, offset, this);
        },

        /**
         * 设置Range的结束容器和偏移量
         * @method  setEnd
         * @param { Node } node 作为当前选区结束边界容器的节点对象
         * @param { int } offset 结束边界的偏移量
         * @see UE_biz.dom.Range:setStart(Node,int)
         * @return { UE_biz.dom.Range } 当前range对象
         */
        setEnd:function (node, offset) {
            return setEndPoint(false, node, offset, this);
        },

        /**
         * 将Range开始位置设置到node节点之后
         * @method  setStartAfter
         * @remind 该操作将会把给定节点的父节点作为range的开始容器， 且偏移量是该节点在其父节点中的位置索引+1
         * @param { Node } node 选区的开始边界将紧接着该节点之后
         * @return { UE_biz.dom.Range } 当前range对象
         */
        setStartAfter:function (node) {
            return this.setStart(node.parentNode, domUtils.getNodeIndex(node) + 1);
        },

        /**
         * 将Range开始位置设置到node节点之前
         * @method  setStartBefore
         * @remind 该操作将会把给定节点的父节点作为range的开始容器， 且偏移量是该节点在其父节点中的位置索引
         * @param { Node } node 新的选区开始位置在该节点之前
         * @see UE_biz.dom.Range:setStartAfter(Node)
         * @return { UE_biz.dom.Range } 当前range对象
         */
        setStartBefore:function (node) {
            return this.setStart(node.parentNode, domUtils.getNodeIndex(node));
        },

        /**
         * 将Range结束位置设置到node节点之后
         * @method  setEndAfter
         * @remind 该操作将会把给定节点的父节点作为range的结束容器， 且偏移量是该节点在其父节点中的位置索引+1
         * @param { Node } node 目标节点
         * @see UE_biz.dom.Range:setStartAfter(Node)
         * @return { UE_biz.dom.Range } 当前range对象
         */
        setEndAfter:function (node) {
            return this.setEnd(node.parentNode, domUtils.getNodeIndex(node) + 1);
        },

        /**
         * 将Range结束位置设置到node节点之前
         * @method  setEndBefore
         * @remind 该操作将会把给定节点的父节点作为range的结束容器， 且偏移量是该节点在其父节点中的位置索引
         * @param { Node } node 目标节点
         * @see UE_biz.dom.Range:setEndAfter(Node)
         * @return { UE_biz.dom.Range } 当前range对象
         */
        setEndBefore:function (node) {
            return this.setEnd(node.parentNode, domUtils.getNodeIndex(node));
        },

        /**
         * 设置Range的开始位置到node节点内的第一个子节点之前
         * @method  setStartAtFirst
         * @remind 选区的开始容器将变成给定的节点， 且偏移量为0
         * @remind 如果给定的节点是元素节点， 则该节点必须是允许包含子节点的元素。
         * @param { Node } node 目标节点
         * @see UE_biz.dom.Range:setStartBefore(Node)
         * @return { UE_biz.dom.Range } 当前range对象
         */
        setStartAtFirst:function (node) {
            return this.setStart(node, 0);
        },

        /**
         * 设置Range的开始位置到node节点内的最后一个节点之后
         * @method setStartAtLast
         * @remind 选区的开始容器将变成给定的节点， 且偏移量为该节点的子节点数
         * @remind 如果给定的节点是元素节点， 则该节点必须是允许包含子节点的元素。
         * @param { Node } node 目标节点
         * @see UE_biz.dom.Range:setStartAtFirst(Node)
         * @return { UE_biz.dom.Range } 当前range对象
         */
        setStartAtLast:function (node) {
            return this.setStart(node, node.nodeType == 3 ? node.nodeValue.length : node.childNodes.length);
        },


        /**
         * 设置Range的结束位置到node节点内的最后一个节点之后
         * @method  setEndAtLast
         * @param { Node } node 目标节点
         * @remind 选区的结束容器将变成给定的节点， 且偏移量为该节点的子节点数量
         * @remind node必须是一个元素节点， 且必须是允许包含子节点的元素。
         * @see UE_biz.dom.Range:setStartAtFirst(Node)
         * @return { UE_biz.dom.Range } 当前range对象
         */
        setEndAtLast:function (node) {
            return this.setEnd(node, node.nodeType == 3 ? node.nodeValue.length : node.childNodes.length);
        },

        /**
         * 选中给定节点
         * @method  selectNode
         * @remind 此时， 选区的开始容器和结束容器都是该节点的父节点， 其startOffset是该节点在父节点中的位置索引，
         *          而endOffset为startOffset+1
         * @param { Node } node 需要选中的节点
         * @return { UE_biz.dom.Range } 当前range对象，此时的range仅包含当前给定的节点对象
         * @example
         * ```html
         * <!-- 选区示例 -->
         * <b>xx<i>xxx</i><span>[xx]x</span>xxx</b>
         *
         * <script>
         *
         *     //执行操作
         *     range.selectNode( document.getElementsByTagName("i")[0] );
         *
         *     //结果选区
         *     //<b>xx[<i>xxx</i>]<span>xxx</span>xxx</b>
         *
         * </script>
         * ```
         */
        selectNode:function (node) {
            return this.setStartBefore(node).setEndAfter(node);
        },

        /**
         * 选中给定节点内部的所有节点
         * @method  selectNodeContents
         * @remind 此时， 选区的开始容器和结束容器都是该节点， 其startOffset为0，
         *          而endOffset是该节点的子节点数。
         * @param { Node } node 目标节点， 当前range将包含该节点内的所有节点
         * @return { UE_biz.dom.Range } 当前range对象， 此时range仅包含给定节点的所有子节点
         */
        selectNodeContents:function (node) {
            return this.setStart(node, 0).setEndAtLast(node);
        },

        /**
         * clone当前Range对象
         * @method  cloneRange
         * @remind 返回的range是一个全新的range对象， 其内部所有属性与当前被clone的range相同。
         * @return { UE_biz.dom.Range } 当前range对象的一个副本
         */
        cloneRange:function () {
            var me = this;
            return new Range(me.document).setStart(me.startContainer, me.startOffset).setEnd(me.endContainer, me.endOffset);

        },

        /**
         * 闭合当前选区，根据给定的toStart参数项决定是向当前选区开始处闭合还是向结束处闭合，
         * 如果toStart的值为true，则向开始位置闭合， 反之，向结束位置闭合。
         * @method  collapse
         * @param { Boolean } toStart 是否向选区开始处闭合
         * @return { UE_biz.dom.Range } 当前range对象，此时range对象处于闭合状态
         */
        collapse:function (toStart) {
            var me = this;
            if (toStart) {
                me.endContainer = me.startContainer;
                me.endOffset = me.startOffset;
            } else {
                me.startContainer = me.endContainer;
                me.startOffset = me.endOffset;
            }
            me.collapsed = true;
            return me;
        },

        /**
         * 调整range的开始位置和结束位置，使其"收缩"到最小的位置，
         * 如果ignoreEnd的值为true，则忽略对结束位置的调整
         * @method  shrinkBoundary
         * @param { Boolean } ignoreEnd 是否忽略对结束位置的调整
         * @return { UE_biz.dom.Range } 当前range对象
         * @see UE_biz.dom.domUtils.Range:shrinkBoundary()
         */
        shrinkBoundary:function (ignoreEnd) {
            var me = this, child,
                collapsed = me.collapsed;
            function check(node){
                return node.nodeType == 1 && !domUtils.isBookmarkNode(node) && !dtd.$empty[node.tagName] && !dtd.$nonChild[node.tagName]
            }
            while (me.startContainer.nodeType == 1 //是element
                && (child = me.startContainer.childNodes[me.startOffset]) //子节点也是element
                && check(child)) {
                me.setStart(child, 0);
            }
            if (collapsed) {
                return me.collapse(true);
            }
            if (!ignoreEnd) {
                while (me.endContainer.nodeType == 1//是element
                    && me.endOffset > 0 //如果是空元素就退出 endOffset=0那么endOffst-1为负值，childNodes[endOffset]报错
                    && (child = me.endContainer.childNodes[me.endOffset - 1]) //子节点也是element
                    && check(child)) {
                    me.setEnd(child, child.childNodes.length);
                }
            }
            return me;
        },

        /**
         * 获取当前选区所包含的所有节点的公共祖先节点， 可以根据给定的参数 includeSelf 决定获取到
         * 的公共祖先节点是否可以是当前选区的startContainer或endContainer节点， 如果 includeSelf
         * 的取值为true， 则返回的节点可以是自身的容器节点， 否则， 则不能是容器节点； 同时可以根据
         * ignoreTextNode 参数的取值决定是否忽略类型为文本节点的祖先节点。
         * @method  getCommonAncestor
         * @param { Boolean } includeSelf 是否允许获取到的公共祖先节点是当前range对象的容器节点
         * @param { Boolean } ignoreTextNode 获取祖先节点的过程中是否忽略类型为文本节点的祖先节点
         * @return { Node } 当前range对象内所有节点的公共祖先节点
         */
        getCommonAncestor:function (includeSelf, ignoreTextNode) {
            var me = this,
                start = me.startContainer,
                end = me.endContainer;
            if (start === end) {
                if (includeSelf && selectOneNode(this)) {
                    start = start.childNodes[me.startOffset];
                    if(start.nodeType == 1)
                        return start;
                }
                //只有在上来就相等的情况下才会出现是文本的情况
                return ignoreTextNode && start.nodeType == 3 ? start.parentNode : start;
            }
            return domUtils.getCommonAncestor(start, end);
        },

        /**
         * 调整当前Range的开始和结束边界容器，如果是容器节点是文本节点,就调整到包含该文本节点的父节点上，
         * 可以根据 ignoreEnd 参数的值决定是否调整对结束边界的调整
         * @method trimBoundary
         * @param { Boolean } ignoreEnd 是否忽略对结束边界的调整
         * @return { UE_biz.dom.Range } 当前range对象
         */
        trimBoundary:function (ignoreEnd) {
            this.txtToElmBoundary();
            var start = this.startContainer,
                offset = this.startOffset,
                collapsed = this.collapsed,
                end = this.endContainer;
            if (start.nodeType == 3) {
                if (offset == 0) {
                    this.setStartBefore(start);
                } else {
                    if (offset >= start.nodeValue.length) {
                        this.setStartAfter(start);
                    } else {
                        var textNode = domUtils.split(start, offset);
                        //跟新结束边界
                        if (start === end) {
                            this.setEnd(textNode, this.endOffset - offset);
                        } else if (start.parentNode === end) {
                            this.endOffset += 1;
                        }
                        this.setStartBefore(textNode);
                    }
                }
                if (collapsed) {
                    return this.collapse(true);
                }
            }
            if (!ignoreEnd) {
                offset = this.endOffset;
                end = this.endContainer;
                if (end.nodeType == 3) {
                    if (offset == 0) {
                        this.setEndBefore(end);
                    } else {
                        offset < end.nodeValue.length && domUtils.split(end, offset);
                        this.setEndAfter(end);
                    }
                }
            }
            return this;
        },

        /**
         * 如果选区在文本的边界上，就扩展选区到文本的父节点上, 如果当前选区是闭合的， 则根据参数项
         * ignoreCollapsed 的值决定是否执行该调整
         * @method txtToElmBoundary
         * @param { Boolean } ignoreCollapsed 是否忽略选区的闭合状态， 如果该参数取值为true， 则
         *                      不论选区是否闭合， 都会执行该操作， 反之， 则不会对闭合的选区执行该操作
         * @return { UE_biz.dom.Range } 当前range对象
         */
        txtToElmBoundary:function (ignoreCollapsed) {
            function adjust(r, c) {
                var container = r[c + 'Container'],
                    offset = r[c + 'Offset'];
                if (container.nodeType == 3) {
                    if (!offset) {
                        r['set' + c.replace(/(\w)/, function (a) {
                            return a.toUpperCase();
                        }) + 'Before'](container);
                    } else if (offset >= container.nodeValue.length) {
                        r['set' + c.replace(/(\w)/, function (a) {
                            return a.toUpperCase();
                        }) + 'After' ](container);
                    }
                }
            }

            if (ignoreCollapsed || !this.collapsed) {
                adjust(this, 'start');
                adjust(this, 'end');
            }
            return this;
        },

        /**
         * 在当前选区的开始位置前插入节点，新插入的节点会被该range包含
         * @method  insertNode
         * @param { Node } node 需要插入的节点
         * @remind 插入的节点可以是一个DocumentFragment依次插入多个节点
         * @return { UE_biz.dom.Range } 当前range对象
         */
        insertNode:function (node) {
            var first = node, length = 1;
            if (node.nodeType == 11) {
                first = node.firstChild;
                length = node.childNodes.length;
            }
            this.trimBoundary(true);
            var start = this.startContainer,
                offset = this.startOffset;
            var nextNode = start.childNodes[ offset ];
            if (nextNode) {
                start.insertBefore(node, nextNode);
            } else {
                start.appendChild(node);
            }
            if (first.parentNode === this.endContainer) {
                this.endOffset = this.endOffset + length;
            }
            return this.setStartBefore(first);
        },

        /**
         * 闭合选区，可以根据参数toEnd的值控制选区是向前闭合还是向后闭合， 并且定位光标到闭合后的位置。
         * @method  setCursor
         * @param { Boolean } toEnd 是否向后闭合， 如果为true， 则闭合选区时， 将向结束容器方向闭合，
         *                      反之，则向开始容器方向闭合
         * @return { UE_biz.dom.Range } 当前range对象
         * @see UE_biz.dom.Range:collapse(Boolean)
         */
        setCursor:function (toEnd, noFillData) {
            return this.collapse(!toEnd).select(noFillData);
        },

        /**
         * 创建当前range的一个书签，记录下当前range的位置，方便当dom树改变时，还能找回原来的选区位置
         * @method createBookmark
         * @param { Boolean } serialize 控制返回的标记位置是对当前位置的引用还是ID，如果该值为true，则
         *                              返回标记位置的ID， 反之则返回标记位置节点的引用
         * @return { Object } 返回一个书签记录键值对， 其包含的key有： start => 开始标记的ID或者引用，
         *                          end => 结束标记的ID或引用， id => 当前标记的类型， 如果为true，则表示
         *                          返回的记录的类型为ID， 反之则为引用
         */
        createBookmark:function (serialize, same) {
            var endNode,
                startNode = this.document.createElement('span');
            startNode.style.cssText = 'display:none;line-height:0px;';
            startNode.appendChild(this.document.createTextNode('\u200D'));
            startNode.id = '_baidu_bookmark_start_' + (same ? '' : guid++);

            if (!this.collapsed) {
                endNode = startNode.cloneNode(true);
                endNode.id = '_baidu_bookmark_end_' + (same ? '' : guid++);
            }
            this.insertNode(startNode);
            if (endNode) {
                this.collapse().insertNode(endNode).setEndBefore(endNode);
            }
            this.setStartAfter(startNode);
            return {
                start:serialize ? startNode.id : startNode,
                end:endNode ? serialize ? endNode.id : endNode : null,
                id:serialize
            }
        },

        /**
         *  调整当前range的边界到书签位置，并删除该书签对象所标记的位置内的节点
         *  @method  moveToBookmark
         *  @param { BookMark } bookmark createBookmark所创建的标签对象
         *  @return { UE_biz.dom.Range } 当前range对象
         *  @see UE_biz.dom.Range:createBookmark(Boolean)
         */
        moveToBookmark:function (bookmark) {
            var start = bookmark.id ? this.document.getElementById(bookmark.start) : bookmark.start,
                end = bookmark.end && bookmark.id ? this.document.getElementById(bookmark.end) : bookmark.end;
            this.setStartBefore(start);
            domUtils.remove(start);
            if (end) {
                this.setEndBefore(end);
                domUtils.remove(end);
            } else {
                this.collapse(true);
            }
            return this;
        },
        /**
         * 调整Range的边界，使其"缩小"到最合适的位置
         * @method adjustmentBoundary
         * @return { UE_biz.dom.Range } 当前range对象
         * @see UE_biz.dom.Range:shrinkBoundary()
         */
        adjustmentBoundary:function () {
            if (!this.collapsed) {
                while (!domUtils.isBody(this.startContainer) &&
                    this.startOffset == this.startContainer[this.startContainer.nodeType == 3 ? 'nodeValue' : 'childNodes'].length &&
                    this.startContainer[this.startContainer.nodeType == 3 ? 'nodeValue' : 'childNodes'].length
                    ) {

                    this.setStartAfter(this.startContainer);
                }
                while (!domUtils.isBody(this.endContainer) && !this.endOffset &&
                    this.endContainer[this.endContainer.nodeType == 3 ? 'nodeValue' : 'childNodes'].length
                    ) {
                    this.setEndBefore(this.endContainer);
                }
            }
            return this;
        },

        /**
         * 获取当前选中的自闭合的节点
         * @method  getClosedNode
         * @return { Node | NULL } 如果当前选中的是自闭合节点， 则返回该节点， 否则返回NULL
         */
        getClosedNode:function () {
            var node;
            if (!this.collapsed) {
                var range = this.cloneRange().adjustmentBoundary().shrinkBoundary();
                if (selectOneNode(range)) {
                    var child = range.startContainer.childNodes[range.startOffset];
                    if (child && child.nodeType == 1 && (dtd.$empty[child.tagName] || dtd.$nonChild[child.tagName])) {
                        node = child;
                    }
                }
            }
            return node;
        },

        /**
         * 在页面上高亮range所表示的选区
         * @method select
         * @return { UE_biz.dom.Range } 返回当前Range对象
         */
            //这里不区分ie9以上，trace:3824
        select:browser.ie ? function (noFillData, textRange) {
            var nativeRange;
            if (!this.collapsed)
                this.shrinkBoundary();
            var node = this.getClosedNode();
            if (node && !textRange) {
                try {
                    nativeRange = this.document.body.createControlRange();
                    nativeRange.addElement(node);
                    nativeRange.select();
                } catch (e) {}
                return this;
            }
            var bookmark = this.createBookmark(),
                start = bookmark.start,
                end;
            nativeRange = this.document.body.createTextRange();
            nativeRange.moveToElementText(start);
            nativeRange.moveStart('character', 1);
            if (!this.collapsed) {
                var nativeRangeEnd = this.document.body.createTextRange();
                end = bookmark.end;
                nativeRangeEnd.moveToElementText(end);
                nativeRange.setEndPoint('EndToEnd', nativeRangeEnd);
            } else {
                if (!noFillData && this.startContainer.nodeType != 3) {
                    //使用<span>|x<span>固定住光标
                    var tmpText = this.document.createTextNode(fillChar),
                        tmp = this.document.createElement('span');
                    tmp.appendChild(this.document.createTextNode(fillChar));
                    start.parentNode.insertBefore(tmp, start);
                    start.parentNode.insertBefore(tmpText, start);
                    //当点b,i,u时，不能清除i上边的b
                    removeFillData(this.document, tmpText);
                    fillData = tmpText;
                    mergeSibling(tmp, 'previousSibling');
                    mergeSibling(start, 'nextSibling');
                    nativeRange.moveStart('character', -1);
                    nativeRange.collapse(true);
                }
            }
            this.moveToBookmark(bookmark);
            tmp && domUtils.remove(tmp);
            //IE在隐藏状态下不支持range操作，catch一下
            try {
                nativeRange.select();
            } catch (e) {
            }
            return this;
        } : function (notInsertFillData) {
            function checkOffset(rng){

                function check(node,offset,dir){
                    if(node.nodeType == 3 && node.nodeValue.length < offset){
                        rng[dir + 'Offset'] = node.nodeValue.length
                    }
                }
                check(rng.startContainer,rng.startOffset,'start');
                check(rng.endContainer,rng.endOffset,'end');
            }
            var win = domUtils.getWindow(this.document),
                sel = win.getSelection(),
                txtNode;
            //FF下关闭自动长高时滚动条在关闭dialog时会跳
            //ff下如果不body.focus将不能定位闭合光标到编辑器内
            browser.gecko ? this.document.body.focus() : win.focus();
            if (sel) {
                sel.removeAllRanges();
                if (this.collapsed && !notInsertFillData) {
                    var start = this.startContainer,child = start;
                    if(start.nodeType == 1){
                        child = start.childNodes[this.startOffset];

                    }
                    if( !(start.nodeType == 3 && this.startOffset)  &&
                        (child ?
                            (!child.previousSibling || child.previousSibling.nodeType != 3)
                            :
                            (!start.lastChild || start.lastChild.nodeType != 3)
                        )
                    ){
                        txtNode = this.document.createTextNode(fillChar);
                        //跟着前边走
                        this.insertNode(txtNode);
                        removeFillData(this.document, txtNode);
                        mergeSibling(txtNode, 'previousSibling');
                        mergeSibling(txtNode, 'nextSibling');
                        fillData = txtNode;
                        this.setStart(txtNode, browser.webkit ? 1 : 0).collapse(true);
                    }
                }
                var nativeRange = this.document.createRange();
                if(this.collapsed && browser.opera && this.startContainer.nodeType == 1){
                    var child = this.startContainer.childNodes[this.startOffset];
                    if(!child){
                        //往前靠拢
                        child = this.startContainer.lastChild;
                        if( child && domUtils.isBr(child)){
                            this.setStartBefore(child).collapse(true);
                        }
                    }else{
                        //向后靠拢
                        while(child && domUtils.isBlockElm(child)){
                            if(child.nodeType == 1 && child.childNodes[0]){
                                child = child.childNodes[0]
                            }else{
                                break;
                            }
                        }
                        child && this.setStartBefore(child).collapse(true)
                    }

                }
                //是createAddress最后一位算的不准，现在这里进行微调
                checkOffset(this);
                nativeRange.setStart(this.startContainer, this.startOffset);
                nativeRange.setEnd(this.endContainer, this.endOffset);
            }
            return this;
        },

        /**
         * 滚动到距离当前range开始位置 offset 的位置处
         * @method scrollToView
         * @param { Window } win 当前range对象所属的window对象
         * @param { Number } offset 距离range开始位置处的偏移量， 如果为正数， 则向下偏移， 反之， 则向上偏移
         * @return { UE_biz.dom.Range } 当前Range对象
         */
        scrollToView:function (win, offset) {
            win = win ? window : domUtils.getWindow(this.document);
            var me = this,
                span = me.document.createElement('span');
            //trace:717
            span.innerHTML = '&nbsp;';
            me.cloneRange().insertNode(span);
            domUtils.scrollToView(span, win, offset);
            domUtils.remove(span);
            return me;
        },

        /**
         * 判断当前选区内容是否占位符
         * @private
         * @method inFillChar
         * @return { Boolean } 如果是占位符返回true，否则返回false
         */
        inFillChar : function(){
            var start = this.startContainer;
            if(this.collapsed && start.nodeType == 3
                && start.nodeValue.replace(new RegExp('^' + domUtils.fillChar),'').length + 1 == start.nodeValue.length
                ){
                return true;
            }
            return false;
        },

        /**
         * 遍历range内的节点。
         * 每当遍历一个节点时， 都会执行参数项 doFn 指定的函数， 该函数的接受当前遍历的节点
         * 作为其参数。
         * 可以通过参数项 filterFn 来指定一个过滤器， 只有符合该过滤器过滤规则的节点才会触
         * 发doFn函数的执行
         * @method traversal
         * @param { Function } doFn 对每个遍历的节点要执行的方法， 该方法接受当前遍历的节点作为其参数
         * @param { Function } filterFn 过滤器， 该函数接受当前遍历的节点作为参数， 如果该节点满足过滤
         *                      规则， 请返回true， 该节点会触发doFn， 否则， 请返回false， 则该节点不
         *                      会触发doFn。
         * @return { UE_biz.dom.Range } 当前range对象
         */
        traversal:function(doFn,filterFn){
            if (this.collapsed)
                return this;
            var bookmark = this.createBookmark(),
                end = bookmark.end,
                current = domUtils.getNextDomNode(bookmark.start, false, filterFn);
            while (current && current !== end && (domUtils.getPosition(current, end) & domUtils.POSITION_PRECEDING)) {
                var tmpNode = domUtils.getNextDomNode(current,false,filterFn);
                doFn(current);
                current = tmpNode;
            }
            return this.moveToBookmark(bookmark);
        }
    };
})();

// core/Selection.js
/**
 * 选区集合
 * @unfile
 * @module UE_biz.dom
 * @class Selection
 */
(function () {

    function getBoundaryInformation( range, start ) {
        var getIndex = domUtils.getNodeIndex;
        range = range.duplicate();
        range.collapse( start );
        var parent = range.parentElement();
        //如果节点里没有子节点，直接退出
        if ( !parent.hasChildNodes() ) {
            return  {container:parent, offset:0};
        }
        var siblings = parent.children,
            child,
            testRange = range.duplicate(),
            startIndex = 0, endIndex = siblings.length - 1, index = -1,
            distance;
        while ( startIndex <= endIndex ) {
            index = Math.floor( (startIndex + endIndex) / 2 );
            child = siblings[index];
            testRange.moveToElementText( child );
            var position = testRange.compareEndPoints( 'StartToStart', range );
            if ( position > 0 ) {
                endIndex = index - 1;
            } else if ( position < 0 ) {
                startIndex = index + 1;
            } else {
                //trace:1043
                return  {container:parent, offset:getIndex( child )};
            }
        }
        if ( index == -1 ) {
            testRange.moveToElementText( parent );
            testRange.setEndPoint( 'StartToStart', range );
            distance = testRange.text.replace( /(\r\n|\r)/g, '\n' ).length;
            siblings = parent.childNodes;
            if ( !distance ) {
                child = siblings[siblings.length - 1];
                return  {container:child, offset:child.nodeValue.length};
            }

            var i = siblings.length;
            while ( distance > 0 ){
                distance -= siblings[ --i ].nodeValue.length;
            }
            return {container:siblings[i], offset:-distance};
        }
        testRange.collapse( position > 0 );
        testRange.setEndPoint( position > 0 ? 'StartToStart' : 'EndToStart', range );
        distance = testRange.text.replace( /(\r\n|\r)/g, '\n' ).length;
        if ( !distance ) {
            return  dtd.$empty[child.tagName] || dtd.$nonChild[child.tagName] ?
            {container:parent, offset:getIndex( child ) + (position > 0 ? 0 : 1)} :
            {container:child, offset:position > 0 ? 0 : child.childNodes.length}
        }
        while ( distance > 0 ) {
            try {
                var pre = child;
                child = child[position > 0 ? 'previousSibling' : 'nextSibling'];
                distance -= child.nodeValue.length;
            } catch ( e ) {
                return {container:parent, offset:getIndex( pre )};
            }
        }
        return  {container:child, offset:position > 0 ? -distance : child.nodeValue.length + distance}
    }

    /**
     * 将ieRange转换为Range对象
     * @param {Range}   ieRange    ieRange对象
     * @param {Range}   range      Range对象
     * @return  {Range}  range       返回转换后的Range对象
     */
    function transformIERangeToRange( ieRange, range ) {
        if ( ieRange.item ) {
            range.selectNode( ieRange.item( 0 ) );
        } else {
            var bi = getBoundaryInformation( ieRange, true );
            range.setStart( bi.container, bi.offset );
            if ( ieRange.compareEndPoints( 'StartToEnd', ieRange ) != 0 ) {
                bi = getBoundaryInformation( ieRange, false );
                range.setEnd( bi.container, bi.offset );
            }
        }
        return range;
    }

    /**
     * 获得ieRange
     * @param {Selection} sel    Selection对象
     * @return {ieRange}    得到ieRange
     */
    function _getIERange( sel ) {
        var ieRange;
        //ie下有可能报错
        try {
            ieRange = sel.getNative().createRange();
        } catch ( e ) {
            return null;
        }
        var el = ieRange.item ? ieRange.item( 0 ) : ieRange.parentElement();
        if ( ( el.ownerDocument || el ) === sel.document ) {
            return ieRange;
        }
        return null;
    }

    var Selection = dom.Selection = function ( doc ) {
        var me = this, iframe;
        me.document = doc;
        if ( browser.ie9below ) {
            iframe = domUtils.getWindow( doc ).frameElement;
            domUtils.on( iframe, 'beforedeactivate', function () {
                me._bakIERange = me.getIERange();
            } );
            domUtils.on( iframe, 'activate', function () {
                try {
                    if ( !_getIERange( me ) && me._bakIERange ) {
                        me._bakIERange.select();
                    }
                } catch ( ex ) {
                }
                me._bakIERange = null;
            } );
        }
        iframe = doc = null;
    };

    Selection.prototype = {

        rangeInBody : function(rng,txtRange){
            var node = browser.ie9below || txtRange ? rng.item ? rng.item() : rng.parentElement() : rng.startContainer;

            return node === this.document.body || domUtils.inDoc(node,this.document);
        },

        /**
         * 获取原生seleciton对象
         * @method getNative
         * @return { Object } 获得selection对象
         * @example
         * ```javascript
         * editor.selection.getNative();
         * ```
         */
        getNative:function () {
            var doc = this.document;
            try {
                return !doc ? null : browser.ie9below ? doc.selection : domUtils.getWindow( doc ).getSelection();
            } catch ( e ) {
                return null;
            }
        },

        /**
         * 获得ieRange
         * @method getIERange
         * @return { Object } 返回ie原生的Range
         * @example
         * ```javascript
         * editor.selection.getIERange();
         * ```
         */
        getIERange:function () {
            var ieRange = _getIERange( this );
            if ( !ieRange ) {
                if ( this._bakIERange ) {
                    return this._bakIERange;
                }
            }
            return ieRange;
        },

        /**
         * 缓存当前选区的range和选区的开始节点
         * @method cache
         */
        cache:function () {
            this.clear();
            this._cachedRange = this.getRange();
            this._cachedStartElement = this.getStart();
            this._cachedStartElementPath = this.getStartElementPath();
        },

        /**
         * 获取选区开始位置的父节点到body
         * @method getStartElementPath
         * @return { Array } 返回父节点集合
         * @example
         * ```javascript
         * editor.selection.getStartElementPath();
         * ```
         */
        getStartElementPath:function () {
            if ( this._cachedStartElementPath ) {
                return this._cachedStartElementPath;
            }
            var start = this.getStart();
            if ( start ) {
                return domUtils.findParents( start, true, null, true )
            }
            return [];
        },

        /**
         * 清空缓存
         * @method clear
         */
        clear:function () {
            this._cachedStartElementPath = this._cachedRange = this._cachedStartElement = null;
        },

        /**
         * 编辑器是否得到了选区
         * @method isFocus
         */
        isFocus:function () {
            try {
                if(browser.ie9below){

                    var nativeRange = _getIERange(this);
                    return !!(nativeRange && this.rangeInBody(nativeRange));
                }else{
                    return !!this.getNative().rangeCount;
                }
            } catch ( e ) {
                return false;
            }

        },

        /**
         * 获取选区对应的Range
         * @method getRange
         * @return { Object } 得到Range对象
         * @example
         * ```javascript
         * editor.selection.getRange();
         * ```
         */
        getRange:function () {
            var me = this;
            function optimze( range ) {
                var child = me.document.body.firstChild,
                    collapsed = range.collapsed;
                while ( child && child.firstChild ) {
                    range.setStart( child, 0 );
                    child = child.firstChild;
                }
                if ( !range.startContainer ) {
                    range.setStart( me.document.body, 0 )
                }
                if ( collapsed ) {
                    range.collapse( true );
                }
            }

            if ( me._cachedRange != null ) {
                return this._cachedRange;
            }
            var range = new baidu.editor.dom.Range( me.document );

            if ( browser.ie9below ) {
                var nativeRange = me.getIERange();
                if ( nativeRange ) {
                    //备份的_bakIERange可能已经实效了，dom树发生了变化比如从源码模式切回来，所以try一下，实效就放到body开始位置
                    try{
                        transformIERangeToRange( nativeRange, range );
                    }catch(e){
                        optimze( range );
                    }

                } else {
                    optimze( range );
                }
            } else {
                var sel = me.getNative();
                if ( sel && sel.rangeCount ) {
                    var firstRange = sel.getRangeAt( 0 );
                    var lastRange = sel.getRangeAt( sel.rangeCount - 1 );
                    range.setStart( firstRange.startContainer, firstRange.startOffset ).setEnd( lastRange.endContainer, lastRange.endOffset );
                    if ( range.collapsed && domUtils.isBody( range.startContainer ) && !range.startOffset ) {
                        optimze( range );
                    }
                } else {
                    //trace:1734 有可能已经不在dom树上了，标识的节点
                    if ( this._bakRange && domUtils.inDoc( this._bakRange.startContainer, this.document ) ){
                        return this._bakRange;
                    }
                    optimze( range );
                }
            }
            return this._bakRange = range;
        },

        /**
         * 获取开始元素，用于状态反射
         * @method getStart
         * @return { Element } 获得开始元素
         * @example
         * ```javascript
         * editor.selection.getStart();
         * ```
         */
        getStart:function () {
            if ( this._cachedStartElement ) {
                return this._cachedStartElement;
            }
            var range = browser.ie9below ? this.getIERange() : this.getRange(),
                tmpRange,
                start, tmp, parent;
            if ( browser.ie9below ) {
                if ( !range ) {
                    //todo 给第一个值可能会有问题
                    return this.document.body.firstChild;
                }
                //control元素
                if ( range.item ){
                    return range.item( 0 );
                }
                tmpRange = range.duplicate();
                //修正ie下<b>x</b>[xx] 闭合后 <b>x|</b>xx
                tmpRange.text.length > 0 && tmpRange.moveStart( 'character', 1 );
                tmpRange.collapse( 1 );
                start = tmpRange.parentElement();
                parent = tmp = range.parentElement();
                while ( tmp = tmp.parentNode ) {
                    if ( tmp == start ) {
                        start = parent;
                        break;
                    }
                }
            } else {
                range.shrinkBoundary();
                start = range.startContainer;
                if ( start.nodeType == 1 && start.hasChildNodes() ){
                    start = start.childNodes[Math.min( start.childNodes.length - 1, range.startOffset )];
                }
                if ( start.nodeType == 3 ){
                    return start.parentNode;
                }
            }
            return start;
        }
    };
})();

// core/Editor.js
/**
 * UEditor的核心类，为用户提供与编辑器交互的接口。
 * @unfile
 * @module UE_biz
 * @class Editor
 */

(function () {
    var uid = 0, _selectionChangeTimer;

    /**
     * 获取编辑器的html内容，赋值到编辑器所在表单的textarea文本域里面
     * @private
     * @method setValue
     * @param { UE_biz.Editor } editor 编辑器事例
     */
    function setValue(form, editor) {
        var textarea;
        if (editor.textarea) {
            if (utils.isString(editor.textarea)) {
                for (var i = 0, ti, tis = domUtils.getElementsByTagName(form, 'textarea'); ti = tis[i++];) {
                    if (ti.id == 'ueditor_textarea_' + editor.options.textarea) {
                        textarea = ti;
                        break;
                    }
                }
            } else {
                textarea = editor.textarea;
            }
        }
        if (!textarea) {
            form.appendChild(textarea = domUtils.createElement(document, 'textarea', {
                'name': editor.options.textarea,
                'id': 'ueditor_textarea_' + editor.options.textarea,
                'style': "display:none"
            }));
            //不要产生多个textarea
            editor.textarea = textarea;
        }
        !textarea.getAttribute('name') && textarea.setAttribute('name', editor.options.textarea );
        textarea.value = editor.hasContents() ?
            (editor.options.allHtmlEnabled ? editor.getAllHtml() : editor.getContent(null, null, true)) :
            ''
    }
    function loadPlugins(me){
        //初始化插件
        for (var pi in UE_biz.plugins) {
            UE_biz.plugins[pi].call(me);
        }

    }
    function checkCurLang(I18N){
        for(var lang in I18N){
            return lang
        }
    }

    /**
     * 编辑器准备就绪后会触发该事件
     * @module UE_biz
     * @class Editor
     * @event ready
     * @remind render方法执行完成之后,会触发该事件
     * @remind
     * @example
     * ```javascript
     * editor.addListener( 'ready', function( editor ) {
     *     editor.execCommand( 'focus' ); //编辑器家在完成后，让编辑器拿到焦点
     * } );
     */
    var Editor = UE_biz.Editor = function (options) {
        var me = this;
        me.uid = uid++;
        EventBase.call(me);
        me.commands = {};
        me.options = utils.extend(utils.clone(options || {}), UEDITOR_CONFIG, true);
        me.shortcutkeys = {};
        me.inputRules = [];
        me.outputRules = [];
        //设置默认的常用属性
        me.setOpt(Editor.defaultOptions(me));
        UE_biz.instants['ueditorInstant' + me.uid] = me;
    };
    Editor.prototype = {
         registerCommand : function(name,obj){
            this.commands[name] = obj;
         },
        /**
         * 编辑器对外提供的监听ready事件的接口， 通过调用该方法，达到的效果与监听ready事件是一致的
         * @method ready
         * @param { Function } fn 编辑器ready之后所执行的回调, 如果在注册事件之前编辑器已经ready，将会
         * 立即触发该回调。
         * @remind 需要等待编辑器加载完成后才能执行的代码,可以使用该方法传入
         */
        ready: function (fn) {
            var me = this;
            if (fn) {
                me.isReady ? fn.apply(me) : me.addListener('ready', fn);
            }
        },

        /**
         * 该方法是提供给插件里面使用，以{key:value}集合的方式设置插件内用到的配置项默认值
         * @method setOpt
         * @warning 三处设置配置项的优先级: 实例化时传入参数 > setOpt()设置 > config文件里设置
         * @warning 该方法仅供编辑器插件内部和编辑器初始化时调用，其他地方不能调用。
         * @param { Object } options 将要设置的选项的键值对对象
         */
        setOpt: function (key, val) {
            var obj = {};
            if (utils.isString(key)) {
                obj[key] = val
            } else {
                obj = key;
            }
            utils.extend(this.options, obj, true);
        },
        getOpt:function(key){
            return this.options[key]
        },
        /**
         * 销毁编辑器实例，使用textarea代替
         * @method destroy
         * @example
         * ```javascript
         * editor.destroy();
         * ```
         */
        destroy: function () {

            var me = this;
            me.fireEvent('destroy');
            var container = me.container.parentNode;
            var textarea = me.textarea;
            if (!textarea) {
                textarea = document.createElement('textarea');
                container.parentNode.insertBefore(textarea, container);
            } else {
                textarea.style.display = ''
            }

            textarea.style.width = me.iframe.offsetWidth + 'px';
            textarea.style.height = me.iframe.offsetHeight + 'px';
            textarea.value = me.getContent();
            textarea.id = me.key;
            container.innerHTML = '';
            domUtils.remove(container);
            var key = me.key;
            //trace:2004
            for (var p in me) {
                if (me.hasOwnProperty(p)) {
                    delete this[p];
                }
            }
            UE_biz.delEditor(key);
        },

        /**
         * 渲染编辑器的DOM到指定容器
         * @method render
         * @param { Element } containerDom 直接指定容器对象
         * @remind 执行该方法,会触发ready事件
         * @warning 必须且只能调用一次
         */
        render: function (container) {
            var me = this,
                options = me.options,
                getStyleValue=function(attr){
                    return parseInt(domUtils.getComputedStyle(container,attr));
                };
            if (utils.isString(container)) {
                container = document.getElementById(container);
            }
            if (container) {
                if(options.initialFrameWidth){
                    options.minFrameWidth = options.initialFrameWidth
                }else{
                    options.minFrameWidth = options.initialFrameWidth = container.offsetWidth;
                }
                if(options.initialFrameHeight){
                    options.minFrameHeight = options.initialFrameHeight
                }else{
                    options.initialFrameHeight = options.minFrameHeight = container.offsetHeight;
                }

                container.style.width = /%$/.test(options.initialFrameWidth) ?  '100%' : options.initialFrameWidth-
                    getStyleValue("padding-left")- getStyleValue("padding-right") +'px';
                container.style.height = /%$/.test(options.initialFrameHeight) ?  '100%' : options.initialFrameHeight -
                    getStyleValue("padding-top")- getStyleValue("padding-bottom") +'px';

                container.style.zIndex = options.zIndex;


                var html = ( ie && browser.version < 9  ? '' : '<!DOCTYPE html>') +
                    '<html xmlns=\'http://www.w3.org/1999/xhtml\' class=\'view\' ><head>' +
                    '<style type=\'text/css\'>' +
                    //设置四周的留边
                    '.view{padding:0;word-wrap:break-word;cursor:text;height:90%;}\n' +
                    'body{margin:8px;font-family:sans-serif;font-size:16px;}' +
					'.bizconfigformulatext{background:url(./kingdee/bcm/bizconfigformulatext/themes/biz/images/open.png) no-repeat 0 0;background-position-x:right;cursor: pointer;border-top:none;border-left:none;border-right:none;border-color:black;border-width:1px;outline:none;font-size:12px;height:18px;}' +
                    //设置段落间距
                    'p{margin:5px 0;}</style>' +
                    (options.initialStyle ? '<style>' + options.initialStyle + '</style>' : '') +
                    '</head><body class=\'view\'  style=\'font-size:12px;\'></body>' +
                    '<script type=\'text/javascript\' ' + (ie ? 'defer=\'defer\'' : '' ) +' id=\'_initialScript\'>' +
                    'setTimeout(function(){editor = window.parent.UE_biz.instants[\'ueditorInstant' + me.uid + '\'];editor._setup(document);},0);' +
                    'var _tmpScript = document.getElementById(\'_initialScript\');_tmpScript.parentNode.removeChild(_tmpScript);</script></html>';
                container.appendChild(domUtils.createElement(document, 'iframe', {
                    id: 'ueditor_' + me.uid,
                    width: "100%",
                    height: "100%",
                    frameborder: "0",
                    src: 'javascript:void(function(){document.open();' + (options.customDomain && document.domain != location.hostname ?  'document.domain="' + document.domain + '";' : '') +
                        'document.write("' + html + '");document.close();}())'
                }));
                container.style.overflow = 'hidden';
                //解决如果是给定的百分比，会导致高度算不对的问题
                setTimeout(function(){
                    if( /%$/.test(options.initialFrameWidth)){
                        options.minFrameWidth = options.initialFrameWidth = container.offsetWidth;
                    }
                    if(/%$/.test(options.initialFrameHeight)){
                        options.minFrameHeight = options.initialFrameHeight = container.offsetHeight;
                        container.style.height = options.initialFrameHeight + 'px';
                    }
                })
            }
        },

        /**
         * 编辑器初始化
         * @method _setup
         * @private
         * @param { Element } doc 编辑器Iframe中的文档对象
         */
        _setup: function (doc) {

            var me = this,
                options = me.options;
            if (ie) {
                doc.body.disabled = true;
                doc.body.contentEditable = true;
                doc.body.disabled = false;
            } else {
                doc.body.contentEditable = true;
            }
            doc.body.spellcheck = false;
            me.document = doc;
            me.window = doc.defaultView || doc.parentWindow;
            me.iframe = me.window.frameElement;
            me.body = doc.body;
            me.selection = new dom.Selection(doc);
            //gecko初始化就能得到range,无法判断isFocus了
            var geckoSel;
            if (browser.gecko && (geckoSel = this.selection.getNative())) {
                geckoSel.removeAllRanges();
            }
            this._initEvents();
            //为form提交提供一个隐藏的textarea
            for (var form = this.iframe.parentNode; !domUtils.isBody(form); form = form.parentNode) {
                if (form.tagName == 'FORM') {
                    me.form = form;
                    if(me.options.autoSyncData){
                        domUtils.on(me.window,'blur',function(){
                            setValue(form,me);
                        });
                    }else{
                        domUtils.on(form, 'submit', function () {
                            setValue(this, me);
                        });
                    }
                    break;
                }
            }
            if (options.initialContent) {
                if (options.autoClearinitialContent) {
                    var oldExecCommand = me.execCommand;
                    me.execCommand = function () {
                        me.fireEvent('firstBeforeExecCommand');
                        return oldExecCommand.apply(me, arguments);
                    };
                    this._setDefaultContent(options.initialContent);
                } else
                    this.setContent(options.initialContent, false, true);
            }

            //编辑器不能为空内容

            if (domUtils.isEmptyNode(me.body)) {
                me.body.innerHTML = '<p>' + (browser.ie ? '' : '<br/>') + '</p>';
            }

            if (!me.container) {
                me.container = this.iframe.parentNode;
            }
            try {
                me.document.execCommand('2D-position', false, false);
            } catch (e) {
            }
            try {
                me.document.execCommand('enableInlineTableEditing', false, false);
            } catch (e) {
            }
            try {
                me.document.execCommand('enableObjectResizing', false, false);
            } catch (e) {
            }

            me.isReady = 1;
            me.fireEvent('ready');
            options.onready && options.onready.call(me);
            if (!browser.ie9below) {
                domUtils.on(me.window, ['blur', 'focus'], function (e) {
                    //chrome下会出现alt+tab切换时，导致选区位置不对
                    if (e.type == 'blur') {
                        me._bakRange = me.selection.getRange();
                        try {
                            me._bakNativeRange = me.selection.getNative().getRangeAt(0);
                            me.selection.getNative().removeAllRanges();
                        } catch (e) {
                            me._bakNativeRange = null;
                        }

                    } else {
                        try {
                            me._bakRange && me._bakRange.select();
                        } catch (e) {
                        }
                    }
                });
            }
            //trace:1518 ff3.6body不够寛，会导致点击空白处无法获得焦点
            if (browser.gecko && browser.version <= 10902) {
                //修复ff3.6初始化进来，不能点击获得焦点
                me.body.contentEditable = false;
                setTimeout(function () {
                    me.body.contentEditable = true;
                }, 100);
                setInterval(function () {
                    me.body.style.height = me.iframe.offsetHeight - 20 + 'px'
                }, 100)
            }

            !options.isShow && me.setHide();
            options.readonly && me.setDisabled();
        },

		getEditorContent:function(){
			var formulaText = '';
			var parentList = this.body.childNodes;
			for(var j=0;j<parentList.length;j++){
				var childList = parentList[j].childNodes;
				for (var i = 0;i<childList.length;i++){
					if (childList[i].nodeName =='INPUT'){
						formulaText += '{"'+childList[i].id+'"}';
					}else if(childList[i].nodeName =='BR'){
					}else{
						formulaText +=childList[i].data;
					}
				}
			}
			
			return formulaText.replace(/&nbsp;/g, '').replace(/\s/g,"");
		},
		
		getContent: function (cmd, fn,notSetCursor,ignoreBlank,formatter) {
            var me = this;
            if (cmd && utils.isFunction(cmd)) {
                fn = cmd;
                cmd = '';
            }
            if (fn ? !fn() : !this.hasContents()) {
                return '';
            }
            me.fireEvent('beforegetcontent');
            var root = UE_biz.htmlparser(me.body.innerHTML,ignoreBlank);
            me.filterOutputRule(root);
            me.fireEvent('aftergetcontent', cmd,root);
            return  root.toHtml(formatter);
        },
        /**
         * 设置编辑器的内容，可修改编辑器当前的html内容
         * @method setContent
         * @warning 通过该方法插入的内容，是经过编辑器内置的过滤规则进行过滤后得到的内容
         * @warning 该方法会触发selectionchange事件
         * @param { String } html 要插入的html内容
         * @param { Boolean } isAppendTo 若传入true，不清空原来的内容，在最后插入内容，否则，清空内容再插入
         */
        setContent: function (html, isAppendTo, notFireSelectionchange) {
            var me = this;

            me.fireEvent('beforesetcontent', html);
            var root = UE_biz.htmlparser(html);
            me.filterInputRule(root);
            html = root.toHtml();

            me.body.innerHTML = (isAppendTo ? me.body.innerHTML : '') + html;


            function isCdataDiv(node){
                return  node.tagName == 'DIV' && node.getAttribute('cdata_tag');
            }
            //给文本或者inline节点套p标签
            if (me.options.enterTag == 'p') {

                var child = this.body.firstChild, tmpNode;
                if (!child || child.nodeType == 1 &&
                    (dtd.$cdata[child.tagName] || isCdataDiv(child) ||
                        domUtils.isCustomeNode(child)
                        )
                    && child === this.body.lastChild) {
                    this.body.innerHTML = '<p>' + (browser.ie ? '&nbsp;' : '<br/>') + '</p>' + this.body.innerHTML;

                } else {
                    var p = me.document.createElement('p');
                    while (child) {
                        while (child && (child.nodeType == 3 || child.nodeType == 1 && dtd.p[child.tagName] && !dtd.$cdata[child.tagName])) {
                            tmpNode = child.nextSibling;
                            p.appendChild(child);
                            child = tmpNode;
                        }
                        if (p.firstChild) {
                            if (!child) {
                                me.body.appendChild(p);
                                break;
                            } else {
                                child.parentNode.insertBefore(p, child);
                                p = me.document.createElement('p');
                            }
                        }
                        child = child.nextSibling;
                    }
                }
            }
            me.fireEvent('aftersetcontent');
            me.fireEvent('contentchange');

            !notFireSelectionchange && me._selectionChange();
            //清除保存的选区
            me._bakRange = me._bakIERange = me._bakNativeRange = null;
            //trace:1742 setContent后gecko能得到焦点问题
            var geckoSel;
            if (browser.gecko && (geckoSel = this.selection.getNative())) {
                geckoSel.removeAllRanges();
            }
            if(me.options.autoSyncData){
                me.form && setValue(me.form,me);
            }
        },


        /**
         * 让编辑器获得焦点，toEnd确定focus位置
         * @method focus
         * @param { Boolean } toEnd 默认focus到编辑器头部，toEnd为true时focus到内容尾部
         * @example
         * ```javascript
         * editor.focus(true)
         * ```
         */
        focus: function (toEnd) {
            try {
                var me = this,
                    rng = me.selection.getRange();
                if (toEnd) {
                    var node = me.body.lastChild;
                    if(node && node.nodeType == 1 && !dtd.$empty[node.tagName]){
                        if(domUtils.isEmptyBlock(node)){
                            rng.setStartAtFirst(node)
                        }else{
                            rng.setStartAtLast(node)
                        }
                        rng.collapse(true);
                    }
                    rng.setCursor(true);
                } else {
                    if(!rng.collapsed && domUtils.isBody(rng.startContainer) && rng.startOffset == 0){

                        var node = me.body.firstChild;
                        if(node && node.nodeType == 1 && !dtd.$empty[node.tagName]){
                            rng.setStartAtFirst(node).collapse(true);
                        }
                    }

                    rng.select(true);

                }
                this.fireEvent('focus selectionchange');
            } catch (e) {
            }

        },
        isFocus:function(){
            return this.selection.isFocus();
        },
        blur:function(){
            var sel = this.selection.getNative();
            if(sel.empty && browser.ie){
                var nativeRng = document.body.createTextRange();
                nativeRng.moveToElementText(document.body);
                nativeRng.collapse(true);
                nativeRng.select();
                sel.empty()
            }else{
                sel.removeAllRanges()
            }

            //this.fireEvent('blur selectionchange');
        },
        /**
         * 初始化UE事件及部分事件代理
         * @method _initEvents
         * @private
         */
        _initEvents: function () {
            var me = this,
                doc = me.document,
                win = me.window;
            me._proxyDomEvent = utils.bind(me._proxyDomEvent, me);
            domUtils.on(doc, ['click', 'contextmenu', 'mousedown', 'keydown', 'keyup', 'keypress', 'mouseup', 'mouseover', 'mouseout', 'selectstart'], me._proxyDomEvent);
            domUtils.on(win, ['focus', 'blur'], me._proxyDomEvent);
            domUtils.on(me.body,'drop',function(e){
                //阻止ff下默认的弹出新页面打开图片
                if(browser.gecko && e.stopPropagation) { e.stopPropagation(); }
                me.fireEvent('contentchange')
            });
            domUtils.on(doc, ['mouseup', 'keydown'], function (evt) {
                //特殊键不触发selectionchange
                if (evt.type == 'keydown' && (evt.ctrlKey || evt.metaKey || evt.shiftKey || evt.altKey)) {
                    return;
                }
                if (evt.button == 2)return;
                me._selectionChange(250, evt);
            });
        },
        /**
         * 触发事件代理
         * @method _proxyDomEvent
         * @private
         * @return { * } fireEvent的返回值
         * @see UE_biz.EventBase:fireEvent(String)
         */
        _proxyDomEvent: function (evt) {
            if(this.fireEvent('before' + evt.type.replace(/^on/, '').toLowerCase()) === false){
                return false;
            }
            if(this.fireEvent(evt.type.replace(/^on/, ''), evt) === false){
                return false;
            }
            return this.fireEvent('after' + evt.type.replace(/^on/, '').toLowerCase())
        },
        /**
         * 变化选区
         * @method _selectionChange
         * @private
         */
        _selectionChange: function (delay, evt) {
            var me = this;
            var hackForMouseUp = false;
            var mouseX, mouseY;
            if (browser.ie && browser.version < 9 && evt && evt.type == 'mouseup') {
                var range = this.selection.getRange();
                if (!range.collapsed) {
                    hackForMouseUp = true;
                    mouseX = evt.clientX;
                    mouseY = evt.clientY;
                }
            }
            clearTimeout(_selectionChangeTimer);
            _selectionChangeTimer = setTimeout(function () {
                if (!me.selection || !me.selection.getNative()) {
                    return;
                }
                //修复一个IE下的bug: 鼠标点击一段已选择的文本中间时，可能在mouseup后的一段时间内取到的range是在selection的type为None下的错误值.
                //IE下如果用户是拖拽一段已选择文本，则不会触发mouseup事件，所以这里的特殊处理不会对其有影响
                var ieRange;
                if (hackForMouseUp && me.selection.getNative().type == 'None') {
                    ieRange = me.document.body.createTextRange();
                    try {
                        ieRange.moveToPoint(mouseX, mouseY);
                    } catch (ex) {
                        ieRange = null;
                    }
                }
                var bakGetIERange;
                if (ieRange) {
                    bakGetIERange = me.selection.getIERange;
                    me.selection.getIERange = function () {
                        return ieRange;
                    };
                }
                me.selection.cache();
                if (bakGetIERange) {
                    me.selection.getIERange = bakGetIERange;
                }
                if (me.selection._cachedRange && me.selection._cachedStartElement) {
                    me.fireEvent('beforeselectionchange');
                    // 第二个参数causeByUi为true代表由用户交互造成的selectionchange.
                    me.fireEvent('selectionchange', !!evt);
                    me.fireEvent('afterselectionchange');
                    me.selection.clear();
                }
            }, delay || 50);
        },

        /**
         * 执行编辑命令
         * @method _callCmdFn
         * @private
         * @param { String } fnName 函数名称
         * @param { * } args 传给命令函数的参数
         * @return { * } 返回命令函数运行的返回值
         */
        _callCmdFn: function (fnName, args) {
            var cmdName = args[0].toLowerCase(),
                cmd, cmdFn;
            cmd = this.commands[cmdName] || UE_biz.commands[cmdName];
            cmdFn = cmd && cmd[fnName];
            //没有querycommandstate或者没有command的都默认返回0
            if ((!cmd || !cmdFn) && fnName == 'queryCommandState') {
                return 0;
            } else if (cmdFn) {
                return cmdFn.apply(this, args);
            }
        },

        /**
         * 执行编辑命令cmdName，完成富文本编辑效果
         * @method execCommand
         * @param { String } cmdName 需要执行的命令
         * @remind 具体命令的使用请参考<a href="#COMMAND.LIST">命令列表</a>
         * @return { * } 返回命令函数运行的返回值
         * @example
         * ```javascript
         * editor.execCommand(cmdName);
         * ```
         */
        execCommand: function (cmdName) {
            cmdName = cmdName.toLowerCase();
            var me = this,
                result,
                cmd = me.commands[cmdName] || UE_biz.commands[cmdName];
            if (!cmd || !cmd.execCommand) {
                return null;
            }
            if (!cmd.notNeedUndo && !me.__hasEnterExecCommand) {
                me.__hasEnterExecCommand = true;
                if (me.queryCommandState.apply(me,arguments) != -1) {
                    me.fireEvent('saveScene');
                    me.fireEvent.apply(me, ['beforeexeccommand', cmdName].concat(arguments));
                    result = this._callCmdFn('execCommand', arguments);
                    me.fireEvent.apply(me, ['afterexeccommand', cmdName].concat(arguments));
                    me.fireEvent('saveScene');
                }
                me.__hasEnterExecCommand = false;
            } else {
                result = this._callCmdFn('execCommand', arguments);
                (!me.__hasEnterExecCommand && !cmd.ignoreContentChange && !me._ignoreContentChange) && me.fireEvent('contentchange')
            }
            (!me.__hasEnterExecCommand && !cmd.ignoreContentChange && !me._ignoreContentChange) && me._selectionChange();
            return result;
        },

        /**
         * 根据传入的command命令，查选编辑器当前的选区，返回命令的状态
         * @method  queryCommandState
         * @param { String } cmdName 需要查询的命令名称
         * @remind 具体命令的使用请参考<a href="#COMMAND.LIST">命令列表</a>
         * @return { Number } number 返回放前命令的状态，返回值三种情况：(-1|0|1)
         * @example
         * ```javascript
         * editor.queryCommandState(cmdName)  => (-1|0|1)
         * ```
         * @see COMMAND.LIST
         */
        queryCommandState: function (cmdName) {
            return this._callCmdFn('queryCommandState', arguments);
        },

        /**
         * 根据传入的command命令，查选编辑器当前的选区，根据命令返回相关的值
         * @method queryCommandValue
         * @param { String } cmdName 需要查询的命令名称
         * @remind 具体命令的使用请参考<a href="#COMMAND.LIST">命令列表</a>
         * @remind 只有部分插件有此方法
         * @return { * } 返回每个命令特定的当前状态值
         * @grammar editor.queryCommandValue(cmdName)  =>  {*}
         * @see COMMAND.LIST
         */
        queryCommandValue: function (cmdName) {
            return this._callCmdFn('queryCommandValue', arguments);
        },

        /**
         * 检查编辑区域中是否有内容，若包含参数tags中的节点类型，直接返回true
         * @method  hasContents
         * @param { Array } tags 传入数组判断时用到的节点类型
         * @return { Boolean } 若文档中包含tags数组里对应的tag，返回true，否则返回false
         * @example
         * ```javascript
         * editor.hasContents(['span']);
         * ```
         */
        hasContents: function (tags) {
            if (tags) {
                for (var i = 0, ci; ci = tags[i++];) {
                    if (this.document.getElementsByTagName(ci).length > 0) {
                        return true;
                    }
                }
            }
            if (!domUtils.isEmptyBlock(this.body)) {
                return true
            }
            //随时添加,定义的特殊标签如果存在，不能认为是空
            tags = ['div'];
            for (i = 0; ci = tags[i++];) {
                var nodes = domUtils.getElementsByTagName(this.document, ci);
                for (var n = 0, cn; cn = nodes[n++];) {
                    if (domUtils.isCustomeNode(cn)) {
                        return true;
                    }
                }
            }
            return false;
        },

        /**
         * 设置当前编辑区域可以编辑
         * @method setEnabled
         * @example
         * ```javascript
         * editor.setEnabled()
         * ```
         */
        setEnabled: function () {
            var me = this, range;
            if (me.body.contentEditable == 'false') {
                me.body.contentEditable = true;
                range = me.selection.getRange();
                //有可能内容丢失了
                try {
                    range.moveToBookmark(me.lastBk);
                    delete me.lastBk
                } catch (e) {
                    range.setStartAtFirst(me.body).collapse(true)
                }
                range.select(true);
                if (me.bkqueryCommandState) {
                    me.queryCommandState = me.bkqueryCommandState;
                    delete me.bkqueryCommandState;
                }
                if (me.bkqueryCommandValue) {
                    me.queryCommandValue = me.bkqueryCommandValue;
                    delete me.bkqueryCommandValue;
                }
                me.fireEvent('selectionchange');
            }
        },
        enable: function () {
            return this.setEnabled();
        },

        /** 设置当前编辑区域不可编辑,except中的命令除外
         * @method setDisabled
         * @param { Array } except 例外命令的字符串数组，数组中的命令仍然可以执行
         * @remind 即使设置了disable，此处配置的例外命令仍然可以执行
         * @example
         * ```javascript
         * editor.setDisabled(['bold','insertimage']); //禁用工具栏中除加粗和插入图片之外的所有功能
         * ```
         */
        setDisabled: function (except) {
            var me = this;
            except = except ? utils.isArray(except) ? except : [except] : [];
            if (me.body.contentEditable == 'true') {
                if (!me.lastBk) {
                    me.lastBk = me.selection.getRange().createBookmark(true);
                }
                me.body.contentEditable = false;
                me.bkqueryCommandState = me.queryCommandState;
                me.bkqueryCommandValue = me.queryCommandValue;
                me.queryCommandState = function (type) {
                    if (utils.indexOf(except, type) != -1) {
                        return me.bkqueryCommandState.apply(me, arguments);
                    }
                    return -1;
                };
                me.queryCommandValue = function (type) {
                    if (utils.indexOf(except, type) != -1) {
                        return me.bkqueryCommandValue.apply(me, arguments);
                    }
                    return null;
                };
                me.fireEvent('selectionchange');
            }
        },
        disable: function (except) {
            return this.setDisabled(except);
        },

        /**
         * 设置默认内容
         * @method _setDefaultContent
         * @private
         * @param  { String } cont 要存入的内容
         */
        _setDefaultContent: function () {
            function clear() {
                var me = this;
                if (me.document.getElementById('initContent')) {
                    me.body.innerHTML = '<p>' + (ie ? '' : '<br/>') + '</p>';
                    me.removeListener('firstBeforeExecCommand focus', clear);
                    setTimeout(function () {
                        me.focus();
                        me._selectionChange();
                    }, 0)
                }
            }

            return function (cont) {
                var me = this;
                me.body.innerHTML = '<p id="initContent">' + cont + '</p>';

                me.addListener('firstBeforeExecCommand focus', clear);
            }
        }(),

        /**
         * 显示编辑器
         * @method setShow
         * @example
         * ```javascript
         * editor.setShow()
         * ```
         */
        setShow: function () {
            var me = this, range = me.selection.getRange();
            if (me.container.style.display == 'none') {
                try {
                    range.moveToBookmark(me.lastBk);
                    delete me.lastBk
                } catch (e) {
                    range.setStartAtFirst(me.body).collapse(true)
                }
                //ie下focus实效，所以做了个延迟
                setTimeout(function () {
                    range.select(true);
                }, 100);
                me.container.style.display = '';
            }

        },
        show: function () {
            return this.setShow();
        },
        /**
         * 隐藏编辑器
         * @method setHide
         * @example
         * ```javascript
         * editor.setHide()
         * ```
         */
        setHide: function () {
            var me = this;
            if (!me.lastBk) {
                me.lastBk = me.selection.getRange().createBookmark(true);
            }
            me.container.style.display = 'none'
        },
        hide: function () {
            return this.setHide();
        },

        /**
         * 执行注册的过滤规则
         * @method  filterInputRule
         * @param { UE_biz.uNode } root 要过滤的uNode节点
         * @remind 执行editor.setContent方法和执行'inserthtml'命令后，会运行该过滤函数
         */
        filterInputRule: function (root) {
            for (var i = 0, ci; ci = this.inputRules[i++];) {
                ci.call(this, root)
            }
        },


        /**
         * 根据输出过滤规则，过滤编辑器内容
         * @method  filterOutputRule
         * @remind 执行editor.getContent方法的时候，会先运行该过滤函数
         * @param { UE_biz.uNode } root 要过滤的uNode节点
         */
        filterOutputRule: function (root) {
            for (var i = 0, ci; ci = this.outputRules[i++];) {
                ci.call(this, root)
            }
        },

        /**
         * 根据action名称获取请求的路径
         * @method  getActionUrl
         * @remind 假如没有设置serverUrl,会根据imageUrl设置默认的controller路径
         * @param { String } action action名称
         */
        getActionUrl: function(action){
            var actionName = this.getOpt(action) || action,
                imageUrl = this.getOpt('imageUrl'),
                serverUrl = this.getOpt('serverUrl');

            if(!serverUrl && imageUrl) {
                serverUrl = imageUrl.replace(/^(.*[\/]).+([\.].+)$/, '$1controller$2');
            }

            if(serverUrl) {
                serverUrl = serverUrl + (serverUrl.indexOf('?') == -1 ? '?':'&') + 'action=' + (actionName || '');
                return utils.formatUrl(serverUrl);
            } else {
                return '';
            }
        }
    };
    utils.inherits(Editor, EventBase);
})();

var globalTheme = 'biz';
// core/Editor.defaultoptions.js
//维护编辑器一下默认的不在插件中的配置项
UE_biz.Editor.defaultOptions = function(editor){
	editor.options.UEDITOR_HOME_URL = 'kingdee/bcm/bizconfigformulatext/';
    var _url = editor.options.UEDITOR_HOME_URL;
    return {
        isShow: true,
        initialContent: '',
        initialStyle:'',
        autoClearinitialContent: false,
        textarea: 'editorValue',
        focus: false,
        focusInEnd: true,
        autoClearEmptyNode: true,
        fullscreen: false,
        readonly: false,
        imagePopup: true,
        enterTag: 'p',
        customDomain: false,
        lang: 'zh-cn',
        langPath: _url + 'lang/',
        // theme: 'default',
        theme: globalTheme,
        themePath: _url + 'themes/',
        allHtmlEnabled: false,
        scaleEnabled: false,
        tableNativeEditInFF: false,
        autoSyncData : true,
        fileNameFormat: '{time}{rand:6}'
    }
};


// core/node.js
/**
 * 编辑器模拟的节点类
 * @file
 * @module UE_biz
 * @class uNode
 * @since 1.2.6.1
 */

(function () {
    /**
     * 通过一个键值对，创建一个uNode对象
     * @constructor
     * @param { Object } attr 传入要创建的uNode的初始属性
     */
    var uNode = UE_biz.uNode = function (obj) {
        this.type = obj.type;
        this.data = obj.data;
        this.tagName = obj.tagName;
        this.parentNode = obj.parentNode;
        this.attrs = obj.attrs || {};
        this.children = obj.children;
    };

    var notTransAttrs = {
        'href':1,
        'src':1,
        '_src':1,
        '_href':1,
        'cdata_data':1
    };

    var notTransTagName = {
        style:1,
        script:1
    };

    var indentChar = '    ',
        breakChar = '\n';

    function insertLine(arr, current, begin) {
        arr.push(breakChar);
        return current + (begin ? 1 : -1);
    }

    function insertIndent(arr, current) {
        //插入缩进
        for (var i = 0; i < current; i++) {
            arr.push(indentChar);
        }
    }

    //创建uNode的静态方法
    //支持标签和html
    uNode.createElement = function (html) {
        if (/[<>]/.test(html)) {
            return UE_biz.htmlparser(html).children[0]
        } else {
            return new uNode({
                type:'element',
                children:[],
                tagName:html
            })
        }
    };
    uNode.createText = function (data,noTrans) {
        return new UE_biz.uNode({
            type:'text',
            'data':noTrans ? data : utils.unhtml(data || '')
        })
    };
    function nodeToHtml(node, arr, formatter, current) {
        switch (node.type) {
            case 'root':
                for (var i = 0, ci; ci = node.children[i++];) {
                    //插入新行
                    if (formatter && ci.type == 'element' && !dtd.$inlineWithA[ci.tagName] && i > 1) {
                        insertLine(arr, current, true);
                        insertIndent(arr, current)
                    }
                    nodeToHtml(ci, arr, formatter, current)
                }
                break;
            case 'text':
                isText(node, arr);
                break;
            case 'element':
                isElement(node, arr, formatter, current);
                break;
            case 'comment':
                isComment(node, arr, formatter);
        }
        return arr;
    }

    function isText(node, arr) {
        if(node.parentNode.tagName == 'pre'){
            //源码模式下输入html标签，不能做转换处理，直接输出
            arr.push(node.data)
        }else{
            arr.push(notTransTagName[node.parentNode.tagName] ? utils.html(node.data) : node.data.replace(/[ ]{2}/g,' &nbsp;'))
        }

    }

    function isElement(node, arr, formatter, current) {
        var attrhtml = '';
        if (node.attrs) {
            attrhtml = [];
            var attrs = node.attrs;
            for (var a in attrs) {
                attrhtml.push(a + (attrs[a] !== undefined ? '="' + (notTransAttrs[a] ? utils.html(attrs[a]).replace(/["]/g, function (a) {
                   return '&quot;'
                }) : utils.unhtml(attrs[a])) + '"' : ''))
            }
            attrhtml = attrhtml.join(' ');
        }
        arr.push('<' + node.tagName +
            (attrhtml ? ' ' + attrhtml  : '') +
            (dtd.$empty[node.tagName] ? '\/' : '' ) + '>'
        );
        //插入新行
        if (formatter  &&  !dtd.$inlineWithA[node.tagName] && node.tagName != 'pre') {
            if(node.children && node.children.length){
                current = insertLine(arr, current, true);
                insertIndent(arr, current)
            }

        }
        if (node.children && node.children.length) {
            for (var i = 0, ci; ci = node.children[i++];) {
                if (formatter && ci.type == 'element' &&  !dtd.$inlineWithA[ci.tagName] && i > 1) {
                    insertLine(arr, current);
                    insertIndent(arr, current)
                }
                nodeToHtml(ci, arr, formatter, current)
            }
        }
        if (!dtd.$empty[node.tagName]) {
            if (formatter && !dtd.$inlineWithA[node.tagName]  && node.tagName != 'pre') {

                if(node.children && node.children.length){
                    current = insertLine(arr, current);
                    insertIndent(arr, current)
                }
            }
            arr.push('<\/' + node.tagName + '>');
        }

    }

    function isComment(node, arr) {
        arr.push('<!--' + node.data + '-->');
    }

    function getNodeById(root, id) {
        var node;
        if (root.type == 'element' && root.getAttr('id') == id) {
            return root;
        }
        if (root.children && root.children.length) {
            for (var i = 0, ci; ci = root.children[i++];) {
                if (node = getNodeById(ci, id)) {
                    return node;
                }
            }
        }
    }

    function getNodesByTagName(node, tagName, arr) {
        if (node.type == 'element' && node.tagName == tagName) {
            arr.push(node);
        }
        if (node.children && node.children.length) {
            for (var i = 0, ci; ci = node.children[i++];) {
                getNodesByTagName(ci, tagName, arr)
            }
        }
    }
    function nodeTraversal(root,fn){
        if(root.children && root.children.length){
            for(var i= 0,ci;ci=root.children[i];){
                nodeTraversal(ci,fn);
                //ci被替换的情况，这里就不再走 fn了
                if(ci.parentNode ){
                    if(ci.children && ci.children.length){
                        fn(ci)
                    }
                    if(ci.parentNode) i++
                }
            }
        }else{
            fn(root)
        }

    }
    uNode.prototype = {
        /**
         * 当前节点对象，转换成html文本
         * @method toHtml
         * @param { Boolean } formatter 是否格式化返回值
         * @return { String } 返回转换后的html字符串
         * @example
         * ```javascript
         * node.toHtml( true );
         * ```
         */
        toHtml:function (formatter) {
            var arr = [];
            nodeToHtml(this, arr, formatter, 0);
            return arr.join('')
        },

        /**
         * 设置节点的html内容
         * @method innerHTML
         * @warning 假如节点的type不是'element'，或节点的标签名称不在dtd列表里，直接返回当前节点
         * @param { String } htmlstr 传入要设置的html内容
         * @return { UE_biz.uNode } 返回节点本身
         */
        innerHTML:function (htmlstr) {
            if (this.type != 'element' || dtd.$empty[this.tagName]) {
                return this;
            }
            if (utils.isString(htmlstr)) {
                if(this.children){
                    for (var i = 0, ci; ci = this.children[i++];) {
                        ci.parentNode = null;
                    }
                }
                this.children = [];
                var tmpRoot = UE_biz.htmlparser(htmlstr);
                for (var i = 0, ci; ci = tmpRoot.children[i++];) {
                    this.children.push(ci);
                    ci.parentNode = this;
                }
                return this;
            } else {
                var tmpRoot = new UE_biz.uNode({
                    type:'root',
                    children:this.children
                });
                return tmpRoot.toHtml();
            }
        },

        /**
         * 设置节点的纯文本内容
         * @method innerText
         * @warning 假如节点的type不是'element'，或节点的标签名称不在dtd列表里，直接返回当前节点
         * @param { String } textStr 传入要设置的文本内容
         * @return { UE_biz.uNode } 返回节点本身
         */
        innerText:function (textStr,noTrans) {
            if (this.type != 'element' || dtd.$empty[this.tagName]) {
                return this;
            }
            if (textStr) {
                if(this.children){
                    for (var i = 0, ci; ci = this.children[i++];) {
                        ci.parentNode = null;
                    }
                }
                this.children = [];
                this.appendChild(uNode.createText(textStr,noTrans));
                return this;
            } else {
                return this.toHtml().replace(/<[^>]+>/g, '');
            }
        },

        /**
         * 获取当前对象的data属性
         * @method getData
         * @return { Object } 若节点的type值是elemenet，返回空字符串，否则返回节点的data属性
         */
        getData:function () {
            if (this.type == 'element')
                return '';
            return this.data
        },

        /**
         * 获取当前节点下的第一个子节点
         * @method firstChild
         * @return { UE_biz.uNode } 返回第一个子节点
         */
        firstChild:function () {
            return this.children ? this.children[0] : null;
        },

        /**
         * 获取当前节点下的最后一个子节点
         * @method lastChild
         * @return { UE_biz.uNode } 返回最后一个子节点
         */
        lastChild:function () {
            return this.children ? this.children[this.children.length - 1] : null;
        },

        /**
         * 获取和当前节点有相同父亲节点的前一个节点
         * @method previousSibling
         * @return { UE_biz.uNode } 返回前一个节点
         */
        previousSibling : function(){
            var parent = this.parentNode;
            for (var i = 0, ci; ci = parent.children[i]; i++) {
                if (ci === this) {
                   return i == 0 ? null : parent.children[i-1];
                }
            }

        },

        /**
         * 获取和当前节点有相同父亲节点的后一个节点
         * @method nextSibling
         * @return { UE_biz.uNode } 返回后一个节点,找不到返回null
         */
        nextSibling : function(){
            var parent = this.parentNode;
            for (var i = 0, ci; ci = parent.children[i++];) {
                if (ci === this) {
                    return parent.children[i];
                }
            }
        },

        /**
         * 用新的节点替换当前节点
         * @method replaceChild
         * @param { UE_biz.uNode } target 要替换成该节点参数
         * @param { UE_biz.uNode } source 要被替换掉的节点
         * @return { UE_biz.uNode } 返回替换之后的节点对象
         */
        replaceChild:function (target, source) {
            if (this.children) {
                if(target.parentNode){
                    target.parentNode.removeChild(target);
                }
                for (var i = 0, ci; ci = this.children[i]; i++) {
                    if (ci === source) {
                        this.children.splice(i, 1, target);
                        source.parentNode = null;
                        target.parentNode = this;
                        return target;
                    }
                }
            }
        },

        /**
         * 在节点的子节点列表最后位置插入一个节点
         * @method appendChild
         * @param { UE_biz.uNode } node 要插入的节点
         * @return { UE_biz.uNode } 返回刚插入的子节点
         */
        appendChild:function (node) {
            if (this.type == 'root' || (this.type == 'element' && !dtd.$empty[this.tagName])) {
                if (!this.children) {
                    this.children = []
                }
                if(node.parentNode){
                    node.parentNode.removeChild(node);
                }
                for (var i = 0, ci; ci = this.children[i]; i++) {
                    if (ci === node) {
                        this.children.splice(i, 1);
                        break;
                    }
                }
                this.children.push(node);
                node.parentNode = this;
                return node;
            }


        },

        /**
         * 在传入节点的前面插入一个节点
         * @method insertBefore
         * @param { UE_biz.uNode } target 要插入的节点
         * @param { UE_biz.uNode } source 在该参数节点前面插入
         * @return { UE_biz.uNode } 返回刚插入的子节点
         */
        insertBefore:function (target, source) {
            if (this.children) {
                if(target.parentNode){
                    target.parentNode.removeChild(target);
                }
                for (var i = 0, ci; ci = this.children[i]; i++) {
                    if (ci === source) {
                        this.children.splice(i, 0, target);
                        target.parentNode = this;
                        return target;
                    }
                }

            }
        },

        /**
         * 在传入节点的后面插入一个节点
         * @method insertAfter
         * @param { UE_biz.uNode } target 要插入的节点
         * @param { UE_biz.uNode } source 在该参数节点后面插入
         * @return { UE_biz.uNode } 返回刚插入的子节点
         */
        insertAfter:function (target, source) {
            if (this.children) {
                if(target.parentNode){
                    target.parentNode.removeChild(target);
                }
                for (var i = 0, ci; ci = this.children[i]; i++) {
                    if (ci === source) {
                        this.children.splice(i + 1, 0, target);
                        target.parentNode = this;
                        return target;
                    }

                }
            }
        },

        /**
         * 从当前节点的子节点列表中，移除节点
         * @method removeChild
         * @param { UE_biz.uNode } node 要移除的节点引用
         * @param { Boolean } keepChildren 是否保留移除节点的子节点，若传入true，自动把移除节点的子节点插入到移除的位置
         * @return { * } 返回刚移除的子节点
         */
        removeChild:function (node,keepChildren) {
            if (this.children) {
                for (var i = 0, ci; ci = this.children[i]; i++) {
                    if (ci === node) {
                        this.children.splice(i, 1);
                        ci.parentNode = null;
                        if(keepChildren && ci.children && ci.children.length){
                            for(var j= 0,cj;cj=ci.children[j];j++){
                                this.children.splice(i+j,0,cj);
                                cj.parentNode = this;

                            }
                        }
                        return ci;
                    }
                }
            }
        },

        /**
         * 获取当前节点所代表的元素属性，即获取attrs对象下的属性值
         * @method getAttr
         * @param { String } attrName 要获取的属性名称
         * @return { * } 返回attrs对象下的属性值
         */
        getAttr:function (attrName) {
            return this.attrs && this.attrs[attrName.toLowerCase()]
        },

        /**
         * 设置当前节点所代表的元素属性，即设置attrs对象下的属性值
         * @method setAttr
         * @param { String } attrName 要设置的属性名称
         * @param { * } attrVal 要设置的属性值，类型视设置的属性而定
         * @return { * } 返回attrs对象下的属性值
         */
        setAttr:function (attrName, attrVal) {
            if (!attrName) {
                delete this.attrs;
                return;
            }
            if(!this.attrs){
                this.attrs = {};
            }
            if (utils.isObject(attrName)) {
                for (var a in attrName) {
                    if (!attrName[a]) {
                        delete this.attrs[a]
                    } else {
                        this.attrs[a.toLowerCase()] = attrName[a];
                    }
                }
            } else {
                if (!attrVal) {
                    delete this.attrs[attrName]
                } else {
                    this.attrs[attrName.toLowerCase()] = attrVal;
                }

            }
        },

        /**
         * 获取当前节点在父节点下的位置索引
         * @method getIndex
         * @return { Number } 返回索引数值，如果没有父节点，返回-1
         */
        getIndex:function(){
            var parent = this.parentNode;
            for(var i= 0,ci;ci=parent.children[i];i++){
                if(ci === this){
                    return i;
                }
            }
            return -1;
        },

        /**
         * 在当前节点下，根据id查找节点
         * @method getNodeById
         * @param { String } id 要查找的id
         * @return { UE_biz.uNode } 返回找到的节点
         */
        getNodeById:function (id) {
            var node;
            if (this.children && this.children.length) {
                for (var i = 0, ci; ci = this.children[i++];) {
                    if (node = getNodeById(ci, id)) {
                        return node;
                    }
                }
            }
        },

        /**
         * 在当前节点下，根据元素名称查找节点列表
         * @method getNodesByTagName
         * @param { String } tagNames 要查找的元素名称
         * @return { Array } 返回找到的节点列表`
         */
        getNodesByTagName:function (tagNames) {
            tagNames = utils.trim(tagNames).replace(/[ ]{2,}/g, ' ').split(' ');
            var arr = [], me = this;
            utils.each(tagNames, function (tagName) {
                if (me.children && me.children.length) {
                    for (var i = 0, ci; ci = me.children[i++];) {
                        getNodesByTagName(ci, tagName, arr)
                    }
                }
            });
            return arr;
        },

        /**
         * 根据样式名称，获取节点的样式值
         * @method getStyle
         * @param { String } name 要获取的样式名称
         * @return { String } 返回样式值
         */
        getStyle:function (name) {
            var cssStyle = this.getAttr('style');
            if (!cssStyle) {
                return ''
            }
            var reg = new RegExp('(^|;)\\s*' + name + ':([^;]+)','i');
            var match = cssStyle.match(reg);
            if (match && match[0]) {
                return match[2]
            }
            return '';
        },

        /**
         * 给节点设置样式
         * @method setStyle
         * @param { String } name 要设置的的样式名称
         * @param { String } val 要设置的的样值
         */
        setStyle:function (name, val) {
            function exec(name, val) {
                var reg = new RegExp('(^|;)\\s*' + name + ':([^;]+;?)', 'gi');
                cssStyle = cssStyle.replace(reg, '$1');
                if (val) {
                    cssStyle = name + ':' + utils.unhtml(val) + ';' + cssStyle
                }

            }

            var cssStyle = this.getAttr('style');
            if (!cssStyle) {
                cssStyle = '';
            }
            if (utils.isObject(name)) {
                for (var a in name) {
                    exec(a, name[a])
                }
            } else {
                exec(name, val)
            }
            this.setAttr('style', utils.trim(cssStyle))
        },

        /**
         * 传入一个函数，递归遍历当前节点下的所有节点
         * @method traversal
         * @param { Function } fn 遍历到节点的时，传入节点作为参数，运行此函数
         */
        traversal:function(fn){
            if(this.children && this.children.length){
                nodeTraversal(this,fn);
            }
            return this;
        }
    }
})();


// core/htmlparser.js
/**
 * html字符串转换成uNode节点的静态方法
 * @method htmlparser
 * @param { String } htmlstr 要转换的html代码
 * @param { Boolean } ignoreBlank 若设置为true，转换的时候忽略\n\r\t等空白字符
 * @return { uNode } 给定的html片段转换形成的uNode对象
 */

var htmlparser = UE_biz.htmlparser = function (htmlstr,ignoreBlank) {
    var re_tag = /<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)-->)|(?:([^\s\/<>]+)\s*((?:(?:"[^"]*")|(?:'[^']*')|[^"'<>])*)\/?>))/g,
        re_attr = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g;

    //ie下取得的html可能会有\n存在，要去掉，在处理replace(/[\t\r\n]*/g,'');代码高量的\n不能去除
    var allowEmptyTags = {
        b:1,code:1,i:1,u:1,strike:1,s:1,tt:1,strong:1,q:1,samp:1,em:1,span:1,
        sub:1,img:1,sup:1,font:1,big:1,small:1,iframe:1,a:1,br:1,pre:1
    };
    htmlstr = htmlstr.replace(new RegExp(domUtils.fillChar, 'g'), '');
    if(!ignoreBlank){
        htmlstr = htmlstr.replace(new RegExp('[\\r\\t\\n'+(ignoreBlank?'':' ')+']*<\/?(\\w+)\\s*(?:[^>]*)>[\\r\\t\\n'+(ignoreBlank?'':' ')+']*','g'), function(a,b){
            //br暂时单独处理
            if(b && allowEmptyTags[b.toLowerCase()]){
                return a.replace(/(^[\n\r]+)|([\n\r]+$)/g,'');
            }
            return a.replace(new RegExp('^[\\r\\n'+(ignoreBlank?'':' ')+']+'),'').replace(new RegExp('[\\r\\n'+(ignoreBlank?'':' ')+']+$'),'');
        });
    }

    var notTransAttrs = {
        'href':1,
        'src':1
    };

    var uNode = UE_biz.uNode

    function element(parent, tagName, htmlattr) {
        //按dtd处理嵌套
        var elm = new uNode({
            parentNode:parent,
            type:'element',
            tagName:tagName.toLowerCase(),
            //是自闭合的处理一下
            children:dtd.$empty[tagName] ? null : []
        });
        //如果属性存在，处理属性
        if (htmlattr) {
            var attrs = {}, match;
            while (match = re_attr.exec(htmlattr)) {
                attrs[match[1].toLowerCase()] = notTransAttrs[match[1].toLowerCase()] ? (match[2] || match[3] || match[4]) : utils.unhtml(match[2] || match[3] || match[4])
            }
            elm.attrs = attrs;
        }
        parent.children.push(elm);
        //如果是自闭合节点返回父亲节点
        return  dtd.$empty[tagName] ? parent : elm
    }

    function comment(parent, data) {
        parent.children.push(new uNode({
            type:'comment',
            data:data,
            parentNode:parent
        }));
    }

    var match, currentIndex = 0, nextIndex = 0;
    //设置根节点
    var root = new uNode({
        type:'root',
        children:[]
    });
    var currentParent = root;

    while (match = re_tag.exec(htmlstr)) {
        currentIndex = match.index;
        try{
            if (currentIndex > nextIndex) {
                //text node
                text(currentParent, htmlstr.slice(nextIndex, currentIndex));
            }
            if (match[3]) {

                if(dtd.$cdata[currentParent.tagName]){
                    text(currentParent, match[0]);
                }else{
                    //start tag
                    currentParent = element(currentParent, match[3].toLowerCase(), match[4]);
                }


            } else if (match[1]) {
                if(currentParent.type != 'root'){
                    if(dtd.$cdata[currentParent.tagName] && !dtd.$cdata[match[1]]){
                        text(currentParent, match[0]);
                    }else{
                        var tmpParent = currentParent;
                        while(currentParent.type == 'element' && currentParent.tagName != match[1].toLowerCase()){
                            currentParent = currentParent.parentNode;
                            if(currentParent.type == 'root'){
                                currentParent = tmpParent;
                                throw 'break'
                            }
                        }
                        //end tag
                        currentParent = currentParent.parentNode;
                    }

                }

            } else if (match[2]) {
                //comment
                comment(currentParent, match[2])
            }
        }catch(e){}

        nextIndex = re_tag.lastIndex;

    }
    //如果结束是文本，就有可能丢掉，所以这里手动判断一下
    //例如 <li>sdfsdfsdf<li>sdfsdfsdfsdf
    if (nextIndex < htmlstr.length) {
        text(currentParent, htmlstr.slice(nextIndex));
    }
    return root;
};



// core/keymap.js
var keymap = UE_biz.keymap  = {
    'Backspace' : 8,
    'Tab' : 9,
    'Enter' : 13,

    'Shift':16,
    'Control':17,
    'Alt':18,
    'CapsLock':20,

    'Esc':27,

    'Spacebar':32,

    'PageUp':33,
    'PageDown':34,
    'End':35,
    'Home':36,

    'Left':37,
    'Up':38,
    'Right':39,
    'Down':40,

    'Insert':45,

    'Del':46,

    'NumLock':144,

    'Cmd':91,

    '=':187,
    '-':189,

    "b":66,
    'i':73,
    //回退
    'z':90,
    'y':89,
    //粘贴
    'v' : 86,
    'x' : 88,

    's' : 83,

    'n' : 78
};


(function () {

    var ROOTKEY = 'ueditor_preference';

    UE_biz.Editor.prototype.setPreferences = function(key,value){
        var obj = {};
        if (utils.isString(key)) {
            obj[ key ] = value;
        } else {
            obj = key;
        }
        var data = LocalStorage.getLocalData(ROOTKEY);
        if (data && (data = utils.str2json(data))) {
            utils.extend(data, obj);
        } else {
            data = obj;
        }
        data && LocalStorage.saveLocalData(ROOTKEY, utils.json2str(data));
    };

    UE_biz.Editor.prototype.getPreferences = function(key){
        var data = LocalStorage.getLocalData(ROOTKEY);
        if (data && (data = utils.str2json(data))) {
            return key ? data[key] : data
        }
        return null;
    };

    UE_biz.Editor.prototype.removePreferences = function (key) {
        var data = LocalStorage.getLocalData(ROOTKEY);
        if (data && (data = utils.str2json(data))) {
            data[key] = undefined;
            delete data[key]
        }
        data && LocalStorage.saveLocalData(ROOTKEY, utils.json2str(data));
    };

})();

// plugins/inserthtml.js
/**
 * 插入html代码
 * @command inserthtml
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @param { String } html 插入的html字符串
 * @remaind 插入的标签内容是在当前的选区位置上插入，如果当前是闭合状态，那直接插入内容， 如果当前是选中状态，将先清除当前选中内容后，再做插入
 * @warning 注意:该命令会对当前选区的位置，对插入的内容进行过滤转换处理。 过滤的规则遵循html语意化的原则。
 * ```
 */

UE_biz.commands['inserthtml'] = {
    execCommand: function (command,html,notNeedFilter){
        var me = this,
            range,
            div;
        if(!html){
            return;
        }
        if(me.fireEvent('beforeinserthtml',html) === true){
            return;
        }
        range = me.selection.getRange();
        div = range.document.createElement( 'div' );
        div.style.display = 'inline';

        if (!notNeedFilter) {
            var root = UE_biz.htmlparser(html);
            //如果给了过滤规则就先进行过滤
            if(me.options.filterRules){
                UE_biz.filterNode(root,me.options.filterRules);
            }
            //执行默认的处理
            me.filterInputRule(root);
            html = root.toHtml()
        }
        div.innerHTML = utils.trim( html );

        if ( !range.collapsed ) {
            var tmpNode = range.startContainer;
            if(domUtils.isFillChar(tmpNode)){
                range.setStartBefore(tmpNode)
            }
            tmpNode = range.endContainer;
            if(domUtils.isFillChar(tmpNode)){
                range.setEndAfter(tmpNode)
            }
            range.txtToElmBoundary();
            //结束边界可能放到了br的前边，要把br包含进来
            // x[xxx]<br/>
            if(range.endContainer && range.endContainer.nodeType == 1){
                tmpNode = range.endContainer.childNodes[range.endOffset];
                if(tmpNode && domUtils.isBr(tmpNode)){
                    range.setEndAfter(tmpNode);
                }
            }
            if(range.startOffset == 0){
                tmpNode = range.startContainer;
                if(domUtils.isBoundaryNode(tmpNode,'firstChild') ){
                    tmpNode = range.endContainer;
                    if(range.endOffset == (tmpNode.nodeType == 3 ? tmpNode.nodeValue.length : tmpNode.childNodes.length) && domUtils.isBoundaryNode(tmpNode,'lastChild')){
                        me.body.innerHTML = '<p>'+(browser.ie ? '' : '<br/>')+'</p>';
                        range.setStart(me.body.firstChild,0).collapse(true)

                    }
                }
            }
            !range.collapsed && range.deleteContents();
            if(range.startContainer.nodeType == 1){
                var child = range.startContainer.childNodes[range.startOffset],pre;
                if(child && domUtils.isBlockElm(child) && (pre = child.previousSibling) && domUtils.isBlockElm(pre)){
                    range.setEnd(pre,pre.childNodes.length).collapse();
                    while(child.firstChild){
                        pre.appendChild(child.firstChild);
                    }
                    domUtils.remove(child);
                }
            }

        }


        var child,parent,pre,tmp,hadBreak = 0, nextNode;
        //如果当前位置选中了fillchar要干掉，要不会产生空行
        if(range.inFillChar()){
            child = range.startContainer;
            if(domUtils.isFillChar(child)){
                range.setStartBefore(child).collapse(true);
                domUtils.remove(child);
            }else if(domUtils.isFillChar(child,true)){
                child.nodeValue = child.nodeValue.replace(fillCharReg,'');
                range.startOffset--;
                range.collapsed && range.collapse(true)
            }
        }
        //列表单独处理
        var li = domUtils.findParentByTagName(range.startContainer,'li',true);
            while ( child = div.firstChild ) {
                if(hadBreak){
                    var p = me.document.createElement('p');
                    while(child && (child.nodeType == 3 || !dtd.$block[child.tagName])){
                        nextNode = child.nextSibling;
                        p.appendChild(child);
                        child = nextNode;
                    }
                    if(p.firstChild){

                        child = p
                    }
                }
                range.insertNode( child );
                nextNode = child.nextSibling;
                if ( !hadBreak && child.nodeType == domUtils.NODE_ELEMENT && domUtils.isBlockElm( child ) ){

                    parent = domUtils.findParent( child,function ( node ){ return domUtils.isBlockElm( node ); } );
                    if ( parent && parent.tagName.toLowerCase() != 'body' && !(dtd[parent.tagName][child.nodeName] && child.parentNode === parent)){
                        if(!dtd[parent.tagName][child.nodeName]){
                            pre = parent;
                        }else{
                            tmp = child.parentNode;
                            while (tmp !== parent){
                                pre = tmp;
                                tmp = tmp.parentNode;

                            }
                        }


                        domUtils.breakParent( child, pre || tmp );
                        //去掉break后前一个多余的节点  <p>|<[p> ==> <p></p><div></div><p>|</p>
                        var pre = child.previousSibling;
                        domUtils.trimWhiteTextNode(pre);
                        if(!pre.childNodes.length){
                            domUtils.remove(pre);
                        }
                        //trace:2012,在非ie的情况，切开后剩下的节点有可能不能点入光标添加br占位

                        if(!browser.ie &&
                            (next = child.nextSibling) &&
                            domUtils.isBlockElm(next) &&
                            next.lastChild &&
                            !domUtils.isBr(next.lastChild)){
                            next.appendChild(me.document.createElement('br'));
                        }
                        hadBreak = 1;
                    }
                }
                var next = child.nextSibling;
                if(!div.firstChild && next && domUtils.isBlockElm(next)){

                    range.setStart(next,0).collapse(true);
                    break;
                }
                range.setEndAfter( child ).collapse();

            }

            child = range.startContainer;

            if(nextNode && domUtils.isBr(nextNode)){
                domUtils.remove(nextNode)
            }
            //用chrome可能有空白展位符
            if(domUtils.isBlockElm(child) && domUtils.isEmptyNode(child)){
                if(nextNode = child.nextSibling){
                    domUtils.remove(child);
                    if(nextNode.nodeType == 1 && dtd.$block[nextNode.tagName]){

                        range.setStart(nextNode,0).collapse(true).shrinkBoundary()
                    }
                }else{

                    try{
                        child.innerHTML = browser.ie ? domUtils.fillChar : '<br/>';
                    }catch(e){
                        range.setStartBefore(child);
                        domUtils.remove(child)
                    }

                }

            }
            //加上true因为在删除表情等时会删两次，第一次是删的fillData
            try{
                range.select(true);
            }catch(e){}

        setTimeout(function(){
            range = me.selection.getRange();
            range.scrollToView(me.autoHeightEnabled,me.autoHeightEnabled ? domUtils.getXY(me.iframe).y:0);
            me.fireEvent('afterinserthtml', html);
        },200);
    }
};


// plugins/iframe.js
UE_biz.plugins['insertframe'] = function() {
   var me =this;
    function deleteIframe(){
        me._iframe && delete me._iframe;
    }

    me.addListener("selectionchange",function(){
        deleteIframe();
    });

};





// plugins/selectall.js
/**
 * 选中所有内容
 * @command selectall
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @example
 * ```javascript
 * editor.execCommand( 'selectall' );
 * ```
 */
UE_biz.plugins['selectall'] = function(){
    var me = this;
    me.commands['selectall'] = {
        execCommand : function(){
            //去掉了原生的selectAll,因为会出现报错和当内容为空时，不能出现闭合状态的光标
            var me = this,body = me.body,
                range = me.selection.getRange();
            range.selectNodeContents(body);
            if(domUtils.isEmptyBlock(body)){
                //opera不能自动合并到元素的里边，要手动处理一下
                if(browser.opera && body.firstChild && body.firstChild.nodeType == 1){
                    range.setStartAtFirst(body.firstChild);
                }
                range.collapse(true);
            }
            range.select(true);
        },
        notNeedUndo : 1
    };
};

// ui/ui.js
var baidu = baidu || {};
baidu.editor = baidu.editor || {};
UE_biz.ui = baidu.editor.ui = {};

// ui/uiutils.js
(function (){
    var browser = baidu.editor.browser,
        domUtils = baidu.editor.dom.domUtils;

    var magic = '$EDITORUI_biz';
    var root = window[magic] = {};
    var uidMagic = 'ID' + magic;
    var uidCount = 0;

    var uiUtils = baidu.editor.ui.uiUtils = {
        uid: function (obj){
            return (obj ? obj[uidMagic] || (obj[uidMagic] = ++ uidCount) : ++ uidCount);
        },
        hook: function ( fn, callback ) {
            var dg;
            if (fn && fn._callbacks) {
                dg = fn;
            } else {
                dg = function (){
                    var q;
                    if (fn) {
                        q = fn.apply(this, arguments);
                    }
                    var callbacks = dg._callbacks;
                    var k = callbacks.length;
                    while (k --) {
                        var r = callbacks[k].apply(this, arguments);
                        if (q === undefined) {
                            q = r;
                        }
                    }
                    return q;
                };
                dg._callbacks = [];
            }
            dg._callbacks.push(callback);
            return dg;
        },
        createElementByHtml: function (html){
            var el = document.createElement('div');
            el.innerHTML = html;
            el = el.firstChild;
            el.parentNode.removeChild(el);
            return el;
        },
        getViewportElement: function (){
            return (browser.ie && browser.quirks) ?
                document.body : document.documentElement;
        },
        getClientRect: function (element){
            var bcr;
            try{
                bcr = element.getBoundingClientRect();
            }catch(e){
                bcr={left:0,top:0,height:0,width:0}
            }
            var rect = {
                left: Math.round(bcr.left),
                top: Math.round(bcr.top),
                height: Math.round(bcr.bottom - bcr.top),
                width: Math.round(bcr.right - bcr.left)
            };
            var doc;
            while ((doc = element.ownerDocument) !== document &&
                (element = domUtils.getWindow(doc).frameElement)) {
                bcr = element.getBoundingClientRect();
                rect.left += bcr.left;
                rect.top += bcr.top;
            }
            rect.bottom = rect.top + rect.height;
            rect.right = rect.left + rect.width;
            return rect;
        },
        getViewportRect: function (){
            var viewportEl = uiUtils.getViewportElement();
            var width = (window.innerWidth || viewportEl.clientWidth) | 0;
            var height = (window.innerHeight ||viewportEl.clientHeight) | 0;
            return {
                left: 0,
                top: 0,
                height: height,
                width: width,
                bottom: height,
                right: width
            };
        },
        setViewportOffset: function (element, offset){
            var rect;
            var fixedLayer = uiUtils.getFixedLayer();
            if (element.parentNode === fixedLayer) {
                element.style.left = offset.left + 'px';
                element.style.top = offset.top + 'px';
            } else {
                domUtils.setViewportOffset(element, offset);
            }
        },
        getEventOffset: function (evt){
            var el = evt.target || evt.srcElement;
            var rect = uiUtils.getClientRect(el);
            var offset = uiUtils.getViewportOffsetByEvent(evt);
            return {
                left: offset.left - rect.left,
                top: offset.top - rect.top
            };
        },
        getViewportOffsetByEvent: function (evt){
            var el = evt.target || evt.srcElement;
            var frameEl = domUtils.getWindow(el).frameElement;
            var offset = {
                left: evt.clientX,
                top: evt.clientY
            };
            if (frameEl && el.ownerDocument !== document) {
                var rect = uiUtils.getClientRect(frameEl);
                offset.left += rect.left;
                offset.top += rect.top;
            }
            return offset;
        },
        setGlobal: function (id, obj){
            root[id] = obj;
            return magic + '["' + id  + '"]';
        },
        unsetGlobal: function (id){
            delete root[id];
        },
        copyAttributes: function (tgt, src){
            var attributes = src.attributes;
            var k = attributes.length;
            while (k --) {
                var attrNode = attributes[k];
                if ( attrNode.nodeName != 'style' && attrNode.nodeName != 'class' && (!browser.ie || attrNode.specified) ) {
                    tgt.setAttribute(attrNode.nodeName, attrNode.nodeValue);
                }
            }
            if (src.className) {
                domUtils.addClass(tgt,src.className);
            }
            if (src.style.cssText) {
                tgt.style.cssText += ';' + src.style.cssText;
            }
        },
        contains: function (elA, elB){
            return elA && elB && (elA === elB ? false : (
                elA.contains ? elA.contains(elB) :
                    elA.compareDocumentPosition(elB) & 16
                ));
        },
        getFixedLayer: function (){
            var layer = document.getElementById('edui_fixedlayer');
            if (layer == null) {
                layer = document.createElement('div');
                layer.id = 'edui_fixedlayer';
                document.body.appendChild(layer);
                if (browser.ie && browser.version <= 8) {
                    layer.style.position = 'absolute';
                    bindFixedLayer();
                    setTimeout(updateFixedOffset);
                } else {
                    layer.style.position = 'fixed';
                }
                layer.style.left = '0';
                layer.style.top = '0';
                layer.style.width = '0';
                layer.style.height = '0';
            }
            return layer;
        }
    };
    function updateFixedOffset(){
        var layer = document.getElementById('edui_fixedlayer');
        uiUtils.setViewportOffset(layer, {
            left: 0,
            top: 0
        });
//        layer.style.display = 'none';
//        layer.style.display = 'block';

        //#trace: 1354
//        setTimeout(updateFixedOffset);
    }
    function bindFixedLayer(adjOffset){
        domUtils.on(window, 'scroll', updateFixedOffset);
        domUtils.on(window, 'resize', baidu.editor.utils.defer(updateFixedOffset, 0, true));
    }
})();


// ui/uibase.js
(function () {
    var utils = baidu.editor.utils,
        uiUtils = baidu.editor.ui.uiUtils,
        EventBase = baidu.editor.EventBase,
        UIBase = baidu.editor.ui.UIBase = function () {
        };

    UIBase.prototype = {
        className:'',
        uiName:'',
        initOptions:function (options) {
            var me = this;
            for (var k in options) {
                me[k] = options[k];
            }
            this.id = this.id || 'edui_biz' + uiUtils.uid();
        },
        initUIBase:function () {
            this._globalKey = utils.unhtml(uiUtils.setGlobal(this.id, this));
        },
        render:function (holder) {
            var html = this.renderHtml();
            var el = uiUtils.createElementByHtml(html);

            //by xuheng 给每个node添加class
            var list = domUtils.getElementsByTagName(el, "*");
            var theme = "edui-" + globalTheme;
            var layer = document.getElementById('edui_fixedlayer');
            for (var i = 0, node; node = list[i++];) {
                domUtils.addClass(node, theme);
            }
            domUtils.addClass(el, theme);
            if(layer){
                layer.className="";
                domUtils.addClass(layer,theme);
            }

            var seatEl = this.getDom();
            if (seatEl != null) {
                seatEl.parentNode.replaceChild(el, seatEl);
                uiUtils.copyAttributes(el, seatEl);
            } else {
                if (typeof holder == 'string') {
                    holder = document.getElementById(holder);
                }
                holder = holder || uiUtils.getFixedLayer();
                domUtils.addClass(holder, theme);
                holder.appendChild(el);
            }
            this.postRender();
        },
        getDom:function (name) {
            if (!name) {
                return document.getElementById(this.id);
            } else {
                return document.getElementById(this.id + '_' + name);
            }
        },
        postRender:function () {
            this.fireEvent('postrender');
        },
        getHtmlTpl:function () {
            return '';
        },
        formatHtml:function (tpl) {
            var prefix = 'edui-' + this.uiName;
            return (tpl
                .replace(/##/g, this.id)
                .replace(/%%-/g, this.uiName ? prefix + '-' : '')
                .replace(/%%/g, (this.uiName ? prefix : '') + ' ' + this.className)
                .replace(/\$\$/g, this._globalKey));
        },
        renderHtml:function () {
            return this.formatHtml(this.getHtmlTpl());
        },
        dispose:function () {
            var box = this.getDom();
            if (box) baidu.editor.dom.domUtils.remove(box);
            uiUtils.unsetGlobal(this.id);
        }
    };
    utils.inherits(UIBase, EventBase);
})();


// ui/separator.js
(function (){
    var utils = baidu.editor.utils,
        UIBase = baidu.editor.ui.UIBase,
        Separator = baidu.editor.ui.Separator = function (options){
            this.initOptions(options);
            this.initSeparator();
        };
    Separator.prototype = {
        uiName: 'separator',
        initSeparator: function (){
            this.initUIBase();
        },
        getHtmlTpl: function (){
            return '<div id="##" class="edui-box %%"></div>';
        }
    };
    utils.inherits(Separator, UIBase);

})();


// ui/stateful.js
(function (){
    var browser = baidu.editor.browser,
        domUtils = baidu.editor.dom.domUtils,
        uiUtils = baidu.editor.ui.uiUtils;
    
    var TPL_STATEFUL = 'onmousedown="$$.Stateful_onMouseDown(event, this);"' +
        ' onmouseup="$$.Stateful_onMouseUp(event, this);"' +
        ( browser.ie ? (
        ' onmouseenter="$$.Stateful_onMouseEnter(event, this);"' +
        ' onmouseleave="$$.Stateful_onMouseLeave(event, this);"' )
        : (
        ' onmouseover="$$.Stateful_onMouseOver(event, this);"' +
        ' onmouseout="$$.Stateful_onMouseOut(event, this);"' ));
    
    baidu.editor.ui.Stateful = {
        alwalysHoverable: false,
        target:null,//目标元素和this指向dom不一样
        Stateful_init: function (){
            this._Stateful_dGetHtmlTpl = this.getHtmlTpl;
            this.getHtmlTpl = this.Stateful_getHtmlTpl;
        },
        Stateful_getHtmlTpl: function (){
            var tpl = this._Stateful_dGetHtmlTpl();
            // 使用function避免$转义
            return tpl.replace(/stateful/g, function (){ return TPL_STATEFUL; });
        },
        Stateful_onMouseEnter: function (evt, el){
            this.target=el;
            if (!this.isDisabled() || this.alwalysHoverable) {
                this.addState('hover');
                this.fireEvent('over');
            }
        },
        Stateful_onMouseLeave: function (evt, el){
            if (!this.isDisabled() || this.alwalysHoverable) {
                this.removeState('hover');
                this.removeState('active');
                this.fireEvent('out');
            }
        },
        Stateful_onMouseOver: function (evt, el){
            var rel = evt.relatedTarget;
            if (!uiUtils.contains(el, rel) && el !== rel) {
                this.Stateful_onMouseEnter(evt, el);
            }
        },
        Stateful_onMouseOut: function (evt, el){
            var rel = evt.relatedTarget;
            if (!uiUtils.contains(el, rel) && el !== rel) {
                this.Stateful_onMouseLeave(evt, el);
            }
        },
        Stateful_onMouseDown: function (evt, el){
            if (!this.isDisabled()) {
                this.addState('active');
            }
        },
        Stateful_onMouseUp: function (evt, el){
            if (!this.isDisabled()) {
                this.removeState('active');
            }
        },
        Stateful_postRender: function (){
            if (this.disabled && !this.hasState('disabled')) {
                this.addState('disabled');
            }
        },
        hasState: function (state){
            return domUtils.hasClass(this.getStateDom(), 'edui-state-' + state);
        },
        addState: function (state){
            if (!this.hasState(state)) {
                this.getStateDom().className += ' edui-state-' + state;
            }
        },
        removeState: function (state){
            if (this.hasState(state)) {
                domUtils.removeClasses(this.getStateDom(), ['edui-state-' + state]);
            }
        },
        getStateDom: function (){
            return this.getDom('state');
        },
        isChecked: function (){
            return this.hasState('checked');
        },
        setChecked: function (checked){
            if (!this.isDisabled() && checked) {
                this.addState('checked');
            } else {
                this.removeState('checked');
            }
        },
        isDisabled: function (){
            return this.hasState('disabled');
        },
        setDisabled: function (disabled){
            if (disabled) {
                this.removeState('hover');
                this.removeState('checked');
                this.removeState('active');
                this.addState('disabled');
            } else {
                this.removeState('disabled');
            }
        }
    };
})();


// ui/button.js
///import core
///import uicore
///import ui/stateful.js
(function (){
    var utils = baidu.editor.utils,
        UIBase = baidu.editor.ui.UIBase,
        Stateful = baidu.editor.ui.Stateful,
        Button = baidu.editor.ui.Button = function (options){
            if(options.name){
                var btnName = options.name;
                var cssRules = options.cssRules;
				var hori = 0;
				var vert = 0;
				var className = '';
				if ('v'===btnName){
                    hori = 150;
                    vert = 30;
					className = 'v';
				}else if ('+'===btnName){
					hori = 30;
					vert = 60;
					className = 'plus';
				}else if ('-'===btnName){
					hori = 60;
					vert = 60;
					className = 'sub';
				}else if ('*'===btnName){
					hori = 0;
					vert = 30;
					className = 'mul';
				}else if ('/'===btnName){
					hori = 90;
					vert = 60;
					className = 'divide';
				}else if ('('===btnName){
					hori = 120;
					vert = 60;
					className = 'left';
				}else if (')'===btnName){
					hori = 150;
					vert = 60;
					className = 'right';
				}else if ('='===btnName){
					hori = 60;
					vert = 90;
					className = 'equal';
				}else if ('abs'===btnName){
					hori = 90;
					className = 'abs';
				}else if ('round'===btnName){
					hori =0;
					className = 'round';
				}else if ('rate'===btnName){
					hori = 120;
					vert = 30;
					className = 'getRate';
				}else if ('esp'===btnName){
					hori = 90;
					vert = 30;
					className = 'esp';
				}else if ('if'===btnName){
					hori =60;
					className = 'if';
				}
				cssRules ='background-position: '+hori+'px '+vert+'px;';
                if(!options.className){
                    options.className =  'edui-for-' + className;
                }
                options.cssRules = '.edui-'+globalTheme+' .edui-for-'+ className +' .edui-icon {'+ cssRules +'}'
            }
            this.initOptions(options);
            this.initButton();
        };
    Button.prototype = {
        uiName: 'button',
        label: '',
        title: '',
        showIcon: true,
        showText: true,
        cssRules:'',
        initButton: function (){
            this.initUIBase();
            this.Stateful_init();
            if(this.cssRules){
                utils.cssRule('edui_biz-customize-'+this.name+'-style',this.cssRules);
            }
        },
        getHtmlTpl: function (){
            return '<div id="##" class="edui-box %%">' +
                '<div id="##_state" stateful>' +
                 '<div class="%%-wrap"><div id="##_body" unselectable="on" ' + (this.title ? 'title="' + this.title + '"' : '') +
                 ' class="%%-body" onmousedown="return $$._onMouseDown(event, this);" onclick="return $$._onClick(event, this);">' +
                  (this.showIcon ? '<div class="edui-box edui-icon"></div>' : '') +
                  (this.showText ? '<div class="edui-box edui-label">' + this.label + '</div>' : '') +
                 '</div>' +
                '</div>' +
                '</div></div>';
        },
        postRender: function (){
            this.Stateful_postRender();
            this.setDisabled(this.disabled)
        },
        _onMouseDown: function (e){
            var target = e.target || e.srcElement,
                tagName = target && target.tagName && target.tagName.toLowerCase();
            if (tagName == 'input' || tagName == 'object' || tagName == 'object') {
                return false;
            }
        },
        _onClick: function (){
            if (!this.isDisabled()) {
                this.fireEvent('click');
            }
        },
        setTitle: function(text){
            var label = this.getDom('label');
            label.innerHTML = text;
        }
    };
    utils.inherits(Button, UIBase);
    utils.extend(Button.prototype, Stateful);

})();




// ui/toolbar.js
(function (){
    var utils = baidu.editor.utils,
        uiUtils = baidu.editor.ui.uiUtils,
        UIBase = baidu.editor.ui.UIBase,
        Toolbar = baidu.editor.ui.Toolbar = function (options){
            this.initOptions(options);
            this.initToolbar();
        };
    Toolbar.prototype = {
        items: null,
        initToolbar: function (){
            this.items = this.items || [];
            this.initUIBase();
        },
        add: function (item,index){
            if(index === undefined){
                this.items.push(item);
            }else{
                this.items.splice(index,0,item)
            }

        },
        getHtmlTpl: function (){
            var buff = [];
            for (var i=0; i<this.items.length; i++) {
                buff[i] = this.items[i].renderHtml();
            }
            return '<div id="##" class="edui-toolbar %%" onselectstart="return false;" onmousedown="return $$._onMouseDown(event, this);">' +
                buff.join('') +
                '</div>'
        },
        postRender: function (){
            var box = this.getDom();
            for (var i=0; i<this.items.length; i++) {
                this.items[i].postRender();
            }
        },
        _onMouseDown: function (e){
            var target = e.target || e.srcElement,
                tagName = target && target.tagName && target.tagName.toLowerCase();
            if (tagName == 'input' || tagName == 'object' || tagName == 'object') {
                return false;
            }
        }
    };
    utils.inherits(Toolbar, UIBase);

})();




// adapter/editor.js
///import core
///commands 全屏
///commandsName FullScreen
///commandsTitle  全屏
(function () {
    var utils = baidu.editor.utils,
        uiUtils = baidu.editor.ui.uiUtils,
        UIBase = baidu.editor.ui.UIBase,
        domUtils = baidu.editor.dom.domUtils;
    var nodeStack = [];
	var kdModel;
    function EditorUI(options) {
        this.initOptions(options);
        this.initEditorUI();
    }

    EditorUI.prototype = {
        uiName:'editor',
        initEditorUI:function () {
            this.editor.ui = this;
            this._dialogs = {};
            this.initUIBase();
            this._initToolbars();
            var editor = this.editor,
                me = this;

            editor.addListener('ready', function () {
                //提供编辑器实时宽高(全屏时宽高不变化)
                editor.ui._actualFrameWidth = editor.options.initialFrameWidth;

                UE_biz.browser.ie && UE_biz.browser.version === 6 && editor.container.ownerDocument.execCommand("BackgroundImageCache", false, true);

                if (!editor.selection.isFocus())return;
                editor.fireEvent('selectionchange', false, true);
            });
			editor.addListener('keyup', function (t, evt) {
                var keyCode = evt.keyCode || evt.which,
				rng,me = this;
				if(keyCode == 8 || keyCode == 46){
					rng = me.selection.getRange();
					//处理当删除到body时，要重新给p标签展位
					if(domUtils.isBody(rng.startContainer)){
						var tmpNode = domUtils.createElement(me.document,'p',{'innerHTML' : browser.ie ? domUtils.fillChar : '<br/>'});
						rng.insertNode(tmpNode).setStart(tmpNode,0).setCursor(false,true);
					}
				}
            });
            editor.addListener('selectionchange', function () {
                if (editor.options.elementPathEnabled) {
                    me[(editor.queryCommandState('elementpath') == -1 ? 'dis' : 'en') + 'ableElementPath']()
                }
                if (editor.options.scaleEnabled) {
                    me[(editor.queryCommandState('scale') == -1 ? 'dis' : 'en') + 'ableScale']();

                }
            });
        },
        _initToolbars:function () {
            var editor = this.editor;
            var toolbars = this.toolbars || [];
            var toolbarUis = [];
            for (var i = 0; i < toolbars.length; i++) {
                var toolbar = toolbars[i];
                var toolbarUi = new baidu.editor.ui.Toolbar({theme:editor.options.theme});
                for (var j = 0; j < toolbar.length; j++) {
                    var toolbarItem = toolbar[j];
                    var toolbarItemUi = null;
                    if (typeof toolbarItem == 'string') {
                        toolbarItem = toolbarItem.toLowerCase();
                        if (baidu.editor.ui[toolbarItem]) {
                            toolbarItemUi = new baidu.editor.ui[toolbarItem](editor);
                        }
                    } else {
                        toolbarItemUi = toolbarItem;
                    }
                    if (toolbarItemUi && toolbarItemUi.id) {

                        toolbarUi.add(toolbarItemUi);
                    }
                }
                toolbarUis[i] = toolbarUi;
            }

            //接受外部定制的UI

            utils.each(UE_biz._customizeUI,function(obj,key){
                var itemUI,index;
                if(obj.id && obj.id != editor.key){
                   return false;
                }
                itemUI = obj.execFn.call(editor,editor,key);
                if(itemUI){
                    index = obj.index;
                    if(index === undefined){
                        index = toolbarUi.items.length;
                    }
                    toolbarUi.add(itemUI,index)
                }
            });

            this.toolbars = toolbarUis;
        },
        getHtmlTpl:function () {
            return '<div id="##" class="%%">' +
                '<div id="##_toolbarbox" class="%%-toolbarbox">' +
                (this.toolbars.length ?
                    '<div id="##_toolbarboxouter" class="%%-toolbarboxouter"><div class="%%-toolbarboxinner">' +
                        this.renderToolbarBoxHtml() +
                        '</div></div>' : '') +
                '<div id="##_toolbarmsg" class="%%-toolbarmsg" style="display:none;">' +
                '<div id="##_toolbarmsg_label" class="%%-toolbarmsg-label"></div>' +
                '<div style="height:0;overflow:hidden;clear:both;"></div>' +
                '</div>' +
                '<div id="##_message_holder" class="%%-messageholder"></div>' +
                '</div>' +
                '<div id="##_iframeholder" class="%%-iframeholder">' +
                '</div>' +
                '<div id="##_scalelayer"></div>' +
                '</div>';
        },
        renderToolbarBoxHtml:function () {
            var buff = [];
            for (var i = 0; i < this.toolbars.length; i++) {
                buff.push(this.toolbars[i].renderHtml());
            }
            return buff.join('');
        },
        _updateElementPath:function () {
            if (this.elementPathEnabled && (list = this.editor.queryCommandValue('elementpath'))) {
                var buff = [];
                for (var i = 0, ci; ci = list[i]; i++) {
                    buff[i] = this.formatHtml('<span unselectable="on" onclick="$$.editor.execCommand(&quot;elementpath&quot;, &quot;' + i + '&quot;);">' + ci + '</span>');
                }
            }
        }
    };
    utils.inherits(EditorUI, baidu.editor.ui.UIBase);


    var instances = {};


    UE_biz.ui.Editor = function (options) {
        var editor = new UE_biz.Editor(options);
        editor.options.editor = editor;
        utils.loadFile(document, {
            href:editor.options.themePath + editor.options.theme + "/css/ueditor.css",
            tag:"link",
            type:"text/css",
            rel:"stylesheet"
        });

        var oldRender = editor.render;
        editor.render = function (holder) {
            if (holder.constructor === String) {
                editor.key = holder;
                instances[holder] = editor;
            }
            utils.domReady(function () {
                renderUI();
                function renderUI() {
                    editor.setOpt({
                        labelMap:editor.options.labelMap 
                    });
                    new EditorUI(editor.options);
                    if (holder) {
                        if (holder.constructor === String) {
                            holder = document.getElementById(holder);
                        }
                        holder && holder.getAttribute('name') && ( editor.options.textarea = holder.getAttribute('name'));
                        if (holder && /script|textarea/ig.test(holder.tagName)) {
                            var newDiv = document.createElement('div');
                            holder.parentNode.insertBefore(newDiv, holder);
                            var cont = holder.value || holder.innerHTML;
                            editor.options.initialContent = /^[\t\r\n ]*$/.test(cont) ? editor.options.initialContent :
                                cont.replace(/>[\n\r\t]+([ ]{4})+/g, '>')
                                    .replace(/[\n\r\t]+([ ]{4})+</g, '<')
                                    .replace(/>[\n\r\t]+</g, '><');
                            holder.className && (newDiv.className = holder.className);
                            holder.style.cssText && (newDiv.style.cssText = holder.style.cssText);
                            if (/textarea/i.test(holder.tagName)) {
                                editor.textarea = holder;
                                editor.textarea.style.display = 'none';


                            } else {
                                holder.parentNode.removeChild(holder);


                            }
                            if(holder.id){
                                newDiv.id = holder.id;
                                domUtils.removeAttributes(holder,'id');
                            }
                            holder = newDiv;
                            holder.innerHTML = '';
                        }

                    }
                    domUtils.addClass(holder, "edui-" + editor.options.theme);
                    editor.ui.render(holder);
                    var opt = editor.options;
                    //给实例添加一个编辑器的容器引用
                    editor.container = editor.ui.getDom();
                    var parents = domUtils.findParents(holder,true);
                    var displays = [];
                    for(var i = 0 ,ci;ci=parents[i];i++){
                        displays[i] = ci.style.display;
                        ci.style.display = 'block'
                    }
                    if (opt.initialFrameWidth) {
                        opt.minFrameWidth = opt.initialFrameWidth;
                    } else {
                        opt.minFrameWidth = opt.initialFrameWidth = holder.offsetWidth;
                        var styleWidth = holder.style.width;
                        if(/%$/.test(styleWidth)) {
                            opt.initialFrameWidth = styleWidth;
                        }
                    }
                    if (opt.initialFrameHeight) {
                        opt.minFrameHeight = opt.initialFrameHeight;
                    } else {
                        opt.initialFrameHeight = opt.minFrameHeight = holder.offsetHeight;
                    }
                    for(var i = 0 ,ci;ci=parents[i];i++){
                        ci.style.display =  displays[i]
                    }
                    //编辑器最外容器设置了高度，会导致，编辑器不占位
                    if(holder.style.height){
                        holder.style.height = ''
                    }
                    editor.container.style.width = opt.initialFrameWidth + (/%$/.test(opt.initialFrameWidth) ? '' : 'px');
                    editor.container.style.zIndex = opt.zIndex;
                    oldRender.call(editor, editor.ui.getDom('iframeholder'));
                    editor.fireEvent("afteruiready");
                }
            })
        };
        return editor;
    };


    /**
     * @name getEditor
     * @since 1.2.4+
     * @grammar UE_biz.getEditor(id,[opt])  =>  Editor实例
     * @desc 提供一个全局的方法得到编辑器实例
     *
     * * ''id''  放置编辑器的容器id, 如果容器下的编辑器已经存在，就直接返回
     * * ''opt'' 编辑器的可选参数
     *
     */
    UE_biz.getEditor = function (id, opt,model) {		
        var editor = instances[id];
        if (!editor) {
            editor = instances[id] = new UE_biz.ui.Editor(opt);
			editor.kdModel = model;
            editor.render(id);

        }
        return editor;
    };


    UE_biz.delEditor = function (id) {
        var editor;
        if (editor = instances[id]) {
            editor.key && editor.destroy();
            delete instances[id]
        }
    };

    UE_biz.registerUI = function(uiName,fn,index,editorId){
        utils.each(uiName.split(/\s+/), function (name) {
            UE_biz._customizeUI[name] = {
                id : editorId,
                execFn:fn,
                index:index
            };
        })

    }

})();


UE_biz.registerUI('( ) + - * / = v abs round rate esp if',function(editor,uiName){
    //注册按钮执行时的command命令，使用命令默认就会带有回退操作
    editor.registerCommand(uiName,{
        execCommand:function(cmdName){
			if ("v" == cmdName){
				editor.kdModel.invoke('f(x)', '')
			}else if ("if" == cmdName){
				this.execCommand("inserthtml",'if(&nbsp;,&nbsp;,&nbsp;)&nbsp;',true);
			}else if ("and" == cmdName){
				this.execCommand("inserthtml",'and(&nbsp;,&nbsp;)&nbsp;',true);
			}else if ("or" == cmdName){
				this.execCommand("inserthtml",'or(&nbsp;,&nbsp;)&nbsp;',true);
			}else if ("abs" == cmdName){
				this.execCommand("inserthtml",'abs(&nbsp;)&nbsp;',true);
			}else if ("round" == cmdName){
				this.execCommand("inserthtml",'round(&nbsp;,2&nbsp;)&nbsp;',true);
            }else if ("rate" == cmdName){
				editor.kdModel.invoke('getRate', '')
				//this.execCommand('getRate', '');
            }else if ("esp" == cmdName){
				editor.kdModel.invoke('esp', '')
				//this.execCommand("inserthtml",'esp(&nbsp;,2&nbsp;)&nbsp;',true);
			}else{
				this.execCommand("inserthtml",cmdName+'&nbsp;',true);
			}
        }
    });

    //创建一个button
    var btn = new UE_biz.ui.Button({
        //按钮的名字
        name:uiName,
        //提示
        title:uiName,
        //点击时执行的命令
        onclick:function () {
           editor.execCommand(uiName);
        }
    });

    //当点到编辑内容上时，按钮要做的状态反射
    editor.addListener('selectionchange', function () {
        var state = editor.queryCommandState(uiName);
        if (state == -1) {
            btn.setDisabled(true);
            btn.setChecked(false);
        } else {
            btn.setDisabled(false);
            btn.setChecked(state);
        }
    });
    return btn;
});
})();
