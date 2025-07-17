// 拖拽选中多行
function onDragEnd(startPoint, endPoint, startDate, endDate, tasksBetweenDates, tasksInRows) {
    tasksInRows.forEach(function(item) {
        gantt.selectTask(item.id);
    });
}

// 设置显示中文

gantt.i18n.setLocale("cn");

gantt.plugins({
    critical_path: true, // 启用关键路径
    multiselect: true,  // 启用多选
    click_drag: true,  // 启用单击拖拽选中多行
    undo: true,  // 启用撤销
    tooltip: true,
    marker: true, // 添加今日线标记
    auto_scheduling: true   // 自动计算日期
});

// 允许 grid header 排序
gantt.config.sort = true;
gantt.config.work_time = true; // 遇上节假日时，不计入持续时间
gantt.config.duration_unit = "day";
gantt.config.autoscroll = false; // 超出界面时，拖拽可以滚动
// gantt.config.multiselect = true;
// 拖拽选中多行
gantt.config.click_drag = {
    callback: onDragEnd
};

gantt.config.lightbox_additional_height = 90;

// 格式化日期
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";
gantt.config.lightbox.sections = [
    {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
    {name: "time", type: "duration", map_to: "auto"}
];

gantt.config.scale_height = 90;
gantt.config.scales = [
    {unit: "month", step: 1, format: "%Y, %F"},
    {
        unit: "week", step: 1, format: function (date) {
            var dateToStr = gantt.date.date_to_str("%M %d");
            var weekNum = gantt.date.date_to_str("(week %W)");
            var endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
            return dateToStr(date) + " - " + dateToStr(endDate) + " " + weekNum(date);
        }
    },
    {unit: "day", step: 1, format: "%j, %D"}
];


gantt.config.auto_scheduling = true;
// 启用自动调度模式，在这种模式下，任务总是会被重新调度到尽可能早的日期
gantt.config.auto_scheduling_strict = true;
gantt.config.auto_scheduling_compatibility = true;


// 自定义tooltip的内容
gantt.templates.tooltip_text = function (start, end, task) {
    // var ownArr = task.owner_id;
    // var perons = initialData.OtherProperties.persons;
    var ownArr = [{"id": "1158717501358482432", "parent": "100000", "owner_name": "郭旭"},
        {"id": "1158717730837242880", "parent": "100000", "owner_name": "董振杰"}];
    var ownnames = '';
    ownArr.map(function (value) {
        ownnames = ownnames + value.owner_name + '，';
    });
    ownnames = ownnames.substr(0, ownnames.length - 1);
    return "<b>任务名称：</b>" + task.text + "<br/>" +
        "<b>人员：</b>" + ownnames + "<br/>" +
        "<b>工期：</b>" + task.duration + "<br/>" +
        "<b>进度：</b>" + task.progress + "%" + "<br/>" +
        "<b>开始时间：</b>" + gantt.templates.tooltip_date_format(start) + "<br/>" +
        "<b>结束时间：</b>" + gantt.templates.tooltip_date_format(end) + "<br/>";
};

// 高亮周末日期列
gantt.templates.timeline_cell_class = function (task, date) {
    if (!gantt.isWorkTime(date)) {
        return "week_end";
    }
    return "";
};

// 设置选中多行的样式
gantt.templates.task_class = function (start, end, task) {
    if (gantt.isSelectedTask(task.id))
        return "gantt_selected";
};
gantt.templates.grid_row_class = function (start, end, task) {
    if (gantt.isSelectedTask(task.id))
        return "gantt_selected";
};
gantt.templates.task_row_class = function (start, end, task) {
    if (gantt.isSelectedTask(task.id))
        return "gantt_selected";
};

// 添加今日线标记
var dateToStr = gantt.date.date_to_str(gantt.config.task_date);
var today = new Date();
gantt.addMarker({
    start_date: today,
    css: "today",
    text: "Today",
    title: "Today: " + dateToStr(today)
});
