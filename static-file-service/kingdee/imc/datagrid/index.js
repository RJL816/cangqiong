(function(KDApi,$,_){

    !function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.pwyToolTip=n():t.pwyToolTip=n()}(window,(function(){return function(t){var n={};function e(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,e),r.l=!0,r.exports}return e.m=t,e.c=n,e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:o})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(e.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var r in t)e.d(o,r,function(n){return t[n]}.bind(null,r));return o},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=0)}([function(t,n,e){"use strict";e.r(n);e(1);var o,r=function(t){var n=t.selector,e=void 0===n?"":n,o=t.tipOuterCls,r=void 0===o?"outerPwyTip":o,i=t.tipsCls,a=void 0===i?"tipsText":i;if(!e)return!1;var p,l,c=!1,s=0,u=0,d="",f=0,v=0,h=function(t){if(c){var n=$(t.target),o=n.closest(e),i=n.closest(".pwyToolTip"),a=l-p,d=Math.abs(t.pageX-s),h=Math.abs(t.pageY-u);0===o.length&&0===i.length&&(d<15&&h<15?l=+new Date:d>f||h>v||a>800?($("."+r).remove(),c=!1,p=+new Date,l=p):l=+new Date)}};return $(document).on("mouseenter",e,(function(t){if(!c){var n;c=!0,p=+new Date,l=+new Date,s=t.pageX,u=t.pageY,n=(new Date).getTime(),d="pwy-tool-tip-"+"xxxxxxxxxxxxxxxxxxxxxxxx".replace(/[xy]/g,(function(t){var e=(n+16*Math.random())%16|0;return n=Math.floor(n/16),("x"==t?e:3&e|8).toString(16)})),f=$(e).width(),v=$(e).height();var o=$(document).width(),i=$(document).height(),h=$(t.target),x=h.closest(e).find("."+a).html(),y=h.width(),b=h.height(),m=h.offset(),g="leftTop",w=!1,T=!1,j={x:m.left,y:m.top+b+10},M=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",n=arguments.length>1?arguments[1]:void 0;return'\n        <div style="position: absolute; top: 0px; left: 0px; width: 100%;z-index:9999 !important" class="'.concat(r,'" id="').concat(n,'">\n            <div class="pwyToolTip" style="left: 0; top: 0;visibility:hidden;">\n                <div class="pwy-tooltip-content">\n                    <div class="pwy-tooltip-arrow"></div>\n                    <div class="pwy-tooltip-inner" style="max-height: 300px;overflow: auto;">\n                        <div style="padding: 10px;">\n                            ').concat(t,"\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>")}(x,d);$("body").append(M),$("#"+d+"."+a).css({display:"block"});var k=$("#"+d+" .pwy-tooltip-content"),S=k.width(),C=k.height();j.y+C>i&&(j.y=m.top-C-b+20,w=!0),j.x+S>o&&(j.x=m.left-S+y,T=!0),g=w?T?"bottomRight":"bottomLeft":T?"topRight":"topLeft",$("#"+d+" .pwy-tooltip-arrow").attr("class","pwy-tooltip-arrow "+g),$("#"+d+" .pwyToolTip").css({visibility:"visible",top:j.y+"px",left:j.x+"px"})}})),$(document).on("mousemove",h),$(document).on("mousemove",e,h),$(document).on("click",(function(t){var n=$(t.target),o=n.closest(e),i=n.closest(".pwyToolTip");0===o.length&&0===i.length&&($("."+r).remove(),c=!1)})),$(document).scroll((function(){$("."+r).remove()})),!0},i=(o=!1,function(t){return o||(r(t),o=!0),!0});n.default=i},function(t,n,e){var o=e(2),r=e(3);"string"==typeof(r=r.__esModule?r.default:r)&&(r=[[t.i,r,""]]);var i={insert:"head",singleton:!1};o(r,i);t.exports=r.locals||{}},function(t,n,e){"use strict";var o,r=function(){return void 0===o&&(o=Boolean(window&&document&&document.all&&!window.atob)),o},i=function(){var t={};return function(n){if(void 0===t[n]){var e=document.querySelector(n);if(window.HTMLIFrameElement&&e instanceof window.HTMLIFrameElement)try{e=e.contentDocument.head}catch(t){e=null}t[n]=e}return t[n]}}(),a=[];function p(t){for(var n=-1,e=0;e<a.length;e++)if(a[e].identifier===t){n=e;break}return n}function l(t,n){for(var e={},o=[],r=0;r<t.length;r++){var i=t[r],l=n.base?i[0]+n.base:i[0],c=e[l]||0,s="".concat(l," ").concat(c);e[l]=c+1;var u=p(s),d={css:i[1],media:i[2],sourceMap:i[3]};-1!==u?(a[u].references++,a[u].updater(d)):a.push({identifier:s,updater:x(d,n),references:1}),o.push(s)}return o}function c(t){var n=document.createElement("style"),o=t.attributes||{};if(void 0===o.nonce){var r=e.nc;r&&(o.nonce=r)}if(Object.keys(o).forEach((function(t){n.setAttribute(t,o[t])})),"function"==typeof t.insert)t.insert(n);else{var a=i(t.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(n)}return n}var s,u=(s=[],function(t,n){return s[t]=n,s.filter(Boolean).join("\n")});function d(t,n,e,o){var r=e?"":o.media?"@media ".concat(o.media," {").concat(o.css,"}"):o.css;if(t.styleSheet)t.styleSheet.cssText=u(n,r);else{var i=document.createTextNode(r),a=t.childNodes;a[n]&&t.removeChild(a[n]),a.length?t.insertBefore(i,a[n]):t.appendChild(i)}}function f(t,n,e){var o=e.css,r=e.media,i=e.sourceMap;if(r?t.setAttribute("media",r):t.removeAttribute("media"),i&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),t.styleSheet)t.styleSheet.cssText=o;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(o))}}var v=null,h=0;function x(t,n){var e,o,r;if(n.singleton){var i=h++;e=v||(v=c(n)),o=d.bind(null,e,i,!1),r=d.bind(null,e,i,!0)}else e=c(n),o=f.bind(null,e,n),r=function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)};return o(t),function(n){if(n){if(n.css===t.css&&n.media===t.media&&n.sourceMap===t.sourceMap)return;o(t=n)}else r()}}t.exports=function(t,n){(n=n||{}).singleton||"boolean"==typeof n.singleton||(n.singleton=r());var e=l(t=t||[],n);return function(t){if(t=t||[],"[object Array]"===Object.prototype.toString.call(t)){for(var o=0;o<e.length;o++){var r=p(e[o]);a[r].references--}for(var i=l(t,n),c=0;c<e.length;c++){var s=p(e[c]);0===a[s].references&&(a[s].updater(),a.splice(s,1))}e=i}}}},function(t,n,e){(n=e(4)(!1)).push([t.i,".pwyToolTip {\n  max-width: 350px;\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n  color: rgba(0, 0, 0, 0.65);\n  font-size: 14px;\n  font-variant: tabular-nums;\n  line-height: 1.5;\n  list-style: none;\n  font-feature-settings: 'tnum';\n  position: absolute;\n  z-index: 1060;\n  display: block;\n  visibility: visible;\n  margin-bottom: 20px;\n}\n.pwyToolTip .pwyToolTipHidden {\n  display: none;\n}\n.pwyToolTip .pwy-tooltip-inner {\n  min-width: 30px;\n  min-height: 32px;\n  color: #333;\n  text-align: left;\n  text-decoration: none;\n  word-wrap: break-word;\n  background-color: #fff;\n  border-radius: 4px;\n  box-shadow: 0 2px 8px #000000;\n}\n.pwyToolTip .pwy-tooltip-content {\n  padding-right: 8px;\n  margin-bottom: 10px;\n}\n.pwyToolTip .pwy-tooltip-arrow {\n  position: absolute;\n  display: block;\n  width: 13.07106781px;\n  height: 13.07106781px;\n  overflow: hidden;\n  background: transparent;\n  pointer-events: none;\n}\n.pwyToolTip .pwy-tooltip-arrow.topLeft {\n  top: -13px;\n  left: 7px;\n}\n.pwyToolTip .pwy-tooltip-arrow.topRight {\n  top: -13px;\n  right: 15px;\n}\n.pwyToolTip .pwy-tooltip-arrow.bottomLeft {\n  bottom: -4px;\n  left: 7px;\n  transform: rotate(180deg);\n}\n.pwyToolTip .pwy-tooltip-arrow.bottomRight {\n  bottom: -4px;\n  right: 15px;\n  transform: rotate(180deg);\n}\n.pwyToolTip .pwy-tooltip-arrow::before {\n  background: #aaa;\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  display: block;\n  width: 10px;\n  height: 10px;\n  margin: auto;\n  background-color: rgba(0, 0, 0, 0.4);\n  content: '';\n  pointer-events: auto;\n  transform: translateY(6.53553391px) rotate(45deg);\n}\n.pwyToolTip ::-webkit-scrollbar-thumb {\n  background-color: #ccc;\n  outline-offset: -2px;\n  border-radius: 3px;\n}\n.pwyToolTip ::-webkit-scrollbar {\n  width: 6px;\n  height: 6px;\n}\n",""]),t.exports=n},function(t,n,e){"use strict";t.exports=function(t){var n=[];return n.toString=function(){return this.map((function(n){var e=function(t,n){var e=t[1]||"",o=t[3];if(!o)return e;if(n&&"function"==typeof btoa){var r=(a=o,p=btoa(unescape(encodeURIComponent(JSON.stringify(a)))),l="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(p),"/*# ".concat(l," */")),i=o.sources.map((function(t){return"/*# sourceURL=".concat(o.sourceRoot||"").concat(t," */")}));return[e].concat(i).concat([r]).join("\n")}var a,p,l;return[e].join("\n")}(n,t);return n[2]?"@media ".concat(n[2]," {").concat(e,"}"):e})).join("")},n.i=function(t,e,o){"string"==typeof t&&(t=[[null,t,""]]);var r={};if(o)for(var i=0;i<this.length;i++){var a=this[i][0];null!=a&&(r[a]=!0)}for(var p=0;p<t.length;p++){var l=[].concat(t[p]);o&&r[l[0]]||(e&&(l[2]?l[2]="".concat(e," and ").concat(l[2]):l[2]=e),n.push(l))}},n}}]).default}));

    pwyToolTip({
        selector: '.outTipsText',
        tipOuterCls: 'outerPwyTip',
        tipsCls: 'tipsText'
    });
    console.log('datagrid top-----');
    function MyComponent(model){
        this._setModel(model);
    }

    var isUpdate = false;
    MyComponent.prototype = {
        _setModel: function(model) {
            this.model = model;
        },
        init:function(props){
          console.log('-----init',this.model,props)
          isUpdate = false;
          setHtml(this.model,props,isUpdate);

        },
        update:function(props){
          console.log('-----update',this.model,props)
          isUpdate = true;
          setHtml(this.model,props,isUpdate);
        },
        destoryed:function(){
            console.log('-----destoryed',this.model)
        }

    }
	var setHtml = function(model,props,isUpdate){
		var data={};
		var operate;
		var tableId;
		if(props!=null&&props.data!=null){
			var popsData=props.data;
			operate=popsData['operate'];
			tableId=popsData['tableId'];
			var str = JSON.stringify(popsData['data']);
			if(str!=null){
				data=JSON.parse(str);
			}
		}
		if(operate=='deleteRow'){
			deleteRow(tableId,model);
		}else if(operate=='clearTable'){
			clearTable(tableId,model);
		}else if(operate=='clearSelect'){
			$("#"+tableId).find('input:checkbox[name="checkRow"]').prop("checked", '');
		}else if(operate=='loadData'){
			KDApi.loadFile('./css/datagrid.css', model,function(){
				KDApi.templateFilePath('./html/datagrid.html', model,popsData).then(
					function(result){
						if(model.dom.innerHTML === "" || isUpdate){
							model.dom.innerHTML = result;
						}
						initEvent(model,props);
					}
				)
			})
		}else{
			 operateRow(tableId,model,operate);
		}
    }
	var initEvent = function(model,props){
		var tableId;
		var startX = 0;
		var startWidth = 0;
		var thSelector = null;
		var isPointerdown = false;
		if(props!=null&&props.data!=null){
			var popsData=props.data;
			tableId=popsData['tableId'];
		}

		if(tableId){
			$("#"+tableId+" #check_all").click(function () {
				if ($(this).prop("checked")) {
					$(this).parents("#"+tableId).find('input:checkbox[name="checkRow"]').prop("checked", 'checked');
				} else {
					$(this).parents("#"+tableId).find('input:checkbox[name="checkRow"]').prop("checked", '');
				}
			});
			$("#"+tableId+" .click_class",model.dom).click(function(){
				model.invoke('datagrid_click',{"tableId":tableId,"clickkey":$(this).attr("clickkey"),"rowkey":$(this).parents("tr").attr('rowkey')});
			});
	
			$("#"+tableId+" .resizer").on("mousedown", function(e) {
				thSelector = "#" + $(this).closest("th").attr("id");
				startX = e.pageX;
				startWidth = $(thSelector).outerWidth();
				isPointerdown = true;

				e.preventDefault(); // Prevent text selection
			});

			$("#"+tableId).on("mousemove", function(e) {
				if (isPointerdown) {
					const newWidth = startWidth + (e.pageX - startX);
					// console.log('mousemove', newWidth)
					if (newWidth > 50) { // Ensure minimum width
						$(thSelector).css("width", newWidth + "px");
					}
				}
			});

			$("#"+tableId).on("mouseup", function(e) {
				startX = 0;
				startWidth = 0;
				resizer = null;
				isPointerdown = false;
			});
		}
	}
	var deleteRow=function(tableId,model){
		console.log('-----deleteRow',tableId);
		var serialArray=[];
		$("#"+tableId).find('input:checkbox[name="checkRow"]:checked').each(function() { // 遍历选中的checkbox
			var tr = $(this).parents("tr");
			serialArray.push(tr.attr('rowkey'));
			var n = tr.index()+1;  // 获取checkbox所在行的顺序
            $("table#"+tableId).find("tr:eq("+n+")").remove();
		});
		model.invoke('datagrid_deleteRow',{"tableId":tableId,"rows":serialArray});
	}

	var operateRow=function(tableId,model,operate){
		console.log('-----',operate,tableId);
		var serialArray=[];
		$("#"+tableId).find('input:checkbox[name="checkRow"]:checked').each(function() { // 遍历选中的checkbox
			var tr = $(this).parents("tr");
			serialArray.push(tr.attr('rowkey'));
		});
		model.invoke('datagrid_'+operate,{"tableId":tableId,"rows":serialArray});
	}
	var clearTable=function(tableId,model){
		console.log('-----clearTable',tableId);
		$("#"+tableId+"  tr:not(:first)").html("");
		model.invoke('datagrid_clearTable',{"tableId":tableId});
	}

    KDApi.register('datagrid', MyComponent)
})(window.KDApi,jQuery);
