;(function(KDApi,$){
    var _outerRadius = 200;
    var _innerRadius = 170;
    var _pointerInnerRadius = 40;
    var _insidePanelRadius = 140;
    var _currentDataIndex = 0;
    var _panelImageURL
    var _animationDuration = 1000;
    var _animationDurationUpdate = 1000;
    var _animationEasingUpdate = 'quarticInOut';
    var _valOnRadianMax = 200;
    function DataHealth(model){
        this._setModel(model)
        this.modelPath=KDApi.nameSpace(model);
        console.log("modelPath is ",this.modelPath);
        console.log('model is ',model)
    }
    DataHealth.prototype={
        _setModel:function(model){
            this.model=model;
        },
        init:function(props){
            //initFunc(props,this.model,this.modelPath)

            console.log('prop data in init is ',props);
            initChart(props,this.model,this.modelPath)
          
        },
        update:function(props){
            initChart(props,this.model,this.modelPath)

        },
        destoryed:function(){

        }
    }
    function initChart(props,model,modelPath){
        var propsData=props.data;
        var score=propsData.Score;
        KDApi.loadFile(["./css/index.css"],model,function(){
            KDApi.getTemplateStringByFilePath('./html/custom.html',model,{
                title:model.title || '数据健康度',
				mainId: model.pageId
            }).then(function(result){
                model.dom.innerHTML=result;
                refreshScore(score, model)
                setTimeout(function(){
                    setDeg(score, model)
                },200)
                renderDataCheckUI(props,model,modelPath);
            })
        })
    }
    function setDeg(score, model){
        var fromDeg=-106;
        var toDeg=106;
        var degPerScore=(toDeg - fromDeg) / 100;
        degPerScore=parseFloat(degPerScore);
        var totalScore=(score - 50) * degPerScore;
        var $$linePic=document.getElementById(model.pageId + 'pointer');
 
        $$linePic.style.transform="rotate("+totalScore+"deg)";
        $$linePic.style.transition="transform 1s linear";
    }

    function refreshScore(score, model){
        if('requestAnimationFrame' in window){
            var rafId=requestAnimationFrame(function(){
                var $$scope=document.getElementById(model.pageId + 'scope');
                 console.log("$$scope is ",$$scope);
                if($$scope){
                    var originalScore=$$scope.innerText;
                    originalScore=parseInt(originalScore)
                     console.log("originalScrope is ",originalScore+" and scope is ",score);
                    if(originalScore < score){
                        originalScore+=2;
            
                        $$scope.textContent=originalScore;
                        refreshScore(score, model)
                    }else{
                        if(rafId){
                            cancelAnimationFrame(rafId);
                            rafId=0;
                        }
                    }
                }
            })
        }
    }

    function renderDataCheckUI(props,model,modelPath){
        // var $$container=$('#ids__data-check-ul',model.dom);

        var $$container=document.getElementById(model.pageId + 'ids__data-check-ul');

        console.log("$$container is ",$$container);
        var propsData=props.data;
        var checkList=propsData.checkList || [];

        var docFragement=document.createDocumentFragment();

        checkList.forEach(item=>{
            console.log("checkList is ",checkList);
            var imgName=item.imgName;
            var checkName=item.checkName;
            var score=item.score;
            var percent=item.percent;
            var $$LI=document.createElement('LI');
            var $$img=document.createElement('IMG');
            $$img.className="ids__data_checkimg";
            var $$checkName=document.createElement('SPAN');
            $$checkName.className="ids__data_checkname";
            $$checkName.textContent=checkName;

            var $$score=document.createElement('SPAN');
            $$score.className="ids__data_checkscore"
            $$score.textContent=score;

            var $$finished;
            if(percent<100){
                //finished
                $$finished=document.createElement('SPAN');
                $$finished.textContent=percent+'%';
            }else{
                $$finished=document.createElement('IMG');

                $$finished.src=modelPath+'img/'+'finished.svg';
            }
            $$finished.className="ids__data_checkfinish";

            $$img.src=modelPath+"img/"+imgName+".png";

            $$LI.appendChild($$img);
            $$LI.appendChild($$checkName);
            $$LI.appendChild($$score);
            $$LI.appendChild($$finished);

            docFragement.appendChild($$LI);
        })
        $$container.appendChild(docFragement);

    }



      

    KDApi.register('datahealth',DataHealth)

})(window.KDApi,jQuery)