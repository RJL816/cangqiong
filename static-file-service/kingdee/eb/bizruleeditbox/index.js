(function (KDApi, $) {
    // 构造函数
    function MyComponent (model) {
        this._setModel(model)
    }
    MyComponent.prototype = {
        // 绑定model
        _setModel: function (model) {
            this.model = model
            this.model.inited = false;
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
    var setHtml = function (model, props) {

        console.log("setHtml begin")
        editorRange = null;  //定义
        model.inited = false;
        var cssHref = KDApi.getNameSpace(model) + './scheme.css'

        var pageId = model.pageId.substring(18,model.pageId.length);
        var template = '<div>'
            +'<div id = "formulaeditor'+pageId+'"></div>'
            +'<div id = "memberPanel'+pageId+'" class = "memberPanel" onblur = "hideMembMatchPanel(this)" tabindex = "0" outline=0" hidefocus="true" >'
            +'<div id = "memberDiv'+pageId+'"class = "memberDiv"></div>'
            +'<div id = "rangeDiv'+pageId+'"class = "rangeDiv"></div>'
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
            updateHtml(model,props);
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
        console.log("updateHtml begin:"+operate);
        var data = props.data.data;
        if ('updateText'==operate){
            //更新编辑器里的内容，在已保存信息、修改等时候调用
            var showType = data.showType;
            var addKeyText = data.formulaMemb.split('||');
            updataText(addKeyText[0],addKeyText[1],pageId,showType);
        }else if ('addText'==operate){
            //新增，用于点击f(x)按钮、表格双击单元格
            setFocusOnFormulaEditBox(pageId);
            removeMatchMemberInfo(pageId);  // 插入节点前都先清除一下模糊匹配的信息。如果不是模糊匹配也不影响
            var showType = data.showType;
            var addKeyText = data.formulaMemb.split('||');
            var newInputNode = createFuncOrFormulaMemb(addKeyText[0],addKeyText[1],showType);
            addNewNode(newInputNode,pageId);
            // var allFormulaKeyStr = getNodeText(pageId);
            // model.invoke("updateFormulaKey",allFormulaKeyStr);
            //绑定事件
        }else if('getNewText'==operate){
            var formula = getEditorText(pageId);
            model.invoke('getNewText', formula);
            //保存前返回当前串
        }  else if('getAllFormulaKeyOneRow'==operate){
            getAllFormulaKeyOneRow(pageId,data);
        }  else if('rebuild'==operate){
            //重新加载
            console.log("rebuild begin");
            dealrebuildCommand(data,model);
            console.log("rebuild end");
        } else if ('addFunction'==operate){
            var addKeyText = data.split('||');
            updataText(addKeyText[0],addKeyText[1],pageId,null);
        } else if(operate.startsWith('showMatchDimMember')){
            showDimMembPanel(data,pageId,model);
        } else if(operate == 'addRuleRow'){
            addRuleRow(pageId,data.ruleRowId,model);
        } else if(operate == 'delRuleRow'){
            delRuleRow(pageId);
        } else if(operate == 'addDimForRuleRow'){
            addDimForRuleRow(data,pageId);
        } else if(operate == 'backRangeDimMemb'){
            backRangeDimMemb(data,pageId);
        } else if(operate == "getAllRuleRowInfo"){
            model.invoke('getAllRuleRowInfo', getAllRuleRowInfo(pageId));
        } else if(operate == "changeShowType"){
            changeShowType(data.showType,pageId);
        } else if(operate == "addRangeDimMemb"){
            removeMatchMemberInfo(pageId);
            addRangeDimMemb(data,pageId);
        } else if(operate == "clearAllRule"){
            clearAllRule(pageId,data,model);
        } else if(operate == "setRuleRowEnable"){
            setUseable(null,data.ruleRowId,true,pageId);
        } else if(operate == "updateAllRuleStatus"){
            updateAllRuleStatus(pageId,data);
        } else if(operate == "copyRuleRow"){
            copyRuleRow(pageId,data);
        }
        console.log("updateHtml end:"+operate);
    }

    // 注册自定义控件
    KDApi.register('bizruleeditbox', MyComponent,{isMulLang:true})
})(window.KDApi, jQuery)
