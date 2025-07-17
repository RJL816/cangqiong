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
            if(this.model.inited){   //页面加载的时候第一次不用执行这个
                updateHtml(this.model,props);
            }else {
                this.model.inited = true;
            }
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
        model.inited = false;
        var cssHref = KDApi.getNameSpace(model) + './scheme.css'
        var pageId = model.pageId.substring(18,model.pageId.length);
        var template = '<div id = "formulaeditor">'
            +'<div id = "inputarea'+pageId+'" class = "inputarea" contenteditable="true" onblur = "saveEditorRange(this)"  onpaste = "return false;" onkeyup = "dealKeyUp(event)"></div>'
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
        if ('addItem'==operate){
            //新增
            var addKeyText = data.replace(/"/g,'').replace('{','').replace('}','').split('||');
            var newInputNode = createNode(addKeyText[0],addKeyText[1]);
            addNewNode(newInputNode,pageId);
            //绑定事件
        }else if('getAllItem'==operate){
            //保存前返回当前串
            var formula = getEditorText(pageId);
            model.invoke('backAllItem', formula);
        }else if('rebuildFormula'==operate){
            //重新加载
            console.log("rebuildFormula begin");
            dealrebuildCommand(data,model);
            console.log("rebuildFormula end");
        }
        console.log("updateHtml end"+operate);
    }

    // 注册自定义控件
    KDApi.register('formulaeditbox', MyComponent,{isMulLang:true})
})(window.KDApi, jQuery)
