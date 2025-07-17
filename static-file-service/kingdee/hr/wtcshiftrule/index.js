'use strict';

(function (KDApi, $) {
    function ShiftRule(model) {
        this._setModel(model);
    }

    // 原型中封装生命周期函数，固定格式
    ShiftRule.prototype = {
        _setModel: function _setModel(model) {
            this.model = model;
        },
        init: function init(props) {
            this.model.themeNum = props.themeNum;
            this.preCheckedCell = 0;
            // 设置主题色：
            this.model.dom.style.setProperty('--themeColor', props.themeNum);
            this.initFunc(this.model, props);
        },
        update: function update(props) {
            this.updateDom(this.model, props);
        },
        destoryed: function destoryed() {
            $(window).off('keydown.shiftRule_keydown');
            $(window).off('keyup.shiftRule_keyup');
        },

        // 加载代码
        initFunc: function initFunc(model, props) {
            var $this = this;
            KDApi.loadFile(['./css/index.css', './myTool.js'], model, function () {
                $this.myTool = new KdWtcMyTool();
            });
        },

        // 初始化dom
        updateDom: function updateDom(model, props) {
            // props.data = {
            //     event: 'init',
            //     args: {
            //         "type": 0,   //控件类型：0表示日历生成规则控件，1或者不传表示轮班规则控件
            //         "rows": 1,   // 行数
            //         "cols": 7,   // 列数（就固定传这个值就好）
            //         "startindex": 0,  // 第一个单元格索引
            //         "endindex": 4,  // 最后一个单元格索引
            //         "mode": "d",   // 显示的周还是天：w是周，d是天
            //         "lock": false,  // 是否锁定状态（查看态就是锁定的）
            //         "cells": [1, 0, 1, 1, 1],   // 单元格数据：1表示工作日，0表示休息日
            //         "selectedCells": []  // 默认选中的单元格索引（没有则传个空数组）
            //     }
            // };

            if (!props || !props.data) {
                return;
            }

            if (props.data.event === 'init') {
                this.type = props.data.args.type;

                if (props.data.args.type !== 0) {
                    //轮班规则控件
                    props.data.args.lock = props.lock;
                }
                this.localCells = props.data.args.cells;
                this.shiftInfo(model, props.data.args);
            } else if (props.data.event === 'set') {
                // 重置单元格数据（轮班规则控件专用）
                // 将单元格数据全清空：
                $('.custom-body-td', this.model.dom).each(function (index, item) {
                    var $dom_cell = $(item);
                    $dom_cell.empty();
                    $dom_cell.removeClass('custom-shift-time-overLap');
                });
                //将班次信息渲染到对应的单元格上
                var classitem = props.data.args;
                for (var _i = 0; _i < classitem.length; _i++) {
                    var index = classitem[_i].index;
                    this.classInfo(model, index, classitem[_i]);
                }
                this.localCells = props.data.args;
                // 绑定班次详情icon的事件：
                this.shiftIconHoverEvent(model);
            } else if (props.data.event === 'clear') {
                // 清空指定单元格（未用到）
                var selected = props.data.args.selected;
                if (selected && selected.length) {
                    for (var i = 0; i < selected.length; i++) {
                        var $dom_cell = $("div[index='" + selected[i] + "']", model.dom);
                        $dom_cell.html('');
                        $dom_cell.removeClass('custom-shift-time-overLap');
                        $('#inp' + selected[i], model.dom).val('');
                    }
                }
            } else if (props.data.event === 'getData') {
                // 日历生成规则控件专用
                model.invoke('getData', { data: this.localCells, opType: props.data.args });
            }
        },

        //渲染页面
        shiftInfo: function shiftInfo(model, items) {
            var $this = this;
            if (items.mode == 'd') {
                items.heads = ['1', '2', '3', '4', '5', '6', '7'];
            } else {
                items.heads = [KDApi.getLangMsg(model, 'mon'), KDApi.getLangMsg(model, 'tue'), KDApi.getLangMsg(model, 'wed'), KDApi.getLangMsg(model, 'thu'), KDApi.getLangMsg(model, 'fri'), KDApi.getLangMsg(model, 'sat'), KDApi.getLangMsg(model, 'sun')];
            }
            KDApi.getTemplateStringByFilePath('./html/index.art', model, {
                items: items,
                index: KDApi.getLangMsg(model, 'index'),
                setWorkDay: KDApi.getLangMsg(model, 'setWorkDay'),
                del: KDApi.getLangMsg(model, 'del')
            }).then(function (result) {
                model.dom.innerHTML = result;
                // 区分是不是日历生成规则控件
                if ($this.type === 0) {
                    //日历生成规则控件
                    for (var i = 0; i < items.cells.length; i++) {
                        $this.classInfo(model, i, items.cells[i]);
                    }
                } else {
                    //轮班规则控件
                    for (var _i2 = 0; _i2 < items.cells.length; _i2++) {
                        var index = items.cells[_i2].index;
                        $this.classInfo(model, index, items.cells[_i2]);
                    }
                    // 绑定班次详情icon的事件：
                    $this.shiftIconHoverEvent(model);
                }

                $this.removeBorderColor(model);

                if (!items.lock) {
                    // 添加默认选中单元格
                    for (var _i3 = 0; _i3 < items.selectedCells.length; _i3++) {
                        var $target = $($(".custom-able-td", model.dom)[_i3]);
                        $target.addClass("custom-able-border");
                    }
                    $this.initEvent(model);
                }
            });
        },

        //渲染班次信息（单元格渲染）
        classInfo: function classInfo(model, index, item) {
            // 区分是不是日历生成规则控件
            if (this.type === 0) {
                var tempStr = item === 1 ? '<div class="wtc_shiftRule-workday-wrap">' + KDApi.getLangMsg(model, 'workDay') + '</div>' : '';
                var $dom_cell = $("div[index='" + index + "']", model.dom);
                $dom_cell.html(tempStr);
            } else {
                var _$dom_cell = $("div[index='" + index + "']", model.dom);

                if (item.shiftTimeOverLap) {
                    _$dom_cell.addClass('custom-shift-time-overLap');
                } else {
                    _$dom_cell.removeClass('custom-shift-time-overLap');
                }

                _$dom_cell.html('\n                    <div class="custom-able-div">\n                        <div class="custom-box-color" style="background-color:' + item.color + '"></div>\n                        <div class="custom-number" title="' + (item.name || item.number) + '">' + (item.name || item.number) + '</div>\n                        <div class="custom-time"  title="' + item.starttime + '-' + item.endtime + '">' + item.starttime + '-' + item.endtime + '</div>\n                        ' + (item.name ? '<div class="wtc-shiftRule-more-btn kdfont kdfont-gengduo3"></div>' : '') + '\n                    </div>\n                ');
            }
        },

        //数据更新后取消边框颜色
        removeBorderColor: function removeBorderColor(model) {
            $(".custom-able-td", model.dom).removeClass("custom-able-border");
        },

        //绑定点击事件
        initEvent: function initEvent(model) {
            var $this = this;
            //是否按住ctrl键的标识
            var isCtrl = false;
            var isShift = false;

            //按住ctrl键进行多选
            $(window).on('keydown.shiftRule_keydown', function (e) {
                if (model.dom.offsetWidth > 0) {
                    if (e.ctrlKey) {
                        isCtrl = true;
                    }
                    if (e.shiftKey) {
                        isShift = true;
                    }
                }
            });

            $(window).on('keyup.shiftRule_keyup', function (e) {
                if (model.dom.offsetWidth > 0) {
                    isCtrl = false;
                    isShift = false;
                }
            });

            // 日历生成规则控件：新增工作日，删除工作日事件：
            if (this.type === 0) {
                $(".wtc_shiftRule-btn-add", model.dom).click(function (e) {
                    $this.workdayAdd(model.dom, model);
                });
                $(".wtc_shiftRule-btn-del", model.dom).click(function (e) {
                    $this.workdayDel(model.dom, model);
                });
            }

            // 单元格点击事件
            $("#custom-body-click", model.dom).click(function (e) {
                var target = e.target;
                if ($(target).parents().hasClass('custom-able-td')) {
                    target = $(target).parents('.custom-able-td');
                }
                if ($(target).hasClass('custom-able-td')) {
                    if (isCtrl) {
                        var select = [];
                        $(target).toggleClass("custom-able-border");

                        $(".custom-able-border", model.dom).each(function () {
                            select.push($(this).attr("index"));
                        });

                        // 获取最新点击的单元格的index:
                        $this.preCheckedCell = Number($(target).attr('index'));

                        if ($this.type !== 0) model.invoke("select", JSON.stringify({ selected: select }));
                    } else if (isShift) {
                        //所有清除选中：
                        $('.custom-able-border', model.dom).removeClass("custom-able-border");

                        var select = [];
                        var temp = null;
                        var perCellIndex = $this.preCheckedCell;
                        var nextCellIndex = Number($(target).attr('index'));
                        //调换位置：
                        if (perCellIndex > nextCellIndex) {
                            temp = nextCellIndex;
                            nextCellIndex = perCellIndex;
                            perCellIndex = temp;
                        }

                        for (var i = perCellIndex; i <= nextCellIndex; i++) {
                            $('.custom-able-td[index=' + i + ']', model.dom).addClass("custom-able-border");
                            select.push('' + i);
                        }
                        if ($this.type !== 0) model.invoke("select", JSON.stringify({ selected: select }));
                    } else {
                        $(".custom-able-td", model.dom).removeClass("custom-able-border");
                        $(target).addClass("custom-able-border");

                        // 获取最新点击的单元格的index:
                        $this.preCheckedCell = Number($(target).attr('index'));

                        if ($this.type !== 0) model.invoke("select", JSON.stringify({ selected: ['' + $this.preCheckedCell] }));
                    }
                }
            });
        },

        /*新增工作日（日历生成规则控件专用）*/
        workdayAdd: function workdayAdd(rootDom, model) {
            var $this = this;
            var allSet = true;
            var $dom_active = $('.custom-able-border', rootDom);

            if ($dom_active[0] === undefined) {
                // 提示未选中单元格
                model.invoke('unselected');
                return;
            }

            $dom_active.each(function (index, item) {
                if (item.innerHTML === '') allSet = false;
                item.innerHTML = '<div class="wtc_shiftRule-workday-wrap">' + KDApi.getLangMsg(model, 'workDay') + '</div>';
                var index1 = Number($(item).attr('index'));
                $this.localCells[index1] = 1;
            });

            if (allSet) model.invoke('workdaySeted');
        },

        /*删除工作日（日历生成规则控件专用）*/
        workdayDel: function workdayDel(rootDom, model) {
            var $this = this;
            var allEmpty = true;
            var $dom_active = $('.custom-able-border', rootDom);

            if ($dom_active[0] === undefined) {
                // 提示未选中单元格
                model.invoke('unselected');
                return;
            }

            $dom_active.each(function (index, item) {
                if (item.innerHTML !== '') allEmpty = false;
                item.innerHTML = '';
                var index1 = Number($(item).attr('index'));
                $this.localCells[index1] = 0;
            });

            if (allEmpty) model.invoke('delete');
        },

        /*
        * 用户滑入班次中显示更多icon时，触发
        * */
        shiftIconHoverEvent: function shiftIconHoverEvent(model) {
            var $this = this;
            $('.wtc-shiftRule-more-btn', model.dom).mouseenter(function (event) {
                $this.showShiftDetail(event, model);
            });
            $('.wtc-shiftRule-more-btn', model.dom).mouseleave(function () {
                $this.hideShiftDetail();
            });
        },

        /*显示班次详情tips*/
        showShiftDetail: function showShiftDetail(event, model) {
            var $this = this;
            $this.myTool.popover_isEnter = true;
            setTimeout(function () {
                if ($this.myTool.popover_isEnter && !document.querySelector('.wtc_kztTool_popover-wrap')) {
                    var index = $(event.target.parentElement.parentElement).attr('index');
                    var cellData = $this.getTargetCellData(index) || {};

                    var str = '<div class="wtc_workSchdule-table-right-shift-detail-wrap" style="min-width: 190px; max-width:240px;overflow: hidden;font-size: 12px;">' +
                        '<div class="wtc_workSchdule-table-right-shift-detail-title-wrap" style="padding-bottom: 5px;display: flex;color: #333;">' +
                        '<div class="wtc_workSchdule-table-right-shift-detail-number" title="' + cellData.number + '" style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;padding-right: 0px;padding-top: 4px;max-width: 80px;">' + (cellData.number || KDApi.getLangMsg(model, 'none')) + '</div>' +
                        '<div class="wtc_roster-table-right-shift-detail-line" style="padding: 4px 4px 0 4px;">|</div>'+
                        '<div class="wtc_roster-table-right-shift-detail-off" style="padding-top: 4px;flex:0;white-space: nowrap;">'+(cellData.off ? KDApi.getLangMsg($this.model, 'OFF') : KDApi.getLangMsg($this.model, 'noOFF'))+'</div>'+
                        '<div class="wtc_workSchdule-table-right-shift-detail-line" style="padding-top: 4px;">&nbsp;&nbsp;|&nbsp;&nbsp;</div>' +
                        '<div class="wtc_workSchdule-table-right-shift-detail-title" title="' + cellData.name + '" style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;padding-right: 10px;padding-top: 4px;max-width: 280px;">' + cellData.name + '</div></div>' +
                        '<ul class="wtc_workSchdule-table-shift-detail-time-list" style="color: #999;max-height: 100px;overflow-y: auto;overflow-x: hidden;">';

                    if (cellData.shiftEntryList) {
                        for (var n = 0; n < cellData.shiftEntryList.length; n++) {
                            var objShiftEntry = cellData.shiftEntryList[n];
                            var outWorkType = null;
                            switch (objShiftEntry.outWorkType) {
                                case 'W':
                                    outWorkType = KDApi.getLangMsg(model, 'work');
                                    break;
                                case 'O':
                                    outWorkType = KDApi.getLangMsg(model, 'overtime');
                                    break;
                                case 'B':
                                    outWorkType = KDApi.getLangMsg(model, 'rest');
                                    break;
                                case 'S':
                                    outWorkType = KDApi.getLangMsg(model, 'workMain');
                                    break;
                                default:
                                    outWorkType = KDApi.getLangMsg(model, 'none');
                                    break;
                            }
                            str += '\n                            <li class="wtc_roster-table-shift-detail-time-item" style="margin-bottom: 6px;white-space: nowrap;">' + outWorkType + '\uFF1A' + objShiftEntry.shiftStartDateStr + ' ~ ' + objShiftEntry.shiftEndDateStr + '\uFF08' + objShiftEntry.workTime + 'h\uFF09</li>\n                        ';
                        }
                    }

                    str += '</ul></div>';

                    $this.myTool.showPopover({
                        positionX: event.clientX,
                        positionY: event.clientY,
                        isHtml: true,
                        data: str
                    });
                }
            }, 100);
        },

        /*隐藏班次详情tips*/
        hideShiftDetail: function hideShiftDetail() {
            this.myTool.cancelPopover();
        },

        /*通过index查找到对应单元格数据*/
        getTargetCellData: function getTargetCellData(index) {
            for (var i = 0; i < this.localCells.length; i++) {
                if (this.localCells[i].index == index) {
                    return this.localCells[i];
                }
            }
        }
    };

    KDApi.register('wtcshiftrule', ShiftRule, { isMulLang: true });
})(window.KDApi, jQuery);