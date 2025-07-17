var ge;
var loadGanttCtl=function(model,props) {
  var canWrite=true; //this is the default for test purposes
  ganttModel=model;
  // here starts gantt initialization
  ge = new GanttMaster();
 
  ge.set100OnClose=true;

  ge.shrinkParent=true;

  ge.init($("#workSpace"),model);
  loadI18n(); //overwrite with localized ones

  //in order to force compute the best-fitting zoom level
  delete ge.gantt.zoom;

  //var project=loadFromLocalStorage();
  var project=props.data;

  if (!project.canWrite)
    $(".ganttButtonBar button.requireWrite").attr("disabled","true");
  ge.loadProject(project);
  ge.checkpoint(); //empty the undo stack

  //initializeHistoryManagement(ge.tasks[0].id);
};

function getEmptyProject(data){
  data.tasks=[{"id": -1, "name": "Gantt editor", "progress": 0, "progressByWorklog": false, "relevance": 0, "type": "", "typeId": "", "description": "", "code": "", "level": 0, "status": "STATUS_ACTIVE", "depends": "", "canWrite": true, "start": 1396994400000, "duration": 20, "end": 1399586399999, "startIsMilestone": false, "endIsMilestone": false, "collapsed": false, "assigs": [], "hasChild": false},]
}

function getDemoProject(){
  //console.debug("getDemoProject")
ret= {"tasks":    [
      {"id": -1, "name": "Gantt editor", "progress": 0, "progressByWorklog": false, "relevance": 0, "type": "", "typeId": "", "description": "", "code": "", "level": 0, "status": "STATUS_ACTIVE", "depends": "", "canWrite": true, "start": 1396994400000, "duration": 20, "end": 1399586399999, "startIsMilestone": false, "endIsMilestone": false, "collapsed": false, "assigs": [], "hasChild": true},
      {"id": -2, "name": "coding", "progress": 0, "progressByWorklog": false, "relevance": 0, "type": "", "typeId": "", "description": "", "code": "", "level": 1, "status": "STATUS_ACTIVE", "depends": "", "canWrite": true, "start": 1396994400000, "duration": 10, "end": 1398203999999, "startIsMilestone": false, "endIsMilestone": false, "collapsed": false, "assigs": [], "hasChild": true},
      {"id": -3, "name": "gantt part", "progress": 0, "progressByWorklog": false, "relevance": 0, "type": "", "typeId": "", "description": "", "code": "", "level": 2, "status": "STATUS_ACTIVE", "depends": "", "canWrite": true, "start": 1396994400000, "duration": 2, "end": 1397167199999, "startIsMilestone": false, "endIsMilestone": false, "collapsed": false, "assigs": [], "hasChild": false},
      {"id": -4, "name": "editor part", "progress": 0, "progressByWorklog": false, "relevance": 0, "type": "", "typeId": "", "description": "", "code": "", "level": 2, "status": "STATUS_SUSPENDED", "depends": "3", "canWrite": true, "start": 1397167200000, "duration": 4, "end": 1397685599999, "startIsMilestone": false, "endIsMilestone": false, "collapsed": false, "assigs": [], "hasChild": false},
      {"id": -5, "name": "testing", "progress": 0, "progressByWorklog": false, "relevance": 0, "type": "", "typeId": "", "description": "", "code": "", "level": 1, "status": "STATUS_SUSPENDED", "depends": "2:5", "canWrite": true, "start": 1398981600000, "duration": 5, "end": 1399586399999, "startIsMilestone": false, "endIsMilestone": false, "collapsed": false, "assigs": [], "hasChild": true},
      {"id": -6, "name": "test on safari", "progress": 0, "progressByWorklog": false, "relevance": 0, "type": "", "typeId": "", "description": "", "code": "", "level": 2, "status": "STATUS_SUSPENDED", "depends": "", "canWrite": true, "start": 1398981600000, "duration": 2, "end": 1399327199999, "startIsMilestone": false, "endIsMilestone": false, "collapsed": false, "assigs": [], "hasChild": false},
      {"id": -7, "name": "test on ie", "progress": 0, "progressByWorklog": false, "relevance": 0, "type": "", "typeId": "", "description": "", "code": "", "level": 2, "status": "STATUS_SUSPENDED", "depends": "6", "canWrite": true, "start": 1399327200000, "duration": 3, "end": 1399586399999, "startIsMilestone": false, "endIsMilestone": false, "collapsed": false, "assigs": [], "hasChild": false},
           
      {"id": -8, "name": "test on chrome", "progress": 0, "progressByWorklog": false, "relevance": 0, "type": "", "typeId": "", "description": "", "code": "", "level": 2, "status": "STATUS_SUSPENDED", "depends": "6", "canWrite": true, "start": 1399327200000, "duration": 2, "end": 1399499999999, "startIsMilestone": false, "endIsMilestone": false, "collapsed": false, "assigs": [], "hasChild": false}
    ], "selectedRow": 2, "deletedTaskIds": [],
      "resources": [
      {"id": "tmp_1", "name": "Resource 1"},
      {"id": "tmp_2", "name": "Resource 2"},
      {"id": "tmp_3", "name": "Resource 3"},
      {"id": "tmp_4", "name": "Resource 4"}
    ],
      "roles":       [
      {"id": "tmp_1", "name": "Project Manager"},
      {"id": "tmp_2", "name": "Worker"},
      {"id": "tmp_3", "name": "Stakeholder"},
      {"id": "tmp_4", "name": "Customer"}
    ], "canWrite":    true, "canDelete":true, "canWriteOnParent": true, canAdd:true}


    //actualize data
    var offset=new Date().getTime()-ret.tasks[0].start;
    for (var i=0;i<ret.tasks.length;i++) {
      ret.tasks[i].start = ret.tasks[i].start + offset;
    }
  return ret;
}



