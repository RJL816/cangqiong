'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function () {
    function KdWtcStepConfig(para) {
        this.uniqueId = para.uniqueId;
        this.model = para.model;
        this.KDApi = para.KDApi;
        this.rootDom = para.model.dom;
        this.data = para.data;
        this.themeNum = para.themeNum;
        //this.data.type:  // 0:编辑态 1:查看态

        this.stack = []; // 用户操作栈
        this.itemIndex = 0;
        this.timer = null;
        this.timer2 = null;
        this.enterHotPart = false;
        this.myTool = new KdWtcMyTool();

        // 多语言文本
        this.langText_start = para.KDApi.getLangMsg(this.model, 'start');
        this.langText_end = para.KDApi.getLangMsg(this.model, 'end');
        this.langText_updateby = para.KDApi.getLangMsg(this.model, 'updateby');
        this.langText_updatedate = para.KDApi.getLangMsg(this.model, 'updatedate');
        this.langText_effectiveDate = para.KDApi.getLangMsg(this.model, 'effectiveDate');
        this.langText_desc = para.KDApi.getLangMsg(this.model, 'desc');
        this.langText_resultType = para.KDApi.getLangMsg(this.model, 'resultType');
        this.langText_calrule = para.KDApi.getLangMsg(this.model, 'calrule');
        this.langText_timePair = para.KDApi.getLangMsg(this.model, 'timePair');
        this.langText_itemValue = para.KDApi.getLangMsg(this.model, 'itemValue');
        this.langText_customFormula = para.KDApi.getLangMsg(this.model, 'customFormula');
        this.langText_customCode = para.KDApi.getLangMsg(this.model, 'customCode');
        this.langText_deleteConfirm = para.KDApi.getLangMsg(this.model, 'deleteConfirm');
        this.langText_confirm = para.KDApi.getLangMsg(this.model, 'confirm');
        this.langText_cancel = para.KDApi.getLangMsg(this.model, 'cancel');
        this.langText_warn1 = para.KDApi.getLangMsg(this.model, 'warn1');
        this.langText_message1 = para.KDApi.getLangMsg(this.model, 'message1');
        this.langText_message2 = para.KDApi.getLangMsg(this.model, 'message2');
        this.langText_message3 = para.KDApi.getLangMsg(this.model, 'message3');
        this.langText_message4 = para.KDApi.getLangMsg(this.model, 'message4');
        this.langText_message5 = para.KDApi.getLangMsg(this.model, 'message5');
        this.langText_message6 = para.KDApi.getLangMsg(this.model, 'message6');

        this.dom_container = this.rootDom.querySelector('.wtc_stepConfig_config-container');

        this.$dom_ModifyInfo = $('.wtc_stepConfig_modify-info', this.rootDom);
        this.$dom_openBtn = $('.wtc_stepConfig_btn-open', this.rootDom);
        this.$dom_foldBtn = $('.wtc_stepConfig_btn-fold', this.rootDom);

        // 设置主题色：
        this.rootDom.style.setProperty('--themeColor', this.themeNum);

        this.init();
    }

    KdWtcStepConfig.prototype.init = function () {
        var $this = this;
        this.init_dom();
        if (this.data.power) this.init_seniorSet();

        var dow_items = $('.item', $this.rootDom);
        var lineStr = this.itemConnect(dow_items);

        $($this.dom_container).append(lineStr);
        this.eventHandle();
    };

    KdWtcStepConfig.prototype.eventHandle = function () {
        var $this = this;

        // 防止弹框层级不够高，被遮挡：
        $('.item-main-step', $this.rootDom).hover(function () {
            this.parentElement.parentElement.parentElement.parentElement.style.zIndex = 4;
        }, function () {
            this.parentElement.parentElement.parentElement.parentElement.style.zIndex = 3;
        });

        // 步骤详情展开更多描述事件：
        $('.wtc_stepConfig_step-detail-item-open', $this.rootDom).click(function () {
            $('.wtc_stepConfig_step-detail-item-other-text', this.parentElement).css('display', 'inline'); //显示更多文本
            $(this).css('display', 'none'); //隐藏“展开”
        });
        // 步骤详情收起更多描述事件：
        $('.item-main', $this.rootDom).mouseleave(function () {
            if ($('.wtc_stepConfig_step-detail-item-other-text', this.parentElement).html()) {
                $('.wtc_stepConfig_step-detail-item-other-text', this.parentElement).css('display', 'none'); //隐藏更多文本
                $('.wtc_stepConfig_step-detail-item-open', this.parentElement).css('display', 'inline'); //显示“展开”
            }
        });

        // 在最外层添加点击事件，通过class定位具体触发的事件：
        $this.dom_container.onclick = function (event) {
            $this.clickHandle(event.target);
        };

        // 全部展开事件：
        this.$dom_openBtn.click(function () {
            $('.wtc_stepConfig_item-step', $this.dom_container).each(function (index, item) {
                if ($(item).css('display') === 'none') {
                    $this.openSteps(item.parentElement.querySelector('.wtc_stepConfig_item-main-text'));
                }
            });
        });

        // 全部折叠事件：
        this.$dom_foldBtn.click(function () {
            $('.wtc_stepConfig_item-step', $this.dom_container).each(function (index, item) {
                if ($(item).css('display') === 'block') {
                    $this.foldSteps(item.parentElement.querySelector('.wtc_stepConfig_item-main-text'));
                }
            });
        });

        // 屏幕大小发生改变：
        $(window).on('resize.stepConfig_resize_' + this.uniqueId, function () {
            if ($this.rootDom.offsetWidth !== 0) {
                // 判断是否是当前页签
                var dom_row0 = $('.row_0', $this.dom_container);
                $this.refreshLine(dom_row0[0], dom_row0[0], true);
            }
        });

        // 监听左下角平台的展开收起列表按钮
        $('.JNUdl1Jv').each(function (index, item) {
            if (this.offsetWidth > 0) {
                var $target = $(this);
                $target.on('click.stepConfig_click_1dWRVXYw_' + $this.uniqueId, function () {
                    setTimeout(function () {
                        var dom_row0 = $('.row_0', $this.dom_container);
                        $this.refreshLine(dom_row0[0], dom_row0[0], true);
                    }, 300);
                });
            }
        });

        // 监听头部页签切换事件
        $('._2IuNtC78.hover-theme-fc').on('click.stepConfig_click_' + this.uniqueId, function () {
            setTimeout(function () {
                if ($this.rootDom.offsetWidth !== 0) {
                    // 判断是否是当前页签
                    var dom_row0 = $('.row_0', $this.dom_container);
                    $this.refreshLine(dom_row0[0], dom_row0[0], true);
                }
            }, 20);
        });

        if (this.data.type === 0) {
            // 编辑态
            this.changeStatus(this.data.type);
        }
    };

    KdWtcStepConfig.prototype.init_dom = function () {
        var str = '';

        // 初始化修改人：
        this.$dom_ModifyInfo.html('<div>' + this.langText_updateby + '\uFF1A' + this.data.updateby + '</div><div>' + this.langText_updatedate + '\uFF1A' + this.data.updatedate + '</div>');

        str += '\n             <div class="row row_0">\n                <div class="item item0">\n                    <div class="item-span-left"></div>\n                    <div class="item-main">\n                        <div class="item-main-top-dot"></div>\n                        <div class="item-main-bottom-dot"></div>\n                        <div class="wtc_stepConfig_item-fixed-text">' + this.langText_start + '</div>\n                    </div>\n                    <div class="item-span-right"></div>\n                </div>\n            </div>\n        ';

        for (var i = 0; i < this.data.data.length; i++) {
            this.itemIndex++;
            str += '\n                <div class="row row_' + (i + 1) + '">\n                    <div class="item item' + this.itemIndex + '">\n                        <div class="item-span-left"></div>\n                        <div class="item-main">\n                            <div class="item-main-top-dot"></div>\n                            <div class="item-main-bottom-dot"></div>\n                            <input class="wtc_stepConfig_item-input wtc_stepConfig_item-main-text" title="' + this.data.data[i].phase + '" value="' + this.data.data[i].phase + '" disabled draggable="' + (this.data.type == 0 ? true : false) + '">\n                            <i class="wtc_stepConfig_icon-step-num" stepnum="' + this.data.data[i].steps.length + '">' + this.data.data[i].steps.length + '</i>\n                            <div class="wtc_stepConfig_icon-wrap">\n                                ' + (this.data.type == 0 ? '<i class="wtc_stepConfig_icon-set kdfont kdfont-shezhi11"></i>' : '') + '\n                                ' + (this.data.type == 0 && this.data.data[i].del ? '<i class="wtc_stepConfig_icon-del kdfont kdfont-shanchu7"></i>' : '') + '\n                            </div>\n                        </div>\n                        <div class="item-span-right"></div>\n                        <div class="wtc_stepConfig_item-step">\n            ';
            for (var j = 0; j < this.data.data[i].steps.length; j++) {
                var objStep = this.data.data[i].steps[j];
                var setIcon = objStep.syspreset ? 'kdfont-yanjing' : 'kdfont-shezhi11'; // 预制数据只能查看，所以用眼睛的icon
                objStep.desc = objStep.desc || '无';
                var desc_firstText = objStep.desc.slice(0, 48);
                var desc_otherText = objStep.desc.slice(48);
                str += '\n                    <div class="step-row step-row-' + objStep.id + '">\n                        <div class="step-item step-item-' + objStep.id + '">\n                            <div class="wtc_stepConfig_span-top-bottom wtc_stepConfig_span-top" style="position:absolute;top:-20px;left:50%;transform: translateX(-50%);width: 60px;height: 20px;z-index: 5000"></div>\n                            <div class="wtc_stepConfig_span-top-bottom wtc_stepConfig_span-bottom" style="position:absolute;bottom:-20px;left:50%;transform: translateX(-50%);width: 60px;height: 20px;z-index: 5000"></div>\n                            <div class="item-span-left"></div>\n                            <div class="item-main item-main-step">\n                                <div class="item-main-top-dot"></div>\n                                <div class="item-main-bottom-dot"></div>\n                                <input class="wtc_stepConfig_item-input wtc_stepConfig_item-step-text" value="' + objStep.step + '" disabled draggable="' + (this.data.type == 0 ? true : false) + '">\n                                <div class="wtc_stepConfig_step-detail">\n                                    <div class="wtc_stepConfig_step-detail-item">' + objStep.step + '</div>\n                                    <div class="wtc_stepConfig_step-detail-item">' + this.langText_effectiveDate + '\uFF1A' + objStep.startdate + '</div>\n                                    <div class="wtc_stepConfig_step-detail-item">' + this.langText_resultType + '\uFF1A' + (objStep.resulttype == '1' ? this.langText_timePair : this.langText_itemValue) + '</div>\n                                    <div class="wtc_stepConfig_step-detail-item">' + this.langText_calrule + '\uFF1A' + (objStep.calrule == '1' ? this.langText_customFormula : this.langText_customCode) + '</div>\n                                    <div class="wtc_stepConfig_step-detail-item">\n                                        <span class="wtc_stepConfig_step-detail-item-first-text">' + this.langText_desc + '\uFF1A' + desc_firstText + '</span>\n                                        <span class="wtc_stepConfig_step-detail-item-other-text">' + desc_otherText + '</span>\n                                        ' + (desc_otherText ? '<span class="wtc_stepConfig_step-detail-item-open">展开</span>' : '') + '\n                                    </div>\n                                </div>\n                                <div class="wtc_stepConfig_icon-wrap">\n                                    ' + (this.data.type == 0 ? '<i class="wtc_stepConfig_icon-set kdfont ' + setIcon + '"></i>' : '') + '\n                                    ' + (this.data.type == 0 && objStep.del ? '<i class="wtc_stepConfig_icon-del kdfont kdfont-shanchu7"></i>' : '') + '\n                                </div>\n                            </div>\n                            <div class="item-span-right"></div>\n                        </div>\n                    </div>\n                ';
            }

            str += '</div></div></div>';
        }

        str += '\n             <div class="row row_' + (this.data.data.length + 1) + '">\n                <div class="item item' + ++this.itemIndex + '">\n                    <div class="item-span-left"></div>\n                    <div class="item-main">\n                        <div class="item-main-top-dot"></div>\n                        <div class="item-main-bottom-dot"></div>\n                        <div class="wtc_stepConfig_item-fixed-text">' + this.langText_end + '</div>\n                    </div>\n                    <div class="item-span-right"></div>\n                </div>\n            </div>\n        ';

        this.dom_container.innerHTML = str;
    };

    KdWtcStepConfig.prototype.init_seniorSet = function () {
        var $this = this;
        var str = '';

        str += '\n        <div class="wtc_stepConfig_senior-dialog">\n            <div class="wtc_stepConfig_senior-dialog-title">\u9AD8\u7EA7\u5C5E\u6027</div>\n            <div class="wtc_stepConfig_senior-dialog-phase-name">\u9636\u6BB5\uFF1A\u52A0\u73ED</div>\n            <div class="wtc_stepConfig_senior-dialog-set2">\n                <div class="wtc_stepConfig_senior-dialog-set-name">\n                    <span>\u9636\u6BB5\u843D\u5E93</span>\n                    <i class="wtc_stepConfig_senior-dialog-set-must">*</i>\n                    <i class="wtc_stepConfig_senior-dialog-set-tips kdfont kdfont-wenhao2"></i>\n                </div>\n                <a href="#" class="wtc_stepConfig_senior-dialog-select">\n                    <span class="wtc_stepConfig_senior-dialog-selected">\u662F</span>\n                    <i class="wtc_stepConfig_senior-dialog-show-icon kdfont kdfont-shouqi7"></i>\n                    <ul class="wtc_stepConfig_senior-dialog-options">\n                        <li class="wtc_stepConfig_senior-dialog-options-item wtc_stepConfig_senior-dialog-options-item-active" index="1">\u662F</li>\n                        <li class="wtc_stepConfig_senior-dialog-options-item" index="0">\u5426</li>\n                    </ul>\n                </a>\n            </div>\n            <div class="wtc_stepConfig_senior-dialog-set1">\n                <div class="wtc_stepConfig_senior-dialog-set-name">\n                    <span>\u9636\u6BB5\u7ED3\u679C\u5904\u7406</span>\n                    <i class="wtc_stepConfig_senior-dialog-set-must">*</i>\n                    <i class="wtc_stepConfig_senior-dialog-set-tips kdfont kdfont-wenhao2"></i>\n                </div>\n                <a href="#" class="wtc_stepConfig_senior-dialog-select">\n                    <span class="wtc_stepConfig_senior-dialog-selected">\u5408\u5E76</span>\n                    <i class="wtc_stepConfig_senior-dialog-show-icon kdfont kdfont-shouqi7"></i>\n                    <ul class="wtc_stepConfig_senior-dialog-options">\n                        <li class="wtc_stepConfig_senior-dialog-options-item wtc_stepConfig_senior-dialog-options-item-active" index="0">\u5408\u5E76</li>\n                        <li class="wtc_stepConfig_senior-dialog-options-item" index="1">\u8986\u76D6</li>\n                    </ul>\n                </a>\n            </div>\n            <div class="wtc_stepConfig_senior-dialog-set3">\n                <div class="wtc_stepConfig_senior-dialog-set-name">\n                    <span>\u65E0\u8F93\u51FA\u51B3\u7B56\u5668</span>\n                    <i class="wtc_stepConfig_senior-dialog-set-must">*</i>\n                    <i class="wtc_stepConfig_senior-dialog-set-tips kdfont kdfont-wenhao2"></i>\n                </div>\n                <a href="#" class="wtc_stepConfig_senior-dialog-select">\n                    <span class="wtc_stepConfig_senior-dialog-selected">\u7EE7\u7EED</span>\n                    <i class="wtc_stepConfig_senior-dialog-show-icon kdfont kdfont-shouqi7"></i>\n                    <ul class="wtc_stepConfig_senior-dialog-options">\n                        <li class="wtc_stepConfig_senior-dialog-options-item" index="0">\u4E0B\u4E00\u6B65</li>\n                        <li class="wtc_stepConfig_senior-dialog-options-item wtc_stepConfig_senior-dialog-options-item-active" index="1">\u7EE7\u7EED</li>\n                        <li class="wtc_stepConfig_senior-dialog-options-item" index="2">\u8DF3\u51FA</li>\n                        <li class="wtc_stepConfig_senior-dialog-options-item" index="3">\u7EC8\u6B62</li>\n                        <li class="wtc_stepConfig_senior-dialog-options-item" index="4">\u9519\u8BEF</li>\n                    </ul>\n                </a>\n            </div>\n            <div class="wtc_stepConfig_senior-dialog-close kdfont kdfont-guanbi6"></div>\n        </div>\n        ';

        $('.wtc_stepConfig_wrap', this.rootDom).append(str);

        var $dom_dialog = $('.wtc_stepConfig_senior-dialog', this.rootDom);
        var $dom_select = $('.wtc_stepConfig_senior-dialog-select', this.rootDom);
        var $dom_tipsIcon = $('.wtc_stepConfig_senior-dialog-set-tips', this.rootDom);
        var $dom_optionsItem = $('.wtc_stepConfig_senior-dialog-options-item', $dom_select);
        var $dom_closeBtn = $('.wtc_stepConfig_senior-dialog-close', this.rootDom);

        $dom_closeBtn.on('click', function () {
            $dom_dialog.hide();
            $('.item-main-active', $this.rootDom).removeClass('item-main-active');
        });
        $dom_select.on('click', function () {
            if ($this.data.type == 1) return; //查看态不允许点击

            var $dom_options = $('.wtc_stepConfig_senior-dialog-options', this);
            var $dom_showIcon = $('.wtc_stepConfig_senior-dialog-show-icon', this);
            if ($dom_options.css('display') === 'none') {
                $dom_options.css('display', 'block');
                $dom_showIcon.removeClass('kdfont-shouqi7');
                $dom_showIcon.addClass('kdfont-zhankai4');
            } else {
                $dom_options.css('display', 'none');
                $dom_showIcon.removeClass('kdfont-zhankai4');
                $dom_showIcon.addClass('kdfont-shouqi7');
            }
        });

        $dom_select.on('blur', function () {
            var $dom_options = $('.wtc_stepConfig_senior-dialog-options', this);
            var $dom_showIcon = $('.wtc_stepConfig_senior-dialog-show-icon', this);
            $dom_options.css('display', 'none');
            $dom_showIcon.removeClass('kdfont-zhankai4');
            $dom_showIcon.addClass('kdfont-shouqi7');
        });

        $dom_optionsItem.on('click', function () {
            if ($(this).hasClass('wtc_stepConfig_senior-dialog-options-item-active')) return;

            var optionText = this.innerHTML;
            var $dom_selected = $('.wtc_stepConfig_senior-dialog-selected', this.parentElement.parentElement);

            $('.wtc_stepConfig_senior-dialog-options-item', this.parentElement).removeClass('wtc_stepConfig_senior-dialog-options-item-active');
            $(this).addClass('wtc_stepConfig_senior-dialog-options-item-active');

            $dom_selected.html(optionText);
            // 修改数据：
            var $dom_curItem = $('.item-main-active', $this.rootDom).parent().parent();
            var objData = $this.getDataPosition($dom_curItem[0]);
            var setClass = this.parentElement.parentElement.parentElement.className;
            switch (setClass) {
                case 'wtc_stepConfig_senior-dialog-set1':
                    $this.data.data[objData.phaseIndex].phaseResultDeal = Number($(this).attr('index'));
                    break;
                case 'wtc_stepConfig_senior-dialog-set2':
                    var index = Number($(this).attr('index'));
                    $this.data.data[objData.phaseIndex].phaseSave = index;
                    // 阶段落库为否时，阶段结果处理不显示,否则显示：
                    if (index === 0) {
                        $('.wtc_stepConfig_senior-dialog-set1', $this.rootDom).css('display', 'none');
                    } else {
                        $('.wtc_stepConfig_senior-dialog-set1', $this.rootDom).css('display', 'block');
                    }
                    break;
                case 'wtc_stepConfig_senior-dialog-set3':
                    if (objData.type === 'phase') {
                        $this.data.data[objData.phaseIndex].noReturnHandler = $(this).attr('index');
                    } else {
                        $this.data.data[objData.phaseIndex].steps[objData.stepIndex].noReturnHandler = $(this).attr('index');
                    }
                    break;
            }
        });

        $dom_tipsIcon.on('mouseenter', function () {
            var curSetClass = this.parentElement.parentElement.className;
            var text = '';
            switch (curSetClass) {
                case 'wtc_stepConfig_senior-dialog-set1':
                    text = $this.data.phaseresultdeal;
                    break;
                case 'wtc_stepConfig_senior-dialog-set2':
                    text = $this.data.phasesave;
                    break;
                case 'wtc_stepConfig_senior-dialog-set3':
                    text = $this.data.noreturnhandler;
                    break;
            }
            $this.myTool.showPopover({
                target: this, //气泡参照的dom
                isHtml: true,
                data: '<div style="max-width: 500px;">' + text + '</div>'
            });
        });
        $dom_tipsIcon.on('mouseleave', function () {
            $this.myTool.cancelPopover();
        });
    };

    /*
    * 改变状态（由后端调用）
    * */
    KdWtcStepConfig.prototype.refreshStatus = function (status) {
        if (this.data.type !== status) {
            this.data.type = status;
            this.changeStatus(status);
        }
    };

    /*
    * 动态事件的绑定与解绑：0编辑态，1查看态
    * */
    KdWtcStepConfig.prototype.changeStatus = function (status) {
        var $this = this;
        if (status === 0) {
            // 编辑态
            //键盘事件：
            $(document).on('keyup.stepConfig_keyup_' + this.uniqueId, function (event) {
                if (event.keyCode === 46) {
                    // 点删除键,同时是编辑态时
                    var $dom_activeInput = $('.item-main-active', $this.rootDom);
                    // 判断是否存在选中的项，再判断是否是激活的页签（通过判断实际宽度）：
                    if ($dom_activeInput[0] && $this.rootDom.offsetWidth !== 0) {
                        var $dom_delIcon = $('.wtc_stepConfig_icon-del', $dom_activeInput.parent());
                        if ($dom_delIcon[0]) $this.delEvent($dom_delIcon[0]); // 判断选中项是否可删
                    }
                }

                if (event.keyCode === 90 && event.ctrlKey) {
                    // ctrl+z 撤销上一步
                    if ($this.rootDom.offsetWidth !== 0) $this.backHandle();
                }
            });

            $($this.dom_container).on('dblclick', function (event) {
                if ($(event.target).hasClass('wtc_stepConfig_item-main-text')) {
                    clearTimeout($this.timer);
                    $this.modifyName(event.target);
                }
            });

            // 拖动item经过以及放入span块时触发事件：
            $('.wtc_stepConfig_span-top-bottom', $this.rootDom).on({
                dragover: function dragover(event) {
                    $this.allowDrop(event.originalEvent, this);
                },
                dragleave: function dragleave(event) {
                    $this.hideHotPart();
                },
                drop: function drop(event) {
                    $this.drop(event.originalEvent, this);
                }
            });
            $('.wtc_stepConfig_svg-wrap', $this.rootDom).on({
                dragover: function dragover(event) {
                    $this.allowDrop(event.originalEvent, this);
                },
                dragleave: function dragleave(event) {
                    $this.hideHotPart();
                },
                drop: function drop(event) {
                    $this.drop(event.originalEvent, this);
                }
            });

            // 该item被拖动触发事件：
            $('.item', $this.rootDom).on({
                dragstart: function dragstart(event) {
                    $this.drag('phase', event.originalEvent);
                },
                dragend: function dragend() {
                    $this.hideHotPart();
                }
            });
            $('.step-item', $this.rootDom).on({
                dragstart: function dragstart(event) {
                    event.stopPropagation(); //阻止冒泡
                    $this.drag('step', event.originalEvent);
                },
                dragend: function dragend() {
                    $this.hideHotPart();
                }
            });

            // 输入框失焦事件：
            $('.wtc_stepConfig_item-main-text', $this.rootDom).on('blur', function () {
                $this.modifyName_confirm(this);
            });

            // hover线时触发事件：
            $('.wtc_stepConfig_svg-group', $this.rootDom).on({
                mouseenter: function mouseenter() {
                    $this.showAddBtn(this);
                },
                mouseleave: function mouseleave() {
                    $this.hideAddBtn(this);
                }
            });

            $('.item-main', $this.rootDom).on({
                'mouseenter.showIcon': function mouseenterShowIcon() {
                    $('.wtc_stepConfig_icon-wrap', this).css('display', 'block');
                },
                'mouseleave.showIcon': function mouseleaveShowIcon() {
                    $('.wtc_stepConfig_icon-wrap', this).css('display', 'none');
                }
            });

            $('.wtc_stepConfig_item-input').prop('draggable', true);
        } else {
            $(document).off('keyup.stepConfig_keyup_' + this.uniqueId);
            $($this.dom_container).off('dblclick');
            $('.wtc_stepConfig_span-top-bottom', $this.rootDom).off();
            $('.wtc_stepConfig_svg-wrap', $this.rootDom).off();
            $('.item', $this.rootDom).off();
            $('.step-item', $this.rootDom).off();
            $('.wtc_stepConfig_item-main-text', $this.rootDom).off();
            $('.wtc_stepConfig_svg-group', $this.rootDom).off();
            $('.wtc_stepConfig_item-input').prop('draggable', false);
            $('.item-main', $this.rootDom).off('mouseenter.showIcon');
            $('.item-main', $this.rootDom).off('mouseleave.showIcon');
        }
    };

    KdWtcStepConfig.prototype.refreshLineEvent = function () {
        var $this = this;

        if (this.data.type == 0) {
            // // 先解绑，再重新绑定事件：
            $('.wtc_stepConfig_svg-group', this.rootDom).off('mouseenter');
            $('.wtc_stepConfig_svg-group', this.rootDom).off('mouseleave');
            $('.wtc_stepConfig_svg-wrap', this.rootDom).off('dragover');
            $('.wtc_stepConfig_svg-wrap', this.rootDom).off('dragleave');
            $('.wtc_stepConfig_svg-wrap', this.rootDom).off('drop');

            // hover线时触发事件：
            $('.wtc_stepConfig_svg-group', $this.rootDom).on({
                mouseenter: function mouseenter() {
                    $this.showAddBtn(this);
                },
                mouseleave: function mouseleave() {
                    $this.hideAddBtn(this);
                }
            });

            $('.wtc_stepConfig_svg-wrap', $this.rootDom).on({
                dragover: function dragover(event) {
                    $this.allowDrop(event.originalEvent, this);
                },
                dragleave: function dragleave(event) {
                    $this.hideHotPart();
                },
                drop: function drop(event) {
                    $this.drop(event.originalEvent, this);
                }
            });
        }
    };

    KdWtcStepConfig.prototype.itemConnect = function (dow_items) {
        var $this = this;
        var lineStr = '';
        var arrRestStr = []; // 缓存需要后加载的线

        for (var i = 0; i < dow_items.length; i++) {
            var item = dow_items[i];
            var itemType = $(item).hasClass('item') ? 0 : 1; //0表示阶段，1表示步骤
            var main = $('.item-main', item);
            var bottomDot = $('.item-main-bottom-dot', main);
            var startPosition = $this.getPosition(bottomDot[0], $this.dom_container);
            if (itemType === 1) startPosition.left -= 100; // 因为步骤是绝对定位的，所以计算距离时会出现错误，多加了自身宽度的一半，所以减去100（定死）

            // 获取下一行元素：
            var curRow = item.parentElement;
            var nextRow = curRow.nextElementSibling;
            if ($(nextRow).hasClass('row') || $(nextRow).hasClass('step-row')) {
                var svgWidth_default = 60; // todo 如果需要修改SVG的宽度的话，修改这个值
                var newRow_firstItem = nextRow.firstElementChild;
                var newRow_main = $('.item-main', newRow_firstItem);
                var newRow_topDot = $('.item-main-top-dot', newRow_main);
                var endPosition = $this.getPosition(newRow_topDot[0], $this.dom_container);
                if (itemType === 1) endPosition.left -= 100; // 因为步骤是绝对定位的，所以计算距离时会出现错误，多加了自身宽度的一半，所以减去100（定死）

                var curItemNum = item.className.split(' ')[1];
                var nextItemNum = newRow_firstItem.className.split(' ')[1];

                var svgWidth = Math.abs(endPosition.left - startPosition.left) + svgWidth_default; // 加10是因为箭头宽度为10
                var svgHeight = endPosition.top - startPosition.top;
                var svgTop = startPosition.top;
                var svgLeft = endPosition.left > startPosition.left ? startPosition.left - svgWidth_default / 2 : endPosition.left - svgWidth_default / 2;

                if (endPosition.left > startPosition.left) {
                    lineStr += '\n            <svg class="wtc_stepConfig_svg-wrap svg-' + curItemNum + ' svg-' + nextItemNum + '" version="1.1" xmlns="http://www.w3.org/2000/svg" style="top:' + svgTop + 'px;left:' + svgLeft + 'px;width:' + svgWidth + 'px;height:' + svgHeight + 'px; z-index:' + (itemType === 1 ? 2000 : 0) + '">\n                <g class="wtc_stepConfig_svg-group" stroke-width="1">\n                    <rect class="wtc_stepConfig_svg-rect" rx="2" ry="2" x="0" y="' + (svgHeight / 2 - 16) + '" width="' + svgWidth_default + '" height="32" style="display:none;fill:rgba(255, 95, 31, 0.08);stroke-width:1;stroke:#FF5F1F;stroke-dasharray:2,2;"/>\n                    <polyline points="' + svgWidth_default / 2 + ',0 ' + svgWidth_default / 2 + ',' + svgHeight / 2 + ' ' + (svgWidth - svgWidth_default / 2) + ',' + svgHeight / 2 + ' ' + (svgWidth - svgWidth_default / 2) + ',' + svgHeight + '" style="fill:#212121;stroke: #fff; stroke-width: ' + svgWidth_default + ';opacity:0"/>\n                    <polyline points="' + svgWidth_default / 2 + ',0 ' + svgWidth_default / 2 + ',' + svgHeight / 2 + ' ' + (svgWidth - svgWidth_default / 2) + ',' + svgHeight / 2 + ' ' + (svgWidth - svgWidth_default / 2) + ',' + svgHeight + '" style="fill:white;"/>\n                    <polyline points="' + (svgWidth - svgWidth_default / 2 - 4) + ',' + (svgHeight - 5) + ' ' + (svgWidth - svgWidth_default / 2) + ',' + svgHeight + ' ' + (svgWidth - svgWidth_default / 2 + 4) + ',' + (svgHeight - 5) + '" style="fill:#212121;"/>';
                    // 查看态，步骤，或者开始阶段不需要新增按钮：
                    if (this.data.type == 0 && itemType === 0 && curItemNum !== 'item0') lineStr += '<use class="add-btn" x="' + svgWidth_default / 2 + '" y="' + svgHeight / 2 + '"  xlink:href="#wtc_stepConfig_g1"></use>';
                    lineStr += '</g></svg>';
                } else {
                    // 先连从左到右的线，从右到左的线先存起来（因为svg的特性：后面svg的层级会覆盖前面的，导致前面的选中不了）：
                    var strTemp = '';
                    strTemp += '\n            <svg class="wtc_stepConfig_svg-wrap svg-' + curItemNum + ' svg-' + nextItemNum + '" version="1.1" xmlns="http://www.w3.org/2000/svg" style="top:' + svgTop + 'px;left:' + svgLeft + 'px;width:' + svgWidth + 'px;height:' + svgHeight + 'px; z-index:' + (itemType === 1 ? 2000 : 0) + '">\n                <g class="wtc_stepConfig_svg-group" stroke-width="1">\n                    <rect class="wtc_stepConfig_svg-rect" rx="2" ry="2" x="0" y="' + (svgHeight / 2 - 16) + '" width="' + svgWidth_default + '" height="32" style="display:none;fill:rgba(255, 95, 31, 0.08);stroke-width:1;stroke:#FF5F1F;stroke-dasharray:2,2;"/>\n                    <polyline points="' + (svgWidth - svgWidth_default / 2) + ',0 ' + (svgWidth - svgWidth_default / 2) + ',' + svgHeight / 2 + ' ' + svgWidth_default / 2 + ',' + svgHeight / 2 + ' ' + svgWidth_default / 2 + ',' + svgHeight + '" style="fill:#212121;stroke: #fff; stroke-width: ' + svgWidth_default + ';opacity:0"/>\n                    <polyline points="' + (svgWidth - svgWidth_default / 2) + ',0 ' + (svgWidth - svgWidth_default / 2) + ',' + svgHeight / 2 + ' ' + svgWidth_default / 2 + ',' + svgHeight / 2 + ' ' + svgWidth_default / 2 + ',' + svgHeight + '" style="fill:white;"/>\n                    <polyline points="' + (svgWidth_default / 2 - 4) + ',' + (svgHeight - 5) + ' ' + svgWidth_default / 2 + ',' + svgHeight + ' ' + (svgWidth_default / 2 + 4) + ',' + (svgHeight - 5) + '" style="fill:#212121;"/>';

                    if (this.data.type == 0 && itemType === 0 && curItemNum !== 'item0') strTemp += '<use class="add-btn" x="' + (svgWidth - svgWidth_default / 2) + '" y="' + svgHeight / 2 + '"  xlink:href="#wtc_stepConfig_g1"></use>';
                    strTemp += '</g></svg>';

                    arrRestStr.push(strTemp);
                }
            }
        }

        // 加载被缓存的线:
        for (var _i = arrRestStr.length - 1; _i >= 0; _i--) {
            lineStr += arrRestStr[_i];
        }

        return lineStr;
    };

    KdWtcStepConfig.prototype.itemDisconnect = function (items) {
        for (var i = 0; i < items.length; i++) {
            var itemClass = items[i].className.split(' ')[1];
            $('.svg-' + itemClass, this.dom_container).remove();
            // $(`.svg-${itemClass}`, items[i].parentElement).remove();
        }
    };

    KdWtcStepConfig.prototype.allowDrop = function (event, target) {
        // console.log('allowDrop...');
        // 分为划入线，以及划入span块的情况：
        var $target = $(target);
        var dom_item = this.rootDom.querySelector(this.dragItemClass);

        // 判断移动的是阶段，还是步骤：
        if ($(dom_item).hasClass('item')) {
            // 是阶段，需判断线的类型：
            if (!$target.hasClass('wtc_stepConfig_span-top-bottom') && $target[0].className.baseVal.split(' ')[2].split('-')[1] !== 'step' && $target[0].className.baseVal.split(' ')[1].split('-')[1] !== 'item0') {
                this.showHotPart(target, 'parse_line', event);
            }
        } else {
            var dom_phase = dom_item.parentNode.parentNode.parentNode;
            // 是步骤，需在当前阶段内移动：
            if ($target.hasClass('wtc_stepConfig_span-top-bottom')) {
                // 划入span块，判断是不是当前阶段的span块：
                if ($target[0].parentNode.parentNode.parentNode.parentNode === dom_phase) {
                    this.showHotPart(target, 'step_span', event);
                }
            } else {
                if ($target[0].className.baseVal.split(' ')[2].split('-')[1] === 'step') {
                    var stepClass = $target[0].className.baseVal.split(' ')[2].slice(4);
                    if ($('.' + stepClass, dom_phase)[0]) {
                        this.showHotPart(target, 'step_line', event);
                    }
                }
            }
        }
    };

    /*
    * $target：阶段线、步骤线、span块（上）、span块（下）
    * 阶段，步骤被拖动后，显示可以放置的热区
    * */
    KdWtcStepConfig.prototype.showHotPart = function (target, type, event) {
        event.preventDefault();

        if (type === 'step_span') {
            target.style.border = '1px dashed #FF5F1F';
            target.style.backgroundColor = 'rgba(255, 95, 31, 0.08)';
        } else {
            $('.wtc_stepConfig_svg-rect', target).css('display', 'block');
        }

        // let $this = this;
        // let startPhaseClass = '';
        // let endPhaseClass = '';
        // let top = parseInt($target.css('top'));
        // let left = parseInt($target.css('left'));
        // let hotPartTop;
        // let hotPartLeft = left;
        //
        // switch (type) {
        //     case 'parse_line':
        //         hotPartTop = top + 26;
        //         startPhaseClass = ' hot-' + $target[0].className.baseVal.split(' ')[1].slice(4);
        //         endPhaseClass = ' hot-' + $target[0].className.baseVal.split(' ')[2].slice(4);
        //         break;
        //     case 'step_span':
        //         var tempObj = this.getPosition($target[0], this.dom_container);
        //         hotPartLeft = tempObj.left;
        //         hotPartTop = tempObj.top;
        //         endPhaseClass = ' hot-' + $target[0].parent.className.split(' ')[1];
        //         break;
        //     case 'step_line':
        //         hotPartTop = top + 11;
        //         startPhaseClass = ' hot-' + $target[0].className.baseVal.split(' ')[1].slice(4);
        //         endPhaseClass = ' hot-' + $target[0].className.baseVal.split(' ')[2].slice(4);
        //         break;
        // }
        //
        // let hotPartStr = `
        //     <div class="wtc_stepConfig_config-hot-part${startPhaseClass}${endPhaseClass}" style="position:absolute; top:${hotPartTop}px; left:${hotPartLeft}px; width: 60px;height:20px;border:1px dashed red;border-radius: 2px;box-sizing: border-box;"></div>
        // `;
        //
        // // 先删除已存在热区：
        // $('.wtc_stepConfig_config-hot-part', this.rootDom).remove();
        //
        // $(this.dom_container).append(hotPartStr);
        //
        // // 绑定事件：
        // $('.wtc_stepConfig_config-hot-part', this.rootDom).on('mouseenter', function () {
        //     $this.enterHotPart = true;
        // }).on('mouseleave', function () {
        //     $this.hideHotPart();
        // }).on('drop', function (event) {
        //     $this.drop(event.originalEvent, this)
        // })
    };

    /*
    * 删除热区
    * */
    KdWtcStepConfig.prototype.hideHotPart = function () {
        $('.wtc_stepConfig_svg-rect', this.rootDom).css('display', 'none');
        $('.wtc_stepConfig_span-top-bottom', this.rootDom).css({
            'border': 'none',
            'backgroundColor': 'initial'
        });
    };

    /*
    * 阶段/步骤拖动开始时触发
    * */
    KdWtcStepConfig.prototype.drag = function (type, event) {
        var dom_item = event.target.parentNode.parentNode;
        var objData = this.getDataPosition(dom_item);

        // 判断当前拖动的阶段、步骤是否允许拖动：
        if (objData.data.move) {
            var parentClass = dom_item.parentNode.className.split(' ')[1];
            var curClass = event.target.parentNode.parentNode.className.split(' ')[1];
            event.dataTransfer.setData("className", '.' + parentClass + ' .' + curClass);
            this.dragItemClass = '.' + parentClass + ' .' + curClass;
        } else {
            // 不允许拖动，阻止默认事件
            event.preventDefault();
        }
    };

    KdWtcStepConfig.prototype.drop = function (event, target) {
        event.preventDefault();
        // 删除热区：
        // $('.wtc_stepConfig_config-hot-part', this.rootDom).remove();

        var $this = this;
        var $target = $(target);
        var className = event.dataTransfer.getData("className");
        var dom_item = this.rootDom.querySelector(className);
        var dom_oldRow = dom_item.parentElement;

        var isAdd = this.moveItem($target, dom_item); // 将item放在指定位置
        // 判断item是否变化了位置：
        if (isAdd) {
            var dom_curRow = dom_item.parentElement;
            var isChangeRowNum = this.delEmptyRow(dom_oldRow); // 删除空的行，并调整className
            this.refreshLine(dom_curRow, dom_oldRow, isChangeRowNum);
            this.refreshLineEvent();
        }
    };

    /*
    * $target：hotPart热区块
    * dom_item：被移动的item，可能是phase-item，也可能是step-item的原生dom（它的父就是row）
    * */
    /*KdWtcStepConfig.prototype.moveItem = function ($target, dom_item) {
        let $this = this;
        let $dom_item = $(dom_item);
        let startItemClass = $target[0].className.split(' ')[1].slice(4);
        let endItemClass = $target[0].className.split(' ')[2] ? $target[0].className.split(' ')[2].slice(4) : 'null';
          // 需要判断要不要换位置，不用换位置则直接结束：
        if ($dom_item.hasClass(startItemClass) || $dom_item.hasClass(endItemClass)) {
            return false;
        }
          let $dom_targetRow = $('.' + startItemClass, this.rootDom).parent();
        // 判断移动的是阶段还是步骤：
        if ($dom_item.hasClass('item')) {  // 阶段
            return this.movePhase($dom_targetRow, dom_item, false)
        } else {
            // 先判断是不是拖到线上的，线上的就需要判断要不要换位置：
            if (endItemClass === 'null') {
                return this.moveStep_span($dom_targetRow, dom_item, $dom_targetRow.next().hasClass('step-row'));
            } else {
                return this.moveStep($dom_targetRow, dom_item);
            }
        }
    };*/

    /*
    * $target：两个span块的jQueryDom，或者线的jQueryDom
    * dom_item：被移动的item，可能是phase-item，也可能是step-item的原生dom（它的父就是row）
    * */
    KdWtcStepConfig.prototype.moveItem = function ($target, dom_item) {
        var $this = this;
        var $dom_item = $(dom_item);

        // 判断移动的是阶段还是步骤：
        if ($dom_item.hasClass('item')) {
            // 阶段
            var startPhaseClass = $target[0].className.baseVal.split(' ')[1].slice(4);
            var endPhaseClass = $target[0].className.baseVal.split(' ')[2].slice(4);
            // 需要判断要不要换位置：
            if ($dom_item.hasClass(startPhaseClass) || $dom_item.hasClass(endPhaseClass)) {
                return false;
            } else {
                var $dom_targetRow = $('.' + startPhaseClass, this.rootDom).parent();
                return this.movePhase($dom_targetRow, dom_item, false);
            }
        } else {
            // 先判断是不是拖到线上的，线上的就需要判断要不要换位置：
            if ($target.hasClass('wtc_stepConfig_span-top-bottom')) {
                // 拖入span块，判断需不需要替换：
                var dom_span = $('.wtc_stepConfig_span-top-bottom', dom_item);
                if (dom_span[0] === $target[0] || dom_span[1] === $target[0]) {
                    return false;
                } else {
                    // 目标行
                    // let $dom_targetRow = $target.parent().parent();

                    this.moveStep_span($target.parent(), dom_item, $target.hasClass('wtc_stepConfig_span-top'));
                    return false;
                }
            } else {
                var _startPhaseClass = $target[0].className.baseVal.split(' ')[1].slice(4);
                var _endPhaseClass = $target[0].className.baseVal.split(' ')[2].slice(4);
                if ($dom_item.hasClass(_startPhaseClass) || $dom_item.hasClass(_endPhaseClass)) {
                    return false;
                } else {
                    // 目标行
                    this.moveStep($('.' + _startPhaseClass, this.rootDom), dom_item);
                    return false;
                }
            }
        }
    };

    KdWtcStepConfig.prototype.movePhase = function ($dom_targetRow, dom_item, isBack) {
        var $this = this;
        var targetRowClass = $dom_targetRow[0].className.split(' ')[1];
        var rowNum = Number(targetRowClass.split('_')[1]);
        var newRowNum = rowNum + 1;

        // 判断是否可以移动：
        if (!this.data.data[rowNum - 1].move) return;

        var dom_oldRow = dom_item.parentElement;
        var oldRowClass = dom_oldRow.className.split(' ')[1];
        var oldRowNum = Number(oldRowClass.split('_')[1]);

        var objTempData = JSON.parse(JSON.stringify(this.data.data));
        // 将两个阶段数据交换：
        if (oldRowNum >= rowNum) {
            var tempData = objTempData.splice(oldRowNum - 1, 1);
            objTempData.splice(rowNum, 0, tempData[0]);
        } else {
            var _tempData = objTempData.splice(oldRowNum - 1, 1);
            objTempData.splice(rowNum - 1, 0, _tempData[0]);
        }

        // 判断移动后的阶段步骤是否符合移动规则：
        var isLegal = this.moveLegal('phase', objTempData);

        if (isLegal) {
            if (!isBack) {
                // 该删除操作推入栈：
                if (oldRowNum >= rowNum) {
                    $this.stack.push({
                        type: 'movePhase',
                        phasePosition: rowNum,
                        oldPhasePosition: oldRowNum - 1
                    });
                } else {
                    $this.stack.push({
                        type: 'movePhase',
                        phasePosition: rowNum - 1,
                        oldPhasePosition: oldRowNum - 1
                    });
                }
            }

            this.data.data = objTempData;

            // 行className调整：
            var dom_nextRow = $dom_targetRow[0].nextElementSibling;
            while ($(dom_nextRow).hasClass('row')) {
                dom_nextRow.className = 'row row_' + (rowNum + 2);
                rowNum++;
                dom_nextRow = dom_nextRow.nextElementSibling;
            }

            // 如果步骤框是展开的，则先隐藏步骤框
            var $dom_stepsWrap = $('.wtc_stepConfig_item-step', dom_item);
            if ($dom_stepsWrap.css('display') === 'block') {
                var dom_input = dom_item.querySelector('.wtc_stepConfig_item-main-text');
                this.toggleSteps(dom_input);
            }

            $dom_targetRow.after('<div class="row row_' + newRowNum + '"></div>');
            var $dom_newRow = $('.row_' + newRowNum, this.rootDom);
            $dom_newRow.append(dom_item);

            return true;
        } else {
            $this.myTool.message({
                type: 'warn',
                message: this.langText_message1
            });
            return false;
        }
    };

    KdWtcStepConfig.prototype.moveStep = function ($dom_targetItem, dom_item) {
        var $this = this;
        var $dom_targetRow = $dom_targetItem.parent();
        var targetRowClass = $dom_targetRow[0].className.split(' ')[1];
        var stepId = targetRowClass.split('-')[2];

        // 找出该步骤对应的阶段：
        var $dom_phaseRow = $dom_targetRow.parent().parent().parent();
        var phaseRowClass = $dom_phaseRow[0].className.split(' ')[1];
        var rowNum = Number(phaseRowClass.split('_')[1]);

        // 移动的步骤对应的行：
        var dom_oldRow = dom_item.parentElement;
        var oldRowClass = dom_oldRow.className.split(' ')[1];
        var oldStepId = oldRowClass.split('-')[2];

        // 找出步骤在data中的位置：
        var oldStepIndex = void 0;
        var stepIndex = void 0;
        for (var i = 0; i < this.data.data[rowNum - 1].steps.length; i++) {
            var objStep = this.data.data[rowNum - 1].steps[i];
            if (objStep.id == stepId) stepIndex = i;
            if (objStep.id == oldStepId) oldStepIndex = i;
        }

        var objTempData = JSON.parse(JSON.stringify(this.data.data));

        // 将两个步骤数据交换：
        if (oldStepIndex >= stepIndex) {
            var tempData = objTempData[rowNum - 1].steps.splice(oldStepIndex, 1);
            objTempData[rowNum - 1].steps.splice(stepIndex + 1, 0, tempData[0]);
        } else {
            var _tempData2 = objTempData[rowNum - 1].steps.splice(oldStepIndex, 1);
            objTempData[rowNum - 1].steps.splice(stepIndex, 0, _tempData2[0]);
        }

        // 判断移动后的阶段步骤是否符合移动规则：
        var isLegal = this.moveLegal('step', objTempData, rowNum - 1);

        if (isLegal) {
            // 该删除操作推入栈：
            if (oldStepIndex >= stepIndex) {
                $this.stack.push({
                    type: 'moveStep',
                    phasePosition: rowNum - 1,
                    stepPosition: stepIndex + 1,
                    oldStepPosition: oldStepIndex
                });
            } else {
                $this.stack.push({
                    type: 'moveStep',
                    phasePosition: rowNum - 1,
                    stepPosition: stepIndex,
                    oldStepPosition: oldStepIndex
                });
            }

            this.data.data = objTempData;

            $dom_targetRow.after(dom_item.parentElement);

            var dom_firstStepRow = $('.wtc_stepConfig_item-step', $dom_phaseRow).children()[0];
            this.refreshLine(dom_firstStepRow, dom_firstStepRow, true);
            this.refreshLineEvent();
        } else {
            $this.myTool.message({
                type: 'warn',
                message: this.langText_message1
            });
        }

        return false;
    };

    KdWtcStepConfig.prototype.moveStep_span = function ($dom_targetItem, dom_item, isTopSpan) {
        var $this = this;
        var $dom_targetRow = $dom_targetItem.parent();
        var targetRowClass = $dom_targetRow[0].className.split(' ')[1];
        var stepId = targetRowClass.split('-')[2];
        // 移动的步骤对应的行：
        var dom_oldRow = dom_item.parentElement;
        var oldRowClass = dom_oldRow.className.split(' ')[1];
        var oldStepId = oldRowClass.split('-')[2];

        // 找出该步骤对应的阶段：
        var $dom_phaseRow = $dom_targetRow.parent().parent().parent();
        var phaseRowClass = $dom_phaseRow[0].className.split(' ')[1];
        var rowNum = Number(phaseRowClass.split('_')[1]);

        // 找出步骤在data中的位置：
        var oldStepIndex = void 0;
        var stepIndex = void 0;
        for (var i = 0; i < this.data.data[rowNum - 1].steps.length; i++) {
            var objStep = this.data.data[rowNum - 1].steps[i];
            if (objStep.id == stepId) stepIndex = i;
            if (objStep.id == oldStepId) oldStepIndex = i;
        }

        var objTempData = JSON.parse(JSON.stringify(this.data.data));

        // 将两个步骤数据交换：
        var tempData = objTempData[rowNum - 1].steps.splice(oldStepIndex, 1);
        objTempData[rowNum - 1].steps.splice(stepIndex, 0, tempData[0]);

        // 判断移动后的阶段步骤是否符合移动规则：
        var isLegal = this.moveLegal('step', objTempData, rowNum - 1);

        if (isLegal) {
            // 该删除操作推入栈：
            $this.stack.push({
                type: 'moveStep',
                phasePosition: rowNum - 1,
                stepPosition: stepIndex,
                oldStepPosition: oldStepIndex
            });

            this.data.data = objTempData;

            // 判断是上span块，还是下span块：
            isTopSpan ? $dom_targetRow.before(dom_item.parentElement) : $dom_targetRow.after(dom_item.parentElement);

            var dom_firstStepRow = $('.wtc_stepConfig_item-step', $dom_phaseRow).children()[0];
            this.refreshLine(dom_firstStepRow, dom_firstStepRow, true);
            this.refreshLineEvent();
        } else {
            $this.myTool.message({
                type: 'warn',
                message: this.langText_message1
            });
        }

        return false;
    };

    /*
    * 如果行是空的则删除行并调整行序号，并返回是否删除了行
    * */
    KdWtcStepConfig.prototype.delEmptyRow = function (dom_oldRow) {
        var rowNum = dom_oldRow.className.split(' ')[1];
        rowNum = Number(rowNum.split('_')[1]);

        if (dom_oldRow.innerHTML.trim() === '') {
            // 删除该行：
            dom_oldRow.parentNode.removeChild(dom_oldRow);
            // 行className调整：
            var dom_nextRow = this.rootDom.querySelector('.row_' + (rowNum + 1));
            while (dom_nextRow) {
                dom_nextRow.className = 'row row_' + rowNum;
                rowNum++;
                dom_nextRow = this.rootDom.querySelector('.row_' + (rowNum + 1));
            }
            return true;
        }
        return false;
    };

    /*
    * 刷新连线（阶段+子步骤）
    * dom_curRow: 目标行（原生dom）
    * dom_oldRow: 原始行（原生dom）
    * isChangeRowHeight：是否改变了行的高度
    * */
    KdWtcStepConfig.prototype.refreshLine = function (dom_curRow, dom_oldRow, isChangeRowHeight) {
        // 先删除该item原先的线：
        var curRowClass = dom_curRow.className.split(' ')[1];
        var oldRowClass = dom_oldRow.className.split(' ')[1];
        // 这两行可能被删除了，序号被重置，需要从行获取序号对应的行：
        dom_curRow = this.rootDom.querySelector('.' + curRowClass);
        dom_oldRow = this.rootDom.querySelector('.' + oldRowClass);

        // 找出上面的行：
        var minRowClass = curRowClass >= oldRowClass ? oldRowClass : curRowClass;

        // 获取需要删除线的所有阶段与步骤项：
        var items = void 0;
        if (isChangeRowHeight) {
            // 行高度改变了，需要调整连线
            items = [];
            // 删除行的下方所有行的连线都需要重置：
            var nextRow = this.rootDom.querySelector('.' + minRowClass);
            while ($(nextRow).hasClass('row') || $(nextRow).hasClass('step-row')) {
                var _items;

                (_items = items).push.apply(_items, _toConsumableArray(nextRow.children));
                var $dom_stepsWrap = $('.wtc_stepConfig_item-step', nextRow);
                for (var i = 0; i < $dom_stepsWrap.length; i++) {
                    if ($($dom_stepsWrap[i]).css('display') !== 'none') {
                        var _items2;

                        (_items2 = items).push.apply(_items2, _toConsumableArray($dom_stepsWrap[i].querySelectorAll('.step-item')));
                    }
                }
                nextRow = nextRow.nextElementSibling;
            }
        } else {
            if (dom_curRow === dom_oldRow) {
                items = [].concat(_toConsumableArray(dom_curRow.children));
                var _$dom_stepsWrap = $('.wtc_stepConfig_item-step', dom_curRow);
                for (var _i2 = 0; _i2 < _$dom_stepsWrap.length; _i2++) {
                    if ($(_$dom_stepsWrap[_i2]).css('display') !== 'none') {
                        var _items3;

                        (_items3 = items).push.apply(_items3, _toConsumableArray(_$dom_stepsWrap[_i2].querySelectorAll('.step-item')));
                    }
                }
            } else {
                items = [].concat(_toConsumableArray(dom_curRow.children), _toConsumableArray(dom_curRow.querySelector('.step-item')), _toConsumableArray(dom_oldRow.children), _toConsumableArray(dom_oldRow.querySelector('.step-item')));
                var _$dom_stepsWrap2 = $('.wtc_stepConfig_item-step', dom_curRow);
                var $dom_stepsWrap1 = $('.wtc_stepConfig_item-step', dom_oldRow);
                var arrTemp = [].concat(_toConsumableArray(_$dom_stepsWrap2), _toConsumableArray($dom_stepsWrap1));
                for (var _i3 = 0; _i3 < arrTemp.length; _i3++) {
                    if ($(arrTemp[_i3]).css('display') !== 'none') {
                        var _items4;

                        (_items4 = items).push.apply(_items4, _toConsumableArray(arrTemp[_i3].querySelectorAll('.step-item')));
                    }
                }
            }
        }

        // 删除线：
        this.itemDisconnect(items);

        // 获取需要重新连线的所有项：
        if (isChangeRowHeight) {
            var _items5;

            var first_preRow = this.rootDom.querySelector('.' + minRowClass).previousElementSibling;
            if (first_preRow) (_items5 = items).push.apply(_items5, _toConsumableArray(first_preRow.children));
        } else {
            if (curRowClass > oldRowClass) {
                var _items6;

                // 连线时，需要获取找出两个变动行的前一行的item（别重复了），因为根据函数itemConnect，item只会向下连线
                var _first_preRow = this.rootDom.querySelector('.' + oldRowClass).previousElementSibling;
                if (_first_preRow) (_items6 = items).push.apply(_items6, _toConsumableArray(_first_preRow.children));

                var last_preRow = dom_curRow.previousElementSibling;
                if (last_preRow && last_preRow.className.split(' ')[1] !== oldRowClass) {
                    var _items7;

                    (_items7 = items).push.apply(_items7, _toConsumableArray(last_preRow.children));
                }
            } else if (curRowClass < oldRowClass) {
                var _items8;

                // 连线时，需要获取找出两个变动行的前一行的item（别重复了），因为根据函数itemConnect，item只会向下连线
                var _first_preRow2 = dom_curRow.previousElementSibling;
                if (_first_preRow2) (_items8 = items).push.apply(_items8, _toConsumableArray(_first_preRow2.children));

                var oldRow = this.rootDom.querySelector('.' + oldRowClass);
                if (oldRow) {
                    var _last_preRow = oldRow.previousElementSibling;
                    if (_last_preRow && _last_preRow.className.split(' ')[1] !== curRowClass) {
                        var _items9;

                        (_items9 = items).push.apply(_items9, _toConsumableArray(_last_preRow.children));
                    }
                }
            } else {
                var _items10;

                var _first_preRow3 = dom_curRow.previousElementSibling;
                if (_first_preRow3) (_items10 = items).push.apply(_items10, _toConsumableArray(_first_preRow3.children));
            }
        }

        // 重新连线：
        var lineStr = this.itemConnect(items);
        $(this.dom_container).append(lineStr);
    };

    KdWtcStepConfig.prototype.clickHandle = function (target) {
        var $this = this;
        // 判断目标的类名来区分具体的事件：
        if (typeof target.className === 'string') {
            switch (target.className) {
                case 'wtc_stepConfig_icon-step-num':
                    // 点击数字圈，展开收起步骤
                    $this.toggleSteps(target);
                    break;
                case 'wtc_stepConfig_item-input wtc_stepConfig_item-main-text': // 点击阶段框
                case 'wtc_stepConfig_item-input wtc_stepConfig_item-main-text item-main-active':
                    if ($(target).hasClass('item-main-active')) return; //当前已选中，不重复执行
                    // 添加定时器用于解决双击时也会触发单机事件的问题
                    clearTimeout($this.timer);
                    $this.timer = setTimeout(function () {
                        $('.wtc_stepConfig_item-input', $this.dom_container).removeClass('item-main-active');
                        $(target).addClass('item-main-active');
                        if ($this.data.power) {
                            // 有权限显示高级配置
                            $this.showSeniorSet(target.parentElement.parentElement);
                        }
                    }, 240);
                    break;
                case 'wtc_stepConfig_item-input wtc_stepConfig_item-step-text': // 点击步骤框
                case 'wtc_stepConfig_item-input wtc_stepConfig_item-step-text item-main-active':
                    if ($(target).hasClass('item-main-active')) return; //当前已选中，不重复执行
                    $('.wtc_stepConfig_item-input', this.dom_container).removeClass('item-main-active');
                    $(target).addClass('item-main-active');
                    if (this.data.power) {
                        // 有权限显示高级配置
                        this.showSeniorSet(target.parentElement.parentElement);
                    }
                    break;
                case 'wtc_stepConfig_icon-set kdfont kdfont-shezhi11': // 阶段/步骤设置按钮
                case 'wtc_stepConfig_icon-set kdfont kdfont-yanjing':
                    // 阶段/步骤查看按钮
                    $('.wtc_stepConfig_item-input', $this.dom_container).removeClass('item-main-active');
                    $('.wtc_stepConfig_item-input', target.parentElement.parentElement).addClass('item-main-active');
                    $this.setEvent(target);
                    if (this.data.power) {
                        // 有权限显示高级配置
                        this.showSeniorSet(target.parentElement.parentElement.parentElement);
                    }
                    break;
                case 'wtc_stepConfig_icon-del kdfont kdfont-shanchu7':
                    // 删除按钮
                    $('.wtc_stepConfig_item-input', $this.dom_container).removeClass('item-main-active');
                    $('.wtc_stepConfig_item-input', target.parentElement.parentElement).addClass('item-main-active');
                    $this.delEvent(target);
                    if (this.data.power) {
                        // 有权限显示高级配置
                        this.showSeniorSet(target.parentElement.parentElement.parentElement);
                    }
                    break;
            }
        } else {
            // svg的dom比较特别，target.className是个对象
            if (target.className.baseVal === 'add-btn') {
                $this.addPhaseClick(target);
            }
        }
    };

    /*
    * 显示高级配置弹窗，并根据当前选中的阶段/步骤，修改弹窗数据
    * target：当前选中的阶段/步骤
    * */
    KdWtcStepConfig.prototype.showSeniorSet = function (target) {
        $('.wtc_stepConfig_senior-dialog').css('display', 'block');

        var objData = this.getDataPosition(target);
        this.modifySeniorSetData(objData.type, objData.data.phaseResultDeal, objData.data.phaseSave, objData.data.noReturnHandler);
        // 修改设置弹窗的位置：
        // let dom_wrap = this.rootDom.querySelector('.wtc_stepConfig_wrap');
        // let dom_scrollArea = this.rootDom.parentElement.parentElement.parentElement.parentElement.parentElement;
        var position = this.getPosition(target, null).top - 50;
        var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        if (objData.type === 'phase' && position + 470 > clientHeight) position = clientHeight - 470;
        if (objData.type === 'step' && position + 350 > clientHeight) position = clientHeight - 350;
        $('.wtc_stepConfig_senior-dialog', this.rootDom).css('top', position + 'px');
    };

    /*
    * phaseResultDeal: 0,  //阶段结果处理：0合并，1覆盖
    * phaseSave: 0,  //阶段落库：0否，1 是
    * noReturnHandler: 0,  //无输出决策器：0下一步，1继续，2跳出，3终止，4错误
    * */
    KdWtcStepConfig.prototype.modifySeniorSetData = function (type, phaseResultDeal, phaseSave, noReturnHandler) {
        if (type === 'phase') {
            $('.wtc_stepConfig_senior-dialog-set2', this.rootDom).css('display', 'block');

            // 阶段落库为否时，阶段结果处理不显示,否则显示：
            if (phaseSave == 0) {
                $('.wtc_stepConfig_senior-dialog-set1', this.rootDom).css('display', 'none');
            } else {
                $('.wtc_stepConfig_senior-dialog-set1', this.rootDom).css('display', 'block');
            }

            //标题修改：
            var activeInputVal = $('.item-main-active', this.rootDom).val();
            var $dom_dialogName = $('.wtc_stepConfig_senior-dialog-phase-name', this.rootDom);
            $dom_dialogName.html('阶段：' + activeInputVal);
            // 阶段结果处理数据修改：
            var $dom_set1 = $('.wtc_stepConfig_senior-dialog-set1', this.rootDom); // 阶段结果处理
            $('.wtc_stepConfig_senior-dialog-options-item', $dom_set1).removeClass('wtc_stepConfig_senior-dialog-options-item-active');
            var _$dom_activeItem = $('.wtc_stepConfig_senior-dialog-options-item[index=' + phaseResultDeal + ']', $dom_set1);
            _$dom_activeItem.addClass('wtc_stepConfig_senior-dialog-options-item-active');
            var _$dom_selected = $('.wtc_stepConfig_senior-dialog-selected', $dom_set1);
            _$dom_selected.html(_$dom_activeItem.html());

            // 阶段落库数据修改：
            var $dom_set2 = $('.wtc_stepConfig_senior-dialog-set2', this.rootDom); // 阶段落库
            $('.wtc_stepConfig_senior-dialog-options-item', $dom_set2).removeClass('wtc_stepConfig_senior-dialog-options-item-active');
            _$dom_activeItem = $('.wtc_stepConfig_senior-dialog-options-item[index=' + phaseSave + ']', $dom_set2);
            _$dom_activeItem.addClass('wtc_stepConfig_senior-dialog-options-item-active');
            _$dom_selected = $('.wtc_stepConfig_senior-dialog-selected', $dom_set2);
            _$dom_selected.html(_$dom_activeItem.html());
        } else {
            $('.wtc_stepConfig_senior-dialog-set1', this.rootDom).css('display', 'none');
            $('.wtc_stepConfig_senior-dialog-set2', this.rootDom).css('display', 'none');
            //标题修改：
            var _activeInputVal = $('.item-main-active', this.rootDom).val();
            var _$dom_dialogName = $('.wtc_stepConfig_senior-dialog-phase-name', this.rootDom);
            _$dom_dialogName.html('步骤：' + _activeInputVal);
        }

        // 无输出决策器数据修改：
        var $dom_set3 = $('.wtc_stepConfig_senior-dialog-set3', this.rootDom); // 无输出决策器
        $('.wtc_stepConfig_senior-dialog-options-item', $dom_set3).removeClass('wtc_stepConfig_senior-dialog-options-item-active');
        var $dom_activeItem = $('.wtc_stepConfig_senior-dialog-options-item[index=' + noReturnHandler + ']', $dom_set3);
        $dom_activeItem.addClass('wtc_stepConfig_senior-dialog-options-item-active');
        var $dom_selected = $('.wtc_stepConfig_senior-dialog-selected', $dom_set3);
        $dom_selected.html($dom_activeItem.html());
    };

    /*
    * target: 新增阶段按钮的原生dom
    * */
    KdWtcStepConfig.prototype.addPhaseClick = function (target) {
        var svgClass = target.parentElement.parentElement.className.baseVal;
        var startItemClass = svgClass.split(' ')[1].split('-')[1];
        var dom_curRow = this.dom_container.querySelector('.' + startItemClass).parentElement;
        var curRowClass = dom_curRow.className.split(' ')[1];
        var curRowNum = Number(curRowClass.split('_')[1]);

        var otherSteps = [];
        var otherPhaseList = [];
        for (var i = 0; i < this.data.data.length; i++) {
            otherPhaseList.push({
                phaseId: this.data.data[i].phaseId,
                phase: this.data.data[i].phase
            });
            for (var j = 0; j < this.data.data[i].steps.length; j++) {
                otherSteps.push(this.data.data[i].steps[j].id);
            }
        }

        this.model.invoke('addphase', { position: curRowNum, othersteps: otherSteps, otherPhaseList: otherPhaseList });

        // todo 以下是测试代码
        /*let data = [{
            phase: new Date().getTime(),
            del: true,
            steps: [{
                id: new Date().getTime(),
                step: '步骤11',
                del: true,
                syspreset: false,
                index: 0,
                bitindex: 0,
                startdate: '2021-08-11',
                enddate: '2021-08-12',
                resulttype: '1',
                calrule: '1',
                repeat: false
            }, {
                id: new Date().getTime() + 1,
                step: '步骤12',
                del: true,
                syspreset: true,
                index: 8,
                bitindex: 10,
                startdate: '2021-08-11',
                enddate: '2021-08-12',
                resulttype: '1',
                calrule: '1',
                repeat: false
            }]
        }];
        this.addPhase(curRowNum, data);*/
    };

    /*
    * 新增阶段
    * position: 新增阶段的位置（对应在数组中的序号）
    * data: 新增阶段的数据
    * */
    KdWtcStepConfig.prototype.addPhase = function (position, data) {
        var $this = this;

        var objTempData = JSON.parse(JSON.stringify(this.data.data));
        // 将新增的阶段数据添加到this.data中：
        objTempData.splice(position, 0, data[0]);

        // 判断移动后的阶段步骤是否符合移动规则：
        var isLegal = this.moveLegal('phase', objTempData);

        if (isLegal) {
            // 该新增操作推入栈：
            this.stack.push({
                type: 'add',
                phasePosition: position
            });

            this.data.data = objTempData;
            this.addPhase_inner(position, data);
        } else {
            $this.myTool.message({
                type: 'warn',
                message: '\u201C' + data[0].phase + '\u201D' + $this.langText_message2
            });
        }
    };

    KdWtcStepConfig.prototype.addPhase_inner = function (position, data) {
        var $this = this;
        var dom_curRow = this.dom_container.querySelector('.row_' + position);
        var rowNum = position + 1; // 需要调整行序号的行

        $this.itemIndex++;
        // 行className调整：
        var dom_nextRow = this.rootDom.querySelector('.row_' + rowNum);
        while ($(dom_nextRow).hasClass('row')) {
            dom_nextRow.className = 'row row_' + (rowNum + 1);
            rowNum++;
            dom_nextRow = dom_nextRow.nextElementSibling;
        }

        var str = '\n                <div class="row row_' + (position + 1) + '">\n                    <div class="item item' + this.itemIndex + '">\n                        <div class="item-span-left"></div>\n                        <div class="item-main">\n                            <div class="item-main-top-dot"></div>\n                            <div class="item-main-bottom-dot"></div>\n                            <input class="wtc_stepConfig_item-input wtc_stepConfig_item-main-text" title="' + data[0].phase + '" value="' + data[0].phase + '" disabled draggable="true">\n                            <i class="wtc_stepConfig_icon-step-num" stepnum="' + data[0].steps.length + '">' + data[0].steps.length + '</i>\n                            <div class="wtc_stepConfig_icon-wrap">\n                                <i class="wtc_stepConfig_icon-set kdfont kdfont-shezhi11"></i>\n                                ' + (data[0].del ? '<i class="wtc_stepConfig_icon-del kdfont kdfont-shanchu7"></i>' : '') + '\n                            </div>\n                        </div>\n                        <div class="item-span-right"></div>\n                        <div class="wtc_stepConfig_item-step">\n         ';
        for (var j = 0; j < data[0].steps.length; j++) {
            var objStep = data[0].steps[j];
            var setIcon = objStep.syspreset ? 'kdfont-yanjing' : 'kdfont-shezhi11'; // 预制数据只能查看，所以用眼睛的icon
            objStep.desc = objStep.desc || '无';
            var desc_firstText = objStep.desc.slice(0, 48);
            var desc_otherText = objStep.desc.slice(48);
            str += '\n                    <div class="step-row step-row-' + objStep.id + '">\n                        <div class="step-item step-item-' + objStep.id + '">\n                            <div class="wtc_stepConfig_span-top-bottom wtc_stepConfig_span-top" style="position:absolute;top:-20px;left:50%;transform: translateX(-50%);width: 60px;height: 20px;"></div>\n                            <div class="wtc_stepConfig_span-top-bottom wtc_stepConfig_span-bottom" style="position:absolute;bottom:-20px;left:50%;transform: translateX(-50%);width: 60px;height: 20px;"></div>\n                            <div class="item-span-left"></div>\n                            <div class="item-main item-main-step">\n                                <div class="item-main-top-dot"></div>\n                                <div class="item-main-bottom-dot"></div>\n                                <input class="wtc_stepConfig_item-input wtc_stepConfig_item-step-text" value="' + objStep.step + '" disabled draggable="true">\n                                <div class="wtc_stepConfig_step-detail">\n                                    <div class="wtc_stepConfig_step-detail-item">' + objStep.step + '</div>\n                                    <div class="wtc_stepConfig_step-detail-item">' + this.langText_effectiveDate + '\uFF1A' + objStep.startdate + '</div>\n                                    <div class="wtc_stepConfig_step-detail-item">' + this.langText_resultType + '\uFF1A' + (objStep.resulttype == '1' ? this.langText_timePair : this.langText_itemValue) + '</div>\n                                    <div class="wtc_stepConfig_step-detail-item">' + this.langText_calrule + '\uFF1A' + (objStep.calrule == '1' ? this.langText_customFormula : this.langText_customCode) + '</div>\n                                    <div class="wtc_stepConfig_step-detail-item">\n                                        <span class="wtc_stepConfig_step-detail-item-first-text">' + this.langText_desc + '\uFF1A' + desc_firstText + '</span>\n                                        <span class="wtc_stepConfig_step-detail-item-other-text">' + desc_otherText + '</span>\n                                        ' + (desc_otherText ? '<span class="wtc_stepConfig_step-detail-item-open">展开</span>' : '') + '\n                                    </div>\n                                </div>\n                                <div class="wtc_stepConfig_icon-wrap">\n                                    <i class="wtc_stepConfig_icon-set kdfont ' + setIcon + '"></i>\n                                    ' + (objStep.del ? '<i class="wtc_stepConfig_icon-del kdfont kdfont-shanchu7"></i>' : '') + '\n                                </div>\n                            </div>\n                            <div class="item-span-right"></div>\n                        </div>\n                    </div>\n                ';
        }

        str += '</div></div></div>';

        $(dom_curRow).after(str);

        var $dom_newRow = $('.row_' + (position + 1), this.rootDom);

        this.refreshLine($dom_newRow[0], $dom_newRow[0], true);
        this.refreshLineEvent();

        // 给新增的item绑定，经过以及放入span块时触发事件：
        $('.wtc_stepConfig_span-top-bottom', $this.rootDom).on({
            dragover: function dragover(event) {
                $this.allowDrop(event.originalEvent, this);
            },
            dragleave: function dragleave(event) {
                $this.hideHotPart();
            },
            drop: function drop(event) {
                $this.drop(event.originalEvent, this);
            }
        });
        $('.wtc_stepConfig_svg-wrap', $this.rootDom).on({
            dragover: function dragover(event) {
                $this.allowDrop(event.originalEvent, this);
            },
            dragleave: function dragleave(event) {
                $this.hideHotPart();
            },
            drop: function drop(event) {
                $this.drop(event.originalEvent, this);
            }
        });

        // 给新增的item绑定拖起事件
        $('.item', $dom_newRow).on({
            dragstart: function dragstart(event) {
                $this.drag('phase', event.originalEvent);
            },
            dragend: function dragend() {
                $this.hideHotPart();
            }
        });
        $('.step-item', $dom_newRow).on({
            dragstart: function dragstart(event) {
                event.stopPropagation(); //阻止冒泡
                $this.drag('step', event.originalEvent);
            },
            dragend: function dragend() {
                $this.hideHotPart();
            }
        });

        $('.item-main', $dom_newRow).on({
            'mouseenter.showIcon': function mouseenterShowIcon() {
                $('.wtc_stepConfig_icon-wrap', this).css('display', 'block');
            },
            'mouseleave.showIcon': function mouseleaveShowIcon() {
                $('.wtc_stepConfig_icon-wrap', this).css('display', 'none');
            }
        });

        // 输入框失焦事件：
        var $dom_phaseInput = $('.wtc_stepConfig_item-main-text', $dom_newRow);
        $dom_phaseInput.on('blur', function () {
            $this.modifyName_confirm(this);
        });
        //高亮新增的这个阶段：
        $this.clickHandle($dom_phaseInput[0]);

        $('.item-main-step', $dom_newRow).hover(function (event) {
            this.parentElement.parentElement.parentElement.parentElement.style.zIndex = 4;
        }, function (event) {
            this.parentElement.parentElement.parentElement.parentElement.style.zIndex = 3;
        });

        // 步骤详情展开更多描述事件：
        $('.wtc_stepConfig_step-detail-item-open', $dom_newRow).click(function () {
            $('.wtc_stepConfig_step-detail-item-other-text', this.parentElement).css('display', 'inline'); //显示更多文本
            $(this).css('display', 'none'); //隐藏“展开”
        });
        // 步骤详情收起更多描述事件：
        $('.item-main', $dom_newRow).mouseleave(function () {
            if ($('.wtc_stepConfig_step-detail-item-other-text', this.parentElement).html()) {
                $('.wtc_stepConfig_step-detail-item-other-text', this.parentElement).css('display', 'none'); //隐藏更多文本
                $('.wtc_stepConfig_step-detail-item-open', this.parentElement).css('display', 'inline'); //显示“展开”
            }
        });
    };

    KdWtcStepConfig.prototype.addStep = function (phasePosition, stepPosition, data) {
        var $this = this;
        var $dom_phaseRow = $('.row_' + (phasePosition + 1), this.dom_container);
        var dom_stepRow = $('.step-row', $dom_phaseRow)[stepPosition - 1 < 0 ? 0 : stepPosition - 1];
        var setIcon = data.syspreset ? 'kdfont-yanjing' : 'kdfont-shezhi11'; // 预制数据只能查看，所以用眼睛的icon
        data.desc = data.desc || '无';
        var desc_firstText = data.desc.slice(0, 48);
        var desc_otherText = data.desc.slice(48);
        var str = '\n                    <div class="step-row step-row-' + data.id + '">\n                        <div class="step-item step-item-' + data.id + '">\n                            <div class="wtc_stepConfig_span-top-bottom wtc_stepConfig_span-top" style="position:absolute;top:-20px;left:50%;transform: translateX(-50%);width: 60px;height: 20px;"></div>\n                            <div class="wtc_stepConfig_span-top-bottom wtc_stepConfig_span-bottom" style="position:absolute;bottom:-20px;left:50%;transform: translateX(-50%);width: 60px;height: 20px;"></div>\n                            <div class="item-span-left"></div>\n                            <div class="item-main item-main-step">\n                                <div class="item-main-top-dot"></div>\n                                <div class="item-main-bottom-dot"></div>\n                                <input class="wtc_stepConfig_item-input wtc_stepConfig_item-step-text" value="' + data.step + '" disabled draggable="true">\n                                <div class="wtc_stepConfig_step-detail">\n                                    <div class="wtc_stepConfig_step-detail-item">' + data.step + '</div>\n                                    <div class="wtc_stepConfig_step-detail-item">' + this.langText_effectiveDate + '\uFF1A' + data.startdate + '</div>\n                                    <div class="wtc_stepConfig_step-detail-item">' + this.langText_resultType + '\uFF1A' + (data.resulttype == '1' ? this.langText_timePair : this.langText_itemValue) + '</div>\n                                    <div class="wtc_stepConfig_step-detail-item">' + this.langText_calrule + '\uFF1A' + (data.calrule == '1' ? this.langText_customFormula : this.langText_customCode) + '</div>\n                                    <div class="wtc_stepConfig_step-detail-item">\n                                        <span class="wtc_stepConfig_step-detail-item-first-text">' + this.langText_desc + '\uFF1A' + desc_firstText + '</span>\n                                        <span class="wtc_stepConfig_step-detail-item-other-text">' + desc_otherText + '</span>\n                                        ' + (desc_otherText ? '<span class="wtc_stepConfig_step-detail-item-open">展开</span>' : '') + '\n                                    </div>\n                                </div>\n                                <div class="wtc_stepConfig_icon-wrap">\n                                    <i class="wtc_stepConfig_icon-set kdfont ' + setIcon + '"></i>\n                                    ' + (data.del ? '<i class="wtc_stepConfig_icon-del kdfont kdfont-shanchu7"></i>' : '') + '\n                                </div>\n                            </div>\n                            <div class="item-span-right"></div>\n                        </div>\n                    </div>\n                ';

        stepPosition - 1 < 0 ? $(dom_stepRow).before(str) : $(dom_stepRow).after(str);

        var $dom_newRow = $('.step-row-' + data.id, $dom_phaseRow);

        // 调整行的高度
        $dom_phaseRow.css('padding-bottom', parseInt($dom_phaseRow.css('padding-bottom')) + 52 + 'px');

        this.refreshLine($dom_phaseRow[0], $dom_phaseRow[0], true);
        this.refreshLineEvent();

        // 给新增的item绑定，经过以及放入span块时触发事件：
        $('.wtc_stepConfig_span-top-bottom', $dom_newRow).on({
            dragover: function dragover(event) {
                $this.allowDrop(event.originalEvent, this);
            },
            dragleave: function dragleave(event) {
                $this.hideHotPart();
            },
            drop: function drop(event) {
                $this.drop(event.originalEvent, this);
            }
        });
        $('.wtc_stepConfig_svg-wrap', $dom_newRow).on({
            dragover: function dragover(event) {
                $this.allowDrop(event.originalEvent, this);
            },
            dragleave: function dragleave(event) {
                $this.hideHotPart();
            },
            drop: function drop(event) {
                $this.drop(event.originalEvent, this);
            }
        });

        // 给新增的item绑定拖起事件
        $('.step-item', $dom_newRow).on({
            dragstart: function dragstart(event) {
                event.stopPropagation(); //阻止冒泡
                $this.drag('step', event.originalEvent);
            },
            dragend: function dragend() {
                $this.hideHotPart();
            }
        });

        $('.item-main', $dom_newRow).on({
            'mouseenter.showIcon': function mouseenterShowIcon() {
                $('.wtc_stepConfig_icon-wrap', this).css('display', 'block');
            },
            'mouseleave.showIcon': function mouseleaveShowIcon() {
                $('.wtc_stepConfig_icon-wrap', this).css('display', 'none');
            }
        });

        $('.item-main-step', $dom_newRow).hover(function (event) {
            this.parentElement.parentElement.parentElement.parentElement.style.zIndex = 4;
        }, function (event) {
            this.parentElement.parentElement.parentElement.parentElement.style.zIndex = 3;
        });

        // 步骤详情展开更多描述事件：
        $('.wtc_stepConfig_step-detail-item-open', $dom_newRow).click(function () {
            $('.wtc_stepConfig_step-detail-item-other-text', this.parentElement).css('display', 'inline'); //显示更多文本
            $(this).css('display', 'none'); //隐藏“展开”
        });
    };

    /*
    * 展开收起步骤
    * target: input输入框的原生dom
    * */
    KdWtcStepConfig.prototype.toggleSteps = function (target) {
        var $dom_stepsWrap = $('.wtc_stepConfig_item-step', target.parentElement.parentElement);

        if ($dom_stepsWrap.css('display') === 'block') {
            this.foldSteps(target);
        } else {
            this.openSteps(target);
        }
    };

    KdWtcStepConfig.prototype.openSteps = function (target) {
        var $target = $(target);
        var dom_curPhase = target.parentElement.parentElement;
        var $dom_curRow = $(dom_curPhase.parentElement);
        var $dom_stepsWrap = $('.wtc_stepConfig_item-step', target.parentElement.parentElement);

        // 数量icon变化
        if ($target.hasClass('wtc_stepConfig_item-main-text')) {
            target.nextElementSibling.innerHTML = '-';
        } else {
            target.innerHTML = '-';
        }
        // 显示步骤
        $dom_stepsWrap.show();
        // 调整行的高度
        $dom_curRow.css('padding-bottom', parseInt($dom_curRow.css('padding-bottom')) + $dom_stepsWrap.height() - 20 + 'px');
        // 步骤连线：
        var $dow_steps = $('.step-item', $dom_stepsWrap);
        var lineStr = this.itemConnect($dow_steps);
        $(this.dom_container).append(lineStr);

        // 刷新其他行的阶段，步骤连线：
        var $dom_nextRow = $($dom_curRow[0].nextElementSibling);
        this.refreshLine($dom_nextRow[0], $dom_curRow[0], true);
        this.refreshLineEvent();
    };

    KdWtcStepConfig.prototype.foldSteps = function (target) {
        var $target = $(target);
        var dom_curPhase = target.parentElement.parentElement;
        var $dom_curRow = $(dom_curPhase.parentElement);
        var $dom_stepsWrap = $('.wtc_stepConfig_item-step', target.parentElement.parentElement);

        // 数量icon变化
        if ($target.hasClass('wtc_stepConfig_item-main-text')) {
            target.nextElementSibling.innerHTML = target.nextElementSibling.getAttribute("stepnum");
        } else {
            target.innerHTML = target.getAttribute("stepnum");
        }
        // 调整行的高度
        $dom_curRow.css('padding-bottom', parseInt($dom_curRow.css('padding-bottom')) - $dom_stepsWrap.height() + 20 + 'px');
        // 隐藏步骤
        $dom_stepsWrap.hide();
        // 步骤断线：
        var $dow_steps = $('.step-item', $dom_stepsWrap);
        this.itemDisconnect($dow_steps);

        // 刷新其他行的阶段，步骤连线：
        var $dom_nextRow = $($dom_curRow[0].nextElementSibling);
        this.refreshLine($dom_nextRow[0], $dom_curRow[0], true);
        this.refreshLineEvent();
    };

    /*
    * 点击阶段设置按钮，或者步骤设置按钮
    * */
    KdWtcStepConfig.prototype.setEvent = function (target) {
        // 判断是设置步骤还是设置阶段：
        var $dom_curItem = $(target.parentElement.parentElement.parentElement);

        if ($dom_curItem.hasClass('step-item')) {
            var stepId = $dom_curItem[0].className.split(' ')[1].split('-')[2];
            this.model.invoke('editsteps', { stepid: stepId });
        } else {
            var dom_curRow = $dom_curItem[0].parentElement;
            var curRowClass = dom_curRow.className.split(' ')[1];
            var curRowNum = Number(curRowClass.split('_')[1]);

            var curStep = [];
            for (var i = 0; i < this.data.data[curRowNum - 1].steps.length; i++) {
                curStep.push({
                    id: this.data.data[curRowNum - 1].steps[i].id,
                    noReturnHandler: this.data.data[curRowNum - 1].steps[i].noReturnHandler,
                    move: this.data.data[curRowNum - 1].steps[i].move,
                    del: this.data.data[curRowNum - 1].steps[i].del
                });
            }

            var otherSteps = [];
            var otherPhaseList = [];
            for (var _i4 = 0; _i4 < this.data.data.length; _i4++) {
                if (_i4 !== curRowNum - 1) {
                    otherPhaseList.push({
                        phaseId: this.data.data[_i4].phaseId,
                        phase: this.data.data[_i4].phase
                    });
                    for (var j = 0; j < this.data.data[_i4].steps.length; j++) {
                        otherSteps.push(this.data.data[_i4].steps[j].id);
                    }
                }
            }

            this.model.invoke('editphase', {
                phase: this.data.data[curRowNum - 1].phase,
                phaseId: this.data.data[curRowNum - 1].phaseId,
                move: this.data.data[curRowNum - 1].move,
                noReturnHandler: this.data.data[curRowNum - 1].noReturnHandler,
                phaseResultDeal: this.data.data[curRowNum - 1].phaseResultDeal,
                phaseSave: this.data.data[curRowNum - 1].phaseSave,
                phasenumber: this.data.data[curRowNum - 1].phasenumber,
                position: curRowNum,
                steps: curStep,
                othersteps: otherSteps,
                otherPhaseList: otherPhaseList
            });

            // todo 以下是测试代码
            /*let data = [{
                phase: new Date().getTime(),
                del: true,
                steps: [{
                    id: new Date().getTime(),
                    step: '步骤111',
                    del: true,
                    syspreset: true,
                    index: 1,
                    startdate: '2021-08-11',
                    enddate: '2021-08-12',
                    resulttype: '1',
                    calrule: '1',
                    repeat: false
                }, {
                    id: new Date().getTime() + 1,
                    step: '步骤122',
                    del: true,
                    syspreset: true,
                    index: 2,
                    startdate: '2021-08-11',
                    enddate: '2021-08-12',
                    resulttype: '1',
                    calrule: '1',
                    repeat: false
                }]
            }];
            this.modifyPhase(curRowNum, data);*/
        }
    };

    /*
    * 修改阶段（包括步骤）
    * 用户点击设置阶段按钮后，该阶段数据需要替换，该阶段dom重新渲染
    * */
    KdWtcStepConfig.prototype.modifyPhase = function (position, data) {
        var $this = this;

        var objTempData = JSON.parse(JSON.stringify(this.data.data));
        // 将修改的阶段数据替换到this.data中：
        objTempData.splice(position - 1, 1, data[0]);

        // 判断移动后的阶段步骤是否符合移动规则：
        var isLegal = this.moveLegal('step', objTempData, position - 1);

        if (isLegal) {
            // 该修改操作推入栈：
            this.stack.push({
                type: 'modify',
                phasePosition: position - 1,
                data: this.data.data[position - 1]
            });

            this.data.data = objTempData;
            this.modifyPhase_inner(position, data);
        } else {
            $this.myTool.message({
                type: 'warn',
                message: '\u201C' + data[0].phase + '\u201D' + $this.langText_message2
            });
        }
    };

    KdWtcStepConfig.prototype.modifyPhase_inner = function (position, data) {
        var $this = this;
        // 将展开的阶段折叠，便于替换：
        var $dom_curRow = $('.row_' + position, this.rootDom);
        var $dom_curPhase = $('.item', $dom_curRow);
        var isShowStep = $('.wtc_stepConfig_item-step', $dom_curRow).css('display') === 'block';
        var $dom_phaseInput = $('.wtc_stepConfig_item-main-text', $dom_curRow);
        var isActive = $dom_phaseInput.hasClass('item-main-active');
        if (isShowStep) {
            // 折叠该阶段：
            this.toggleSteps($dom_phaseInput[0]);
        }

        // 断线：
        this.itemDisconnect($dom_curPhase);

        this.itemIndex++;
        var str = '\n            <div class="item item' + this.itemIndex + '">\n                <div class="item-span-left"></div>\n                <div class="item-main">\n                    <div class="item-main-top-dot"></div>\n                    <div class="item-main-bottom-dot"></div>\n                    <input class="wtc_stepConfig_item-input wtc_stepConfig_item-main-text' + (isActive ? ' item-main-active' : '') + '" title="' + data[0].phase + '" value="' + data[0].phase + '" disabled draggable="true">\n                    <i class="wtc_stepConfig_icon-step-num" stepnum="' + data[0].steps.length + '">' + data[0].steps.length + '</i>\n                    <div class="wtc_stepConfig_icon-wrap">\n                        <i class="wtc_stepConfig_icon-set kdfont kdfont-shezhi11"></i>\n                        ' + (data[0].del ? '<i class="wtc_stepConfig_icon-del kdfont kdfont-shanchu7"></i>' : '') + '\n                    </div>\n                </div>\n                <div class="item-span-right"></div>\n                <div class="wtc_stepConfig_item-step">\n        ';
        for (var j = 0; j < data[0].steps.length; j++) {
            var objStep = data[0].steps[j];
            var setIcon = objStep.syspreset ? 'kdfont-yanjing' : 'kdfont-shezhi11'; // 预制数据只能查看，所以用眼睛的icon
            objStep.desc = objStep.desc || '无';
            var desc_firstText = objStep.desc.slice(0, 48);
            var desc_otherText = objStep.desc.slice(48);
            str += '\n                <div class="step-row step-row-' + objStep.id + '">\n                    <div class="step-item step-item-' + objStep.id + '">\n                        <div class="wtc_stepConfig_span-top-bottom wtc_stepConfig_span-top" style="position:absolute;top:-20px;left:50%;transform: translateX(-50%);width: 60px;height: 20px;"></div>\n                        <div class="wtc_stepConfig_span-top-bottom wtc_stepConfig_span-bottom" style="position:absolute;bottom:-20px;left:50%;transform: translateX(-50%);width: 60px;height: 20px;"></div>\n                        <div class="item-span-left"></div>\n                        <div class="item-main item-main-step">\n                            <div class="item-main-top-dot"></div>\n                            <div class="item-main-bottom-dot"></div>\n                            <input class="wtc_stepConfig_item-input wtc_stepConfig_item-step-text" value="' + objStep.step + '" disabled draggable="true">\n                            <div class="wtc_stepConfig_step-detail">\n                                <div class="wtc_stepConfig_step-detail-item">' + objStep.step + '</div>\n                                <div class="wtc_stepConfig_step-detail-item">' + this.langText_effectiveDate + '\uFF1A' + objStep.startdate + '</div>\n                                <div class="wtc_stepConfig_step-detail-item">' + this.langText_resultType + '\uFF1A' + (objStep.resulttype == '1' ? this.langText_timePair : this.langText_itemValue) + '</div>\n                                <div class="wtc_stepConfig_step-detail-item">' + this.langText_calrule + '\uFF1A' + (objStep.calrule == '1' ? this.langText_customFormula : this.langText_customCode) + '</div>\n                                <div class="wtc_stepConfig_step-detail-item">\n                                    <span class="wtc_stepConfig_step-detail-item-first-text">' + this.langText_desc + '\uFF1A' + desc_firstText + '</span>\n                                    <span class="wtc_stepConfig_step-detail-item-other-text">' + desc_otherText + '</span>\n                                    ' + (desc_otherText ? '<span class="wtc_stepConfig_step-detail-item-open">展开</span>' : '') + '\n                                </div>\n                            </div>\n                            <div class="wtc_stepConfig_icon-wrap">\n                                <i class="wtc_stepConfig_icon-set kdfont ' + setIcon + '"></i>\n                                ' + (objStep.del ? '<i class="wtc_stepConfig_icon-del kdfont kdfont-shanchu7"></i>' : '') + '\n                            </div>\n                        </div>\n                        <div class="item-span-right"></div>\n                    </div>\n                </div>\n            ';
        }

        str += '</div></div>';

        $dom_curPhase.replaceWith(str);

        if (isShowStep) {
            // 再展开该阶段：
            $dom_phaseInput = $('.wtc_stepConfig_item-main-text', $dom_curRow);
            this.toggleSteps($dom_phaseInput[0]);
        }

        // 刷新连线：
        $this.refreshLine($dom_curRow[0], $dom_curRow[0], false);
        $this.refreshLineEvent();

        // 拖动item经过以及放入span块时触发事件：
        $('.wtc_stepConfig_span-top-bottom', $dom_curRow).on({
            dragover: function dragover(event) {
                $this.allowDrop(event.originalEvent, this);
            },
            dragleave: function dragleave(event) {
                $this.hideHotPart();
            },
            drop: function drop(event) {
                $this.drop(event.originalEvent, this);
            }
        });
        $('.wtc_stepConfig_svg-wrap', $dom_curRow).on({
            dragover: function dragover(event) {
                $this.allowDrop(event.originalEvent, this);
            },
            dragleave: function dragleave(event) {
                $this.hideHotPart();
            },
            drop: function drop(event) {
                $this.drop(event.originalEvent, this);
            }
        });

        // 该item被拖动触发事件：
        $('.item', $dom_curRow).on({
            dragstart: function dragstart(event) {
                $this.drag('phase', event.originalEvent);
            },
            dragend: function dragend() {
                $this.hideHotPart();
            }
        });
        $('.step-item', $dom_curRow).on({
            dragstart: function dragstart(event) {
                event.stopPropagation(); //阻止冒泡
                $this.drag('step', event.originalEvent);
            },
            dragend: function dragend() {
                $this.hideHotPart();
            }
        });

        $('.item-main', $dom_curRow).on({
            'mouseenter.showIcon': function mouseenterShowIcon() {
                $('.wtc_stepConfig_icon-wrap', this).css('display', 'block');
            },
            'mouseleave.showIcon': function mouseleaveShowIcon() {
                $('.wtc_stepConfig_icon-wrap', this).css('display', 'none');
            }
        });

        // 输入框失焦事件：
        $('.wtc_stepConfig_item-main-text', $dom_curRow).on('blur', function () {
            $this.modifyName_confirm(this);
        });

        $('.item-main-step', $dom_curRow).hover(function (event) {
            this.parentElement.parentElement.parentElement.parentElement.style.zIndex = 4;
        }, function (event) {
            this.parentElement.parentElement.parentElement.parentElement.style.zIndex = 3;
        });

        // 步骤详情展开更多描述事件：
        $('.wtc_stepConfig_step-detail-item-open', $dom_curRow).click(function () {
            $('.wtc_stepConfig_step-detail-item-other-text', this.parentElement).css('display', 'inline'); //显示更多文本
            $(this).css('display', 'none'); //隐藏“展开”
        });
        // 步骤详情收起更多描述事件：
        $('.item-main', $dom_curRow).mouseleave(function () {
            if ($('.wtc_stepConfig_step-detail-item-other-text', this.parentElement).html()) {
                $('.wtc_stepConfig_step-detail-item-other-text', this.parentElement).css('display', 'none'); //隐藏更多文本
                $('.wtc_stepConfig_step-detail-item-open', this.parentElement).css('display', 'inline'); //显示“展开”
            }
        });
    };

    /*
    * target: 删除icon的原生dom
    * */
    KdWtcStepConfig.prototype.delEvent = function (target) {
        var $this = this;
        // 判断是删除步骤还是阶段：
        var $dom_curItem = $(target.parentElement.parentElement.parentElement);
        if ($dom_curItem.hasClass('step-item')) {
            var stepValue = $('.wtc_stepConfig_item-step-text', $dom_curItem).val();
            this.myTool.confirmDialog({
                text: this.langText_deleteConfirm + stepValue + this.langText_warn1,
                showTitle: true,
                showImg: true,
                showBtn: true,
                title: '操作确认',
                img: $this.KDApi.getNameSpace($this.model) + 'images/delete.png',
                confirmBtn: this.langText_confirm,
                cancelBtn: this.langText_cancel,
                confirmCallback: function confirmCallback() {
                    // 判断是否是最后一个步骤：
                    if ($dom_curItem.parent().parent().children().length > 1) {
                        var objData = $this.getDataPosition($dom_curItem[0]);
                        // 该删除操作推入栈：
                        $this.stack.push({
                            type: 'delStep',
                            phasePosition: objData.phaseIndex,
                            stepPosition: objData.stepIndex,
                            data: objData.data
                        });

                        $this.data.data[objData.phaseIndex].steps.splice(objData.stepIndex, 1);

                        var dom_phaseRow = $dom_curItem[0].parentElement.parentElement.parentElement.parentElement;
                        // 删除节点：
                        $dom_curItem.parent().remove();
                        // 调整行的高度
                        var stepsWrapHeight = $('.wtc_stepConfig_item-step', dom_phaseRow).height();
                        $(dom_phaseRow).css('padding-bottom', 50 + stepsWrapHeight - 20 + 'px');
                        // 刷新步骤数量：
                        var $dom_stepnum = $('.wtc_stepConfig_icon-step-num', dom_phaseRow);
                        $dom_stepnum.attr('stepnum', Number($dom_stepnum.attr('stepnum')) - 1);
                        // 刷新连线：
                        $this.refreshLine(dom_phaseRow, dom_phaseRow, true);
                        $this.refreshLineEvent();
                        $('.wtc_stepConfig_senior-dialog', $this.rootDom).hide();
                    } else {
                        $this.myTool.message({
                            type: 'warn',
                            message: $this.langText_message3
                        });
                    }
                },
                cancelCallback: function cancelCallback() {}
            });
        } else {
            var phaseValue = $('.wtc_stepConfig_item-main-text', $dom_curItem).val();
            this.myTool.confirmDialog({
                text: this.langText_deleteConfirm + phaseValue + this.langText_warn1,
                showTitle: true,
                showImg: true,
                showBtn: true,
                title: '操作确认',
                img: $this.KDApi.getNameSpace($this.model) + 'images/delete.png',
                confirmBtn: this.langText_confirm,
                cancelBtn: this.langText_cancel,
                confirmCallback: function confirmCallback() {
                    var dom_phaseRow = $dom_curItem[0].parentElement;
                    var curRowClass = dom_phaseRow.className.split(' ')[1];
                    var curRowNum = Number(curRowClass.split('_')[1]);

                    // 该删除操作推入栈：
                    $this.stack.push({
                        type: 'delPhase',
                        phasePosition: curRowNum - 1,
                        data: $this.data.data[curRowNum - 1]
                    });

                    // 删除数据：
                    $this.data.data.splice(curRowNum - 1, 1);

                    // 删除当前阶段：
                    $dom_curItem.remove();
                    // 删除被删除阶段步骤的连线：
                    var arrItem = [];
                    $('.step-item', $dom_curItem).each(function (index, item) {
                        arrItem.push(item);
                    });
                    arrItem.push($dom_curItem[0]);
                    $this.itemDisconnect(arrItem);
                    // 删除空的行：
                    var isDel = $this.delEmptyRow(dom_phaseRow);
                    // 刷新连线：
                    $this.refreshLine(dom_phaseRow, dom_phaseRow, isDel);
                    $this.refreshLineEvent();
                    $('.wtc_stepConfig_senior-dialog', $this.rootDom).hide();
                },
                cancelCallback: function cancelCallback() {}
            });
        }
    };

    /*
    * target: input输入框的原生dom
    * */
    KdWtcStepConfig.prototype.modifyName = function (target) {
        var $target = $(target);

        $target.addClass('wtc_stepConfig_parse-input-edit');
        $target.attr("disabled", false).focus();
        //使光标显示在行末
        var result = $target.val();
        $target.val("");
        $target.val(result);
    };

    KdWtcStepConfig.prototype.modifyName_confirm = function (target) {
        var $target = $(target);
        $target.removeClass('wtc_stepConfig_parse-input-edit');
        $target.attr('disabled', true);

        var result = $target.val();
        var dom_row = target.parentElement.parentElement.parentElement;
        var targetRowClass = dom_row.className.split(' ')[1];
        var rowNum = Number(targetRowClass.split('_')[1]);

        // 输入框中内容的合法性检测-与原本一致：
        if (this.data.data[rowNum - 1].phase === result) return;
        // 输入框中内容的合法性检测-非空：
        if (result.trim() === '') {
            this.myTool.message({
                type: 'warn',
                message: this.langText_message5
            });
            $target.val(this.data.data[rowNum - 1].phase);
            return;
        }
        // 输入框中内容的合法性检测-名称重复：
        for (var i = 0; i < this.data.data.length; i++) {
            if (this.data.data[i].phase === result) {
                this.myTool.message({
                    type: 'warn',
                    message: this.langText_message6
                });
                $target.val(this.data.data[rowNum - 1].phase);
                return;
            }
        }

        // 该删除操作推入栈：
        this.stack.push({
            type: 'modifyName',
            phasePosition: rowNum - 1,
            data: this.data.data[rowNum - 1].phase
        });

        this.data.data[rowNum - 1].phase = result;
        // 修改悬浮时的文本：
        $target.attr('title', result);
    };

    KdWtcStepConfig.prototype.backHandle = function () {
        var $this = this;
        var data = this.stack.pop();
        if (!data) return;

        switch (data.type) {
            case 'add':
                // 删除数据：
                $this.data.data.splice(data.phasePosition, 1);

                var dom_phaseRow = $('.row_' + (data.phasePosition + 1), this.dom_container)[0];
                var $dom_curItem = $(dom_phaseRow.firstElementChild);

                // 删除当前阶段：
                $dom_curItem.remove();
                // 删除被删除阶段步骤的连线：
                var arrItem = [];
                $('.step-item', $dom_curItem).each(function (index, item) {
                    arrItem.push(item);
                });
                arrItem.push($dom_curItem[0]);
                $this.itemDisconnect(arrItem);
                // 删除空的行：
                var isDel = $this.delEmptyRow(dom_phaseRow);
                // 刷新连线：
                $this.refreshLine(dom_phaseRow, dom_phaseRow, isDel);
                $this.refreshLineEvent();
                break;
            case 'modify':
                this.data.data.splice(data.phasePosition, 1, data.data);
                this.modifyPhase_inner(data.phasePosition + 1, [data.data]);
                break;
            case 'delPhase':
                this.data.data.splice(data.phasePosition, 0, data.data);
                this.addPhase_inner(data.phasePosition, [data.data]);
                break;
            case 'delStep':
                this.data.data[data.phasePosition].steps.splice(data.stepPosition, 0, data.data);
                this.addStep(data.phasePosition, data.stepPosition, data.data);
                break;
            case 'movePhase':
                var dom_curPhaseRow = $('.row_' + (data.phasePosition + 1), this.dom_container)[0];
                var dom_curItem = $(dom_curPhaseRow.firstElementChild)[0];
                if (data.phasePosition < data.oldPhasePosition) {
                    var $dom_oldPhaseRow = $('.row_' + (data.oldPhasePosition + 1), this.dom_container);
                } else {
                    var $dom_oldPhaseRow = $('.row_' + data.oldPhasePosition, this.dom_container);
                }

                this.movePhase($dom_oldPhaseRow, dom_curItem, true);

                var isChangeRowNum = this.delEmptyRow(dom_curPhaseRow); // 删除空的行，并调整className
                this.refreshLine(dom_curItem.parentElement, dom_curPhaseRow, isChangeRowNum);
                this.refreshLineEvent();
                break;
            case 'moveStep':
                var dom_curPhaseRow = $('.row_' + (data.phasePosition + 1), this.dom_container)[0];
                var dom_curStep = $('.step-item', dom_curPhaseRow)[data.stepPosition];
                var $dom_oldStepRow = $($('.step-row', dom_curPhaseRow)[data.oldStepPosition]);

                // 将两个步骤数据交换：
                var tempData = this.data.data[data.phasePosition].steps.splice(data.stepPosition, 1);
                this.data.data[data.phasePosition].steps.splice(data.oldStepPosition, 0, tempData[0]);

                if (data.oldStepPosition >= data.stepPosition) {
                    $dom_oldStepRow.after(dom_curStep.parentElement);
                } else {
                    $dom_oldStepRow.before(dom_curStep.parentElement);
                }

                var $dom_phaseRow = $dom_oldStepRow.parent().parent().parent();
                var dom_firstStepRow = $('.wtc_stepConfig_item-step', $dom_phaseRow).children()[0];
                this.refreshLine(dom_firstStepRow, dom_firstStepRow, true);
                this.refreshLineEvent();
                break;
            case 'modifyName':
                this.data.data[data.phasePosition].phase = data.data;
                var dom_curPhaseRow = $('.row_' + (data.phasePosition + 1), this.dom_container)[0];
                var $dom_parseInput = $('.wtc_stepConfig_item-main-text', dom_curPhaseRow);
                $dom_parseInput.val(data.data);
                $dom_parseInput.attr('title', data.data);
                break;
        }
    };

    KdWtcStepConfig.prototype.showAddBtn = function (target) {
        $('.add-btn', target).css('display', 'block');
    };

    KdWtcStepConfig.prototype.hideAddBtn = function (target) {
        $('.add-btn', target).css('display', 'none');
    };

    KdWtcStepConfig.prototype.getPosition = function (node, targetNode) {
        var left = node.offsetLeft - node.scrollLeft;
        var top = node.offsetTop - node.scrollTop;
        var parent = node.offsetParent;
        while (parent && parent !== targetNode) {
            left += parent.offsetLeft - parent.scrollLeft;
            top += parent.offsetTop - parent.scrollTop;
            parent = parent.offsetParent;
        }
        return { "left": left, "top": top };
    };

    KdWtcStepConfig.prototype.moveLegal = function (moveType, tempData, phaseIndex) {
        var index = Number.MIN_SAFE_INTEGER;
        if (moveType === 'phase') {
            for (var i = 0; i < tempData.length; i++) {
                for (var j = 0; j < tempData[i].steps.length; j++) {
                    // 判断是否是预置步骤：
                    if (tempData[i].steps[j].syspreset) {
                        var curIndex = tempData[i].steps[j].index;
                        // 判断index是否是升序排列：
                        if (curIndex < index) {
                            return false;
                        } else {
                            index = curIndex;
                        }
                    }
                }
            }
        } else {
            for (var _j = 0; _j < tempData[phaseIndex].steps.length; _j++) {
                // 判断是否是预置步骤：
                if (tempData[phaseIndex].steps[_j].syspreset) {
                    var _curIndex = tempData[phaseIndex].steps[_j].index * 100 + tempData[phaseIndex].steps[_j].bitindex;
                    // 判断index是否是升序排列：
                    if (_curIndex < index) {
                        return false;
                    } else {
                        index = _curIndex;
                    }
                }
            }
        }

        return true;
    };

    /*
    * 获取选中阶段、步骤在data中的对应索引
    * target: step-item/item
    * */
    KdWtcStepConfig.prototype.getDataPosition = function (target) {
        var phaseIndex = null;
        var stepIndex = null;
        var data = null;
        var type = null;
        var $target = $(target);

        if ($target.hasClass('step-item')) {
            // 步骤
            var dom_stepRow = target.parentElement;
            var targetRowClass = dom_stepRow.className.split(' ')[1];
            var stepId = targetRowClass.split('-')[2];
            // 找出该步骤对应的阶段：
            var dom_phaseRow = dom_stepRow.parentElement.parentElement.parentElement;
            var phaseRowClass = dom_phaseRow.className.split(' ')[1];
            var rowNum = Number(phaseRowClass.split('_')[1]);

            for (var i = 0; i < this.data.data[rowNum - 1].steps.length; i++) {
                var objStep = this.data.data[rowNum - 1].steps[i];
                if (objStep.id == stepId) {
                    phaseIndex = rowNum - 1;
                    stepIndex = i;
                    data = objStep;
                    type = 'step';
                    break;
                }
            }
        } else {
            // 阶段
            var _targetRowClass = target.parentElement.className.split(' ')[1];
            phaseIndex = Number(_targetRowClass.split('_')[1]) - 1;
            data = this.data.data[phaseIndex];
            type = 'phase';
        }

        return { type: type, phaseIndex: phaseIndex, stepIndex: stepIndex, data: data };
    };

    window.KdWtcStepConfig = KdWtcStepConfig;
})();