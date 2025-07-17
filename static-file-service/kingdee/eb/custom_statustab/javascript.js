/**
 * 触发前端方法
 */
function invokeFrontMethod(model,propData,statusTabApId){
	var frontMethod = propData.frontMethod;
	var dataObject = propData.dataObject;
	if(isNull(dataObject)){
		return;
	}
	var data = dataObject[0];
	var afterOpereateFocusId = dataObject[1];
	
	var callBackData;
	switch (frontMethod) {
		case "initStatusTabs":
			callBackData = initTabs(statusTabApId,data.customcontrolap,afterOpereateFocusId);
			break;
		case "reloadStatusTabs":
			callBackData = reloadTabs(statusTabApId,data,afterOpereateFocusId);
			break;
		case "focusStatusTab":
			callBackData = moveTabItem(statusTabApId,data,afterOpereateFocusId);
			break;	
		case "addStatusTabs":
			callBackData = addTabs(statusTabApId,data,afterOpereateFocusId);
			break;	
		case "delStatusTabs":
			callBackData = deleteTabs(statusTabApId,data,afterOpereateFocusId);
			break;	
		case "updateStatusTabs":
			callBackData = updateTabs(statusTabApId,data,afterOpereateFocusId);
			break;
		default:
			break;	
	}
	console.log("invokeFrontMethod: " + frontMethod);
	
	if (propData.callbackEndMethod) {
		console.log("callbackEndMethod: " + propData.callbackEndMethod);
		if (callBackData) {
			// 加上焦点页签id
			var tabitems = document.getElementById(statusTabApId + ";kingdee-eb-statustab-tabitems");
			var focusTabId = tabitems.attributes.focusTabId && tabitems.attributes.focusTabId.value || null;
			callBackData += ';' + focusTabId;
			// 加上操作标识
			callBackData += ';' + frontMethod;
			model.invoke(propData.callbackEndMethod,callBackData);
			console.log("callBackData: ",callBackData)
		}
	}
} 

/**
 * 初始化页签
 * @param {String} statusTabApId 页签唯一标识
 * @param {CustomStatusTabAp} initTabInfo 页签信息
 * @param {String} focusTabId 操作后选中页签
 */
function initTabs(statusTabApId,initTabInfo,focusTabId){
	// 将样式属性写进tabAp中
	storeTabStyleInfo(statusTabApId,initTabInfo);
	// 是否展示创建页签按钮
	var buttonAddTab = document.getElementById(statusTabApId + ";kingdee-eb-statustab-buttonaddtab");
	buttonAddTab.style.width = initTabInfo.showAddButton ? "auto" : "0px";
	buttonAddTab.style.visibility = initTabInfo.showAddButton ? "visible" : "hidden";
	// 先清空页签项
	var tabitems = document.getElementById(statusTabApId + ";kingdee-eb-statustab-tabitems");
	tabitems.innerHTML = '';
	// 创建页签项
	return addTabs(statusTabApId,initTabInfo.customStatusTabs,focusTabId);
}

/**
 * 重新加载页签
 * @param {String} statusTabApId 页签唯一标识
 * @param {CustomStatusTab} tabs 页签信息
 * @param {String} focusTabId 操作后选中页签
 */
function reloadTabs(statusTabApId,tabs,focusTabId){
	// 先清空页签项
	var tabitems = document.getElementById(statusTabApId + ";kingdee-eb-statustab-tabitems");
	tabitems.innerHTML = '';
	// 重置marginLeft
	tabitems.style.marginLeft = "0px";
	// 创建页签项
	return addTabs(statusTabApId,tabs,focusTabId);
}

/**
 * 移动到某个页签
 * @param {String} statusTabApId 页签唯一标识
 * @param {String} 页签项divId
 */
function moveTabItem(statusTabApId,tabId){
	var tabitemsDiv = document.getElementById(statusTabApId + ";kingdee-eb-statustab-tabitems");
	var tabItemDivId = statusTabApId + ";kingdee-eb-statustab-tabitem;" + tabId;
	var tabItemDiv = document.getElementById(tabItemDivId);
    if(isNull(tabItemDiv)){
		var focusTabIndex = getFocusTabIndex(statusTabApId);
		if(focusTabIndex != null){
			tabItemDiv = tabitemsDiv.children[focusTabIndex];
			tabItemDivId = tabItemDiv.id;
		}else{
			console.log("current tabId [" + tabItemDivId + "] not find tabItemDiv.");
            return;
		}
    }

    var minMarginLeft = getMinMarginLeft(statusTabApId);
    var maxMarginLeft = getMaxMarginLeft();
    var moveFrom = parseInt(isBlank(tabitemsDiv.style.marginLeft) ? 0 : tabitemsDiv.style.marginLeft);
    var moveTo = getMoveToMarginLeft(tabitemsDiv,tabItemDiv,minMarginLeft,maxMarginLeft);

//    if (moveFrom > moveTo) {
//        // 代表整体要向左移
//        var leftMove = setInterval(frame, 1);
//        function frame() {
//            if(moveFrom <= moveTo) {
//                tabitemsDiv.style.marginLeft = moveTo + "px";
//                clearInterval(leftMove);
//            } else {
//				tabitemsDiv.style.marginLeft = moveFrom + "px";
//				moveFrom -= 2000;
//            }
//        }
//    } else if (moveFrom < moveTo){
//        // 代表整体要向右移
//        var rigntMove = setInterval(frame, 1);
//        function frame() {
//            if(moveFrom >= moveTo) {
//                tabitemsDiv.style.marginLeft = moveTo + "px";
//                clearInterval(rigntMove);
//            } else {
//                tabitemsDiv.style.marginLeft = moveFrom + "px";
//				moveFrom += 2000;
//            }
//        }
//    }
	tabitemsDiv.style.marginLeft = moveTo + "px";
    return focusTab(tabItemDiv);
}

