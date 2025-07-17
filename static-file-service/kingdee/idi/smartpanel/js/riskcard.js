//创建数据统计
function RiskCard(data, myComponent, modelPath, cardIndex) {
    this.data = data;
    this.myComponent = myComponent;
    this.modelPath = modelPath
    this.cardIndex = cardIndex

        //创建数据统计内容
        this.initRiskCard = function (cardDom, isLast, riskIndex) {
        //创建外部容器
        var wrapperDom = document.createElement('div');
        if (riskIndex == 0) {
            wrapperDom.className = "smart-panel-statistic-risk";
        } else {
            wrapperDom.className = "smart-panel-statistic-risk-hide";
        }

        //创建标题
        var tableData = this.data.tableData;
        var titleDom = this.createTitle(this.data.title, riskIndex, tableData && tableData.length>0);
        wrapperDom.appendChild(titleDom);
        //创建表格容器
        var tableWrapperDom = document.createElement('div');
        tableWrapperDom.className = "smart-panel-tablewrapper";
        wrapperDom.appendChild(tableWrapperDom);
        this.createCard(this.data.tableData, tableWrapperDom, riskIndex);
//        if(!isLast || riskIndex > 0){
//        tableWrapperDom.style.cssText = "border-bottom: 1px solid #E5E5E5;";
//        }
        cardDom.appendChild(wrapperDom);
        if (isLast && riskIndex != 0) {
            //创建外部容器
            var wrapperDom = document.createElement('div');
            //创建表格容器
            var tableWrapperDom = document.createElement('div');
            tableWrapperDom.className = "smart-panel-tablewrapper";
            wrapperDom.appendChild(tableWrapperDom);
            this.createCheckCard(tableWrapperDom);
            cardDom.appendChild(wrapperDom);
        }
    };

    //其他结构 创建 查看 收起卡片
    this.createCheckCard = function (parentDom) {
        var tableDataWrapperDom = document.createElement('div');
        tableDataWrapperDom.id = 'risk-check';
        var tableRowDom = document.createElement('div');
        var middleTableRowDom = document.createElement('div');
        middleTableRowDom.style.cssText = "display: flex;";
        tableRowDom.className = "smart-panel-tabled-risk-check";
        tableDataWrapperDom.appendChild(tableRowDom);
        var tableValueDom = document.createElement('div');

        tableValueDom.innerText = KDApi.getLangMsg(myComponent.model, "展开更多");
        tableValueDom.title = KDApi.getLangMsg(myComponent.model, "展开更多");
        tableValueDom.className = "smart-panel-risk-check";
        var iconWrapper = document.createElement('DIV');
        iconWrapper.className = "smart-panel-risk-image";
        var imgDom = document.createElement('img');
        var iconPath = this.modelPath + './img/cwy_sjdc_xl_14_14.png';
        imgDom.src = iconPath;
        iconWrapper.appendChild(imgDom);
        middleTableRowDom.appendChild(iconWrapper);
        middleTableRowDom.appendChild(tableValueDom);
        tableRowDom.appendChild(middleTableRowDom);
        parentDom.appendChild(tableDataWrapperDom);

        var tableDataWrapperDom = document.createElement('div');
        tableDataWrapperDom.id = 'risk-check-none';
        tableDataWrapperDom.style.cssText = "display: none;";
        var tableRowDom = document.createElement('div');
        var middleTableRowDom = document.createElement('div');
        middleTableRowDom.style.cssText = "display: flex;";
        tableRowDom.className = "smart-panel-tabled-risk-check";
        tableDataWrapperDom.appendChild(tableRowDom);
        var tableValueDom = document.createElement('div');

        tableValueDom.innerText = KDApi.getLangMsg(myComponent.model, "收起更多");
        tableValueDom.title = KDApi.getLangMsg(myComponent.model, "收起更多");
        tableValueDom.className = "smart-panel-risk-check";
        var iconWrapper = document.createElement('DIV');
        iconWrapper.className = "smart-panel-risk-image";
        var imgDom = document.createElement('img');
        var iconPath = this.modelPath + './img/cwy_sjdc_sq_14_14.png';
        imgDom.src = iconPath;
        iconWrapper.appendChild(imgDom);
        middleTableRowDom.appendChild(iconWrapper);
        middleTableRowDom.appendChild(tableValueDom);
        tableRowDom.appendChild(middleTableRowDom);
        parentDom.appendChild(tableDataWrapperDom);
    };

    //其他结构 创建卡片
    this.createCard = function (tableData, parentDom, riskIndex) {
        var tableDataWrapperDom = document.createElement('div');
        tableDataWrapperDom.className = "smart-panel-tabledatacard";
        if (tableData && tableData.length) {
            for (var i = 0; i < tableData.length; i++) {
                var rowData = tableData[i];
                var tableRowDom = document.createElement('div');

                if(riskIndex % 2 == 0){
                 tableRowDom.className = "smart-panel-tabledatacardrow-risk-blue";
                }else{
                 tableRowDom.className = "smart-panel-tabledatacardrow-risk";
                }

                tableDataWrapperDom.appendChild(tableRowDom);

                var tableValueDom = document.createElement('div');
                if(riskIndex % 2 == 0){
                     tableValueDom.className = "smart-panel-riskcardvalue-blue";
                }else{
                    tableValueDom.className = "smart-panel-riskcardvalue";
                }
                var cardValue = rowData.value;
                if (!cardValue || cardValue == "null") {
                      cardValue = KDApi.getLangMsg(myComponent.model, "未查询到指标值");
                      tableRowDom.style.cssText = "border: 1px solid rgba(253,108,106,1);";
                 }
                 var valueType = rowData.valueType;
                 if(valueType && valueType != ""){
                   cardValue = valueType+ ": "+ cardValue;
                 }
                 tableValueDom.innerText = cardValue;
                 tableValueDom.title = cardValue;

                tableRowDom.appendChild(tableValueDom);

                var dim = rowData.dimension;
                if (dim && dim.length) {
                    for (var j = 0; j < dim.length; j++) {
                        var dimData = dim[j];

                        var tableKeyValueDom = document.createElement('div');
                        tableKeyValueDom.className = "smart-panel-riskcardcontainer";
                        tableRowDom.appendChild(tableKeyValueDom);

                        var tableKeyDataDom = document.createElement('div');
                        tableKeyDataDom.innerText = dimData.key;
                        tableKeyDataDom.title = dimData.key;
                        tableKeyDataDom.className = "smart-panel-riskcardvalueleft";
                        tableKeyValueDom.appendChild(tableKeyDataDom);

                        var tableValueDataDom = document.createElement('div');
                        tableValueDataDom.innerText = dimData.value;
                        tableValueDataDom.title = dimData.value;
                        tableValueDataDom.className = "smart-panel-riskcardvalueright";
                        tableKeyValueDom.appendChild(tableValueDataDom);
                    }
                }
            }
        } else {
            var tableRowDom = document.createElement('div');
             if (riskIndex % 2 == 0) {
                 tableRowDom.className = "smart-panel-tabledatacardrow-risk-blue";
             } else {
                 tableRowDom.className = "smart-panel-tabledatacardrow-risk";
             }
             tableRowDom.style.cssText = "border: 1px solid rgba(253,108,106,1);";
            tableDataWrapperDom.appendChild(tableRowDom);
            var tableValueDom = document.createElement('div');
            tableValueDom.innerText = KDApi.getLangMsg(myComponent.model, "未查询到指标值");
            tableValueDom.title = KDApi.getLangMsg(myComponent.model, "未查询到指标值");
            tableValueDom.className = "smart-panel-riskcardvalue";
            tableRowDom.appendChild(tableValueDom);
        }
        parentDom.appendChild(tableDataWrapperDom);
    };

    this.createTitle = function (titleData, riskIndex, haveTableData) {
        if (!this.modelPath) {
            this.modelPath = KDApi.nameSpace(model);
        }
        var rowDom = document.createElement('DIV');
        rowDom.className = "smart-panel-body-item-row";
        if (titleData) {
            itemDom = document.createElement('DIV');
            itemDom.className = "smart-panel-body-item-name";
            var contentDom = document.createElement('DIV');
            contentDom.innerText = titleData;
            contentDom.title = titleData;
            contentDom.className = "smart-panel-body-row-item-risk";
            var iconWrapper = document.createElement('DIV');
            if(riskIndex % 2 == 0){
              iconWrapper.className = "smart-panel-icon-risk-blue";
            }else{
              iconWrapper.className = "smart-panel-icon-risk";
            }

            if (haveTableData) {
                var tableViewDom = document.createElement('DIV');
                tableViewDom.className = 'smart-panel-body-item-table-view';
                tableViewDom.innerText = KDApi.getLangMsg(myComponent.model, "表格视图");
                tableViewDom.setAttribute("data-searchIndex-risk", this.cardIndex);
                tableViewDom.setAttribute("data-riskIndex", riskIndex);
                itemDom.appendChild(tableViewDom);
            }
            itemDom.appendChild(iconWrapper);
            itemDom.appendChild(contentDom);
        }
        this.rowStart = this.rowStart + 1;
        rowDom.appendChild(itemDom);
        return rowDom;
    };
}