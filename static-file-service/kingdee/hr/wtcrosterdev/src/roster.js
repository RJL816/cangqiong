(function () {
    class KdWtcRoster {
        constructor(para) {
            this.uniqueId = para.uniqueId;
            this.themeNum = para.themeNum;
            this.rootDom = para.model.dom;
            this.myTool = new KdWtcMyTool();

            this.imgUrl_person = para.KDApi.getNameSpace(para.model) + 'images/person.png';
            this.invoke = para.model.invoke;

            // 多语言文本
            this.langText_log = para.KDApi.getLangMsg(para.model, 'log');
            this.langText_plan = para.KDApi.getLangMsg(para.model, 'plan');
            this.langText_actual = para.KDApi.getLangMsg(para.model, 'actual');
            this.langText_actualTime = para.KDApi.getLangMsg(para.model, 'actualTime');
            this.langText_actualPeople = para.KDApi.getLangMsg(para.model, 'actualPeople');
            this.langText_planTime = para.KDApi.getLangMsg(para.model, 'planTime');
            this.langText_planPeople = para.KDApi.getLangMsg(para.model, 'planPeople');
            this.langText_all = para.KDApi.getLangMsg(para.model, 'all');
            this.langText_workDay = para.KDApi.getLangMsg(para.model, 'workDay');
            this.langText_restDay = para.KDApi.getLangMsg(para.model, 'restDay');
            this.langText_holiday = para.KDApi.getLangMsg(para.model, 'holiday');
            this.langText_insertShift = para.KDApi.getLangMsg(para.model, 'insertShift');
            this.langText_copyShift = para.KDApi.getLangMsg(para.model, 'copyShift');
            this.langText_parseShift = para.KDApi.getLangMsg(para.model, 'parseShift');
            this.langText_delShift = para.KDApi.getLangMsg(para.model, 'delShift');
            this.langText_lock = para.KDApi.getLangMsg(para.model, 'lock');
            this.langText_unlock = para.KDApi.getLangMsg(para.model, 'unlock');
            // this.langText_change = para.KDApi.getLangMsg(para.model, 'change');
            this.langText_China = para.KDApi.getLangMsg(para.model, 'China');
            this.langText_times = para.KDApi.getLangMsg(para.model, 'times');
            this.langText_overtime = para.KDApi.getLangMsg(para.model, 'overtime');
            this.langText_rest = para.KDApi.getLangMsg(para.model, 'rest');
            this.langText_work = para.KDApi.getLangMsg(para.model, 'work');
            this.langText_workMain = para.KDApi.getLangMsg(para.model, 'workMain');
            this.langText_shiftConflict = para.KDApi.getLangMsg(para.model, 'shiftConflict');
            this.langText_placeholder1 = para.KDApi.getLangMsg(para.model, 'placeholder1');
            this.langText_msg2 = para.KDApi.getLangMsg(para.model, 'msg2');
            this.langText_msg3 = para.KDApi.getLangMsg(para.model, 'msg3');
            this.langText_msg4 = para.KDApi.getLangMsg(para.model, 'msg4');
            this.langText_msg5 = para.KDApi.getLangMsg(para.model, 'msg5');
            this.langText_name = para.KDApi.getLangMsg(para.model, 'name');
            this.langText_number = para.KDApi.getLangMsg(para.model, 'number');
            this.langText_attGroup = para.KDApi.getLangMsg(para.model, 'attGroup');
            this.langText_company = para.KDApi.getLangMsg(para.model, 'company');
            this.langText_department = para.KDApi.getLangMsg(para.model, 'department');
            this.langText_position = para.KDApi.getLangMsg(para.model, 'position');
            this.langText_job = para.KDApi.getLangMsg(para.model, 'job');

            this.init(para.data);
        }

        init(rosterData) {

            // 需要修改table的高度：
            if ($dom_wrap.height() < $dom_table.height()) {
                $dom_table.height($dom_wrap.height());
            }

        }








        _initDialog() {
            this._initDialog_dom(this.rosterData.shiftInfoMap.all);

            let $this = this;
            let offsetX;  // 鼠标点击坐标距离dialogWrap的横距离
            let offsetY;  // 鼠标点击坐标距离dialogWrap的竖距离
            let $dom_moveBtn = $('.wtc_personnelSchedule-dialog-move', this.rootDom);
            let $dom_closeBtn = $('.wtc_personnelSchedule-dialog-close', this.rootDom);
            let $dom_tab = $('.wtc_personnelSchedule-dialog-tab', $this.rootDom);
            let $dom_input = $('.wtc_personnelSchedule-dialog-input', $this.rootDom);
            let $dom_inputIcon = $('.wtc_personnelSchedule-dialog-input-icon', $this.rootDom);
            let $dom_shiftList = $('.wtc_personnelSchedule-dialog-shift-list', $this.rootDom);
            let $dom_shiftRadio = $('.wtc_personnelSchedule-dialog-radio', $this.rootDom);  // 这个dom是动态添加的，所以放在后面获取
            let $dom_icon = $('.wtc_personnelSchedule-dialog-icon', this.rootDom);
            let $dom_dialog = $('.wtc_personnelSchedule-dialog', this.rootDom);

            // 初始化弹窗left
            $dom_dialog.css('left', document.body.clientWidth - 250 + 'px');

            $dom_moveBtn.on('mousedown', function (event) {
                offsetX = event.clientX - parseInt($dom_dialog.css('left'));
                offsetY = event.clientY - parseInt($dom_dialog.css('top'));

                $(document).on('mousemove.dialogMove', function (event) {
                    event.preventDefault();
                    $dom_dialog.css({
                        top: event.clientY - offsetY + 'px',
                        left: event.clientX - offsetX + 'px'
                    })
                }).on('mouseup.dialogMove', function (event) {
                    $(document).unbind("mousemove.dialogMove").unbind("mouseup.dialogMove");
                });
            });

            $dom_icon.on('click', function (event) {
                $dom_dialog.css('display', 'block');
                $dom_icon.css('display', 'none');
            });

            $dom_closeBtn.click(function () {
                $('.wtc_personnelSchedule-dialog-shift-item', $this.rootDom).removeClass('wtc_personnelSchedule-dialog-shift-item-active');  // 移除选中的item
                $dom_dialog.css('display', 'none');
                $dom_icon.css('display', 'block');
            });

            $dom_inputIcon.click(function () {
                let $dom_shiftItem = $('.wtc_personnelSchedule-dialog-shift-item', $this.rootDom);
                $this.curUserInput = $dom_input.val();
                // 刷新班次列表：
                $this._refreshDialogList($dom_shiftItem);
            });

            $dom_shiftRadio.on('change', function () {
                let $dom_shiftItem = $('.wtc_personnelSchedule-dialog-shift-item', $this.rootDom);
                $this.curShiftAttribute = $(this).val();
                // 刷新班次列表：
                $this._refreshDialogList($dom_shiftItem);
            });

            $dom_tab.click(function (event) {
                let $target = $(event.target);
                if (!$target.hasClass('wtc_personnelSchedule-dialog-tab-active')) {
                    $(this).children().toggleClass('wtc_personnelSchedule-dialog-tab-active');  // 切换激活样式
                    let $dom_shiftItem = $('.wtc_personnelSchedule-dialog-shift-item', $this.rootDom);
                    if ($target.hasClass('wtc_personnelSchedule-dialog-tab-usual')) {
                        // 点击常用班次：
                        $this.curShiftType = 'usual';
                    } else {
                        // 点击全部班次：
                        $this.curShiftType = 'all';
                    }
                    // 刷新班次列表：
                    $this._refreshDialogList($dom_shiftItem);
                }
            });

            $dom_shiftList.click(function (event) {
                let $target = $(event.target);

                if ($target.hasClass('wtc_personnelSchedule-dialog-shift-list')) return;

                // 将$target定位为item：
                if ($target.hasClass('wtc_personnelSchedule-dialog-shift-item-color') || $target.hasClass('wtc_personnelSchedule-dialog-shift-item-icon') || $target.hasClass('wtc_personnelSchedule-dialog-shift-item-value')) {
                    $target = $target.parent();
                }

                // 切换激活项：
                $('.wtc_personnelSchedule-dialog-shift-item', $this.rootDom).removeClass('wtc_personnelSchedule-dialog-shift-item-active');
                $target.addClass('wtc_personnelSchedule-dialog-shift-item-active');

                // 复制该班次（激活就是复制）
                let shiftIndex = Number($target.attr('shiftIndex'));
                $this.objCopyShift = $this.rosterData.shiftInfoMap.all[shiftIndex];
            });
        }

        _initDialog_dom(data) {
            var $this = this;
            var str = '';
            var $dom_shiftList = $('.wtc_personnelSchedule-dialog-shift-list', $this.rootDom);
            var $dom_radioWrap = $('.wtc_personnelSchedule-dialog-radio-wrap', $this.rootDom);
            this.curShiftType = 'all';
            this.curUserInput = '';
            this.curShiftAttribute = 'all';

            $dom_radioWrap.html(`
                <label><input class="wtc_personnelSchedule-dialog-radio" type="radio" name="dialogRadio_${this.uniqueId}" value="all" checked>${this.langText_all}</label>
                <label><input class="wtc_personnelSchedule-dialog-radio" type="radio" name="dialogRadio_${this.uniqueId}" value="work">${this.langText_workDay}</label>
                <label><input class="wtc_personnelSchedule-dialog-radio" type="radio" name="dialogRadio_${this.uniqueId}" value="rest">${this.langText_restDay}</label>
            `);

            // 初始化班次列表
            for (let i = 0; i < data.length; i++) {
                let bgColor = KdWtcRoster.hexToRgba(data[i].shiftColor);
                bgColor = `rgba(${bgColor.r}, ${bgColor.g}, ${bgColor.b}, 0.12)`;

                str += `
                <li class="wtc_personnelSchedule-dialog-shift-item" style="background: ${bgColor}" shiftAttribute="${data[i].shiftAtttribute}" clickCount="1" value="${data[i].name}" shiftIndex="${i}">
                    <div class="wtc_personnelSchedule-dialog-shift-item-color" style="background: ${data[i].shiftColor}"></div>
                    <div class="wtc_personnelSchedule-dialog-shift-item-icon kdfont kdfont-yewuduixiangbeifen" style="background: ${data[i].shiftColor}"></div>
                    <div class="wtc_personnelSchedule-dialog-shift-item-value" style="color: ${data[i].shiftColor};">${data[i].name}</div>
                </li>
                `;
            }

            $dom_shiftList.append(str);
        }

        /*
        * 刷新班次快捷面板中班次列表
        * */
        _refreshDialogList($dom_shiftItem) {
            let $this = this;
            $dom_shiftItem.each(function (index, item) {
                let $dom_item = $(item);

                if ($dom_item.attr('value').indexOf($this.curUserInput) === -1) {
                    // 不符合用户输入：
                    $dom_item.removeClass('wtc_personnelSchedule-dialog-shift-item-active');
                    $dom_item.css('display', 'none');
                    return
                }

                if ($this.curShiftType == 'usual' && $dom_item.attr('clickCount') == 'null') {
                    // 不符合常用班次条件：
                    $dom_item.removeClass('wtc_personnelSchedule-dialog-shift-item-active');
                    $dom_item.css('display', 'none');
                    return
                }

                if ($this.curShiftAttribute == 'work' && $dom_item.attr('shiftAttribute') != 'A' || $this.curShiftAttribute == 'rest' && $dom_item.attr('shiftAttribute') !== 'B') {
                    // 不符合单选框条件：
                    $dom_item.removeClass('wtc_personnelSchedule-dialog-shift-item-active');
                    $dom_item.css('display', 'none');
                    return
                }

                $dom_item.css('display', 'flex');
            });
        }










    }

    window.KdWtcRoster = KdWtcRoster;
})
();