function loadGanttFromServer(taskId, callback) {

  //this is a simulation: load data from the local storage if you have already played with the demo or a textarea with starting demo data
  var ret=loadFromLocalStorage();

  //this is the real implementation
  /*
  //var taskId = $("#taskSelector").val();
  var prof = new Profiler("loadServerSide");
  prof.reset();

  $.getJSON("ganttAjaxController.jsp", {CM:"LOADPROJECT",taskId:taskId}, function(response) {
    //console.debug(response);
    if (response.ok) {
      prof.stop();

      ge.loadProject(response.project);
      ge.checkpoint(); //empty the undo stack

      if (typeof(callback)=="function") {
        callback(response);
      }
    } else {
      jsonErrorHandling(response);
    }
  });
  */

  return ret;
}


function saveGanttOnServer() {

  //this is a simulation: save data to the local storage or to the textarea
  saveInLocalStorage();

  /*
  var prj = ge.saveProject();

  delete prj.resources;
  delete prj.roles;

  var prof = new Profiler("saveServerSide");
  prof.reset();

  if (ge.deletedTaskIds.length>0) {
    if (!confirm("TASK_THAT_WILL_BE_REMOVED\n"+ge.deletedTaskIds.length)) {
      return;
    }
  }

  $.ajax("ganttAjaxController.jsp", {
    dataType:"json",
    data: {CM:"SVPROJECT",prj:JSON.stringify(prj)},
    type:"POST",

    success: function(response) {
      if (response.ok) {
        prof.stop();
        if (response.project) {
          ge.loadProject(response.project); //must reload as "tmp_" ids are now the good ones
        } else {
          ge.reset();
        }
      } else {
        var errMsg="Errors saving project\n";
        if (response.message) {
          errMsg=errMsg+response.message+"\n";
        }

        if (response.errorMessages.length) {
          errMsg += response.errorMessages.join("\n");
        }

        alert(errMsg);
      }
    }

  });
  */
}

function newProject(){
  clearGantt();
}


function clearGantt() {
  ge.reset();
}

//-------------------------------------------  Get project file as JSON (used for migrate project from gantt to Teamwork) ------------------------------------------------------
function getFile() {
  $("#gimBaPrj").val(JSON.stringify(ge.saveProject()));
  $("#gimmeBack").submit();
  $("#gimBaPrj").val("");

  /*  var uriContent = "data:text/html;charset=utf-8," + encodeURIComponent(JSON.stringify(prj));
   neww=window.open(uriContent,"dl");*/
}


function loadFromLocalStorage() {
  var ret;
  if (localStorage) {
    if (localStorage.getObject(getCachePageKey("teamworkGantDemo"))) {
      ret = localStorage.getObject(getCachePageKey("teamworkGantDemo"));
    }
  }

  //if not found create a new example task
  // if (!ret || !ret.tasks || ret.tasks.length == 0){
  //   ret=getDemoProject();
  // }
  return ret;
}