/**
 * 批量创建页签
 * @param {String} statusTabApId 页签唯一标识
 * @param {CustomStatusTab[]} tabs 页签项
 * @param {String} focusTabId 操作后选中页签
 */
function addTabs(statusTabApId,tabs,focusTabId){
	if (!isNull(tabs) && tabs.length > 0) {
		var attributes = document.getElementById(statusTabApId + ";kingdee-eb-statustab-tabap").attributes;
		var tabNameMaxWidth = attributes.tabNameMaxWidth.value;
		var tabStatusMaxWidth = attributes.tabStatusMaxWidth.value;

		var tabitems = document.getElementById(statusTabApId + ";kingdee-eb-statustab-tabitems");
		for (let tab of tabs) {
			var newTabDiv = getNewTabItemDiv(statusTabApId,tab,tabNameMaxWidth,tabStatusMaxWidth);
			tabitems.appendChild(newTabDiv);
		}
		
		// 移动到指定页签
		moveTabItem(statusTabApId,focusTabId);
		// 更新搜索框
		loadSearchDivTabItems(statusTabApId);
	}
	// 返回页签信息
	return getTabsInfoJson(statusTabApId);	
}

/**
 * 批量删除页签
 * @param {String} statusTabApId 页签唯一标识
 * @param {Set[]} tabIds 页签ids
 * @param {String} focusTabId 操作后选中页签
 */
function deleteTabs(statusTabApId,tabIds,focusTabId){
	if (isNull(tabIds)){
		return;
	}
	for (let tabId of tabIds) {
		var tabItemDiv = document.getElementById(statusTabApId + ";kingdee-eb-statustab-tabitem;" + tabId);
		if (!isNull(tabItemDiv)){
			tabItemDiv.remove();
		}
	}
	// 移动到指定页签
	moveTabItem(statusTabApId,focusTabId);
	// 更新搜索框
	loadSearchDivTabItems(statusTabApId);
	// 返回页签信息
	return getTabsInfoJson(statusTabApId);	
}

/**
 * 批量更新页签
 * @param {String} statusTabApId 页签唯一标识
 * @param {CustomStatusTab[]} tabs 页签项
 * @param {String} focusTabId 操作后选中页签
 */
function updateTabs(statusTabApId,tabs,focusTabId){
	if (isNull(tabs)){
		return;
	}
	for (let tab of tabs){
		var tabItemDiv = document.getElementById(statusTabApId + ";kingdee-eb-statustab-tabitem;" + tab.tabId);	
		if (!isNull(tabItemDiv)){
			updateTabItemDivInfo(tabItemDiv,tab.tabName,tab.tabStatusName,tab.tabStatusBackColor,tab.showClose);
			if (focusTabId == tab.tabId){
				focusTab(tabItemDiv);
			}
		}
	}
	// 移动到指定页签
//	moveTabItem(statusTabApId,focusTabId);
	// 更新搜索框
	loadSearchDivTabItems(statusTabApId);
	// 返回页签信息
	return getTabsInfoJson(statusTabApId);
} 
 
 
/**
 * 方向按钮点击事件
 */
function directionClick(direction){
	var split = direction.id.split(";");
	var statusTabApId = split[0];
	var directionSign = split[1];
	
    var tabItems = document.getElementById(statusTabApId + ";kingdee-eb-statustab-tabitems");
    if (isNull(tabItems.children) || tabItems.children.length == 0) {
        return;
    }

    var tabItemDiv;
	var curFocusTabIndex = getFocusTabIndex(statusTabApId);
    if ("kingdee-eb-statustab-buttonfirst" == directionSign) {
		if (curFocusTabIndex != 0){
			tabItemDiv = tabItems.children[0];
		}
    } else if ("kingdee-eb-statustab-buttonfront" == directionSign) {
        if (curFocusTabIndex != 0) {
            tabItemDiv =  tabItems.children[curFocusTabIndex - 1];;
        }
    } else if ("kingdee-eb-statustab-buttonnext" == directionSign) {
        if (curFocusTabIndex != tabItems.children.length - 1) {
            tabItemDiv = tabItems.children[curFocusTabIndex + 1];
        }
    } else if ("kingdee-eb-statustab-buttonlast" == directionSign) {
		if (curFocusTabIndex != tabItems.children.length - 1) {
			tabItemDiv = tabItems.children[tabItems.children.length - 1];
		}
    }
    if(isNull(tabItemDiv)){
        console.log("current direction [" + direction.id + "] not find tab.");
    } else {
		var tabId = tabItemDiv.attributes.tabId.value;
        return moveTabItem(statusTabApId,tabId);
    }
}

