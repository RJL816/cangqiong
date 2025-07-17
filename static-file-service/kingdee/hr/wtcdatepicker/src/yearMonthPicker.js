(function () {
    function YearMonthPicker(KDApi, model) {
        // 多语言文本
        this.lang_year = KDApi.getLangMsg(model, 'year');
        this.lang_January = KDApi.getLangMsg(model, 'January');
        this.lang_February = KDApi.getLangMsg(model, 'February');
        this.lang_March = KDApi.getLangMsg(model, 'March');
        this.lang_April = KDApi.getLangMsg(model, 'April');
        this.lang_May = KDApi.getLangMsg(model, 'May');
        this.lang_June = KDApi.getLangMsg(model, 'June');
        this.lang_July = KDApi.getLangMsg(model, 'July');
        this.lang_August = KDApi.getLangMsg(model, 'August');
        this.lang_September = KDApi.getLangMsg(model, 'September');
        this.lang_October = KDApi.getLangMsg(model, 'October');
        this.lang_November = KDApi.getLangMsg(model, 'November');
        this.lang_December = KDApi.getLangMsg(model, 'December');
    }

    /*用户点击年份，加载年份面板dom*/
    YearMonthPicker.prototype.yearPicker = function (year, $parentEle, callback) {
        let $this = this;
        // 如果已经存在则直接显示：
        var $dom_yearWrap = $('.wtc_datepicker-year-wrap', $parentEle);
        if($dom_yearWrap[0]) {
            $dom_yearWrap.css('display', 'block');
            init(year, $this);
            return;
        }

        let str = '';
        str += `
            <div class="wtc_datepicker-year-wrap">
                <div class="wtc_datepicker-year-title">
                    <div class="wtc_datepicker-year-btn-left el-icon-d-arrow-left"></div>
                    <div class="wtc_datepicker-year-text"></div>
                    <div class="wtc_datepicker-year-btn-right el-icon-d-arrow-right"></div>
                </div>
                <div class="wtc_datepicker-year-list"></div>
            </div>
        `;

        $parentEle.append(str);

        $dom_yearWrap = $('.wtc_datepicker-year-wrap', $parentEle);
        var $dom_leftBtn = $('.wtc_datepicker-year-btn-left', $parentEle);
        var $dom_rightBtn = $('.wtc_datepicker-year-btn-right', $parentEle);

        init(year, $this);

        $dom_leftBtn.on('click', function () {
            init(year-=15, $this)
        });
        $dom_rightBtn.on('click', function () {
            init(year+=15, $this)
        });

        function init(checkedYear, $this) {
            let str = '';
            let arrYear = [];
            var $dom_yearText = $('.wtc_datepicker-year-text', $parentEle);
            var $dom_yearList = $('.wtc_datepicker-year-list', $parentEle);

            for(let i = checkedYear-7; i <= checkedYear+7; i++) {
                arrYear.push(i);
            }
            for(let i =0; i < arrYear.length; i++) {
                if(i === 7) {
                    str += `<div class="wtc_datepicker-year-item wtc_datepicker-year-item-active">${arrYear[i]}</div>`;
                } else {
                    str += `<div class="wtc_datepicker-year-item">${arrYear[i]}</div>`;
                }
            }

            $dom_yearText.html(`${checkedYear-7}-${checkedYear+7} ${$this.lang_year}`);
            $dom_yearList.html(str);

            var $dom_yearItem = $('.wtc_datepicker-year-item', $parentEle);
            $dom_yearItem.on('click', function () {
                $dom_yearWrap.css('display', 'none');
                callback( parseInt(this.innerHTML));
            });
        }
    };

    /*用户点击月份，加载月份面板dom*/
    YearMonthPicker.prototype.monthPicker = function (year, month, $parentEle, callback) {
        // 如果已经存在则直接显示：
        var $dom_monthWrap = $('.wtc_datepicker-month-wrap', $parentEle);
        if($dom_monthWrap[0]) {
            $('.wtc_datepicker-month-item', $parentEle).removeClass('wtc_datepicker-month-item-active');
            $(`.wtc_datepicker-month-item[month=${month}]`, $parentEle).addClass('wtc_datepicker-month-item-active');
            $dom_monthWrap.css('display', 'block');
            $('.wtc_datepicker-month-item', $parentEle).removeClass('wtc_datepicker-month-item-active');
            $(`.wtc_datepicker-month-item[month=${month}]`, $parentEle).addClass('wtc_datepicker-month-item-active');
            $('.wtc_datepicker-month-text', $parentEle).html(year + ' ' + this.lang_year);
            return;
        }

        let $this = this;
        let str = '';
        str += `
            <div class="wtc_datepicker-month-wrap">
                <div class="wtc_datepicker-month-title">
                    <div class="wtc_datepicker-month-btn-left el-icon-d-arrow-left"></div>
                    <div class="wtc_datepicker-month-text">${year} ${this.lang_year}</div>
                    <div class="wtc_datepicker-month-btn-right el-icon-d-arrow-right"></div>
                </div>
                <div class="wtc_datepicker-month-list">
                    <div class="wtc_datepicker-month-item" month="1">${this.lang_January}</div>
                    <div class="wtc_datepicker-month-item" month="2">${this.lang_February}</div>
                    <div class="wtc_datepicker-month-item" month="3">${this.lang_March}</div>
                    <div class="wtc_datepicker-month-item" month="4">${this.lang_April}</div>
                    <div class="wtc_datepicker-month-item" month="5">${this.lang_May}</div>
                    <div class="wtc_datepicker-month-item" month="6">${this.lang_June}</div>
                    <div class="wtc_datepicker-month-item" month="7">${this.lang_July}</div>
                    <div class="wtc_datepicker-month-item" month="8">${this.lang_August}</div>
                    <div class="wtc_datepicker-month-item" month="9">${this.lang_September}</div>
                    <div class="wtc_datepicker-month-item" month="10">${this.lang_October}</div>
                    <div class="wtc_datepicker-month-item" month="11">${this.lang_November}</div>
                    <div class="wtc_datepicker-month-item" month="12">${this.lang_December}</div>
                </div>
            </div>
        `;

        $parentEle.append(str);

        var $dom_monthWrap = $('.wtc_datepicker-month-wrap', $parentEle);
        var $dom_leftBtn = $('.wtc_datepicker-month-btn-left', $parentEle);
        var $dom_rightBtn = $('.wtc_datepicker-month-btn-right', $parentEle);
        var $dom_monthText = $('.wtc_datepicker-month-text', $parentEle);
        var $dom_monthItem = $('.wtc_datepicker-month-item', $parentEle);

        $(`.wtc_datepicker-month-item[month=${month}]`, $parentEle).addClass('wtc_datepicker-month-item-active');

        $dom_leftBtn.on('click', function () {
            $dom_monthText.html(--year + ' ' + $this.lang_year);
        });
        $dom_rightBtn.on('click', function () {
            $dom_monthText.html(++year + ' ' + $this.lang_year);
        });
        $dom_monthText.on('click', function () {
            $dom_monthWrap.css('display', 'none');
            callback('yearClick', parseInt($dom_monthText.html()), month);
        });
        $dom_monthItem.on('click', function () {
            $dom_monthItem.removeClass('wtc_datepicker-month-item-active');
            $(this).addClass('wtc_datepicker-month-item-active');
            $dom_monthWrap.css('display', 'none');
            let monthIndex = Number($(this).attr('month'));
            callback('monthClick', year, monthIndex);
        });
    };

    window.KdWtcYearMonthPicker = YearMonthPicker;
})();