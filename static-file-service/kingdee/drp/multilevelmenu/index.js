(function (KDApi,$) {
  function MyComponent(model) {
    this._setModel(model);
  }
  MyComponent.prototype = {
    _setModel: function (model) {
      this.model = model;
    },
    init: function (props) {
		$(this.model.dom).css({"overflow-x":"hidden"});
		this.setHtml(this.model,props);
		this.createStyle(props);
    },
    update: function (props) {
		
    },
    destoryed: function () {},
	getMClassKey:function(model){
		return `${model.key}${model.pageId}`;
	},
	getMClassUlKey:function(model){
		return `${model.key}_ul${model.pageId}`;
	},
	getSubClassKey:function(model){
		return `${model.key}_submclass${model.pageId}`;
	},
	getClickKey:function(model){
		return `_groupmenu${model.pageId}`;
	},
	getdropdownkey:function(model){
		return `dropdown${model.pageId}`;
	},
	setHtml:function (model, props) {
		var mclasskey = this.getMClassKey(model);	
		var mclasskey_u = this.getMClassUlKey(model);
		var dropdownkey = this.getdropdownkey(model);
		KDApi.loadFile("./css/style.css", model, () => {
		var s =`<div class="multi-class-left" id="${mclasskey}" >
					<ul class="thing-variety" id="${mclasskey_u}">
					</ul>
				</div>	`;
		var submclass_key = this.getSubClassKey(model);
		var s1=`<div class="dropdown ${dropdownkey} hiden" id="${submclass_key}">
				</div>	
				`;
		//$('body').append(s1);
		var dpd = document.createElement("div");
		$dpd = $(dpd);
		$dpd.addClass(`dropdown ${dropdownkey} hiden`);
		$dpd.attr("id",submclass_key);
		model.dom.parentElement.parentElement.parentElement.appendChild(dpd);
		model.dom.innerHTML=s;
		//var $cPEL = $(model.dom);
		//$cPEL.css({"overscroll-behavior":"contain"});
		let pos = model.dom.parentElement.parentElement.getBoundingClientRect();
		var $dropdown = $('.'+dropdownkey);
		$dropdown.css({"left":`${pos.width-2}px`,"top":`0px`,"height":`${pos.height}px`});
		this.setData(model,props);
		this.initEvent(model);
      })
  },
  setData:function(model,props){
		let pos = model.dom.parentElement.getBoundingClientRect();
		var configItem = this.getConfigItem(props);
		var main_fontsize = configItem["main.fontsize"];
		var main_fontcolor = configItem["main.fontcolor"];
		var main_hover_bg=configItem["main.hover.bg"];
		var main_hover_color=configItem["main.hover.color"];
	  	var mclasskey = this.getMClassKey(model);	
		var mclasskey_u = this.getMClassUlKey(model);
		var dropdownkey = this.getdropdownkey(model);
		this.setFirstCategory(model,props);
		this.setDetailCategory(model,props);
	  	var mclass = $('#'+mclasskey);
		var submclass_key=this.getSubClassKey(model);
		mclass.css({"width":`${pos.width}px`});	
		if (main_fontsize!=undefined){
			mclass.css({"font-size":main_fontsize});
		}
		if (main_fontcolor!=undefined){
			mclass.css({"color":main_fontcolor});
		}
		var $tabItem = $(`#${mclasskey} .tab-item`);
		var $fmaint = $(`#${submclass_key} .fmaint`);
		var $at = $(`#${mclasskey_u} a`);
		var $spant = $(`#${mclasskey_u} span`);
		var $dropdown = $('.'+dropdownkey);

		$tabItem.each(function (index) {
			$(this).mouseover(function () {
				let pos = mclass[0].parentElement.parentElement.parentElement.getBoundingClientRect();	
				$dropdown.css({"left":`${pos.width-2}px`,"top":`0px`});
				
				var sub = $fmaint.eq(index);
				if (sub.attr("nodata")==undefined || sub.attr("nodata")!="true"){
					$dropdown.removeClass('hiden');
				}else{
					$dropdown.addClass('hiden');
				}
				$(this).addClass('showLi');
				if (main_hover_color!=undefined){
					$at.eq(index).css({'color':main_hover_color});
					$spant.eq(index).css({'color':main_hover_color});
				}
				if (main_hover_bg!=undefined){
					$(this).css({'background':main_hover_bg});
				}
				$at.eq(index).addClass('showA');
				$spant.eq(index).addClass('showSpan');
				$fmaint.eq(index).removeClass('hiden').siblings().addClass('hiden');
			}).mouseout(function () {
				$dropdown.addClass('hiden');
				$(this).removeClass('showLi');
				$fmaint.eq(index).addClass('hiden');
				$at.eq(index).removeClass('showA');
				$spant.eq(index).removeClass('showSpan');
				if (main_fontcolor!=undefined){
					$at.eq(index).css({'color':main_fontcolor});
					$spant.eq(index).css({'color':main_fontcolor});
				}
				if (main_hover_bg!=undefined){
					$(this).css({'background':""});
				}
			});
		});
		$fmaint.each(function (index) {
			$(this).mouseover(function () {
				$dropdown.removeClass('hiden');
				$tabItem.eq(index).addClass('showLi');
				$fmaint.eq(index).removeClass('hiden').siblings().addClass('hiden');
				$at.eq(index).addClass('showA');
				$spant.eq(index).addClass('showSpan');
			}).mouseout(function () {
				$dropdown.addClass('hiden');
				$at.eq(index).removeClass('showA');
				$spant.eq(index).removeClass('showSpan');
				$tabItem.eq(index).removeClass('showLi');
				$fmaint.eq(index).addClass('hiden');
			});
		});
  },
  setFirstCategory:function(model,props){
	var mclass_u = $("#"+this.getMClassUlKey(model));
	var configItem = this.getConfigItem(props);
	var main_fontcolor = configItem["main.fontcolor"];
	var style = "";
	if (main_fontcolor!=undefined){
		style = "color:"+main_fontcolor;
	}
	var clickKey =this.getClickKey(model);
	var htmlTemplate=`<li class="tab-item">
                        <div class="thname">
                            <label><a href="#" style="${style}" class="<%= clickKey%>" nodeid="<%= nodeid%>"><%= title %></a></label>
                            <span style="${style}" ><img src="./kingdee/drp/multilevelmenu/img/rightarrow.png" height="12px" /></span>
                        </div>
               </li>`
	var result="";
	for(var i=0;i<props.data.length;i++){
      result = result + KDApi.getHTMLStringBytemplate(htmlTemplate, {
        title: props.data[i].text,
		nodeid:props.data[i].id,
		clickKey:clickKey
      });
	}
	mclass_u.html(result);
	var mclass_u_li = $("#"+this.getMClassUlKey(model) +" li a");
	mclass_u_li.hov
  },
  setDetailCategory:function(model,props){
	var subClass = $("#"+ this.getSubClassKey(model));
	var clickKey =this.getClickKey(model);
	var htmlTemplate=`<div class="fmaint clear hiden">
						<div class="subitems">
							{substr}
						</div>
					  </div>`;
	var noDataTemplate=`<div class="fmaint clear hiden" nodata="true"></div>`;
	var secTemplage=`<dl class="sub<%= index%>">
                                <dt><a href="#" class="<%= clickKey%>" nodeid="<%= nodeid%>"><%= title%><span>&gt;</span></a></dt>
                                <dd>
								{substr}
                                </dd>
							</dl>`;
	var trdTemplate=` <a href="#" class="<%= clickKey%>" nodeid="<%= nodeid%>"><%= title%></a>`;
	var result="";
	for(var i=0;i<props.data.length;i++){
		var first = props.data[i];
		if (first.children!=null && first.children!=undefined && first.children.length>0){
			//second
			var trdStr="";
			for(var j=0;j<first.children.length;j++){
				var sec = first.children[j];
				var substr="";
				if (sec.children!=null && sec.children!=undefined && sec.children.length>0){
					//trd
					for(var k=0;k<sec.children.length;k++){
						var trd = sec.children[k];
						substr = substr + KDApi.getHTMLStringBytemplate(trdTemplate, {
							title: trd.text,
							nodeid:trd.id,
							clickKey:clickKey
						});
					}
				}
				trdStr = trdStr + KDApi.getHTMLStringBytemplate(secTemplage, {
					title: sec.text,
					index:j,
					nodeid:sec.id,
					clickKey:clickKey
				}).replace("{substr}",substr);
			}
			result = result + htmlTemplate.replace("{substr}",trdStr);
		}else{
			result= result + noDataTemplate
		}
	}
	subClass.html(result);
  },
  getConfigItem:function(props){
	  var data ={};
	  for(var i=0;i<props.configItems.length;i++){
		  var item = props.configItems[i];
		  data[item.key]=item.value;
	  }
	  return data;
  },
  initEvent:function(model){
	var clickKey =this.getClickKey(model);
	$('body').on('click','.'+clickKey,function(e){
		e.stopPropagation()
		let curdata = $(this).attr('nodeid');
		if(curdata){
			model.invoke("treeNodeClick", {"value":curdata+""});
		}
	  })
  },
  createStyle:function(props){
	  var styleElem = document.createElement("style");
	  styleElem.type = "text/css";
	  var cssText=`.subitems dl dt a:hover{
		                   color:<%= color%>;
					}
				   .subitems dl dd a:hover{
		                   color:<%= color%>;
					}`;
      cssText= KDApi.getHTMLStringBytemplate(cssText, {
					color: props.themeNum
				})							
	  styleElem.innerHTML = cssText;
	  //styleElem.appendChild(document.createTextNode(cssText));
	  document.head.appendChild(styleElem);
  }
  }
  KDApi.register("multilevelmenu", MyComponent);
})(window.KDApi,jQuery);
