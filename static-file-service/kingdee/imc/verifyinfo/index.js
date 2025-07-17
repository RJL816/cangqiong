(function(KDApi, $){
    function HelloWorld (model) {
        this._setModel(model)
    }

    HelloWorld.prototype = {
        _setModel: function(model) {
            this.model = model
        },
        init: function(props){
            // TO DO
            console.log(`init  ${props.isEditor? 'edit': 'render'}  cell!`)
            initFunc.call(this, this.model, props)
        },
        update: function(props){
            // TO DO
            console.log(`update ${props.isEditor? 'edit': 'render'} cell!`)
            updateFunc.call(this, this.model, props)
        },
        destoryed: function(){
            // TO DO
            console.log(`destory cell!`)
            this.onFocusLoseHandle && document.removeEventListener('mouseover',this.onFocusLoseHandle ,true)
            this.destroyedRemoveEvent && this.destroyedRemoveEvent()
        },
        handleDirective:function(customProps, methodName ,result){ // �ռ����༭̬�Զ���ؼ���ָ��༭̬ʹ�á�
            console.log('handleDirective', customProps, methodName, result)
        },
        compareValue: function(value,oldValue){// �÷��������жϱ༭̬�Ƿ���±��ֵ��ֵһ������Ը��¡��༭̬ʹ�á�
            return value === oldValue
        }
    }


    // util

    /**
     * ��ȡ�Զ���ؼ�Ψһ��ʶ��ͨ������id����class��ǰ׺
     * @param {*} model
     */
    var getCustomControlUniquePrefix = function(model) {
        const { schemaId, isvId } = model
        return `${isvId}-${schemaId}-`
    }

    /**
     * ��ȡ��Ԫ��Ψһ��ʶ��ͨ������id����class�ĺ�׺
>>>>>>> a439a42ed739c35d4ad5338d00a68a57d0bb0f2a
     * @param {*} model
     */
    var getUniqueSuffix = function(props){
		if(props!=null&&props.data!=null){
		    const { column, gridRowData } = props
			const { colId } = column
			const { rowKey } = gridRowData
			return '-' + rowKey + '-' + colId
		}
		return '-'
    }


    /**
     * ��ʼ����Ԫ��
     * @param {*} model
     * @param {*} props
     */
    var initFunc = function(model, props) {
        let that = this
        // KDApi.loadFile����ͨ��·������js��css�ļ���������html�ļ�ͷ����script����link��ǩ����һ��������·�����ڶ���������model�������������Ǽ�����ɺ�ִ�еĻص�����
        // 'https://localhost:8443/ierp/dev/helloworld/css/index.css'
        KDApi.loadFile('./css/index.css', model, function() {
            if(props.isEditor){
                initEidtCell(model, props, that)
            }else{
                initRnederCell(model, props, that)
            }
        })
    }

    /**
     * �༭̬��Ԫ���ʼ��
     * @param {*} model
     * @param {*} props
     * @param {*} context �����Ŀɸ���������Ҫ�����ߵ���ʱ��
     */
    var initRnederCell = (model, props, context) => {
        /**
         * ��Ԫ��༭̬�е������ʱ���жϵ���Ƿ��ڵ�Ԫ���⣬�Ӷ�ȡ���༭������ֵ��
         * @param {*} model
         * @param {*} props
         */
        var getFocusLoseHandle = function(model, props){
            return (e) => {
                if(!model.dom.parentNode){
                    //dom not ready
                    return
                }
                let isClickOutSide = true
                const activeDom = document.activeElement
                if(model.dom.parentNode.contains(e.target)){
                    isClickOutSide = false
                }

                if(isClickOutSide){
                    const idUniqueSuffix = getUniqueSuffix(props)
                    const input = model.dom.querySelector('#dataInput' + idUniqueSuffix)
                    //props.gridApi.fireCellValueChange(input.value) // ������ֵ
                    //props.gridApi.stopEditing() //ֹͣ�༭��fireCellValueChange���µ�ֵ���͵����
                    //document.activeElement = activeDom
                }
				if('严格管控'==(e.target.title) || '中度警示'==(e.target.title) || '轻度提醒'==(e.target.title)) {
					//model.invoke('show_verify_html', 'HelloWorld');  
					//model.dom.innerHTML = '<h1>init: Hello World!</h1>'
					var rowIndex = $('.ag-row-hover').attr('row-index');
					model.invoke('show_verify_html', rowIndex);  
				} else {
					//model.invoke('hide_verify_html', 'GameOver');  
					//model.dom.innerHTML = ''
					var a=document.getElementsByClassName("_1QFlAc6R");
					$("._1QFlAc6R").remove();
				}
            }
        }
        context.onFocusLoseHandle = getFocusLoseHandle(model, props, context)
        // �����Ԫ���ⲿȡ���༭ ������ֵ
        document.addEventListener('mouseover', context.onFocusLoseHandle ,true)
		
		//$(document).on('mouseover', '.grid-hyper-link', function() {
			//var rowIndex = $('.ag-row-hover').index();
			//model.invoke('show_verify_html', rowIndex);  								
		//});
		//$(document).on('mouseleave', '.grid-hyper-link', function() {
			//model.invoke('hide_verify_html', 'HelloWorld');
			//var a=document.getElementsByClassName("_1QFlAc6R");
			//$("._1QFlAc6R").remove();
		//});
       
    }

    /**
     * ��Ⱦ̬��Ԫ���ʼ��
     * @param {*} model
     * @param {*} props
     * @param {*} context �����Ŀɸ���������Ҫ�����ߵ���ʱ��
     */
    var initEidtCell = (model, props, context) => {
        //todo
    }


    /**
     * ���Ƶ�Ԫ��
     * @param {*} model
     * @param {*} props
     */
    var updateFunc = function(model, props) {
        var updateText = props.data && props.data.gridRowData && props.data.gridRowData.validateMessage_html || ''
		//model.dom.innerHTML = updateText
    }


    var drawRnederCell = function (model, props, context){
        const { themeNum, data, lock } = props
        model.dom.innerHTML = `<div class="${getCustomControlUniquePrefix(model)}my-custom-cell ${getCustomControlUniquePrefix(model)}my-custom-render-cell">
            <span class="text" style="color:${lock ? '#eeeeee' :themeNum}">${data}</span>
        </div>`

        // ����Ⱦ̬�¼�
        bindRenderEvent(model, props, context)
    }

    var drawEidtCell = function (model, props, context){
        const { data } = props
        const idUniqueSuffix = getUniqueSuffix(props)
        const editorDomPosition = model.dom.getBoundingClientRect()

        model.dom.innerHTML = `<div class="${getCustomControlUniquePrefix(model)}my-custom-cell ${getCustomControlUniquePrefix(model)}my-custom-edit-cell">
            <input id="dataInput${idUniqueSuffix}" value="${data}" style="flex-grow: 1;">              
        </div>`


        // �󶨱༭̬�¼�
        bindEditEvent(model, props, context)
    }


    var bindRenderEvent = function(model, props, context){
        removeRenderEvent(model, props, context) //�����ڼ���ʱȡ���ϴεļ����¼�
        //todo...
    }

    var removeRenderEvent = function(model, props, context){
        //todo...
    }

    var bindEditEvent = function(model, props, context){

        const idUniqueSuffix = getUniqueSuffix(props)
        const selector = `.${getCustomControlUniquePrefix(model)}my-custom-cell #dataInput${idUniqueSuffix}`
        // ����༭̬�����ý���
        $(selector, model.dom).focus()
        context.destroyedRemoveEvent = () => {
            removeEditEvent(model, props, context)
        }
    }


    var removeEditEvent = function(model, props){
        const idUniqueSuffix = getUniqueSuffix(props)
        const selector = `.${getCustomControlUniquePrefix(model)}my-custom-cell #dataInput${idUniqueSuffix}`
        $(selector, model.dom).off('input')
    }

    KDApi.register('verifyinfo', HelloWorld)
})(window.KDApi, jQuery)