/**
 * 消除移动误差
 */
function eliminateMisTask(tabItemDiv){
	var statusTabApId = tabItemDiv.id.split(";")[0];
	var tabItemDivLeft = tabItemDiv.getBoundingClientRect().left;
	var tabItemDivRight = tabItemDivLeft + tabItemDiv.offsetWidth;
	
	var tabDiv = document.getElementById(statusTabApId + ";kingdee-eb-statustab-tabdiv");
	var buttonAddDiv = document.getElementById(statusTabApId + ";kingdee-eb-statustab-buttonaddtab");
	
	var tabDivLeft = tabDiv.getBoundingClientRect().left;
	var tabDivRight = buttonAddDiv.getBoundingClientRect().left;
	
	var tabItemsDiv = document.getElementById(statusTabApId + ";kingdee-eb-statustab-tabitems");
	var children = tabItemsDiv.children;
	if (children != null && children.length > 0){
		var sourceMarginLeft = Number(tabItemsDiv.style.marginLeft.replace("px",""));
		if(tabItemDivLeft < tabDivLeft){
			tabItemsDiv.style.marginLeft = (sourceMarginLeft + tabDivLeft - tabItemDivLeft) + "px";
		}else if(tabItemDivRight > tabDivRight){
			tabItemsDiv.style.marginLeft = (sourceMarginLeft + tabDivRight - tabItemDivRight) + "px";
		}
	}
} 

/**
 * 页签点击
 */
function tabItemClick(tabItemDiv){
	// 消除移动上的误差
	eliminateMisTask(tabItemDiv);
	return focusTab(tabItemDiv);
}	

/**
 * 将焦点定在某个页签上
 * @param {div} tabItemDiv 页签
 */
function focusTab(tabItemDiv){	
	var statusTabApId = tabItemDiv.id.split(";")[0];
	var tabId = tabItemDiv.id.split(";")[2];
	var tabAp = document.getElementById(statusTabApId + ";kingdee-eb-statustab-tabap");	
	
    var tabStyle = tabItemDiv.style;
    // 上边框颜色
    tabStyle.borderTop = tabAp.attributes.tabFocusBorderTopStyle && tabAp.attributes.tabFocusBorderTopStyle.value || "";
    // 背景色
    tabStyle.backgroundColor = tabAp.attributes.tabFocusBackgroundColor && tabAp.attributes.tabFocusBackgroundColor.value || "";
    // 其他页签的上边框
    var tabitems = document.getElementById(statusTabApId + ";kingdee-eb-statustab-tabitems");

    var focusTabId;
	var index;
    var tabs = tabitems.children;
    for (var i = 0; i < tabs.length; i++) {
        if(tabs[i].id == tabItemDiv.id){
            focusTabId = tabs[i].id.split(";")[2];
			index = i;
            continue;
        }
        tabs[i].style.borderTop = tabAp.attributes.tabUnFocusBorderTopStyle && tabAp.attributes.tabUnFocusBorderTopStyle.value || "";
        tabs[i].style.background = tabAp.attributes.tabUnFocusBackgroundColor && tabAp.attributes.tabUnFocusBackgroundColor.value || "";
    }
    // 记录当前焦点页签
    tabitems.setAttribute("focusTabId",focusTabId);
	// 设置移动按钮的颜色，代表是否可点击
	var first = document.getElementById(statusTabApId + ";kingdee-eb-statustab-buttonfirst-svg");
	var front = document.getElementById(statusTabApId + ";kingdee-eb-statustab-buttonfront-svg");
	var next = document.getElementById(statusTabApId + ";kingdee-eb-statustab-buttonnext-svg");
	var last = document.getElementById(statusTabApId + ";kingdee-eb-statustab-buttonlast-svg");
	first.style.fill = index != 0 ? "#757575" : "#c1c1c1";
	front.style.fill = index != 0 ? "#757575" : "#c1c1c1";
	next.style.fill = index != tabs.length-1 ? "#757575" : "#c1c1c1";
	last.style.fill = index != tabs.length-1 ? "#757575" : "#c1c1c1";
	return tabId;
}


/**
 * 页签悬浮
 * @param {Object} tabItemDiv
 * @param {Object} visible
 */
function tabHover(tabItemDiv,visible){
    var children = tabItemDiv.children;
	var showClose = tabItemDiv.attributes.showClose.value == "true" ? true : false;
    for (var i = 0; i < children.length; i++) {
        // 显示×号
        if (children[i].attributes.class.value == "kingdee-eb-statustab-tabitemclose" && showClose) {
            children[i].style.visibility = visible ? "visible":"hidden";
            break;
        }
    }
}

