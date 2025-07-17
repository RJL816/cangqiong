(function () {
    class KdWtcCalculationReport {
        constructor(para) {
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

        init(reportData) {
            this.refreshReport(reportData);
            // 设置主题色：
            this.rootDom.style.setProperty('--themeColor', this.themeNum);
        }

        /*
        * 初始化，渲染根节点的数据
        * */
        refreshReport(reportData) {
            this.reportData = reportData;

            let str = `<div class="wtc_calculationReport-group" level="${reportData[0].index-1}">
                            <div class="wtc_calculationReport-group-name">
                                <i class="kdfont kdfont-bottom"></i>
                                <span style="color:${reportData[0].color};">${reportData[0].group}</span>
                            </div>
                        </div>`;

            this.$dom_wrap.html(str);
            let $dom_rootGroup = $('.wtc_calculationReport-group', this.$dom_wrap);

            str = this.getReportHtml(reportData[0], reportData[0].index-1);
            $dom_rootGroup.append(str);

            this.eventHandle();
        }

        // 加载子节点的数据
        getReportHtml(reportData, level) {
            let $this = this;
            let str = '';
            if(reportData) {
                str += `
                            <div class="wtc_calculationReport-children">
                                <ul class="wtc_calculationReport-label-list">`;

                if(reportData.labels) {
                    for(let j = 0; j< reportData.labels.length; j++) {
                        let label = reportData.labels[j];
                        if(!label.value) continue;
                        str += `
                                    <li class="wtc_calculationReport-label-item" labelVid="${label.vid}">
                                        <p title='${label.value}'>${label.key}: ${label.value}</p>
                                        ${label.type === 'click' ? '<div class="wtc_calculationReport-label-item-detail">' + $this.langText_detail + '</div>' : ''}
                                    </li>
                        `;
                    }
                }

                str +=`
                                </ul>`;

                if(reportData.children) {
                    for(let j = 0; j< reportData.children.length; j++) {
                        let child = reportData.children[j];
                        str += `
                            <div class="wtc_calculationReport-group" level="${level + '-' + (child.index-1)}">
                                <div class="wtc_calculationReport-group-name">
                                    <i class="kdfont kdfont-right"></i>
                                    <span style="color:${child.color};">${child.group}</span>
                                </div>
                                <div class="wtc_calculationReport-children"></div>
                            </div>
                        `;
                    }
                }

                str +=`
                        </div>`;
            } else {
                str += `<div class="wtc_calculationReport-label-list">${$this.langText_noData}</div>`;
            }

            return str;
        }

        // 用户点击展开时加载改节点下子节点数据；点击收起按钮时，隐藏子节点数据
        toggleGroup(target) {
            if(target.firstElementChild.className === 'kdfont kdfont-bottom') {
                target.firstElementChild.className = 'kdfont kdfont-right';
                target.parentElement.lastElementChild.style.display = 'none';
            } else {
                let $dom_children = $('.wtc_calculationReport-children', target.parentElement);
                target.parentElement.lastElementChild.style.display = 'block';
                target.firstElementChild.className = 'kdfont kdfont-bottom';
                if(!$('.wtc_calculationReport-label-list', $dom_children)[0]) {
                    // 否则表示第一次加载：
                    let level = $(target.parentElement).attr('level');
                    let arrLevel = level.split('-');
                    let reportData = this.reportData[0];
                    for(let i = 1; i < arrLevel.length; i++) {
                        reportData = reportData.children[arrLevel[i]];
                    }
                    let str = this.getReportHtml(reportData, level);
                    $dom_children.append(str);
                    this.eventHandle();
                }
            }
        }

        showDialog(msg, width='460px', height='600px') {
            let dom_dialog = this.myTool.confirmDialog({
                text: msg,
                showTitle: false,
                showImg: false,
                showBtn: false,
                confirmCallback: function(){},
                cancelCallback: function(){}
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

        eventHandle() {
            let $this = this;
            this.$dom_groupName = $('.wtc_calculationReport-group-name', this.rootDom);
            this.$dom_detailBtn = $('.wtc_calculationReport-label-item-detail', this.rootDom);

            for(let i = 0; i < this.$dom_groupName.length; i++) {
                $this.$dom_groupName[i].onclick = function (e) {
                    $this.toggleGroup(e.currentTarget);
                };
            }
            for(let i = 0; i < this.$dom_detailBtn.length; i++) {
                $this.$dom_detailBtn[i].onclick = function (e) {
                    let labelVid = $(this.parentElement).attr('labelVid');
                    $this.model.invoke('click', labelVid);
                };
            }
        }
    }

    window.KdWtcCalculationReport = KdWtcCalculationReport;
})();