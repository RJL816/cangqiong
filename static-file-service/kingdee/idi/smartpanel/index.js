;(function(KDApi,_){
    var isOpen=true;
    //构造函数
     function MyComponent(model){
         this._setModel(model);
         this.popoverData = {};
		 this.isPC = false;
		 this.cardRowData = {};
		 this.timer = null;
		 this.carousel = [];
		 this.billFlow = [];
		 this.isExpend = false;
		 this.isExecuted = false;
		 this.xiaoKIcon=null;
		 this.showhighLight = false;
		 this.preHighLightDom = null;
     }
	 function XiaoK(model, props){
		//动画options
		var animationOptions = {
		  container: document.getElementById(model.pageId+"_lottie"),
		  renderer: "svg",
		  autoplay: true
		}
		//状态改变
		this.changeState = function(path, isloop, $){
		  animationOptions.path = path;
		  animationOptions.loop = isloop;
		}
		//动画
		this.createAnimation = function(){
		  var animation = window.bodymovin.loadAnimation(animationOptions);
		  return animation;
		}
		//销毁动画
		this.destoryAnimation = function(animation){
		  animation.destroy();
		}
		//保存当前的小K动画dom
		this.dom = null;
	  }
	  
     MyComponent.prototype={
         _setModel:function(model){
             this.model=model;
         },
         init:function(props){
            this.winH=document.documentElement ? document.documentElement.clientHeight : document.body.clientHeight;
            this.winW=document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth;
            // window.addEventListener("resize",this.windowResize,false);
            console.log("props of init is ",props);
			this._clearRefresh();
            if(props.data){
				if(props.data.action){
					console.log("refreshResult in init");
					this._setLoadingHtml(this.model,props);
					//防止前端js卡住单据页面渲染过程,浮层数据加载第一步
					var _this = this;
					this.isExecuted = true;
					setTimeout(function(){
						_this.model.invoke('refreshResult', '');
					}, 100);
				}else{
					console.log("_setHtml in init");
					this._setHtml(this.model,props);
				}
            }
            
         },
         update:function(props){
			console.log("props of update is ",props);
			this._clearRefresh();
            if(props.data){
                // this._setHtml(this.model,props);
				if(props.data.action){
				    //目标单高亮
					if(this.isExecuted && props.data.action == "linkBillHeightVisible"){
					    var _this = this;
						if(props.data.needDelay){
							setTimeout(function(){
								_this.model.invoke(props.data.action, props.data);
							}, 3000);
						}else{
							_this.model.invoke(props.data.action, props.data);
						}
						return;
					}
					if (!this.isExecuted) {
						console.log('refreshResult in update');
						this._setLoadingHtml(this.model,props);
						//防止前端js卡住单据页面渲染过程
						var _this = this;
						setTimeout(function(){
							_this.model.invoke('refreshResult', '');
						}, 100);
					}else{
						//浮层数据加载第二步
						this.isExecuted = false;//2
					}
					
				}else{
					this.showhighLight = props.data.isHighLight;
					if(!this.isExecuted){
						//浮层数据加载第三步
						console.log('_setHtml in update');
						this._setHtml(this.model, props);
						this.isExecuted = true;
					}else{
						console.log('_updateHtml in update');
						this._updateHtml(this.model, props);//浮层数据加载并行异步
					}
				}
            }
         },
         destoryed:function(){
			this._clearRefresh();
			if(this.xiaoKIcon && this.xiaoKIcon.dom){
				this.xiaoKIcon.destoryAnimation(this.xiaoKIcon.dom);
				console.log('----------destoryed xiaok');
			}
            console.log('----------destoryed');
            // window.removeEventListener("resize",this.windowResize,false);
         },
         windowResize:function(){
            var clientHeight=document.documentElement ? document.documentElement.clientHeight : document.body.clientHeight;
            var clientWidth=document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth;
            this.winH=clientHeight;
            this.winW=clientWidth;
         },
		 _updateHtml:function(model,props){
			//清空缓存
			this.popoverData = {};
			this.cardRowData = {};
			this.carousel = [];
			this.billFlow = [];
			this.preHighLightDom = null;
			//清除页面元素
			$('.smart-panel-header-content',model.dom)[0].innerHTML='';
			$('.smart-panel-body', model.dom)[0].innerHTML='';
			$('.smart-panel-popover',model.dom)[0].innerHTML='';
			//创建页面元素
			this._createComponentHeader(model,props, $);
			this._createCardList(model,props, $);
			//注册事件
			this._initEvent(model,props, $);
			//定时刷新
			if(props.data.parallel && !props.data.end){
				setTimeout(function(){
					model.invoke('parallelResult', '');
				}, 500);
			}
		 },
         //绑定操作界面元素，动态生成卡片内容
         _setHtml:function(model,props){
            var that=this;
            if(!this.modelPath){
                this.modelPath=KDApi.nameSpace(model);
            }
            KDApi.loadFile(['./css/smartPanel.css','./js/jquery.min.js','./js/lottie_svg.min.js', './js/carousel.js', './js/tableline.js', './js/billflow.js', './js/statistic.js', './js/riskcard.js'], model, function(){
				KDApi.templateFilePath('./html/smartPanel.html', model,{
				    prefixLottie:model.pageId,
					cosmicK:KDApi.nameSpace(model) + './img/cosmick.svg',
				    refreshResult:KDApi.nameSpace(model) + './img/refresh.png',
                    childList:props.data && props.data.childList,
                    childNameList:props.data && props.data.childNameList,
                    modelList:props.data.modelList,
                }).then(
                    function(result){
						//先执行update，后init。执行两次，所以清空缓存数据
						that.popoverData = {};
						that.cardRowData = {};
						that.carousel = [];
						that.billFlow = [];
						that.preHighLightDom = null;
                        // console.log("cardModelList",props.data.cardModelList);
						model.dom.style.cssText ="";//加载样式清空
                        model.dom.innerHTML = result;
						that.isPC = props.data.isPC;
						that.isExpend = props.data.isExpend;
						that._mobileDomChange(model, props, $);
						//设置小K
						if(!props.data.noxiaok){
							that._runXiaoK(model, props);
						}
                        that._createComponentHeader(model,props, $);
						//浮层不需要刷新按钮
						if(props.data.norefresh){
							$('.smart-panel-header-refresh', model.dom).css("display", "none");
						}
                        that._createCardList(model,props, $);
                        that._initEvent(model,props, $);
						
						//检查项异步执行，定时加载结果
						if(props.data.parallel && !props.data.end){
							setTimeout(function(){
								model.invoke('parallelResult', '');
							}, 500);
						}
                    }
                )
            }) 
         },
		 //设置
		 _setLoadingHtml:function(model,props){
			var that=this;
            if(!this.modelPath){
                this.modelPath=KDApi.nameSpace(model);
            }
            KDApi.loadFile(['./css/smartPanel.css','./js/jquery.min.js','./js/lottie_svg.min.js'], model, function(){
				KDApi.templateFilePath('./html/smartPanel.html', model,{
				    prefixLottie:model.pageId,
				    refreshResult:KDApi.nameSpace(model) + './img/refresh.png',
                    childList:props.data && props.data.childList,
                    childNameList:props.data && props.data.childNameList,
                    modelList:props.data.modelList,
                }).then(
                    function(result){
						//先执行update，后init。执行两次，所以清空缓存数据
						that.popoverData = {};
						that.cardRowData = {};
						
                        //页面内容
						model.dom.style.cssText ="height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;";
                        model.dom.innerHTML = "<img src='"+KDApi.nameSpace(model) +"./img/loading.gif' style='width:50px;height:50px;'/>";
						
                    }
                )
            }) 
		 },
		 //判断是否是移动端
		 _isMobile:function(){
			return !this.isPC;
		 },
		 //移动端背景色无
		 _mobileDomChange:function(model, props, $){
			if(this._isMobile()){
				$('.smart-panel-wrapper',model.dom).css("background", "none");
			}
		 },
		 //移动端评分卡片样式调整
		 _mobileHeaderChange:function(model, props, $){
			if(this._isMobile()){
				$('.smart-panel-header',model.dom).css({"background": "#FFFFFF", "margin-bottom":"10px"});
				// $('.smart-panel-header',model.dom).css("margin-bottom", "10px");
			}
		 },
		 _mobileCardRowPopoverData:function(flag){
			//获取卡片行的悬浮数据,每一行只存在一个悬浮内容
			for(var val in this.popoverData){
				if(val.indexOf(flag) == 0){
					return this.popoverData[val];
				}
			}
		 },
		 //移动端处理悬浮内容
		 _mobileCradRowPopoverHandle:function(flag, parentDom, isContainTimeLine, isLast){
			if(this._isMobile()){
				var popoverData = this._mobileCardRowPopoverData(flag);
				var popoverDom = this._mobileCreatePopover(popoverData, isContainTimeLine, isLast);
				if(popoverDom){
					parentDom.appendChild(popoverDom);
				}
			}
		 },
		 //汇总行跳转页面
		 _mobileCardRowTotal:function(rowData, rowDom, flag){
			if(this._isMobile() && rowData && rowData.dataList && rowData.dataList.length > 0){
				//数据缓存，同时存下数据缓存key，同时属性标注为跳转元素
				this.cardRowData[flag] = rowData.dataList;
				rowDom.style.cursor = "pointer";
				rowDom.setAttribute('needGoto',true);
				rowDom.setAttribute('gotoVal',flag);
			}
		 },
		 //创建悬浮内容面板
		 _mobileCreatePopover:function(popoverData, isContainTimeLine, isLast){
			var _this = this;
			
			if(popoverData && popoverData.popoverItemList && popoverData.popoverItemList.length > 0){
				var popoverWrapperDom=document.createElement('DIV');
				popoverWrapperDom.className="smart-panel-mobile-popover";
				if(isContainTimeLine){
					//生成时间线包装div,补齐时间轴线
					var lineWrapperDom=document.createElement('DIV');
					lineWrapperDom.className="mobiletimeline";
					popoverWrapperDom.style.display="flex";
					popoverWrapperDom.appendChild(lineWrapperDom);
					
					
					var lineDom=document.createElement('DIV');
					lineWrapperDom.appendChild(lineDom);
					lineDom.className="mobiletimelineitem";
					if(isLast){
						lineDom.style.background="#fff";
					}
					
					//生成悬浮内容
					var popoverRowWrapperDom=document.createElement('DIV');
					popoverData.popoverItemList.forEach(function(item,rowIndex){
						var popoverRowDom=document.createElement('DIV');
						popoverRowDom.className='smart-mobile-popover-row';
						_this._createPopoverRow(item,popoverRowDom);
						popoverRowWrapperDom.appendChild(popoverRowDom);
					});
					popoverWrapperDom.appendChild(popoverRowWrapperDom);
				}else{
					popoverData.popoverItemList.forEach(function(item,rowIndex){
						var popoverRowDom=document.createElement('DIV');
						popoverRowDom.className='smart-mobile-popover-row';
						_this._createPopoverRow(item,popoverRowDom);
						popoverWrapperDom.appendChild(popoverRowDom);
					});
				}
				
				return popoverWrapperDom;
			}
		 },
		 //执行一系列小K状态,要求播放完反馈状态后播放默认状态
		 _runXiaoK:function(model, props){
			// var xiaoK = new XiaoK(model, props);
			// this.xiaoKIcon = xiaoK;
			// var testingpath = KDApi.nameSpace(model) + './json/feedback.json';
			// xiaoK.changeState(testingpath, false);
			// var testingAnimation = xiaoK.createAnimation();
			// testingAnimation.addEventListener("complete", function(){
				  // var completepath = KDApi.nameSpace(model) + './json/default.json';
				  // xiaoK.changeState(completepath,true);
				  // var completeAnimation = xiaoK.createAnimation();
				  // xiaoK.dom=completeAnimation;
				  // xiaoK.destoryAnimation(testingAnimation);
			// })
		 },
		 //判断是否为最后一个时间轴
		 _isLastTableline:function(mainItems){
			var result = false;
			if(mainItems && mainItems.length > 0){
				mainItems.forEach(function(item){
					if("Lastest" === item.flag){
						result = true;
					}
				});
			}
			return result;
		 },
         _createComponentHeader:function(model,props, $){
             var headerData=props.data.headerList;
			if(headerData && headerData.length){
				var fragment=document.createDocumentFragment();
				this._createCardBody(headerData,fragment,0, $);
				$('.smart-panel-body-item-name', fragment).css("max-width", "260px");
				$('.smart-panel-header-content',model.dom).append(fragment);
			}else{
				//将小K居中
				var xiaoKContainer = document.getElementById(model.pageId+"_lottie");
				xiaoKContainer.style.marginLeft = "auto";
				xiaoKContainer.style.marginRight = "auto";
			}
            this._mobileHeaderChange(model,props, $);
         },
         _getCardStyle:function(obj){
             if(!obj)return '';
             var cssTextStyle='';
             for(var key in obj){
                var styleStr=';'+key+':'+obj[key];
                cssTextStyle+=styleStr;
             }
             return cssTextStyle;
         },

        _createCardTitle:function(title,resultEntry,wrapperDom,cardIndex){
            if(title){
                var titleDom=document.createElement('DIV');
                titleDom.className='smart-panel-body-item-title';
                titleDom.innerText=title;
                if (resultEntry) {
                    var resultEntryDom = document.createElement('DIV');
                    resultEntryDom.className = 'smart-panel-body-item-resultentry';
                    resultEntryDom.innerText = resultEntry;
                    resultEntryDom.setAttribute("data-searchIndex", cardIndex);
                    titleDom.appendChild(resultEntryDom);
                }
                wrapperDom.appendChild(titleDom);
            }
            return null;
        },
		
        _createItemPopover:function(item,contentDom,flag,itemIndex){
			var hasPopover=item.popover;
			if(hasPopover){
				var popoverAttr=flag + '_'+itemIndex;
				contentDom.setAttribute('hasPopover',true);
				contentDom.setAttribute('popoverVal',popoverAttr);
				extenalStyle=";cursor:pointer;";
				this.popoverData[popoverAttr]=hasPopover;
			}
        },
        /** 构建卡片行 */
        _createCardRowItem:function(params){
            //items,rowDom,itemStyle,className
            var itemDom=null;
            var _this=this;
            if(params.items){
                itemDom=document.createElement('DIV');
               var nameRowStyle='';
               if(params.itemStyle){
                   nameRowStyle=_this._getCardStyle(params.itemStyle);
                   itemDom.style.cssText=nameRowStyle;
               }
               params.items.forEach(function(item,itemIndex){
                     _this._renderItemType(item,itemDom,itemIndex,params);
               })
			   //增加光标切换
			   console.log("创建光标: ",params);
			   if(!params.main && _this.showhighLight){
					//悬停图标位置保持一致
					if(params.highLight){
						_this._createCursorSwitchBtn(itemDom, params.highLight)
					}else{
					    itemDom.style.cssText=itemDom.style.cssText+";margin-right:32px;";	
					}
			   }
                itemDom.className="smart-panel-body-item-"+params.className;
				//话术添加属性
				if(params.main && _this.showhighLight && params.highLight){
					itemDom.setAttribute('hashighlight', true);
					itemDom.setAttribute('highlightval', params.highLight);
					itemDom.style.cssText=itemDom.style.cssText+";cursor:pointer;"
				}
                params.rowDom.appendChild(itemDom);
            }else if(!params.main && _this.showhighLight && params.highLight){
				//没有悬停也需要创建 高亮左右切换按钮
				itemDom=document.createElement('DIV');
               var nameRowStyle='';
               if(params.itemStyle){
                   nameRowStyle=_this._getCardStyle(params.itemStyle);
                   itemDom.style.cssText=nameRowStyle;
               }else{
				   itemDom.style.cssText='width:20%;justify-content:flex-end;overflow:hidden;';
			   }
			   _this._createCursorSwitchBtn(itemDom, params.highLight);
			   itemDom.className="smart-panel-body-item-"+params.className;
			   params.rowDom.appendChild(itemDom);
			   $(params.rowDom).find(".smart-panel-body-item-name").css("width", "80%");
			}
        },
		//创建光标切换按钮
		_createCursorSwitchBtn:function(itemDom, highLight){
			var btnDiv = document.createElement('DIV');
			var leftDom = document.createElement('img');
			leftDom.src = this.modelPath+'./img/arrow.png';
			leftDom.className = "cursorswitchBtn";
			leftDom.setAttribute("operationflag", "left")
			leftDom.setAttribute('hashighlight', true);
			leftDom.setAttribute('highlightval', highLight);
			btnDiv.appendChild(leftDom);
			// var rightDom =document.createElement('input');
			// rightDom.type = 'button';
			// rightDom.value = '>';
			var rightDom =document.createElement('img');
			rightDom.src = this.modelPath+'./img/arrow.png';
			rightDom.className = "cursorswitchBtn cursorswitchBtn-right";
			rightDom.setAttribute("operationflag", "right")
			rightDom.setAttribute('hashighlight', true);
			rightDom.setAttribute('highlightval', highLight)
			btnDiv.appendChild(rightDom);
			itemDom.appendChild(btnDiv);
		},
		//创建超链接
		_renderHref:function(item,itemDom,itemIndex,params){
			var extenalStyle="";
            var content=item.content;
            var contentDom=document.createElement('DIV');
            contentDom.innerText=content;
            contentDom.title = content;
			
            var cssTextStr=this._getCardStyle(item.itemStyle);
            //设置鼠标移上浮层
            this._createItemPopover(item,contentDom,params.flag,itemIndex);
			if(item.data.action == "chatYZJ"){
				contentDom.className="smart-panel-body-row-item smart-panel-body-row-item-click smart-panel-chat";
				contentDom.setAttribute('param', this._encodeParam(item.data));
				cssTextStr+=";margin-right:4px;color:#2b87f3;cursor:pointer;";
			}else{
				contentDom.className="smart-panel-body-row-item";
				cssTextStr+=";margin-right:4px;";
			}
			
            cssTextStr+=extenalStyle;
            contentDom.style.cssText=cssTextStr;
            itemDom.appendChild(contentDom);
		},
		//编码参数
		_encodeParam:function(param){
			var arr = [];
			for(var key in param){
				arr.push(key+"="+param[key]);
			}
			var paramStr = arr.join("|");
			//return Base64.encode(paramStr);
			return btoa(paramStr);
		},
		//将参数拼成一个字符串
		_decodeParam:function(paramStr){
			//var paramStr = Base64.decode(paramStr);
			var paramStr = atob(paramStr);
			var parmaArr = paramStr.split("|");
			var param = {};
			for(var i = 0; i<parmaArr.length; i++){
				var itemArr = parmaArr[i].split("=");
				param[itemArr[0]] = itemArr[1];
			}
			return param;
		},
		//反解析参数字符串
        _renderIcon:function(item,itemDom,itemIndex,params){
            var iconWrapper=document.createElement('DIV');
            iconWrapper.className='smart-panel-icon';
            var cssTextStr=this._getCardStyle(item.itemStyle);
            iconWrapper.style.cssText=cssTextStr;
            itemDom.appendChild(iconWrapper);
            var iconName=item.iconName;
            var imgDom=document.createElement('img');
            var iconPath=this.modelPath+'./img/'+iconName;
            this._createItemPopover(item,imgDom,params.flag,itemIndex);
            imgDom.src=iconPath;
			imgDom.style.cssText= this._getCardStyle(item.imageStyle);
            iconWrapper.appendChild(imgDom);
        },
        _renderText:function(item,itemDom,itemIndex,params){
            var extenalStyle="";
            var content=item.content;
            var contentDom=document.createElement('DIV');
            contentDom.innerText=content;
            contentDom.title = content;
            
            //设置鼠标移上浮层
            this._createItemPopover(item,contentDom,params.flag,itemIndex);
            if(item.url){
              contentDom.className="smart-panel-body-row-item smart-panel-item-link";
              contentDom.setAttribute('openUrl',item.url);
            }else{
             contentDom.className="smart-panel-body-row-item";
            }

            var cssTextStr=this._getCardStyle(item.itemStyle);
            cssTextStr+=";margin-right:4px;";
            cssTextStr+=extenalStyle;
            contentDom.style.cssText=cssTextStr;
            itemDom.appendChild(contentDom);
        },
        _createTimeLineStyle:function(wrapper){
           var ball=document.createElement('div');
           ball.className="timeline-ball";
           wrapper.appendChild(ball);
        },
        _renderTimeLine:function(item,itemDom){
            var time=item.title;
            var ballDom=document.createElement('DIV');
            ballDom.className="timeline";
            ballDom.classList.add('timeline'+item.flag);
            this._createTimeLineStyle(ballDom)
            var timeDom=document.createElement('DIV');
            timeDom.className='time';
            timeDom.innerText=time;
            itemDom.appendChild(ballDom);
            itemDom.appendChild(timeDom);
        },
        _renderURL:function(item,itemDom,itemIndex,params){
            var extenalStyle="";
            var content=item.content;
            var contentDom=document.createElement('DIV');
            // contentDom.innerText=content;
            
            if(item.url){
              contentDom.className="smart-panel-body-row-item smart-panel-item-link";
              contentDom.setAttribute('openUrl',item.url);
            }else{
              contentDom.className="smart-panel-body-row-item";
            }
            var linkDom=document.createElement('a');
            linkDom.innerHTML=content;
            linkDom.href=item.url;
            contentDom.appendChild(linkDom);
            var cssTextStr=this._getCardStyle(item.itemStyle);
            cssTextStr+=";margin-right:4px;";
            cssTextStr+=extenalStyle;
            contentDom.style.cssText=cssTextStr;
            itemDom.appendChild(contentDom);
        },
        _renderItemType:function(item,itemDom,itemIndex,params){
            var type=item.type;
            
            switch(type){
                case 0:
                    this._renderText(item,itemDom,itemIndex,params);
                break;
                case 1:
                    this._renderURL(item,itemDom,itemIndex,params);
                    // this._renderText(item,itemDom,itemIndex,params);
                break;
                case 2:
                    this._renderIcon(item,itemDom,itemIndex,params);
                break;
                case 3:
                    this._renderTimeLine(item,itemDom);
                break;
				case 4:
					this._renderHref(item,itemDom,itemIndex,params);
				break;
            }
        },
        _containTimeLineType:function(entityModel){
            var timeLineArr=[];
            entityModel.forEach(function(rowItem){
                var main=rowItem.mainDesc;
                // var tempArr=main.filter(item=>item.type==3);
                var tempArr=main.filter(function(item){return item.type==3});
                if(tempArr.length > 0){
                    timeLineArr.push(tempArr[0])
                }
            })
            this.timeLineArr=timeLineArr;
        },
        _isContainTimeLine:function(items){
            if(!items)return;
            var tempArr=items.filter(function(itemData){return itemData.type==3});
            if(tempArr.length > 0)return 'timeline';
            // var urlTemp=items.filter(itemData=>itemData.type==1);
            var urlTemp=items.filter(function(itemData){return itemData.type==1});
            if(urlTemp.length > 0)return 'url';
            return '';
        },
         _createCardBody:function(entityModel,wrapperDom,cardNum, $){
             var _this=this;

             var successRowDomList = document.createElement('DIV');
			 var successCount = 0;
			 var errorRowDomList = document.createElement('DIV');
			 var errorCount = 0;
             this._containTimeLineType(entityModel)
			var imageClass = _this.isExpend ? "success_arrow_expend" : "success_arrow_notexpend";
			var loadingDom = null;//加载中
            entityModel.forEach(function(itemData,rowIndex){
                var name=itemData.mainDesc;
                var desc=itemData.secondDesc;
                
                //  var hasPopover=itemData.popover;
                 var rowDom=document.createElement('DIV');
                 rowDom.className="smart-panel-body-item-row";
				 //判定是否是时间轴
				 var isContainTimeLine = _this._isContainTimeLine(name);
				 var isLastestTimeLine = false;
                 if(_this._isContainTimeLine(name)){
                     rowDom.classList.add('smart-panel-body-item-'+_this._isContainTimeLine(name));
					 isLastestTimeLine = _this._isLastTableline(name);
                 }
                 var rowStyle=_this._getCardStyle(itemData.rowStyle);
                 rowDom.style.cssText=rowStyle;
				 var rowFlag = cardNum+'_'+rowIndex;
                //话术
				var mainParams={
                    rowDom:rowDom,
                    itemStyle:itemData.mainStyle,
                    className:'name',
                    items:name,
                    flag:rowFlag,
					main:true,
					highLight:itemData.highLightAttr//高亮信息
                };
				
				//悬停图标
                var secondParams={
                    rowDom:rowDom,
                    itemStyle:itemData.secondStyle,
                    className:'desc',
                    items:desc,
                    flag:rowFlag,
					main:false,
					highLight:itemData.highLightAttr//高亮信息
                }

				switch (itemData.detailDisplayType) {
					case 1: {
						if (desc) {
							rowDom.className ='smart-panel-body-item-row-slide'
							_this._renderSlide(itemData, rowDom)
						} else {
							if(name){
								_this._createCardRowItem(mainParams);
							}
							if(desc || _this.showhighLight){
								_this._createCardRowItem(secondParams);
							}
						}
						break
					}
					default: {
						if(name){
							_this._createCardRowItem(mainParams);
						}
						if(desc || _this.showhighLight){
							_this._createCardRowItem(secondParams);
						}
						break
					}
				}

				
				
				
				//通过和异常处理成展开项
				var rowClass = _this.isExpend ?" smart-panel-body-item-successrow_nofirst_show":" smart-panel-body-item-successrow_nofirst_hide";
                var successIconSrc = $(rowDom).find('img').attr('src')
                if (successIconSrc && ((successIconSrc.indexOf('agree') > -1) || (successIconSrc.indexOf('exception') > -1))) {
                    var arrowIconSrc = _this.modelPath+'./img/'+'arrow.png';
                    var imgDom = document.createElement('img')
                    imgDom.src = arrowIconSrc
                    imgDom.className = imageClass;
                    rowDom.appendChild(imgDom)
					if(successIconSrc.indexOf('agree') > -1){
						if (successCount === 0) {
							rowDom.className += " smart-panel-body-item-successrow"
						} else {
							imgDom.style.display = "none";
							rowDom.className += rowClass;
						}
						successRowDomList.appendChild(rowDom);
						successCount++;
						//悬浮内容处理成展开项
						_this._mobileCradRowPopoverHandle(cardNum+'_'+rowIndex, successRowDomList, isContainTimeLine,isLastestTimeLine);
					}else if(successIconSrc.indexOf('exception') > -1){
						if (errorCount === 0) {
							rowDom.className += " smart-panel-body-item-successrow"
						} else {
							imgDom.style.display = "none";
							rowDom.className += rowClass
						}
						errorRowDomList.appendChild(rowDom);
						errorCount++;
						//悬浮内容处理成展开项
						_this._mobileCradRowPopoverHandle(cardNum+'_'+rowIndex, errorRowDomList, isContainTimeLine, isLastestTimeLine);
					}
                } else if(successIconSrc && successIconSrc.indexOf('none') > -1){
					//加载放到最后
					loadingDom = rowDom;
				}else{
                    wrapperDom.appendChild(rowDom);
					_this._mobileCardRowTotal(itemData, rowDom, rowFlag);
					//悬浮内容处理成展开项
					_this._mobileCradRowPopoverHandle(cardNum+'_'+rowIndex, wrapperDom, isContainTimeLine, isLastestTimeLine);
                }
				
				
             })
			 
			 //通过项处理
             if (successRowDomList.childNodes.length) wrapperDom.appendChild(successRowDomList)
             if (successCount === 1) {
                $('.smart-panel-body-item-successrow', successRowDomList).find('.'+imageClass).hide()
             }
             if (successCount > 1) successRowDomList.className="smart-panel-successRowDomList"
			 
			 //异常项处理
			 if (errorRowDomList.childNodes.length) wrapperDom.appendChild(errorRowDomList)
             if (errorCount === 1) {
                $('.smart-panel-body-item-successrow', errorRowDomList).find('.'+imageClass).hide()
             }
             if (errorCount > 1) errorRowDomList.className="smart-panel-successRowDomList";
			
			 return loadingDom;
			
         },
         _createCardList:function(model,props, $){
            var _this=this;
            var cardModelList=props.data.cardModelList;
            if(!cardModelList)return null;
            var $body=$('.smart-panel-body',model.dom);
            var fragment=document.createDocumentFragment();
            cardModelList.forEach(function(item,index){  
                _this._createCard(item,fragment,index, $); 
            })
            $body.append(fragment);
         },
         _createCard:function(item,fragment,cardIndex, $){
            var _this=this;
            var title=item.title;
            var cardStyle=_this._getCardStyle(item.cardStyle);
            var entityModel=item.entity;
            // 查看票据检验结果入口
            var resultEntry = item.buttonTitle;
            var wrapperDom=document.createElement('DIV');
            wrapperDom.className='smart-panel-dialog';
            if(item.name){
                wrapperDom.classList.add('smart-panel-'+item.name);
            }
            // this._getCardType(item);
            wrapperDom.style.cssText=cardStyle;
            wrapperDom.setAttribute('id',item.id);

            //卡片标题
            this._createCardTitle(title,resultEntry,wrapperDom,cardIndex,entityModel);
			console.log("开始创建检查项内容 ");
            var loadingDom = this._createCardBody(entityModel,wrapperDom,cardIndex, $);
			console.log("结束创建检查项内容 ");
			//增加翻页
			var rowStart = entityModel.length
			if(item.carousel){
				var carousel = new Carousel(item.carousel, cardIndex, rowStart, _this);
				
				rowStart = carousel.initCarousel(wrapperDom);
				this.carousel.push(carousel);
			}
			//增加上下游单据
			if(item.billFlowModel){
				var bf = new BillFlow(item.billFlowModel, rowStart,cardIndex, _this);
				rowStart = bf.initBillFlow(wrapperDom);
				this.billFlow.push(bf);
			}
			if(item.statisticModels && item.statisticModels.length){
				for(var i=0; i<item.statisticModels.length; i++){
					var sm = new Statistic(item.statisticModels[i], _this);
					sm.initStatistic(wrapperDom, i == (item.statisticModels.length-1));
				}
			}
			//加载中放到指标前，其他检查项后
			if(loadingDom){
				wrapperDom.appendChild(loadingDom);
			}
			//指标卡片
			if (item.fasindexModels && item.fasindexModels.length) {
			    for (var i = 0; i < item.fasindexModels.length; i++) {
			        var sm = new RiskCard(item.fasindexModels[i], _this, _this.modelPath, cardIndex);
			        sm.initRiskCard(wrapperDom, i == (item.fasindexModels.length - 1), i);
			    }
			}

            fragment.appendChild(wrapperDom);
         },
         _getRelativeRect:function(e){
              var rect=e.target.getBoundingClientRect();
              if(rect){
                  var width=rect.width;
                  var height=rect.height;
                  this.offsetLeft=rect.left + (Math.round(width) / 6);
                  this.offsetTop=rect.top + Math.round(height);
                  this.offsetBottom=this.winH - rect.bottom + 24;
                  this.offsetRight=(document.documentElement.clientWidth || document.body.clientWidth) - rect.right;
              }
         },
         _initEvent:function(model,props, $){
                var that=this;
                /**
                 * 折叠面板头部，点击可以开/关 面板
                 */
                // $('.smart-panel-header',model.dom).click(function(){
                    // if(isOpen){
                        // $('.smart-panel-body',model.dom).css('display','none');
                        // $('.smart-panel-header-arrow',model.dom).css('transform','rotate(-90deg)');
                        // isOpen=false;
                    // }else{
                    // $('.smart-panel-body',model.dom).css('display','block');
                    // $('.smart-panel-header-arrow',model.dom).css('transform','rotate(0deg)');
                    // isOpen=true;
                    // }
                // })

                /**
                 * 点击检测正常的选项的下拉箭头，展开所有项
                 */
				var imageClass = that.isExpend ? "success_arrow_expend" : "success_arrow_notexpend";
                $('.'+imageClass, model.dom).click(function(){
					var rotateClass = that.isExpend ? "success_arrow_rotate_expend" : "success_arrow_rotate_notexpend";
                    $(this).toggleClass(rotateClass)
					var rowClass = that.isExpend ? "smart-panel-body-item-successrow_nofirst_show":"smart-panel-body-item-successrow_nofirst_hide";
                    $('.'+rowClass, this.parentNode.parentNode).toggle(200);
                })
                /**
                 * 只有一个检测正常的选项，下拉箭头隐藏
                 */
                // if ($('.smart-panel-body-item-successrow_nofirst', model.dom).length === 0) {
                //     $('.smart-panel-body-item-successrow', model.dom).find('.success_arrow').hide()
                // }

                $('.smart-panel-body-item-resultentry', model.dom).on('click',function(){
                    var index = parseInt($(this).attr('data-searchIndex'))
                    var resultData = props.data.cardModelList[index].buttonData || []
                    model.invoke('searchResult', resultData)
                })

                $('.smart-panel-body-item-table-view', model.dom).on('click',function(){
                    var searchIndex = parseInt($(this).attr('data-searchIndex-risk'))
                    var index = parseInt($(this).attr('data-riskIndex'))
                    var resultData = props.data.cardModelList[searchIndex].fasindexModels[index] || [] ;
                    model.invoke('showRiskCheckData', resultData)
                })

                $('.smart-panel-tabled-risk-check', model.dom).on('click', function () {
					var hideBox = $(".smart-panel-statistic-risk-hide", model.dom)
					var showBox = $(".smart-panel-statistic-risk-show", model.dom)
					var check = $("#risk-check", model.dom)
					var checknone = $("#risk-check-none", model.dom)
					if (hideBox.length > 0) {
						hideBox.removeClass().addClass("smart-panel-statistic-risk-show")
						checknone.attr("style", "display: block;")
						check.attr("style", "display: none;")
					} else if (showBox.length > 0) {
						showBox.removeClass().addClass("smart-panel-statistic-risk-hide")
						check.attr("style", "display: block;")
						checknone.attr("style", "display: none;")
					}
                })
                // $('.smart-panel-item-link',model.dom).click(function(e){
                //     var openUrl=e.target.getAttribute('openUrl');
                //     window.open(openUrl,"_blank");
                // }).mouseenter(function(e){
                //      e.target.style['color']="#5582F3";
                // }).mouseleave(function(e){
                //     e.target.style['color']="rgb(102, 102, 102)";
                // })
                $('.smart-panel-body-item-url',model.dom).mouseenter(function(e){
                    $('a',this).css('color','#4570D3');

                }).mouseleave(function(e){
                    $('a',this).css('color','#666');
                })
                $('.smart-panel-item-link',model.dom).click(function(e){
                    e.preventDefault();
                    var openUrl=$('a',this).attr('href'); 
                    window.open(openUrl,"_blank");
                })

				//移动端直接展示，不需要悬浮框
				if(this.isPC){
					$('.smart-panel-body-row-item[haspopover=true]',model.dom).mouseenter(function(e){
						console.log(e);
						var target=e.target;
						var haspopover=target.getAttribute('haspopover');
						var popoverAttr=target.getAttribute('popoverval');
						var id=target.id;
						that._getRelativeRect(e);
						var cardModelList=props.data.cardModelList;
						var popoverData=that.popoverData[popoverAttr];
						console.log(popoverAttr);
						console.log(popoverData);
						console.log(that.popoverData);
						var maxheight = that.winH-that.offsetBottom;
						var isCourier = false;
						if(popoverData){
							if(popoverData.tableLineNodeList){
								that._createTablePopover(popoverData.tableLineNodeList, $('.smart-panel-popover',model.dom));
								// 修正最大高度
								maxheight = Math.min(e.clientY, maxheight, 374)  + 'px';
								isCourier = true;
							}else{
								that._createPopover(popoverData.popoverItemList,$('.smart-panel-popover',model.dom), popoverAttr);
							}
						}
						// 修复平台 slidePanel 样式导致的浮层被遮挡问题
						if ($('.smart-panel-popover',model.dom).closest('.slidePanel').length) {
							$($('.smart-panel-popover',model.dom).closest('.slidePanel')[0]).css('overflow', 'visible');
						}
						$('.smart-panel-popover',model.dom).css('display','block').css('right',that.offsetRight).css('bottom',that.offsetBottom).css('max-height', maxheight).css('overflow', 'auto').css("width", "300px");
						//物流固定死宽度300
						if(isCourier){
							$('.smart-panel-popover',model.dom).css('width',"300px");
						}
					})
					.mouseleave(function(e){
						//鼠标悬停之后向上移动到悬停框内,延时隐藏
						that.timer = setTimeout(function(){
							$('.smart-panel-popover',model.dom).css('display','none');
							$('.smart-popover-click',model.dom).off("click", "**");
							// 修复平台 slidePanel 样式导致的浮层被遮挡问题
							if ($('.smart-panel-popover',model.dom).closest('.slidePanel').length) {
                                $($('.smart-panel-popover',model.dom).closest('.slidePanel')[0]).css('overflow', 'auto');
                            }
						}, 100);
					})

					$('img[haspopover=true]',model.dom).off('mouseenter').off('mouseleave').off('click');
					$('img[haspopover=true]',model.dom).on('mouseenter', function(e){
						// 光标进入时，恢复成不长显
						$('.smart-panel-popover',model.dom).attr('data-long-show', 'false');
						// 鼠标进入放大图标效果需要将父容器overflow属性改为visible
						$(e.target).closest('.smart-panel-body-item-desc').css('overflow', 'visible')
						var target=e.target;
						var haspopover=target.getAttribute('haspopover');
						var popoverAttr=target.getAttribute('popoverval');
						var id=target.id;
						that._getRelativeRect(e);
						var cardModelList=props.data.cardModelList;
						var popoverData=that.popoverData[popoverAttr];
						if(popoverData){
							that._createPopover(popoverData.popoverItemList,$('.smart-panel-popover',model.dom), popoverAttr);
						}
						// 修正最大高度
						let maxHeight = that.winH-that.offsetBottom;
						maxHeight = Math.min(e.clientY, maxHeight, 374)  + 'px';
						// 修复平台 slidePanel 样式导致的浮层被遮挡问题
						if ($('.smart-panel-popover',model.dom).closest('.slidePanel').length) {
							$($('.smart-panel-popover',model.dom).closest('.slidePanel')[0]).css('overflow', 'visible');
						}
						$('.smart-panel-popover',model.dom).css('display','block').css('right',that.offsetRight).css('bottom',that.offsetBottom).css('left', 'unset').css('top', 'unset').css('max-height', maxHeight).css('overflow', 'auto');
						
						$('.smart-popover-click',model.dom).on("click", function(e){
							var popoverVal = this.getAttribute("popoverVal");
							var popoverClickData=that.popoverData[popoverVal];
							console.log(popoverClickData);
							var popoverItemVal = this.getAttribute("popoverItemVal");
							var indexArr = popoverItemVal.split("_");
							var rowIndex = parseInt(indexArr[0]);
							var itemIndex = parseInt(indexArr[1]);
							console.log(rowIndex);
							console.log(itemIndex);
							var row = popoverClickData.popoverItemList[rowIndex];
							console.log(row);
							var item = row.popoverRow[itemIndex];
							if(item.data){
								model.invoke(item.data.action, item.data);
								e.stopPropagation();
								e.e.preventDefault();
							}
						});

						model.dom.querySelector('.smart-panel-popover .drag-area').addEventListener('mousedown', function (e) {
							var $target = e.target;
							$target.style.cursor = "grabbing";
							var layerX = e.layerX;
							var layerY =e.layerY;
							var $popover = model.dom.querySelector('.smart-panel-popover');
							// animation 属性会影响 fixed 定位
							$('.smart-panel-popover',model.dom).parents('.kd-cq-slide-panel').css('animation', 'none');
							document.onmousemove = function(e) {
								var x = e.clientX;
								var y = e.clientY;
								$popover.style.top = (y - layerY) + "px";
								$popover.style.left = (x - layerX) + "px";
								$popover.style.bottom = 'unset';
								$popover.style.right = 'unset';
							};
							document.onmouseup = function(event) {
								$target.style.cursor = "grab";
								document.onmousemove = null;
								document.onmouseup = null;
							};
						});

					})
					.on('mouseleave', function(e){
						// 鼠标移出恢复图标效果，还原父容器overflow属性
						$(e.target).closest('.smart-panel-body-item-desc').css('overflow', 'hidden')
						if ($('.smart-panel-popover',model.dom).attr('data-long-show') === 'true') {
							// 如果是通过点击展示的浮层，鼠标移出不隐藏
							return;
						}
						//鼠标悬停之后向上移动到悬停框内,延时隐藏
						that.timer = setTimeout(function(){
							$('.smart-panel-popover',model.dom).css('display','none');
							$('.smart-popover-click',model.dom).off("click", "**");
							// 修复平台 slidePanel 样式导致的浮层被遮挡问题
                            if ($('.smart-panel-popover',model.dom).closest('.slidePanel').length) {
                                $($('.smart-panel-popover',model.dom).closest('.slidePanel')[0]).css('overflow', 'auto');
                            }
						}, 100);
					}).on('click', function (e) {
						// 图标点击切换成长显模式
						$('.smart-panel-popover',model.dom).attr('data-long-show', 'true');
					})
					
					//鼠标悬停之后向上移动到悬停框内，悬停框自动停住，移出框自动消失
					$('.smart-panel-popover',model.dom).off('mouseenter').off('mouseleave')
					$('.smart-panel-popover',model.dom).on('mouseenter', function(e){
						if(that.timer){
							window.clearTimeout(that.timer);
						}
						// $(this).css('display','block').css('right',that.offsetRight).css('bottom',that.offsetBottom);

					}).on('mouseleave', function(e){
						if(that.timer){
							window.clearTimeout(that.timer);
						}
						if($('.smart-panel-popover',model.dom).attr('data-long-show') === 'true') {
							return;
						}
						$(this).css('display','none');
					})
					
					//高亮点击事件
					$('.smart-panel-wrapper',model.dom).off('click');
					if(this.showhighLight){
						//检查项话术点击事件

						$('.smart-panel-wrapper',model.dom).on('click', function(e){
							var hasHighLight = e.target.getAttribute("hashighlight");
							var dom = e.target;
							if(!hasHighLight){
								//话术点击需要判断父容器，话术本身没有高亮信息
								hasHighLight = e.target.parentElement.getAttribute("hashighlight");
								dom = e.target.parentElement;
							}
							if(hasHighLight){
								var fixedIcon = $('div[data-form-id=idi_float_layer]').parent().find('>span');
								if(fixedIcon && fixedIcon.attr('class') && fixedIcon.attr('class').includes('kdfont-guding-shixin')) {
									// TODO: 固定
									that.model.invoke('fixedFloat', '');
								}

								var highLightVal = dom.getAttribute("highlightval");
								//判断是否是光标切换
								if(dom.localName == "img"){
									var value =dom.getAttribute("operationflag");
									if(value == "left"){
										//左切换
										model.invoke('leftSwitch', highLightVal);
									}else if(value == "right"){
										//右切换
										model.invoke('rightSwitch', highLightVal);
									}
									//将检查项话术加粗
									var boldDom = $(dom.parentElement.parentElement.parentElement).find('.smart-panel-body-item-name');
									boldDom.css('font-weight', 'bold');
									if(that.preHighLightDom != boldDom[0]){
										//上一个点击的检查项样式恢复
										$(that.preHighLightDom).css('font-weight', '');
									}
									that.preHighLightDom = boldDom[0];
									e.preventDefault();
									e.stopPropagation();
								}else{
									//是否是检查项结果
									model.invoke('highLightDecision', highLightVal);
									//加粗提示项字体 font-weight: bold;
									$(dom).css('font-weight', 'bold');
									if(that.preHighLightDom != dom){
										//上一个点击的检查项样式恢复
										$(that.preHighLightDom).css('font-weight', '');
									}
									that.preHighLightDom = dom;
								}
								that._cancelHighLight = that._cancelHighLight || (function (that) {
										return function (e) {
											if(e && fixedIcon && e.target === fixedIcon.get(0)) { // 判断是否点击固定按钮，如果是固定按钮，则不取消高亮，重新注册点击事件
												setTimeout(function () {
													$('body').one('click', that._cancelHighLight)
												}, 0);
												return
											}
											that.model.invoke('canelHighLight', '');
											if(that.preHighLightDom){
												$(that.preHighLightDom).css('font-weight', '');
												that.preHighLightDom = null;
											}
										}
									})(that);

									$('body').off('click', that._cancelHighLight);

									setTimeout(function () {
										$('body').one('click', that._cancelHighLight)
									}, 0);
							}else{
								//取消当前高亮
								// var events = $._data(e.target, "events");
								// if(!events || !events["click"]){//如果dom元数已经有点击事件，则不执行取消高亮操作
								//    model.invoke('canelHighLight', '');
								//    if(that.preHighLightDom){
								// 		$(that.preHighLightDom).css('font-weight', '');
								// 		that.preHighLightDom = null;
								//    }
								// }
								that._cancelHighLight && that._cancelHighLight();
							}
						})
					}
				}


			 	// 浮层点击关闭
			 	$('.smart-panel-popover', model.dom).off('click', '.btn-close');
				$('.smart-panel-popover', model.dom).on('click', '.btn-close', function (e) {
					$('.smart-panel-popover',model.dom).css('display','none');
					$('.smart-popover-click',model.dom).off("click", "**");
					// 修复平台 slidePanel 样式导致的浮层被遮挡问题
					if ($('.smart-panel-popover',model.dom).closest('.slidePanel').length) {
					 $($('.smart-panel-popover',model.dom).closest('.slidePanel')[0]).css('overflow', 'auto');
					}
				});

                $('.smart-panel-body-item-timeline',model.dom).mouseenter(function(){
                     $('img',this).css('visibility','visible');
                }).mouseleave(function(e){
                    $('img',this).css('visibility','hidden');
                })

                
				//重新执行侧边栏
				if(!props.data.norefresh){
					$('.smart-panel-header-refresh', model.dom).on('click',function(){
						//出现版本号是才进行刷新
						//防止重复点击
						that._clearRefresh();
						if(props.data.version){
							that._headerRefresh(model, $, 0);
						}
						model.invoke('refreshResult', '');
					});
				}
				//移动端汇总行跳转明细页面
				if(this._isMobile()){
					$('.smart-panel-body-item-row[needGoto=true]', model.dom).on('click',function(){
						var gotoVal=this.getAttribute('gotoVal');
						var resultData = that.cardRowData[gotoVal] || [];
						console.log(this);
						console.log(gotoVal);
						console.log(resultData);
						model.invoke('detailResult', resultData);
					});
				}
				//注册轮播图事件
				if(this.isPC && this.carousel && this.carousel.length){
					for(var i=0; i<this.carousel.length; i++){
						var wrapperDom = $(".smart-panel-carousel:eq("+i+")", model.dom);
						this.carousel[i].initEvent($, wrapperDom);
					}
				}
				//上下游单据注册查看更多事件
				if(this.isPC && this.billFlow && this.billFlow.length){
					for(var i=0; i<this.billFlow.length; i++){
						var wrapperDom = $(".smart-panel-billflowwrapper:eq("+i+")", model.dom);
						this.billFlow[i].initEvent($, wrapperDom);
					}
				}
				//人员属性打开云之家聊天窗口
				if(this.isPC){
					$('.smart-panel-body-row-item-click', model.dom).on('click',function(){
						var paramStr = this.getAttribute("param");
						if(paramStr){
							console.log(paramStr);
							var data = that._decodeParam(paramStr);
							console.log(data);
							model.invoke(data.action, data);
						}
					})
				}

			 $('.smart-panel-body-item-row-slide-icon-arrow',model.dom).click(function(e){
				 $(e.currentTarget).find('img').toggleClass('up');
				 $(e.currentTarget).closest('.smart-panel-body-item-row-slide').find('.smart-panel-body-item-slide-content-box').slideToggle();
			 });

			 // 取消事件再重新绑定
			 $(model.dom).off('click');
			 $(model.dom).click(function (e) {
				 if (e.target.dataset.customClickEventData) {
					 model.invoke('customClickEvent', e.target.dataset.customClickEventData)
				 }
				 if (e.target.dataset.eventName) {
					 model.invoke(e.target.dataset.eventName, e.target.dataset.eventArgs)
				 }
			 });

			 $('.smart-panel-expandable .smart-panel-expandable__icon',model.dom).click(function(e){
				 $(e.currentTarget).parentsUntil('.smart-panel-body').toggleClass('collapsed')
			 });
         },
		 //物流悬浮框
		 _createTablePopover:function(tableLineNodeList, parentNode){
			parentNode.empty();
			var tableLine = new TableLine(tableLineNodeList, this);
			var tableDom = tableLine.initTable();
			parentNode.append(tableDom);
		 },
         _createPopover:function(dataList,parentNode, popoverAttr){
             parentNode.empty();
             var _this=this;
             if(dataList.length==0)return null;
             var fragment=document.createDocumentFragment();
             var popoverWrapperDom=document.createElement('DIV');
             // popoverWrapperDom.className="smart-panel-popover";
			 var $title = document.createElement('div');
			 $title.className = "header";
			 var $dragArea = document.createElement('div');
			 $dragArea.className = "drag-area";
			 var $closeBtn = document.createElement('div');
			 $closeBtn.className = "btn-close";
			 $title.append($dragArea, $closeBtn);
			 popoverWrapperDom.appendChild($title);

             dataList.forEach(function(item,rowIndex){
                var popoverRowDom=document.createElement('DIV');
				var itemStyle=item.popoverRowStyle;
				if(itemStyle){
                    var styleStr=_this._getCardStyle(itemStyle);
                    popoverRowDom.style.cssText=styleStr;
                }
                popoverRowDom.className='smart-popover-row';
                _this._createPopoverRow(item,popoverRowDom, popoverAttr, rowIndex);
                popoverWrapperDom.appendChild(popoverRowDom);
             })
             fragment.appendChild(popoverWrapperDom);
             parentNode.append(fragment);
         },
         _createPopoverRow:function(rowItem,rowDom, popoverAttr, rowIndex){
            var _this=this;
            rowItem.popoverRow.forEach(function(item,index){
                var content=item.content ? item.content:"";
                var itemStyle=item.itemStyle;
                var spanDom=document.createElement('DIV');
				spanDom.setAttribute('popoverVal', popoverAttr);
				var flag = rowIndex+"_"+index;
				spanDom.setAttribute('popoverItemVal', flag);
				var className = "smart-popover-click";
                if(itemStyle){
                    var styleStr=_this._getCardStyle(itemStyle);
										styleStr += ";word-break: break-all;";
                    spanDom.style.cssText=styleStr;
                }
				if(_this.isPC && item.type==4){
					spanDom.style.color="#2b87f3";
					spanDom.style.cursor="pointer";
					if(item.data.action == "chatYZJ"){
						className +=" smart-panel-chat";
					}
				}
				spanDom.className = className;
                spanDom.innerText=content;
                spanDom.title = content;
                rowDom.appendChild(spanDom);
            })
         },
		 //设置刷新旋转
		 _headerRefresh:function(model, $, cost){
			var _this = this;
			var speed = 100;
			
			var dom = $(".smart-panel-header-refresh", model.dom);
			if(!dom){
				return;
			}
			
			//超过30秒则不再刷新
			if(cost > (100*10*30)) {
				dom.css("transform", "rotate(0deg)");
			}else{
				var degStr = dom.attr("deg");
				var deg = 0;
				if(degStr){
					deg = parseInt(degStr);
				}
				deg += 10;
				dom.css("transform", "rotate("+deg+"deg)");
				dom.attr("deg", deg+"");
				console.log(deg);
				
				var newCost = cost+speed;
				window.refreshTimer = setTimeout(function(){
					_this._headerRefresh(model, $, newCost);
				}, speed);
			}
		 },
		 //清除刷新定时器
		 _clearRefresh:function(){
			if(window.refreshTimer){
				window.clearTimeout(window.refreshTimer);
			}
		 },
		 _renderSlide: function (params, dom) {
			var _this = this;
			if (params.mainDesc) {
				 var $header = document.createElement('div');
				 var cssTextStr;
				 var $iconWrapper;
				 var $img;
				 $header.className = 'smart-panel-body-item-slide-header';
				 params.mainDesc.forEach(function (item) {
					 switch (item.type) {
						 case 0: {
							 // 文本
							 var $title = document.createElement('div');
							 $title.innerHTML = item.content;
							 $title.className='smart-panel-body-item-slide-header-title';
							 cssTextStr=_this._getCardStyle(item.itemStyle);
							 cssTextStr+=";margin-right:4px;";
							 $title.style.cssText=cssTextStr;
							 if (params.eventName) {
								 $title.dataset.eventName = params.eventName;
								 $title.dataset.eventArgs = params.eventArgs;
								 $title.style.cssText += 'cursor:pointer;';
							 }
							 $header.appendChild($title);
							 break;
						 }
						 case 2: {
							 // 图标
							 $iconWrapper=document.createElement('DIV');
							 $iconWrapper.className='smart-panel-icon';
							 cssTextStr=_this._getCardStyle(item.itemStyle);
							 $iconWrapper.style.cssText=cssTextStr;
							 $img=document.createElement('img');
							 $img.src= _this.modelPath+'./img/'+ item.iconName;
							 $img.style.cssText= _this._getCardStyle(item.imageStyle);
							 $iconWrapper.appendChild($img);
							 $header.appendChild($iconWrapper);
							 break;
						 }
					 }
				 })

				// 展开小图标
				if (params.secondDesc && params.secondDesc[0].popover) {
					$iconWrapper=document.createElement('DIV');
					$iconWrapper.className='smart-panel-icon smart-panel-body-item-row-slide-icon-arrow';
					$img=document.createElement('img');
					$img.src= _this.modelPath+'./img/arrow.png';
					$img.style.cssText= 'width: 16px; height: 16px; cursor:pointer';
					$iconWrapper.appendChild($img);
					$header.appendChild($iconWrapper);
				}

				 dom.appendChild($header);
			}

			if (params.secondDesc && params.secondDesc[0].popover) {
				var titles = [];

				params.secondDesc[0].popover.popoverItemList[0].popoverRow.forEach(function (item) {
					titles.push(item.content);
				})

				var $box = document.createElement('div');
				$box.className="smart-panel-body-item-slide-content-box hidden";

				for(var i = 1; i < params.secondDesc[0].popover.popoverItemList.length; i++) {
					var $content = document.createElement('div');
					for (var j = 0; j < titles.length; j++) {
						var $title = document.createElement('div');
						$title.innerHTML = titles[j];
						$title.className = 'smart-panel-body-item-slide-content-title';
						$content.appendChild($title);
						var $text = document.createElement('div');
						$text.innerHTML = params.secondDesc[0].popover.popoverItemList[i].popoverRow[j].content;
						$text.className = 'smart-panel-body-item-slide-content-text';
						$content.appendChild($text);
						$box.appendChild($content);
					}
				}

				dom.appendChild($box);
			}
		 }
     }
     KDApi.register('smartpanel',MyComponent, {
			 isMulLang: true
		 });
})(window.KDApi,_);