/**
 * 移动按钮悬浮事件
*/
function moveButtonHover(moveButton,lightShow){
	var statusTabApId = moveButton.id.split(";")[0];
	var direction = moveButton.id.split(";")[1];
	var tabitems = document.getElementById(statusTabApId + ";kingdee-eb-statustab-tabitems");
	var focusTabIndex = getFocusTabIndex(statusTabApId);
	if (direction == "kingdee-eb-statustab-buttonfirst-svg" || direction == "kingdee-eb-statustab-buttonfront-svg"){
		if (focusTabIndex != 0){
			moveButton.style.fill = lightShow ? "#5582f3":"#757575";
		}
	} else if (direction == "kingdee-eb-statustab-buttonnext-svg" || direction == "kingdee-eb-statustab-buttonlast-svg"){
		if (focusTabIndex != tabitems.children.length - 1){
			moveButton.style.fill = lightShow ? "#5582f3":"#757575";
		}
	}
}


function updateTabItemDivInfo(tabItemDiv,tabName,statusName,tabStatusBackColor,showClose){
	tabItemDiv.setAttribute("name",tabName);
	tabItemDiv.setAttribute("statusName",statusName);
	tabItemDiv.setAttribute("tabStatusBackColor",tabStatusBackColor);
	tabItemDiv.setAttribute("showClose",showClose);
	var children = tabItemDiv.children;
	if (!isNull(children)){
		for(var i=0;i<children.length;i++){
			var classValue = children[i].attributes.class.value;
			if (classValue == "kingdee-eb-statustab-tabitemname"){
				children[i].title = tabName;
				if(isBlank(tabName)){
					children[i].children[0].innerHTML = '';
					children[i].style.display = "none";
				}else{
					children[i].style.display = "flex";
					children[i].children[0].innerHTML = tabName;
				}
			} else if (classValue == "kingdee-eb-statustab-tabitemstatus"){
				children[i].title = statusName;
				if (isBlank(statusName)){
					children[i].children[0].innerHTML = '';
					children[i].style.display = "none";
				} else {
					children[i].children[0].innerHTML = statusName;
					children[i].style.display = "flex";
				}
				children[i].style.color = tabStatusBackColor;
				children[i].style.borderColor = tabStatusBackColor;
				children[i].style.padding = isBlank(statusName)? "0 0 0 0" : "0 6px 0 6px";
			} 
		}
	}
	
}

function updateSearchTabItemDivInfo(searchTabItemDiv,tabName,statusName,tabStatusBackColor){
	var children = searchTabItemDiv.children;
	if (!isNull(children)){
		for(var i=0;i<children.length;i++){
			var classValue = children[i].attributes.class.value;
			if (classValue == "kingdee-eb-statustab-tabitemname"){
				children[i].title = tabName;
				if(isBlank(tabName)){
					children[i].children[0].innerHTML = '';
					children[i].display = "none";
				}else{
					children[i].children[0].innerHTML = tabName;
					children[i].display = "flex";
				}
			} else if (classValue == "kingdee-eb-statustab-tabitemstatus"){
				children[i].title = statusName;
				if(isBlank(statusName)){
					children[i].children[0].innerHTML = '';
					children[i].display = "none";
				}else{
					children[i].children[0].innerHTML = statusName;
					children[i].display = "flex";
				}
				children[i].style.color = tabStatusBackColor;
				children[i].style.borderColor = tabStatusBackColor;
			}
		}
	}
}

/**
 * 加载搜索浮窗的页签项
 */
function loadSearchDivTabItems(statusTabApId){
	// 页签项的属性信息
	var attributes = document.getElementById(statusTabApId + ";kingdee-eb-statustab-tabap").attributes;
	var tabNameMaxWidth = attributes.tabNameMaxWidth.value;
	var tabStatusMaxWidth = attributes.tabStatusMaxWidth.value;

	// 页签项信息
    var tabitems = document.getElementById(statusTabApId + ";kingdee-eb-statustab-tabitems");
	var tabChildren = tabitems.children;
		
	// 搜索结果div
    var searchResultDiv = document.getElementById(statusTabApId +";kingdee-eb-statustab-searchresult");
	searchResultDiv.innerHTML = '';

    if (!isNull(tabChildren) && tabChildren.length > 0){
        for (var i = 0; i < tabChildren.length ;i++) {
			var tabItem = tabChildren[i];
			var tabId = tabItem.attributes.tabId.value;
			var tabName = tabItem.attributes.name.value;
			var statusName = tabItem.attributes.statusName.value;
			var tabStatusBackColor = tabItem.attributes.tabStatusBackColor.value;
			var iconClass = tabItem.attributes.iconClass.value;
			var iconColor = tabItem.attributes.iconColor.value;
			var searchResultItemId = statusTabApId + ";kingdee-eb-statustab-searchresultitem;" + tabId;
			
			var searchResultItemDiv = document.createElement("div");
			searchResultItemDiv.setAttribute("id",searchResultItemId);
			searchResultItemDiv.setAttribute("class","kingdee-eb-statustab-searchresultitem");
			searchResultItemDiv.setAttribute("tabId",tabId);
			searchResultItemDiv.innerHTML = getSearchDivInnerHTML(tabId,tabName,statusName,tabStatusBackColor,tabNameMaxWidth,tabStatusMaxWidth,iconClass,iconColor);
			searchResultItemDiv.children[0].style.display = isBlank(tabName) ? "none" : "flex";
			searchResultItemDiv.children[1].style.display = isBlank(statusName) ? "none" : "flex";
			searchResultDiv.appendChild(searchResultItemDiv);
		}
    }
	showMatchTabItems(statusTabApId);
}

