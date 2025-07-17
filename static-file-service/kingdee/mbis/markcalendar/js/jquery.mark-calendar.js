/**
 * MarkCalendar
 * @description 用于日期标记
 *     提供 $.markCalendar 用于初始化Dom
 *     提供 $.markMonthDay 用于标记天
 *     提供 $.changeMonthRange 用于调整可选日期范围
 * @author rd_oliver_liping
 */

(function ($) {

    var markCalendar = function (options, object) {
        var nowDate = new Date();
        var calendar = {
            // 初始化参数
            instance: object,
            settings: $.extend({
                // 标记日 {function}
                markDays: null
            }, $.fn.markCalendar.ZH, options),

            // 当前翻页所在年月
            dDay: nowDate.getDate(),
            dMonth: nowDate.getMonth(),
            dYear: nowDate.getFullYear(),

            dMinYear: 0,
            dMaxYear: 0,
            dMinMonth: 0,
            dMaxMonth: 0,

            currentYearMinMonth: 0,
            currentYearMaxMonth: 0,

            oldYear: nowDate.getFullYear(),
            oldMonth: nowDate.getMonth(),


            toggleSelector: function () {
                var hidden = calendar.instance.find('.c-selector').css('display') == 'none';

                calendar.instance.find('.c-selector').slideToggle();
                calendar.instance.find('.c-body').slideToggle();

                // 隐藏的要滚到当前选中年、月
                if (hidden) {
                    calendar.instance.find('.c-selector-year').scrollTop(30 * (calendar.dYear - calendar.dMinYear));
                    calendar.instance.find('.c-selector-month').scrollTop(30 * (calendar.dMonth - calendar.dMinMonth));
                }
            },

            /**
             * 后一月
             */
            nextMonth: function () {
                if (calendar.dYear == calendar.dMaxYear) {
                    // 在最大值的边界上，看能不能再往后了
                    if (calendar.dMonth >= calendar.dMaxMonth) {
                        return;
                    }
                }

                if (calendar.dMonth < 11) {
                    calendar.dMonth++;
                } else {
                    calendar.dMonth = 0;
                    calendar.dYear++;
                }
                calendar.changeMonth(calendar.dYear, calendar.dMonth);
            },

            /**
             * 前一月
             */
            previousMonth: function () {
                if (calendar.dYear == calendar.dMinYear) {
                    // 在最小值的边界上，看能不能再往前了
                    if (calendar.dMonth <= calendar.dMinMonth) {
                        return;
                    }
                }

                if (calendar.dMonth > 0) {
                    calendar.dMonth--;
                } else {
                    calendar.dMonth = 11;
                    calendar.dYear--;
                }
                calendar.changeMonth(calendar.dYear, calendar.dMonth);
            },

            /**
             * 选择年
             */
            chooseYear: function (event) {
                calendar.dYear = $(event.target).html();

                calendar.setCurrentYearThresholdMonth();

                var cSelectorMonth = calendar.buildMonthSelector(calendar.dMonth, calendar.currentYearMinMonth, calendar.currentYearMaxMonth);
                cSelectorMonth.replaceAll(calendar.instance.find('.c-selector-month'));

                calendar.changeMonth(calendar.dYear, calendar.dMonth);
            },

            /**
             * 选择月
             */
            chooseMonth: function (event) {
                var selectMonth = $(event.target).html();
                calendar.dMonth = calendar.settings.months.indexOf(selectMonth);
                calendar.changeMonth(calendar.dYear, calendar.dMonth);
            },

            /**
             * 翻日历
             * @param {int} year 当前年
             * @param {int} month 当前月0-11
             */
            changeMonth: function (year, month) {

                if (calendar.oldYear != year) {
                    calendar.oldYear = year;
                    calendar.instance.find('.c-selector-year>.c-selector-item').removeClass('c-selector-selected');
                    calendar.instance.find('.c-selector-year-' + year).addClass('c-selector-selected');
                    calendar.instance.find('.c-year').html(year + calendar.settings.year);
                }

                if (calendar.oldMonth != month) {
                    calendar.oldMonth = month;
                    calendar.instance.find('.c-selector-month>.c-selector-item').removeClass('c-selector-selected');
                    calendar.instance.find('.c-selector-month-' + month).addClass('c-selector-selected');
                    calendar.instance.find('.c-month').html(calendar.settings.months[month]);
                }

                // calendar.dYear = year;
                // calendar.dMonth = month;

                var cCalendar = calendar.buildCalendar(year, month);

                calendar.instance.find('.c-selector').hide();
                cCalendar.replaceAll(calendar.instance.find('.c-body'));

                // 更改年月之后向后台请求当前年月的标记日
                calendar.markDays(calendar.dYear, calendar.dMonth);
            },

            /**
             * 标记当前聚焦年月的标记日
             * @param {int} year 当前聚焦年
             * @param {int} month 当前聚焦月
             */
            markDays: function (year, month) {
                if (typeof (calendar.settings.markDays) === 'function') {
                    calendar.settings.markDays(year, month);
                }
            },

            /**
             * 初始化Calendar
             */
            initCalendar: function () {

                var minDate = calendar.settings.minDate == null ? $.fn.markCalendar.minDate : calendar.settings.minDate;
                var maxDate = calendar.settings.maxDate == null ? $.fn.markCalendar.maxDate : calendar.settings.maxDate;

                calendar.dMinYear = minDate.getFullYear();
                calendar.dMaxYear = maxDate.getFullYear();

                calendar.dMinMonth = minDate.getMonth();
                calendar.dMaxMonth = maxDate.getMonth();

                // 今年比起始年小，聚焦到最小年月
                if (this.dYear < this.dMinYear) {
                    this.dYear = this.dMinYear;
                    this.dMonth = this.dMinMonth;
                    this.dDay = 1;
                }

                // 今年比起始年大，聚焦到最大年月
                if (this.dYear > this.dMaxYear) {
                    this.dYear = this.dMaxYear;
                    this.dMonth = this.dMaxMonth;
                    this.dDay = 1;
                }

                calendar.setCurrentYearThresholdMonth();

                var cContainer = $('<div/>').addClass('c-container');
                var cToolbar = this.buildToolBar();
                var cCalendar = this.buildCalendar();
                var cSelector = this.buildSelector();

                cContainer.append(cToolbar).append(cSelector).append(cCalendar);

                $(calendar.instance).addClass('calendar');
                $(calendar.instance).html(cContainer);

                // 初始化之后向后台请求当前年月的标记日
                calendar.markDays(calendar.dYear, calendar.dMonth);
            },

            /**
             * 设置当前年的月份边界值
             */
            setCurrentYearThresholdMonth: function () {
                if (calendar.dYear == calendar.dMinYear) {
                    calendar.currentYearMinMonth = calendar.dMinMonth;
                } else {
                    calendar.currentYearMinMonth = 0;
                }

                if (calendar.dYear == calendar.dMaxYear) {
                    calendar.currentYearMaxMonth = calendar.dMaxMonth;
                } else {
                    calendar.currentYearMaxMonth = 11;
                }
            },

            /**
             * 构建工具栏
             */
            buildToolBar: function (year, month) {
                if (year == undefined || month == undefined) {
                    year = calendar.dYear;
                    month = calendar.dMonth;
                }
                // 顶部工具条
                var cToolBar = $('<div/>').addClass('c-toolbar').addClass('theme-bg');
                var cPrevious = $('<div/>').addClass('c-previous c-toolbar-font kdfont kdfont-qianfan');
                var cNext = $('<div/>').addClass('c-next c-toolbar-font kdfont kdfont-houfan');
                // 月份
                var cMonthContainer = $('<div/>').addClass('c-month-container c-toolbar-font');
                var cYear = $('<div/>').addClass('c-year c-toolbar-font');
                var cMonth = $('<div/>').addClass('c-month c-toolbar-font');

                // 填充年月
                cYear.append(year + calendar.settings.year);
                cMonth.append(calendar.settings.months[month]);

                // 填充年月容器
                // < yyyy年 MM月 >
                cMonthContainer.append(cYear).append('&nbsp;').append(cMonth);

                // 注册翻页事件
                cMonthContainer.on('click', this.toggleSelector);
                cPrevious.on('click', this.previousMonth);
                cNext.on('click', this.nextMonth);

                // 填充顶部工具栏
                // < yyyy年 MM月 >
                cToolBar.append(cPrevious);
                cToolBar.append(cMonthContainer);
                cToolBar.append(cNext);

                return cToolBar;
            },

            /**
             * 构建日历
             */
            buildCalendar: function (year, month) {
                if (year == undefined || month == undefined) {
                    year = calendar.dYear;
                    month = calendar.dMonth;
                }

                // 这个月1号是星期几
                var dWeekDayOfMonthStart = new Date(year, month, 1).getDay();
                // 0为周日，上个月还有6天要显示，其余星期前面还要显示-1天
                dWeekDayOfMonthStart = dWeekDayOfMonthStart > 0 ? dWeekDayOfMonthStart - 1 : 6;

                // 这个月的最后一天
                var dLastDayOfMonth = new Date(year, month + 1, 0).getDate();
                // 上个月的最后一天
                var dLastDayOfPreviousMonth = new Date(year, month, 0).getDate() - dWeekDayOfMonthStart + 1;

                // 日历
                var cBody = $('<div/>').addClass('c-body');
                // 星期
                var cWeek = $('<div/>').addClass('c-week');
                // 日
                var cDay = $('<div/>').addClass('c-month-day');

                // 填充星期
                for (var i = 0; i < calendar.settings.weekDays.length; i++) {
                    var cWeekDayContainer = $('<div/>').addClass('c-week-day');
                    cWeek.append(cWeekDayContainer.html(calendar.settings.weekDays[i]));
                }

                // 填充日
                var nowDate = new Date();
                var day = 1;
                var dayOfNextMonth = 1;
                var indexDay = 0;
                // 每页显示42天，当月天数+前后几天
                for (var i = 0; i < 42; i++) {
                    var cDayContainer = $('<div/>');
                    if (i < dWeekDayOfMonthStart) {
                        // 上个月的后几天
                        cDayContainer.addClass('c-day c-day-previous-month');
                        // 点击可翻至上一页
                        cDayContainer.on('click', calendar.previousMonth);
                        indexDay = dLastDayOfPreviousMonth++;
                    } else if (day <= dLastDayOfMonth) {
                        // 当月
                        cDayContainer.addClass('c-day').addClass('c-day-' + day);
                        if (nowDate.getDate() == day && nowDate.getMonth() == calendar.dMonth && nowDate.getFullYear() == calendar.dYear) {
                            cDayContainer.addClass('c-today');
                        }

                        indexDay = day++;
                    } else {
                        // 下个月的前几天
                        cDayContainer.addClass('c-day c-day-next-month');
                        // 点击可翻至下一页
                        cDayContainer.on('click', calendar.nextMonth);
                        indexDay = dayOfNextMonth++;
                    }
                    cDay.append(cDayContainer.html(indexDay));
                }

                cBody.append(cWeek);
                cBody.append(cDay);

                return cBody;
            },

            /**
             * 构建年月选择器
             */
            buildSelector: function (year, month, minYear, maxYear, minMonth, maxMonth) {
                
                var cSelector = $('<div/>').addClass('c-selector').css('display', 'none');

                // 年
                var cSelectorYear = calendar.buildYearSelector(year, minYear, maxYear);

                // 分割
                var cSelectorSplit = $('<div/>').addClass('c-selector-split');

                // 月
                var cSelectorMonth = calendar.buildMonthSelector(month, minMonth, maxMonth);

                cSelector.append(cSelectorYear).append(cSelectorSplit).append(cSelectorMonth);

                return cSelector;
            },

            /**
             * 构建年份选择器
             * @param {int} year 当前月
             * @param {int} minYear 最小年
             * @param {int} maxYear 最大年
             */
            buildYearSelector: function (year, minYear, maxYear) {
                if (minYear == undefined || maxYear == undefined) {
                    minYear = calendar.dMinYear;
                    maxYear = calendar.dMaxYear;
                }

                if (year == undefined) {
                    year = calendar.dYear;
                }

                var cSelectorYear = $('<div/>').addClass('c-selector-year');
                for (var startYear = minYear; startYear <= maxYear; startYear++) {
                    var item = $('<div/>').addClass('c-selector-item').addClass('c-selector-year-' + startYear).html(startYear);
                    if (startYear == year) {
                        item.addClass('c-selector-selected');
                    }
                    item.on('click', calendar.chooseYear);
                    cSelectorYear.append(item);
                }

                return cSelectorYear;
            },

            /**
             * 构建月份选择器
             * @param {int} month 当前月
             * @param {int} minMonth 当前选择年的最小月
             * @param {int} maxMonth 当前选择年的最大月
             */
            buildMonthSelector: function (month, minMonth, maxMonth) {
                if (minMonth == undefined || maxMonth == undefined) {
                    minMonth = calendar.currentYearMinMonth;
                    maxMonth = calendar.currentYearMaxMonth;
                }

                if (month == undefined) {
                    month = calendar.dMonth;
                }

                // 月
                var cSelectorMonth = $('<div/>').addClass('c-selector-month');
                for (var startMonth = minMonth; startMonth <= maxMonth; startMonth++) {
                    var item = $('<div/>').addClass('c-selector-item').addClass('c-selector-month-' + startMonth).html(calendar.settings.months[startMonth])
                    if (startMonth == month) {
                        item.addClass('c-selector-selected');
                    }
                    item.on('click', calendar.chooseMonth);
                    cSelectorMonth.append(item);
                }

                return cSelectorMonth;
            },

            /**
             * 改变日历可显示的最小日期和最大日期
             * @param {Date} minDate 最小日期（年月）
             * @param {Date} maxDate 最大日期（年月）
             */
            changeMonthRange: function (minDate, maxDate) {
                calendar.dMinYear = minDate.getFullYear();
                calendar.dMaxYear = maxDate.getFullYear();

                calendar.dMinMonth = minDate.getMonth();
                calendar.dMaxMonth = maxDate.getMonth();

                if (calendar.dYear < calendar.dMinYear || calendar.dYear > calendar.dMaxYear
                    || calendar.dMonth < calendar.dMinMonth || calendar.dMonth > calendar.dMaxMonth) {
                    // 当前日期不在范围内，需要重定向到边界最小
                
                    calendar.dYear = calendar.dMinYear;
                    calendar.dMonth = calendar.dMinMonth;
                    calendar.dDay = 1;

                    calendar.setCurrentYearThresholdMonth();
                    
                    calendar.changeMonth(calendar.dYear, calendar.dMonth);
                }

                var cSelector = calendar.buildSelector();
                
                cSelector.replaceAll(calendar.instance.find('.c-selector'));
                calendar.instance.find('.c-body').show();
            },

            /**
             * 标记日期
             * @param {object} days 要标记的日期
             */
            markMonthDay: function (days) {
                calendar.instance.find('.c-day').removeClass('c-day-mark theme-bg');

                var markElClass = "";
                for (var i = 0; i < days.length; i++) {
                    markElClass += '.c-day-' + days[i];
                    if (i != days.length - 1) {
                        markElClass += ',';
                    }
                }
                calendar.instance.find(markElClass).addClass('c-day-mark theme-bg');
            },
        };
        
        calendar.initCalendar();

        console.log('object', object)
        object[0].markMonthDay = calendar.markMonthDay;
        object[0].changeMonthRange = calendar.changeMonthRange;

        return calendar;
    }

    /**
     * 注册eCalendar到jQuery
     * @param {Object} initArgs 
     */
    $.fn.markCalendar = function (initArgs) {
        return this.each(function () {
            return markCalendar(initArgs, $(this));
        });
    };

    /**
     * 注册markMonthDay到jQuery
     * @param {Array<Integer>} days 标记的天
     */
    $.fn.markMonthDay = function (days) {
        // 因为是暴露在dom上的接口，所以在调用的时候必须确保dom对象唯一
        // 否则jQ选择器会把所有匹配的节点都执行一遍
        return this.each(function () {
            this.markMonthDay(days);
        });
    };

    /**
     * 注册changeMonthRange到jQuery
     * @param {Date} minDate 最小日期（年月）
     * @param {Date} maxDate 最大日期（年月）
     */
    $.fn.changeMonthRange = function (minDate, maxDate) {
        return this.each(function () {
            this.changeMonthRange(minDate, maxDate);
        });
    };

    // 简体中文
    $.fn.markCalendar.ZH = {
        weekDays: ['一', '二', '三', '四', '五', '六', '日'],
        months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        year: '年',
        events: [

        ]
    };

    // English
    $.fn.markCalendar.EN = {
        weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        year: '',
        events: [

        ]
    };

    $.fn.markCalendar.minDate = new Date(1900, 0, 1); // 最小1900-1-1
    $.fn.markCalendar.maxDate = new Date(2999, 11, 31); // 最大2999-12-31

}(jQuery));