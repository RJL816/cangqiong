'use strict';

(function (KDApi, $, global) {
    function InitModel(model) {
        this._setModel(model);
    }

    InitModel.prototype = {
        _setModel: function _setModel(model) {
            this.model = model;
        },
        init: function init(props) {
            initHtml(this.model, props.data.timeLineData, props.data.billType);
        },
        update: function update(props) {
            console.log("---update---", props);
            if (props.data && props.data.eventName != 'init') {
                // $('.workflow_showmore', this.model.dom).off('click'); 
                // $('.workflow_link', this.model.dom).off('click');
                //$('.workflow_container', this.model.dom).remove(); //移除dom消除绑定事件
                updateHtml(this.model, props.data.timeLineData, props.data.billType)
            }
        },
        destoryed: function destoryed() {
            $('.workflow_container', this.model.dom).remove()  //移除dom元素
        }

    };

    var initHtml = function initHtml(model, data, billType) {
        KDApi.loadFile('./css/index.css', model, function () {
            updateHtml(model, data, billType)
        });
    };
    // 转义防xss
    var escapeHTML = function (str = "") {
        return str.replace(
            /[&<>'"]/g,
            tag =>
            ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }
    var updateHtml = function (model, data, billType) {
        //多语言
        var viewDetails = KDApi.getLangMsg(model, 'viewDetails');
        var changetypeType = KDApi.getLangMsg(model, 'changetypeType');
        if (billType != '3') {
            if (billType == '1') {
                var positionName = KDApi.getLangMsg(model, 'positionName'); //职位名称
                var changeReasonName = KDApi.getLangMsg(model, 'changeType');
            } else if (billType == '2') {
                var positionName = KDApi.getLangMsg(model, 'stationName');//岗位名称
                var changeReasonName = KDApi.getLangMsg(model, 'changeReason');
            }

            var changeOperator = KDApi.getLangMsg(model, 'changeOperator');

            data.map(function (item, index) {
                item.positionName = positionName
                item.changeReasonName = changeReasonName
                item.changeOperator = changeOperator
                item.viewDetails = viewDetails
                item.changetypeType = changetypeType
            });
        } else {
            var positionName = KDApi.getLangMsg(model, 'stationName');//岗位名称
            var assessScore = KDApi.getLangMsg(model, 'assessScore');//评估总分
            var assessGrade = KDApi.getLangMsg(model, 'assessGrade');//评估等级


            data.map(function (item, index) {
                item.positionName = positionName
                item.assessScore = assessScore
                item.assessGrade = assessGrade
                item.viewDetails = viewDetails
                item.changetypeType = changetypeType
            });

        }
        KDApi.getTemplateStringByFilePath('./html/index.art', model).then(function (result) {
            model.dom.innerHTML = result;
            var appendhtml = ''
            if (billType != '3') {
                for (var i = 0; i < data.length; i++) {
                    appendhtml += '<li>' +
                        '<b></b>' +
                        '<div class="workflow_content">' +
                        '<div class="workflow_time">' + data[i].time + '</div>' +
                        '<div class="workflow_textbox">' +
                        '<span class="workflow_textname">' + data[i].positionName + '</span>' +
                        '<span class="workflow_textvalue">' + escapeHTML(data[i].name || "") + '</span>' +
                        '</div>' +
                        '<div class="workflow_textbox">' +
                        '<span class="workflow_textname">' + data[i].changeReasonName + '</span>' +
                        '<span class="workflow_textvalue">' + escapeHTML(data[i].changeReason || "") + '</span>' +
                        '</div>' +
                        '<div class="workflow_textbox">' +
                        '<span class="workflow_textname">' + data[i].changetypeType + '</span>' +
                        '<span class="workflow_textvalue">' + escapeHTML(data[i].changeType || "") + '</span>' +
                        '</div>' +
                        '<div class="workflow_textbox">' +
                        '<span class="workflow_textname">' + data[i].changeOperator + '</span>' +
                        '<span class="workflow_textvalue">' + escapeHTML(data[i].operator || "") + '</span>' +
                        '</div>' +
                        '<div class="workflow_link" customJson=' + JSON.stringify(data[i].customJson) + '>' +
                        '<div class="workflow_detailviews">' + data[i].viewDetails + '</div>' +
                        '<div class="workflow_detailicon hrfont hrfont-houfan"></div>' +
                        '</div>' +
                        '</div>' +
                        '</li>'
                }
            } else {
                for (var i = 0; i < data.length; i++) {
                    appendhtml += '<li>' +
                        '<b></b>' +
                        '<div class="workflow_content">' +
                        '<div class="workflow_time">' + data[i].time + '</div>' +
                        '<div class="workflow_textbox">' +
                        '<span class="workflow_textname">' + data[i].positionName + '</span>' +
                        '<span class="workflow_textvalue">' + escapeHTML(data[i].name) + '</span>' +
                        '</div>' +
                        '<div class="workflow_textbox">' +
                        '<span class="workflow_textname">' + data[i].assessScore + '</span>' +
                        '<span class="workflow_textvalue">' + escapeHTML(data[i].totalScore) + '</span>' +
                        '</div>' +
                        '<div class="workflow_textbox">' +
                        '<span class="workflow_textname">' + data[i].assessGrade + '</span>' +
                        '<span class="workflow_textvalue">' + escapeHTML(data[i].grade) + '</span>' +
                        '</div>' +
                        '<div class="workflow_link" customJson=' + JSON.stringify(data[i].customJson) + '>' +
                        '<div class="workflow_detailviews">' + data[i].viewDetails + '</div>' +
                        '<div class="workflow_detailicon hrfont hrfont-houfan"></div>' +
                        '</div>' +
                        '</div>' +
                        '</li>'
                }
            }
            $('.workflow_timevertical', model.dom).html(appendhtml)
            if (data.length > 3) {
                var expandMore = KDApi.getLangMsg(model, 'expandMore');
                var foldUp = KDApi.getLangMsg(model, 'foldUp');
                $('.workflow_container>ul li:gt(2)', model.dom).hide();
                $('.workflow_timevertical', model.dom).append(
                    ' <div class="workflow_showmore">' +
                    '<div class="workflow_detailviews workflow_spread">' + expandMore + '</div>' +
                    '<div class="workflow_detailicon hrfont hrfont-xiala"></div>' +
                    '</div>'
                )
                $('.workflow_container>ul li:eq(2)', model.dom).css('border-left', 'none');

                $('.workflow_showmore', model.dom).click(function (e) {
                    //点击展开更多
                    e.stopPropagation();
                    if ($(this).find('.workflow_spread').length) {
                        $('.workflow_container>ul li', model.dom).show();
                        $(this).find('.workflow_detailviews').text(foldUp);
                        $(this).find('.workflow_detailviews').removeClass('workflow_spread');
                        $(this).find('.workflow_detailicon').removeClass('hrfont-xiala').addClass('hrfont-shangla');
                        $('.workflow_container>ul li:eq(2)', model.dom).css('border-left', '1px solid #D7D7D7');
                        $('.workflow_container>ul li:last', model.dom).css('border-left', 'none');
                    } else {
                        $('.workflow_container>ul li:gt(2)', model.dom).hide();
                        $(this).find('.workflow_detailviews').text(expandMore);
                        $(this).find('.workflow_detailviews').addClass('workflow_spread');
                        $(this).find('.workflow_detailicon').removeClass('hrfont-shangla').addClass('hrfont-xiala');
                        $('.workflow_container>ul li:eq(2)', model.dom).css('border-left', 'none');
                    }
                })
            }
            initEvent(model);
        });
    }
    var initEvent = function (model) {
        //查看详情点击事件
        $('.workflow_link', model.dom).click(function () {
            var customJson = $(this).attr('customJson');
            model.invoke("showdetail", customJson)
        })
    }

    KDApi.register('jobBillTimeline', InitModel, { isMulLang: true });
})(window.KDApi, jQuery, window);