function buttonMoreDivMoveOver(statusTabApId){
	var searhDiv = document.getElementById(statusTabApId + ";kingdee-eb-statustab-searchdiv");
	searhDiv.style.display = "block";
}

function searchDivMoveOut(statusTabApId){
	var searhDiv = document.getElementById(statusTabApId + ";kingdee-eb-statustab-searchdiv");
	searhDiv.setAttribute("ishovering","false");
	setTimeout(() => {
		if ("true" != searhDiv.attributes.ishovering.value) {
			searhDiv.style.display = "none";
		}
	}, 200);
}

function searchDivMoveOver(statusTabApId){
	var searhDiv = document.getElementById(statusTabApId + ";kingdee-eb-statustab-searchdiv");
	searhDiv.setAttribute("ishovering","true");
}

/**
 * 输入框输入时加载匹配的结果项
 */
function showMatchTabItems(statusTabApId){
	// 匹配的页签ids
	var matchTabIds = getMatchTabIds(statusTabApId);
	
	// 搜索框div
	var searchResultDiv = document.getElementById(statusTabApId +";kingdee-eb-statustab-searchresult");
	var tabChildren = searchResultDiv.children;
	for (var i = 0; i < tabChildren.length ;i++) {
		var tabItem = tabChildren[i];
        var tabId = tabItem.attributes.tabId.value;
		var isMatch = matchTabIds == null || matchTabIds.has(tabId);
		
		tabItem.style.visibility = isMatch? "visible":"hidden";
		tabItem.style.height = isMatch? "25px":"0px";
	}
} 

/**
 * 存储页签样式属性信息
 */
function storeTabStyleInfo(statusTabApId,initTabInfo){
	var tabAp = document.getElementById(statusTabApId + ";kingdee-eb-statustab-tabap");
	tabAp.setAttribute("tabFocusBackgroundColor",initTabInfo.tabFocusBackgroundColor);
	tabAp.setAttribute("tabUnFocusBackgroundColor",initTabInfo.tabUnFocusBackgroundColor);
	tabAp.setAttribute("tabFocusBorderTopStyle",initTabInfo.tabFocusBorderTopStyle);
	tabAp.setAttribute("tabUnFocusBorderTopStyle",initTabInfo.tabUnFocusBorderTopStyle);
	tabAp.setAttribute("tabNameMaxWidth",initTabInfo.tabNameMaxWidth);
	tabAp.setAttribute("tabStatusMaxWidth",initTabInfo.tabStatusMaxWidth);
	tabAp.setAttribute("searchDivMinWidth",initTabInfo.searchDivMinWidth);
	tabAp.setAttribute("searchResultMaxHeight",initTabInfo.searchResultMaxHeight);
}

/**
 * 展示右键菜单
 */ 
function showRigntMenu(tabItemDiv){
	if (event.button != 2) {
		return;
	}
	var tabItemDivId = tabItemDiv.id;
	var statusTabApId = tabItemDivId.split(";")[0];
	var tabItems = document.getElementById(statusTabApId + ";kingdee-eb-statustab-tabitems");
	
	var existLeft = false;
	var existRight = false;
	var existOther = false
	for(var i = 0;i < tabItems.children.length;i++){
		var child = tabItems.children[i];
		if(child.id != tabItemDivId){
			continue;
		}
		if(i > 0){
			existLeft = true;
			existOther = true;
		}
		if(i < tabItems.children.length - 1){
			existRight = true;
			existOther = true;
		}
		break;
	}
	
	
	var rightmenu = document.getElementById(statusTabApId + ";kingdee-eb-statustab-rightbutton");
	// 将当前选择的页签放在属性里
	rightmenu.setAttribute("curTabId",tabItemDiv.attributes.tabId.value);
	// 设置面板位置
	rightmenu.style.display = "block";
	rightmenu.style.visibility = "visible";
	rightmenu.style.left = (event.clientX - 2) + "px";
	rightmenu.style.top = (event.clientY - 2) + "px";
	var children = rightmenu.children;
	for(var i = 0;i < children.length;i++){
		 var child = children[i];
		 var childid = child.id;
		 if(childid == statusTabApId + ";kingdee-eb-statustab-rightbutton-closeother"){
			 child.style.visibility = existOther ? "visible":"hidden";
			 child.style.height = existOther ? "23px":"0px";
			 child.style.padding = existOther ? "3px 10px":"0 0";
		 }else if(childid == statusTabApId + ";kingdee-eb-statustab-rightbutton-closeleft"){
			 child.style.visibility = existLeft ? "visible":"hidden";
			 child.style.height = existLeft ? "23px":"0px";
			 child.style.padding = existLeft ? "3px 10px":"0 0";
		 }else if(childid == statusTabApId + ";kingdee-eb-statustab-rightbutton-closeright"){
			 child.style.visibility = existRight ? "visible":"hidden";
			 child.style.height = existRight ? "23px":"0px";
			 child.style.padding = existRight ? "3px 10px":"0 0";
		 }else if(childid == statusTabApId + ";kingdee-eb-statustab-rightbutton-closeall"){
			 child.style.visibility = existOther ? "visible":"hidden";
			 child.style.height = existOther ? "23px":"0px";
			 child.style.padding = existOther ? "3px 10px":"0 0";
		 }
	}
}