function saveInLocalStorage() {
  var prj = ge.saveProject();
  if (localStorage) {
    localStorage.setObject(getCachePageKey("teamworkGantDemo"), prj);
  }
}


//-------------------------------------------  Open a black popup for managing resources. This is only an axample of implementation (usually resources come from server) ------------------------------------------------------
function editResources(){

  //make resource editor
  var resourceEditor = $.JST.createFromTemplate({}, "RESOURCE_EDITOR");
  var resTbl=resourceEditor.find("#resourcesTable");

  for (var i=0;i<ge.resources.length;i++){
    var res=ge.resources[i];
    resTbl.append($.JST.createFromTemplate(res, "RESOURCE_ROW"))
  }


  //bind add resource
  resourceEditor.find("#addResource").click(function(){
    resTbl.append($.JST.createFromTemplate({id:"new",name:"resource"}, "RESOURCE_ROW"))
  });

  //bind save event
  resourceEditor.find("#resSaveButton").click(function(){
    var newRes=[];
    //find for deleted res
    for (var i=0;i<ge.resources.length;i++){
      var res=ge.resources[i];
      var row = resourceEditor.find("[resId="+res.id+"]");
      if (row.length>0){
        //if still there save it
        var name = row.find("input[name]").val();
        if (name && name!="")
          res.name=name;
        newRes.push(res);
      } else {
        //remove assignments
        for (var j=0;j<ge.tasks.length;j++){
          var task=ge.tasks[j];
          var newAss=[];
          for (var k=0;k<task.assigs.length;k++){
            var ass=task.assigs[k];
            if (ass.resourceId!=res.id)
              newAss.push(ass);
          }
          task.assigs=newAss;
        }
      }
    }

    //loop on new rows
    var cnt=0
    resourceEditor.find("[resId=new]").each(function(){
      cnt++;
      var row = $(this);
      var name = row.find("input[name]").val();
      if (name && name!="")
        newRes.push (new Resource("tmp_"+new Date().getTime()+"_"+cnt,name));
    });

    ge.resources=newRes;

    closeBlackPopup();
    ge.redraw();
  });


  var ndo = createModalPopup(400, 500).append(resourceEditor);
}

function initializeHistoryManagement(taskId){

  //retrieve from server the list of history points in millisecond that represent the instant when the data has been recorded
  //response: {ok:true, historyPoints: [1498168800000, 1498600800000, 1498687200000, 1501538400000, �]}
  $.getJSON(contextPath+"/applications/teamwork/task/taskAjaxController.jsp", {CM: "GETGANTTHISTPOINTS", OBJID:taskId}, function (response) {

    //if there are history points
    if (response.ok == true && response.historyPoints && response.historyPoints.length>0) {

      //add show slider button on button bar
      var histBtn = $("<button>").addClass("button textual icon lreq30 lreqLabel").attr("title", "SHOW_HISTORY").append("<span class=\"teamworkIcon\">&#x60;</span>");

      //clicking it
      histBtn .click(function () {
        var el = $(this);
        var ganttButtons = $(".ganttButtonBar .buttons");

        //is it already on?
        if (!ge.element.is(".historyOn")) {
          ge.element.addClass("historyOn");
          ganttButtons.find(".requireCanWrite").hide();

          //load the history points from server again
          showSavingMessage();
          $.getJSON(contextPath + "/applications/teamwork/task/taskAjaxController.jsp", {CM: "GETGANTTHISTPOINTS", OBJID: ge.tasks[0].id}, function (response) {
            jsonResponseHandling(response);
            hideSavingMessage();
            if (response.ok == true) {
              var dh = response.historyPoints;
              if (dh && dh.length > 0) {
                //si crea il div per lo slider
                var sliderDiv = $("<div>").prop("id", "slider").addClass("lreq30 lreqHide").css({"display":"inline-block","width":"500px"});
                ganttButtons.append(sliderDiv);

                var minVal = 0;
                var maxVal = dh.length-1 ;

                $("#slider").show().mbSlider({
                  rangeColor : '#2f97c6',
                  minVal     : minVal,
                  maxVal     : maxVal,
                  startAt    : maxVal,
                  showVal    : false,
                  grid       :1,
                  formatValue: function (val) {
                    return new Date(dh[val]).format();
                  },
                  onSlideLoad: function (obj) {
                    this.onStop(obj);

                  },
                  onStart    : function (obj) {},
                  onStop     : function (obj) {
                    var val = $(obj).mbgetVal();
                    showSavingMessage();
                    /**
                     * load the data history for that milliseconf from server
                     * response in this format {ok: true, baselines: {...}}
                     *
                     * baselines: {61707: {duration:1,endDate:1550271599998,id:61707,progress:40,startDate:1550185200000,status:"STATUS_WAITING",taskId:"3055"},
                     *            {taskId:{duration:in days,endDate:in millis,id:history record id,progress:in percent,startDate:in millis,status:task status,taskId:"3055"}....}}                     */

                    $.getJSON(contextPath + "/applications/teamwork/task/taskAjaxController.jsp", {CM: "GETGANTTHISTORYAT", OBJID: ge.tasks[0].id, millis:dh[val]}, function (response) {
                      jsonResponseHandling(response);
                      hideSavingMessage();
                      if (response.ok ) {
                        ge.baselines=response.baselines;
                        ge.showBaselines=true;
                        ge.baselineMillis=dh[val];
                        ge.redraw();
                      }
                    })

                  },
                  onSlide    : function (obj) {
                    clearTimeout(obj.renderHistory);
                    var self = this;
                    obj.renderHistory = setTimeout(function(){
                      self.onStop(obj);
                    }, 200)

                  }
                });
              }
            }
          });


          // closing the history
        } else {
          //remove the slider
          $("#slider").remove();
          ge.element.removeClass("historyOn");
          if (ge.permissions.canWrite)
            ganttButtons.find(".requireCanWrite").show();

          ge.showBaselines=false;
          ge.baselineMillis=undefined;
          ge.redraw();
        }

      });
      $("#saveGanttButton").before(histBtn);
    }
  })
}

