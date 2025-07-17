var dateControl = ['date', 'datetime', 'createdate', 'modifydate'];
var selectdataCtrl = ['selectdata', 'creator', 'modifier', 'currency', 'unit'];
var inputCtrl = ['text', 'input', 'code', 'auxpty'];
var priceCtrl = ['price', 'amount'];
var selectCtrl = ['select', 'billstatus'];
var panelCtrl = ['panel', 'formpanel', 'flexpanel'];
var filterCtrl = ['queryfilter', 'filter'];
var switchtabbaritemCtrl = ['switchtabbaritem', 'switchtabbarcitem']
var formArr = ["attachmentlist","checkbox","checkboxgroup","datetime","input","imageupload","price","qty","radio","radiogroup","selectdata","select","textarea","datagrid","list","multilanguagetext","digit","number","sku","kswitch","levelmenu","date","datetime","createdate","modifydate","selectdata","creator","modifier","currency","unit","price","amount","text","input","code","select","billstatus"]
var isSpecialControl = ['datagrid', 'list', 'button', 'img', 'toolbar', 'tab', 'tabgroup', 'menubutton', 'label', 'panel', 'formpanel', 'levelmenu', 'imggroup', 'a']
var defaultIcon = {
	add: 'iconxinzeng', // 加
	thus: 'iconjian', // 减
	search: 'iconsousuo', // 搜索
	back: 'iconshangyiye', // 返回
	refresh: 'iconshuaxin', // 刷新
	rapidOutStock: 'iconkuaisu', // 快速出库
	more: 'icongengduo2', // 更多
	audit: 'iconshenhe', // 审核
	submit: 'icontijiao', // 提交
	delete: 'iconshanchu', // 删除
	save: 'iconbaocun', // 保存
	operate: 'iconcaozuo', // 操作
	cancel: 'iconchexiao', // 撤销
	importTemplate: 'icondaorumoban', // 导入模板
	import: 'icondaoru', // 导入
	print: 'icondayin', // 打印
	familiar: 'iconjianti', // 简体
	complex: 'iconfanti', // 繁体
	english: 'iconyingwen', // 英文
	multiLanguage: 'iconduoyuyan', // 多语言
	phone: 'iconshouji  ', // 手机
	arrow: 'iconyangshiqiehuan', // 切换箭头
	shopcar: 'icongouwuche', // 购物车
	downarrow: 'iconzhankaijiantou_miaobian', // 下拉箭头
	portrait: 'icongerenzhongxin' // 头像
  }
  var colorMap =  {
	ired: '#fd6c6a',
	igreen: '#26b175',
	iyellow: '#ed812b'
  }