/**
 * 右侧菜单点击
 */
function rightMenuClick(rightButton){
	var statusTabApId = rightButton.id.split(";")[0];
	var rightButton = rightButton.id.split(";")[1]
	var rightmenu = document.getElementById(statusTabApId + ";kingdee-eb-statustab-rightbutton");
	var curTabId = rightmenu.attributes.curTabId.value;
	var tabItems = document.getElementById(statusTabApId + ";kingdee-eb-statustab-tabitems");
	var tabChildren = tabItems.children;
	rightmenu.style.display = "none";
	rightmenu.style.visibility = "hidden";
	
	if (tabChildren == null || tabChildren.length == 0){
		return "[]";
	}
	
	// 需要关闭的页签
	const needCloseTabIds = new Set();
	if(rightButton == "kingdee-eb-statustab-rightbutton-closecur"){
		var tab = document.getElementById(statusTabApId + ";kingdee-eb-statustab-tabitem;" + curTabId); 	
		if(tab){
			needCloseTabIds.add(curTabId);
		}
	}else if(rightButton == "kingdee-eb-statustab-rightbutton-closeother"){
		for(var i=0;i<tabChildren.length;i++){
			var tabId = tabChildren[i].attributes.tabId.value;
			if(curTabId != tabId){
				needCloseTabIds.add(tabId);
			}
		}		
	}else if(rightButton == "kingdee-eb-statustab-rightbutton-closeleft"){
		for(var i=0;i<tabChildren.length;i++){
			var tabId = tabChildren[i].attributes.tabId.value;
			if(curTabId != tabId){
				needCloseTabIds.add(tabId);
			}else{
				break;
			}
		}	
	}else if(rightButton == "kingdee-eb-statustab-rightbutton-closeright"){
		for(var i=tabChildren.length-1;i>=0;i--){
			var tabId = tabChildren[i].attributes.tabId.value;
			if(curTabId != tabId){
				needCloseTabIds.add(tabId);
			}else{
				break;
			}
		}		
	}else if(rightButton == "kingdee-eb-statustab-rightbutton-closeall"){
		for(var i=tabChildren.length-1;i>=0;i--){
			var tabId = tabChildren[i].attributes.tabId.value;
			needCloseTabIds.add(tabId);
		}	
	}
	
	var jsonStr = '[';
	for (let tabId of needCloseTabIds) {
		jsonStr += '"' + tabId + '",';
	}
	if(jsonStr.length > 1){
		jsonStr = jsonStr.slice(0,jsonStr.length-1);
	}
	return jsonStr += ']'; 
} 

/**
 * 右键菜单离开事件
 */
function rightMenuMouseLeave(rightMenu){
	var statusTabApId = rightMenu.id.split(";")[0];
	var rightmenu = document.getElementById(statusTabApId + ";kingdee-eb-statustab-rightbutton");
	rightmenu.style.visibility = "hidden";
	rightmenu.style.display = "none";
} 
 
/*
* -------------------------------------------------------
* 前端相关get方法
* -------------------------------------------------------
*/

/**
 * 获取搜索匹配的页签
 * @param {String} statusTabApId 当前状态页签的唯一标识
 * @return {Set} matchTabIds 当搜索内容为空时，返回null
 */
function getMatchTabIds(statusTabApId){
    var searchText = document.getElementById(statusTabApId + ";kingdee-eb-statustab-searchcontent").value;
    if (isBlank(searchText)) {
        return null;
    } else {
        const matchTabIds = new Set();
        var tabItemsDiv = document.getElementById(statusTabApId + ";kingdee-eb-statustab-tabitems");
        if (tabItemsDiv.children != null && tabItemsDiv.children.length > 0) {
            var children = tabItemsDiv.children;
            for (var i = 0; i < children.length; i++) {
				var tabId = children[i].attributes.tabId.value;
				var name = children[i].attributes.name.value;
				var statusName = children[i].attributes.statusName.value;
                if (!isBlank(name) && name.indexOf(searchText) >= 0){
                    matchTabIds.add(tabId);
                }
				if (!isBlank(statusName) && statusName.indexOf(searchText) >= 0){
                    matchTabIds.add(tabId);
                }
            }
        }
        return matchTabIds;
    }
}

/**
 * 获取新页签
 * @param {String} statusTabApId 当前状态页签的唯一标识
 * @param {CustomStatusTab} tab 页签项
 * @return {div} 页签div
 */
