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

            this.$dom_wrap = $('.wtc_calculationReport-wrap', this.rootDom);

            this.init(para.data);
        }

        _createClass(KdWtcCalculationReport, [{
            key: 'init',
            value: function init(rosterData) {
                var $this = this;
                this.refreshReport(rosterData);

                // 设置主题色：
                this.rootDom.style.setProperty('--themeColor', this.themeNum);

                this.$dom_groupName = $('.wtc_calculationReport-group-name', this.rootDom);
                this.$dom_detailBtn = $('.wtc_calculationReport-label-item-detail', this.rootDom);

                $this.$dom_groupName.click(function () {
                    if (this.firstElementChild.className === 'kdfont kdfont-bottom') {
                        this.firstElementChild.className = 'kdfont kdfont-right';
                        this.parentElement.lastElementChild.style.display = 'none';
                        // $('.wtc_calculationReport-children', this.parentElement).css('display', 'none');
                    } else {
                        this.firstElementChild.className = 'kdfont kdfont-bottom';
                        this.parentElement.lastElementChild.style.display = 'block';
                        // $('.wtc_calculationReport-children', this.parentElement).css('display', 'block');
                    }
                });

                $this.$dom_detailBtn.click(function () {
                    var labelVid = $(this.parentElement).attr('labelVid');
                    $this.model.invoke('click', labelVid);
                });
            }

            /*
            * 会动态改变dom的部分
            * */

        }, {
            key: 'refreshReport',
            value: function refreshReport(reportData) {
                var $this = this;
                var str = '';
                this.reportData = reportData;

                html_temp(this.reportData);

                function html_temp(arrGroupData) {
                    for (var i = 0; i < arrGroupData.length; i++) {
                        str += '\n                        <div class="wtc_calculationReport-group" groupIndex="' + arrGroupData[i].index + '">\n                            <div class="wtc_calculationReport-group-name"><i class="kdfont kdfont-bottom"></i><span style="color:' + arrGroupData[i].color + ';">' + arrGroupData[i].group + '</span></div>\n                            <div class="wtc_calculationReport-children">\n                                <ul class="wtc_calculationReport-label-list">';

                        if (arrGroupData[i].labels) {
                            for (var j = 0; j < arrGroupData[i].labels.length; j++) {
                                var label = arrGroupData[i].labels[j];
                                if (!label.value) continue;
                                str += '\n                                    <li class="wtc_calculationReport-label-item" labelVid="' + label.vid + '">\n                                        <p title="' + label.value + '">' + label.key + ': ' + label.value + '</p>\n                                        ' + (label.type === 'click' ? '<div class="wtc_calculationReport-label-item-detail">' + $this.langText_detail + '</div>' : '') + '\n                                    </li>\n                        ';
                            }
                        }

                        str += '\n                                </ul>';

                        if (arrGroupData[i].children) html_temp(arrGroupData[i].children);

                        str += '\n                            </div>\n                        </div>\n                    ';
                    }
                }

                this.$dom_wrap.html(str);
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
                    maxHeight: '100%'
                });
            }
        }]);

        return KdWtcCalculationReport;
    }();

    window.KdWtcCalculationReport = KdWtcCalculationReport;
})();