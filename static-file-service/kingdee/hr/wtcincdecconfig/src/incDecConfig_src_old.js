(function () {
    class KdWtcIncDecConfig {
        constructor(para) {
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

        init() {
            let $this = this;

            // 设置主题色：
            this.rootDom.style.setProperty('--themeColor', this.themeNum);

            let htmlStr = `
                    <label><input name="wtc_incDecConfig-radio-${this.uniqueId}" type="radio" value="and">满足所有条件（并且）</label>
                    <label><input name="wtc_incDecConfig-radio-${this.uniqueId}" type="radio" value="or">满足任意条件（或者）</label>
                    <label><input name="wtc_incDecConfig-radio-${this.uniqueId}" type="radio" value="custom">自定义逻辑</label>
                `;

            this.$dom_radioWrap.html(htmlStr);

            if (this.args.showType === 1) {  // 查看态
                $('input[type=radio]', this.$dom_radioWrap).prop('disabled', true);

                if (this.args.conditionType === 2) {  // 用户自定义
                    $('input[value=custom]', this.$dom_radioWrap).prop('checked', true);
                    $this.$dom_input.css('display', 'block');
                    $this.$dom_input.prop('contenteditable', 'false');

                    this.refreshInput(this.args.data);  // 初始化文本框内容
                } else if (this.args.conditionType === 1) {  // 或者
                    $('input[value=or]', this.$dom_radioWrap).prop('checked', true);
                } else {  // 并且
                    $('input[value=and]', this.$dom_radioWrap).prop('checked', true);
                }
            } else {  // 编辑态
                $('input[value=and]', this.$dom_radioWrap).prop('checked', true);
                this.$dom_radios = $('input[type=radio]', this.rootDom);

                this.$dom_radios.on('change', function () {
                    let value = $(this).val();
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
                    console.log(111)
                };

                this.$dom_input.oncut = function () {
                    console.log(222)
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
                let flag = true;
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
                            $this.refreshInput($this.$dom_input.text())
                        }
                    }, 0)
                });

            }
        }

        legalInput(event) {
            let allLogic = ['并且', '或者', '（', '）'];
            let selectionObj = window.getSelection();
            let rangeObj = selectionObj.getRangeAt(0);
            let container = rangeObj.commonAncestorContainer;
            for(let i = 0; i < allLogic.length; i++) {
                let index = container.textContent.indexOf(allLogic[i]);
                if(index !== -1) {
                    let newRange = document.createRange();
                    newRange.setStart(container, index);
                    newRange.setEnd(container, container.textContent.length);
                    // selectionObj.addRange(newRange);
                    let documentFragment = newRange.extractContents();
                    let oSpan = document.createElement('span');
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

        changeLogicType(type) {
            this.$dom_input.empty();  // 先清空文本框

            let arrTemp = [];
            for (let i = 0; i < this.arrCondition.length; i++) {
                type === 'and' ? arrTemp.push(this.arrCondition[i], '并且') : arrTemp.push(this.arrCondition[i], '或者');
            }
            arrTemp.pop();
            this.refreshInput(arrTemp.join(' '));
        }

        refreshInput(data) {
            let selectionObj = window.getSelection();
            let rangeObj = selectionObj.getRangeAt(0);
            let offset = rangeObj.endOffset;

            let strHtml = '';
            this.$dom_input.empty();  // 先清空文本框

            let arrTemp = data.split(' ');
            for (let i = 0; i < arrTemp.length; i++) {
                let item = arrTemp[i].trim();

                if(item === '并且' || item === '或者' || item === '（' || item === '）') {
                    strHtml += `<span class="content-blue">${arrTemp[i]}</span>`;
                } else if(item.match(/^T\d+$/g)) {
                    strHtml += `<span class="content-green">${arrTemp[i]}</span>`;
                } else {
                    strHtml += `<span class="content-base">${arrTemp[i]}</span>`;
                }

                if(i < arrTemp.length-1) strHtml += ' ';
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


        placeCaretAtEnd(el) { //传入光标要去的jq节点对象
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

        insert(type, content) {
            // 判断文本框是否已聚焦：
            // if(this.$dom_input[0] !== document.activeElement) {
            //     this.placeCaretAtEnd(this.$dom_input[0]);
            // }

            this.$dom_input[0].focus();
            let selectionObj = window.getSelection();
            let rangeObj = selectionObj.getRangeAt(0);
            let oSpan = document.createElement('span');

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

        conditionChange(arrCondition) {
            if (arrCondition.length === 0) return;

            if (this.arrCondition.includes(arrCondition[0])) {  // 删除
                // 同步本地的条件队列：
                for (let i = 0; i < arrCondition.length; i++) {
                    let index = this.arrCondition.indexOf(arrCondition[i]);
                    this.arrLogic.splice(index, 1);
                    this.arrCondition.pop();
                }

                // 删除文本框中的对应条件：
                let arrTemp = this.formatCondition();
                for (let i = 0; i < arrCondition.length; i++) {
                    let index = arrTemp.indexOf(arrCondition[i]);
                    if(index !== -1) {
                        if(arrTemp[index+1] && arrTemp[index+1] === '）') {
                            arrTemp.splice(index-1, 2)
                        } else {
                            arrTemp.splice(index, 2)
                        }
                    }
                }

                // 将条件的序号调整：
                let index = 0;
                for (let i = 0; i < arrTemp.length; i++) {
                    if(arrTemp[i].match(/^T\d+$/g)) {
                        arrTemp[i] = this.arrCondition[index];
                        index++;
                    }
                }

                this.refreshInput(arrTemp.join(' '));

            } else {  // 新增
                let arrTemp = this.formatCondition();
                for (let i = 0; i < arrCondition.length; i++) {
                    this.arrCondition.push(arrCondition[i]);
                    this.arrLogic.push('并且');
                    arrTemp.length === 0 ? arrTemp.push(arrCondition[i]) : arrTemp.push('并且', arrCondition[i]);
                    // this.insert('and');
                    // this.insert(null);
                    // this.insert('condition', arrCondition[i]);
                }
                this.refreshInput(arrTemp.join(' '));
            }
        }

        formatCondition() {
            let strTemp = this.$dom_input.text();
            let arrTemp = strTemp.split(' ');
            for (let i = 0; i < arrTemp.length; i++) {
                // 1.以条件开头
                // 2.条件后是逻辑，再是条件，再是逻辑...
                // 3.特殊情况：左括号在条件左边，右括号在条件右边
                let item0 = arrTemp[i].trim();
                let item1 = arrTemp[i+1] && arrTemp[i+1].trim();

                if(item0 === '（') {
                    if(!item1 || (!item1.match(/^T\d+$/g) && item1 !== '）')) {
                        arrTemp.splice(i, 1);
                        i--;
                    }
                } else if(item0 === '）') {
                    if(item1 && item1 !== '并且' && item1 !== '或者' && item1 !== '（') {
                        arrTemp.splice(i, 1);
                        i--;
                    }
                } else if(item0 === '并且' || item0 === '或者') {
                    if(!item1 || (!item1.match(/^T\d+$/g) && item1 !== '（')) {
                        arrTemp.splice(i, 1);
                        i--;
                    }
                } else if(item0.match(/^T\d+$/g)) {
                    if(item1 && item1 !== '并且' && item1 !== '或者' && item1 !== '）') {
                        arrTemp.splice(i, 1);
                        i--;
                    }
                } else {
                    arrTemp.splice(i, 1);
                    i--;
                }
            }

            if(arrTemp[0] && arrTemp[0] !== '（' && !arrTemp[0].match(/^T\d+$/g)) arrTemp.splice(0,1);
            return arrTemp;
        }

        getData() {
            this.model.invoke('getData', this.$dom_input.text());
        }
    }

    window.KdWtcIncDecConfig = KdWtcIncDecConfig;
})();