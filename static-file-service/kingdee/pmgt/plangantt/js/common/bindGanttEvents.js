
// 根据任务的editable属性设置是否弹出编辑弹框
gantt.attachEvent("onBeforeLightbox", function (id) {
    var task = gantt.getTask(id);
    return task.editable ? true : false;
});

// task的刻度为100，则不允许拖拽刻度。子节点progress为100，不可以拖拽游标改变progress大小
gantt.attachEvent("onBeforeTaskDrag", function (id, mode, e) {
    if (mode == gantt.config.drag_mode.progress) {
        if (gantt.getTask(id).progress == 100) {
            return false;
        }
    }

    // 有孩子则为父节点，且不允许左右拖动
    if (gantt.hasChild(id) && (mode == gantt.config.drag_mode.move || mode == gantt.config.drag_mode.resize)) {
        return false;
    }

    return true;
});

/**
 * 父任务右侧不允许连线
 */
// 只允许特定任务之间的链接-或者反过来禁用从特定任务到特定任务的链接
gantt.attachEvent("onBeforeLinkAdd", function (id, link) {
    /**
     * id: 1629342784235
     source: "1213782317722539011"  当前点击的任务
     target: "1213782317722539012"  目标任务
     type: '2'
     */
    // var target_task = gantt.getTask(link.target);
    if (gantt.hasChild(link.source)) {
        gantt.message({type: "warning", text: "此任务为父任务，无法链接到目标任务"});
        return false;
    }
    return true;
});


// Fires when the link is dragged
gantt.attachEvent("onLinkValidation", function (link) {
    var target = gantt.getTask(link.target);
    var source = gantt.getTask(link.source);
    if (target.type == "project" || source.type == "project") {
        gantt.message("Links to/from projects are forbidden");
        return false;
    }
    return true;
});

/**
 * 标记任务和链接已修改，为了收集已修改数据发送后台
 * 拖动任务后，onAfterTaskDrag
 * 更新任务后，onAfterTaskUpdate
 * 更新链接后，onAfterLinkUpdate
 */
gantt.attachEvent("onAfterTaskDrag", function (id, mode, e) {
    var task = gantt.getTask(id);
    task.$dataprocessor_class = "gantt_updated";
    gantt.refreshTask(id);
});
/*
gantt.attachEvent("onLightboxSave", function(id, task, is_new){
    task.$dataprocessor_class = "gantt_updated";
    return true;
});
var inlineEditors = gantt.ext.inlineEditors;
inlineEditors.attachEvent("onSave", function(state){
    var task = gantt.getTask(state.id);
    task.$dataprocessor_class = "gantt_updated";
    return true;
});*/
gantt.attachEvent("onAfterTaskUpdate", function (id, item) {
    // console.log("onAfterTaskUpdate---", "更新任务后");
    var task = gantt.getTask(id);
    task.$dataprocessor_class = "gantt_updated";
    return true;
});
gantt.attachEvent("onAfterLinkUpdate", function (id, item) {
    // var task = gantt.getTask(id);
    // task.$dataprocessor_class = "gantt_updated";
    var link = gantt.getLink(id);

    return true;
});

var inlineEditors = gantt.ext.inlineEditors;
// 当有子节点时，父任务开始、结束、工期不能修改
inlineEditors.attachEvent("onBeforeEditStart", function (state) {
    // console.log("onBeforeEditStart==", state);
    if (gantt.hasChild(state.id)) {
        return false;
    }
    return true;
});
gantt.attachEvent("onBeforeLightbox", function (id) {
    if (gantt.hasChild(id)) {
        return false;
    }
    return true;
});


// 弹出框删除按钮事件，校验task的deleteable字段
gantt.attachEvent("onLightboxDelete", function (id) {
    var task = gantt.getTask(id);
    if (task.deleteable && task.deleteable == 'false') {
        gantt.alert("此任务不允许删除！");
        return false;
    }
    return true;
});

// 操作link
gantt.attachEvent("onLinkClick", function (id, e) {
    return false;
});
gantt.attachEvent("onLinkDblClick", function (id, e) {
    return false;
});


gantt.attachEvent("onBeforeAutoSchedule", function () {
    gantt.message("重新计算项目进度...");
    return true;
});
gantt.attachEvent("onAfterTaskAutoSchedule", function (task, new_date, constraint, predecessor) {
    if (task && predecessor) {
        gantt.message({
            text: "<b>" + task.text + "</b> has been rescheduled to " + gantt.templates.task_date(new_date) + " due to <b>" + predecessor.text + "</b> constraint",
            expire: 4000
        });
    }
});
