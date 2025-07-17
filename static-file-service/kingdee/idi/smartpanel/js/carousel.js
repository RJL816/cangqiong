//翻页控件
	  function Carousel(data, cardNum, rowStart, myComponent){
		this.cardNum = cardNum;
		this.rowStart = rowStart;
		this.data = data;
		this.myComponent = myComponent;
		this.currentPage = 0;//当前页
		this.pageSize = this.data.page;
		this.timer = null;
		this.zindex = 3;
		
		this.hasNextPage = function(){
			console.log('currentpage:'+this.currentPage);
			console.log('totalpage:'+this.pageSize);
			return this.currentPage < (this.pageSize-1);
		}
		
		this.hasPrevious = function(){
			console.log('currentpage:'+this.currentPage);
			console.log('currentpage:'+this.pageSize);
			return this.currentPage > 0;
		}
		//下一页
		this.nextPage = function($, parentNode){
			if(this.hasNextPage()){
				this.runNextPage($, parentNode, this.currentPage+1);
			}
		}
		//执行下一页
		this.runNextPage = function($, parentNode, targetPage){
			var _this = this;
			//把下一页放到当前页的右边，置于最高层级
			var currentPage = $('.smart-panel-carousel-page[pageindex='+_this.currentPage+']', parentNode);
			console.log(currentPage);
			_this.currentPage = targetPage;
			var nextPage = $('.smart-panel-carousel-page[pageindex='+_this.currentPage+']', parentNode);
			console.log(nextPage);
			nextPage.css({'z-index': ++this.zindex, 'left':'100%'});
			
			var targetStr = nextPage.css("left");
			console.log("next target:"+targetStr);
			var target = parseInt(targetStr);
			console.log("next target value:"+target);
			
			//下一页与当前一起向左滚动Math.abs(target)
			this.runPage(currentPage, 0-target, nextPage, 0, -30, function(){
				//下一页到达目标点后，当前页位置归位，删除原页码激活样式，激活样式加在新页码上
				currentPage.css("left", '0');
				$(".smart-panel-carousel-pagenum-active", parentNode).removeClass("smart-panel-carousel-pagenum-active");
				$(".smart-panel-carousel-pagenum[pageindex="+_this.currentPage+"]", parentNode).addClass("smart-panel-carousel-pagenum-active");
			});
		}
		
		//上一页
		this.previousPage = function($, parentNode){
			if(this.hasPrevious()){
				this.runPreviousPage($, parentNode, this.currentPage-1);
			}
		}
		//执行上一页
		this.runPreviousPage = function($, parentNode, targetPage){
			var _this = this;
			//取上一页放到当前页的左边，置于最高层级
			var currentPage = $('.smart-panel-carousel-page[pageindex='+_this.currentPage+']', parentNode);
			console.log(currentPage);
			_this.currentPage = targetPage;
			var previousPage = $('.smart-panel-carousel-page[pageindex='+_this.currentPage+']', parentNode);
			previousPage.css({'z-index': ++this.zindex, 'left':'-100%'});
			console.log(previousPage);
			
			var targetStr = previousPage.css("left");
			console.log("previous target:"+targetStr);
			var target = parseInt(targetStr);
			console.log("previous target value:"+target);
			
			
			//上一页与当前一起向右滚动
			this.runPage(currentPage, Math.abs(target), previousPage, 0, 30, function(){
				//上一页到达目标点后，当前页位置归位，删除原页码激活样式，激活样式加在新页码上
				currentPage.css("left", '0');
				$(".smart-panel-carousel-pagenum-active", parentNode).removeClass("smart-panel-carousel-pagenum-active");
				$(".smart-panel-carousel-pagenum[pageindex="+_this.currentPage+"]", parentNode).addClass("smart-panel-carousel-pagenum-active");
			});
		}
		//页滑动效果
		this.runPage = function(oldDom, oldTarget, newDom, newTarget, speed, endFun){
			console.log(oldDom);
			console.log(oldTarget);
			console.log(newDom);
			console.log(newTarget);
			var oldLeftStr = oldDom.css("left");
			console.log(oldLeftStr);
			var oldLeft = parseInt(oldLeftStr);
			console.log(oldLeft);
			oldLeft += speed;
			console.log(oldLeft);
			
			var newLeftStr = newDom.css("left");
			console.log(newLeftStr);
			var newLeft = parseInt(newLeftStr);
			console.log(newLeft);
			newLeft += speed;
			console.log(newLeft);
			
			if(((speed>0 && oldLeft >= oldTarget) || (speed<0 && oldLeft<=oldTarget)) && ((speed>0 && newLeft >= newTarget) || (speed<0 && newLeft<=newTarget))){
				oldLeft = oldTarget;
				newLeft = newTarget;
				oldDom.css("left", oldLeft+"px");
				newDom.css("left", newLeft+"px");
				console.log("over");
				console.log(oldDom);
				console.log(newDom);
				if(endFun){
					endFun();
				}
			}else{
				var _this = this;
				oldDom.css("left", oldLeft+"px")
				newDom.css("left", newLeft+"px")
				this.timer = setTimeout(function(){
					_this.runPage(oldDom, oldTarget, newDom, newTarget, speed, endFun);
				}, 50);
			}
		}
		//页码点击事件
		this.pageNumberSelect = function($, currrentDom, parentNode){
			//取点击页的页码
			var targetIndexStr = $(currrentDom).attr("pageindex");
			var targetIndex = parseInt(targetIndexStr);
			if(this.currentPage > targetIndex){
				//如果点击页码小于当前页则右滑动,上一页
				this.runPreviousPage($, parentNode, targetIndex);
			}else if(this.currentPage < targetIndex){
				//如果点击页码大于当前页则左滑动，下一页
				this.runNextPage($, parentNode, targetIndex);
			}
		}
		//注册上一页、下一页事件
		this.initEvent = function($, parentNode){
			//轮播图事件，翻页事件
			var _this=this;
			//上一页事件
			$(".smart-panel-carousel-previous", parentNode).click(function(){
				_this.previousPage($, parentNode);
			});
			//下一页事件
			$(".smart-panel-carousel-next", parentNode).click(function(){
				_this.nextPage($, parentNode);
			});
			//页码点击事件
			$(".smart-panel-carousel-pagenum", parentNode).click(function(e){
				var target = e.target;
				_this.pageNumberSelect($, target, parentNode);
			});
		}
		this.initCarousel = function(cardDom){
			var wrapperDom = document.createElement('div');
			wrapperDom.className='smart-panel-carousel';
			if(data.wrapperStyleMap){
				var style = myComponent._getCardStyle(data.wrapperStyleMap);
                wrapperDom.style.cssText = style;
			}
			//设置序号
			var index = this.myComponent.carousel.length;
			wrapperDom.setAttribute('seq', index);
			
			var pageSize = data.size;
			var items = data.items;
			//创建标题
			var titleData = items[0];
			var titleDom = this.createTitle(titleData);
			wrapperDom.appendChild(titleDom);
			//创建上一页
			this.createLeftTurn(data, wrapperDom);
			//创建下一页
			this.createRightTurn(data, wrapperDom);
			//创建快递公司信息
			this.createPage(data, items, wrapperDom);
			//创建页码
			this.createPageNumber(data, wrapperDom);
			//加入到卡片
			cardDom.appendChild(wrapperDom);
			return this.rowStart;
		};
		//创建快递物流信息
		this.createPage = function(data, items, parentDom){
			if(data.hasPage){
				var wapperDom = document.createElement('DIV');
				wapperDom.className='smart-panel-carousel-pagewapper';
				if(data.pageWrapperStyleMap){
					var style = myComponent._getCardStyle(data.pageWrapperStyleMap);
					wapperDom.style.cssText = style;
				}
				parentDom.appendChild(wapperDom);
				var pageCount = data.page;
				if(items && items.length>1){
					var pageDom = null;
					var style = null;
					if(data.pageWrapperStyleMap){
						style = myComponent._getCardStyle(data.pageWrapperStyleMap);
					}
					for(var i=1; i<items.length; i++){
						var itemData = items[i];
						var pageDataStart = i-1;
						if(pageDataStart%data.size == 0){
							pageDom = document.createElement('DIV');
							pageDom.className = "smart-panel-carousel-page";
							if(style != null){
								pageDom.style.cssText = style;
							}
							//设置页码
							pageDom.style.zIndex = pageCount--;
							pageDom.setAttribute("pageindex", Math.ceil(pageDataStart/data.size));
							wapperDom.appendChild(pageDom);
						}
						var name=itemData.mainDesc;
						var desc=itemData.secondDesc;
                
						
						var rowDom=document.createElement('DIV');
						rowDom.className="smart-panel-body-item-row";
						if(itemData.rowStyle){
							var rowStyle=this.myComponent._getCardStyle(itemData.rowStyle);
							rowDom.style.cssText=rowStyle;
						}
						
						this.rowStart++;
						var rowFlag = this.cardNum + '_'+this.rowStart;
						var mainParams={
							rowDom:rowDom,
							itemStyle:itemData.mainStyle,
							className:'name',
							items:name,
							flag:rowFlag,
						};
						var secondParams={
							rowDom:rowDom,
							itemStyle:itemData.secondStyle,
							className:'desc',
							items:desc,
							flag:rowFlag,
						}
						if(name){
							this.myComponent._createCardRowItem(mainParams);
						}
						if(desc){
							this.myComponent._createCardRowItem(secondParams);
						}
						pageDom.appendChild(rowDom);
					}
				}
			}
		};
		//创建页码
		this.createPageNumber = function(data, parentDom){
			if(data.hasPage){
				var wapperDom = document.createElement('DIV');
				if(data.pageNumberStyleMap){
					var style = this.myComponent._getCardStyle(data.pageNumberStyleMap);
					wapperDom.style.cssText = style;
				}
				//创建圆圈页码，选中为蓝色，不中为灰色
				var olDom = document.createElement('ol');
				for(var i=0; i<data.page; i++){
					var liDom = document.createElement('li');
					liDom.className = i==0 ? "smart-panel-carousel-pagenum smart-panel-carousel-pagenum-active":"smart-panel-carousel-pagenum";
					if(i>0){
						liDom.style.marginLeft="6px";
					}
					//设置页码
					liDom.setAttribute("pageindex", i);
					olDom.appendChild(liDom);
				}
				wapperDom.appendChild(olDom);
				parentDom.appendChild(wapperDom);
			}
		};
		
		//创建下一页
		this.createRightTurn = function(data, wrapperDom){
			if(data.hasNext){
				var rightDom = document.createElement('DIV');	
				rightDom.className = 'smart-panel-carousel-next';
				if(data.nextStyleMap){
					var style = this.myComponent._getCardStyle(data.nextStyleMap);
					rightDom.style.cssText = style;
				}
				var imgDom = document.createElement('img');
				imgDom.src=this.myComponent.modelPath+'./img/turnpage.png';
				
				//设置序号
				var index = this.myComponent.carousel.length;
				rightDom.setAttribute('seq', index);
				imgDom.setAttribute('seq', index);
				
				rightDom.appendChild(imgDom);
				wrapperDom.appendChild(rightDom);
			}
		};
		//创建上一页
		this.createLeftTurn = function(data, wrapperDom){
			if(data.hasPrevious){
				var leftDom = document.createElement('DIV');	
				leftDom.className = 'smart-panel-carousel-previous';
				if(data.previousStyleMap){
					var style = this.myComponent._getCardStyle(data.previousStyleMap);
					leftDom.style.cssText = style;
				}
				var imgDom = document.createElement('img');
				imgDom.src=this.myComponent.modelPath+'./img/turnpage.png';
				
				//设置序号
				var index = this.myComponent.carousel.length;
				leftDom.setAttribute('seq', index);
				imgDom.setAttribute('seq', index);
				
				leftDom.appendChild(imgDom);
				wrapperDom.appendChild(leftDom);
			}
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
		}
	  }