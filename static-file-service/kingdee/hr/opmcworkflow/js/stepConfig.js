'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function () {
    function KdOpmcStepConfig(para) {
        this.uniqueId = para.uniqueId;
        this.model = para.model;
        this.KDApi = para.KDApi;
        this.rootDom = para.model.dom;
        this.data = para.data;
        this.themeNum = para.themeNum;
        //this.data.type:  // 0:编辑态 1:查看态 2:新增态

        this.stack = []; // 用户操作栈
        this.itemIndex = 0;
        this.timer = null;
        this.timer2 = null;
        this.addResp = true;
        this.delResp = true;
        this.myTool = new KdWtcMyTool();

        // 多语言文本   
        this.flowTitle = para.KDApi.getLangMsg(this.model, 'flowTitle');
        this.langText_end = para.KDApi.getLangMsg(this.model, 'end');
        this.langText_deleteConfirm = para.KDApi.getLangMsg(this.model, 'deleteConfirm');
        this.langText_confirm = para.KDApi.getLangMsg(this.model, 'confirm');
        this.langText_cancel = para.KDApi.getLangMsg(this.model, 'cancel');
        this.langText_warn1 = para.KDApi.getLangMsg(this.model, 'warn1');
        this.langText_message1 = para.KDApi.getLangMsg(this.model, 'message1');
        this.langText_lessNodeMessage = para.KDApi.getLangMsg(this.model, 'lessNodeMessage');
        this.langText_deleteSuccess = para.KDApi.getLangMsg(this.model, 'deleteSuccess');
        this.langText_add = para.KDApi.getLangMsg(this.model, 'add');
        this.langText_copy = para.KDApi.getLangMsg(this.model, 'copy');
        this.langText_delete = para.KDApi.getLangMsg(this.model, 'delete');

        this.dom_container = this.rootDom.querySelector('.opmc_stepConfig_config-container');

        this.$dom_ModifyInfo = $('.opmc_stepConfig_modify-info', this.rootDom);
        this.$dom_openBtn = $('.opmc_stepConfig_btn-open', this.rootDom);
        this.$dom_foldBtn = $('.opmc_stepConfig_btn-fold', this.rootDom);

        // 设置主题色：
        // this.rootDom.style.setProperty('--themeColor', this.themeNum);

        this.init();
    };

    /*初始化*/
    KdOpmcStepConfig.prototype.init = function () {
        var $this = this;
        this.init_dom();

        var dow_items = $('.item', $this.rootDom);
        var lineStr = this.itemConnect(dow_items);

        $($this.dom_container).append(lineStr);

        this.showLastBtn();

        this.eventHandle();

        var row = $('.row_1', this.rootDom);
        $('.opmc_stepConfig_item-main-text', row).click();
    };

    /*事件绑定*/
    KdOpmcStepConfig.prototype.eventHandle = function () {
        var $this = this;

        // 在最外层添加点击事件，通过class定位具体触发的事件：
        $this.rootDom.onclick = function (event) {
            $this.clickHandle(event.target);
            // $($this.rootDom).on('click', '.add-btn', function(e) {
            //     e.preventDefault()
            //     e.stopPropagation()
            //     $this.addPhaseClick(e.target, "add");
            // })
        };

        // 屏幕大小发生改变：
        $(window).on('resize.stepConfig_resize_' + this.uniqueId, function () {
            if ($this.rootDom.offsetWidth !== 0) {
                // 判断是否是当前页签
                $this.refreshLine();
            }
        });

        // 监听左下角平台的展开收起列表按钮
        $('.JNUdl1Jv').each(function (index, item) {
            var $target = $(this);
            $target.on('click.stepConfig_click_1dWRVXYw_' + $this.uniqueId, function () {
                setTimeout(function () {
                    if ($this.rootDom.offsetWidth > 0) {
                        $this.refreshLine();
                    }
                }, 300);
            });
        });

        // 监听头部页签切换事件_2IuNtC78.hover-theme-fc
        $('._2oSxsI6M.hover-theme-fc').on('click.stepConfig_click_' + this.uniqueId, function () {
            setTimeout(function () {
                if ($this.rootDom.offsetWidth !== 0) {
                    // 判断是否是当前页签
                    $this.refreshLine();
                }
            }, 20);
        });

        if (this.data.type != 1) {
            // 编辑态
            this.changeStatus(this.data.type);
        }
    };

    /*初始化dom*/
    KdOpmcStepConfig.prototype.init_dom = function () {

        var str = '';
        str += '\n             <div class="row row_0">\n                <div class="item item0">\n                    <div class="item-span-left"></div>\n                    <div class="item-main">\n                        <div class="item-main-top-dot"></div>\n                        <div class="item-main-bottom-dot"></div>\n                        <div class="opmc_stepConfig_item-fixed-text">' + this.data.data[0].flowName + '</div>\n                    </div>\n                    <div class="item-span-right"></div>\n                </div>\n            </div>\n        ';

        for (var i = 0; i < this.data.data[0].nodes.length; i++) {
            this.itemIndex++;
            var nodeName = this.data.data[0].nodes[i].nodeName;
            var nodeNameShow = this.data.data[0].nodes[i].nodeName;
            var nodeTypeName = this.data.data[0].nodes[i].nodeTypeName;
            var nodeTypeNameShow = this.data.data[0].nodes[i].nodeTypeName;
            var nodeTypeCode = this.data.data[0].nodes[i].nodeTypeCode;
            var nodeWeight = this.data.data[0].nodes[i].nodeWeight + "%";
            if (nodeName.length > 8) {
                nodeNameShow = nodeName.substring(0, 8) + "...";
            }
            if (nodeTypeName.length > 12) {
                nodeTypeNameShow = nodeTypeName.substring(0, 12) + "...";
            }
            var classType = this.data.data[0].workflowType;
            if (classType == "2" && (nodeTypeCode == "1030_S" || nodeTypeCode == "1040_S")) {
                classType = "1";
            }

            str += '\n                <div class="row row_' + (i + 1) + '">\n                    <div class="item item' + this.itemIndex + '">\n                        <div class="item-span-left"></div>\n                        <div class="item-main">\n                            <div class="item-main-top-dot"></div>\n                            <div class="item-main-bottom-dot"></div>\n                            <div class="opmc_stepConfig_item-main-text">\n                                <div class="nodeClass">\n                                    <div class="mainTextClass" title="' + nodeName + '">' + nodeNameShow + '</div>        \n                                    ' + (classType == '2' ? '<div class="percentClass" title="' + nodeWeight + '">' + nodeWeight + '</div>' : '<div class="percentClass" title="' + nodeWeight + '" hidden>' + nodeWeight + '</div>') + '\n                                    <div class="hideDiv">' + nodeTypeCode + '</div>\n                                </div>\n                                <div class="flexClass">\n                                    <div class="labelClass" title="' + nodeTypeName + '">' + nodeTypeNameShow + '</div>\n                                </div>\n                            </div>\n                        \n                        </div>\n                        <div class="item-span-right">\n                            <div class="opmc_stepConfig_icon-wrap">\n                            ' + (this.data.type != 1 ? '<i class="opmc_stepConfig_icon-del kdfont kdfont-shanchu" title="' + this.langText_delete + '"></i>' : '') + '\n                            ' + (this.data.type != 1 ? '<i class="opmc_stepConfig_icon-copy kdfont kdfont-fuzhidaima" title="' + this.langText_copy + '"></i>' : '') + '                        \n                            </div>\n                        </div>\n                        \n            ';

            str += '</div></div>';
        }

        str += '\n             <div class="row row_' + (this.data.data[0].nodes.length + 1) + '">\n                <div class="item item' + ++this.itemIndex + '">\n                    <div class="item-span-left"></div>\n                    <div class="item-main">\n                        <div class="item-main-top-dot"></div>\n                        <div class="item-main-bottom-dot"></div>\n                        <div class="opmc_stepConfig_item-fixed-text">' + this.langText_end + '</div>\n                    </div>\n                    <div class="item-span-right"></div>\n                </div>\n            </div>\n        ';

        this.dom_container.innerHTML = str;
    };

    /*
    * 改变状态（由后端调用）
    * */
    KdOpmcStepConfig.prototype.refreshStatus = function (status) {
        if (this.data.type !== status) {
            this.data.type = status;
            this.changeStatus(status);
        }
    };

    /*
    * 动态事件的绑定与解绑：0编辑态，1查看态 2新增态
    * */
    KdOpmcStepConfig.prototype.changeStatus = function (status) {
        var $this = this;
        if (status !== 1) {
            $('.item-main, .item-span-right', $this.rootDom).on({
                'mouseenter.showIcon': function mouseenterShowIcon() {
                    $('.opmc_stepConfig_icon-wrap', this.parentElement).css('display', 'block');
                },
                'mouseleave.showIcon': function mouseleaveShowIcon() {
                    $('.opmc_stepConfig_icon-wrap', this.parentElement).css('display', 'none');
                }
            });
        } else {
            // 高级设置弹窗样式改为不可编辑：
            // $('.opmc_stepConfig_senior-dialog', $this.rootDom).addClass('opmc_stepConfig_senior-dialog-disabled');
            $(document).off('keyup.stepConfig_keyup_' + this.uniqueId);
            $($this.dom_container).off('dblclick');
            $('.opmc_stepConfig_span-top-bottom', $this.rootDom).off();
            // $('.opmc_stepConfig_svg-wrap', $this.rootDom).off();
            $('.item', $this.rootDom).off();
            // $('.step-item', $this.rootDom).off();
            $('.opmc_stepConfig_item-main-text', $this.rootDom).off();
            $('.opmc_stepConfig_svg-group', $this.rootDom).off();
            // $('.opmc_stepConfig_item-input').prop('draggable', false);
            $('.item-main', $this.rootDom).off('mouseenter.showIcon');
            $('.item-main', $this.rootDom).off('mouseleave.showIcon');
        }
    };

    /*
    * 如果行是空的则删除行并调整行序号，并返回是否删除了行
    * */
    KdOpmcStepConfig.prototype.delEmptyRow = function (dom_oldRow, rowNum) {
        // let rowNum = dom_oldRow.className.split(' ')[1];
        // rowNum = Number(rowNum.split('_')[1]);
        if (dom_oldRow.innerHTML.trim() === '') {
            var nodeRowClass = ".row_" + rowNum;
            var $dom_curRow = $(nodeRowClass, this.rootDom);
            // 删除该行：
            // dom_oldRow.parentNode.removeChild(dom_oldRow);
            $dom_curRow.remove();
            // 行className调整：
            var dom_nextRow = this.rootDom.querySelector('.row_' + (rowNum + 1));
            while (dom_nextRow) {
                dom_nextRow.className = 'row row_' + rowNum;
                rowNum++;
                dom_nextRow = this.rootDom.querySelector('.row_' + (rowNum + 1));
            }
            return true;
        }
        return false;
    };

    /*
    * 刷新连线（阶段+子步骤）
    * dom_curRow: 目标行（原生dom）
    * dom_oldRow: 原始行（原生dom）
    * isChangeRowHeight：是否改变了行的高度
    * */
    KdOpmcStepConfig.prototype.refreshLine = function () {
        var dom_allPhase = this.dom_container.querySelectorAll('.item');
        var dom_allStep = this.dom_container.querySelectorAll('.step-item');
        var arrItem = [].concat(_toConsumableArray(dom_allPhase), _toConsumableArray(dom_allStep));

        // 先删除线：
        this.itemDisconnect();
        // 再重新连线：
        var lineStr = this.itemConnect(arrItem);
        $(this.dom_container).append(lineStr);

        this.showLastBtn();
    };

    /*
    * 1.传具体的item；2.不传表示删除全部
    * */
    KdOpmcStepConfig.prototype.itemDisconnect = function (arrItem) {
        if (arrItem) {
            for (var i = 0; i < arrItem.length; i++) {
                var itemClass = arrItem[i].className.split(' ')[1];
                $('.svg-' + itemClass, this.dom_container).remove();
            }
        } else {
            $('.opmc_stepConfig_svg-wrap', this.dom_container).remove();
        }
    };

    /*组织连线的HTML语句*/
    KdOpmcStepConfig.prototype.itemConnect = function (dow_items) {
        var $this = this;
        var lineStr = '';
        var arrRestStr = []; // 缓存需要后加载的线

        for (var i = 0; i < dow_items.length; i++) {
            var item = dow_items[i];
            var itemType = $(item).hasClass('item') ? 0 : 1; //0表示阶段，1表示步骤
            var main = $('.item-main', item);
            var bottomDot = $('.item-main-bottom-dot', main);
            var startPosition = $this.getPosition(bottomDot[0], $this.dom_container);
            if (itemType === 1) startPosition.left -= 100; // 因为步骤是绝对定位的，所以计算距离时会出现错误，多加了自身宽度的一半，所以减去100（定死）

            // 获取下一行元素：
            var curRow = item.parentElement;
            var nextRow = curRow.nextElementSibling;
            if ($(nextRow).hasClass('row')) {
                var svgWidth_default = 60; // todo 如果需要修改SVG的宽度的话，修改这个值
                var newRow_firstItem = nextRow.firstElementChild;
                var newRow_main = $('.item-main', newRow_firstItem);
                var newRow_topDot = $('.item-main-top-dot', newRow_main);
                var endPosition = $this.getPosition(newRow_topDot[0], $this.dom_container);
                if (itemType === 1) endPosition.left -= 100; // 因为步骤是绝对定位的，所以计算距离时会出现错误，多加了自身宽度的一半，所以减去100（定死）

                var curItemNum = item.className.split(' ')[1];
                var nextItemNum = newRow_firstItem.className.split(' ')[1];

                var svgWidth = Math.abs(endPosition.left - startPosition.left) + svgWidth_default; // 加10是因为箭头宽度为10
                var svgHeight = endPosition.top - startPosition.top;
                var svgTop = startPosition.top;
                var svgLeft = endPosition.left > startPosition.left ? startPosition.left - svgWidth_default / 2 : endPosition.left - svgWidth_default / 2;

                if (endPosition.left > startPosition.left) {
                    lineStr += '\n            <svg class="opmc_stepConfig_svg-wrap svg-' + curItemNum + ' svg-' + nextItemNum + '" version="1.1" xmlns="http://www.w3.org/2000/svg" style="top:' + svgTop + 'px;left:' + svgLeft + 'px;width:' + svgWidth + 'px;height:' + svgHeight + 'px; z-index:' + (itemType === 1 ? 1010 : 0) + '">\n                <g class="opmc_stepConfig_svg-group" stroke-width="1">\n                    <rect class="opmc_stepConfig_svg-rect" rx="2" ry="2" x="0" y="' + (svgHeight / 2 - 16) + '" width="' + svgWidth_default + '" height="32" style="display:none;fill:rgba(255, 95, 31, 0.08);stroke-width:1;stroke:#FF5F1F;stroke-dasharray:2,2;"/>\n                    <polyline points="' + svgWidth_default / 2 + ',0 ' + svgWidth_default / 2 + ',' + svgHeight / 2 + ' ' + (svgWidth - svgWidth_default / 2) + ',' + svgHeight / 2 + ' ' + (svgWidth - svgWidth_default / 2) + ',' + svgHeight + '" style="fill:#212121;stroke: #fff; stroke-width: ' + svgWidth_default + ';opacity:0"/>\n                    <polyline points="' + svgWidth_default / 2 + ',0 ' + svgWidth_default / 2 + ',' + svgHeight / 2 + ' ' + (svgWidth - svgWidth_default / 2) + ',' + svgHeight / 2 + ' ' + (svgWidth - svgWidth_default / 2) + ',' + svgHeight + '" style="fill:white;stroke: #B9BBBD"/>\n                    <polyline points="' + (svgWidth - svgWidth_default / 2 - 4) + ',' + (svgHeight - 5) + ' ' + (svgWidth - svgWidth_default / 2) + ',' + svgHeight + ' ' + (svgWidth - svgWidth_default / 2 + 4) + ',' + (svgHeight - 5) + '" style="fill:#B9BBBD;;stroke: #B9BBBD"/>';
                    // 查看态，步骤，或者开始阶段不需要新增按钮：
                    if (this.data.type != 1 && itemType === 0) lineStr += '<use class="add-btn" x="' + svgWidth_default / 2 + '" y="' + svgHeight / 2 + '"  xlink:href="#opmc_stepConfig_g1"><title>' + this.langText_add + '</title></use>';
                    lineStr += '</g></svg>';
                } else {
                    // 先连从左到右的线，从右到左的线先存起来（因为svg的特性：后面svg的层级会覆盖前面的，导致前面的选中不了）：
                    var strTemp = '';
                    strTemp += '\n            <svg class="opmc_stepConfig_svg-wrap svg-' + curItemNum + ' svg-' + nextItemNum + '" version="1.1" xmlns="http://www.w3.org/2000/svg" style="top:' + svgTop + 'px;left:' + svgLeft + 'px;width:' + svgWidth + 'px;height:' + svgHeight + 'px; z-index:' + (itemType === 1 ? 1010 : 0) + '">\n                <g class="opmc_stepConfig_svg-group" stroke-width="1">\n                    <rect class="opmc_stepConfig_svg-rect" rx="2" ry="2" x="0" y="' + (svgHeight / 2 - 16) + '" width="' + svgWidth_default + '" height="32" style="display:none;fill:rgba(255, 95, 31, 0.08);stroke-width:1;stroke:#FF5F1F;stroke-dasharray:2,2;"/>\n                    <polyline points="' + (svgWidth - svgWidth_default / 2) + ',0 ' + (svgWidth - svgWidth_default / 2) + ',' + svgHeight / 2 + ' ' + svgWidth_default / 2 + ',' + svgHeight / 2 + ' ' + svgWidth_default / 2 + ',' + svgHeight + '" style="fill:#212121;stroke: #fff; stroke-width: ' + svgWidth_default + ';opacity:0"/>\n                    <polyline points="' + (svgWidth - svgWidth_default / 2) + ',0 ' + (svgWidth - svgWidth_default / 2) + ',' + svgHeight / 2 + ' ' + svgWidth_default / 2 + ',' + svgHeight / 2 + ' ' + svgWidth_default / 2 + ',' + svgHeight + '" style="fill:white;stroke: #B9BBBD"/>\n                    <polyline points="' + (svgWidth_default / 2 - 4) + ',' + (svgHeight - 5) + ' ' + svgWidth_default / 2 + ',' + svgHeight + ' ' + (svgWidth_default / 2 + 4) + ',' + (svgHeight - 5) + '" style="fill:#B9BBBD;stroke: #B9BBBD"/>';

                    if (this.data.type != 1 && itemType === 0) strTemp += '<use class="add-btn" x="' + (svgWidth - svgWidth_default / 2) + '" y="' + svgHeight / 2 + '"  xlink:href="#opmc_stepConfig_g1"><title>' + this.langText_add + '</title></use>';
                    strTemp += '</g></svg>';

                    arrRestStr.push(strTemp);
                }
            }
        }

        // 加载被缓存的线:
        for (var _i = arrRestStr.length - 1; _i >= 0; _i--) {
            lineStr += arrRestStr[_i];
        }

        return lineStr;
    };

    /*刷新线的事件*/
    KdOpmcStepConfig.prototype.refreshLineEvent = function () {
        var $this = this;

        if (this.data.type != 1) {
            // // 先解绑，再重新绑定事件：
            $('.opmc_stepConfig_svg-group', this.rootDom).off('mouseenter');
            $('.opmc_stepConfig_svg-group', this.rootDom).off('mouseleave');
            $('.opmc_stepConfig_svg-wrap', this.rootDom).off('dragover');
            $('.opmc_stepConfig_svg-wrap', this.rootDom).off('dragleave');
            $('.opmc_stepConfig_svg-wrap', this.rootDom).off('drop');
        }
    };

    /*点击事件，区分点击的是阶段还是步骤*/
    KdOpmcStepConfig.prototype.clickHandle = function (target) {
        var $this = this;
        // 判断目标的类名来区分具体的事件：
        if (typeof target.className === 'string') {
            switch (target.className) {
                case 'opmc_stepConfig_item-main-text':
                    // 点击节点
                    if ($(target).hasClass('item-main-active')) return; //当前已选中，不重复执行
                    $('.opmc_stepConfig_item-main-text', $this.dom_container).removeClass('item-main-active');
                    $('.nodeClass', $this.dom_container).removeClass('nodeClassActive');
                    $(target).addClass('item-main-active');
                    $('.nodeClass', target).addClass('nodeClassActive');
                    $this.nodeClick(target);
                    break;
                case 'nodeClass':
                case 'flexClass':
                    if ($(target.parentElement).hasClass('item-main-active')) return; //当前已选中，不重复执行                
                    $('.opmc_stepConfig_item-main-text', $this.dom_container).removeClass('item-main-active');
                    $('.nodeClass', $this.dom_container).removeClass('nodeClassActive');
                    $(target.parentElement).addClass('item-main-active');
                    $('.nodeClass', target.parentElement).addClass('nodeClassActive');
                    $this.nodeClick(target.parentElement);
                    break;
                case 'mainTextClass':
                case 'labelClass':
                case 'percentClass':
                    if ($(target.parentElement.parentElement).hasClass('item-main-active')) return; //当前已选中，不重复执行
                    // 添加定时器用于解决双击时也会触发单机事件的问题
                    clearTimeout($this.timer);
                    // $this.timer = setTimeout(function () {
                    $('.opmc_stepConfig_item-main-text', $this.dom_container).removeClass('item-main-active');
                    $('.nodeClass', $this.dom_container).removeClass('nodeClassActive');
                    $(target.parentElement.parentElement).addClass('item-main-active');
                    $('.nodeClass', target.parentElement.parentElement).addClass('nodeClassActive');
                    $this.nodeClick(target.parentElement.parentElement);
                    break;
                case 'opmc_stepConfig_icon-copy kdfont kdfont-fuzhidaima':
                    // 复制按钮
                    $this.addPhaseClick(target, "copy");
                    break;
                case 'opmc_stepConfig_icon-del kdfont kdfont-shanchu':
                    // 删除按钮
                    if ($this.delResp) {
                        $('.opmc_stepConfig_item-main-text', $this.dom_container).removeClass('item-main-active');
                        $('.nodeClass', $this.dom_container).removeClass('nodeClassActive');
                        $('.opmc_stepConfig_item-main-text', target.parentElement.parentElement).addClass('item-main-active');
                        $('.nodeClass', target.parentElement.parentElement).addClass('nodeClassActive');
                        $this.delEvent(target);
                    }
                    // else{
                    //     setTimeout(function () {
                    //         $this.delResp = true;
                    //     }, 3000);
                    // }  
                    break;
                case 'opmc_stepConfig_item-fixed-text':
                    //流程开始和结束节点
                    break;
                default:
                    // $('.opmc_stepConfig_item-main-text', $this.dom_container).removeClass('item-main-active');
                    // $('.nodeClass', $this.dom_container).removeClass('nodeClassActive');
                    $this.blankClick();
            }
        } else if (target.className && target.className.baseVal === 'add-btn') {
            // svg的dom比较特别，target.className是个对象
            $this.addPhaseClick(target, "add");
        }
        // ie兼容svg
        else if ((!!window.ActiveXObject || "ActiveXObject" in window) && !target.className) {
            var curSvg = event.target.correspondingUseElement;
            if (curSvg.className.baseVal == "add-btn") {
                $this.addPhaseClick(curSvg, "add");
            }
        }
    };

    /*
    * target: 点击选中节点的原生dom
    * */
    KdOpmcStepConfig.prototype.nodeClick = function (target) {
        var dom_curRow = target.parentElement.parentElement.parentElement;
        var curRowClass = dom_curRow.className.split(' ')[1];
        var curRowNum = Number(curRowClass.split('_')[1]);
        var lastRow = $(".row:last", this.rootDom);
        var lastRowClass = lastRow[0].className.split(' ')[1];
        var lastRowNum = Number(lastRowClass.split('_')[1]);
        var data = {
            operate: "click",
            type: this.data.type,
            checked: this.data.data[0].flowSeq + "," + curRowNum,
            data: [{
                flowSeq: this.data.data[0].flowSeq,
                nodes: [{
                    nodeSeq: curRowNum,
                    isLast: lastRowNum - 1 === curRowNum
                }]
            }]
        };
        this.model.invoke("click", data);
    };

    /*
    * 点击空白区域
    * */
    KdOpmcStepConfig.prototype.blankClick = function () {
        var data = {
            operate: "click",
            type: this.data.type,
            checked: null,
            data: []
        };
        this.model.invoke("click", data);
    };

    KdOpmcStepConfig.prototype.reBuildLine = function () {
        var $this = this;
        setTimeout(function () {
            $this.refreshLine();
        }, 20);
    };

    /*
    * target: 新增节点按钮的原生dom
    * key: 新增还是复制
    * */
    KdOpmcStepConfig.prototype.addPhaseClick = function (target, key) {
        var $this = this;
        var dom_curRow = null;
        if (key === "add") {
            // let svgClass = target.parentElement.parentElement.className.baseVal;
            var svgClass = target.parentElement ? target.parentElement.parentElement.className.baseVal : target.parentNode.parentNode.className.baseVal;
            var startItemClass = svgClass.split(' ')[1].split('-')[1];
            dom_curRow = this.dom_container.querySelector('.' + startItemClass, this.rootDom).parentElement;
        } else {
            dom_curRow = target.parentElement.parentElement.parentElement.parentElement;
        }

        var curRowClass = dom_curRow.className.split(' ')[1];
        var curRowNum = Number(curRowClass.split('_')[1]);

        var lastRow = $(".row:last", this.rootDom);
        var lastRowClass = lastRow[0].className.split(' ')[1];
        var lastRowNum = Number(lastRowClass.split('_')[1]);
        if (lastRowNum < 16) {
            if ($this.addResp) {
                var data = {
                    operate: key,
                    type: this.data.type,
                    checked: this.data.data[0].flowSeq + "," + curRowNum,
                    data: [{
                        flowSeq: this.data.data[0].flowSeq,
                        nodes: [{
                            nodeSeq: curRowNum,
                            isLast: lastRowNum - 1 === curRowNum
                        }]
                    }]
                };
                // 发送添加请求，设置响应未false
                $this.addResp = false;
                this.model.invoke(key, data);
            }
            // else{
            //     setTimeout(function () {
            //         $this.addResp = true;
            //     }, 3000);
            // }
        } else {
            this.myTool.message({
                type: 'error',
                message: '' + this.langText_message1
            });
        }

        // todo 以下是测试代码
        // let data = [{
        //     // phase: new Date().getTime(),
        //     // del: true,
        //     // phaseId: '10%',
        //     // phaseType: '同事',

        //     nodeSeq: 1,   //传递新增或复制之后的节点下标
        //     nodeName: "同级互相评估",
        //     nodeTypeName: "同事",
        //     nodeWeight: 10,
        //     isLast: false

        // }];
        // this.addPhase_inner(curRowNum, data);
    };

    /*新增节点*/
    KdOpmcStepConfig.prototype.addPhase_inner = function (position, data, workflowType) {
        var $this = this;
        var dom_curRow = this.dom_container.querySelector('.row_' + (position - 1));
        var rowNum = position; // 需要调整行序号的行

        $this.itemIndex++;
        // 行className调整：
        var dom_nextRow = this.rootDom.querySelector('.row_' + rowNum);
        while ($(dom_nextRow).hasClass('row')) {
            dom_nextRow.className = 'row row_' + (rowNum + 1);
            rowNum++;
            dom_nextRow = dom_nextRow.nextElementSibling;
        }
        // 节点名称太长省略号提示
        var nodeName = data[0].nodeName;
        var nodeNameShow = data[0].nodeName;
        var nodeTypeName = data[0].nodeTypeName;
        var nodeTypeNameShow = data[0].nodeTypeName;
        if (nodeName.length > 8) {
            nodeNameShow = nodeName.substring(0, 8) + "...";
        }
        if (nodeTypeName.length > 12) {
            nodeTypeNameShow = nodeTypeName.substring(0, 12) + "...";
        }
        var classType = workflowType;
        if (classType == "2" && (data[0].nodeTypeCode == "1030_S" || data[0].nodeTypeCode == "1040_S")) {
            classType = "1";
        }
        var str = '\n                <div class="row row_' + position + '">\n                    <div class="item item' + this.itemIndex + '">\n                        <div class="item-span-left"></div>\n                        <div class="item-main">\n                            <div class="item-main-top-dot"></div>\n                            <div class="item-main-bottom-dot"></div>\n                            <div class="opmc_stepConfig_item-main-text">\n                                <div class="nodeClass">\n                                    <div class="mainTextClass" title="' + nodeName + '">' + nodeNameShow + '</div>\n                                    ' + (classType == '2' ? '<div class="percentClass" title="' + data[0].nodeWeight + '%">' + data[0].nodeWeight + '%</div>' : '<div class="percentClass" title="' + data[0].nodeWeight + '%" hidden>' + data[0].nodeWeight + '%</div>') + '\n                                    <div class="hideDiv">' + data[0].nodeTypeCode + '</div>\n                                </div>\n                                <div class="flexClass">\n                                    <div class="labelClass" title="' + nodeTypeName + '">' + nodeTypeNameShow + '</div>\n                                </div>\n                               \n                            </div>                        \n                        </div>\n                        <div class="item-span-right">\n                            <div class="opmc_stepConfig_icon-wrap">\n                            <i class="opmc_stepConfig_icon-del kdfont kdfont-shanchu" title="' + this.langText_delete + '"></i>\n                            <i class="opmc_stepConfig_icon-copy kdfont kdfont-fuzhidaima" title="' + this.langText_copy + '"></i>                        \n                            </div>\n                        </div>\n                    \n         ';

        str += '</div></div>';

        $(dom_curRow).after(str);

        var $dom_newRow = $('.row_' + position, this.rootDom);

        setTimeout(function () {
            $this.refreshLine();
            $this.refreshLineEvent();
        }, 20);

        // 请求返回，添加节点成功
        $this.addResp = true;

        // let newNode = {
        //     nodeSeq:position,
        //     nodeName:data[0].nodeName,
        //     nodeTypeName:data[0].nodeTypeName,
        //     nodeWeight:data[0].nodeName,
        //     isLast:data[0].isLast            
        // };
        // $this.data.data[0].nodes.splice(position - 1, 0, newNode);


        $('.item-main, .item-span-right', $dom_newRow).on({
            'mouseenter.showIcon': function mouseenterShowIcon() {
                $('.opmc_stepConfig_icon-wrap', this.parentElement).css('display', 'block');
            },
            'mouseleave.showIcon': function mouseleaveShowIcon() {
                $('.opmc_stepConfig_icon-wrap', this.parentElement).css('display', 'none');
            }
        });

        // 输入框失焦事件：
        var $dom_phaseInput = $('.opmc_stepConfig_item-main-text', $dom_newRow);
        $dom_phaseInput.on('blur', function () {
            // $this.modifyName_confirm(this)
        });

        //高亮新增的这个阶段：
        // $this.clickHandle($dom_phaseInput[0]);
        $('.opmc_stepConfig_item-main-text', $this.dom_container).removeClass('item-main-active');
        $dom_phaseInput.addClass('item-main-active');
        // $('.opmc_stepConfig_item-main-text', $this.dom_container).removeClass('item-main-active');
        $('.nodeClass', $this.dom_container).removeClass('nodeClassActive');
        // $('.opmc_stepConfig_item-main-text', target.parentElement.parentElement).addClass('item-main-active');
        $('.nodeClass', $dom_phaseInput).addClass('nodeClassActive');
    };

    /* 修改节点 */
    KdOpmcStepConfig.prototype.editphase = function (position, data, workflowType) {
        var rowName = ".row_" + position;
        var nodeClass = rowName + " .nodeClass";
        var mainTextClass = rowName + " .mainTextClass";
        var labelClass = rowName + " .labelClass";
        var codeClass = rowName + " .hideDiv";
        var percentClass = rowName + " .percentClass";
        var nodeName = data.nodeName;
        var nodeTypeName = data.nodeTypeName;
        if (nodeName.length > 8) {
            nodeName = nodeName.substring(0, 8) + "...";
        }
        if (nodeTypeName.length > 12) {
            nodeTypeName = nodeTypeName.substring(0, 12) + "...";
        }
        $(mainTextClass, this.rootDom).text(nodeName);
        $(mainTextClass, this.rootDom).attr("title", data.nodeName);
        $(labelClass, this.rootDom).text(nodeTypeName);
        $(labelClass, this.rootDom).attr("title", data.nodeTypeName);
        $(codeClass, this.rootDom).text(data.nodeTypeCode);
        if (workflowType == 2) {
            if (data.nodeTypeCode == "1030_S" || data.nodeTypeCode == "1040_S") {
                // $(nodeClass, this.rootDom).removeClass('nodeClass2');
                // $(nodeClass, this.rootDom).addClass('nodeClass1');
                // $(mainTextClass, this.rootDom).removeClass('mainTextClass');
                // $(mainTextClass, this.rootDom).addClass('mainTextClass1');
                $(percentClass, this.rootDom).hide();
            } else {
                // $(nodeClass, this.rootDom).removeClass('nodeClass1');
                // $(nodeClass, this.rootDom).addClass('nodeClass');
                // $(mainTextClass, this.rootDom).removeClass('mainTextClass1');
                // $(mainTextClass, this.rootDom).addClass('mainTextClass');

                $(percentClass, this.rootDom).text(data.nodeWeight + "%");
                $(percentClass, this.rootDom).attr("title", data.nodeWeight + "%");
                $(percentClass, this.rootDom).show();
            }
        }
        if (data.isLast) {
            this.showLastBtn(data.nodeTypeCode);
        }
    };

    /* 审核节点隐藏添加复制按钮 */
    KdOpmcStepConfig.prototype.showLastBtn = function (code) {
        if (this.data.data[0].workflowType == '1') {
            return;
        }
        var lastItem = $(".item:last", this.rootDom);
        var lastItemClass = lastItem[0].className.split(' ')[1];
        var lastRow = $(".row:last", this.rootDom);
        var lastRowClass = lastRow[0].className.split(' ')[1];
        var lastRowNum = Number(lastRowClass.split('_')[1]);
        if (!code) {
            var codeClass = ".row_" + (lastRowNum - 1) + " .hideDiv";
            code = $(codeClass, this.rootDom).text();
        }
        //审核节点隐藏添加和复制按钮
        var addBtnClass = ".svg-" + lastItemClass + " .add-btn";
        var copyBtnClass = ".row_" + (lastRowNum - 1) + " .opmc_stepConfig_icon-copy";
        // 审核节点类型值70
        if (code == "1040_S") {
            $(addBtnClass, this.rootDom).hide();
            $(copyBtnClass, this.rootDom).hide();
        } else {
            $(addBtnClass, this.rootDom).show();
            $(copyBtnClass, this.rootDom).show();
        }
    };

    /*
    * target: 删除icon的原生dom
    * */
    KdOpmcStepConfig.prototype.delEvent = function (target) {
        var $this = this;
        var $dom_curItem = $(target.parentElement.parentElement.parentElement, this.rootDom);
        var phaseValue = $('.mainTextClass', $dom_curItem).text();
        var dom_phaseRow = $dom_curItem[0].parentElement;
        var curRowClass = dom_phaseRow.className.split(' ')[1];
        var curRowNum = Number(curRowClass.split('_')[1]);
        var lastRow = $(".row:last", $this.rootDom);
        var lastRowClass = lastRow[0].className.split(' ')[1];
        var lastRowNum = Number(lastRowClass.split('_')[1]);

        if (lastRowNum > 2) {
            this.myTool.confirmDialog({
                text: this.langText_deleteConfirm + phaseValue + this.langText_warn1,
                showTitle: true,
                showImg: true,
                showBtn: true,
                title: '操作确认',
                img: $this.KDApi.getNameSpace($this.model) + 'images/delete.png',
                confirmBtn: this.langText_confirm,
                cancelBtn: this.langText_cancel,
                confirmCallback: function confirmCallback() {

                    var data = {
                        operate: "delete",
                        type: $this.data.type,
                        checked: "1," + curRowNum,
                        data: [{
                            flowSeq: 1,
                            nodes: [{
                                nodeSeq: curRowNum,
                                isLast: lastRowNum - 1 === curRowNum
                            }]
                        }]
                    };
                    $this.delResp = false;
                    $this.model.invoke("delete", data);
                },
                cancelCallback: function cancelCallback() { }
            });
        } else {
            this.myTool.message({
                type: 'error',
                message: '' + this.langText_lessNodeMessage
            });
        }
    };

    /*
    * target: 删除icon的原生dom
    * */
    KdOpmcStepConfig.prototype.deleteNode = function (data) {
        // 该删除操作推入栈：
        // $this.stack.push({
        // type: 'delPhase',
        // phasePosition: curRowNum - 1,
        // data: $this.data.data[curRowNum - 1]
        // });
        var $this = this;
        if (!data.flag) {
            //收到响应
            $this.delResp = true;
            return;
        }
        var len = data.checked.length;
        var flowSeq = Number(data.checked.substring(0, 1));
        var nodeSeq = Number(data.checked.substring(2, len));
        // 删除数据：
        // $this.data.data[flowSeq-1].nodes.splice(nodeSeq - 1, 1);

        var nodeClass = ".row_" + nodeSeq + "> .item";
        var $dom_curItem = $(nodeClass, this.rootDom);
        var dom_phaseRow = $dom_curItem[0].parentElement;
        // 删除当前阶段：
        $dom_curItem.remove();
        // $this.itemIndex--;
        // 删除空的行：
        var result = $this.delEmptyRow(dom_phaseRow, nodeSeq);
        //收到响应
        $this.delResp = true;
        // 刷新连线：
        $this.refreshLine();
        $this.refreshLineEvent();
    };

    /*获取一个元素到目标元素的距离*/
    KdOpmcStepConfig.prototype.getPosition = function (node, targetNode) {
        var left = node.offsetLeft - node.scrollLeft;
        var top = node.offsetTop - node.scrollTop;
        var parent = node.offsetParent;
        while (parent && parent !== targetNode) {
            left += parent.offsetLeft - parent.scrollLeft;
            top += parent.offsetTop - parent.scrollTop;
            parent = parent.offsetParent;
        }
        return { "left": left, "top": top };
    };

    /*判断被拖拽的元素是否允许拖拽*/
    //  KdOpmcStepConfig.prototype.moveLegal = function (moveType, tempData, phaseIndex) {
    //     let index = Number.MIN_SAFE_INTEGER;
    //     if (moveType === 'phase') {
    //         for (let i = 0; i < tempData.length; i++) {
    //             for (let j = 0; j < tempData[i].steps.length; j++) {
    //                 // 判断是否是预置步骤：
    //                 if (tempData[i].steps[j].syspreset) {
    //                     let curIndex = tempData[i].steps[j].index;
    //                     // 判断index是否是升序排列：
    //                     if (curIndex < index) {
    //                         return false;
    //                     } else {
    //                         index = curIndex;
    //                     }
    //                 }
    //             }
    //         }
    //     } else {
    //         for (let j = 0; j < tempData[phaseIndex].steps.length; j++) {
    //             // 判断是否是预置步骤：
    //             if (tempData[phaseIndex].steps[j].syspreset) {
    //                 let curIndex = tempData[phaseIndex].steps[j].index * 100 + tempData[phaseIndex].steps[j].bitindex;
    //                 // 判断index是否是升序排列：
    //                 if (curIndex < index) {
    //                     return false;
    //                 } else {
    //                     index = curIndex;
    //                 }
    //             }
    //         }
    //     }

    //     return true;
    // }; 

    /*
    * 获取选中阶段、步骤在data中的对应索引
    * target: step-item/item
    * */
    KdOpmcStepConfig.prototype.getDataPosition = function (target) {
        var phaseIndex = null;
        var stepIndex = null;
        var data = null;
        var type = null;
        var $target = $(target);

        if ($target.hasClass('step-item')) {
            // 步骤
            var dom_stepRow = target.parentElement;
            var targetRowClass = dom_stepRow.className.split(' ')[1];
            var stepId = targetRowClass.split('-')[2];
            // 找出该步骤对应的阶段：
            var dom_phaseRow = dom_stepRow.parentElement.parentElement.parentElement;
            var phaseRowClass = dom_phaseRow.className.split(' ')[1];
            var rowNum = Number(phaseRowClass.split('_')[1]);

            for (var i = 0; i < this.data.data[rowNum - 1].steps.length; i++) {
                var objStep = this.data.data[rowNum - 1].steps[i];
                if (objStep.id == stepId) {
                    phaseIndex = rowNum - 1;
                    stepIndex = i;
                    data = objStep;
                    type = 'step';
                    break;
                }
            }
        } else {
            // 阶段
            var _targetRowClass = target.parentElement.className.split(' ')[1];
            phaseIndex = Number(_targetRowClass.split('_')[1]) - 1;
            data = this.data.data[phaseIndex];
            type = 'phase';
        }

        return { type: type, phaseIndex: phaseIndex, stepIndex: stepIndex, data: data };
    };

    window.KdOpmcStepConfig = KdOpmcStepConfig;
})();