
var data_page_id="";
var cachePageKey=  "ganttObjStorage";
var ganttTempID="tmp_";
var ganttModel;
/**
 * 获取缓存页面的键
 * @param {*} val 
 */
var getCachePageKey=function(val)
{
  return cachePageKey+"_"+val;
}
var initGanttGolble=function (model, props)
{
  data_page_id= model.pageId + '_' + model.key;
  cachePageKey= model.pageId + model.key + "_ganttObjStorage";
  $(model.dom).attr("data-page-id",data_page_id);  
  var data=props.data;
  //设置所有需要缓存的数据到全局缓存中取
  for(var key in data.cacheMap)
  {
    setGanttObjStorage(key,data.cacheMap[key]);
  }
}
var getGanttObjStorage=function (key)
  {
    var data= getGanttObjDataStorage();
    var obj=data[key];
    if(obj==undefined||obj==null){obj={}};

    return obj;
  }
  var getGanttObjDataStorage=function ()
  {

    var strData=localStorage.getItem(cachePageKey);
    var data;
    if(strData==undefined||strData==null){data={}}
    else
    {
      data=JSON.parse(strData);
    }
    return data;
  }
  /*
  缓存存储甘特图的所需全局对象
  */
var setGanttObjStorage=function (key,obj)
  {
    var data=getGanttObjDataStorage();
    //var obj=getGanttObjStorage(data,key);
    data[key]=obj;
    localStorage.setItem(cachePageKey,JSON.stringify(data));
  }
var getGanttOpr=function (opr)
  {
    var ganttWord="gantt";
    return (ganttWord+"_"+opr).toLocaleLowerCase();
  };
/**
 * 获取当前操作的任务集合
 */
  var getCurOprTask=function()
  {
    return {"deletedTaskIds":[],"addTasks":[],"updateTasks":[],"oprName":""};
  }
  /**
   * 获取当前新增任务的结构
   */
  var getCurOprAddTask=function()
  {
    return {"row":"","":"task"};
  }
  var getGanttTaskIndex=function(tasks,task){
    if(tasks==undefined||task==undefined||tasks==null||task==null)
    {
      return -1;
    }
    for(var i=0;i<tasks.length;i++)
        {
          item=tasks[i];
          if(item.id==task.id)
          {
            return   i;  
          }
        }
        return -1;
  }
  /**
   * 
   * @param {*} showVal 
   * @param {*} showType  不传就是普通，err表示错误
   */
  var gtShowMessage=function(showVal,showType)
  {
      if(ganttModel==null||ganttModel==undefined)
      {
        alert(val);
        return;
      }
      if(showType==undefined){
        showType="";
      }
      var messageData={"showType":showType,"showVal":showVal};
      ganttModel.invoke( getGanttOpr("ShowMessage"),messageData);
  }