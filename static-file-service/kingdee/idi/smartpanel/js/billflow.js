//上下游单据展示
function BillFlow(data, rowStart,cardNum, myComponent){
	this.data = data;
	this.rowStart = rowStart;
	this.myComponent = myComponent;
	this.cardNum = cardNum;
	this.tableLine = null;
	
	this.initBillFlow=function(cardDom){
		var wrapperDom = document.createElement('div');
		wrapperDom.className = "smart-panel-billflowwrapper"
		//创建标题
		var titleDom = this.createTitle(this.data.title);
		wrapperDom.appendChild(titleDom);
		//创建树结构
		this.tableLine = new TableLine(this.data.tableLineNodeList, this.myComponent);
		var tableDom = this.tableLine.initTable();
		wrapperDom.appendChild(tableDom);
		//加入到卡片
		cardDom.appendChild(wrapperDom);
		return this.rowStart;
	};
	
	//创建标题
	this.createTitle = function(titleData){
		var rowDom=document.createElement('DIV');
		rowDom.className="smart-panel-body-item-row";
		var mainParams={
				rowDom:rowDom,
				itemStyle:titleData.mainStyle,
				className:'name',
				items:titleData.mainDesc,
				flag:this.cardNum+'_'+this.rowStart,
		};
		this.rowStart=this.rowStart+1;
		this.myComponent._createCardRowItem(mainParams);
		return rowDom;
	};
	
	//注册悬浮内容查看“更多”事件
	this.initEvent = function($, parentNode){
		if(this.tableLine){
			this.tableLine.initEvent($, parentNode);
		}
	}
}