// 包含label的组件，主要用于处理label的显示隐藏
var includeLabelArr = [].concat(inputCtrl).concat(selectdataCtrl).concat(selectCtrl).concat(priceCtrl).concat(dateControl).concat(['qty', 'number', 'multilanguagetext'])
define([
	"jquery",
	"jqTmpl",
	"js/defaultdata.js",
	"text!../widgets/a.htm",
	"text!../widgets/amount.htm",
	"text!../widgets/async.htm",
	"text!../widgets/attachmentlist.htm",
	"text!../widgets/blank.htm",
	"text!../widgets/bottom.htm",
	"text!../widgets/bottomgroup.htm",
	"text!../widgets/button.htm",
	"text!../widgets/chart.htm",
	"text!../widgets/checkbox.htm",
	"text!../widgets/checkboxgroup.htm",
	"text!../widgets/code.htm",
	"text!../widgets/createdate.htm",
	"text!../widgets/creator.htm",
	"text!../widgets/datagrid.htm",
	"text!../widgets/date.htm",
	"text!../widgets/datetime.htm",
	"text!../widgets/decimal.htm",
	"text!../widgets/editor.htm",
	"text!../widgets/entry.htm",
	"text!../widgets/extendedpropertiespanel.htm",
	"text!../widgets/fields.htm",
	"text!../widgets/filter.htm",
	"text!../widgets/filtertab.htm",
	"text!../widgets/filtertabgroup.htm",
	"text!../widgets/goodssearch.htm",
	"text!../widgets/group.htm",
	"text!../widgets/html.htm",
	"text!../widgets/richtext.htm",
	"text!../widgets/htmltext.htm",
	"text!../widgets/iframe.htm",
	"text!../widgets/image.htm",
	"text!../widgets/img.htm",
	"text!../widgets/imggroup.htm",
	"text!../widgets/input.htm",
	"text!../widgets/label.htm",
	"text!../widgets/latticerowpanel.htm",
	"text!../widgets/layout.htm",
	"text!../widgets/linkgroup.htm",
	"text!../widgets/listdatagrid.htm",
	"text!../widgets/menubutton.htm",
	"text!../widgets/menubuttongroup.htm",
	"text!../widgets/mobilesearch.htm",
	"text!../widgets/modifier.htm",
	"text!../widgets/modifydate.htm",
	"text!../widgets/multilanguagetext.htm",
	"text!../widgets/mltext.htm",
	"text!../widgets/navtab.htm",
	"text!../widgets/navtabgroup.htm",
	"text!../widgets/node.htm",
	"text!../widgets/number.htm",
	"text!../widgets/option.htm",
	"text!../widgets/pageview.htm",
	"text!../widgets/panel.htm",
	"text!../widgets/price.htm",
	"text!../widgets/qty.htm",
	"text!../widgets/radio.htm",
	"text!../widgets/radiogroup.htm",
	"text!../widgets/scancode.htm",
	"text!../widgets/scroller.htm",
	"text!../widgets/searcher.htm",
	"text!../widgets/select.htm",
	"text!../widgets/selectdata.htm",
	"text!../widgets/selectdatam.htm",
	"text!../widgets/simplefilter.htm",
	"text!../widgets/simpleoption.htm",
	"text!../widgets/sku.htm",
	"text!../widgets/sort.htm",
	"text!../widgets/style.htm",
	"text!../widgets/tab.htm",
	"text!../widgets/tabgroup.htm",
	"text!../widgets/table.htm",
	"text!../widgets/tabnav.htm",
	"text!../widgets/tabpanel.htm",
	"text!../widgets/tag.htm",
	"text!../widgets/td.htm",
	"text!../widgets/text.htm",
	"text!../widgets/textarea.htm",
	"text!../widgets/toolbar.htm",
	"text!../widgets/tr.htm",
	"text!../widgets/tree.htm",
	"text!../widgets/video.htm",
	"text!../widgets/starscore.htm",
	"text!../widgets/kswiper.htm",
	"text!../widgets/view.htm",	
	"text!../widgets/countdown.htm",
	"text!../widgets/appmain.htm",
	"text!../widgets/tabbar.htm",
	"text!../widgets/tabbaritem.htm",
	"text!../widgets/palette.htm",
	"text!../widgets/levelmenu.htm",
	"text!../widgets/switchtabbar.htm",
	"text!../widgets/switchtabbaritem.htm",
	"text!../widgets/admindivision.htm",
	"text!../widgets/searchhistory.htm",
	"text!../widgets/leftslipbuttongroup.htm",
	"text!../widgets/groupfooter.htm",
	"text!../widgets/kswitch.htm",
	"text!../widgets/imageupload.htm",
	"text!../widgets/list.htm",
	"text!../widgets/steps.htm",
	"text!../widgets/step.htm",
	"text!../widgets/defaultfilter.htm",
	"text!../widgets/morefilter.htm",
	"text!../widgets/location.htm",
	"text!../widgets/latticepanel.htm",
], function($, jqTmpl, defaultdata, alink, amount, async, attachmentlist, blank, bottom, bottomgroup, button, chart, checkbox, checkboxgroup, code, createdate, creator, datagrid, date, datetime, decimal, editor, entry, extendedpropertiespanel, fields, filter, filtertab, filtertabgroup, goodssearch, group, html, richtext, htmltext, iframe, image, img, imggroup, input, label, latticerowpanel, layout, linkgroup, listdatagrid, menubutton, menubuttongroup, mobilesearch, modifier, modifydate, multilanguagetext, mltext, navtab, navtabgroup, node, number, option, pageview, panel, price, qty, radio, radiogroup, scancode, scroller, searcher, select, selectdata, selectdatam, simplefilter, simpleoption, sku, sort, style, tab, tabgroup, table, tabnav, tabpanel, 
	tag, td, text, textarea, toolbar, tr, tree, video, starscore, kswiper, view, countdown, appmain, tabbar, tabbaritem, palette, levelmenu, switchtabbar, switchtabbaritem, admindivision, searchhistory, leftslipbuttongroup, groupfooter, kswitch, imageupload, list, steps, step, defaultfilter, morefilter,location,latticepanel) {
	return {
		renderWidget: function(obj, temp, curNode, parentsType=[]) {
			var nodes = {
				"a": alink,
				"amount": amount,
				"async": async,
				"attachmentlist": attachmentlist,
				"blank": blank,
				"bottom": bottom,
				"bottomgroup": bottomgroup,
				"button": button,
				"chart": chart,
				"checkbox": checkbox,
				"checkboxgroup": checkboxgroup,
				"code": code,
				"createdate": createdate,
				"creator":creator,
				"datagrid": datagrid,
				"date": date,
				"datetime": datetime,
				"decimal": decimal,
				"editor": editor,
				"entry": entry,
				"extendedpropertiespanel": extendedpropertiespanel,
				"fields": fields,
				"filter": filter,
				"filtertab": filtertab,
				"filtertabgroup": filtertabgroup,
				"goodssearch": goodssearch,
				"group": group,
				"html": html,
				"richtext": richtext,
				"htmltext": htmltext,
				"iframe": iframe,
				"image": image,
				"img": img,
				"imggroup": imggroup,
				"input": input,
				"label": label,
				"latticerowpanel": latticerowpanel,
				"layout": layout,
				"linkgroup": linkgroup,
				"listdatagrid": listdatagrid,
				"menubutton": menubutton,
				"menubuttongroup": menubuttongroup,
				"mobilesearch": mobilesearch,
				"modifier":modifier,
				"modifydate" :modifydate,
				"multilanguagetext": multilanguagetext,
				"mltext": mltext,
				"navtab": navtab,
				"navtabgroup": navtabgroup,
				"node": node,
				"number": number,
				"option": option,
				"pageview": pageview,
				"panel": panel,
				"price": price,
				"qty": qty,
				"radio": radio,
				"radiogroup": radiogroup,
				"scancode": scancode,
				"scroller": scroller,
				"searcher": searcher,
				"select": select,
				"selectdata": selectdata,
				"selectdatam": selectdatam,
				"simplefilter": simplefilter,
				"simpleoption": simpleoption,
				"sku":sku,
				"sort": sort,
				"style": style,
				"tab": tab,
				"tabgroup": tabgroup,
				"table": table,
				"tabnav": tabnav,
				"tabpanel": tabpanel,
				"tag": tag,
				"td": td,
				"text": text,
				"textarea": textarea,
				"toolbar": toolbar,
				"tr": tr,
				"tree": tree,
				"video": video,
				"kswiper": kswiper,
				"view": view,
				"starscore": starscore,
				"countdown": countdown,
				"appmain": appmain,
				"tabbar": tabbar,
				"tabbaritem": tabbaritem,
				"palette": palette,
				"levelmenu": levelmenu,
				"switchtabbar": switchtabbar,
				"switchtabbaritem": switchtabbaritem,
				"admindivision": admindivision,
				"searchhistory": searchhistory,
				"leftslipbuttongroup": leftslipbuttongroup,
				"groupfooter": groupfooter,
				"kswitch": kswitch,
				"imageupload": imageupload,
				"list": list,
				"steps": steps,
				"step": step,
				"defaultfilter": defaultfilter, 
				"morefilter": morefilter,
				"location": location,
				"latticepanel": latticepanel
			};
			var formatContent = function(str){
			    str = str ? str : "";
			    var r = str.match(/({ml\|)([\S\s]*?)}/ig);
			    if(r && r !== null){
			        for(var i = 0; i < r.length;i++){
			            var c = r[i].match(/(^{ml\|)([\S\s]*?)}$/i);
			            if(c && c !== null){
			        	    str = str.replace(c[0],c[2]);
			            }
			        }
			    }
			    return str;
		    }
			var data = {};
			var tem = null;
			if (dateControl.includes(temp)) {
                temp = 'datetime';
            } else if (selectdataCtrl.includes(temp)) {
                temp = 'selectdata';
            } else if (inputCtrl.includes(temp)) {
                temp = 'input';
            } else if (selectCtrl.includes(temp)) {
                temp = 'select';
            } else if (priceCtrl.includes(temp)) {
                temp = 'price';
            } else if (panelCtrl.includes(temp)) {
                temp = 'panel';
            } else if (filterCtrl.includes(temp)) {
                temp = 'filter';
            } else if (['html', 'richtext'].includes(temp)) {
                temp = 'richtext';
            } else if (switchtabbaritemCtrl.includes(temp)) {
                temp = 'switchtabbaritem';
            }
			if(nodes[temp]){
				tem = nodes[temp];
				obj = formatCoustomData(temp, obj, curNode, parentsType, defaultdata);
			}else if(typeof obj === "string") {
				var name = obj,obj = {};
				var property = Array.prototype.slice.call(curNode.attributes);
				for(var a in property) {
					var node = property[a];
					obj[node.nodeName] = node.nodeValue;
				}
				if(name !== '_customData') {
					obj["xml"] = name.toLowerCase();
				}
				tem = nodes[name];
			}else{
				var c = $.extend(true,{},curNode);
				var defaultN = $(c.outerHTML);
				defaultN.attr("viewid","${control.viewid}");
				if(curNode && curNode.childElementCount > 0){
					defaultN.children().remove();
				}
				tem = "<div>" + defaultN[0].outerHTML + "</div>";
			}
			var strObj = JSON.stringify(obj);
			strObj = formatContent(strObj);
			data['control'] = JSON.parse(strObj);
			let control = data.control
			data['control'] = control
			data['controlStr'] = strObj;
			if(curNode){
				data['content'] = formatContent(curNode.innerHTML);
				if(!['html','htmltext','richtext','style'].includes(curNode.nodeName.toLowerCase())){
					data['content'] = data['content'].replace(/{([\S\s]*?)}/ig,"param");
				}
			}
			return $(tem).tmpl(data);
		}
	}
});

