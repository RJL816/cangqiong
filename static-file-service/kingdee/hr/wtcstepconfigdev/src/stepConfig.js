(function () {
    function KdWtcStepConfig(para) {
        this.uniqueId = para.uniqueId;
        this.model = para.model;
        this.KDApi = para.KDApi;
        this.rootDom = para.model.dom;
        this.data = para.data;
        this.themeNum = para.themeNum;
        //this.data.type:  // 0:编辑态 1:查看态

        this.stack = [];   // 用户操作栈
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

    /*初始化*/
    KdWtcStepConfig.prototype.init = function () {
        var $this = this;
        this.init_dom();
        if (this.data.power) this.init_seniorSet();

        var dow_items = $('.wtc_stepConfig_item', $this.rootDom);
        var lineStr = this.itemConnect(dow_items);

        $($this.dom_container).append(lineStr);
        this.eventHandle();
    };

    /*事件绑定*/
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
            $('.wtc_stepConfig_step-detail-item-other-text', this.parentElement).css('display', 'inline');  //显示更多文本
            $(this).css('display', 'none');  //隐藏“展开”
        });
        // 步骤详情收起更多描述事件：
        $('.item-main', $this.rootDom).mouseleave(function () {
            if ($('.wtc_stepConfig_step-detail-item-other-text', this.parentElement).html()) {
                $('.wtc_stepConfig_step-detail-item-other-text', this.parentElement).css('display', 'none');  //隐藏更多文本
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
                    $this.openSteps(item.parentElement.querySelector('.wtc_stepConfig_item-main-text'))
                }
            })
        });

        // 全部折叠事件：
        this.$dom_foldBtn.click(function () {
            $('.wtc_stepConfig_item-step', $this.dom_container).each(function (index, item) {
                if ($(item).css('display') === 'block') {
                    $this.foldSteps(item.parentElement.querySelector('.wtc_stepConfig_item-main-text'))
                }
            })
        });

        // 屏幕大小发生改变：
        $(window).on('resize.stepConfig_resize_' + this.uniqueId, function () {
            if ($this.rootDom.offsetWidth !== 0) {  // 判断是否是当前页签
                $this.refreshLine();
            }
        });

        // 监听左下角平台的展开收起列表按钮
        $('.JNUdl1Jv').each(function (index, item) {
            if (this.offsetWidth > 0) {
                let $target = $(this);
                $target.on('click.stepConfig_click_1dWRVXYw_' + $this.uniqueId, function () {
                    setTimeout(function () {
                        $this.refreshLine();
                    }, 300)
                })
            }
        });

        // 监听头部页签切换事件
        $('._2IuNtC78.hover-theme-fc').on('click.stepConfig_click_' + this.uniqueId, function () {
            setTimeout(function () {
                if ($this.rootDom.offsetWidth !== 0) {  // 判断是否是当前页签
                    $this.refreshLine();
                }
            }, 20);
        });


        if (this.data.type === 0) {  // 编辑态
            this.changeStatus(this.data.type)
        }
    };

    /*初始化dom*/
    KdWtcStepConfig.prototype.init_dom = function () {
        let str = '';

        // 初始化修改人：
        this.$dom_ModifyInfo.html(`<div>${this.langText_updateby}：${this.data.updateby}</div><div>${this.langText_updatedate}：${this.data.updatedate}</div>`);

        str += `
             <div class="row row_0">
                <div class="wtc_stepConfig_item wtc_stepConfig_item0">
                    <div class="item-span-left"></div>
                    <div class="item-main">
                        <div class="item-main-top-dot"></div>
                        <div class="item-main-bottom-dot"></div>
                        <div class="wtc_stepConfig_item-fixed-text">${this.langText_start}</div>
                    </div>
                    <div class="item-span-right"></div>
                </div>
            </div>
        `;

        for (let i = 0; i < this.data.data.length; i++) {
            this.itemIndex++;
            str += `
                <div class="row row_${i + 1}">
                    <div class="wtc_stepConfig_item wtc_stepConfig_item${this.itemIndex}">
                        <div class="item-span-left"></div>
                        <div class="item-main">
                            <div class="item-main-top-dot"></div>
                            <div class="item-main-bottom-dot"></div>
                            <input class="wtc_stepConfig_item-input wtc_stepConfig_item-main-text" title="${this.data.data[i].phase}" value="${this.data.data[i].phase}" disabled draggable="${this.data.type == 0 ? true : false}">
                            <i class="wtc_stepConfig_icon-step-num" stepnum="${this.data.data[i].steps.length}">${this.data.data[i].steps.length}</i>
                            <div class="wtc_stepConfig_icon-wrap">
                                ${this.data.type == 0 ? '<i class="wtc_stepConfig_icon-set kdfont kdfont-shezhi11"></i>' : ''}
                                ${this.data.type == 0 && this.data.data[i].del ? '<i class="wtc_stepConfig_icon-del kdfont kdfont-shanchu7"></i>' : ''}
                            </div>
                        </div>
                        <div class="item-span-right"></div>
                        <div class="wtc_stepConfig_item-step">
                            <div class="wtc_stepConfig_item-step-triangle"></div>
                            <div class="wtc_stepConfig_item-step-triangle2"></div>
            `;
            for (let j = 0; j < this.data.data[i].steps.length; j++) {
                let objStep = this.data.data[i].steps[j];
                let setIcon = objStep.syspreset ? 'kdfont-yanjing' : 'kdfont-shezhi11';  // 预制数据只能查看，所以用眼睛的icon
                objStep.desc = objStep.desc || '无';
                let desc_firstText = objStep.desc.slice(0, 48);
                let desc_otherText = objStep.desc.slice(48);
                str += `
                    <div class="step-row step-row-${objStep.id}">
                        <div class="step-item step-item-${objStep.id}">
                            <div class="wtc_stepConfig_span-top-bottom wtc_stepConfig_span-top" style="position:absolute;top:-20px;left:50%;transform: translateX(-50%);width: 60px;height: 20px;z-index: 5000"></div>
                            <div class="wtc_stepConfig_span-top-bottom wtc_stepConfig_span-bottom" style="position:absolute;bottom:-20px;left:50%;transform: translateX(-50%);width: 60px;height: 20px;z-index: 5000"></div>
                            <div class="item-span-left"></div>
                            <div class="item-main item-main-step">
                                <div class="item-main-top-dot"></div>
                                <div class="item-main-bottom-dot"></div>
                                <input class="wtc_stepConfig_item-input wtc_stepConfig_item-step-text" value="${objStep.step}" disabled draggable="${this.data.type == 0 ? true : false}">
                                <div class="wtc_stepConfig_step-detail">
                                    <div class="wtc_stepConfig_step-detail-item">${objStep.step}</div>
                                    <div class="wtc_stepConfig_step-detail-item">${this.langText_effectiveDate}：${objStep.startdate}</div>
                                    <div class="wtc_stepConfig_step-detail-item">${this.langText_resultType}：${objStep.resulttype == '1' ? this.langText_timePair : this.langText_itemValue}</div>
                                    <!--<div class="wtc_stepConfig_step-detail-item">${this.langText_calrule}：${objStep.calrule == '1' ? this.langText_customFormula : this.langText_customCode}</div>-->
                                    <div class="wtc_stepConfig_step-detail-item">
                                        <span class="wtc_stepConfig_step-detail-item-first-text">${this.langText_desc}：${desc_firstText}</span>
                                        <span class="wtc_stepConfig_step-detail-item-other-text">${desc_otherText}</span>
                                        ${desc_otherText ? '<span class="wtc_stepConfig_step-detail-item-open">展开</span>' : ''}
                                    </div>
                                </div>
                                <div class="wtc_stepConfig_icon-wrap">
                                    ${this.data.type == 0 ? '<i class="wtc_stepConfig_icon-set kdfont ' + setIcon + '"></i>' : ''}
                                    ${this.data.type == 0 && objStep.del ? '<i class="wtc_stepConfig_icon-del kdfont kdfont-shanchu7"></i>' : ''}
                                </div>
                            </div>
                            <div class="item-span-right"></div>
                        </div>
                    </div>
                `;
            }

            str += `</div></div></div>`;
        }

        str += `
             <div class="row row_${this.data.data.length + 1}">
                <div class="wtc_stepConfig_item wtc_stepConfig_item${++this.itemIndex}">
                    <div class="item-span-left"></div>
                    <div class="item-main">
                        <div class="item-main-top-dot"></div>
                        <div class="item-main-bottom-dot"></div>
                        <div class="wtc_stepConfig_item-fixed-text">${this.langText_end}</div>
                    </div>
                    <div class="item-span-right"></div>
                </div>
            </div>
        `;

        this.dom_container.innerHTML = str;
    };

    /*初始化高级面板*/
    KdWtcStepConfig.prototype.init_seniorSet = function () {
        let $this = this;
        let str = '';

        str += `
        <div class="wtc_stepConfig_senior-dialog">
            <div class="wtc_stepConfig_senior-dialog-title">高级属性</div>
            <div class="wtc_stepConfig_senior-dialog-phase-name">阶段：加班</div>
            <!--<div class="wtc_stepConfig_senior-dialog-set2">
                <div class="wtc_stepConfig_senior-dialog-set-name">
                    <span>阶段存储</span>
                    <i class="wtc_stepConfig_senior-dialog-set-must">*</i>
                    <i class="wtc_stepConfig_senior-dialog-set-tips kdfont kdfont-wenhao2"></i>
                </div>
                <a href="#" class="wtc_stepConfig_senior-dialog-select">
                    <span class="wtc_stepConfig_senior-dialog-selected">是</span>
                    <i class="wtc_stepConfig_senior-dialog-show-icon kdfont kdfont-shouqi7"></i>
                    <ul class="wtc_stepConfig_senior-dialog-options">
                        <li class="wtc_stepConfig_senior-dialog-options-item wtc_stepConfig_senior-dialog-options-item-active" index="1">是</li>
                        <li class="wtc_stepConfig_senior-dialog-options-item" index="0">否</li>
                    </ul>
                </a>
            </div>-->
            <div class="wtc_stepConfig_senior-dialog-set1">
                <div class="wtc_stepConfig_senior-dialog-set-name">
                    <span>阶段结果处理</span>
                    <i class="wtc_stepConfig_senior-dialog-set-must">*</i>
                    <i class="wtc_stepConfig_senior-dialog-set-tips kdfont kdfont-wenhao2"></i>
                </div>
                <a href="#" class="wtc_stepConfig_senior-dialog-select">
                    <span class="wtc_stepConfig_senior-dialog-selected">覆盖</span>
                    <i class="wtc_stepConfig_senior-dialog-show-icon kdfont kdfont-shouqi7"></i>
                    <ul class="wtc_stepConfig_senior-dialog-options">
                        <li class="wtc_stepConfig_senior-dialog-options-item wtc_stepConfig_senior-dialog-options-item-active" index="0">合并</li>
                        <li class="wtc_stepConfig_senior-dialog-options-item" index="1">覆盖</li>
                    </ul>
                </a>
            </div>
            <div class="wtc_stepConfig_senior-dialog-set3">
                <div class="wtc_stepConfig_senior-dialog-set-name">
                    <span>无输出决策器</span>
                    <i class="wtc_stepConfig_senior-dialog-set-must">*</i>
                    <i class="wtc_stepConfig_senior-dialog-set-tips kdfont kdfont-wenhao2"></i>
                </div>
                <a href="#" class="wtc_stepConfig_senior-dialog-select">
                    <span class="wtc_stepConfig_senior-dialog-selected">继续</span>
                    <i class="wtc_stepConfig_senior-dialog-show-icon kdfont kdfont-shouqi7"></i>
                    <ul class="wtc_stepConfig_senior-dialog-options">
                        <li class="wtc_stepConfig_senior-dialog-options-item" index="0">下一步</li>
                        <li class="wtc_stepConfig_senior-dialog-options-item wtc_stepConfig_senior-dialog-options-item-active" index="1">继续</li>
                        <li class="wtc_stepConfig_senior-dialog-options-item" index="2">跳出</li>
                        <li class="wtc_stepConfig_senior-dialog-options-item" index="3">终止</li>
                        <li class="wtc_stepConfig_senior-dialog-options-item" index="4">错误</li>
                    </ul>
                </a>
            </div>
            <div class="wtc_stepConfig_senior-dialog-close kdfont kdfont-guanbi6"></div>
        </div>
        `;

        $('.wtc_stepConfig_wrap', this.rootDom).append(str);

        var $dom_dialog = $('.wtc_stepConfig_senior-dialog', this.rootDom);
        var $dom_select = $('.wtc_stepConfig_senior-dialog-select', this.rootDom);
        var $dom_tipsIcon = $('.wtc_stepConfig_senior-dialog-set-tips', this.rootDom);
        var $dom_optionsItem = $('.wtc_stepConfig_senior-dialog-options-item', $dom_select);
        var $dom_closeBtn = $('.wtc_stepConfig_senior-dialog-close', this.rootDom);

        // 查看态，高级设置弹窗样式改为不可编辑：
        if ($this.data.type == 1){
            $dom_dialog.addClass('wtc_stepConfig_senior-dialog-disabled');
        }

        $dom_closeBtn.on('click', function () {
            $dom_dialog.hide();
            $('.item-main-active', $this.rootDom).removeClass('item-main-active');
        });
        $dom_select.on('click', function () {
            if ($this.data.type == 1) return;  //查看态不允许点击

            //需判断该阶段的阶段结果处理是否可编辑：
            if($(this).parent().hasClass('wtc_stepConfig_senior-phaseResultDeal-disabled')) return;

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

            let optionText = this.innerHTML;
            let $dom_selected = $('.wtc_stepConfig_senior-dialog-selected', this.parentElement.parentElement);

            $('.wtc_stepConfig_senior-dialog-options-item', this.parentElement).removeClass('wtc_stepConfig_senior-dialog-options-item-active');
            $(this).addClass('wtc_stepConfig_senior-dialog-options-item-active');

            $dom_selected.html(optionText);
            // 修改数据：
            let $dom_curItem = $('.item-main-active', $this.rootDom).parent().parent();
            let objData = $this.getDataPosition($dom_curItem[0]);
            let setClass = this.parentElement.parentElement.parentElement.className;
            switch (setClass) {
                case 'wtc_stepConfig_senior-dialog-set1':
                    $this.data.data[objData.phaseIndex].phaseResultDeal = Number($(this).attr('index'));
                    break;
                // case 'wtc_stepConfig_senior-dialog-set2':
                //     let index = Number($(this).attr('index'));
                //     $this.data.data[objData.phaseIndex].phaseSave = index;
                //     // 阶段存储为否时，阶段结果处理不显示,否则显示：
                //     if (index === 0) {
                //         $('.wtc_stepConfig_senior-dialog-set1', $this.rootDom).css('display', 'none');
                //     } else {
                //         $('.wtc_stepConfig_senior-dialog-set1', $this.rootDom).css('display', 'block');
                //     }
                //     break;
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
            let curSetClass = this.parentElement.parentElement.className;
            let text = '';
            if(curSetClass.includes('wtc_stepConfig_senior-dialog-set1')) {
                text = $this.data.phaseresultdeal;
            } else if(curSetClass.includes('wtc_stepConfig_senior-dialog-set3')) {
                text = $this.data.noreturnhandler;
            }

            $this.myTool.showPopover({
                target: this,  //气泡参照的dom
                isHtml: true,
                data: `<div style="max-width: 500px;">${text}</div>`
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
        if(this.data.type !== status){
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
            // 高级设置弹窗样式改为可编辑：
            $('.wtc_stepConfig_senior-dialog').removeClass('wtc_stepConfig_senior-dialog-disabled');
            //键盘事件：
            $(document).on('keyup.stepConfig_keyup_' + this.uniqueId, function (event) {
                if (event.keyCode === 46) {  // 点删除键,同时是编辑态时
                    let $dom_activeInput = $('.item-main-active', $this.rootDom);
                    // 判断是否存在选中的项，再判断是否是激活的页签（通过判断实际宽度）：
                    if ($dom_activeInput[0] && $this.rootDom.offsetWidth !== 0) {
                        let $dom_delIcon = $('.wtc_stepConfig_icon-del', $dom_activeInput.parent());
                        if ($dom_delIcon[0]) $this.delEvent($dom_delIcon[0]);  // 判断选中项是否可删
                    }
                }

                if (event.keyCode === 90 && event.ctrlKey) {  // ctrl+z 撤销上一步
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
                dragover: function (event) {
                    $this.allowDrop(event.originalEvent, this)
                },
                dragleave: function (event) {
                    $this.hideHotPart()
                },
                drop: function (event) {
                    $this.drop(event.originalEvent, this)
                }
            });
            $('.wtc_stepConfig_svg-wrap', $this.rootDom).on({
                dragover: function (event) {
                    $this.allowDrop(event.originalEvent, this)
                },
                dragleave: function (event) {
                    $this.hideHotPart()
                },
                drop: function (event) {
                    $this.drop(event.originalEvent, this)
                }
            });

            // 该item被拖动触发事件：
            $('.wtc_stepConfig_item', $this.rootDom).on({
                dragstart: function (event) {
                    $this.drag('phase', event.originalEvent)
                },
                dragend: function () {
                    $this.hideHotPart()
                }
            });
            $('.step-item', $this.rootDom).on({
                dragstart: function (event) {
                    event.stopPropagation();  //阻止冒泡
                    $this.drag('step', event.originalEvent)
                },
                dragend: function () {
                    $this.hideHotPart()
                }
            });

            // 输入框失焦事件：
            $('.wtc_stepConfig_item-main-text', $this.rootDom).on('blur', function () {
                $this.modifyName_confirm(this)
            });

            // hover线时触发事件：
            $('.wtc_stepConfig_svg-group', $this.rootDom).on({
                mouseenter: function () {
                    $this.showAddBtn(this)
                },
                mouseleave: function () {
                    $this.hideAddBtn(this)
                }
            });

            $('.item-main', $this.rootDom).on({
                'mouseenter.showIcon': function () {
                    $('.wtc_stepConfig_icon-wrap', this).css('display', 'block')
                },
                'mouseleave.showIcon': function () {
                    $('.wtc_stepConfig_icon-wrap', this).css('display', 'none')
                }
            });

            $('.wtc_stepConfig_item-input').prop('draggable', true);
        }
        else {
            // 高级设置弹窗样式改为不可编辑：
            $('.wtc_stepConfig_senior-dialog', $this.rootDom).addClass('wtc_stepConfig_senior-dialog-disabled');
            $(document).off('keyup.stepConfig_keyup_' + this.uniqueId);
            $($this.dom_container).off('dblclick');
            $('.wtc_stepConfig_span-top-bottom', $this.rootDom).off();
            $('.wtc_stepConfig_svg-wrap', $this.rootDom).off();
            $('.wtc_stepConfig_item', $this.rootDom).off();
            $('.step-item', $this.rootDom).off();
            $('.wtc_stepConfig_item-main-text', $this.rootDom).off();
            $('.wtc_stepConfig_svg-group', $this.rootDom).off();
            $('.wtc_stepConfig_item-input').prop('draggable', false);
            $('.item-main', $this.rootDom).off('mouseenter.showIcon');
            $('.item-main', $this.rootDom).off('mouseleave.showIcon');
        }
    };

    /*被拖拽元素在线上移动时触发，判断是否要出现热区*/
    KdWtcStepConfig.prototype.allowDrop = function (event, target) {
        // console.log('allowDrop...');
        // 分为划入线，以及划入span块的情况：
        let $target = $(target);
        let dom_item = this.rootDom.querySelector(this.dragItemClass);

        // 判断移动的是阶段，还是步骤：
        if ($(dom_item).hasClass('wtc_stepConfig_item')) {
            // 是阶段，需判断线的类型：
            if (!$target.hasClass('wtc_stepConfig_span-top-bottom') && $target[0].className.baseVal.split(' ')[2].split('-')[1] !== 'step' && $target[0].className.baseVal.split(' ')[1].split('-')[1] !== 'wtc_stepConfig_item0') {
                this.showHotPart(target, 'parse_line', event)
            }
        } else {
            let dom_phase = dom_item.parentNode.parentNode.parentNode;
            // 是步骤，需在当前阶段内移动：
            if ($target.hasClass('wtc_stepConfig_span-top-bottom')) {
                // 划入span块，判断是不是当前阶段的span块：
                if ($target[0].parentNode.parentNode.parentNode.parentNode === dom_phase) {
                    this.showHotPart(target, 'step_span', event)
                }
            } else {
                if ($target[0].className.baseVal.split(' ')[2].split('-')[1] === 'step') {
                    let stepClass = $target[0].className.baseVal.split(' ')[2].slice(4);
                    if ($('.' + stepClass, dom_phase)[0]) {
                        this.showHotPart(target, 'step_line', event)
                    }
                }
            }
        }
    };

    /*
    * 显示热区
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
        let dom_item = event.target.parentNode.parentNode;
        let objData = this.getDataPosition(dom_item);

        // 判断当前拖动的阶段、步骤是否允许拖动：
        if (objData.data.move) {
            let parentClass;
            if($(dom_item).hasClass('step-item')) {
                parentClass = dom_item.parentNode.parentNode.parentNode.parentNode.className.split(' ')[1];
            } else {
                parentClass = dom_item.parentNode.className.split(' ')[1];
            }

            let curClass = dom_item.className.split(' ')[1];
            event.dataTransfer.setData("className", '.' + parentClass + ' .' + curClass);
            this.dragItemClass = '.' + parentClass + ' .' + curClass;
        } else {
            // 不允许拖动，阻止默认事件
            event.preventDefault();
        }
    };

    /*拖拽结束，目标元素被放下*/
    KdWtcStepConfig.prototype.drop = function (event, target) {
        event.preventDefault();
        // 删除热区：
        // $('.wtc_stepConfig_config-hot-part', this.rootDom).remove();

        let $this = this;
        let $target = $(target);
        let className = event.dataTransfer.getData("className");
        let dom_item = this.rootDom.querySelector(className);
        let dom_oldRow = dom_item.parentElement;

        let isAdd = this.moveItem($target, dom_item);  // 将item放在指定位置
        // 判断item是否变化了位置：
        if (isAdd) {
            this.delEmptyRow(dom_oldRow);  // 删除空的行，并调整className
            this.refreshLine();
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
    * 移动元素（阶段或步骤）
    * $target：两个span块的jQueryDom，或者线的jQueryDom
    * dom_item：被移动的item，可能是phase-item，也可能是step-item的原生dom（它的父就是row）
    * */
    KdWtcStepConfig.prototype.moveItem = function ($target, dom_item) {
        let $this = this;
        let $dom_item = $(dom_item);

        // 判断移动的是阶段还是步骤：
        if ($dom_item.hasClass('wtc_stepConfig_item')) {  // 阶段
            let startPhaseClass = $target[0].className.baseVal.split(' ')[1].slice(4);
            let endPhaseClass = $target[0].className.baseVal.split(' ')[2].slice(4);
            // 需要判断要不要换位置：
            if ($dom_item.hasClass(startPhaseClass) || $dom_item.hasClass(endPhaseClass)) {
                return false;
            } else {
                let $dom_targetRow = $('.' + startPhaseClass, this.rootDom).parent();
                return this.movePhase($dom_targetRow, dom_item, false)
            }
        } else {
            // 先判断是不是拖到线上的，线上的就需要判断要不要换位置：
            if ($target.hasClass('wtc_stepConfig_span-top-bottom')) {
                // 拖入span块，判断需不需要替换：
                let dom_span = $('.wtc_stepConfig_span-top-bottom', dom_item);
                if (dom_span[0] === $target[0] || dom_span[1] === $target[0]) {
                    return false;
                } else {
                    // 目标行
                    // let $dom_targetRow = $target.parent().parent();

                    this.moveStep_span($target.parent(), dom_item, $target.hasClass('wtc_stepConfig_span-top'));
                    return false;
                }
            } else {
                let startStepClass = $target[0].className.baseVal.split(' ')[1].slice(4);
                let endStepClass = $target[0].className.baseVal.split(' ')[2].slice(4);
                if ($dom_item.hasClass(startStepClass) || $dom_item.hasClass(endStepClass)) {
                    return false;
                } else {
                    // 目标行
                    let $dom_targetPhaseRow = dom_item.parentElement.parentElement.parentElement.parentElement;
                    this.moveStep($('.' + startStepClass, $dom_targetPhaseRow), dom_item);
                    return false;
                }
            }
        }
    };

    /*移动元素-阶段*/
    KdWtcStepConfig.prototype.movePhase = function ($dom_targetRow, dom_item, isBack) {
        let $this = this;
        let targetRowClass = $dom_targetRow[0].className.split(' ')[1];
        let rowNum = Number(targetRowClass.split('_')[1]);
        let newRowNum = rowNum + 1;

        // 判断是否可以移动：
        // if (!this.data.data[rowNum - 1].move) return;

        let dom_oldRow = dom_item.parentElement;
        let oldRowClass = dom_oldRow.className.split(' ')[1];
        let oldRowNum = Number(oldRowClass.split('_')[1]);

        let objTempData = JSON.parse(JSON.stringify(this.data.data));
        // 将两个阶段数据交换：
        if (oldRowNum >= rowNum) {
            let tempData = objTempData.splice(oldRowNum - 1, 1);
            objTempData.splice(rowNum, 0, tempData[0]);
        } else {
            let tempData = objTempData.splice(oldRowNum - 1, 1);
            objTempData.splice(rowNum - 1, 0, tempData[0]);
        }

        // 判断移动后的阶段步骤是否符合移动规则：
        let isLegal = this.moveLegal('phase', objTempData);

        if (isLegal) {
            if (!isBack) {
                // 该移动操作推入栈：
                if (oldRowNum >= rowNum) {
                    $this.stack.push({
                        type: 'movePhase',
                        phasePosition: rowNum,
                        oldPhasePosition: oldRowNum - 1,
                    });
                } else {
                    $this.stack.push({
                        type: 'movePhase',
                        phasePosition: rowNum - 1,
                        oldPhasePosition: oldRowNum - 1,
                    });
                }
            }

            this.data.data = objTempData;

            // 行className调整：
            let dom_nextRow = $dom_targetRow[0].nextElementSibling;
            while ($(dom_nextRow).hasClass('row')) {
                dom_nextRow.className = 'row row_' + (rowNum + 2);
                rowNum++;
                dom_nextRow = dom_nextRow.nextElementSibling;
            }

            // 如果步骤框是展开的，则先隐藏步骤框
            let $dom_stepsWrap = $('.wtc_stepConfig_item-step', dom_item);
            if ($dom_stepsWrap.css('display') === 'block') {
                let dom_input = dom_item.querySelector('.wtc_stepConfig_item-main-text');
                this.toggleSteps(dom_input);
            }

            $dom_targetRow.after(`<div class="row row_${newRowNum}"></div>`);
            let $dom_newRow = $(`.row_${newRowNum}`, this.rootDom);
            $dom_newRow.append(dom_item);

            $this.model.invoke('positionChange');
            return true;
        } else {
            $this.myTool.message({
                type: 'warn',
                message: this.langText_message1
            });
            return false;
        }
    };

    /*移动元素-步骤*/
    KdWtcStepConfig.prototype.moveStep = function ($dom_targetItem, dom_item) {
        let $this = this;
        let $dom_targetRow = $dom_targetItem.parent();
        let targetRowClass = $dom_targetRow[0].className.split(' ')[1];
        let stepId = targetRowClass.split('-')[2];

        // 找出该步骤对应的阶段：
        let $dom_phaseRow = $dom_targetRow.parent().parent().parent();
        let phaseRowClass = $dom_phaseRow[0].className.split(' ')[1];
        let rowNum = Number(phaseRowClass.split('_')[1]);

        // 移动的步骤对应的行：
        let dom_oldRow = dom_item.parentElement;
        let oldRowClass = dom_oldRow.className.split(' ')[1];
        let oldStepId = oldRowClass.split('-')[2];

        // 找出步骤在data中的位置：
        let oldStepIndex;
        let stepIndex;
        for (let i = 0; i < this.data.data[rowNum - 1].steps.length; i++) {
            let objStep = this.data.data[rowNum - 1].steps[i];
            if (objStep.id == stepId) stepIndex = i;
            if (objStep.id == oldStepId) oldStepIndex = i;
        }

        let objTempData = JSON.parse(JSON.stringify(this.data.data));

        // 将两个步骤数据交换：
        if (oldStepIndex >= stepIndex) {
            let tempData = objTempData[rowNum - 1].steps.splice(oldStepIndex, 1);
            objTempData[rowNum - 1].steps.splice(stepIndex + 1, 0, tempData[0]);
        } else {
            let tempData = objTempData[rowNum - 1].steps.splice(oldStepIndex, 1);
            objTempData[rowNum - 1].steps.splice(stepIndex, 0, tempData[0]);
        }

        // 判断移动后的阶段步骤是否符合移动规则：
        let isLegal = this.moveLegal('step', objTempData, rowNum - 1);

        if (isLegal) {
            // 该删除操作推入栈：
            if (oldStepIndex >= stepIndex) {
                $this.stack.push({
                    type: 'moveStep',
                    phasePosition: rowNum - 1,
                    stepPosition: stepIndex + 1,
                    oldStepPosition: oldStepIndex,
                });
            } else {
                $this.stack.push({
                    type: 'moveStep',
                    phasePosition: rowNum - 1,
                    stepPosition: stepIndex,
                    oldStepPosition: oldStepIndex,
                });
            }

            this.data.data = objTempData;

            $dom_targetRow.after(dom_item.parentElement);

            this.refreshLine();
            this.refreshLineEvent();

            $this.model.invoke('positionChange');
        } else {
            $this.myTool.message({
                type: 'warn',
                message: this.langText_message1
            });
        }

        return false;
    };

    /*移动元素-步骤，同时被放置的是span块*/
    KdWtcStepConfig.prototype.moveStep_span = function ($dom_targetItem, dom_item, isTopSpan) {
        let $this = this;
        let $dom_targetRow = $dom_targetItem.parent();
        let targetRowClass = $dom_targetRow[0].className.split(' ')[1];
        let stepId = targetRowClass.split('-')[2];
        // 移动的步骤对应的行：
        let dom_oldRow = dom_item.parentElement;
        let oldRowClass = dom_oldRow.className.split(' ')[1];
        let oldStepId = oldRowClass.split('-')[2];

        // 找出该步骤对应的阶段：
        let $dom_phaseRow = $dom_targetRow.parent().parent().parent();
        let phaseRowClass = $dom_phaseRow[0].className.split(' ')[1];
        let rowNum = Number(phaseRowClass.split('_')[1]);

        // 找出步骤在data中的位置：
        let oldStepIndex;
        let stepIndex;
        for (let i = 0; i < this.data.data[rowNum - 1].steps.length; i++) {
            let objStep = this.data.data[rowNum - 1].steps[i];
            if (objStep.id == stepId) stepIndex = i;
            if (objStep.id == oldStepId) oldStepIndex = i;
        }

        let objTempData = JSON.parse(JSON.stringify(this.data.data));

        // 将两个步骤数据交换：
        let tempData = objTempData[rowNum - 1].steps.splice(oldStepIndex, 1);
        objTempData[rowNum - 1].steps.splice(stepIndex, 0, tempData[0]);

        // 判断移动后的阶段步骤是否符合移动规则：
        let isLegal = this.moveLegal('step', objTempData, rowNum - 1);

        if (isLegal) {
            // 该删除操作推入栈：
            $this.stack.push({
                type: 'moveStep',
                phasePosition: rowNum - 1,
                stepPosition: stepIndex,
                oldStepPosition: oldStepIndex,
            });

            this.data.data = objTempData;

            // 判断是上span块，还是下span块：
            isTopSpan ? $dom_targetRow.before(dom_item.parentElement) : $dom_targetRow.after(dom_item.parentElement);

            this.refreshLine();
            this.refreshLineEvent();

            $this.model.invoke('positionChange');
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
        let rowNum = dom_oldRow.className.split(' ')[1];
        rowNum = Number(rowNum.split('_')[1]);

        if (dom_oldRow.innerHTML.trim() === '') {
            // 删除该行：
            dom_oldRow.parentNode.removeChild(dom_oldRow);
            // 行className调整：
            let dom_nextRow = this.rootDom.querySelector(`.row_${rowNum + 1}`);
            while (dom_nextRow) {
                dom_nextRow.className = 'row row_' + rowNum;
                rowNum++;
                dom_nextRow = this.rootDom.querySelector(`.row_${rowNum + 1}`);
            }
            return true
        }
        return false;
    };

    /*
    * 刷新连线（阶段+子步骤）
    * dom_curRow: 目标行（原生dom）
    * dom_oldRow: 原始行（原生dom）
    * isChangeRowHeight：是否改变了行的高度
    * */
    KdWtcStepConfig.prototype.refreshLine = function () {
        let dom_allPhase = this.dom_container.querySelectorAll('.wtc_stepConfig_item');
        let dom_allStep = this.dom_container.querySelectorAll('.step-item');
        let arrItem = [...dom_allPhase, ...dom_allStep];

        // 先删除线：
        this.itemDisconnect();
        // 再重新连线：
        let lineStr = this.itemConnect(arrItem);
        $(this.dom_container).append(lineStr);
    };

    /*
    * 1.传具体的item；2.不传表示删除全部
    * */
    KdWtcStepConfig.prototype.itemDisconnect = function (arrItem) {
        if(arrItem) {
            for (let i = 0; i < arrItem.length; i++) {
                let itemClass = arrItem[i].className.split(' ')[1];
                $(`.svg-${itemClass}`, this.dom_container).remove();
            }
        } else {
            $('.wtc_stepConfig_svg-wrap', this.dom_container).remove();
        }
    };

    /*组织连线的HTML语句*/
    KdWtcStepConfig.prototype.itemConnect = function (dow_items) {
        let $this = this;
        let lineStr = '';
        let arrRestStr = [];  // 缓存需要后加载的线

        for (let i = 0; i < dow_items.length; i++) {
            let item = dow_items[i];
            let itemType = $(item).hasClass('wtc_stepConfig_item') ? 0 : 1;   //0表示阶段，1表示步骤
            let main = $('.item-main', item);
            let bottomDot = $('.item-main-bottom-dot', main);
            let startPosition = $this.getPosition(bottomDot[0], $this.dom_container);
            if (itemType === 1) startPosition.left -= 100;  // 因为步骤是绝对定位的，所以计算距离时会出现错误，多加了自身宽度的一半，所以减去100（定死）

            // 获取下一行元素：
            let curRow = item.parentElement;
            let nextRow = curRow.nextElementSibling;
            if ($(nextRow).hasClass('row') || $(nextRow).hasClass('step-row')) {
                let svgWidth_default = 60;  // todo 如果需要修改SVG的宽度的话，修改这个值
                let newRow_firstItem = nextRow.firstElementChild;
                let newRow_main = $('.item-main', newRow_firstItem);
                let newRow_topDot = $('.item-main-top-dot', newRow_main);
                let endPosition = $this.getPosition(newRow_topDot[0], $this.dom_container);
                if (itemType === 1) endPosition.left -= 100;  // 因为步骤是绝对定位的，所以计算距离时会出现错误，多加了自身宽度的一半，所以减去100（定死）

                let curItemNum = item.className.split(' ')[1];
                let nextItemNum = newRow_firstItem.className.split(' ')[1];

                let svgWidth = Math.abs(endPosition.left - startPosition.left) + svgWidth_default;  // 加10是因为箭头宽度为10
                let svgHeight = endPosition.top - startPosition.top;
                let svgTop = startPosition.top;
                let svgLeft = endPosition.left > startPosition.left ? startPosition.left - svgWidth_default / 2 : endPosition.left - svgWidth_default / 2;

                if (endPosition.left > startPosition.left) {
                    lineStr += `
            <svg class="wtc_stepConfig_svg-wrap svg-${curItemNum} svg-${nextItemNum}" version="1.1" xmlns="http://www.w3.org/2000/svg" style="top:${svgTop}px;left:${svgLeft}px;width:${svgWidth}px;height:${svgHeight}px; z-index:${itemType === 1 ? 1010 : 0}">
                <g class="wtc_stepConfig_svg-group" stroke-width="1">
                    <rect class="wtc_stepConfig_svg-rect" rx="2" ry="2" x="0" y="${svgHeight / 2 - 16}" width="${svgWidth_default}" height="32" style="display:none;fill:rgba(255, 95, 31, 0.08);stroke-width:1;stroke:#FF5F1F;stroke-dasharray:2,2;"/>
                    <polyline points="${svgWidth_default / 2},0 ${svgWidth_default / 2},${svgHeight / 2} ${svgWidth - svgWidth_default / 2},${svgHeight / 2} ${svgWidth - svgWidth_default / 2},${svgHeight}" style="fill:#212121;stroke: #fff; stroke-width: ${svgWidth_default};opacity:0"/>
                    <polyline points="${svgWidth_default / 2},0 ${svgWidth_default / 2},${svgHeight / 2} ${svgWidth - svgWidth_default / 2},${svgHeight / 2} ${svgWidth - svgWidth_default / 2},${svgHeight}" style="fill:white;"/>
                    <polyline points="${svgWidth - svgWidth_default / 2 - 4},${svgHeight - 5} ${svgWidth - svgWidth_default / 2},${svgHeight} ${svgWidth - svgWidth_default / 2 + 4},${svgHeight - 5}" style="fill:#212121;"/>`;
                    // 查看态，步骤，或者开始阶段不需要新增按钮：
                    if (this.data.type == 0 && itemType === 0 && curItemNum !== 'wtc_stepConfig_item0') lineStr += `<use class="add-btn" x="${svgWidth_default / 2}" y="${svgHeight / 2}"  xlink:href="#wtc_stepConfig_g1"></use>`;
                    lineStr += `</g></svg>`;
                } else {
                    // 先连从左到右的线，从右到左的线先存起来（因为svg的特性：后面svg的层级会覆盖前面的，导致前面的选中不了）：
                    let strTemp = '';
                    strTemp += `
            <svg class="wtc_stepConfig_svg-wrap svg-${curItemNum} svg-${nextItemNum}" version="1.1" xmlns="http://www.w3.org/2000/svg" style="top:${svgTop}px;left:${svgLeft}px;width:${svgWidth}px;height:${svgHeight}px; z-index:${itemType === 1 ? 1010 : 0}">
                <g class="wtc_stepConfig_svg-group" stroke-width="1">
                    <rect class="wtc_stepConfig_svg-rect" rx="2" ry="2" x="0" y="${svgHeight / 2 - 16}" width="${svgWidth_default}" height="32" style="display:none;fill:rgba(255, 95, 31, 0.08);stroke-width:1;stroke:#FF5F1F;stroke-dasharray:2,2;"/>
                    <polyline points="${svgWidth - svgWidth_default / 2},0 ${svgWidth - svgWidth_default / 2},${svgHeight / 2} ${svgWidth_default / 2},${svgHeight / 2} ${svgWidth_default / 2},${svgHeight}" style="fill:#212121;stroke: #fff; stroke-width: ${svgWidth_default};opacity:0"/>
                    <polyline points="${svgWidth - svgWidth_default / 2},0 ${svgWidth - svgWidth_default / 2},${svgHeight / 2} ${svgWidth_default / 2},${svgHeight / 2} ${svgWidth_default / 2},${svgHeight}" style="fill:white;"/>
                    <polyline points="${svgWidth_default / 2 - 4},${svgHeight - 5} ${svgWidth_default / 2},${svgHeight} ${svgWidth_default / 2 + 4},${svgHeight - 5}" style="fill:#212121;"/>`;

                    if (this.data.type == 0 && itemType === 0 && curItemNum !== 'wtc_stepConfig_item0') strTemp += `<use class="add-btn" x="${svgWidth - svgWidth_default / 2}" y="${svgHeight / 2}"  xlink:href="#wtc_stepConfig_g1"></use>`;
                    strTemp += `</g></svg>`;

                    arrRestStr.push(strTemp);
                }
            }
        }

        // 加载被缓存的线:
        for (let i = arrRestStr.length - 1; i >= 0; i--) {
            lineStr += arrRestStr[i];
        }

        return lineStr;
    };

    /*刷新线的事件*/
    KdWtcStepConfig.prototype.refreshLineEvent = function () {
        let $this = this;

        if (this.data.type == 0) {
            // // 先解绑，再重新绑定事件：
            $('.wtc_stepConfig_svg-group', this.rootDom).off('mouseenter');
            $('.wtc_stepConfig_svg-group', this.rootDom).off('mouseleave');
            $('.wtc_stepConfig_svg-wrap', this.rootDom).off('dragover');
            $('.wtc_stepConfig_svg-wrap', this.rootDom).off('dragleave');
            $('.wtc_stepConfig_svg-wrap', this.rootDom).off('drop');

            // hover线时触发事件：
            $('.wtc_stepConfig_svg-group', $this.rootDom).on({
                mouseenter: function () {
                    $this.showAddBtn(this)
                },
                mouseleave: function () {
                    $this.hideAddBtn(this)
                }
            });

            $('.wtc_stepConfig_svg-wrap', $this.rootDom).on({
                dragover: function (event) {
                    $this.allowDrop(event.originalEvent, this)
                },
                dragleave: function (event) {
                    $this.hideHotPart()
                },
                drop: function (event) {
                    $this.drop(event.originalEvent, this)
                }
            });
        }
    };

    /*点击事件，区分点击的是阶段还是步骤*/
    KdWtcStepConfig.prototype.clickHandle = function (target) {
        let $this = this;
        // 判断目标的类名来区分具体的事件：
        if (typeof target.className === 'string') {
            switch (target.className) {
                case 'wtc_stepConfig_icon-step-num':  // 点击数字圈，展开收起步骤
                    $this.toggleSteps(target);
                    break;
                case 'wtc_stepConfig_item-input wtc_stepConfig_item-main-text':  // 点击阶段框
                case 'wtc_stepConfig_item-input wtc_stepConfig_item-main-text item-main-active':
                    if ($(target).hasClass('item-main-active')) return;  //当前已选中，不重复执行
                    // 添加定时器用于解决双击时也会触发单机事件的问题
                    clearTimeout($this.timer);
                    $this.timer = setTimeout(function () {
                        $('.wtc_stepConfig_item-input', $this.dom_container).removeClass('item-main-active');
                        $(target).addClass('item-main-active');
                        if ($this.data.power) { // 有权限显示高级配置
                            $this.showSeniorSet(target.parentElement.parentElement);
                        }
                    }, 240);
                    break;
                case 'wtc_stepConfig_item-input wtc_stepConfig_item-step-text':  // 点击步骤框
                case 'wtc_stepConfig_item-input wtc_stepConfig_item-step-text item-main-active':
                    if ($(target).hasClass('item-main-active')) return;  //当前已选中，不重复执行
                    $('.wtc_stepConfig_item-input', this.dom_container).removeClass('item-main-active');
                    $(target).addClass('item-main-active');
                    if (this.data.power) { // 有权限显示高级配置
                        this.showSeniorSet(target.parentElement.parentElement);
                    }
                    break;
                case 'wtc_stepConfig_icon-set kdfont kdfont-shezhi11':  // 阶段/步骤设置按钮
                case 'wtc_stepConfig_icon-set kdfont kdfont-yanjing':  // 阶段/步骤查看按钮
                    $('.wtc_stepConfig_item-input', $this.dom_container).removeClass('item-main-active');
                    $('.wtc_stepConfig_item-input', target.parentElement.parentElement).addClass('item-main-active');
                    $this.setEvent(target);
                    if (this.data.power) { // 有权限显示高级配置
                        this.showSeniorSet(target.parentElement.parentElement.parentElement);
                    }
                    break;
                case 'wtc_stepConfig_icon-del kdfont kdfont-shanchu7':  // 删除按钮
                    $('.wtc_stepConfig_item-input', $this.dom_container).removeClass('item-main-active');
                    $('.wtc_stepConfig_item-input', target.parentElement.parentElement).addClass('item-main-active');
                    $this.delEvent(target);
                    if (this.data.power) { // 有权限显示高级配置
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

        let objData = this.getDataPosition(target);

        this.modifySeniorSetData(objData.type, objData.data.phaseResultDeal, objData.data.noReturnHandler, objData.data.edit);
        // this.modifySeniorSetData(objData.type, objData.data.phaseResultDeal, objData.data.phaseSave, objData.data.noReturnHandler, objData.data.edit);
        // 修改设置弹窗的位置：
        // let dom_wrap = this.rootDom.querySelector('.wtc_stepConfig_wrap');
        // let dom_scrollArea = this.rootDom.parentElement.parentElement.parentElement.parentElement.parentElement;
        let position = this.getPosition(target, null).top - 50;
        let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        if (objData.type === 'phase' && position + 470 > clientHeight) position = clientHeight - 470;
        if (objData.type === 'step' && position + 350 > clientHeight) position = clientHeight - 350;
        $('.wtc_stepConfig_senior-dialog', this.rootDom).css('top', position + 'px')
    };

    /*
    * phaseResultDeal: 0,  //阶段结果处理：0合并，1覆盖
    * phaseSave: 0,  //阶段存储：0否，1 是
    * noReturnHandler: 0,  //无输出决策器：0下一步，1继续，2跳出，3终止，4错误
    * */
    KdWtcStepConfig.prototype.modifySeniorSetData = function (type, phaseResultDeal, noReturnHandler, phaseResultDealEdit) {
        let $dom_set1 = $('.wtc_stepConfig_senior-dialog-set1', this.rootDom);  // 阶段结果处理
        // let $dom_set2 = $('.wtc_stepConfig_senior-dialog-set2', this.rootDom);  // 阶段存储
        let $dom_set3 = $('.wtc_stepConfig_senior-dialog-set3', this.rootDom);  // 无输出决策器

        if (type === 'phase') {
            // $dom_set2.css('display', 'block');
            $dom_set1.css('display', 'block');

            // 阶段存储为否时，阶段结果处理不显示,否则显示：
            // if (phaseSave == 0) {
            //     $dom_set1.css('display', 'none');
            // } else {
            //     $dom_set1.css('display', 'block');
            // }
            // 由后端给的数据控制阶段处理结果是否允许点击：
            if(phaseResultDealEdit) {
                $dom_set1.removeClass('wtc_stepConfig_senior-phaseResultDeal-disabled');
            } else {
                $dom_set1.addClass('wtc_stepConfig_senior-phaseResultDeal-disabled');
            }

            //标题修改：
            let activeInputVal = $('.item-main-active', this.rootDom).val();
            let $dom_dialogName = $('.wtc_stepConfig_senior-dialog-phase-name', this.rootDom);
            $dom_dialogName.html('阶段：' + activeInputVal);
            // 阶段结果处理数据修改：
            $('.wtc_stepConfig_senior-dialog-options-item', $dom_set1).removeClass('wtc_stepConfig_senior-dialog-options-item-active');
            let $dom_activeItem = $(`.wtc_stepConfig_senior-dialog-options-item[index=${phaseResultDeal}]`, $dom_set1);
            $dom_activeItem.addClass('wtc_stepConfig_senior-dialog-options-item-active');
            let $dom_selected = $('.wtc_stepConfig_senior-dialog-selected', $dom_set1);
            $dom_selected.html($dom_activeItem.html());

            // 阶段存储数据修改：
            // $('.wtc_stepConfig_senior-dialog-options-item', $dom_set2).removeClass('wtc_stepConfig_senior-dialog-options-item-active');
            // $dom_activeItem = $(`.wtc_stepConfig_senior-dialog-options-item[index=${phaseSave}]`, $dom_set2);
            // $dom_activeItem.addClass('wtc_stepConfig_senior-dialog-options-item-active');
            // $dom_selected = $('.wtc_stepConfig_senior-dialog-selected', $dom_set2);
            // $dom_selected.html($dom_activeItem.html());
        } else {
            $dom_set1.css('display', 'none');
            // $dom_set2.css('display', 'none');
            //标题修改：
            let activeInputVal = $('.item-main-active', this.rootDom).val();
            let $dom_dialogName = $('.wtc_stepConfig_senior-dialog-phase-name', this.rootDom);
            $dom_dialogName.html('步骤：' + activeInputVal);
        }

        // 无输出决策器数据修改：
        $('.wtc_stepConfig_senior-dialog-options-item', $dom_set3).removeClass('wtc_stepConfig_senior-dialog-options-item-active');
        let $dom_activeItem = $(`.wtc_stepConfig_senior-dialog-options-item[index=${noReturnHandler}]`, $dom_set3);
        $dom_activeItem.addClass('wtc_stepConfig_senior-dialog-options-item-active');
        let $dom_selected = $('.wtc_stepConfig_senior-dialog-selected', $dom_set3);
        $dom_selected.html($dom_activeItem.html());
    };

    /*
    * target: 新增阶段按钮的原生dom
    * */
    KdWtcStepConfig.prototype.addPhaseClick = function (target) {
        let svgClass = target.parentElement.parentElement.className.baseVal;
        let startItemClass = svgClass.split(' ')[1].split('-')[1];
        let dom_curRow = this.dom_container.querySelector('.' + startItemClass).parentElement;
        let curRowClass = dom_curRow.className.split(' ')[1];
        let curRowNum = Number(curRowClass.split('_')[1]);

        let otherSteps = [];
        let otherPhaseList = [];
        for (let i = 0; i < this.data.data.length; i++) {
            otherPhaseList.push({
                phaseId: this.data.data[i].phaseId,
                phase: this.data.data[i].phase,
            });
            for (let j = 0; j < this.data.data[i].steps.length; j++) {
                otherSteps.push(this.data.data[i].steps[j].id);
            }
        }

        this.model.invoke('addphase', {position: curRowNum, othersteps: otherSteps, otherPhaseList: otherPhaseList});

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
        let $this = this;

        let objTempData = JSON.parse(JSON.stringify(this.data.data));
        // 将新增的阶段数据添加到this.data中：
        objTempData.splice(position, 0, data[0]);

        // 判断移动后的阶段步骤是否符合移动规则：
        let isLegal = this.moveLegal('phase', objTempData);

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
                message: `“${data[0].phase}”${$this.langText_message2}`
            });
        }
    };

    /*新增阶段-子函数*/
    KdWtcStepConfig.prototype.addPhase_inner = function (position, data) {
        let $this = this;
        let dom_curRow = this.dom_container.querySelector('.row_' + position);
        let rowNum = position + 1;  // 需要调整行序号的行

        $this.itemIndex++;
        // 行className调整：
        let dom_nextRow = this.rootDom.querySelector(`.row_${rowNum}`);
        while ($(dom_nextRow).hasClass('row')) {
            dom_nextRow.className = 'row row_' + (rowNum + 1);
            rowNum++;
            dom_nextRow = dom_nextRow.nextElementSibling;
        }

        let str = `
                <div class="row row_${position + 1}">
                    <div class="wtc_stepConfig_item wtc_stepConfig_item${this.itemIndex}">
                        <div class="item-span-left"></div>
                        <div class="item-main">
                            <div class="item-main-top-dot"></div>
                            <div class="item-main-bottom-dot"></div>
                            <input class="wtc_stepConfig_item-input wtc_stepConfig_item-main-text" title="${data[0].phase}" value="${data[0].phase}" disabled draggable="true">
                            <i class="wtc_stepConfig_icon-step-num" stepnum="${data[0].steps.length}">${data[0].steps.length}</i>
                            <div class="wtc_stepConfig_icon-wrap">
                                <i class="wtc_stepConfig_icon-set kdfont kdfont-shezhi11"></i>
                                ${data[0].del ? '<i class="wtc_stepConfig_icon-del kdfont kdfont-shanchu7"></i>' : ''}
                            </div>
                        </div>
                        <div class="item-span-right"></div>
                        <div class="wtc_stepConfig_item-step">
                            <div class="wtc_stepConfig_item-step-triangle"></div>
                            <div class="wtc_stepConfig_item-step-triangle2"></div>
         `;
        for (let j = 0; j < data[0].steps.length; j++) {
            let objStep = data[0].steps[j];
            let setIcon = objStep.syspreset ? 'kdfont-yanjing' : 'kdfont-shezhi11';  // 预制数据只能查看，所以用眼睛的icon
            objStep.desc = objStep.desc || '无';
            let desc_firstText = objStep.desc.slice(0, 48);
            let desc_otherText = objStep.desc.slice(48);
            str += `
                    <div class="step-row step-row-${objStep.id}">
                        <div class="step-item step-item-${objStep.id}">
                            <div class="wtc_stepConfig_span-top-bottom wtc_stepConfig_span-top" style="position:absolute;top:-20px;left:50%;transform: translateX(-50%);width: 60px;height: 20px;"></div>
                            <div class="wtc_stepConfig_span-top-bottom wtc_stepConfig_span-bottom" style="position:absolute;bottom:-20px;left:50%;transform: translateX(-50%);width: 60px;height: 20px;"></div>
                            <div class="item-span-left"></div>
                            <div class="item-main item-main-step">
                                <div class="item-main-top-dot"></div>
                                <div class="item-main-bottom-dot"></div>
                                <input class="wtc_stepConfig_item-input wtc_stepConfig_item-step-text" value="${objStep.step}" disabled draggable="true">
                                <div class="wtc_stepConfig_step-detail">
                                    <div class="wtc_stepConfig_step-detail-item">${objStep.step}</div>
                                    <div class="wtc_stepConfig_step-detail-item">${this.langText_effectiveDate}：${objStep.startdate}</div>
                                    <div class="wtc_stepConfig_step-detail-item">${this.langText_resultType}：${objStep.resulttype == '1' ? this.langText_timePair : this.langText_itemValue}</div>
                                    <!--<div class="wtc_stepConfig_step-detail-item">${this.langText_calrule}：${objStep.calrule == '1' ? this.langText_customFormula : this.langText_customCode}</div>-->
                                    <div class="wtc_stepConfig_step-detail-item">
                                        <span class="wtc_stepConfig_step-detail-item-first-text">${this.langText_desc}：${desc_firstText}</span>
                                        <span class="wtc_stepConfig_step-detail-item-other-text">${desc_otherText}</span>
                                        ${desc_otherText ? '<span class="wtc_stepConfig_step-detail-item-open">展开</span>' : ''}
                                    </div>
                                </div>
                                <div class="wtc_stepConfig_icon-wrap">
                                    <i class="wtc_stepConfig_icon-set kdfont ${setIcon}"></i>
                                    ${objStep.del ? '<i class="wtc_stepConfig_icon-del kdfont kdfont-shanchu7"></i>' : ''}
                                </div>
                            </div>
                            <div class="item-span-right"></div>
                        </div>
                    </div>
                `;
        }

        str += `</div></div></div>`;

        $(dom_curRow).after(str);

        let $dom_newRow = $(`.row_${position + 1}`, this.rootDom);

        this.refreshLine();
        this.refreshLineEvent();

        // 给新增的item绑定，经过以及放入span块时触发事件：
        $('.wtc_stepConfig_span-top-bottom', $this.rootDom).on({
            dragover: function (event) {
                $this.allowDrop(event.originalEvent, this)
            },
            dragleave: function (event) {
                $this.hideHotPart()
            },
            drop: function (event) {
                $this.drop(event.originalEvent, this)
            }
        });

        // 给新增的item绑定拖起事件
        $('.wtc_stepConfig_item', $dom_newRow).on({
            dragstart: function (event) {
                $this.drag('phase', event.originalEvent)
            },
            dragend: function () {
                $this.hideHotPart()
            }
        });
        $('.step-item', $dom_newRow).on({
            dragstart: function (event) {
                event.stopPropagation();  //阻止冒泡
                $this.drag('step', event.originalEvent)
            },
            dragend: function () {
                $this.hideHotPart()
            }
        });

        $('.item-main', $dom_newRow).on({
            'mouseenter.showIcon': function () {
                $('.wtc_stepConfig_icon-wrap', this).css('display', 'block')
            },
            'mouseleave.showIcon': function () {
                $('.wtc_stepConfig_icon-wrap', this).css('display', 'none')
            }
        });

        // 输入框失焦事件：
        let $dom_phaseInput = $('.wtc_stepConfig_item-main-text', $dom_newRow);
        $dom_phaseInput.on('blur', function () {
            $this.modifyName_confirm(this)
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
            $('.wtc_stepConfig_step-detail-item-other-text', this.parentElement).css('display', 'inline');  //显示更多文本
            $(this).css('display', 'none');  //隐藏“展开”
        });
        // 步骤详情收起更多描述事件：
        $('.item-main', $dom_newRow).mouseleave(function () {
            if ($('.wtc_stepConfig_step-detail-item-other-text', this.parentElement).html()) {
                $('.wtc_stepConfig_step-detail-item-other-text', this.parentElement).css('display', 'none');  //隐藏更多文本
                $('.wtc_stepConfig_step-detail-item-open', this.parentElement).css('display', 'inline'); //显示“展开”
            }
        });
    };

    /*新增步骤*/
    KdWtcStepConfig.prototype.addStep = function (phasePosition, stepPosition, data) {
        let $this = this;
        let $dom_phaseRow = $('.row_' + (phasePosition + 1), this.dom_container);
        let dom_stepRow = $('.step-row', $dom_phaseRow)[stepPosition - 1 < 0 ? 0 : stepPosition - 1];
        let setIcon = data.syspreset ? 'kdfont-yanjing' : 'kdfont-shezhi11';  // 预制数据只能查看，所以用眼睛的icon
        data.desc = data.desc || '无';
        let desc_firstText = data.desc.slice(0, 48);
        let desc_otherText = data.desc.slice(48);
        let str = `
                    <div class="step-row step-row-${data.id}">
                        <div class="step-item step-item-${data.id}">
                            <div class="wtc_stepConfig_span-top-bottom wtc_stepConfig_span-top" style="position:absolute;top:-20px;left:50%;transform: translateX(-50%);width: 60px;height: 20px;"></div>
                            <div class="wtc_stepConfig_span-top-bottom wtc_stepConfig_span-bottom" style="position:absolute;bottom:-20px;left:50%;transform: translateX(-50%);width: 60px;height: 20px;"></div>
                            <div class="item-span-left"></div>
                            <div class="item-main item-main-step">
                                <div class="item-main-top-dot"></div>
                                <div class="item-main-bottom-dot"></div>
                                <input class="wtc_stepConfig_item-input wtc_stepConfig_item-step-text" value="${data.step}" disabled draggable="true">
                                <div class="wtc_stepConfig_step-detail">
                                    <div class="wtc_stepConfig_step-detail-item">${data.step}</div>
                                    <div class="wtc_stepConfig_step-detail-item">${this.langText_effectiveDate}：${data.startdate}</div>
                                    <div class="wtc_stepConfig_step-detail-item">${this.langText_resultType}：${data.resulttype == '1' ? this.langText_timePair : this.langText_itemValue}</div>
                                    <!--<div class="wtc_stepConfig_step-detail-item">${this.langText_calrule}：${data.calrule == '1' ? this.langText_customFormula : this.langText_customCode}</div>-->
                                    <div class="wtc_stepConfig_step-detail-item">
                                        <span class="wtc_stepConfig_step-detail-item-first-text">${this.langText_desc}：${desc_firstText}</span>
                                        <span class="wtc_stepConfig_step-detail-item-other-text">${desc_otherText}</span>
                                        ${desc_otherText ? '<span class="wtc_stepConfig_step-detail-item-open">展开</span>' : ''}
                                    </div>
                                </div>
                                <div class="wtc_stepConfig_icon-wrap">
                                    <i class="wtc_stepConfig_icon-set kdfont ${setIcon}"></i>
                                    ${data.del ? '<i class="wtc_stepConfig_icon-del kdfont kdfont-shanchu7"></i>' : ''}
                                </div>
                            </div>
                            <div class="item-span-right"></div>
                        </div>
                    </div>
                `;

        stepPosition - 1 < 0 ? $(dom_stepRow).before(str) : $(dom_stepRow).after(str);

        let $dom_newRow = $(`.step-row-${data.id}`, $dom_phaseRow);

        // 调整行的高度
        $dom_phaseRow.css('padding-bottom', parseInt($dom_phaseRow.css('padding-bottom')) + 52 + 'px');

        this.refreshLine();
        this.refreshLineEvent();

        // 给新增的item绑定，经过以及放入span块时触发事件：
        $('.wtc_stepConfig_span-top-bottom', $dom_newRow).on({
            dragover: function (event) {
                $this.allowDrop(event.originalEvent, this)
            },
            dragleave: function (event) {
                $this.hideHotPart()
            },
            drop: function (event) {
                $this.drop(event.originalEvent, this)
            }
        });

        // 给新增的item绑定拖起事件
        $('.step-item', $dom_newRow).on({
            dragstart: function (event) {
                event.stopPropagation();  //阻止冒泡
                $this.drag('step', event.originalEvent)
            },
            dragend: function () {
                $this.hideHotPart()
            }
        });

        $('.item-main', $dom_newRow).on({
            'mouseenter.showIcon': function () {
                $('.wtc_stepConfig_icon-wrap', this).css('display', 'block')
            },
            'mouseleave.showIcon': function () {
                $('.wtc_stepConfig_icon-wrap', this).css('display', 'none')
            }
        });

        $('.item-main-step', $dom_newRow).hover(function (event) {
            this.parentElement.parentElement.parentElement.parentElement.style.zIndex = 4;
        }, function (event) {
            this.parentElement.parentElement.parentElement.parentElement.style.zIndex = 3;
        });

        // 步骤详情展开更多描述事件：
        $('.wtc_stepConfig_step-detail-item-open', $dom_newRow).click(function () {
            $('.wtc_stepConfig_step-detail-item-other-text', this.parentElement).css('display', 'inline');  //显示更多文本
            $(this).css('display', 'none');  //隐藏“展开”
        });
    };

    /*
    * 展开收起步骤
    * target: input输入框的原生dom
    * */
    KdWtcStepConfig.prototype.toggleSteps = function (target) {
        let $dom_stepsWrap = $('.wtc_stepConfig_item-step', target.parentElement.parentElement);

        if ($dom_stepsWrap.css('display') === 'block') {
            this.foldSteps(target)
        } else {
            this.openSteps(target)
        }
    };

    /*展开步骤*/
    KdWtcStepConfig.prototype.openSteps = function (target) {
        let $target = $(target);
        let dom_curPhase = target.parentElement.parentElement;
        let $dom_curRow = $(dom_curPhase.parentElement);
        let $dom_stepsWrap = $('.wtc_stepConfig_item-step', target.parentElement.parentElement);

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
        // 刷新阶段，步骤连线：
        this.refreshLine();
        this.refreshLineEvent();
    };

    /*收起步骤*/
    KdWtcStepConfig.prototype.foldSteps = function (target) {
        let $target = $(target);
        let dom_curPhase = target.parentElement.parentElement;
        let $dom_curRow = $(dom_curPhase.parentElement);
        let $dom_stepsWrap = $('.wtc_stepConfig_item-step', target.parentElement.parentElement);

        // 数量icon变化
        if ($target.hasClass('wtc_stepConfig_item-main-text')) {
            target.nextElementSibling.innerHTML = target.nextElementSibling.getAttribute("stepnum");
        } else {
            target.innerHTML = target.getAttribute("stepnum");
        }
        // 调整行的高度
        $dom_curRow.css('padding-bottom', parseInt($dom_curRow.css('padding-bottom')) - $dom_stepsWrap.height() + 20 + 'px');
        // 隐藏步骤：
        $dom_stepsWrap.hide();
        // 刷新阶段，步骤连线：
        this.refreshLine();
        this.refreshLineEvent();
    };

    /*
    * 点击阶段设置按钮，或者步骤设置按钮
    * */
    KdWtcStepConfig.prototype.setEvent = function (target) {
        // 判断是设置步骤还是设置阶段：
        let $dom_curItem = $(target.parentElement.parentElement.parentElement);

        if ($dom_curItem.hasClass('step-item')) {
            let stepId = $dom_curItem[0].className.split(' ')[1].split('-')[2];
            this.model.invoke('editsteps', {stepid: stepId});
        } else {
            let dom_curRow = $dom_curItem[0].parentElement;
            let curRowClass = dom_curRow.className.split(' ')[1];
            let curRowNum = Number(curRowClass.split('_')[1]);

            let curStep = [];
            for (let i = 0; i < this.data.data[curRowNum - 1].steps.length; i++) {
                curStep.push({
                    id: this.data.data[curRowNum - 1].steps[i].id,
                    noReturnHandler: this.data.data[curRowNum - 1].steps[i].noReturnHandler,
                    move: this.data.data[curRowNum - 1].steps[i].move,
                    del: this.data.data[curRowNum - 1].steps[i].del,
                })
            }

            let otherSteps = [];
            let otherPhaseList = [];
            for (let i = 0; i < this.data.data.length; i++) {
                if (i !== curRowNum - 1) {
                    otherPhaseList.push({
                        phaseId: this.data.data[i].phaseId,
                        phase: this.data.data[i].phase,
                    });
                    for (let j = 0; j < this.data.data[i].steps.length; j++) {
                        otherSteps.push(this.data.data[i].steps[j].id)
                    }
                }
            }

            this.model.invoke('editphase', {
                phase: this.data.data[curRowNum - 1].phase,
                phaseId: this.data.data[curRowNum - 1].phaseId,
                move: this.data.data[curRowNum - 1].move,
                del: this.data.data[curRowNum - 1].del,
                noReturnHandler: this.data.data[curRowNum - 1].noReturnHandler,
                phaseResultDeal: this.data.data[curRowNum - 1].phaseResultDeal,
                phaseSave: this.data.data[curRowNum - 1].phaseSave,
                phasenumber: this.data.data[curRowNum - 1].phasenumber,
                position: curRowNum,
                steps: curStep,
                othersteps: otherSteps,
                otherPhaseList: otherPhaseList,
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
        let $this = this;

        let objTempData = JSON.parse(JSON.stringify(this.data.data));
        // 将修改的阶段数据替换到this.data中：
        objTempData.splice(position - 1, 1, data[0]);

        // 判断移动后的阶段步骤是否符合移动规则：
        let isLegal = this.moveLegal('step', objTempData, position - 1);

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
                message: `“${data[0].phase}”${$this.langText_message2}`
            });
        }
    };

    /*修改阶段-子函数*/
    KdWtcStepConfig.prototype.modifyPhase_inner = function (position, data) {
        let $this = this;
        // 将展开的阶段折叠，便于替换：
        let $dom_curRow = $('.row_' + position, this.rootDom);
        let $dom_curPhase = $('.wtc_stepConfig_item', $dom_curRow);
        let isShowStep = $('.wtc_stepConfig_item-step', $dom_curRow).css('display') === 'block';
        let $dom_phaseInput = $('.wtc_stepConfig_item-main-text', $dom_curRow);
        let isActive = $dom_phaseInput.hasClass('item-main-active');
        if (isShowStep) {
            // 折叠该阶段：
            this.toggleSteps($dom_phaseInput[0]);
        }

        this.itemIndex++;
        let str = `
            <div class="wtc_stepConfig_item wtc_stepConfig_item${this.itemIndex}">
                <div class="item-span-left"></div>
                <div class="item-main">
                    <div class="item-main-top-dot"></div>
                    <div class="item-main-bottom-dot"></div>
                    <input class="wtc_stepConfig_item-input wtc_stepConfig_item-main-text${isActive ? ' item-main-active' : ''}" title="${data[0].phase}" value="${data[0].phase}" disabled draggable="true">
                    <i class="wtc_stepConfig_icon-step-num" stepnum="${data[0].steps.length}">${data[0].steps.length}</i>
                    <div class="wtc_stepConfig_icon-wrap">
                        <i class="wtc_stepConfig_icon-set kdfont kdfont-shezhi11"></i>
                        ${data[0].del ? '<i class="wtc_stepConfig_icon-del kdfont kdfont-shanchu7"></i>' : ''}
                    </div>
                </div>
                <div class="item-span-right"></div>
                <div class="wtc_stepConfig_item-step">
                    <div class="wtc_stepConfig_item-step-triangle"></div>
                    <div class="wtc_stepConfig_item-step-triangle2"></div>
        `;
        for (let j = 0; j < data[0].steps.length; j++) {
            let objStep = data[0].steps[j];
            let setIcon = objStep.syspreset ? 'kdfont-yanjing' : 'kdfont-shezhi11';  // 预制数据只能查看，所以用眼睛的icon
            objStep.desc = objStep.desc || '无';
            let desc_firstText = objStep.desc.slice(0, 48);
            let desc_otherText = objStep.desc.slice(48);
            str += `
                <div class="step-row step-row-${objStep.id}">
                    <div class="step-item step-item-${objStep.id}">
                        <div class="wtc_stepConfig_span-top-bottom wtc_stepConfig_span-top" style="position:absolute;top:-20px;left:50%;transform: translateX(-50%);width: 60px;height: 20px;"></div>
                        <div class="wtc_stepConfig_span-top-bottom wtc_stepConfig_span-bottom" style="position:absolute;bottom:-20px;left:50%;transform: translateX(-50%);width: 60px;height: 20px;"></div>
                        <div class="item-span-left"></div>
                        <div class="item-main item-main-step">
                            <div class="item-main-top-dot"></div>
                            <div class="item-main-bottom-dot"></div>
                            <input class="wtc_stepConfig_item-input wtc_stepConfig_item-step-text" value="${objStep.step}" disabled draggable="true">
                            <div class="wtc_stepConfig_step-detail">
                                <div class="wtc_stepConfig_step-detail-item">${objStep.step}</div>
                                <div class="wtc_stepConfig_step-detail-item">${this.langText_effectiveDate}：${objStep.startdate}</div>
                                <div class="wtc_stepConfig_step-detail-item">${this.langText_resultType}：${objStep.resulttype == '1' ? this.langText_timePair : this.langText_itemValue}</div>
                                <!--<div class="wtc_stepConfig_step-detail-item">${this.langText_calrule}：${objStep.calrule == '1' ? this.langText_customFormula : this.langText_customCode}</div>-->
                                <div class="wtc_stepConfig_step-detail-item">
                                    <span class="wtc_stepConfig_step-detail-item-first-text">${this.langText_desc}：${desc_firstText}</span>
                                    <span class="wtc_stepConfig_step-detail-item-other-text">${desc_otherText}</span>
                                    ${desc_otherText ? '<span class="wtc_stepConfig_step-detail-item-open">展开</span>' : ''}
                                </div>
                            </div>
                            <div class="wtc_stepConfig_icon-wrap">
                                <i class="wtc_stepConfig_icon-set kdfont ${setIcon}"></i>
                                ${objStep.del ? '<i class="wtc_stepConfig_icon-del kdfont kdfont-shanchu7"></i>' : ''}
                            </div>
                        </div>
                        <div class="item-span-right"></div>
                    </div>
                </div>
            `;
        }

        str += `</div></div>`;

        $dom_curPhase.replaceWith(str);

        if (isShowStep) {
            // 再展开该阶段：
            $dom_phaseInput = $('.wtc_stepConfig_item-main-text', $dom_curRow);
            this.toggleSteps($dom_phaseInput[0]);
        }

        // 刷新连线：
        $this.refreshLine();
        $this.refreshLineEvent();

        // 拖动item经过以及放入span块时触发事件：
        $('.wtc_stepConfig_span-top-bottom', $dom_curRow).on({
            dragover: function (event) {
                $this.allowDrop(event.originalEvent, this)
            },
            dragleave: function (event) {
                $this.hideHotPart()
            },
            drop: function (event) {
                $this.drop(event.originalEvent, this)
            }
        });

        // 该item被拖动触发事件：
        $('.wtc_stepConfig_item', $dom_curRow).on({
            dragstart: function (event) {
                $this.drag('phase', event.originalEvent)
            },
            dragend: function () {
                $this.hideHotPart()
            }
        });
        $('.step-item', $dom_curRow).on({
            dragstart: function (event) {
                event.stopPropagation();  //阻止冒泡
                $this.drag('step', event.originalEvent)
            },
            dragend: function () {
                $this.hideHotPart()
            }
        });
        $('.item-main', $dom_curRow).on({
            'mouseenter.showIcon': function () {
                $('.wtc_stepConfig_icon-wrap', this).css('display', 'block')
            },
            'mouseleave.showIcon': function () {
                $('.wtc_stepConfig_icon-wrap', this).css('display', 'none')
            }
        });

        // 输入框失焦事件：
        $('.wtc_stepConfig_item-main-text', $dom_curRow).on('blur', function () {
            $this.modifyName_confirm(this)
        });

        $('.item-main-step', $dom_curRow).hover(function (event) {
            this.parentElement.parentElement.parentElement.parentElement.style.zIndex = 4;
        }, function (event) {
            this.parentElement.parentElement.parentElement.parentElement.style.zIndex = 3;
        });

        // 步骤详情展开更多描述事件：
        $('.wtc_stepConfig_step-detail-item-open', $dom_curRow).click(function () {
            $('.wtc_stepConfig_step-detail-item-other-text', this.parentElement).css('display', 'inline');  //显示更多文本
            $(this).css('display', 'none');  //隐藏“展开”
        });
        // 步骤详情收起更多描述事件：
        $('.item-main', $dom_curRow).mouseleave(function () {
            if ($('.wtc_stepConfig_step-detail-item-other-text', this.parentElement).html()) {
                $('.wtc_stepConfig_step-detail-item-other-text', this.parentElement).css('display', 'none');  //隐藏更多文本
                $('.wtc_stepConfig_step-detail-item-open', this.parentElement).css('display', 'inline'); //显示“展开”
            }
        });
    };

    /*
    * target: 删除icon的原生dom
    * */
    KdWtcStepConfig.prototype.delEvent = function (target) {
        let $this = this;
        // 判断是删除步骤还是阶段：
        let $dom_curItem = $(target.parentElement.parentElement.parentElement);
        if ($dom_curItem.hasClass('step-item')) {
            let stepValue = $('.wtc_stepConfig_item-step-text', $dom_curItem).val();
            this.myTool.confirmDialog({
                text: this.langText_deleteConfirm + stepValue + this.langText_warn1,
                showTitle: true,
                showImg: true,
                showBtn: true,
                title: '操作确认',
                img: $this.KDApi.getNameSpace($this.model) + 'images/delete.png',
                confirmBtn: this.langText_confirm,
                cancelBtn: this.langText_cancel,
                confirmCallback() {
                    // 判断是否是最后一个步骤：
                    if ($('.step-row', $dom_curItem.parent().parent()).length > 1) {
                        let objData = $this.getDataPosition($dom_curItem[0]);
                        // 该删除操作推入栈：
                        $this.stack.push({
                            type: 'delStep',
                            phasePosition: objData.phaseIndex,
                            stepPosition: objData.stepIndex,
                            data: objData.data
                        });

                        $this.data.data[objData.phaseIndex].steps.splice(objData.stepIndex, 1);

                        let dom_phaseRow = $dom_curItem[0].parentElement.parentElement.parentElement.parentElement;
                        // 删除节点：
                        $dom_curItem.parent().remove();
                        // 调整行的高度
                        let stepsWrapHeight = $('.wtc_stepConfig_item-step', dom_phaseRow).height();
                        $(dom_phaseRow).css('padding-bottom', 50 + stepsWrapHeight - 20 + 'px');
                        // 刷新步骤数量：
                        let $dom_stepnum = $('.wtc_stepConfig_icon-step-num', dom_phaseRow);
                        $dom_stepnum.attr('stepnum', Number($dom_stepnum.attr('stepnum')) - 1);
                        // 刷新连线：
                        $this.refreshLine();
                        $this.refreshLineEvent();
                        $('.wtc_stepConfig_senior-dialog', $this.rootDom).hide();
                    } else {
                        $this.myTool.message({
                            type: 'warn',
                            message: $this.langText_message3
                        })
                    }
                },
                cancelCallback() {
                }
            });
        }
        else {
            let phaseValue = $('.wtc_stepConfig_item-main-text', $dom_curItem).val();
            this.myTool.confirmDialog({
                text: this.langText_deleteConfirm + phaseValue + this.langText_warn1,
                showTitle: true,
                showImg: true,
                showBtn: true,
                title: '操作确认',
                img: $this.KDApi.getNameSpace($this.model) + 'images/delete.png',
                confirmBtn: this.langText_confirm,
                cancelBtn: this.langText_cancel,
                confirmCallback() {
                    let dom_phaseRow = $dom_curItem[0].parentElement;
                    let curRowClass = dom_phaseRow.className.split(' ')[1];
                    let curRowNum = Number(curRowClass.split('_')[1]);

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
                    // 删除空的行：
                    $this.delEmptyRow(dom_phaseRow);
                    // 刷新连线：
                    $this.refreshLine();
                    $this.refreshLineEvent();
                    $('.wtc_stepConfig_senior-dialog', $this.rootDom).hide();
                },
                cancelCallback() {

                }
            });
        }
    };

    /*
    * target: input输入框的原生dom
    * */
    KdWtcStepConfig.prototype.modifyName = function (target) {
        let $target = $(target);

        $target.addClass('wtc_stepConfig_parse-input-edit');
        $target.attr("disabled", false).focus();
        //使光标显示在行末
        var result = $target.val();
        $target.val("");
        $target.val(result);
    };

    /*点击修改阶段名称弹窗的确定按钮*/
    KdWtcStepConfig.prototype.modifyName_confirm = function (target) {
        let $target = $(target);
        $target.removeClass('wtc_stepConfig_parse-input-edit');
        $target.attr('disabled', true);

        var result = $target.val();
        var dom_row = target.parentElement.parentElement.parentElement;
        let targetRowClass = dom_row.className.split(' ')[1];
        let rowNum = Number(targetRowClass.split('_')[1]);

        // 输入框中内容的合法性检测-与原本一致：
        if (this.data.data[rowNum - 1].phase === result) return;
        // 输入框中内容的合法性检测-非空：
        if (result.trim() === '') {
            this.myTool.message({
                type: 'warn',
                message: this.langText_message5
            });
            $target.val(this.data.data[rowNum - 1].phase);
            return
        }
        // 输入框中内容的合法性检测-名称重复：
        for (let i = 0; i < this.data.data.length; i++) {
            if (this.data.data[i].phase === result) {
                this.myTool.message({
                    type: 'warn',
                    message: this.langText_message6
                });
                $target.val(this.data.data[rowNum - 1].phase);
                return
            }
        }

        // 该修改名称操作推入栈：
        this.stack.push({
            type: 'modifyName',
            phasePosition: rowNum - 1,
            data: this.data.data[rowNum - 1].phase
        });

        this.data.data[rowNum - 1].phase = result;
        // 修改悬浮时的文本：
        $target.attr('title', result);
    };

    /*用户点击ctrl+z撤销上一步操作*/
    KdWtcStepConfig.prototype.backHandle = function () {
        let $this = this;
        let data = this.stack.pop();
        if (!data) return;

        switch (data.type) {
            case 'add':
                // 删除数据：
                $this.data.data.splice(data.phasePosition, 1);

                let dom_phaseRow = $('.row_' + (data.phasePosition + 1), this.dom_container)[0];
                let $dom_curItem = $(dom_phaseRow.firstElementChild);

                // 删除当前阶段：
                $dom_curItem.remove();
                // 删除空的行：
                $this.delEmptyRow(dom_phaseRow);
                // 刷新连线：
                $this.refreshLine();
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
                    var $dom_oldPhaseRow = $('.row_' + (data.oldPhasePosition), this.dom_container);
                }

                this.movePhase($dom_oldPhaseRow, dom_curItem, true);

                this.delEmptyRow(dom_curPhaseRow);  // 删除空的行，并调整className
                this.refreshLine();
                this.refreshLineEvent();
                break;
            case 'moveStep':
                var dom_curPhaseRow = $('.row_' + (data.phasePosition + 1), this.dom_container)[0];
                var dom_curStep = $('.step-item', dom_curPhaseRow)[data.stepPosition];
                var $dom_oldStepRow = $($('.step-row', dom_curPhaseRow)[data.oldStepPosition]);

                // 将两个步骤数据交换：
                let tempData = this.data.data[data.phasePosition].steps.splice(data.stepPosition, 1);
                this.data.data[data.phasePosition].steps.splice(data.oldStepPosition, 0, tempData[0]);

                if (data.oldStepPosition >= data.stepPosition) {
                    $dom_oldStepRow.after(dom_curStep.parentElement);
                } else {
                    $dom_oldStepRow.before(dom_curStep.parentElement);
                }

                this.refreshLine();
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

    /*展示新增阶段按钮*/
    KdWtcStepConfig.prototype.showAddBtn = function (target) {
        $('.add-btn', target).css('display', 'block')
    };

    /*隐藏新增阶段按钮*/
    KdWtcStepConfig.prototype.hideAddBtn = function (target) {
        $('.add-btn', target).css('display', 'none')
    };

    /*获取一个元素到目标元素的距离*/
    KdWtcStepConfig.prototype.getPosition = function (node, targetNode) {
        var left = node.offsetLeft - node.scrollLeft;
        var top = node.offsetTop - node.scrollTop;
        var parent = node.offsetParent;
        while (parent && parent !== targetNode) {
            left += parent.offsetLeft - parent.scrollLeft;
            top += parent.offsetTop - parent.scrollTop;
            parent = parent.offsetParent;
        }
        return {"left": left, "top": top};
    };

    /*判断被拖拽的元素是否允许拖拽*/
    KdWtcStepConfig.prototype.moveLegal = function (moveType, tempData, phaseIndex) {
        let index = Number.MIN_SAFE_INTEGER;
        if (moveType === 'phase') {
            for (let i = 0; i < tempData.length; i++) {
                for (let j = 0; j < tempData[i].steps.length; j++) {
                    // 判断是否是预置步骤：
                    if (tempData[i].steps[j].syspreset) {
                        let curIndex = tempData[i].steps[j].index;
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
            for (let j = 0; j < tempData[phaseIndex].steps.length; j++) {
                // 判断是否是预置步骤：
                if (tempData[phaseIndex].steps[j].syspreset) {
                    let curIndex = tempData[phaseIndex].steps[j].index * 100 + tempData[phaseIndex].steps[j].bitindex;
                    // 判断index是否是升序排列：
                    if (curIndex < index) {
                        return false;
                    } else {
                        index = curIndex;
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
        let phaseIndex = null;
        let stepIndex = null;
        let data = null;
        let type = null;
        let $target = $(target);

        if ($target.hasClass('step-item')) {  // 步骤
            let dom_stepRow = target.parentElement;
            let targetRowClass = dom_stepRow.className.split(' ')[1];
            let stepId = targetRowClass.split('-')[2];
            // 找出该步骤对应的阶段：
            let dom_phaseRow = dom_stepRow.parentElement.parentElement.parentElement;
            let phaseRowClass = dom_phaseRow.className.split(' ')[1];
            let rowNum = Number(phaseRowClass.split('_')[1]);

            for (let i = 0; i < this.data.data[rowNum - 1].steps.length; i++) {
                let objStep = this.data.data[rowNum - 1].steps[i];
                if (objStep.id == stepId) {
                    phaseIndex = rowNum - 1;
                    stepIndex = i;
                    data = objStep;
                    type = 'step';
                    break;
                }
            }
        } else {  // 阶段
            let targetRowClass = target.parentElement.className.split(' ')[1];
            phaseIndex = Number(targetRowClass.split('_')[1]) - 1;
            data = this.data.data[phaseIndex];
            type = 'phase';
        }

        return {type, phaseIndex, stepIndex, data}
    };

    window.KdWtcStepConfig = KdWtcStepConfig;
})();