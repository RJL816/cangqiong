/**
 *  自定义甘特图控件
 */
(function (KDApi, $) {
    // 构造函数，变量名随意，与最后一句代码的KDApi.register的第二个参数一致即可
    function PayrollGant(model) {
        this._setModel(model)
    }

    // 原型中封装生命周期函数，固定格式
    PayrollGant.prototype = {
        _setModel: function (model) {
            this.model = model
        },
        init: function (props) {
            // TO DO
            initFunc(this.model, props)
        },
        update: function (props) {
            // TO DO
            updateFunc(this.model, props)
        },
        destoryed: function () {
            // TO DO
        }
    }

    // 初始化操作
    var initFunc = function (model, props) {

        KDApi.loadFile('./css/gantt.css', model, function () {
            var htmlStr = ""
            // 构造html的head
            //htmlStr += buildHtmlHead()
            // console.log("initFunc buildHtmlBody start...")
            htmlStr += buildHtmlBody(props)
            console.log("initFunc buildHtmlBody end...")

            model.dom.innerHTML = htmlStr
            // 绑定DOM事件
            initEvent(model, props)
        })

    }

    // dom事件
    var initEvent = function (model, props) {
        //内置了jquery对象，可直接使用$
        $("h1", model.dom).click(function () {
            // model.invoke，用于给后端发送请求，第一个参数是事件名，可自定义；第二个参数是发送给后端的数据，可以是任意类型
            model.invoke('click', 'Hello World!')
        })
    }

    // 更新操作
    var updateFunc = function (model, props) {
        var htmlStr = ""
        console.log("updateFunc buildHtmlBody start...")
        htmlStr += buildHtmlBody(props)
        console.log("updateFunc buildHtmlBody end...")

        model.dom.innerHTML = htmlStr

    }

    // 构造html的body
    var buildHtmlBody = function (props) {
        var data = props.data
        var inputFirstDate = new Date(data.inputFirstDate)// 用户输入的起始日期
        var inputLastDate = new Date(data.inputLastDate)// 用户输入的截止日期
        var inputDateNum = getDayCount(inputFirstDate, inputLastDate)
        var maxNodeNum = data.maxNodeNum
        var heightNum = maxNodeNum - 2 // 减去开始节点和结束节点
        var htmlStr = ""

        htmlStr += "<div class=\"scrollBox\">\n"
        // 线条区的设计，长度小于84按84的长度来；大于84按实际长度来，保证横向数据齐全，能出现单滚动条（旧设计已废弃）
        htmlStr += "    <div class=\"backWrap\">\n"
        // 1、第一行表格线条区，根据用户输入的天数来动态调整表格列
        htmlStr += "        <div class=\"backRow\">\n"
        for (var i = 0; i < inputDateNum; i++) {
            htmlStr += buildHtmlTableHeadLine(i, data.inputFirstDate)
        }
        htmlStr += "        </div>\n"
        // 2、其他行表格线条区，默认40行；每行高度是backRow的高度 - 1，backRow 的height为20，减一是表格本身有1的大小，控制每行高度为20
        heightNum = heightNum > 38 ? heightNum : 38;
        for (var col = 0; col < heightNum; col++) {
            htmlStr += "        <div class=\"backRow\">\n"
            // 纵向的数据齐全需要外嵌一层循环，同时改变每个表格线的高度；具体高度需要按具体的流程图的最大并行活动条数量确定
            for (var i = 0; i < inputDateNum; i++) {
                htmlStr += buildHtmlTableLine()
            }
            htmlStr += "        </div>\n"
        }
        htmlStr += "    </div>\n"

        // 如果后端标识是无效数据，则只画表格线，其余不画
        if (data.markCode == "0") {
            htmlStr += "</div>"
            return htmlStr
        }

        var payScheduleMap = data.paySchedule
        console.log(payScheduleMap)
        var containActDateNum = data.containActDateNum // 含日程活动的横坐标数
        console.log("containActDateNum : " + containActDateNum)
        var firstDate = new Date(data.firstDate)// 横坐标的起始日期
        console.log("firstDate : " + firstDate)

        htmlStr += "    <div class=\"blockWrap\">\n"
        htmlStr += "        <div class=\"blockRow\">\n"
        // 计算规则名称
        htmlStr += buildHtmlCalRule(data)

        // 上半区阶段线条区，暂时不做
        htmlStr += "            <div class=\"stageBox\">"
        var periodNum = 0
        for (calperiodId in data.paySchedule) {
            periodNum += 1
        }
        /*        for (var i = 0; i < 4; i++) {
                    var stepName = getStepName(i % 4, data)
                    var stepWidth = getStepWidth(i, data)
                    htmlStr += buildHtmlStageLine(i % 4, stepWidth, stepName)
                }*/
        htmlStr += "            </div>"

        // 活动区，需要根据用户输入的日期范围来判断哪部分需要画出来
        htmlStr += "            <div class=\"activityBox\">"
        for (calperiodId in payScheduleMap) {
            console.log("calperiodId : " + calperiodId)
            var paySchedules = payScheduleMap[calperiodId]// 注意是[]不是点
            var len = paySchedules.length
            for (var i = 0; i < len; i++) {
                var paySchedule = paySchedules[i]
                var payScheduleName = paySchedule.name
                var payScheduleScheduleStatus = paySchedule.schedulestatus
                var payScheduleStartDate = new Date(paySchedule.startdate)
                var payScheduleEndDate = new Date(paySchedule.enddate)
                // 如果日程的结束日期小于开始日期，错误数据，不画
                if (payScheduleEndDate.getTime() - payScheduleStartDate.getTime() < 0) {
                    continue
                }
                // 如果日程的开始日期大于用户输入的结束日期，不画
                if (payScheduleStartDate.getFullYear() > inputLastDate.getFullYear()) {
                    continue
                } else if (payScheduleStartDate.getFullYear() == inputLastDate.getFullYear()) {
                    if (payScheduleStartDate.getMonth() > inputLastDate.getMonth()) {
                        continue
                    } else if (payScheduleStartDate.getMonth() == inputLastDate.getMonth()) {
                        if (payScheduleStartDate.getDate() > inputLastDate.getDate()) {
                            continue
                        } else if (payScheduleStartDate.getDate() == inputLastDate.getDate()) {
                            //  如果日程的开始日期等于用户输入的结束日期，画1天
                            payScheduleEndDate = inputLastDate
                        }
                    }
                }
                // 如果日程的结束日期小于用户输入的开始日期，不画
                if (payScheduleEndDate.getFullYear() < inputFirstDate.getFullYear()) {
                    continue
                } else if (payScheduleEndDate.getFullYear() == inputFirstDate.getFullYear()) {
                    if (payScheduleEndDate.getMonth() < inputFirstDate.getMonth()) {
                        continue
                    } else if (payScheduleEndDate.getMonth() == inputFirstDate.getMonth()) {
                        if (payScheduleEndDate.getDate() < inputFirstDate.getDate()) {
                            continue
                        } else if (payScheduleEndDate.getDate() == inputFirstDate.getDate()) {
                            //  如果日程的结束日期等于用户输入的开始日期，画1天
                            payScheduleStartDate = inputFirstDate
                        }
                    }
                }

                if (payScheduleEndDate.getTime() - inputLastDate.getTime() > 0) {
                    // 如果结束日期大于用户指定的结束日期，那就画到用户指定的结束日期
                    payScheduleEndDate = inputLastDate
                }

                if (payScheduleStartDate.getTime() - inputFirstDate.getTime() < 0) {
                    // 如果开始日期小于用户指定的开始日期，则从用户指定的开始日期开始画
                    payScheduleStartDate = inputFirstDate
                }
                var actionWidth = getDayCount(payScheduleStartDate, payScheduleEndDate) * 20
                var actionLeft = getActionLeft(data.inputFirstDate, payScheduleStartDate)
                htmlStr += buildHtmlPayrollAction(actionWidth, actionLeft, 30 * i, payScheduleScheduleStatus, payScheduleName)
            }
        }

        // 弧线区
        for (calperiodId in payScheduleMap) {
            var paySchedules = payScheduleMap[calperiodId]// 注意是[]不是点
            var len = paySchedules.length
            var arcKeyArray = new Array()// 当作有序的map，存有序的key
            var arcKeyArray2 = new Array()// 当作有序的map，存有序的key
            var arcValueArray = new Array()// 存key对应的value
            for (var i = 0; i < len; i++) {
                var arcInfoMap = new Array()
                // 弧线的坐标不是递归的下一个，而应是next指定的下一个，若next有多个：则指向多个next
                var paySchedule = paySchedules[i]
                var payBizProcId = paySchedule.paybizproc
                var payBizActId = paySchedule.paybizaction
                var nextPayBizActIds = paySchedule.nextpaybizactions
                var payScheduleStartDate = new Date(paySchedule.startdate)
                var payScheduleEndDate = new Date(paySchedule.enddate)
                // 如果日程的结束日期小于开始日期，错误数据，不画
                if (payScheduleEndDate.getTime() - payScheduleStartDate.getTime() < 0) {
                    continue
                }
                // 如果日程的开始日期大于用户输入的结束日期，不画
                if (payScheduleStartDate.getFullYear() > inputLastDate.getFullYear()) {
                    continue
                } else if (payScheduleStartDate.getFullYear() == inputLastDate.getFullYear()) {
                    if (payScheduleStartDate.getMonth() > inputLastDate.getMonth()) {
                        continue
                    } else if (payScheduleStartDate.getMonth() == inputLastDate.getMonth()) {
                        if (payScheduleStartDate.getDate() > inputLastDate.getDate()) {
                            continue
                        } else if (payScheduleStartDate.getDate() == inputLastDate.getDate()) {
                            //  如果日程的开始日期等于用户输入的结束日期，画1天
                            payScheduleEndDate = inputLastDate
                        }
                    }
                }
                // 如果日程的结束日期小于用户输入的开始日期，不画
                if (payScheduleEndDate.getFullYear() < inputFirstDate.getFullYear()) {
                    continue
                } else if (payScheduleEndDate.getFullYear() == inputFirstDate.getFullYear()) {
                    if (payScheduleEndDate.getMonth() < inputFirstDate.getMonth()) {
                        continue
                    } else if (payScheduleEndDate.getMonth() == inputFirstDate.getMonth()) {
                        if (payScheduleEndDate.getDate() < inputFirstDate.getDate()) {
                            continue
                        } else if (payScheduleEndDate.getDate() == inputFirstDate.getDate()) {
                            //  如果日程的结束日期等于用户输入的开始日期，画1天
                            payScheduleStartDate = inputFirstDate
                        }
                    }
                }

                // 如果结束日期大于用户指定的结束日期，那就画到用户指定的结束日期
                if (payScheduleEndDate.getTime() - inputLastDate.getTime() > 0) {
                    payScheduleEndDate = inputLastDate
                }
                // 如果开始日期小于用户指定的开始日期，则从用户指定的开始日期开始画
                if (payScheduleStartDate.getTime() - inputFirstDate.getTime() < 0) {
                    payScheduleStartDate = inputFirstDate
                }
                var actionWidth = getDayCount(payScheduleStartDate, payScheduleEndDate) * 20
                var actionLeft = getActionLeft(data.inputFirstDate, payScheduleStartDate)
                var actionTop = 30 * i

                arcInfoMap["payBizActId"] = payBizActId
                arcInfoMap["nextPayBizActIds"] = nextPayBizActIds
                arcInfoMap["actionWidth"] = actionWidth
                arcInfoMap["actionLeft"] = actionLeft
                arcInfoMap["actionTop"] = actionTop

                if (payBizActId == null) {
                    console.log("error data, payBizActId is null !")
                    continue
                }
                arcKeyArray.push(payBizActId)
                arcKeyArray2.push(payBizActId)
                arcValueArray.push(arcInfoMap)
            }
            console.log("arcKeyArray : " + arcKeyArray + " arcValueArray : " + arcValueArray)

            // 根据各个已经确定位置的活动，确定弧线位置
            var arcKeyArrayLen = arcKeyArray.length
            for (var i = 0; i < arcKeyArrayLen; i++) {
                var arcInfoMap = arcValueArray[i]
                var payBizActId = arcInfoMap["payBizActId"]
                var nextPayBizActIds = arcInfoMap["nextPayBizActIds"]
                var currActionWidth = arcInfoMap["actionWidth"]
                var currActionLeft = arcInfoMap["actionLeft"]
                var currActionTop = arcInfoMap["actionTop"]
                // 如果说没有下一节点就不用画弧线了
                var ss = nextPayBizActIds.length
                for (var m = 0; m < ss; m++) {
                    var nextPayBizActId = nextPayBizActIds[m]
                    var index = -1
                    for (var j = 0; j < arcKeyArrayLen; j++) {
                        if (arcKeyArray2[j] == nextPayBizActId) {
                            index = j
                            break
                        }
                    }
                    if (index == -1) {
                        continue
                    }
                    var arcNextInfoMap = arcValueArray[index]
                    var nextActionWidth = arcNextInfoMap["actionWidth"]
                    var nextActionLeft = arcNextInfoMap["actionLeft"]
                    var nextActionTop = arcNextInfoMap["actionTop"]
                    var arcLeft = currActionLeft + currActionWidth
                    var arcTop = currActionTop + 10
                    var arcWidth = 6 + (nextActionLeft - arcLeft)
                    var arcHeigh = nextActionTop - arcTop - 2
                    htmlStr += buildHtmlArc(arcLeft, arcTop, arcWidth, arcHeigh)
                }
            }
        }

        htmlStr += "            </div>"
        htmlStr += "        </div>"
        htmlStr += "    </div>"
        htmlStr += "</div>"

        return htmlStr
    }

    // 有日期的表格线
    var buildHtmlTableHeadLine = function (i, firstDate) {
        if (i % 7 == 0) {
            var startDate = new Date(firstDate)
            startDate = startDate.setDate(startDate.getDate() + i)
            var colDate = new Date(startDate)
            var strBak = colDate.toLocaleDateString()
            return "            <div class=\"backCol\"><span class=\"date\">" + colDate.toLocaleDateString() + "</span></div>"
        } else {
            return "            <div class=\"backCol\"></div>"
        }
    }

    // 无日期的表格线
    var buildHtmlTableLine = function () {
        return "            <div class=\"backCol\"></div>"
    }

    // 计算规则的title
    var buildHtmlCalRule = function (data) {
        var calRuleName = data && data.calRuleNameOne || ''
        var html = "<span style = \"background: #5582F3;border-radius: 2px 100px 100px 2px;padding: 0 8px;\"></span>"
        return html + "            <span class=\"title\">" + calRuleName + "</span>"
    }

    // 阶段的线条
    var buildHtmlStageLine = function (stepNum, stepWidth, stepName) {
        // 阶段总共为4个阶段，阶段线条的实际长度 = 每个阶段的日期数 * 20
        switch (stepNum) {
            case 0:
                return "                <div class=\"stage\" style=\"width: " + stepWidth + "px;background-color: #FD7B7B;\"><span>" + stepName + "</span></div>"
            case 1:
                return "                <div class=\"stage\" style=\"width: " + stepWidth + "px;background-color: #3C6DED;\"><span>" + stepName + "</span></div>"
            case 2:
                return "                <div class=\"stage\" style=\"width: " + stepWidth + "px;background-color: #1BA854;\"><span>" + stepName + "</span></div>"
            case 3:
                return "                <div class=\"stage\" style=\"width: " + stepWidth + "px;background-color: #FF991C;\"><span>" + stepName + "</span></div>"
            default:
                return "                <div class=\"stage\" style=\"width: " + stepWidth + "px;background-color: #B2B2B2;\"><span>" + stepName + "</span></div>"
        }
    }

    // 薪资活动
    var buildHtmlPayrollAction = function (actionWidth, actionLeft, actionTop, actionStatus, actionName) {
        // 需要根据薪资活动的日期范围确定长度，长度 = 日期数 * 20
        switch (parseInt(actionStatus)) {
            case 0:
                return "                <div class=\"activity\" style=\"top: " + actionTop + "px; left: " + actionLeft + "px;width: " + actionWidth + "px;background-color: #B2B2B2;\" title=\"" + actionName + "\">" + actionName + "</div>"
            case 1:
                return "                <div class=\"activity\" style=\"top: " + actionTop + "px; left: " + actionLeft + "px;width: " + actionWidth + "px;background-color: #3C6DED;\" title=\"" + actionName + "\">" + actionName + "</div>"
            case 2:
                return "                <div class=\"activity\" style=\"top: " + actionTop + "px; left: " + actionLeft + "px;width: " + actionWidth + "px;background-color: #1BA854;\" title=\"" + actionName + "\">" + actionName + "</div>"
            case 3:
                return "                <div class=\"activity\" style=\"top: " + actionTop + "px; left: " + actionLeft + "px;width: " + actionWidth + "px;background-color: #FF991C;\" title=\"" + actionName + "\">" + actionName + "</div>"
            case 4:
                return "                <div class=\"activity\" style=\"top: " + actionTop + "px; left: " + actionLeft + "px;width: " + actionWidth + "px;background-color: #FD7B7B;\" title=\"" + actionName + "\">" + actionName + "</div>"
            default:
                return "                <div class=\"activity\" style=\"top: " + actionTop + "px; left: " + actionLeft + "px;width: " + actionWidth + "px;background-color: #B2B2B2;\" title=\"" + actionName + "\">" + actionName + "</div>"
        }
    }

    // 弧线
    var buildHtmlArc = function (arcLeft, arcTop, arcWidth, arcHeight) {
        // arcLeft 左侧的距离就是上一个节点的半宽度
        // arcTop
        // arcWidth 宽度就是上一个节点到下一个节点的左侧的距离
        return "                <div class=\"arrow\" style=\"left: " + arcLeft + "px;top: " + arcTop + "px;width: " + arcWidth + "px;height: " + arcHeight + "px;\"></div>"
    }

    // 获取阶段名称（兼容多语言环境）
    var getStepName = function (step, data) {
        switch (step) {
            case 0:
                return data.stepName0
            case 1:
                return data.stepName1
            case 2:
                return data.stepName2
            case 3:
                return data.stepName3
            default:
                return data.stepName0
        }
    }

    // 获取阶段的宽度，需要等阶段的需求出来才能确定
    var getStepWidth = function (step, data) {
        switch (step) {
            case 0:
                return 400
            case 1:
                return 420
            case 2:
                return 440
            case 3:
                return 460
            default:
                return 400
        }
    }

    // 获取两个日期之间的天数
    var getDayCount = function (firstDate, lastDate) {
        var firstDate2 = new Date(firstDate)
        var days = 0
        while ((lastDate.getTime() - firstDate2.getTime()) >= 0 || (lastDate.getFullYear() == firstDate2.getFullYear() && lastDate.getMonth() == firstDate2.getMonth() && lastDate.getDate() == firstDate2.getDate())) {
            firstDate2.setDate(firstDate2.getDate() + 1)
            days += 1
        }
        return days
        /*        var times = lastDate.getTime() - firstDate.getTime()
                var days = parseInt(times / (1000 * 60 * 60 * 24))
                return days*/
    }

    // 获取活动的起始横坐标
    var getActionLeft = function (firstDate, payScheduleStartDate) {
        var days = getDayCount(firstDate, payScheduleStartDate) - 1
        return days * 20
    }

    // 第一个参数是你接下来要新增控件方案时填的方案id，第二个参数是上面声明的构造函数
    KDApi.register('payrollgant', PayrollGant)
})(window.KDApi, jQuery) // 这里的jQuery不是必须要传进去的，可移除，要用到的时候才传，PC端系统默认会有jQuery对象，版本是1.12.4
