(function(KDApi, $){
    function GPTInput (model) {
        this._setModel(model)
    }

    GPTInput.prototype = {
        _setModel: function(model) {
            this.model = model
        },
        init: function(props){
            console.log('initPropsData : ', props);
            initData(this.model, props);
        },
        update: function(props){
            console.log('updatePropsData : ', props);
            initData(this.model, props);
        },
        destoryed: function(){

        }
    }


    /**
     * 初始化数据
     */
    var initData = function(model, props) {
        var data = props.data.data.data;
        var themeNum = props.themeNum;
        var uniqueCode = props.data.uniqueCode;
        KDApi.loadFile(['./css/index.css'], model, function() {
            KDApi.getTemplateStringByFilePath('./html/home.html', model, {
                mainId: uniqueCode
            }).then(function(result) {
                model.dom.innerHTML = result
                setInputValue(model, data, uniqueCode, themeNum);
            })        
        })
    }

    var setInputValue = function(model, data, uniqueCode, themeNum) {
        var id = uniqueCode + "idsgptinput";
        var input = document.getElementById(id);
        input.value = data.value;
        input.disabled = data.enable ? false : true;
        if(data.focus) {
            input.focus();
        }
        input.onfocus = function() {
            input.style.border = '1px solid ' + themeNum;
        }
        input.onkeyup = function() {
            var dataObj = {"value": input.value};
            model.invoke('keyUp', dataObj);
        }
        input.onkeydown = function() {
            if (event.keyCode == 13){//回车
                var value = input.value;
                var dataObj = {"value": value};
                model.invoke('submitValue', dataObj);
                input.value = '';
                return false;
            }
        }
    }
    
    KDApi.register('gptinput', GPTInput)
})(window.KDApi, jQuery)