// curNode当前节点 parentsType 为当前节点的祖先xmlname, control为当前xml的属性对象
function formatCoustomData(xml, control, curNode, parentsType, defaultdata) {
	//_customData为自定义处理数据，不作为xml属性，仅作为渲染用
	if(!control._customData) control._customData = {}
	if(!control._customData.plat) {
		control._customData.plat = $('.show-container .show>.view')[0].getAttribute('platform')
	}
	control._customData.inlineGrid = parentsType.includes('datagrid')
	control._customData.inlineList = parentsType.includes('list')
	// 针对移动端表格内含有label的组件处理
	if(includeLabelArr.includes(xml)) {
		if(!control.name || (control._customData.plat==='mobile' && (control._customData.inlineGrid || control._customData.inlineList))){
			control._customData.hideLable = true
		}
	}
	if(curNode && curNode.nodeName.toLowerCase()==="text"&&curNode.innerHTML.trim().length>0){
		control['fmtter'] = true;
	}
	// start 针对一些特殊组件处理数据，用于渲染
	if(xml === 'starscore') {
		formatStarNums(control)
	} else if(xml === 'countdown') {
		formatCountdown(control)
	} else if(xml === 'levelmenu') {
		let levelmenuData = defaultdata.levelmenu[control._customData.plat]
		control._customData = Object.assign(control._customData, {
			level1data: levelmenuData,
			level2data: levelmenuData[1].children,
			level3data: levelmenuData[1].children[1].children
		})
	} else if(xml === 'switchtabbaritem' || xml === 'switchtabbaritem') {
		control._customData.hideTabname = (control._customData.hasChild || (control.children && control.children.length)) ? ' hide' : ''
		control._customData.hideContent = (control._customData.hasChild || (control.children && control.children.length)) ? '' : ' hide'
	} else if(xml === 'scroller') {
		control._customData.height = 667 - 44 - parseInt(control.top || 0) - parseInt(control.bottom || 0)
	} else if(panelCtrl.includes(xml)){
	    if(control._customData.plat === 'pc' && control.position && curNode.previousElementSibling){
		   var isfpanel = ['left','right'].includes(curNode.previousElementSibling.getAttribute('position'));
		   var width = curNode.previousElementSibling.getAttribute('width');
		   var valiWidth = width&&Number(width.replace(/\D+?/g,''));
		   if(isfpanel && valiWidth && !isNaN(valiWidth)){
                control.width = 'calc(100% - '+width+')';		   
		   }
		}
		if(control.cols24 && control.marginright){
		    var w = ((Number(control.cols24)*0.04166667*100).toFixed(5))+'%'
		    control.width = "calc(" + w + " - "+control.marginright+") !important"
		}
	}else if(xml === 'kswitch'){
		if(control.showstyle && control.showstyle == '2' && control.switchtext) {
			var switchtextArr = control.switchtext.split('|')
			if(switchtextArr) {
				control._customData.switchtext0 = switchtextArr[0] || null
				control._customData.switchtext1 = switchtextArr[1] || null
			}
		}
		if(control._customData.plat === 'pc') {
			control._customData.hideLable = true
		}
	}else if(inputCtrl.includes(xml)){
	    if(control.class && control.class.match(/iconfont/)){
		    control._customData.hasIcon = true;
		}
	}else if(xml === 'latticepanel' && control.cols){
	   var len = Math.ceil(curNode.children.length/control.cols);
	   control._customData.grouparr = Array.from({ length: len }, (v, k) => { return 1 });
	   control._customData.colsarr = Array.from({ length: control.cols }, (v, k) => { return 1 });
	}else if(xml === 'label' && control.icon){
	    if(!control.iconposition && !control.labelposition){
		   control.iconposition = 'left';
		}
	}else if(xml === 'img'){
		if(!control.src){
		    control.src = "image/default.png";
		}
	}
	if(defaultdata[xml] && defaultdata[xml][control._customData.plat] && control.type !== 'Span' && control.type !== 'Clipboard'){
		control = Object.assign({},defaultdata[xml][control._customData.plat][0],control);
	}
	if(control.icon && !/\.(png|jpg|gif|jpeg|webp|aspx)+/.test(control.icon)) {
		control._customData.iconClass = defaultIcon[control.icon] || control.icon;
	}
	if(control.icon && control.icon.match(/\.(png|jpg|gif|jpeg|webp|aspx)+/)){
		control._customData.icon = presetPath(control.icon);
	}
	if(control.src){
		control._customData.src = presetPath(control.src);
	}
	control._customData.style = (control._customData.style||'') + getStyleByControl(control);
	if(control._customData.plat === 'mobile'){
	  control.class += ' cus-'+xml
	}
	return control
}
function presetPath(path){
    if(!path.match(/http|https/) && path.match(/\/static\/image/)){
    	path = window.location.href.split("/dev")[0]+path;
    }
	return path
}
// 根据xml属性数据拼接style
function getStyleByControl(control) {
	let styleStr = ''
	var backgroundImg = '' //背景图片处理
	if(control.flex) {
		styleStr += 'flex:' + control.flex + ';'
	}
	if(control.style && control.style.indexOf('background') !== -1) {
		var styleArr = control.style.split(';')
		var backgroundStr = styleArr.find(function(s){
			if(s.indexOf('background')!==-1 && s.indexOf('url') !==-1 ) {
				return　true
			}
			return false
		})
		backgroundImg = backgroundStr ?　backgroundStr.match(/\(([^)]*)\)/)[1] || '' : ''
	}
	if(control.background) {
		var background = control.background
		if(colorMap[background]) {
			styleStr += 'color:#fff;background:'+ colorMap[background] +';border-color:'+ colorMap[background] +';'
		}else{
			styleStr += 'background:' + background +';'
			var bgArr = background.match(/\(([^)]*)\)/) || []
			backgroundImg = bgArr[1] || backgroundImg || ''
		}
	}
	// 图片处理
	if(backgroundImg.indexOf('http') === -1 && backgroundImg.indexOf('./') === -1) {
		if(control._customData.plat === 'mobile' && backgroundImg.indexOf('/static/image/') !== -1) {
			styleStr += 'background-image:url('+ backgroundImg.replace('/static/image/', '../static/image/') + ');'
		}
		if(control._customData.plat === 'pc' && backgroundImg.indexOf('/staticweb/img/') !== -1) {
			styleStr += 'background-image:url('+ backgroundImg.replace('/staticweb/img/', '../staticweb/img/') + ');'
		}
	}
	if(control.height) {
		styleStr += 'height:' + getUnit(control.height)
	}
	if(control.width) {
		styleStr += 'width:' + getUnit(control.width)
	}
	if( control.xml==='button' && (control.width ||(control.style && control.style.indexOf('width') !== -1 && control.style.indexOf('min-width') === -1))) {
		styleStr += 'min-width:unset;'
	}
	if(control.marginright) {
		styleStr += 'margin-right:' + getUnit(control.marginright)
	}
	if(control.marginleft) {
		styleStr += 'margin-left:' + getUnit(control.marginleft)
	}
	if(control.margintop) {
		styleStr += 'margin-top:' + getUnit(control.margintop)
	}
	if(control.marginbottom) {
		styleStr += 'margin-bottom:' + getUnit(control.marginbottom)
	}
	if(control.paddingright) {
		styleStr += 'padding-right:' + getUnit(control.paddingright)
	}
	if(control.paddingleft) {
		styleStr += 'padding-left:' + getUnit(control.paddingleft)
	}
	if(control.paddingtop) {
		styleStr += 'padding-top:' + getUnit(control.paddingtop)
	}
	if(control.paddingbottom) {
		styleStr += 'padding-bottom:' + getUnit(control.paddingbottom)
	}
	if(control.fontsize) {
		styleStr += 'font-size:' + getUnit(control.fontsize)
	}
	if(control.color) {
		styleStr += 'color:' + control.color + ';'
	}
	if(control.textalign) {
		styleStr += 'text-align:' + control.textalign + ';'
	}
	if(styleStr) styleStr=';'+styleStr
	return styleStr
}
function getUnit(data) {
	if(!data) return ''
	data = data.trim()
	if(/(%|px|calc)/.test(data)) {
		return data + ';'
	}
	return data + 'px;'
}
// 处理starscore组件
function formatStarNums(obj) {
	let num = obj.num || 5
	let starnums = []
	for(let i=0;i<num; i++) {
		starnums[i] = i
	}
	// _customData为自定义处理数据，非原数据
	obj._customData = {starnums}
}
function formatCountdown(countdownObj) {
	
	const second = countdownObj.value || 0
	setSplitorFrom(countdownObj._customData)
	setTimeBySecond(second, countdownObj._customData)
	
}
function setSplitorFrom(countdownObj) {
	const format = countdownObj.format || '{{dd}}天{{hh}}:{{mm}}:{{ss}}'
	const formatArr = format.match(/\{[^\}]+\}\}/g) || []
	countdownObj.splitor = {}
	countdownObj.isShow = {}
	countdownObj.timePrefix = {} // 时间的前缀，如果dd模式，需要显示01
	formatArr.forEach((item, index) => {
		const startIndex = format.indexOf(item) + item.length;
		const endIndex = formatArr[index + 1] ? format.indexOf(formatArr[index + 1]) : format.length;
		const splitorStr = format.substring(startIndex, endIndex) || "";
		if (item === "{{dd}}" || item === "{{d}}") {
			if (item === "{{dd}}") {
				countdownObj.timePrefix.day = "0";
			}
			countdownObj.isShow.day = true
			countdownObj.splitor.day = splitorStr;
		}
		if (item === "{{hh}}" || item === "{{h}}") {
			if (item === "{{hh}}") {
				countdownObj.timePrefix.hour = "0";
			}
			countdownObj.isShow.hour = true
			countdownObj.splitor.hour = splitorStr;
		}
		if (item === "{{mm}}" || item === "{{m}}") {
			if (item === "{{mm}}") {
				countdownObj.timePrefix.min = "0";
			}
			countdownObj.isShow.minute  = true
			countdownObj.splitor.min = splitorStr;
		}
		if (item === "{{ss}}" || item === "{{s}}") {
			if (item === "{{ss}}") {
				countdownObj.timePrefix.second = "0";
			}
			countdownObj.isShow.second  = true
			countdownObj.splitor.second = splitorStr;
		}
	});
}
// 计算时间，天，时，分，秒
function setTimeBySecond(second, countdownObj) {
	// 分时天与秒的单位转换数
	if (second === 0) {
		countdownObj.second = (countdownObj.timePrefix.second || "") + second
		countdownObj.day = (countdownObj.timePrefix.day || "") + 0;
		countdownObj.hour = (countdownObj.timePrefix.hour || "") + 0;
		countdownObj.minute = (countdownObj.timePrefix.min || "") + 0;
	}
	if (second > 0) {
		const m = 60,
			h = 60 * m,
			d = 24 * h;
		// 不显示天数时，需要全部转换为小时数
		countdownObj.day = countdownObj.showDay && countdownObj.isShow.day ? Math.floor(second / d) : 0;
		countdownObj.hour = countdownObj.showDay && countdownObj.isShow.hour ? Math.floor((second - countdownObj.day * d) / h) :  (countdownObj.isShow.hour ? Math.floor(second / h) : 0);
		countdownObj.minute = Math.floor((second - countdownObj.day * d - countdownObj.hour * h) / m);
		countdownObj.second = second % m;
		if (countdownObj.day < 10) {
			countdownObj.day = (countdownObj.timePrefix.day || "") + countdownObj.day;
		}
		if (countdownObj.hour < 10) {
			countdownObj.hour = (countdownObj.timePrefix.hour || "") + countdownObj.hour;
		}
		if (countdownObj.minute < 10) {
			countdownObj.minute = (countdownObj.timePrefix.min || "") + countdownObj.minute;
		}
		if (countdownObj.second < 10) {
			countdownObj.second = (countdownObj.timePrefix.second || "") + countdownObj.second;
		}
	}
}