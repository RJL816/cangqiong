'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
    var KdWtcCalculationReport = function () {
        function KdWtcCalculationReport(para) {
            _classCallCheck(this, KdWtcCalculationReport);

            this.uniqueId = para.uniqueId;
            this.model = para.model;
            this.themeNum = para.themeNum;
            this.KDApi = para.KDApi;
            this.rootDom = para.model.dom;
            this.myTool = new KdWtcMyTool();

            // 多语言文本
            this.langText_detail = para.KDApi.getLangMsg(this.model, 'detail');
            this.langText_noData = para.KDApi.getLangMsg(this.model, 'noData');

            this.$dom_wrap = $('.wtc_calculationReport-wrap', this.rootDom);

            this.init(para.data);
        }

        _createClass(KdWtcCalculationReport, [{
            key: 'init',
            value: function init(reportData) {
                this.refreshReport(reportData);
                // 设置主题色：
                this.rootDom.style.setProperty('--themeColor', this.themeNum);
            }

            /*
            * 初始化，渲染根节点的数据
            * */

        }, {
            key: 'refreshReport',
            value: function refreshReport(reportData) {
                this.reportData = reportData;

                var str = '<div class="wtc_calculationReport-group" level="' + (reportData[0].index - 1) + '">\n                            <div class="wtc_calculationReport-group-name">\n                                <i class="kdfont kdfont-bottom"></i>\n                                <span style="color:' + reportData[0].color + ';">' + reportData[0].group + '</span>\n                            </div>\n                        </div>';

                this.$dom_wrap.html(str);
                var $dom_rootGroup = $('.wtc_calculationReport-group', this.$dom_wrap);

                str = this.getReportHtml(reportData[0], reportData[0].index - 1);
                $dom_rootGroup.append(str);

                this.eventHandle();
            }

            // 加载子节点的数据

        }, {
            key: 'getReportHtml',
            value: function getReportHtml(reportData, level) {
                var $this = this;
                var str = '';
                if (reportData) {
                    str += '\n                            <div class="wtc_calculationReport-children">\n                                <ul class="wtc_calculationReport-label-list">';

                    if (reportData.labels) {
                        for (var j = 0; j < reportData.labels.length; j++) {
                            var label = reportData.labels[j];
                            if (!label.value) continue;
                            str += '\n                                    <li class="wtc_calculationReport-label-item" labelVid="' + label.vid + '">\n                                        <p title=\'' + label.value + '\'>' + label.key + ': ' + label.value + '</p>\n                                        ' + (label.type === 'click' ? '<div class="wtc_calculationReport-label-item-detail">' + $this.langText_detail + '</div>' : '') + '\n                                    </li>\n                        ';
                        }
                    }

                    str += '\n                                </ul>';

                    if (reportData.children) {
                        for (var _j = 0; _j < reportData.children.length; _j++) {
                            var child = reportData.children[_j];
                            str += '\n                            <div class="wtc_calculationReport-group" level="' + (level + '-' + (child.index - 1)) + '">\n                                <div class="wtc_calculationReport-group-name">\n                                    <i class="kdfont kdfont-right"></i>\n                                    <span style="color:' + child.color + ';">' + child.group + '</span>\n                                </div>\n                                <div class="wtc_calculationReport-children"></div>\n                            </div>\n                        ';
                        }
                    }

                    str += '\n                        </div>';
                } else {
                    str += '<div class="wtc_calculationReport-label-list">' + $this.langText_noData + '</div>';
                }

                return str;
            }

            // 用户点击展开时加载改节点下子节点数据；点击收起按钮时，隐藏子节点数据

        }, {
            key: 'toggleGroup',
            value: function toggleGroup(target) {
                if (target.firstElementChild.className === 'kdfont kdfont-bottom') {
                    target.firstElementChild.className = 'kdfont kdfont-right';
                    target.parentElement.lastElementChild.style.display = 'none';
                } else {
                    var $dom_children = $('.wtc_calculationReport-children', target.parentElement);
                    target.parentElement.lastElementChild.style.display = 'block';
                    target.firstElementChild.className = 'kdfont kdfont-bottom';
                    if (!$('.wtc_calculationReport-label-list', $dom_children)[0]) {
                        // 否则表示第一次加载：
                        var level = $(target.parentElement).attr('level');
                        var arrLevel = level.split('-');
                        var reportData = this.reportData[0];
                        for (var i = 1; i < arrLevel.length; i++) {
                            reportData = reportData.children[arrLevel[i]];
                        }
                        var str = this.getReportHtml(reportData, level);
                        $dom_children.append(str);
                        this.eventHandle();
                    }
                }
            }
        }, {
            key: 'showDialog',
            value: function showDialog(msg) {
                var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '460px';
                var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '600px';

                var dom_dialog = this.myTool.confirmDialog({
                    text: msg,
                    showTitle: false,
                    showImg: false,
                    showBtn: false,
                    confirmCallback: function confirmCallback() {},
                    cancelCallback: function cancelCallback() {}
                });

                $('.wtc_kztTool_dialog', dom_dialog).css({
                    width: width,
                    height: height,
                    maxWidth: width
                });

                $('.wtc_kztTool_dialog-text', dom_dialog).css({
                    textAlign: 'left',
                    fontSize: '14px',
                    lineHeight: '30px',
                    padding: '0 30px',
                    margin: '16px 0',
                    maxHeight: '96%'
                });
            }
        }, {
            key: 'eventHandle',
            value: function eventHandle() {
                var $this = this;
                this.$dom_groupName = $('.wtc_calculationReport-group-name', this.rootDom);
                this.$dom_detailBtn = $('.wtc_calculationReport-label-item-detail', this.rootDom);

                for (var i = 0; i < this.$dom_groupName.length; i++) {
                    $this.$dom_groupName[i].onclick = function (e) {
                        $this.toggleGroup(e.currentTarget);
                    };
                }
                for (var _i = 0; _i < this.$dom_detailBtn.length; _i++) {
                    $this.$dom_detailBtn[_i].onclick = function (e) {
                        var labelVid = $(this.parentElement).attr('labelVid');
                        $this.model.invoke('click', labelVid);
                    };
                }
            }
        }]);

        return KdWtcCalculationReport;
    }();

    window.KdWtcCalculationReport = KdWtcCalculationReport;
})();