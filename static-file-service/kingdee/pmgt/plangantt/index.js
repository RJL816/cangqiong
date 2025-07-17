/**
 *  自定义控件书写模板
 */
(function(KDApi, $){
    // 构造函数，变量名随意，与最后一句代码的KDApi.register的第二个参数一致即可
    function MyComponent (model) {
        this._setModel(model)
    }

    // 原型中封装生命周期函数，固定格式
    MyComponent.prototype = {
        //绑定model
        _setModel: function(model) {
            this.model = model;
        },
        init: function(props){
            console.log('init');
            console.log(props.data);
            // TO DO
            initFunc(this.model, props);
        },
        update: function(props){
            // TO DO
            updateFunc(this.model, props);
        },
        destoryed: function(){
            // TO DO
            var pageid = genPageId(this.model);
            if(dhtmlxgantt['ganttInsMap']){
                delete dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"];
            }

        }
    };

    /**
     * 格式化两位小数
     * @param x
     * @returns {*}
     */
    function toDecimal2(x) {
        var f = parseFloat(x);
        if (isNaN(f)) {
            return false;
        }
        var f = Math.round(x*100)/100;
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
            rs = s.length;
            s += '.';
        }
        while (s.length <= rs + 2) {
            s += '0';
        }
        return s;
    }

    /**
     * 根据后台数据的lock，初始化自定义操作按钮
     * @param flag
     */
    function initCustomBtnWithLock(pageid, flag) {
        var els = $("#" + pageid + "_ganttcontrol").find('input');
        for (var i = 0; i < els.length; i++) {
            els[i].style.display = flag ? "none" : "inline-block";
        }
    }

    /**
     * 返回任务状态
     * @param flag
     */
    function returnTaskSatus(flag) {
        var str = "";
        switch (flag) {
            case "1":
                str = "未开始";
                break;
            case "2":
                str = "进行中";
                break;
            case "3":
                str = "已逾期";
                break;
            case "4":
                str = "按时完成";
                break;
            case "5":
                str = "逾期完成";
                break;
            case "6":
                str = "预计逾期";
                break;
            default:
                str = "";
        }
        return str;
    }

    function initGanttDom(model, currentData) {
        var pageid = genPageId(model);
        var otherData = currentData.otherProperties;

        initCustomBtnWithLock(pageid, otherData.lock);

        if(dhtmlxgantt){
            if(!dhtmlxgantt['ganttInsMap']){
                dhtmlxgantt['ganttInsMap'] = {};
            }

            var textEditor = {type: "text", map_to: "text"};
            var dateEditor = {type: "date", map_to: "start_date"};
            var durationEditor = {type: "number", map_to: "duration", min: 0, max: 100};


            var calobj = {};
            var weeks = [0,1,2,3,4,5,6];
            if(otherData.calendar.workingDays && otherData.calendar.workingDays.length > 0){
                var workday = otherData.calendar.workingDays;
                weeks.map(function (value,index) {
                    if(workday.indexOf(value) == "-1") {
                        calobj[value] = false;
                    }else {
                        calobj[value] = true;
                    }
                });
            }

            dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"] = Gantt.getGanttInstance({
                plugins:{
                    critical_path: true, // 启用关键路径
                    multiselect: otherData.lock ? false : true,  // 启用多选
                    click_drag: true,  // 启用单击拖拽选中多行
                    undo: true,  // 启用撤销
                    tooltip: true,
                    marker: true, // 添加今日线标记
                    // auto_scheduling: true   // 自动计算日期
                },
                container: pageid + "_gantthere",
                config: {
                    sort: true,
                    work_time: true,
                    duration_unit: "day",
                    autoscroll: false,
                    lightbox_additional_height: 190,
                    date_format: "%Y-%m-%d %H:%i:%s",
                    click_drag: {
                        callback: function (startPoint, endPoint, startDate, endDate, tasksBetweenDates, tasksInRows) {
                            tasksInRows.forEach(function(item) {
                                dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].selectTask(item.id);
                            });
                        }
                    },
                    lightbox: {
                        sections: [
                            {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
                            {name: "time", type: "duration", map_to: "auto"}
                        ]
                    },
                    scale_height: 90,
                    scales: [
                        {unit: "month", step: 1, format: "%Y, %F"},
                        {
                            unit: "week", step: 1, format: function (date) {
                                var dateToStr = gantt.date.date_to_str("%M %d");
                                var weekNum = gantt.date.date_to_str("(%W周)");
                                var endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
                                return dateToStr(date) + " - " + dateToStr(endDate) + " " + weekNum(date);
                            }
                        },
                        {unit: "day", step: 1, format: "%j, %D"}
                    ],
                    // auto_scheduling: true,
                    // auto_scheduling_strict: true,
                    // auto_scheduling_compatibility: true,

                    /*是否锁定*/
                    readonly: otherData.lock ? true : false,
                    columns: otherData.lock ? [
                        {name: "text", tree: true, width: 200, resize: true},
                        {name: "start_date", align: "center", width: 140, resize: true},
                        {name: "duration", align: "center", width: 80, resize: true},
                        {name: "end_date", align: "center", width: 140, resize: true},
                    ] : [
                        {name: "text", tree: true, width: 200, resize: true, editor: textEditor},
                        {name: "start_date", align: "center", width: 140, resize: true, editor: dateEditor},
                        {name: "duration", align: "center", width: 80, resize: true, editor: durationEditor},
                        {name: "end_date", align: "center", width: 140, resize: true, editor: dateEditor},
                        {name: "add", width: 44}
                    ]

                },
                templates: {
                    tooltip_text: function (start, end, task) {
                        var ownArr = task.owner_name;
                        var ownnames = '';
                        if(ownArr && ownArr.length > 0) {
                            ownArr.map(function (value) {
                                ownnames = ownnames + value + '，';
                            });
                            ownnames = ownnames.substr(0, ownnames.length - 1);
                        }
						if (task.progress == 1) {
							return "<b>任务名称：</b>" + task.text + "<br/>" +
								"<b>任务状态：</b>" + (task.completionStatus ? returnTaskSatus(task.completionStatus) : "") + "<br/>" +
								"<b>计划开始日期：</b>" + (task.realstarttime ? this.tooltip_date_format(new Date(task.realstarttime)) : "") + "<br/>" +
								"<b>计划完成日期：</b>" + (task.realendtime ? this.tooltip_date_format(new Date(task.realendtime)) : "") + "<br/>" +
								"<b>计划工期：</b>" + task.actualduration + "<br/>" +
								"<b>实际开始日期：</b>" + this.tooltip_date_format(start) + "<br/>" +
								"<b>实际完成日期：</b>" + this.tooltip_date_format(end) + "<br/>" +
								"<b>实际工期：</b>" + task.duration + "<br/>"+
								"<b>人员：</b>" + ownnames + "<br/>" +
								"<b>完成进度：</b>" + toDecimal2(task.progress*100) + "%" + "<br/>";
						} else {
							return "<b>任务名称：</b>" + task.text + "<br/>" +
								"<b>任务状态：</b>" + (task.completionStatus ? returnTaskSatus(task.completionStatus) : "") + "<br/>" +
								"<b>计划开始日期：</b>" + this.tooltip_date_format(start) + "<br/>" +
								"<b>计划完成日期：</b>" + this.tooltip_date_format(end) + "<br/>" +
								"<b>计划工期：</b>" + task.duration + "<br/>" +
								"<b>实际开始日期：</b>" + (task.realstarttime ? this.tooltip_date_format(new Date(task.realstarttime)) : "") + "<br/>" +
								"<b>实际完成日期：</b>" + (task.realendtime ? this.tooltip_date_format(new Date(task.realendtime)) : "") + "<br/>" +
								"<b>实际工期：</b>" + task.actualduration + "<br/>" +
								"<b>人员：</b>" + ownnames + "<br/>" +
								"<b>完成进度：</b>" + toDecimal2(task.progress*100) + "%" + "<br/>";
						}
						

                    }
                },
                calendars: [
                    {
                        id: "global",
                        worktime: {
                            hours: [8,12,13,17],
                            dates: calobj// {0: false, 1: true, 2: true, 3: false, 4: true, 5: true, 6: false}
                        }
                    }
                ],
                events: {
                    /**
                     * 根据任务的editable属性设置是否弹出编辑弹框
                     * @param id
                     * @returns {boolean}
                     */
                    onBeforeLightbox: function (id) {
                        var task = dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].getTask(id);
                        return task.editable ? true : false;
                    },
                    /**
                     * // task的刻度为100，则不允许拖拽刻度。子节点progress为100，不可以拖拽游标改变progress大小
                     * @param id
                     * @param mode
                     * @param e
                     * @returns {boolean}
                     */
                    onBeforeTaskDrag: function (id, mode, e) {
                        if (mode == "progress") {
                            if (dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].getTask(id).progress == 100) {
                                return false;
                            }
                        }

                        // 有孩子则为父节点，且不允许左右拖动
                        if (dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].hasChild(id) && (mode == "move" || mode == "resize")) {
                            return false;
                        }

                        return true;
                    },
                    /**
                     * 父任务右侧不允许连线
                     */
                    onBeforeLinkAdd: function (id, link) {
                        /**
                         * id: 1629342784235
                         source: "1213782317722539011"  当前点击的任务
                         target: "1213782317722539012"  目标任务
                         type: '2'
                         */
                        if (dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].hasChild(link.source)) {
                            dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].message({type: "warning", text: "此任务为父任务，无法链接到目标任务"});
                            return false;
                        }
                        return true;
                    },
                    onLinkValidation: function (link) {
                        var target = dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].getTask(link.target);
                        var source = dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].getTask(link.source);
                        if (target.type == "project" || source.type == "project") {
                            dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].message("Links to/from projects are forbidden");
                            return false;
                        }
                        return true;
                    },
                    /**
                     * 根据readonly属性设置是否锁定任务
                     * 当gantt.config.readonly=false, task.editable=true，任务可以左右移动和连线
                     * @param task
                     *
                     * start_date: 2021-7-20, duration: 3, 计算出的 end_date: 2021-7-23 00:00:00
                     * 刻度是 2021-7-20 到 2021-7-22，tooltip 是2021-7-20,2021-7-23
                     * 此处设置 end_date 为 2021-7-22 23:59:59，修正tooltip的计划完成日期
                     */
                    onTaskLoading: function (task) {
                        task.editable = this.config.readonly ? false : true;
                        var end = task.end_date;
                        end.setDate(end.getDate() - 1);
                        end.setHours(23, 59, 59);
                        task.end_date = end;
                        return true;
                    }

                },
                data: currentData.taskData
            });

            /**
             * 高亮工作日列
             * @param task
             * @param date
             * @returns {string}
             */
            dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].templates.timeline_cell_class = function (task, date) {
                if (!dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].isWorkTime(date)) {
                    return "week_end";
                }
                return "";
            };

            /**
             * 设置选中多行的样式
             * @param start
             * @param end
             * @param task
             * @returns {string}
             */
            /*
            dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].templates.task_class = function (start, end, task) {
                if (dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].isSelectedTask(task.id))
                    return "gantt_selected";
            };
            dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].templates.grid_row_class = function (start, end, task) {
                if (dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].isSelectedTask(task.id))
                    return "gantt_selected";
            };
            dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].templates.task_row_class = function (start, end, task) {
                if (dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].isSelectedTask(task.id))
                    return "gantt_selected";
            };*/


            /**
             * 添加今日线标记
             */
            var dateToStr = dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].date.date_to_str("%Y-%m-%d");
            var today = new Date();
            dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].addMarker({
                start_date: today,
                css: "today",
                text: "今日",
                title: "今日: " + dateToStr(today)
            });
            processCalendar(currentData.otherProperties.calendar, dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"]);
            // dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].i18n.setLocale("cn");
            dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].i18n.setLocale({
                date: {
                    month_full: ["一月", "二月", "三月", "四月", "五月", "六月",
                        "七月", "八月", "九月", "十月", "十一月", "十二月"],
                    month_short: ["1月", "2月", "3月", "4月", "5月", "6月", "7月",
                        "8月", "9月", "10月", "11月", "12月"],
                    day_full: ["星期日", "星期一", "星期二", "星期三", "星期四",
                        "星期五", "星期六"],
                    day_short: ["星期日", "星期一", "星期二", "星期三", "星期四",
                        "星期五", "星期六"]
                },
                labels: {
                    column_text: "任务名称",
                    column_start_date: "计划/实际开始时间",
					column_end_date: "计划/实际完成时间",
                    column_duration: "绝对工期",
                    weeks: "周",
                }
            });
            dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].render();


            function shiftTask(task_id, direction) {
                var task = dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].getTask(task_id);
                task.start_date = dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].date.add(task.start_date, direction, "day");
                task.end_date = dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].calculateEndDate(task.start_date, task.duration);
                dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].updateTask(task.id);
            }

            var actions = {
                undo: function(){
                    dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].ext.undo.undo();
                },
                redo: function(){
                    dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].ext.undo.undo();
                },
                indent: function indent(task_id) {
                    var prev_id = dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].getPrevSibling(task_id);
                    while (dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].isSelectedTask(prev_id)) {
                        var prev = dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].getPrevSibling(prev_id);
                        if (!prev) break;
                        prev_id = prev;
                    }
                    if (prev_id) {
                        var new_parent = dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].getTask(prev_id);
                        dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].moveTask(task_id, dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].getChildren(new_parent.id).length, new_parent.id);
                        new_parent.type = dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].config.types.project;
                        new_parent.$open = true;
                        dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].updateTask(task_id);
                        dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].updateTask(new_parent.id);
                        return task_id;
                    }
                    return null;
                },
                outdent: function outdent(task_id, initialIndexes, initialSiblings) {
                    var cur_task = dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].getTask(task_id);
                    var old_parent = cur_task.parent;
                    if (dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].isTaskExists(old_parent) && old_parent != dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].config.root_id) {
                        var index = dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].getTaskIndex(old_parent) + 1;
                        var prevSibling = initialSiblings[task_id].first;

                        if(dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].isSelectedTask(prevSibling)){
                            index += (initialIndexes[task_id] - initialIndexes[prevSibling]);
                        }
                        dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].moveTask(task_id, index, dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].getParent(cur_task.parent));
                        if (!dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].hasChild(old_parent))
                            dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].getTask(old_parent).type = dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].config.types.task;
                        dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].updateTask(task_id);
                        dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].updateTask(old_parent);
                        return task_id;
                    }
                    return null;
                },
                del: function (task_id) {
                    var task = dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].getTask(task_id);
                    if(dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].isTaskExists(task_id) && task.deleteable && task.deleteable == "true"){
                        dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].deleteTask(task_id);
                    }else {
                        dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].message(task.text + "不允许删除！");
                    }
                    return task_id;
                },
                moveForward: function (task_id) {
                    shiftTask(task_id, 1);
                },
                moveBackward: function (task_id) {
                    shiftTask(task_id, -1);
                },
                cancelMultiselect: function (task_id) {
                    // 取消多选，遍历所有选中的任务
                    dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].eachSelectedTask(function(item) {
                        dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].unselectTask(item.id);
                    });
                }
            };
            var cascadeAction = {
                indent: true,
                outdent: true,
                del: true
            };

            var singularAction = {
                undo: true,
                redo: true
            };

            dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].performAction = function (actionName) {
                var action = actions[actionName];
                if (!action)
                    return;

                if(singularAction[actionName]){
                    action();
                    return;
                }

                dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].batchUpdate(function () {

                    // need to preserve order of items on indent/outdent,
                    // remember order before changing anything:
                    var indexes = {};
                    var siblings = {};
                    dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].eachSelectedTask(function (task_id) {
                        dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].ext.undo.saveState(task_id, "task");
                        indexes[task_id] = dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].getTaskIndex(task_id);
                        siblings[task_id] = {
                            first: null
                        };

                        var currentId = task_id;
                        while(dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].isTaskExists(dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].getPrevSibling(currentId)) && dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].isSelectedTask(dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].getPrevSibling(currentId))){
                            currentId = dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].getPrevSibling(currentId);
                        }
                        siblings[task_id].first = currentId;
                    });

                    var updated = {};
                    dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].eachSelectedTask(function (task_id) {

                        if (cascadeAction[actionName]) {
                            if (!updated[dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].getParent(task_id)]) {
                                var updated_id = action(task_id, indexes, siblings);

                                updated[updated_id] = true;
                            } else {
                                updated[task_id] = true;
                            }
                        } else {
                            action(task_id, indexes);
                        }
                    });
                });
            };


            var els = $("#" + pageid + "_ganttcontrol").find('input');
            for (var i = 0; i < els.length; i++) {
                els[i].onclick = function() {
                    dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].performAction(this.name)
                }
            }
        }

    }

    // 截取当前页面的pageid
    function genPageId(model) {
        var pageid = model.pageId;
        var arr = pageid.split("_");
        var firstindex = 0;
        if(arr.length>1){
            firstindex = pageid.indexOf("_");
            pageid = pageid.slice(firstindex + 1, pageid.length);
        }
        return pageid;
    }

    // 替换元素id，例如 id= model.pageId + '_invoiceTable'
    function bindCusPageId(result, model) {
        var pageid = genPageId(model);
        var reg = new RegExp('cus_', 'g');//创建正则表达式对象,不区分大小写,全局查找
        var htmlStr = result.replace(reg, pageid + "_");//把'cus_'替换为pageId + '_'
        return htmlStr;
    }


    // 显示或隐藏关键路径
    // 在显示关键路径的情况下，超出屏幕时，可以拖动task滑出屏幕重新设置position
    function updateCriticalPath(e, model) {
        var pageid = genPageId(model);
        if (e.target.innerHTML == "显示关键路径") {
            e.target.innerHTML = "隐藏关键路径";
            dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].config.highlight_critical_path = true;
        } else {
            e.target.innerHTML = "显示关键路径";
            dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].config.highlight_critical_path = false;
        }
        dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].render();
    }

    function send_changes(){
        var send_data = [];
        gantt.eachTask(function(task){
            if (task.$dataprocessor_class) {
                var task_clone = gantt.copy(task);
                task_clone.start_date = gantt.date.date_to_str(gantt.config.date_format)(task_clone.start_date);
                task_clone.end_date = gantt.date.date_to_str(gantt.config.date_format)(task_clone.end_date);
                send_data.push(task_clone);
            }
        });
        console.log("send_data",send_data)
    }

    var layer_id = null;

    function switchBaseline(e, model){
        var pageid = genPageId(model);
        if (e.target.innerHTML == "显示基准任务") {
            e.target.innerHTML = "隐藏基准任务";

            dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].config.bar_height = 16;
            dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].config.row_height = 40;
            dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].templates.task_class = function (start, end, task) {
                return "basetask";
            };
            dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].templates.link_class = function(link){
                return "baselink";
            };
            layer_id = dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].addTaskLayer({
                renderer: {
                    render: function draw_planned(task) {
                        if (task.realstarttime && task.realendtime) {
                            var sizes = dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].getTaskPosition(task, new Date(task.realstarttime), new Date(task.realendtime));
                            var el = document.createElement('div');
                            el.className = 'baseline';
                            el.style.left = sizes.left + 'px';
                            el.style.width = sizes.width + 'px';
                            el.style.top = sizes.top + dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].config.bar_height + 13 + 'px';
                            el.style.borderRadius = '50px';
                            return el;
                        }
                        return false;
                    },
                    // define getRectangle in order to hook layer with the smart rendering
                    getRectangle: function(task, view){
                        if (task.realstarttime && task.realendtime) {
                            return dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].getTaskPosition(task, new Date(task.realstarttime), new Date(task.realendtime));
                        }
                        return null;
                    }
                }
            });
        } else {
            e.target.innerHTML = "显示基准任务";

            if(layer_id){
                dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].config.bar_height = "full";
                dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].config.row_height = 34;
                dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].templates.task_class = function (start, end, task) {
                    return "";
                };
                dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].templates.link_class = function(link){
                    return "";
                };
                dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].removeTaskLayer(layer_id);
            }

        }
        dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].render();
    }

    var initFunc = function(model, props) {
        var propsData = null;
        var lock = false;
        if(props.data && props.data.otherProperties){
            propsData = props.data;
            lock = propsData.otherProperties.lock;
        }

        KDApi.loadFile([
            './js/ganttutil/dhtmlxgantt.js',
            './js/ganttutil/dhtmlxgantt_material.css'
        ], model, function() {

            KDApi.loadFile([
                './css/controlstyles.css',
                './js/common/calendar.js',
                // './js/common/baseconfig.js',
                // './js/common/bindGanttEvents.js'
            ], model, function() {

                // 通过路径去获取html字符串，第一个参数是路径，第二个参数是model，第三个参数是HTML模板中变量的值
                KDApi.getTemplateStringByFilePath('./html/ganttcustom.html', model, {
                    lock: lock
                }).then(function(result) {
                    model.dom.innerHTML = bindCusPageId(result, model);

                    // 绑定DOM事件
                    initEvent(model, props);

                });
            });
        });
    };

    var initEvent = function (model, props){
        var pageid = genPageId(model);

        // 设置数据
        if(props.data && !model[pageid + 'initflag']) {
            var dataobj = props.data;
            initGanttDom(model, dataobj);
            // initFlagGantt = true;
            model[pageid + 'initflag'] = true;
        }

        // 显示关键路径
        $('#'+ pageid +'_showCriticalPath').click(function (e) {
            updateCriticalPath(e, model);
        });

        // 显示基准线
        $('#'+ pageid +'_switchBaseline').click(function (e) {
            switchBaseline(e, model);
        });

        // 测试提交的数据
        $('#'+ pageid +'_ganttsubmit').click(function (e) {
            send_changes();
        });
		
		// 测试提交的数据
        $('#'+ pageid +'_dynamicScaleUp').click(function (e) {
			var pageid = genPageId(model);
			var gantt = dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"];
			if (e.target.innerHTML == "周视图") {
				e.target.innerHTML = "月视图";
				setScaleConfig("week",gantt);
			} else if(e.target.innerHTML == "月视图"){
				e.target.innerHTML = "季度视图";
				setScaleConfig("month",gantt);
			} else if(e.target.innerHTML == "季度视图"){
				e.target.innerHTML = "年视图";
				setScaleConfig("quarter",gantt);
			}else if(e.target.innerHTML == "年视图"){
				e.target.innerHTML = "日视图";
				setScaleConfig("year",gantt);
			}else if(e.target.innerHTML == "日视图"){
				e.target.innerHTML = "周视图";
				setScaleConfig("day",gantt);
			}
			var pageid = genPageId(model);
			
			gantt.render();
            
        });

        //下拉视图切换
        $('#'+ pageid +'_timeViewSel').change(function (e) {
            var gantt = dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"];
            if ($(this).val()==0) {
                setScaleConfig("day",gantt);
            } else if($(this).val()==1){
                setScaleConfig("week",gantt);
            } else if($(this).val()==2){
                setScaleConfig("month",gantt);
            }else if($(this).val()==3){
                setScaleConfig("quarter",gantt);
            }else if($(this).val()==4){
                setScaleConfig("year",gantt);
            }
            gantt.render();
            
        });
		
		
    };

    var updateFunc = function(model, props) {
        console.log("updateFunc");
        console.log(props);
        var pageid = genPageId(model);

        /**
         * 需要在update之后做初始化，否则自定义的html未插入页面
         * 1、第一次打开页面，切换页签，update，ganttInsMap没有或者空对象，initEvent里初始化
         * 2、修改数据，切换页签，update，ganttInsMap有，清除，初始化
         */
        try{
            if(props.data && props.data.otherProperties.source == "plan") {
                if(!dhtmlxgantt['ganttInsMap'] ||  Object.keys(dhtmlxgantt['ganttInsMap']).length === 0) {
                    model[pageid + 'initflag'] = false;
                    initGanttDom(model, props.data);
                }else if(dhtmlxgantt['ganttInsMap'] && dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"]) {
                    model[pageid + 'initflag'] = false;
                    dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].destructor();
                    // 修复分录数据，再切换到甘特图页签，重新初始化
                    initGanttDom(model, props.data);
                }else if(dhtmlxgantt['ganttInsMap'] && !dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"]) {
                    model[pageid + 'initflag'] = false;
                    initGanttDom(model, props.data);
                }
            }
        }catch(err){
            console.log('update', err);
        }

    };
	
	/* global gantt */
	var setScaleConfig = function (level,gantt) {
	debugger;
		switch (level) {
			case "day":
				gantt.config.scales = [
				{unit: "month", step: 1, format: "%Y, %F"},
				{
					unit: "week", step: 1, format: function (date) {
						var dateToStr = gantt.date.date_to_str("%M %d");
						var weekNum = gantt.date.date_to_str("(%W周)");
						var endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
						return dateToStr(date) + " - " + dateToStr(endDate) + " " + weekNum(date);
					}
				},
                {unit: "day", step: 1, format: "%j, %D"}
				];
				
				gantt.templates.timeline_cell_class = function (task, date) {
					if (!gantt.isWorkTime(date)) {
						return "week_end";
					}
					return "";
				};
				break;
			case "week":
				gantt.config.scales =[
					{unit: "year", step: 1, format: "%Y"},
					{unit: "month", format: "%F, %Y"},
					{unit: "week", format: "%W 周"}
				]
				gantt.templates.timeline_cell_class = function (task, date) {
					/*if (!dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].isWorkTime(date)) {
						return "week_end";
					}*/
					return "";
				};
				gantt.config.scale_height = 90;
				break;
			case "month":
				gantt.config.scales =[
					{unit: "year", step: 1, format: "%Y"},
					{unit: "month", format: "%F, %Y"},
					//{unit: "week", format: "Week #%W"}
				]
				gantt.templates.timeline_cell_class = function (task, date) {
					/*if (!dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].isWorkTime(date)) {
						return "week_end";
					}*/
					return "";
				};
				gantt.config.scale_height = 90;
				break;
			case "quarter":
				gantt.config.scales = [
					{unit: "year", step: 1, format: "%Y"},
					{
						unit: "quarter", step: 1, format: function (date) {
							var dateToStr = gantt.date.date_to_str("%M");
							var endDate = gantt.date.add(gantt.date.add(date, 3, "month"), -1, "day");
							return dateToStr(date) + " - " + dateToStr(endDate);
						}
					}
				];
				gantt.templates.timeline_cell_class = function (task, date) {
					/*if (!dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].isWorkTime(date)) {
						return "week_end";
					}*/
					return "";
				};
				gantt.config.scale_height = 90;
				break;
			case "year":
				gantt.config.scales = [
					{unit: "year", step: 1, format: "%Y"},
					
				];
				gantt.templates.timeline_cell_class = function (task, date) {
					/*if (!dhtmlxgantt['ganttInsMap'][pageid + "ganttIns"].isWorkTime(date)) {
						return "week_end";
					}*/
					return "";
				};
				gantt.config.scale_height = 90;
				break;
		}
	};




    // 你只需知道第一个参数是你接下来要新增控件方案时填的方案id，第二个参数是上面声明的构造函数
    KDApi.register('plangantt', MyComponent);
})(window.KDApi,jQuery); // 这里的jQuery不是必须要传进去的，可移除，要用到的时候才传，PC端系统默认会有jQuery对象，版本是1.12.4
