(function (KDApi, $) {
  // 构造函数
  function MyComponent (model) {
    this._setModel(model)
  }

  
  MyComponent.prototype = {
    // 绑定model
    _setModel: function (model) {
      this.model = model
    },
    // 生命周期：初始化
    init: function (props) {
      console.log('-----甘特图init', this.model, props)
      var paramsMap = new Object();
	    paramsMap["action"]=getGanttOpr("preloadData");
	    props.data=paramsMap;
      setGanttHtml(this.model, props)
    },
    // 生命周期：更新
    update: function (props) {
      console.log('-----甘特图update', this.model, props,"update")
      updateGanttHtml(this.model, props)
    },
    // 生命周期：销毁
    destoryed: function () {
      console.log('-----甘特图destoryed', this.model)
     for(cacheKey in window.localStorage)
     {
       if(cacheKey.indexOf(cachePageKey)>-1)
       {
         window.localStorage.removeItem(cacheKey);
       }
     }
      
    }

  }

  /**
   * 设置甘特图HTML
   * @param {*} model 
   * @param {*} props 
   */
  var setGanttHtml = function (model, props) {
	if (!props || !model) return;
	var paramsMap = props.data;
	var schemeID = model.schemaId;
	if (!paramsMap || typeof(paramsMap)!="object") return;
	if (!schemeID || typeof(schemeID)!="string") return;
	var gtAction = paramsMap["action"];
  if (!gtAction || typeof(gtAction)!="string") return;
     switch(gtAction)
     {
       case getGanttOpr("preloadData"):
        model.invoke(getGanttOpr("preloadData"),"");
       break;

     }
  }
  /**
   * 更新甘特图的HTML
   * @param {*} model 
   * @param {*} props 
   */
  var updateGanttHtml = function (model, props) {
    if (!props || !model) return;
    var paramsMap = props.data;
    var schemeID = model.schemaId;
    if (!paramsMap || typeof(paramsMap)!="object") return;
    if (!schemeID || typeof(schemeID)!="string") return;
    var gtAction = paramsMap["action"];
    if (!gtAction || typeof(gtAction)!="string") return;
    var isClick=true;
       switch(gtAction)
       {
          case getGanttOpr("initial"):
               initGanttCtl(model,props); 
          break;
          case getGanttOpr("loaddata"):
            ge.loadProject(props.data);
            break;
          case getGanttOpr("editTaskRow"):
           console.log(props.data.tasks)  ;  
           ge.loadTask(props.data.tasks[0]);
          break;
          //保存
          case getGanttOpr("save"):
            saveGanttOnServer();
            syncGanttPropData(model,props);
            //这里需要更新前台的任务集合
            model.invoke(gtAction,props.data);
          break;
          //重刷
          case getGanttOpr("undo"):
            ge.undo();
          break;
          //撤销
          case getGanttOpr("redo"):
          ge.redo();  
          break;

          //增加在任务上
          case getGanttOpr("addAboveCurrentTask"): 
            ge.addAboveCurrentTask();
            
          break;
          //增加在任务下
          case getGanttOpr("addBelowCurrentTask"):
            ge.addBelowCurrentTask();  
          break;
          //减少缩进
          case getGanttOpr("outdentCurrentTask"):
            ge.outdentCurrentTask();  
          break;
          //增加缩进
          case getGanttOpr("indentCurrentTask"):
            ge.indentCurrentTask();  
          break;
          //删除当前节点
          case getGanttOpr("deleteFocused"):
            //delete task or link?
          var focusedSVGElement=ge.gantt.element.find(".focused.focused.linkGroup");
          if (focusedSVGElement.size()>0)
              ge.removeLink(focusedSVGElement.data("from"), focusedSVGElement.data("to"));
          else
              ge.deleteCurrentTask();  

              //model.invoke(getGanttOpr("delTaskData"),ge.curOprTask);
          break;
          //展开节点
          case getGanttOpr("expandAll"):
            ge.expandAll();  
          break;
          //隐藏节点
          case getGanttOpr("collapseAll"):
            ge.collapseAll();  
          break;
          //缩小
          case getGanttOpr("zoomMinus"):
            ge.gantt.zoomGantt(false);  
          break;
          //扩大
          case getGanttOpr("zoomPlus"):
            ge.gantt.zoomGantt(true);
          break;
          //打印
          case getGanttOpr("print"):
            ge.print();  
          break;
          //重画
          case getGanttOpr("redraw"):break;
          //展示右
          case getGanttOpr("resize1"):
            ge.splitter.resize(.1)  
          break;
          //展示左右
          case getGanttOpr("resize50"):
            ge.splitter.resize(50)  
          break;
          //展示左
          case getGanttOpr("resize100"):
            ge.splitter.resize(100);  
          break;
          case getGanttOpr("editResources"):
            editResources();  
          break;
          //清除项目
          case getGanttOpr("clear"):
            newProject();  
            break;
          case getGanttOpr("resize"):
              ge.resize();
              break;
          case getGanttOpr("openExternalEditor"):
              ge.openExternalEditor();
          break;
          case getGanttOpr("addIssue"):
              ge.addIssue();
              break;
          case getGanttOpr("openAssignmentEditor"):
          ge.editor.openFullEditor(ge.currentTask,true);
          break;
          case getGanttOpr("openFullEditor"):
          ge.editor.openFullEditor(ge.currentTask,false);
          break;
          case getGanttOpr("zoomMinus"):
          ge.gantt.zoomGantt(false);
          break;
          case getGanttOpr("fullScreen"):
          ge.fullScreen();
          break;
          //下移
          case getGanttOpr("moveDownCurrentTask"):
          ge.moveDownCurrentTask();
          break;
          //上移
          case getGanttOpr("moveUpCurrentTask"):
          ge.moveUpCurrentTask();
          break;
          case getGanttOpr("showcriticalpath"):
            ge.gantt.showCriticalPath=!ge.gantt.showCriticalPath; 
            ge.redraw();
          break;
          
  default:
    isClick=false;
    break;
       }
    if (isClick&&props && props.data){
				model.invoke(getGanttOpr("restData"), model.schemaId);
			}
 }
  function getGanttOpr(opr)
  {
    var ganttWord="gantt";
    return (ganttWord+"_"+opr).toLocaleLowerCase();
  }
  //初始化自定义控件甘特图
var initGanttCtl=function(model, props)
{
  var arrCss = ['./component/platform.css','./component/libs/jquery/dateField/jquery.dateField.css','./component/gantt.css','./component/libs/jquery/valueSlider/mb.slider.css'];
  //,'./component/ganttPrint.css' 打印的样式冲突 media
  
  var arrJs1=['./component/libs/jquery/jquery-ui.min.js','./component/ganttGloble.js'];
  for(var i=0;i<arrCss.length;i++)
  {
    arrJs1.push(arrCss[i]);
  }
  var arrJs2=['./component/libs/jquery/jquery.livequery.1.1.1.min.js','./component/libs/jquery/jquery.timers.js']
  var arrJs3=['./component/libs/utilities.js','./component/libs/forms.js','./component/libs/date.js','./component/libs/dialogs.js','./component/libs/layout.js','./component/libs/i18nJs.js','./component/libs/jquery/dateField/jquery.dateField.js','./component/libs/jquery/JST/jquery.JST.js','./component/libs/jquery/valueSlider/jquery.mb.slider.js']
  var arrJs4=['./component/libs/jquery/svg/jquery.svg.min.js','./component/libs/jquery/svg/jquery.svgdom.1.8.js','./component/ganttUtilities.js','./component/ganttTask.js','./component/ganttDrawerSVG.js'];
  //'./component/ganttUtilities.js','./component/ganttTask.js','./component/ganttDrawerSVG.js'
  var arrJs5=['./component/ganttZoom.js','./component/ganttGridEditor.js','./component/ganttMaster.js','./component/gantt.js']; //这个有先后顺序的
  var index=0;

  //合并2的请求到1中取 
  for(var i=0;i<arrJs2.length;i++)
  {
    arrJs1.push(arrJs2[i]);
  }
    KDApi.loadFile(arrJs1, model, function () {
      initGanttGolble(model,props);
      console.log("arrJs1");
     // KDApi.loadFile(arrJs2, model, function () {
        console.log("arrJs2");
        KDApi.loadFile(arrJs3, model, function () {
          console.log("arrJs3");
          KDApi.loadFile(arrJs4, model, function () {
            console.log("arrJs4");
            KDApi.loadFile(arrJs5, model, function () {
            //  loadFileJs(arrJs5, model,index, function () {
                console.log("arrJs5");  
                KDApi.templateFilePath('./component/gantt.html',model,{
                      path: KDApi.nameSpace(model) + './img/time.png'
                    }).then(result => {
                       var reHtml=setTaskHTML(model,props);
                       result=result.replace("@TASKSEDITHEAD@",reHtml.headHtml).replace("@TASKROW@",reHtml.rowHtml).replace("@TASKEMPTYROW@",reHtml.emptyHtml);
                       model.dom.innerHTML = result;
                       loadGanttCtl(model,props);
                      // ge.loadProject(props.data);
                      // initEvent(model,props);
                      console.log("gantt.html");
                    })
               // });
              });
            });
          });
       // });
    });
}

var loadFileJs=function (arrJs, model,index,fn)
{
	  KDApi.loadFile(arrJs[index], model, function () {
          console.log("loadFileJs:"+index);
          index++;
          if(index==arrJs.length) 
          {
              fn();
              return;
          }	
          loadFileJs(arrJs, model,index,fn);
		
	 })
	
}


  // DOM节点操作函数
  var initEvent = function (model, props) {  
    $(model.dom).find('button').click(function(e){
      clickEventGannt(model,props,e);
    })
  }  

  
  console.log('-----------------init')
  // 注册自定义控件
  KDApi.register('gantt', MyComponent)
})(window.KDApi, jQuery)
