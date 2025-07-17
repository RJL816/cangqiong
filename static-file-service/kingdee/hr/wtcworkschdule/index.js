'use strict';

(function (KDApi, $) {
    // 构造函数，变量名随意，与最后一句代码的KDApi.register的第二个参数一致即可
    function WorkSchdule(model) {
        this._setModel(model);
    }

    // 原型中封装生命周期函数，固定格式
    WorkSchdule.prototype = {
        _setModel: function _setModel(model) {
            this.model = model;
        },

        init: function init(props) {
            var $this = this;
            this.model.themeNum = props.themeNum;
            this.preCheckedCell = 0;

            /* props.data = {
                 "args": {
                     "rows": 1,
                     "cols": 7,
                     "startindex": 1,
                     "endindex": 4,
                     "mode": "w",
                     "yearMonth": "2021-10",
                     "cells": [
                         {
                             "holidayTagList": [],
                             "shiftcolor": "",
                             "holidayTag": "",
                             "enable": 0,
                             "emodifytimestr": "",
                             "startEndTime": "",
                             "emodifierName": "",
                             "weekDay": "",
                             "shiftNumber": "",
                             "shiftName": "",
                             "workDateStr": "2021-09-30",
                             "shiftIdStr": "",
                             "day": 30,
                             "dateType": null,
                             "dateAttribute": '工作日',  // 工作日，休息日，节假日
                         }, {
                             shiftTimeOverLap: true,
                             "holidayTagList": ["重阳节重阳节重阳节重阳重阳节重阳重阳节重阳重阳节重阳", "国庆节", "中秋", "重阳节重阳重阳节重阳重阳节重阳重阳节重阳重阳节重阳重阳节重阳重阳节重阳重阳节重阳重阳节重阳重阳节重阳重阳节重阳", "国庆节", "中秋"],
                             "shiftcolor": "#ff7f00",
                             "holidayTag": "假期",
                             "ecreatorid": 13466739,
                             "enable": 1,
                             "emodifytimestr": "2021-10-12 11:06:07",
                             "startEndTime": "05:00-10:00",
                             "emodifierName": "kzt11",
                             "weekDay": "7",
                             "shiftNumber": "sdf",
                             "shiftName": "ffff",
                             "ecreatetime": "2021-10-12 11:11:41",
                             "workDateStr": "2021-09-12",
                             "holidayId": "1247076235318657024,",
                             "timezoneId": 320881823238577150,
                             "shiftIdStr": "1133121417550763008",
                             "selfSet": "0",
                             "day": 12,
                             "shiftId": 1133121417550763000,
                             "workDate": "2021-09-12 00:00:00",
                             "resolveConflict": false,
                             "dateType": null,
                             "dateAttribute": '节假日'  // 工作日，休息日，节假日
                         }, {
                             shiftTimeOverLap: true,
                             "holidayTagList": [],
                             "shiftcolor": "#ff7f00",
                             "ecreatorid": 13466739,
                             "enable": 1,
                             "emodifytimestr": "2021-10-12 11:06:07",
                             "startEndTime": "05:00-10:00",
                             "emodifierName": "kzt",
                             "weekDay": "6",
                             "shiftNumber": "sdf",
                             "shiftName": "ffaaaff",
                             "ecreatetime": "2021-10-12 11:06:07",
                             "workDateStr": "2021-10-02",
                             "timezoneId": 320881823238577150,
                             "shiftIdStr": "1133121417550763008",
                             "selfSet": "0",
                             "day": 2,
                             "shiftId": 1133121417550763000,
                             "workDate": "2021-10-02 00:00:00",
                             "resolveConflict": false,
                             "dateType": '月末周六',
                             "dateAttribute": '休息日'  // 工作日，休息日，节假日
                         }, {
                             "holidayTagList": [],
                             "shiftcolor": "",
                             "holidayTag": "",
                             "enable": 0,
                             "emodifytimestr": "",
                             "startEndTime": "",
                             "emodifierName": "",
                             "weekDay": "",
                             "shiftNumber": "",
                             "shiftName": "",
                             "workDateStr": "2021-11-03",
                             "shiftIdStr": "",
                             "day": 3,
                             "dateType": '月末周六',
                             "dateAttribute": '休息日'  // 工作日，休息日，节假日
                         }]
                 },
                 "event": "init"
             };*/

            this.initFunc(this.model, props);
        },
        update: function update(props) {
            if (props.data && props.data.event !== 'init') {
                // props.data = this.data;
                this.updateDom(this.model, props);
            }
        },
        destoryed: function destoryed() {
            $(window).off('keydown.workSchdule_keydown');
            $(window).off('keyup.workSchdule_keyup');
        },

        /*加载文件*/
        initFunc: function initFunc(model, props) {
            var $this = this;
            KDApi.loadFile(['./css/index.css', '/myTool.js'], model, function () {
                $this.updateDom(model, props);
                $this.myTool = new KdWtcMyTool();
            });
        },

        // 初始化dom
        updateDom: function updateDom(model, props) {
            var $this = this;
            var event = '';
            var items = {};
            if (props && props.data) {
                // todo 后端如果cells传空数组，就会把这个key都剔除掉，所以我们要加这步判断：
                if (props.data.args.cells === undefined) props.data.args.cells = [];
                event = props.data.event;
                items = props.data.args;
            } else {
                items.mode = 'w'; //默认为周模式
                items.rows = 0;
                items.cells = [];
                this.shiftInfo(model, items, props, function () {});
                return;
            }
            if (event === 'init') {
                this.cells = props.data.args.cells;
                this.shiftInfo(model, items, props, function () {
                    $this.removeBorderColor(model.dom);
                    if (model.themeNum) {
                        model.dom.style.setProperty('--themeColor', model.themeNum);
                    }
                });
            }

            // 刷新工作日程表事件（传所有单元格数据）
            if (event === 'set') {
                this.cells = props.data.args.cells;
                this.shiftInfo(model, items, props, function () {
                    // 清空选中的单元格：
                    model.invoke("select", JSON.stringify({ selected: [] }));
                });
            }

            // TODO 该事件没有用到
            // if ('reset' == event) {   //单个新增时覆盖
            //     if (items && items.length) {
            //         $(".custom-able-border", model.dom).each(function () {
            //             let index = $(this.parentElement).attr('index');
            //             this.classInfo(index, items[0], model.dom, props.data.args.type, model);
            //         });
            //         this.emodifierNameHoverEvent(model);
            //         // this.holidayHoverEvent(model);
            //         this.shiftIconHoverEvent(model);
            //     }
            // }
        },

        //渲染页面
        shiftInfo: function shiftInfo(model, items, props, callback) {
            var $this = this;
            if (items.mode == 'd') {
                items.heads = ['1', '2', '3', '4', '5', '6', '7'];
            } else {
                items.heads = [KDApi.getLangMsg(model, 'mon'), KDApi.getLangMsg(model, 'tue'), KDApi.getLangMsg(model, 'wed'), KDApi.getLangMsg(model, 'thu'), KDApi.getLangMsg(model, 'fri'), KDApi.getLangMsg(model, 'sat'), KDApi.getLangMsg(model, 'sun')];
            }

            KDApi.getTemplateStringByFilePath('./html/index.art', model, {
                items: items,
                index: KDApi.getLangMsg(model, 'index')
            }).then(function (result) {
                model.dom.innerHTML = result;

                for (var i = 0; i < items.cells.length; i++) {
                    $this.classInfo(i, items.cells[i], model.dom, props.data.args.type, model);
                }

                // 考勤自助日历控件部分：
                if (props.data.args.type !== undefined) {
                    $this.initCalendar(model.dom, props.data.args.type);
                } else {
                    // 考勤自助日历控件，不需要这些事件：
                    $this.emodifierNameHoverEvent(model);
                    // $this.holidayHoverEvent(model);
                    $this.shiftIconHoverEvent(model);
                }

                $this.initEvent(model, props.data.args.type);
                callback();
            });
        },

        //渲染班次信息（单元格渲染）
        classInfo: function classInfo(index, item, rootDom, type, model) {
            if (!item.emodifierName) item.emodifierName = '';
            if (!item.startEndTime) item.startEndTime = '';
            if (!item.shiftName) item.shiftName = '';

            var holidayTag = item.holidayTagList ? item.holidayTagList : [];
            // holidayTag = ['元旦节','重阳节重阳','国庆节国情','中秋节']
            var holidayTagDiv = '';
            if (holidayTag.length > 0) {
                if (holidayTag.length > 3) {
                    for (var i = 0; i < 3; i++) {
                        holidayTagDiv += '<span class="custom-holiday-style" title=' + holidayTag[i] + '>' + holidayTag[i] + '</span>';
                    }
                    holidayTagDiv += '<span class="custom-holiday-ellipsis" holiday_ellipsis= ' + holidayTag + '>...</span>';
                } else {
                    for (var i = 0; i < holidayTag.length; i++) {
                        holidayTagDiv += '<span class="custom-holiday-style" title=' + holidayTag[i] + '>' + holidayTag[i] + '</span>';
                    }
                }
            }

            var editContent = "";
            if (item.emodifierName) {
                editContent = {
                    emodifierName: item.emodifierName,
                    emodifytimestr: item.emodifytimestr
                };
                editContent = JSON.stringify(editContent);
            }

            var className = item.enable ? 'custom-able-div' : 'custom-disable-div';
            if (item.dateAttribute === KDApi.getLangMsg(model, 'restDay')) {
                className += ' custom-rest-day-div'; // 工作日，休息日，节假日
            } else if (item.dateAttribute === KDApi.getLangMsg(model, 'holiday')) {
                className += ' custom-holiday-day-div'; // 工作日，休息日，节假日
            }

            // 判断是否时段重叠
            if (item.shiftTimeOverLap === true) {
                className += ' custom-shift-time-overLap';
                // if((itemPrev && itemPrev.shiftTimeOverLap) && (itemNext && itemNext.shiftTimeOverLap)) {
                //     className += ' custom-shift-time-overLap custom-shift-time-overLap-next';
                // } else if((itemPrev && itemPrev.shiftTimeOverLap) && (itemNext && !itemNext.shiftTimeOverLap)) {
                //     className += ' custom-shift-time-overLap-next';
                // } else if((itemPrev && !itemPrev.shiftTimeOverLap) && (itemNext && itemNext.shiftTimeOverLap)) {
                //     className += ' custom-shift-time-overLap';
                // }
            }

            var color = type === undefined ? null : item.workStatus === 'b' ? 'red' : '#5582F3';

            // todo item.weekDay目前只有考勤自助日历用到
            $("div[index='" + index + "']", rootDom).html('\n            <div class="' + className + '">\n                <div class="custom-top-part">\n                    <div class="custom-workDateStr" style=' + (item.weekDay === 'a' ? "color:#fff;background:#5582F3;" : "''") + ' workDateStr="' + item.workDateStr + '" workStatus="' + item.workStatus + '">' + item.day + '</div>\n                    <div class="custom-holidayTag">' + holidayTagDiv + '</div>\n                    ' + (item.enable ? '<div class="wtc-workSchdule-more-btn kdfont kdfont-gengduo3"></div>' : '') + '\n                </div>\n                <div class="custom-center-part ' + (item.off && !item.startEndTime ? 'custom-center-part-off' : '') + '">\n                    <div class="custom-shiftNumber" title="' + item.shiftName + '">' + item.shiftName + '</div>\n                    <div class="custom-startEndTime" title="' + item.startEndTime + '">' + item.startEndTime + '</div>\n                </div>\n                <div class="custom-editusername">\n                    <div style="color: ' + color + ';" class="custom-emodifierName" editContent=\'' + editContent + '\'>' + item.emodifierName + '</div>\n                </div>\n            </div>\n        ');
        },

        //绑定事件
        initEvent: function initEvent(model, type) {
            var $this = this;
            //是否按住ctrl键的标识
            var isCtrl = false;
            var isShift = false;
            //按住ctrl键进行多选
            $(window).on('keydown.workSchdule_keydown', function (e) {
                if (model.dom.offsetWidth > 0) {
                    if (e.ctrlKey) {
                        isCtrl = true;
                    }
                    if (e.shiftKey) {
                        isShift = true;
                    }
                }
            });
            $(window).on('keyup.workSchdule_keyup', function (e) {
                if (model.dom.offsetWidth > 0) {
                    isCtrl = false;
                    isShift = false;
                }
            });

            $("#custom-body-click", model.dom).click(function (e) {
                var target = e.target;
                if ($(target).parents().hasClass('custom-able-div')) {
                    target = $(target).parents('.custom-able-div');
                }

                if ($(target).hasClass('custom-able-div')) {
                    if (isCtrl) {
                        var select = [];
                        $(target).toggleClass("custom-able-border");

                        $("#custom-body-click", model.dom).find(".custom-able-border").each(function () {
                            var workDateStr = $(this).children().find(".custom-workDateStr").attr('workDateStr');
                            select.push(workDateStr);
                        });

                        // 获取最新点击的单元格的index:
                        $this.preCheckedCell = Number($(target).parents().attr('index'));

                        model.invoke("select", JSON.stringify({ selected: select }));
                    } else if (isShift) {
                        $(".custom-able-border", model.dom).removeClass("custom-able-border");

                        var select = [];
                        var temp = null;
                        var perCellIndex = $this.preCheckedCell;
                        var nextCellIndex = Number($(target).parents().attr('index'));
                        //调换位置：
                        if (perCellIndex > nextCellIndex) {
                            temp = nextCellIndex;
                            nextCellIndex = perCellIndex;
                            perCellIndex = temp;
                        }

                        for (var i = perCellIndex; i <= nextCellIndex; i++) {
                            var $dom_cell = $('.custom-able-td[index=' + i + ']', model.dom);
                            $('.custom-able-div', $dom_cell).addClass("custom-able-border");
                            var workDateStr = $(".custom-workDateStr", $dom_cell).attr('workDateStr');
                            select.push(workDateStr);
                        }

                        model.invoke("select", JSON.stringify({ selected: select }));
                    } else {
                        $(".custom-able-td", model.dom).find('.custom-able-div').removeClass("custom-able-border");
                        var workDateStr = $(target).children().find(".custom-workDateStr").attr('workDateStr');
                        $(target).addClass("custom-able-border");

                        // 获取最新点击的单元格的index:
                        $this.preCheckedCell = Number($(target).parents().attr('index'));

                        if (type !== undefined) {
                            // 考勤自助日历控件
                            var workStatus = $(target).children().find(".custom-workDateStr").attr('workStatus');
                            model.invoke("select", JSON.stringify({ selected: [workDateStr], workStatus: workStatus }));
                        } else {
                            model.invoke("select", JSON.stringify({ selected: [workDateStr] }));
                        }
                    }
                }
            });
        },

        //修改人鼠标悬浮事件
        emodifierNameHoverEvent: function emodifierNameHoverEvent(model) {
            var $this = this;
            $('.custom-emodifierName', model.dom).mouseenter(function (e) {
                $this.showModifierName(e, model);
            });
            $('.custom-emodifierName', model.dom).mouseleave(function () {
                $this.hideModifierName();
            });
        },

        /*显示修改人tips*/
        showModifierName: function showModifierName(e, model) {
            var top = $(e.target).offset().top - 20;
            var left = $(e.target).offset().left + $(e.target).width() + 10;
            var editContent = $(e.target).attr('editContent');
            if (editContent) {
                editContent = JSON.parse(editContent);
                $('body').append('\n                    <div class="custom-workschdule-tips" id="custom-workschdule-tips">\n                        <div class="custom-workschdule-arrow"></div>\n                        <div class="custom-workschdule-tips-title">' + KDApi.getLangMsg(model, 'modifiedRecord') + '</div>\n                        <div class="custom-workschdule-tips-edituser">' + KDApi.getLangMsg(model, 'lastModifiedBy') + ': ' + editContent.emodifierName + '</div>\n                        <div class="custom-workschdule-tips-edittime">' + KDApi.getLangMsg(model, 'lastModifiedTime') + ': ' + editContent.emodifytimestr + '</div>\n                    </div>\n                ');

                $('#custom-workschdule-tips').css('top', top + 'px');
                $('#custom-workschdule-tips').css('left', left + 'px');
            }
        },


        /*隐藏修改人tips*/
        hideModifierName: function hideModifierName() {
            $('body').find('#custom-workschdule-tips').remove();
        },


        //节假日标签鼠标悬浮事件
        /*holidayHoverEvent: function (model) {
            let $this = this;
            $('.custom-holiday-ellipsis', model.dom).mouseenter(function (e) {
                $this.showHoliday(e);
            });
            $('.custom-holiday-ellipsis', model.dom).mouseleave(function () {
                $this.hideHoliday();
            });
        },
        showHoliday(e) {
            var top = $(e.target).offset().top + 26;
            var left = $(e.target).offset().left - 10;
            var holiday_ellipsis = $(e.target).attr('holiday_ellipsis').split(',');
            var holidayDom = '';
            for (var i = 0; i < holiday_ellipsis.length; i++) {
                holidayDom += '<div class="custom-holiday-all">' + holiday_ellipsis[i] + '</div>'
            }
            $('body').append(
                '<div class="custom-holiday-tips" id="custom-holiday-tips">' +
                '<div class="custom-holiday-arrow"></div>' +
                '<div class="custom-holiday-content"></div>' +
                '</div>'
            );
              $('#custom-holiday-tips').css('top', top + 'px');
            $('#custom-holiday-tips').css('left', left + 'px');
            $('#custom-holiday-tips').find('.custom-holiday-content').html(holidayDom);
        },
        hideHoliday() {
            $('#custom-holiday-tips').remove();
        },*/

        /*
        * 用户滑入班次中显示更多icon时，触发
        * */
        shiftIconHoverEvent: function shiftIconHoverEvent(model) {
            var $this = this;
            $('.wtc-workSchdule-more-btn', model.dom).mouseenter(function (event) {
                $this.showShiftDetail(event, model);
            });
            $('.wtc-workSchdule-more-btn', model.dom).mouseleave(function () {
                $this.hideShiftDetail();
            });
        },

        /*显示班次详情tips*/
        showShiftDetail: function showShiftDetail(event, model) {
            var $this = this;
            $this.myTool.popover_isEnter = true;

            setTimeout(function () {
                if ($this.myTool.popover_isEnter && !document.querySelector('.wtc_kztTool_popover-wrap')) {
                    var index = $(event.target.parentElement.parentElement.parentElement).attr('index');
                    var $dom_cell = $(event.target.parentElement.parentElement);
                    var timeOverLap = $dom_cell.hasClass('custom-shift-time-overLap') || $dom_cell.hasClass('custom-shift-time-overLap-next');
                    var str = '<div class="wtc_workSchdule-table-right-shift-detail-wrap" style="min-width: 190px; max-width:240px;overflow: hidden;font-size: 12px;">'
                    +'<div class="wtc_roster-table-right-shift-detail-title-wrap" style="padding-bottom: 5px;display: flex;color: #333;">'
                               +'<div class="wtc_roster-table-right-shift-detail-number" title="'+$this.cells[index].shiftNumber+'" style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;padding-right: 0px;padding-top: 4px;max-width: 80px;">'+($this.cells[index].shiftNumber || KDApi.getLangMsg($this.model, 'none'))+'</div>'
                                +'<div class="wtc_roster-table-right-shift-detail-line" style="padding: 4px 4px 0 4px;">|</div>'
                                +'<div class="wtc_roster-table-right-shift-detail-off" style="padding-top: 4px;flex:0;white-space: nowrap;">'+($this.cells[index].off ? KDApi.getLangMsg($this.model, 'OFF') : KDApi.getLangMsg($this.model, 'noOFF'))+'</div>'
                                +'<div class="wtc_roster-table-right-shift-detail-line" style="padding: 4px 4px 0 4px;">|</div>'
                                +'<div class="wtc_roster-table-right-shift-detail-title" title="'+$this.cells[index].shiftName+'" style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;padding-right: 10px;padding-top: 4px;max-width: 280px;">'+$this.cells[index].shiftName+'</div></div>'
                        +'<div class="wtc_workSchdule-table-right-shift-detail-second" style="padding: 10px 0;color: #666;">'
                        +'<p style="height: 12px;line-height:14px;display: inline-block;border-right: 1px solid #999;padding-right: 4px;">' + $this.cells[index].dateAttribute + '</p>'
                        +'<p style="height: 12px;line-height:14px;display: inline-block;padding-left: 4px;">' + ($this.cells[index].dateType || KDApi.getLangMsg(model, 'none')) + '</p>'
                        +'</div><ul class="wtc_workSchdule-table-shift-detail-time-list" style="padding-bottom: 14px;color: #999;max-height: 100px;overflow-y: auto;overflow-x: hidden;">';
                    if ($this.cells[index].shiftEntryList) {
                        for (var n = 0; n < $this.cells[index].shiftEntryList.length; n++) {
                            var objShiftEntry = $this.cells[index].shiftEntryList[n];
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
                            str += '<li class="wtc_roster-table-shift-detail-time-item" style="margin-bottom: 6px;white-space: nowrap;">' + outWorkType + ': ' + objShiftEntry.shiftStartDateStr + ' ~ ' + objShiftEntry.shiftEndDateStr + '\uFF08' + objShiftEntry.workTime + 'h\uFF09</li>';
                        }
                    }

                    str += '</ul>';

                    if ($this.cells[index].holidayTagList) {
                        for (var _n = 0; _n < $this.cells[index].holidayTagList.length; _n++) {
                            str += '\n                            <div class="wtc_roster-table-shift-detail-holiday" style="display:inline-block;max-width: 220px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;padding: 0 4px;border-radius: 10px;border:1px solid rgb(2, 167, 240); color:rgb(2, 167, 240); margin-bottom: 4px;">' + $this.cells[index].holidayTagList[_n] + '</div>\n                        ';
                        }
                    }

                    if (timeOverLap) {
                        str += '<div style="color:#F59A23;">' + KDApi.getLangMsg(model, 'msg1') + '</div>';
                    }

                    str += '</div>';

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

        //数据更新后取消边框颜色
        initCalendar: function initCalendar(rootDom, type) {
            // 隐藏序号列：
            $('.custom-header-order', rootDom).css('display', 'none');
            $('.custom-body-order', rootDom).css('display', 'none');
            // 隐藏班次序号：
            $('.custom-shiftNumber', rootDom).css('display', 'none');

            // 判断是员工还是经理人：
            if (type === 'a') {
                $('.custom-startEndTime', rootDom).css('display', 'none');
            } else {
                // 经理人
                $('.custom-startEndTime', rootDom).css('width', '90%');
            }
        },

        //数据更新后取消边框颜色
        removeBorderColor: function removeBorderColor(rootDom) {
            $(".custom-able-td", rootDom).removeClass("custom-able-border");
        }
    };

    KDApi.register('wtcworkschdule', WorkSchdule, { isMulLang: true });
})(window.KDApi, jQuery);