function getNewTabItemDiv(statusTabApId,tab,tabNameMaxWidth,tabStatusMaxWidth){
	var tabId = tab.tabId;
	var tabName = tab.tabName;
	var statusName = tab.tabStatusName;
	var showClose = tab.showClose;
	var tabStatusBackColor = tab.tabStatusBackColor;
	var iconClass = tab.iconClass;
	var iconColor = tab.iconColor;

    var newTabDiv = document.createElement("div");
	newTabDiv.setAttribute("id",statusTabApId + ";kingdee-eb-statustab-tabitem;" + tabId);
    newTabDiv.setAttribute("class","kingdee-eb-statustab-tabitem");
    newTabDiv.setAttribute("name",tabName);
	newTabDiv.setAttribute("tabId",tabId);
    newTabDiv.setAttribute("statusName",statusName);
    newTabDiv.setAttribute("showClose",showClose);
	newTabDiv.setAttribute("iconClass",iconClass);
    newTabDiv.setAttribute("iconColor",iconColor);
	newTabDiv.setAttribute("tabStatusBackColor",tabStatusBackColor);
    newTabDiv.setAttribute("onmouseover","tabHover(this,true)");
    newTabDiv.setAttribute("onmouseleave","tabHover(this,false)");
	newTabDiv.setAttribute("onmouseup","showRigntMenu(this)");
    newTabDiv.innerHTML = getTabInnerHTML(statusTabApId,tabId,tabName,statusName,showClose,tabStatusBackColor,tabNameMaxWidth,tabStatusMaxWidth,iconClass,iconColor);
	
	newTabDiv.children[0].style.display = isBlank(statusName) ? "none" : "flex";
	newTabDiv.children[1].style.display = isBlank(tabName) ? "none" : "flex";
    return newTabDiv;
}

/**
 * 获取页签HTML字符串
 * @param {String} statusTabApId 当前状态页签的唯一标识
 * @param {String} tabId 页签id
 * @param {String} tabName 页签名称
 * @param {String} statusName 状态名称
 * @param {Boolean} showClose 是否展示×号
 * @param {String} tabStatusBackColor 状态背景色
 * @return {String} HTML字符串
 */
function getTabInnerHTML(statusTabApId,tabId,tabName,statusName,showClose,tabStatusBackColor,tabNameMaxWidth,tabStatusMaxWidth,iconClass,iconColor){
    var innerHTML='';
	// 状态
	var statusNamePadding = isBlank(statusName) ? "0 0 0 0" : "0 6px 0 6px";
	innerHTML += '<div class="kingdee-eb-statustab-tabitemstatus" title="'+ statusName +'" style="color:'+ tabStatusBackColor + ';border-color:' + tabStatusBackColor +';max-width:'+tabStatusMaxWidth+';padding:'+ statusNamePadding +';"><span class="kingdee-eb-statustab-span">'+ statusName +'</span></div>';
	// 状态
    innerHTML += '<div class="kingdee-eb-statustab-tabitemicon"><i class="' + iconClass +'" style="font-size: 10px; color: ' + iconColor + '"></i></div>';
    // 页签名称
    innerHTML += '<div class="kingdee-eb-statustab-tabitemname" style="max-width:'+ tabNameMaxWidth +';" title="'+ tabName +'"><span  class="kingdee-eb-statustab-span">'+ tabName +'</span></div>';
    // X号
	var tabCloseId = statusTabApId + ";kingdee-eb-statustab-tabitemclose;" + tabId;
	var visibleClose = showClose ? "visible" : "hidden";
	innerHTML += '<div id = '+ tabCloseId +' class="kingdee-eb-statustab-tabitemclose" visibility="'+ visibleClose +'">'
		+	    '<svg width="10px" height="10px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">'
		+		  '<path d="M1.61289944,0.209704612 L1.70710678,0.292893219 L10,8.585 L18.2928932,0.292893219 C18.6834175,-0.0976310729 19.3165825,-0.0976310729 19.7071068,0.292893219 C20.0675907,0.65337718 20.0953203,1.22060824 19.7902954,1.61289944 L19.7071068,1.70710678 L11.415,10 L19.7071068,18.2928932 C20.0976311,18.6834175 20.0976311,19.3165825 19.7071068,19.7071068 C19.3466228,20.0675907 18.7793918,20.0953203 18.3871006,19.7902954 L18.2928932,19.7071068 L10,11.415 L1.70710678,19.7071068 C1.31658249,20.0976311 0.683417511,20.0976311 0.292893219,19.7071068 C-0.0675907428,19.3466228 -0.0953202783,18.7793918 0.209704612,18.3871006 L0.292893219,18.2928932 L8.585,10 L0.292893219,1.70710678 C-0.0976310729,1.31658249 -0.0976310729,0.683417511 0.292893219,0.292893219 C0.62333685,-0.0375504127 1.12750547,-0.0883878944 1.51140295,0.140380774 L1.61289944,0.209704612 Z" id="形状结合"></path>'
		+	    '</svg>'
		+ '</div>';
    return innerHTML;
}

/**
 * 获取搜索浮窗HTML
 * @param {String} tabId
 * @param {String} tabName
 * @param {String} statusName
 * @param {String} tabStatusBackColor
 * @param {String} tabNameMaxWidth 
 * @param {String} tabStatusMaxWidth 
 * @return {String} HTML字符串
 */
