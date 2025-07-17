(function (KDApi, $) {
    // 构造函数
    function MyComponent (model) {
        this._setModel(model)
    }

    var editor // 顶层变量声明
    var isUpdate = false
    MyComponent.prototype = {
        // 绑定model
        _setModel: function (model) {
            this.model = model
//	  newModel = model
        },
        // 生命周期：初始化
        init: function (props) {
            console.log("setHtml begin-into")
            setHtml(this.model, props)
            console.log("setHtml begin-back")
        },
        // 生命周期：更新
        update: function (props) {
            updateHtml(this.model,props);
        },
        // 生命周期：销毁
        destoryed: function () {
            var pageId = this.model.pageId.substring(18,this.model.pageId.length);
            deleteEditorInstance(pageId);
        }

    }

    //初始化编辑器
    var setHtml = function (model, props, isUpdate) {

        console.log("setHtml begin")
        editorRange = null;  //定义
        model.initTag = true;
        var cssHref = KDApi.getNameSpace(model) + './scheme.css'

        var pageId = model.pageId.substring(18,model.pageId.length);
        var template = '<div id = "formulaeditor">'
            +'<div id = "inputarea'+pageId+'" class = "inputarea" contenteditable="true" onblur = "saveEditorRange(this)"  onpaste = "return false;" onkeyup = "dealKeyUp(event)">'
            +'</div>'
            +'<div id = "acoountPanel'+pageId+'" class = "acoountPanel" onblur = "hideAccountPanel(this)" tabindex = "0" outline=0" hidefocus="true" >' +
            '<div id = "accountDiv'+pageId+'"class = "accountDiv"></div><div id = "metricDiv'+pageId+'"class = "metricDiv"></div>'
            +'</div>';
        model.dom.innerHTML = template
        console.log("setHtml end")

        if ($('link[href="' + cssHref + '"]').length === 0) {
            // 加载css文件
            KDApi.loadFile('./scheme.css', model, function () {
                //updateHtml(model, props)
                console.log("cssField Ok")
            })
        }
        KDApi.loadFile('./javascript.js', model, function () {
            //updateHtml(model, props)
            console.log("jsField Ok")
            setEditorInstance(model);
            model.initTag = false;
            updateHtml(model, props);

        })
    }


    //修改编辑内容--包含新增
    var updateHtml = function (model, props) {

        if(model.initTag == true){
            return;
        }
        if (props.data == undefined){
            return;
        }
        if (typeof(props.data) == undefined){
            return;
        }
        var pageId = model.pageId.substring(18,model.pageId.length);
        var operate = props.data.operate;
        console.log("updateHtml begin"+operate);
        var data = props.data.data;
        if ('getText'==operate){
            var formulaStr = getEditorTextWithMark(pageId);
            model.invoke('getText', formulaStr);
        }else if ('updateText'==operate){
            //更新编辑器里的内容，在已保存信息、修改等时候调用
            var addKeyText = data.replace(/"/g,'').replace('{','').replace('}','').split('||');
            updataText(addKeyText[0],addKeyText[1],pageId);
        }else if ('addText'==operate){
            //新增，用于点击f(x)按钮、表格双击单元格
            var addKeyText = data.replace(/"/g,'').replace('{','').replace('}','').split('||');
            var newInputNode = createFunction(addKeyText[0],addKeyText[1]);
            addNewNode(newInputNode,pageId);
            var allFormulaKeyStr = getNodeText(pageId);
            model.invoke("updateFormulaKey",allFormulaKeyStr);
            //绑定事件
        }else if('getNewText'==operate){
            //保存前返回当前串
            var formula = getEditorText(pageId);
            model.invoke('getNewText', formula);
        }  else if('getNodeText'==operate){
            //保存前返回当前串
            var formula = getNodeText(pageId);
            model.invoke('getNodeText', formula);
        }  else if('rebuildText'==operate){
            //重新加载
            console.log("rebuildText begin");
            dealrebuildCommand(data,model);
            console.log("rebuildText end");

            //dealrebuildCommand(data,model);
        } else if ('addFunction'==operate){

            var addKeyText = data.replace(/"/g,'').replace('{','').replace('}','').split('||');
            updataText(addKeyText[0],addKeyText[1],pageId);
        } else if(operate.startsWith('showMatchAccount')){
            showAccountPanel(data,pageId);
        } else if(operate.startsWith('showMetric')){
            showMetricList(data,pageId);
        }
        console.log("updateHtml end"+operate);
    }

    // 注册自定义控件
    KDApi.register('rulemanageditor', MyComponent,{isMulLang:true})
})(window.KDApi, jQuery)
