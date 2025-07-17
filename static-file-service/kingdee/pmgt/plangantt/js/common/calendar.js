function processCalendar (calendar, ganttins) {
/*
    var weeks = [0,1,2,3,4,5,6];

    if(calendar.workingDays && calendar.workingDays.length > 0){
        var workday = calendar.workingDays;
        var freeday = [];
        weeks.map(function (value,index) {
            if(workday.indexOf(value) == "-1") {
                freeday.push(value);
            }
        });

        //全局日历默认周六和周日为休息日，未找到修改默认值的方法，先将周六周日设置为工作日
        ganttins.setWorkTime({
            day: 0
        });
        ganttins.setWorkTime({
            day: 6
        });

        //设置工作日
        for (var i = 0; i < workday.length; i++) {
            ganttins.setWorkTime({
                day : workday[i]
            });
        }
        //设置休息日
        for (var i = 0; i < freeday.length; i++) {
            ganttins.setWorkTime({
                day : freeday[i],
                hours: false
            });
        }
    }*/


    var excludeDates = null;
    if(calendar.excludeDates && calendar.excludeDates.length > 0){
        // 定时任务显示信息
        /*gantt.message("Following holidays are excluded from working time or rest time:");
        for (var i = 0; i < excludeDates.length; i++) {
            setTimeout(
                (function (i) {
                    return function () {
                        if ("1" == excludeDates[i].type) {
                            gantt.message(excludeDates[i].realDate + " working time");
                        } else {
                            gantt.message(excludeDates[i].realDate + " rest time");
                        }
                    }
                })(i)
                ,
                (i + 1) * 600
            );
        }*/
        excludeDates = calendar.excludeDates;
        // gantt.setWorkTime设置休息日/工作日
        for (var i = 0; i < excludeDates.length; i++) {
            if ("0" == excludeDates[i].type) { // 休息日
                ganttins.setWorkTime({
                    date: convertDateFromString(excludeDates[i].realDate),  //dateStr的时间格式为yyyy-MM-dd
                    hours: false
                });
            } else if ("1" == excludeDates[i].type) { // 工作日
                ganttins.setWorkTime({
                    date: convertDateFromString(excludeDates[i].realDate)  //dateStr的时间格式为yyyy-MM-dd
                });
            }
        }
    }

}

function convertDateFromString(dateString) {
    if (dateString) {
        var arr1 = dateString.split(" ");
        var sdate = arr1[0].split('-');
        var date = new Date(sdate[0], sdate[1]-1, sdate[2]);
        return date;
    }
}