function getSearchDivInnerHTML(tabId,tabName,statusName,tabStatusBackColor,tabNameMaxWidth,tabStatusMaxWidth,iconClass,iconColor){
    // 页签名称
    var innerHTML = '<div class="kingdee-eb-statustab-tabitemname" style="max-width:' + tabNameMaxWidth + ';" title="'+ tabName +'"><span class="kingdee-eb-statustab-span">'+ tabName +'</span></div>';
    // 状态
    innerHTML += '<div class="kingdee-eb-statustab-tabitemicon"><div class="kingdee-eb-statustab-tabitemstatus" style="color:'+ tabStatusBackColor + ';border-color:' + tabStatusBackColor +';max-width:' + tabStatusMaxWidth + ';" title="'+ statusName +'"><span class="kingdee-eb-statustab-span">'+ statusName +'</span></div>';
	// 状态
    innerHTML += '<i class="' + iconClass +'" style="font-size: 10px; color: ' + iconColor + '"></i></div>';
    return innerHTML;
}

/**
 * 获取页签移动的最大MarginLeft
 */
function getMaxMarginLeft(){
    return 0;
}

/**
 * 获取页签移动的最小MarginLeft
 * @param {String} statusTabApId 页签唯一标识
 */
function getMinMarginLeft(statusTabApId){
    var tabDiv = document.getElementById(statusTabApId + ";kingdee-eb-statustab-tabdiv");
    var addTabDiv = document.getElementById(statusTabApId + ";kingdee-eb-statustab-buttonaddtab");
	var tabItems = document.getElementById(statusTabApId + ";kingdee-eb-statustab-tabitems");
	var minMarginLeft = tabDiv.offsetWidth - addTabDiv.offsetWidth - tabItems.scrollWidth;
    return  minMarginLeft >= 0 ? 0: minMarginLeft;
}

/**
 * 获取页签移到指定位置所需要设置的marginLeft
 * @param {divs} tabItemsDiv 页签项div
 * @param {div} tabItemDiv 要定位的页签
 * @param {int} minMarginLeft  页签移动的最小MarginLeft
 * @param {int} maxMarginLeft  页签移动的最大MarginLeft
 * @return {int} marginLeft
 */
function getMoveToMarginLeft(tabItemsDiv,tabItemDiv,minMarginLeft,maxMarginLeft){
    var marginLeft = tabItemDiv.getBoundingClientRect().left - tabItemsDiv.getBoundingClientRect().left;
    if (0 - marginLeft > maxMarginLeft) {
        return maxMarginLeft;
    } else if (0 - marginLeft < minMarginLeft) {
        return minMarginLeft;
    } else {
        return 0 - marginLeft;
    }
}

/**
 * 获取焦点页签的序号索引
 * @param {String} statusTabApId 页签唯一标识
 */
function getFocusTabIndex(statusTabApId){
	var tabitems = document.getElementById(statusTabApId + ";kingdee-eb-statustab-tabitems");
	var focusTabId = tabitems.attributes.focusTabId && tabitems.attributes.focusTabId.value || "";
	var children = tabitems.children;
	if(children && children.length > 0){
		for(var i=0;i<children.length;i++){
			if(children[i].id.split(";")[2] == focusTabId){
				return i;
			}
		}
		return 0;
	}
	return null;
} 

/**
 * 获取页签信息
 * @param {String} statusTabApId 页签唯一标识
 */
function getTabsInfoJson(statusTabApId){
	// -----页签信息
	var tabsInfoJson = '[';
	var tabitems = document.getElementById(statusTabApId + ";kingdee-eb-statustab-tabitems");
	var children = tabitems.children;
	if (children) {
		for (var i = 0; i < children.length; i++) {
			tabsInfoJson += getTabInfoToJson(children[i]);
			if (i != children.length - 1){
				tabsInfoJson += ',';
			}
		}
	}
	tabsInfoJson += ']';
	return tabsInfoJson;
} 

/**
 * 获取页签信息json
 */
function getTabInfoToJson(tabItemDiv){
	var attributes = tabItemDiv.attributes;
	var tabId = attributes.tabId.value;
	var tabName = attributes.name.value;
	var tabStatusName = attributes.statusName.value;
	var tabStatusBackColor = attributes.tabStatusBackColor.value;
	var showClose = attributes.showClose.value == "true" ? true : false;
	var jsonStr = '{';
		jsonStr += '"tabId":'+'"'+ tabId+ '",';
		jsonStr += '"tabName":'+'"'+ tabName+ '",';
		jsonStr += '"tabStatusName":'+'"'+ tabStatusName+ '",';
		jsonStr += '"tabStatusBackColor":'+'"'+ tabStatusBackColor+ '",';
		jsonStr += '"showClose":'+ showClose;
		jsonStr += '}';
	return jsonStr;
}

function doNothing(){
	window.event.returnValue = false;
    return false;
}

/*
* -------------------------------------------------------
* 常用方法
* -------------------------------------------------------
*/
function isNull(value) {
    if (value != undefined && value != "undefined" && value != 0) {
        return false;
    } else {
        return true;
    }
}

function isBlank(text) {
    if (isNull(text)) {
        return true;
    }
    var cs = text.split('');
    if (cs.length != 0) {
        for(var i = 0; i < cs.length; ++i) {
            if (cs[i] != ' ') {
                return false;
            }
        }
        return true;
    } else {
        return true;
    }
}