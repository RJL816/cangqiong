;window.IDS_RenderUtils=(function(){
    // console.log("IDS_Utils is ",IDS_Utils);
    var TITLE_CLASS='ids__analysis-report_title';
    var DESC_CLASS='ids__analysis-report_desc';
    var EMPTY_VIEW="ids_analysis-report_view";
    return {
        $$curIndicatorEl:null,//当前选中的指示器
        $$container:document.querySelector('#ids__report_container'),
        main(resData,model){
            var _this=this;
  
            if(resData && resData.status==0){
                var fragment=IDS_Utils.$$createDocFragment()
                let reportTitle=resData.reportTitle;
                let reportStyle=resData.titleStyle;
                
                let reportTime=resData.reportTime;
                let reportTimeStyle=resData.resportTimeStyle;
                this._renderReportTitle(reportTitle,reportStyle,fragment);
                this._renderReportTime(reportTime,reportTimeStyle,fragment);

                this.layouts=resData.layout;
                let shapes=resData.shapes;
                let showIndicator=resData.showIndicator;
                this._renderLayouts(this.layouts,fragment,shapes);
                this.$$container=IDS_RenderUtils.$$container=document.querySelector('#ids__report_container');
                this.$$container.appendChild(fragment);
                if(showIndicator){
                    // var rect=this.$$container.getBoundingClientRect();
                    // console.log("rect is ",rect);
                    this._renderIndicator(this.layouts);
                }

                this.layouts.forEach(layout=>{
                    _this._createIntersectionOb(layout.key);
                })
            }

            this._setInitStatus('anchor1');

        },
        _setInitStatus:function(key){
            var _this=this;
            var indicatorKey='ids_indicator_'+key;
            
            //滚动到
            setTimeout(function(){
                _this._scrollElement(document.getElementById(key));
                var $$indicatorEl=document.getElementById(indicatorKey);

                if($$indicatorEl){
                    $$indicatorEl.classList.add('ids__report_cur_selected');
                    _this.$$curIndicatorEl=$$indicatorEl;
                    _this.curIndicatorKey=key;
                }
            },500)
        },
        //报告时间
        _renderReportTime:function(reportTime,timeStyle,fragment){
            var $$time=document.createElement('DIV');
            var styleStr="";
            for(var key in timeStyle){
                styleStr+=key+":"+timeStyle[key]+";";
            }
            console.log("title styleStr is ",styleStr);
            $$time.style.cssText=styleStr;
            $$time.textContent=reportTime;
            fragment.appendChild($$time);
        },
        //报告标题
        _renderReportTitle:function(title,titleStyle,fragment){
            //titleStyle
            var $$title=document.createElement('H1');
            console.log("titleStyle is ",titleStyle);
            var styleStr="";
            for(var key in titleStyle){
                styleStr+=key+":"+titleStyle[key]+";";
            }
            console.log("title styleStr is ",styleStr);
            $$title.style.cssText=styleStr;
            $$title.textContent=title;
            fragment.appendChild($$title);
        },
        _renderLayouts:function(layouts,fragment,shapes){
            layouts.forEach(layout=>{
                const key=layout.key;

                const title=layout.title;
                const desc=layout.desc;

                var $$l=document.createElement('DIV');
                $$l.setAttribute('id',key);
                $$l.className="ids__report-block";

                if(title){
                    var $$title=document.createElement('H1');
                    $$title.textContent=title;
                    $$l.appendChild($$title);
                }

                if(desc){
                    var $$desc=document.createElement('SPAN');
                    $$desc.className=DESC_CLASS;
                    $$desc.textContent=desc;
                    $$l.appendChild($$desc)
                }
                let shapesData=shapes[key];  //对应的图、表和其他视图
                fragment.appendChild($$l);
                this._renderShapes(shapesData,$$l)
            })
        },
        _renderView:function(shape,fragment){
            var content=shape.content;
            var styleObj=shape.style;
            var tagName=shape.tagName;
            var shapeType=typeof content;
            var contentArr;
            if(shapeType=='string'){
                contentArr=content.split('\n');
            }
            var $$emptyDiv=document.createElement(tagName ? tagName : 'DIV');
            if(tagName){
                $$emptyDiv.innerHTML=content;
                fragment.appendChild($$emptyDiv);
                return;
            }
            $$emptyDiv.className=EMPTY_VIEW;
            if(styleObj){
                var styleStr="";
                for(var key in styleObj){
                    styleStr+=`${key}:${styleObj[key]};`
                }
                $$emptyDiv.style.cssText=styleStr;
            }
            var templateStr="";
            contentArr.forEach(function(content){
                templateStr+='<div>'+content+'</div>';
             
            });
            $$emptyDiv.innerHTML=templateStr;
            fragment.appendChild($$emptyDiv);
        },
        //change 
        _renderList:function(shape,fragment){
                    console.log("shape is ",shape);
                    var content=shape.data;
                    var $$el=document.createElement('UL');
                    var str="";
                    for(var i=0;i<content.length;i++){
                        str+="<li class='ids__report_list_item'>"+content[i]+"</li>"
                    }
                    $$el.innerHTML=str;
                    fragment.appendChild($$el);
        },
        _renderShapes:function(shapes,fragment){
            var _this=this;
            if(!shapes || shapes.length==0)return;

            shapes.forEach(shape=>{
                var viewType=shape.viewType;
                if(viewType=='table'){
                    //renderTable(shape,fragment);
                    Table_Utils.renderTable(shape,fragment);
                }else if(viewType=='view'){
                   this._renderView(shape,fragment);
                }else if(viewType=='list'){ //change
                    this._renderList(shape,fragment);
                 }else{
                    //图形
                    // renderCharts(shape,fragment);
                    
                    IDS_ChartUtils.createChart({
                        viewData:shape,
                        container:fragment,
                        rootWrapper:_this.$$container,
                    })
                }
            })
        },
        //渲染页面指示器
        _renderIndicator:function(layouts){

            var $$indicatorWrapper=document.querySelector('#ids__report_indicator');
            
            $$indicatorWrapper.style.top=170+'px';  //设置苍穹平台的top值
            
            var content="";
            layouts.map(layout=>{
                const title=layout.title;
                content+="<div class='ids__report_indicator_item' id='ids_indicator_"+layout.key+"' data-key='"+layout.key+"'>"+title+"</div>"
            })  
            $$indicatorWrapper.innerHTML=content;
            $$indicatorWrapper.addEventListener('click',this._eventCallback.bind(this),false);
        },
        _clearCurSelected:function(curKey){
                if(this.$$curIndicatorEl){
                    this.$$curIndicatorEl.classList.remove('ids__report_cur_selected');
                }
        },
        _dealElVisible:function(entry){
            var intersectionRatio=entry.intersectionRatio;
            var target=entry.target;

            if(intersectionRatio - 0 > 0.00001 && this.$$curIndicatorEl){
                //
                // 滚动元素的id值
                var intersectionId=target.getAttribute('id');
                // ids_indicator_anchor1
                var indicatorKey='ids_indicator_'+intersectionId;
                // console.log("indicatorKey is ",indicatorKey);
                if(indicatorKey==this.curIndicatorKey)return;
                var indicatorTarget=document.querySelector('#'+indicatorKey);
                if(this.curIndicatorKey && this.curIndicatorKey!=intersectionId){
                    this._clearCurSelected(indicatorKey);
                    this.$$curIndicatorEl=indicatorTarget;
                    indicatorTarget.classList.add('ids__report_cur_selected');
                    this.curIndicatorKey=indicatorKey;
                }
            }
        },
        _createIntersectionOb:function (key){
            var $$blockEl=this.$$container.querySelector('#'+key);
            var _this=this;
            var observer=new IntersectionObserver(function(entities){
                // console.log("entities is ",entities.length);
                var entity=entities[0]
                _this._dealElVisible(entity);

            },{
                threshold:[0]
            })
            observer.observe($$blockEl);
        },
        _eventCallback:function(event){
            // console.log("event ",event.target);
            var target=event.target;
            var key=target.dataset.key;

      
            this._clearCurSelected(key);
            this.$$curIndicatorEl=target;
            target.classList.add('ids__report_cur_selected');
            var $el=this.$$container.querySelector('#'+key);
            this._scrollElement($el);
        },
        _scrollElement:function(el){
            el.scrollIntoView({
                behavior:'smooth',
                block:'start',
            })
        }
    }
})();