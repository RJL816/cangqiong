'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
    var KdWtcIncDecConfig = function () {
        function KdWtcIncDecConfig(para) {
            _classCallCheck(this, KdWtcIncDecConfig);

            this.uniqueId = para.uniqueId;
            this.model = para.model;
            this.themeNum = para.themeNum;
            this.KDApi = para.KDApi;
            this.rootDom = para.model.dom;
            this.args = para.args;

            this.arrCondition = [];
            this.arrLogic = [];

            // 多语言文本
            // this.langText_log = para.KDApi.getLangMsg(this.model, 'log');

            this.dom_body = document.querySelector('body');
            this.$dom_btns = $('.wtc_incDecConfig-btns', this.rootDom);
            this.$dom_btnAnd = $('.wtc_incDecConfig-btn-and', this.rootDom);
            this.$dom_btnOr = $('.wtc_incDecConfig-btn-or', this.rootDom);
            this.$dom_btnLeft = $('.wtc_incDecConfig-btn-left', this.rootDom);
            this.$dom_btnRight = $('.wtc_incDecConfig-btn-right', this.rootDom);
            this.$dom_input = $('.wtc_incDecConfig-input', this.rootDom);
            this.$dom_radioWrap = $('.wtc_incDecConfig-radio-wrap', this.rootDom);

            this.init();
        }

        _createClass(KdWtcIncDecConfig, [{
            key: 'init',
            value: function init() {
                var $this = this;

                // 设置主题色：
                this.rootDom.style.setProperty('--themeColor', this.themeNum);

                var htmlStr = '\n                    <label><input name="wtc_incDecConfig-radio-' + this.uniqueId + '" type="radio" value="and">\u6EE1\u8DB3\u6240\u6709\u6761\u4EF6\uFF08\u5E76\u4E14\uFF09</label>\n                    <label><input name="wtc_incDecConfig-radio-' + this.uniqueId + '" type="radio" value="or">\u6EE1\u8DB3\u4EFB\u610F\u6761\u4EF6\uFF08\u6216\u8005\uFF09</label>\n                    <label><input name="wtc_incDecConfig-radio-' + this.uniqueId + '" type="radio" value="custom">\u81EA\u5B9A\u4E49\u903B\u8F91</label>\n                ';

                this.$dom_radioWrap.html(htmlStr);

                if (this.args.showType === 1) {
                    // 查看态
                    $('input[type=radio]', this.$dom_radioWrap).prop('disabled', true);

                    if (this.args.conditionType === 2) {
                        // 用户自定义
                        $('input[value=custom]', this.$dom_radioWrap).prop('checked', true);
                        $this.$dom_input.css('display', 'block');
                        $this.$dom_input.prop('contenteditable', 'false');

                        this.refreshInput(this.args.data); // 初始化文本框内容
                    } else if (this.args.conditionType === 1) {
                        // 或者
                        $('input[value=or]', this.$dom_radioWrap).prop('checked', true);
                    } else {
                        // 并且
                        $('input[value=and]', this.$dom_radioWrap).prop('checked', true);
                    }
                } else {
                    // 编辑态
                    $('input[value=and]', this.$dom_radioWrap).prop('checked', true);
                    this.$dom_radios = $('input[type=radio]', this.rootDom);

                    this.$dom_radios.on('change', function () {
                        var value = $(this).val();
                        if (value === 'custom') {
                            $this.$dom_input.css('display', 'block');
                            $this.$dom_btns.css('display', 'flex');
                        } else {
                            $this.$dom_input.css('display', 'none');
                            $this.$dom_btns.css('display', 'none');
                            $this.changeLogicType(value);
                        }
                    });

                    this.$dom_input.onpaste = function () {
                        console.log(111);
                    };

                    this.$dom_input.oncut = function () {
                        console.log(222);
                    };

                    this.$dom_btnAnd.click(function () {
                        $this.insert('and');
                        // $this.insert('base');
                    });
                    this.$dom_btnOr.click(function () {
                        $this.insert('or');
                        // $this.insert('base');
                    });
                    this.$dom_btnLeft.click(function () {
                        $this.insert('left');
                        // $this.insert('base');
                    });
                    this.$dom_btnRight.click(function () {
                        $this.insert('right');
                        // $this.insert('base');
                    });

                    //按住ctrl键进行多选，按shift键进行多选
                    var flag = true;
                    this.$dom_input.on('keydown', function (e) {
                        if (e.keyCode === 13) {
                            flag = false;
                        }
                    });
                    this.$dom_input.on('compositionstart', function () {
                        flag = false;
                    });
                    this.$dom_input.on('compositionend', function () {
                        flag = true;
                    });
                    this.$dom_input.on('input', function (e) {
                        setTimeout(function () {
                            if (flag) {
                                $this.refreshInput($this.$dom_input.text());
                            }
                        }, 0);
                    });
                }
            }
        }, {
            key: 'legalInput',
            value: function legalInput(event) {
                var allLogic = ['并且', '或者', '（', '）'];
                var selectionObj = window.getSelection();
                var rangeObj = selectionObj.getRangeAt(0);
                var container = rangeObj.commonAncestorContainer;
                for (var i = 0; i < allLogic.length; i++) {
                    var index = container.textContent.indexOf(allLogic[i]);
                    if (index !== -1) {
                        var newRange = document.createRange();
                        newRange.setStart(container, index);
                        newRange.setEnd(container, container.textContent.length);
                        // selectionObj.addRange(newRange);
                        var documentFragment = newRange.extractContents();
                        var oSpan = document.createElement('span');
                        oSpan.className = 'content-blue';
                        oSpan.appendChild(documentFragment);
                        // container.parentElement.appendChild(oSpan);
                        // this.placeCaretAtEnd(this.$dom_input[0]);

                        rangeObj.insertNode(oSpan);
                        rangeObj.setStartAfter(oSpan);
                    }
                }

                // if(allLogic.includes(container.textContent)) {
                //     rangeObj.selectNodeContents(container);
                //     var documentFragment = rangeObj.extraContents();
                // }
            }
        }, {
            key: 'changeLogicType',
            value: function changeLogicType(type) {
                this.$dom_input.empty(); // 先清空文本框

                var arrTemp = [];
                for (var i = 0; i < this.arrCondition.length; i++) {
                    type === 'and' ? arrTemp.push(this.arrCondition[i], '并且') : arrTemp.push(this.arrCondition[i], '或者');
                }
                arrTemp.pop();
                this.refreshInput(arrTemp.join(' '));
            }
        }, {
            key: 'refreshInput',
            value: function refreshInput(data) {
                var selectionObj = window.getSelection();
                var rangeObj = selectionObj.getRangeAt(0);
                var offset = rangeObj.endOffset;

                var strHtml = '';
                this.$dom_input.empty(); // 先清空文本框

                var arrTemp = data.split(' ');
                for (var i = 0; i < arrTemp.length; i++) {
                    var item = arrTemp[i].trim();

                    if (item === '并且' || item === '或者' || item === '（' || item === '）') {
                        strHtml += '<span class="content-blue">' + arrTemp[i] + '</span>';
                    } else if (item.match(/^T\d+$/g)) {
                        strHtml += '<span class="content-green">' + arrTemp[i] + '</span>';
                    } else {
                        strHtml += '<span class="content-base">' + arrTemp[i] + '</span>';
                    }

                    if (i < arrTemp.length - 1) strHtml += ' ';
                }

                this.$dom_input.html(strHtml);
                this.placeCaretAtEnd(this.$dom_input[0]);
                // this.$dom_input[0].focus();
                // selectionObj.removeAllRanges();
                // let newRange = document.createRange();
                // newRange.setStart(this.$dom_input[0], offset);
                // newRange.setEnd(this.$dom_input[0], offset);
                // selectionObj.addRange(newRange);
                // let selectionObj = window.getSelection();
                // let rangeObj = selectionObj.getRangeAt(0);
                // rangeObj.setStartAfter(this.$dom_input[0]);
            }
        }, {
            key: 'placeCaretAtEnd',
            value: function placeCaretAtEnd(el) {
                //传入光标要去的jq节点对象
                el.focus();
                if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
                    var range = document.createRange();
                    range.selectNodeContents(el);
                    range.collapse(false);
                    var sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(range);
                } else if (typeof document.body.createTextRange != "undefined") {
                    var textRange = document.body.createTextRange();
                    textRange.moveToElementText(el);
                    textRange.collapse(false);
                    textRange.select();
                }
            }
        }, {
            key: 'insert',
            value: function insert(type, content) {
                // 判断文本框是否已聚焦：
                // if(this.$dom_input[0] !== document.activeElement) {
                //     this.placeCaretAtEnd(this.$dom_input[0]);
                // }

                this.$dom_input[0].focus();
                var selectionObj = window.getSelection();
                var rangeObj = selectionObj.getRangeAt(0);
                var oSpan = document.createElement('span');

                switch (type) {
                    case 'and':
                        oSpan.className = 'content-blue';
                        oSpan.innerHTML = ' 并且 ';
                        break;
                    case 'or':
                        oSpan.className = 'content-blue';
                        oSpan.innerHTML = ' 或者 ';
                        break;
                    case 'left':
                        oSpan.className = 'content-blue';
                        oSpan.innerHTML = ' （ ';
                        break;
                    case 'right':
                        oSpan.className = 'content-blue';
                        oSpan.innerHTML = ' ） ';
                        break;
                    case 'condition':
                        oSpan.className = 'content-green';
                        oSpan.innerHTML = content;
                        break;
                    default:
                        oSpan.className = 'content-base';
                        oSpan.innerHTML = ' ';
                        break;
                }

                if (!rangeObj.collapsed) rangeObj.deleteContents();

                rangeObj.insertNode(oSpan);
                rangeObj.setStartAfter(oSpan);
            }
        }, {
            key: 'conditionChange',
            value: function conditionChange(arrCondition) {
                if (arrCondition.length === 0) return;

                if (this.arrCondition.includes(arrCondition[0])) {
                    // 删除
                    // 同步本地的条件队列：
                    for (var i = 0; i < arrCondition.length; i++) {
                        var _index = this.arrCondition.indexOf(arrCondition[i]);
                        this.arrLogic.splice(_index, 1);
                        this.arrCondition.pop();
                    }

                    // 删除文本框中的对应条件：
                    var arrTemp = this.formatCondition();
                    for (var _i = 0; _i < arrCondition.length; _i++) {
                        var _index2 = arrTemp.indexOf(arrCondition[_i]);
                        if (_index2 !== -1) {
                            if (arrTemp[_index2 + 1] && arrTemp[_index2 + 1] === '）') {
                                arrTemp.splice(_index2 - 1, 2);
                            } else {
                                arrTemp.splice(_index2, 2);
                            }
                        }
                    }

                    // 将条件的序号调整：
                    var index = 0;
                    for (var _i2 = 0; _i2 < arrTemp.length; _i2++) {
                        if (arrTemp[_i2].match(/^T\d+$/g)) {
                            arrTemp[_i2] = this.arrCondition[index];
                            index++;
                        }
                    }

                    this.refreshInput(arrTemp.join(' '));
                } else {
                    // 新增
                    var _arrTemp = this.formatCondition();
                    for (var _i3 = 0; _i3 < arrCondition.length; _i3++) {
                        this.arrCondition.push(arrCondition[_i3]);
                        this.arrLogic.push('并且');
                        _arrTemp.length === 0 ? _arrTemp.push(arrCondition[_i3]) : _arrTemp.push('并且', arrCondition[_i3]);
                        // this.insert('and');
                        // this.insert(null);
                        // this.insert('condition', arrCondition[i]);
                    }
                    this.refreshInput(_arrTemp.join(' '));
                }
            }
        }, {
            key: 'formatCondition',
            value: function formatCondition() {
                var strTemp = this.$dom_input.text();
                var arrTemp = strTemp.split(' ');
                for (var i = 0; i < arrTemp.length; i++) {
                    // 1.以条件开头
                    // 2.条件后是逻辑，再是条件，再是逻辑...
                    // 3.特殊情况：左括号在条件左边，右括号在条件右边
                    var item0 = arrTemp[i].trim();
                    var item1 = arrTemp[i + 1] && arrTemp[i + 1].trim();

                    if (item0 === '（') {
                        if (!item1 || !item1.match(/^T\d+$/g) && item1 !== '）') {
                            arrTemp.splice(i, 1);
                            i--;
                        }
                    } else if (item0 === '）') {
                        if (item1 && item1 !== '并且' && item1 !== '或者' && item1 !== '（') {
                            arrTemp.splice(i, 1);
                            i--;
                        }
                    } else if (item0 === '并且' || item0 === '或者') {
                        if (!item1 || !item1.match(/^T\d+$/g) && item1 !== '（') {
                            arrTemp.splice(i, 1);
                            i--;
                        }
                    } else if (item0.match(/^T\d+$/g)) {
                        if (item1 && item1 !== '并且' && item1 !== '或者' && item1 !== '）') {
                            arrTemp.splice(i, 1);
                            i--;
                        }
                    } else {
                        arrTemp.splice(i, 1);
                        i--;
                    }
                }

                if (arrTemp[0] && arrTemp[0] !== '（' && !arrTemp[0].match(/^T\d+$/g)) arrTemp.splice(0, 1);
                return arrTemp;
            }
        }, {
            key: 'getData',
            value: function getData() {
                this.model.invoke('getData', this.$dom_input.text());
            }
        }]);

        return KdWtcIncDecConfig;
    }();

    window.KdWtcIncDecConfig = KdWtcIncDecConfig;
})();