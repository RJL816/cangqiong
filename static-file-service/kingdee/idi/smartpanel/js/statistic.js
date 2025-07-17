//创建数据统计
function Statistic(data, myComponent){
	this.data = data;
	this.myComponent = myComponent;
	
	//创建数据统计内容
	this.initStatistic = function(cardDom, isLast){
		//创建外部容器
		var wrapperDom = document.createElement('div');
		wrapperDom.className = "smart-panel-statistic";
		//创建标题
		var titleDom = this.createTitle(this.data.title);
		wrapperDom.appendChild(titleDom);
		//创建表格容器
		var tableWrapperDom = document.createElement('div');
		tableWrapperDom.className = "smart-panel-tablewrapper";
		wrapperDom.appendChild(tableWrapperDom);
			//判断表格是否存在表格标题
		if(this.data.table){
			//存在则是表格结构，创建表格标题
				//创建表格内容
			this.createTable(this.data.headList, this.data.tableData, tableWrapperDom);
		}else{
			//卡片模式，直接创建表格行
			this.createCard(this.data.tableData, tableWrapperDom);
			if(!isLast){
				tableWrapperDom.style.cssText = "border-bottom: 1px solid #E5E5E5;";
			}
		}
		cardDom.appendChild(wrapperDom);
	};
	//表格结构，创建表格
	this.createTable = function(titles, tableData, parentDom){
		//创建表格标题
		// var widthClass = this.getCellWidth(titles.length);
		var widthClass = " smart-panel-table-item";
		if(titles && titles.length){
			var tableTitleWrapperDom = document.createElement('div');
			tableTitleWrapperDom.className = "smart-panel-tabletitlewrapper";
			for(var i=0; i<titles.length; i++){
				var titleDom = document.createElement('div');
				titleDom.innerText = titles[i];
				titleDom.title = titles[i];
				titleDom.className = i > 0 ? "smart-panel-tabletitle smart-panel-tabletitlesplite"+widthClass:"smart-panel-tabletitle"+widthClass;
				tableTitleWrapperDom.appendChild(titleDom);
			}
			parentDom.appendChild(tableTitleWrapperDom);
		}
		//创建表格内容
		if(tableData && tableData.length){
			var tableDataWrapperDom = document.createElement('div');
			//非最近一次最近三次分录字段，表格中一屏可以最多展示5行数据不滚动，超过5行才滚动
			// if(tableData.length > 5){
				tableDataWrapperDom.className = "smart-panel-tabledatawrapper";
			// }
			for(var i=0; i<tableData.length; i++){
				var rowData = tableData[i];
				var tableRowDom = document.createElement('div');
				tableRowDom.className = "smart-panel-tabledatarow";
				tableDataWrapperDom.appendChild(tableRowDom);
				for(var j=0; j<rowData.length; j++){
					if(rowData[j] != null && typeof rowData[j] === "object"){
						this.renderHref(rowData[j], tableRowDom, " smart-panel-tablecell" +widthClass);
					}else{
						var tableCellDom = document.createElement('div');
						tableCellDom.innerText = rowData[j];
						tableCellDom.title = rowData[j];
						tableCellDom.className = "smart-panel-tablecell"+widthClass;
						tableCellDom.style.cssText="white-space: normal;text-overflow: ellipsis;overflow: hidden;";
						tableRowDom.appendChild(tableCellDom);
					}
				}
				
			}
			parentDom.appendChild(tableDataWrapperDom);

			// 同步滚动
			tableDataWrapperDom.addEventListener('scroll', function (ev) {
				tableTitleWrapperDom.scrollLeft = ev.target.scrollLeft
			})
			tableTitleWrapperDom.addEventListener('scroll', function (ev) {
				tableDataWrapperDom.scrollLeft = ev.target.scrollLeft
			})
		}
	};
	// this.getCellWidth = function(len){
		// switch(len){
		// 	case 5:
		// 	return " smart-panel-cellwidth5";
		// 	case 4:
		// 	return " smart-panel-cellwidth4";
		// 	case 3:
		// 	return " smart-panel-cellwidth3";
		// 	case 2:
		// 	return " smart-panel-cellwidth2";
		// 	case 1:
		// 	return " smart-panel-cellwidth1";
		// }
	// 	return "";
	// }
	//其他结构 创建卡片
	this.createCard = function(tableData, parentDom){
		if(tableData && tableData.length){
			var tableDataWrapperDom = document.createElement('div');
			tableDataWrapperDom.className = "smart-panel-tabledatacard";
			for(var i=0; i<tableData.length; i++){
				var rowData = tableData[i];
				var tableRowDom = document.createElement('div');
				tableRowDom.className = "smart-panel-tabledatacardrow";
				tableDataWrapperDom.appendChild(tableRowDom);
				
				
				var tableTitleDom = document.createElement('div');
				tableTitleDom.innerText = rowData[0];
				tableTitleDom.title = rowData[0];
				tableTitleDom.className = "smart-panel-tabledatacardtitle";
				tableRowDom.appendChild(tableTitleDom);
				
				if(rowData[1] != null && typeof rowData[1] === "object"){
					this.renderHref(rowData[1], tableRowDom, "smart-panel-tabledatacarddata");
				}else{
					var tableDataDom = document.createElement('div');
					tableDataDom.innerText = rowData[1];
					tableDataDom.title = rowData[1];
					tableDataDom.className = "smart-panel-tabledatacarddata";
					tableRowDom.appendChild(tableDataDom);
				}
			}
			parentDom.appendChild(tableDataWrapperDom);
		}
	};
	//单据跳转
	this.renderHref = function(item,itemDom, widthClass){
			var extenalStyle="";
            var content=item.content;
            var contentDom=document.createElement('DIV');
            contentDom.innerText=content;
            contentDom.title = content;
			
            var cssTextStr=this.myComponent._getCardStyle(item.itemStyle);
			contentDom.setAttribute('param', this.myComponent._encodeParam(item.data));
			contentDom.className=item.data.action == "chatYZJ" ? "smart-panel-body-row-item smart-panel-body-row-item-click smart-panel-chat "+widthClass:"smart-panel-body-row-item smart-panel-body-row-item-click "+widthClass;
			
			cssTextStr+=";color:#2b87f3;cursor:pointer;";
            cssTextStr+=extenalStyle;
            contentDom.style.cssText=cssTextStr;
            itemDom.appendChild(contentDom);
	};
	this.createTitle = function(titleData){
		var rowDom=document.createElement('DIV');
		rowDom.className="smart-panel-body-item-row";
		if(titleData){
			itemDom = document.createElement('DIV');
			itemDom.className = "smart-panel-body-item-name";
			
            var contentDom=document.createElement('DIV');
            contentDom.innerText=titleData;
            contentDom.title = titleData;
            contentDom.className="smart-panel-body-row-item";
			contentDom.style.cssText="color: #333;font-size: 12px;font-weight: bold;";
            itemDom.appendChild(contentDom);
		}
		this.rowStart=this.rowStart+1;
		rowDom.appendChild(itemDom);
		return rowDom;
	};
}