function showBaselineInfo (event,element){
  //alert(element.attr("data-label"));
  $(element).showBalloon(event, $(element).attr("data-label"));
  ge.splitter.secondBox.one("scroll",function(){
    $(element).hideBalloon();
  })
}



 $.JST.loadDecorator("RESOURCE_ROW", function(resTr, res){
    resTr.find(".delRes").click(function(){$(this).closest("tr").remove()});
  });

  $.JST.loadDecorator("ASSIGNMENT_ROW", function(assigTr, taskAssig){
    var resEl = assigTr.find("[name=resourceId]");
    var opt = $("<option>");
    resEl.append(opt);
    for(var i=0; i< taskAssig.task.master.resources.length;i++){
      var res = taskAssig.task.master.resources[i];
      opt = $("<option>");
      opt.val(res.id).html(res.name);
      if(taskAssig.assig.resourceId == res.id)
        opt.attr("selected", "true");
      resEl.append(opt);
    }
    var roleEl = assigTr.find("[name=roleId]");
    for(var i=0; i< taskAssig.task.master.roles.length;i++){
      var role = taskAssig.task.master.roles[i];
      var optr = $("<option>");
      optr.val(role.id).html(role.name);
      if(taskAssig.assig.roleId == role.id)
        optr.attr("selected", "true");
      roleEl.append(optr);
    }

    if(taskAssig.task.master.permissions.canWrite && taskAssig.task.canWrite){
      assigTr.find(".delAssig").click(function(){
        var tr = $(this).closest("[assId]").fadeOut(200, function(){$(this).remove()});
      });
    }

  });


  function loadI18n(){
    GanttMaster.messages =getGanttObjStorage("loadI18n");
}
   



  function createNewResource(el) {
    var row = el.closest("tr[taskid]");
    var name = row.find("[name=resourceId_txt]").val();
    var url = contextPath + "/applications/teamwork/resource/resourceNew.jsp?CM=ADD&name=" + encodeURI(name);

    openBlackPopup(url, 700, 320, function (response) {
      //fillare lo smart combo
      if (response && response.resId && response.resName) {
        //fillare lo smart combo e chiudere l'editor
        row.find("[name=resourceId]").val(response.resId);
        row.find("[name=resourceId_txt]").val(response.resName).focus().blur();
      }

    });
  }
  /**
   * 同步甘特图数据
   * @param {*} model 
   * @param {*} props 
   */
  function syncGanttPropData(model, props)
  {
     var data=props.data;
     var ganntData= ge.saveGantt(false);
     for(key in ganntData)
     {
      data[key]=ganntData[key];
     }
  }
  // 点击按钮时触发的事件 并触发到后端
  function clickEventGannt(model, props,e) {
        var id=e.currentTarget.getAttribute("id");
        var isOpr=true;//表示是指定按钮的操作
        if(id==undefined)return;
        switch(getGanttOpr(id))
        {
          //保存
          case getGanttOpr("saveGanttOnServer"):
            saveGanttOnServer();
            syncGanttPropData(model,props);
            //这里需要更新前台的任务集合
            model.invoke(getGanttOpr(id),props.data);
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
           
            isOpr=false;
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
		  	default:
		  	isOpr=false;
		  	break;

        }
  }
  
  function setTaskHTML(model, props)
  {
    var data=props.data;
    var taskFields=data.taskFields;
    var taskField;
    var  headHtml="";
    headHtml='<table class="gdfTable" cellspacing="0" cellpadding="0"><thead><tr style="height:40px">';
    headHtml=headHtml+'<th class="gdfColHeader" style="width:35px; border-right: none"></th>';
    headHtml=headHtml+'<th class="gdfColHeader" style="width:25px;"></th>';
    
    var rowHtml='';
    rowHtml=rowHtml+'<tr id="tid_(#=obj.id#)" taskId="(#=obj.id#)" class="taskEditRow (#=obj.isParent()?\'isParent\':\'\'#) (#=obj.collapsed?\'collapsed\':\'\'#)" level="(#=level#)">';
    rowHtml=rowHtml+'<th class="gdfCell edit" align="right" style="cursor:pointer;"><span class="taskRowIndex">(#=obj.getRow()+1#)</span> <span class="teamworkIcon" style="font-size:12px;" >e</span></th>';
    rowHtml=rowHtml+'<td class="gdfCell noClip" align="center"><div class="taskStatus cvcColorSquare" status="(#=obj.status#)"></div></td>';
    
    var emptyHtml="";
    emptyHtml=emptyHtml+'<tr class="taskEditRow emptyRow" >';
    emptyHtml=emptyHtml+'<th class="gdfCell" align="right"></th>';
    emptyHtml=emptyHtml+'<td class="gdfCell noClip" align="center"></td>';
    

   
    var tempRowHtmlObj={"headHtmlRow":"","rowHtmlRow":"","emptyHtmlRow":""};
    
    for(var i=0;i<taskFields.length;i++)
    {
       taskField=taskFields[i];
       tempRowHtmlObj={"headHtmlRow":"","rowHtmlRow":"","emptyHtmlRow":'<td class="gdfCell @class"></td>'}
      switch(taskField.fieldName)
      {
        case "code":
          tempRowHtmlObj.headHtmlRow=tempRowHtmlObj.headHtmlRow+'<th class="gdfColHeader gdfResizable @class" style="@style">'+taskField.fieldCaption+'</th>'; 
          tempRowHtmlObj.rowHtmlRow=tempRowHtmlObj.rowHtmlRow+'<td class="gdfCell @class"><input type="text" name="code" @attr value="(#=obj.code?obj.code:\'\'#)" placeholder="code/short name"></td>';   
          
        break;
        case "name":
          tempRowHtmlObj.headHtmlRow=tempRowHtmlObj.headHtmlRow+'<th class="gdfColHeader gdfResizable @class" style="@style">'+taskField.fieldCaption+'</th>';   
          tempRowHtmlObj.rowHtmlRow=tempRowHtmlObj.rowHtmlRow+'<td class="gdfCell indentCell @class" style="padding-left:(#=obj.level*10+18#)px;">';
          tempRowHtmlObj.rowHtmlRow=tempRowHtmlObj.rowHtmlRow+' <div class="exp-controller" align="center"></div>';
          tempRowHtmlObj.rowHtmlRow=tempRowHtmlObj.rowHtmlRow+'<input type="text" name="name" @attr value="(#=obj.name#)" placeholder="name">';
          tempRowHtmlObj.rowHtmlRow=tempRowHtmlObj.rowHtmlRow+'</td>';
          
        break;
        case "startIsMilestone":
          tempRowHtmlObj.headHtmlRow=tempRowHtmlObj.headHtmlRow+'<th class="gdfColHeader @class"  align="center" style="@style" title="'+taskField.fieldCaption+'"><span class="teamworkIcon" style="font-size: 8px;">^</span></th>';      
          tempRowHtmlObj.rowHtmlRow=tempRowHtmlObj.rowHtmlRow+' <td class="gdfCell @class" align="center"><input type="checkbox" @attr name="startIsMilestone"></td>';    
          
        break;
        case "start":
          tempRowHtmlObj.headHtmlRow=tempRowHtmlObj.headHtmlRow+'<th class="gdfColHeader gdfResizable @class" style="@style">'+taskField.fieldCaption+'</th>'; 
          tempRowHtmlObj.rowHtmlRow=tempRowHtmlObj.rowHtmlRow+' <td class="gdfCell @class"><input type="text" name="start" @attr value="" class="date"></td>';    
           
        break;
        case "endIsMilestone":
          tempRowHtmlObj.headHtmlRow=tempRowHtmlObj.headHtmlRow+'<th class="gdfColHeader @class"  align="center" style="@style" title="'+taskField.fieldCaption+'"><span class="teamworkIcon" style="font-size: 8px;">^</span></th>';    
          tempRowHtmlObj.rowHtmlRow=tempRowHtmlObj.rowHtmlRow+' <td class="gdfCell @class" align="center"><input type="checkbox" @attr name="endIsMilestone"></td>';   
          
          break;
        case "end":
          tempRowHtmlObj.headHtmlRow=tempRowHtmlObj.headHtmlRow+'<th class="gdfColHeader gdfResizable @class" style="@style">'+taskField.fieldCaption+'</th>'; 
          tempRowHtmlObj.rowHtmlRow=tempRowHtmlObj.rowHtmlRow+' <td class="gdfCell @class"><input type="text" name="end" value="" class="date" @attr ></td>';
          
          break;
        case "duration":
          tempRowHtmlObj.headHtmlRow=tempRowHtmlObj.headHtmlRow+'<th class="gdfColHeader gdfResizable @class" style="@style">'+taskField.fieldCaption+'</th>';   
          tempRowHtmlObj.rowHtmlRow=tempRowHtmlObj.rowHtmlRow+' <td class="gdfCell @class"><input type="text" name="duration" autocomplete="off" value="(#=obj.duration#)" @attr></td>';  
          
          break;
        case "progress":
          tempRowHtmlObj.headHtmlRow=tempRowHtmlObj.headHtmlRow+'<th class="gdfColHeader gdfResizable @class" style="@style">'+taskField.fieldCaption+'</th>'; 
          tempRowHtmlObj.rowHtmlRow=tempRowHtmlObj.rowHtmlRow+' <td class="gdfCell @class"><input @attr type="text" name="progress" class="validated" entrytype="PERCENTILE" autocomplete="off" value="(#=obj.progress?obj.progress:\'\'#)';
          tempRowHtmlObj.rowHtmlRow=tempRowHtmlObj.rowHtmlRow+'(#=obj.progressByWorklog?\'readOnly\':\'\'#)></td>';
          
          break;
        case "depends":
          tempRowHtmlObj.headHtmlRow=tempRowHtmlObj.headHtmlRow+'<th class="gdfColHeader gdfResizable requireCanSeeDep @class" style="@style">'+taskField.fieldCaption+'</th>';   
          tempRowHtmlObj.rowHtmlRow=tempRowHtmlObj.rowHtmlRow+' <td class="gdfCell requireCanSeeDep @class">';
          //tempRowHtmlObj.rowHtmlRow=tempRowHtmlObj.rowHtmlRow+' <input type="text" name="depends" autocomplete="off" value=\'(#=obj.depends#)\' (#=obj.hasExternalDep?\'readonly\':\'\'#)></td> ';
          tempRowHtmlObj.rowHtmlRow=tempRowHtmlObj.rowHtmlRow+' <td class="gdfCell @class"><input @attr type="text" name="depends" autocomplete="off" value="(#=obj.depends?obj.depends:\'\'#)" ></td>';
          tempRowHtmlObj.emptyHtmlRow='<td class="gdfCell requireCanSeeDep @class"></td>';
          break;
        case "assigs":
          tempRowHtmlObj.headHtmlRow=tempRowHtmlObj.headHtmlRow+'<th class="gdfColHeader gdfResizable @class" style="@style text-align: left; padding-left: 10px;">'+taskField.fieldCaption+'</th>'; 
          tempRowHtmlObj.rowHtmlRow=tempRowHtmlObj.rowHtmlRow+' <td class=\'gdfCell taskAssigs @class\'>(#=obj.getAssigsString()#)</td>';
          
          break;
       default:
        if(taskField.ctlType==0)
        {
          tempRowHtmlObj.headHtmlRow=tempRowHtmlObj.headHtmlRow+'<th class="gdfColHeader gdfResizable @class" style="@style">'+taskField.fieldCaption+'</th>';   
          tempRowHtmlObj.rowHtmlRow=tempRowHtmlObj.rowHtmlRow+' <td class="gdfCell @class" align="center"><input @attr type="text" name="'+taskField.fieldName+'" value="(#=obj.'+taskField.fieldName+'?obj.'+taskField.fieldName+':\'\'#)" ></td>'; 
          
        }
       break;
      }
      
      if(tempRowHtmlObj.headHtmlRow.length>0&&tempRowHtmlObj.emptyHtmlRow.length>0&&tempRowHtmlObj.rowHtmlRow.length>0)
      {
        setCtlClass(taskField,tempRowHtmlObj);
        headHtml=headHtml+tempRowHtmlObj.headHtmlRow;
        rowHtml=rowHtml+tempRowHtmlObj.rowHtmlRow;
        emptyHtml=emptyHtml+tempRowHtmlObj.emptyHtmlRow;

        if(i==taskFields.length-1)
        {
          headHtml=headHtml+tempRowHtmlObj.headHtmlRow+'<th class="gdfColHeader gdfResizable " style="width:1000px;"></th>';
          rowHtml=rowHtml+tempRowHtmlObj.rowHtmlRow+' <td class="gdfCell " align="center"></td>';
          emptyHtml=emptyHtml+tempRowHtmlObj.emptyHtmlRow;
        }
      }
      // if(taskField.fieldName=="depends")break;
    }
    headHtml=headHtml+"</tr></thead></table>";
   // headHtml=headHtml+"--> \r\n";

    rowHtml=rowHtml+"</tr>";
   // rowHtml=rowHtml+"-->";

    emptyHtml=emptyHtml+"</tr>";
   // emptyHtml=emptyHtml+"-->";
    
  //  $(model.dom).find('#TASKSEDITHEAD').empty();
  //   $(model.dom).find('#TASKSEDITHEAD').append(headHtml);
  //   $(model.dom).find('#TASKROW').append(rowHtml);
  //   $(model.dom).find('#TASKEMPTYROW').append(emptyHtml);
  return {"headHtml":headHtml,"rowHtml":rowHtml,"emptyHtml":emptyHtml};
  }
 function setCtlClass(taskField,tempRowHtmlObj)
 {
    var headHtmlRowClass="";
    if(!taskField.visible)
    {
      headHtmlRowClass=headHtmlRowClass+"hideCtl";
    }
    var headHtmlRowStyle=""; 
    headHtmlRowStyle=headHtmlRowStyle+"width:"+taskField.width+"px;";
    
    tempRowHtmlObj.headHtmlRow=tempRowHtmlObj.headHtmlRow.replace("@style",headHtmlRowStyle);
    tempRowHtmlObj.headHtmlRow=tempRowHtmlObj.headHtmlRow.replace("@class",headHtmlRowClass);

    var rowHtmlClass="";
    if(!taskField.visible)
    {
      rowHtmlClass=rowHtmlClass+"hideCtl";
    }
    if(!taskField.visible)
    {
      rowHtmlClass=rowHtmlClass+"hideCtl";
    }
    var rowHtmlAttr="";
    if(taskField.readOnly)
    {
      rowHtmlAttr=rowHtmlAttr+" readonly='readonly' ";
    }
    
    tempRowHtmlObj.rowHtmlRow=tempRowHtmlObj.rowHtmlRow.replace("@class",rowHtmlClass).replace("@attr",rowHtmlAttr);

    var emptyHtmlClass="";
    if(!taskField.visible)
    {
      emptyHtmlClass=emptyHtmlClass+"hideCtl";
    }
    tempRowHtmlObj.emptyHtmlRow=tempRowHtmlObj.emptyHtmlRow.replace("@class",emptyHtmlClass);
  
 }
