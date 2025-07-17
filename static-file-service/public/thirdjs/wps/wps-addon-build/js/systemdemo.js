
/**
 * web页面调用WPS加载项的方法入口
 *  * info参数结构
 * info:[
 *      {
 *       '方法名':'方法参数',需要执行的方法
 *     },
 *     ...
 *   ]
 * @param {*} info
 */
function dispatcher (info) {
  const funcs = info.funcs
  // 执行web页面传递的方法
  for (let index = 0; index < funcs.length; index++) {
    const func = funcs[index]
    for (const key in func) {
      func[key].isOA = true
      if (key === 'openPanel') { // OpenDoc 属于普通的打开文档的操作方式，文档落地操作
        openPanel(func[key].url) // 进入打开文档处理函数
      } else if (key === 'OnlineEditDoc') { // 在线方式打开文档，属于文档不落地的方式打开
        OnlineEditDoc(func[key])
      } else if (key === 'NewDoc') {
        OpenDoc(func[key])
      } else if (key === 'addMark') {
        addMark(func[key])
      } else if (key === 'createNewDoc') {
        createNewDoc()
      }
    }
  }
  return { message: 'ok', app: wps.Application.Name }
}

function createNewDoc () {
  const wpsApp = wps.WpsApplication()
  wpsApp.Documents.Add()
}

function openPanel (url) {
  const taskPane = (window.Application || wps).CreateTaskPane(url)
  taskPane.DockPosition = window.Application ? window.Application.Enum.JSKsoEnum_msoCTPDockPositionLeft : window.WPS_Enum.msoCTPDockPositionLeft
  taskPane.Visible = true
  taskPane.Width = 450
  taskPane.MinWidth = 450;
  (window.Application || wps).PluginStorage.setItem('pagePanel', taskPane.ID)
}

function openOfficeFileFromSystemDemo (param) {
  const jsonObj = (typeof (param) === 'string' ? JSON.parse(param) : param)
  alert('从业务系统传过来的参数为：' + JSON.stringify(jsonObj))
  return { wps加载项项返回: jsonObj.filepath + ', 这个地址给的不正确' }
}

function InvokeFromSystemDemo (param) {
  const jsonObj = (typeof (param) === 'string' ? JSON.parse(param) : param)
  const handleInfo = jsonObj.Index
  switch (handleInfo) {
    case 'getDocumentName': {
      let docName = ''
      if (wps.WpsApplication().ActiveDocument) {
        docName = wps.WpsApplication().ActiveDocument.Name
      }

      return { 当前打开的文件名为: docName }
    }

    case 'newDocument': {
      let newDocName = ''
      const doc = wps.WpsApplication().Documents.Add()
      newDocName = doc.Name

      return { 操作结果: '新建文档成功，文档名为：' + newDocName }
    }

    case 'OpenFile': {
      const filePath = jsonObj.filepath
      wps.WpsApplication().Documents.OpenFromUrl(filePath)
      return { 操作结果: '打开文件成功' }
    }
  }

  return { 其它xxx: '' }
}
