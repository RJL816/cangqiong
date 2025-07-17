 //创建物流、上下游时间轴
	  function TableLine(data, myComponent){
		this.data = data;
		this.myComponent = myComponent;
		
		this.initTable=function(){
			//创建外部容器
			var wrapperDom = document.createElement('div');
			var _this = this;
			wrapperDom.className="smart-panel-tablelinewrapper";
			if(this.data && this.data.length){
				this.data.forEach(function(item,rowIndex){
					//创建时间轴节点
					_this.createTableLineNode(item, wrapperDom, rowIndex);
				});
			}
			return wrapperDom;
		},
		//创建时间轴节点
		this.createTableLineNode=function(node, parentDom, nodeIndex){
			//图标、标题、标题描述
			var _this = this;
			var wrapperDom = document.createElement('div');
			if(node.headerWrapperStyle){
				 var styleStr = this.myComponent._getCardStyle(node.headerWrapperStyle);
				 wrapperDom.style.cssText=styleStr;
			}
			
			if(node.imgModel){
				this.renderIcon(node.imgModel, wrapperDom);
			}
			
			//标题
			if(node.titleModel){
				var titleWrapperDom = document.createElement('div');
				this.renderText(node.titleModel, titleWrapperDom);
				
				if(node.titleWrapperStyle){
					 var styleStr = this.myComponent._getCardStyle(node.titleWrapperStyle);
					titleWrapperDom.style.cssText=styleStr;
				}
				wrapperDom.appendChild(titleWrapperDom);
			}
			//标题描述
			if(node.titleDescrptModels && node.titleDescrptModels.length){
				var titleDescWrapperDom = document.createElement('div');
				node.titleDescrptModels.forEach(function(item,rowIndex){
					_this.renderText(item, titleDescWrapperDom);
				});
				if(node.titleDescrptWrapperStyle){
					var styleStr = this.myComponent._getCardStyle(node.titleDescrptWrapperStyle);
					titleDescWrapperDom.style.cssText=styleStr;
				}
				wrapperDom.appendChild(titleDescWrapperDom);
			}
			parentDom.appendChild(wrapperDom);
			
			//生成轴线
			wrapperDom = document.createElement('div');
			wrapperDom.className = "smart-panel-tablelinestatus";
			parentDom.appendChild(wrapperDom);
			
			var lineWrapperDom = document.createElement('div');
			if(node.lineWrapperStyle){
				var styleStr = this.myComponent._getCardStyle(node.lineWrapperStyle);
				lineWrapperDom.style.cssText=styleStr;
			}
			
			var lineDom = document.createElement('div');
			wrapperDom.appendChild(lineWrapperDom);
			lineWrapperDom.appendChild(lineDom);
			if(node.lineStatusStyle){
				var styleStr = this.myComponent._getCardStyle(node.lineStatusStyle);
				lineDom.style.cssText=styleStr;
			}
			//创建物流信息
			if(node.lineCards && node.lineCards.length){
				var lineCardWrapperDom = document.createElement('div');
				wrapperDom.appendChild(lineCardWrapperDom);
				
				if(node.lineCardWrapperStyle){
					var styleStr = this.myComponent._getCardStyle(node.lineCardWrapperStyle);
					lineCardWrapperDom.style.cssText=styleStr;
					
				}
				//超过3个lineCard则创建“查看全部的‘出库单（节点名称）’”
				var hasMore = node.lineCards.length>1;
				var moreText = hasMore ? KDApi.getLangMsg(myComponent.model, "查看更多"):"";
				node.lineCards.forEach(function(item,rowIndex){
					if(rowIndex < 1){
						_this.createLineCard(item, lineCardWrapperDom, nodeIndex, hasMore, moreText, rowIndex);
					}
				});
				
			}
		},
		//创建内容行
		this.createLineRow = function(lineRow, parentDom){
			var lineRowDom = document.createElement('div');
			if(lineRow.rowStyle){
				var styleStr = this.myComponent._getCardStyle(lineRow.rowStyle);
				lineRowDom.style.cssText=styleStr;
			}
			//左部标题
			if(lineRow.leftModel){
				var lineRowLeftDom = document.createElement('div');
				if(lineRow.leftStyle){
					var styleStr = this.myComponent._getCardStyle(lineRow.leftStyle);
					lineRowLeftDom.style.cssText=styleStr;
				}
				this.renderText(lineRow.leftModel, lineRowLeftDom);
				lineRowDom.appendChild(lineRowLeftDom);
			}
			//右部内容
			if(lineRow.rightModels && lineRow.rightModels.length){
				var _this = this;
				var lineRowRightDom = document.createElement('div');
				if(lineRow.rightStyle){
					var styleStr = this.myComponent._getCardStyle(lineRow.rightStyle);
					lineRowRightDom.style.cssText=styleStr;
				}
				lineRow.rightModels.forEach(function(item, index){
					//暂时考虑text
					if(item.type == 4){
						_this.renderHref(item, lineRowRightDom);
					}else{
						_this.renderText(item, lineRowRightDom);
					}
				});
				lineRowDom.appendChild(lineRowRightDom);
			}
			parentDom.appendChild(lineRowDom);
		},
		//创建卡片
		this.createLineCard = function(lineCard, parentDom, nodeIndex, hasMore, moreText, lineCardIndex){
			if(lineCard.lineRows && lineCard.lineRows.length){
				var _this = this;
				var lineCardDom = document.createElement('div');
				if(lineCard.lineCardStyle){
					var styleStr = this.myComponent._getCardStyle(lineCard.lineCardStyle);
					lineCardDom.style.cssText=styleStr;
				}
				lineCardDom.style.background="#F8F9FB";//设置背景色，悬浮内容时使用
				lineCard.lineRows.forEach(function(item, index){
					_this.createLineRow(item, lineCardDom);
				});
				//增加查看更多内容
				if(hasMore && lineCardIndex == 0){
					var lineDom = this.createLineCardMore(moreText,nodeIndex);
					lineCardDom.appendChild(lineDom);
				}
				parentDom.appendChild(lineCardDom);
			}
		},
		//查看全部内容
		this.createLineCardMore = function(moreText, nodeIndex){
			var lineRowDom = document.createElement('div');
			//创建标题,样式稍后再改
			lineRowDom.className = "smart-panel-tablelinemore";
			var contentDom = document.createElement('div');
			contentDom.innerText = moreText;
            contentDom.title = moreText;
			contentDom.setAttribute("nodeIndex", nodeIndex);
			// contentDom.setAttribute("hasMore", "true");
			contentDom.className = "smart-panel-tablelinemore-title";
			lineRowDom.append(contentDom);
			return lineRowDom;
		},
		
		//创建图标、暂时不考虑跳转，悬浮
		this.renderIcon = function(item,itemDom){
            var iconWrapper=document.createElement('DIV');
            iconWrapper.className='smart-panel-icon';
            var cssTextStr=this.myComponent._getCardStyle(item.itemStyle);
            iconWrapper.style.cssText=cssTextStr;
            itemDom.appendChild(iconWrapper);
            var iconName=item.iconName;
            var imgDom=document.createElement('img');
            var iconPath=this.myComponent.modelPath+'./img/'+iconName;
            imgDom.src=iconPath;
			imgDom.style.cssText= this.myComponent._getCardStyle(item.imageStyle);
            iconWrapper.appendChild(imgDom);
        },
		//创建文本暂不点击事件与悬浮
		 this.renderText = function(item,itemDom){
            var extenalStyle="";
            var content=item.content;
            var contentDom=document.createElement('DIV');
            contentDom.innerText=content;
            contentDom.title = content;
            
            if(item.url){
              contentDom.className="smart-panel-body-row-item smart-panel-item-link";
              contentDom.setAttribute('openUrl',item.url);
            }else{
             contentDom.className="smart-panel-body-row-item";
            }

            var cssTextStr=this.myComponent._getCardStyle(item.itemStyle);
            cssTextStr+=";margin-right:4px;";
            cssTextStr+=extenalStyle;
            contentDom.style.cssText=cssTextStr;
            itemDom.appendChild(contentDom);
        },
		this.renderHref = function(item,itemDom){
			var extenalStyle="";
            var content=item.content;
            var contentDom=document.createElement('DIV');
            contentDom.innerText=content;
            contentDom.title = content;
			
            var cssTextStr=this.myComponent._getCardStyle(item.itemStyle);
			contentDom.setAttribute('param', this.myComponent._encodeParam(item.data));
			contentDom.className=item.data.action == "chatYZJ" ? "smart-panel-body-row-item smart-panel-body-row-item-click smart-panel-chat":"smart-panel-body-row-item smart-panel-body-row-item-click";
			cssTextStr+=";margin-right:4px;color:#2b87f3;cursor:pointer;";
            cssTextStr+=extenalStyle;
            contentDom.style.cssText=cssTextStr;
            itemDom.appendChild(contentDom);
		},
		this.initEvent = function($, parentNode){
			//注册查看全部事件
			var _this=this;
			//只选择当前上下游对应的dom元素
			$('.smart-panel-tablelinemore-title', parentNode).mouseenter(function(e){
				//根据属性获取节点数据
				var target=e.target;
				var nodeIndex=target.getAttribute('nodeIndex');
				var nodeIndexNum = parseInt(nodeIndex);
				var nodeData = _this.data[nodeIndexNum];
				_this.myComponent._getRelativeRect(e);
				var maxheight = _this.myComponent.winH-_this.myComponent.offsetBottom;
				if(nodeData.lineCards && nodeData.lineCards.length){
					_this.createTableLineCardPopover(nodeData.titleModel.content, nodeData.lineCards, $('.smart-panel-popover',_this.myComponent.model.dom));
					//maxheight = "374px";
					// 修正最大高度
                    maxheight = Math.min(e.clientY, maxheight, 374)  + 'px';
				}
				// 修复平台 slidePanel 样式导致的浮层被遮挡问题
				if ($('.smart-panel-popover', _this.myComponent.model.dom).closest('.slidePanel').length) {
					$($('.smart-panel-popover', _this.myComponent.model.dom).closest('.slidePanel')[0]).css('overflow', 'visible');
				}
				var popoverPanel = $('.smart-panel-popover', _this.myComponent.model.dom);
				popoverPanel.css('display','block').css('right',_this.myComponent.offsetRight).css('bottom',_this.myComponent.offsetBottom).css('max-height', maxheight).css('overflow', 'auto').css("min-width", "340px");
				
				//悬浮内容上增加
				$('.smart-panel-body-row-item-click', popoverPanel[0]).on('click',function(){
						var paramStr = this.getAttribute("param");
						if(paramStr){
							console.log(paramStr);
							var data = _this.myComponent._decodeParam(paramStr);
							console.log(data);
							_this.myComponent.model.invoke(data.action, data);
						}
			    });
				
			}).mouseleave(function(e){
						//鼠标悬停之后向上移动到悬停框内,延时隐藏
						_this.myComponent.timer = setTimeout(function(){
							var popoverPanel = $('.smart-panel-popover', _this.myComponent.model.dom);
							popoverPanel.css('display','none');
							$('.smart-panel-body-row-item-click', popoverPanel[0]).off("click", "**");
							// 修复平台 slidePanel 样式导致的浮层被遮挡问题
                            if ($('.smart-panel-popover', _this.myComponent.model.dom).closest('.slidePanel').length) {
                                $($('.smart-panel-popover', _this.myComponent.model.dom).closest('.slidePanel')[0]).css('overflow', 'auto');
                            }
						}, 100);
		    });
		},
		//创建遮罩内容。改用悬浮内容
		this.createTableLineCardPopover = function(billType, lineCards, parentNode){
			parentNode.empty();
            var _this=this;
			//创建标题区域
			var billTypeDom = document.createElement('div');
			billTypeDom.innerText=billType;
            billTypeDom.title = billType;
			billTypeDom.className = "smart-panel-tablelinemore-popovertitle";
			parentNode.append(billTypeDom);
			//创建内容区域
			var lineCardWrapperDom = document.createElement('div');
			lineCardWrapperDom.className = "smart-panel-tablelinemore-popover";
			lineCards.forEach(function(item,rowIndex){
				if(rowIndex>0){
					_this.createLineCard(item, lineCardWrapperDom);	
				}
				
			});
			parentNode.append(lineCardWrapperDom);
		}
	  }