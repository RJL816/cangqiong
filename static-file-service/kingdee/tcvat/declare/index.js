(function(KDApi,$,_){
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
		  if(props && props.data &&  props.data['tctrcriskinfos']){
			setTctrcRiskHtml(this.model,props,isUpdate,KDApi);
		  }else{
			setHtml(this.model,props,isUpdate);
		  }		
          
        },
        destoryed:function(){
            console.log('-----destoryed',this.model)
        }

    } 

	var setTctrcRiskHtml = function(model,props,isUpdate,KDApi){  
		var popsData=props.data;
		var ht = popsData['tctrcriskinfos'];
		model.dom.getElementsByClassName("riskWarning")[0].getElementsByClassName("riskContent")[1].innerHTML = props.data.tctrcriskinfohtml;
		var tctrcwarningsize= props.data.data.tctrcwarningsize;
		model.dom.getElementsByClassName("riskWarning")[0].getElementsByClassName("titleContent")[1].firstElementChild.innerHTML=KDApi.getLangMsg(model, number,{tctrcwarningsize:tctrcwarningsize});
		var pageid = props.data.data.pageid;
		if(0==tctrcwarningsize){
			$('#riskwarningtctrctitle_'+pageid).css("color","#26B175");
		}
		initEvent(model,props);
		debugger;
			
	};
    
	var setHtml = function(model,props,isUpdate){  
			var template='';
			var operation='';
			var sheetid=''; 
			var data={};  
			var hisCells='';
			if(props!=null&&props.data!=null){
				var popsData=props.data; 
				template=popsData['template'];//popsData.get('template'); 
				operation=popsData['operation'];//popsData.get('operation'); 
				sheetid=popsData['sheetid'];//popsData.get('sheetid');  
				var str = JSON.stringify(popsData['data']); 
				if(str!=null){
					data=JSON.parse(str); 
				}
				var hisCells = JSON.stringify(popsData['hisCells']); 
				if(hisCells!=null){
					hisCells=JSON.parse(hisCells); 
				} 
			}  
			if(template!=null){  
			 var defaultPath = './css/declare.css';
				KDApi.loadFile(defaultPath, model, loadFileCallback(model,props,template,data,isUpdate,sheetid,operation,hisCells))
			} 
    } 
	
	var loadFileCallback = function(model,props,template,data,isUpdate,sheetid,operation,hisCells) {
		var result = KDApi.template(template,data);
		if(model.dom.innerHTML == '' || isUpdate){
			model.dom.innerHTML = result;
		}
		initEvent(model,props); 
		if(sheetid!=''&&sheetid!=null&&sheetid!='null'){  
			selectTab(sheetid); 
		}
		setInputStatus(operation,hisCells);
	}
	
	var setInputStatus = function(operation,hisCells){  
		$(".tcvat-icon").hide(); 
		if('edit'==operation){ 
			//$('.tcvat-bor input').attr("readonly",false);  
			//$('.tcvat-bor input').removeClass("tcvat-read-input");  
        } else if('read'==operation){
			//$('.tcvat-bor input').attr("readonly",true);   
			//$('.tcvat-bor input').addClass("tcvat-read-input"); 
			if(''!=hisCells){  
				for(var i=0;i<hisCells.length;i++){  
					$("div[id='read_"+hisCells[i].id+"']").find("i").show();
					//$("#read_"+hisCells[i].id).find("i").show();
				}
			}
		}  		
	}

    var initEvent = function(model,props){ 
		var pageid=props.data['pageid']; 
		$('.tcvat-bor input',model.dom).change(function(){ 
			var cellid=$(this).attr("cellid");  
			var sheetid=$(this).attr("sheetid");  
			model.invoke('changeData',{"cellid":cellid,"sheetid":sheetid,"value":$(this).val()});  
        })  
		
		$('.tcvat-base input',model.dom).change(function(){ 
			var cellid=$(this).attr("cellid");   
			model.invoke('changeData',{"cellid":cellid,"value":'0'});  
        })  
		
		$('.tcvat-bor input',model.dom).click(function(){ 
			var cellid=$(this).attr("cellid");  
			var readonly=$(this).attr("readonly"); 
			if(!$(this).attr("readonly")){
				$('.remarkClass').hide();
				$("#remark_"+cellid).css("display","");//.hide();  
			}
        })  
		$('.tcvat-select select',model.dom).change(function(){  
			var cellid=$(this).attr("cellid");  
			model.invoke('changeData',{"cellid":cellid,"value":$(this).val()});   
		})
		
		$('.tcvat-combo input',model.dom).change(function(){  
			var cellid=$(this).attr("cellid");  
			var checked=$(this).is(':checked'); 
			var val=$(this).attr('value');  
			var radio1=$(this).attr('radio');  
			var val=''; 
			if(radio1&&radio1=='true'){ 
			//单选
				if(checked){ 
					$(this).attr("checked",true);
					$(this).siblings().attr("checked",false);
				}else{ 
					val=' ';
				} 
			}  
			$('#checkbox'+cellid+'>input[type=checkbox]:checked').each(function(){
				if(val==''){
					val=$(this).attr('value');
				}else{
					val=val+','+$(this).attr('value');
				} 
			}); 				
			model.invoke('changeData',{"cellid":cellid,"value":val});   
		})
		
		$('.tcvat-href a',model.dom).click(function(){ 
			var cellid=$(this).attr("cellid"); 
			var hreftype=$(this).attr("hreftype"); 
			var hrefpara=$(this).attr("hrefpara"); 
			model.invoke('datahref',{"cellid":cellid,"hreftype":hreftype,"hrefpara":hrefpara}); 
		})
		
		$('.remarkClass',model.dom).click(function(){ 
			var cellid=$(this).attr("cellid"); 
			model.invoke('showAddRemark',{"cellid":cellid}); 
		}) 
		$(".tcvat-icon",model.dom).click(function(){ 
			var cellid=$(this).attr("cellid"); 
			 model.invoke('detail',{"cellid":cellid}); 
		})   
		$(".tcvat-icon-base",model.dom).click(function(){ 
			var cellid=$(this).attr("cellid");  
			var baseEntityId=$(this).attr("baseEntityId"); 
			var displayProp=$(this).attr("displayProp");  
			model.invoke('showBaseData',{"cellid":cellid,"baseEntityId":baseEntityId,"displayProp":displayProp}); 
		})  		
		$(".tab-item-content",model.dom).click(function(){ 
			var tabid=$(this).attr("tabid");  
			var id=$(this).attr("id");    
			selectTab(id);
			model.invoke('selectSheet',{"sheetid":tabid}); 
		})  

		// $(".tcvat-read-cell").mouseover(function(){
		// 	var hashis=$(this).attr("hashis"); 
		// 	if(hashis){
		// 		$(this).find("i").show();
		// 	}	
		// })
		// $(".tcvat-read-cell").mouseout(function(){
		// 	var hashis=$(this).attr("hashis"); 
		// 	if(hashis){
		// 		$(this).find("i").hide();
		// 	}	
		// }) 
		$(".tcvat-read-input-base",model.dom).click(function(){ 
			var cellid=$(this).attr("cellid"); 
			this.select();
		}) 
		
		$('.taxDeclaration .riskWarning .riskTitle .titleContent div',model.dom).click(function(){ 
			var selectId = $(this).attr("id");
			var tctrcdisplayattr= $('#riskwarningtctrctitle_'+pageid).css("display");
			if("none"==tctrcdisplayattr){
				return;
			}
			//if( selectId.indexOf("riskwarningtitle_")>=0 ){
				// 添加选中效果
				//$('#riskwarningtitle_'+pageid).css("border-bottom","2px solid rgb(135, 169, 255)");
				//$('#riskwarningtctrctitle_'+pageid).css("border-bottom","");
				
				// 隐藏对应的 ul 样式
				// 隐藏风险管控
				//$('#tctrcriskul_'+pageid).css("display","none");
				//$('#riskwarningul_'+pageid).css("display","");
				
				//$('.taxDeclaration .riskWarning .tctrcriskul').css("display","none");
				//$('.taxDeclaration .riskWarning .riskwarningul').css("display","");
			//}else{
				// 添加选中效果
			//	$('#riskwarningtctrctitle_'+pageid).css("border-bottom","2px solid rgb(135, 169, 255)");
				//$('#riskwarningtitle_'+pageid).css("border-bottom","");
			
				//$('.taxDeclaration .riskWarning .riskwarningul').css("display","none");
				//$('.taxDeclaration .riskWarning .tctrcriskul').css("display","");
				
				//$('#riskwarningul_'+pageid).css("display","none");
				// 显示风险管控
				//$('#tctrcriskul_'+pageid).css("display","");
			//}
			 
		}) 
		// 申报预警(风险)绑定事件（查看详情）
		$('.taxDeclaration .riskWarning .riskContent li a',model.dom).click(function(){
			var tctrcresultid = $(this).attr("tctrcresultid");
			model.invoke('jumptotctrcrisk',{"tctrcresultid":tctrcresultid});
		})
		
		//申报预警绑定事件
		$('.taxDeclaration .riskWarning .riskContent li',model.dom).click(function(){ 
			//var cellid=$(this).attr("cellid"); 
			var lid = $(this).attr("id");
			//1.激活当前li，关闭其他li
			$('.taxDeclaration .riskWarning .riskContent li').removeClass("active");
			$('li[id='+lid+"]").addClass("active");
			//2.获取需要高亮的申报表单元格字符串，并且解析，点亮单元格及其所在的table。
			var items = $('#'+lid+" .items")[0].innerText;
			var itemArr = items.split(",");
			//去掉点亮的单元格样式
			$(".tcvat-content table td").removeClass("riskwarn");
			//去掉点亮的页签样式
			$(".declareTable .tab-item-content .riskCircle").removeClass("active");
			for(var i=0;i<itemArr.length;i++){
				$("td[id=td_"+itemArr[i]+"]").addClass("riskwarn");
				//根据sheetid改变页签预警标识
				$("td[id=td_"+itemArr[i]+"]").each(function(idx,ele){
					var sheetid = $(ele).attr("sheetid");
					$(".declareTable .tab-item-content[tabid="+sheetid+"] .riskCircle").addClass("active");
				});
				//var sheeetid = .attr("sheetid");
				
			}
			//跳转到指定页签
			var jumpid = $('#'+lid+" .contentTitle").attr("riskjump");				
			$("td[id=td_"+jumpid+"]").each(function(idx,ele){					
				var jumpsheetid = $(ele).attr("id");
				selectTab(jumpsheetid);
			});			
							
		});
	    //初始化预警的高度和申报表高度
		
		
		function calcHeight(){
			var html = $("div[id="+pageid+"]");		
			if(html&&html.length!=0){
					//获取选中元素的最大的一个的高度
				var length = html.length;
				var height = 0;
				for(var i=0;i<length;i++){
					heights = html.eq(i).height();
					if(heights>height){
						height = heights;
					}
				}
				$("div[id="+pageid+"] .declareTable .tcvat-content").height(height-65);
			}
		}	 
		//window.onresize = function() {
			//calcHeight();
		//}
		//calcHeight();		
		 
		$("div[id="+pageid+"] .Ww32GbIl").width("100%"); 
		
		$("#warn_open_"+pageid+"").click(function(){ 
			$("#taxDeclarationWarn_"+pageid+"").css("left","auto").css("right","40px").css("top","40px"); 
			var displaycss = $("#taxDeclarationWarn_"+pageid+"").css("display");
			if( displaycss == 'block' ){
				$("#taxDeclarationWarn_"+pageid+"").hide();
			}else{
				$("#taxDeclarationWarn_"+pageid+"").show();
			}
			
		});
		$("#warn_close_"+pageid+"").click(function(){ 
			$("#taxDeclarationWarn_"+pageid+"").hide();
		});
		
		// 风险重算
		$("#riskwarningrecal"+pageid+"").click(function(){ 
			var riskul=document.getElementById('tctrcriskul_'+pageid);
			var riskulitems = riskul.getElementsByTagName("li");
		
			var idstr = "";	
			for(var i=0;i<riskulitems.length;i++){
				idstr= idstr+","+$(riskulitems[i].getElementsByTagName("div")[0]).find("a").attr("tctrcresultid");
			}
			
			model.invoke('recaltctrcrisk',{"tctrcresultids":idstr});
		});
		var offset=$(".taxDeclaration").offset();    
		$("#taxDeclarationWarn_"+pageid+"").css("right","40px").css("top","40px");  //.css("left",offset.left).css("top","20px");  
		moveWarn(pageid);
	}  
	function moveWarn(pageid) {
		var isMove = false;
		var X, Y;
		$(".riskWarning").click(function () {}).mousedown(function (e) {
				isMove = true;
				X = e.pageX - parseInt($("#taxDeclarationWarn_"+pageid+"").css("left"));
				Y = e.pageY - parseInt($("#taxDeclarationWarn_"+pageid+"").css("top")); 
		});
		$(document).mousemove(function (e) {
			if (isMove) {
				var left = e.pageX - X;
				var top = e.pageY - Y; 
				$(".riskWarning").css({left: left, top: top});
			}
			}).mouseup(function () {
				isMove = false;
			}
		);
	}
	
	
	function selectTab(id){
		var pageid=$('#'+id).attr("pageid");
		var tabid=$('#'+id).attr("tabid");
		console.log('id--'+id+' tabid--'+tabid+' pageid:'+pageid);
		$(".tab-item-content[pageid="+pageid+"]").removeClass("tab-active");
		$('#'+id).addClass("tab-active"); 
		$(".tcvat-content>table[pageid="+pageid+"]").hide();
		$('#sbb_tab'+pageid+tabid+'').show(); 
	} 
    KDApi.register('declare', MyComponent,{isMulLang:true})
})(window.KDApi,jQuery);
