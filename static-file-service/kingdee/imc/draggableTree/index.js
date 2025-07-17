
(function(KDApi,$,_){
    function MyComponent(model){
        this._setModel(model);
    }

    var isUpdate = false;
	var boxHeight = 0;
    var boxWidth = 0;
	var isLoadLibs = false;
    MyComponent.prototype = {
        _setModel: function(model) {
            this.model = model;
        },
        init:function(props){
		  console.log('-----init',this.model,props)
          setHtml(this.model,props,isUpdate);
        },
        update:function(props){
          console.log('-----update',this.model,props)
          isUpdate = true;
          setHtml(this.model,props,isUpdate);
        },
        destoryed:function(){
            console.log('-----destoryed',this.model)
        }
    }     	
	var setHtml = function(model,props,isUpdate){
        //错误提示信息
        var tips = '';
        //提示
        var explainList = {};
        //控制数据
        var isShowExplain = false;
        var isShowExplainText = true;
        var draggable = true;
        var isEdit = true ;
        var explainHeight = 100;
        //图片数
        var pageId;
		var flexKey;
        //树数据
        var treeData
        //树节点获取新树
        const getNewTreeData = (val, type) => {
            var json = {
                "treeData":val,
                "type":type
            }
            model.invoke('getNewTreeData', json);
        }
        //树节点获取选中的单选节点id
        const getSelectedId = (id) => {model.invoke('getSelectedId', id );};
        //树节点获取多选节点id
        const getCheckedId = (ids) => {model.invoke('getCheckedId', ids);}
        //树节点按钮点击事件
        const handleClick = (info) => {model.invoke('handleClick', info);}

        //获取后台推送数据
        if(props!=null&&props.data!=null){
			var popsData=props.data; 
            flexKey = popsData['flexKey'];
            pageId = popsData['pageId'];
            //树数据
            treeData = popsData['treeData'];
            tips = popsData['tips'];
            isShowExplain = popsData['isShowExplain'];
			isShowExplainText = popsData['isShowExplainText'];
            draggable = popsData['draggable'];
            isEdit = popsData['isEdit'];
            explainList = popsData['explainList'];
            explainHeight = popsData['explainHeight'];
            isDelete=popsData['isDelete'];
            nextShowId=popsData['nextShowId'];
		}

        //刷新自定义控件
        var updateControl = function(){
            var boxSelect = '';
			if(flexKey.indexOf('#') != -1) {
				boxSelect = flexKey.substr(1);
			} else {
				boxSelect = flexKey;
			}			
			
			var selectorStr = '[data-page-id="' + pageId + '_' + boxSelect + '"]';	
			var domEl = $(selectorStr)[0];
			if (domEl.clientWidth > 0 && domEl.clientHeight > 0) {
				boxHeight = domEl.clientHeight-1;
                boxWidth = domEl.clientWidth-1;
			}

            var allWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            const defaultPage = React.createElement('div', {
                style: { display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', height: boxHeight  },
                children: [
                    React.createElement('img', {
                        src: 'images/pc/emotion/fxjd_no_data.png',
                        width: 280,
                        height: 160
                    }),
                    React.createElement('div', {
                        children:'暂无扫描数据'
                    })
                ]
            })

            //创建树
            const tree = React.createElement(DraggableTree, {
                treeData: treeData,//树形结构化数据
                treeHeight: boxHeight,// 其他内容的高度
                tips:tips,
                otherWidth: allWidth-boxWidth,
                isShowExplain: isShowExplain,
				isShowExplainText: isShowExplainText,
                explainList: explainList,
                draggable: draggable,
                isEdit: isEdit,
                explainHeight: explainHeight,
                isDelete:isDelete,
                nextShowId:nextShowId,
                getNewTreeData: getNewTreeData,
                handleSelectId: getSelectedId,
                getCheckedId: getCheckedId,
                handleClick: handleClick,
            });

            ReactDOM.render(treeData.length ? tree : defaultPage, domEl);
        }

        if (!isLoadLibs) {
            KDApi.loadFile(['../common/pwyPolyfill.js', '../viewinvoice/fullScanImages.js', '../viewinvoice/DraggableTree.min.css'], model, function(){
                isLoadLibs = true;
                updateControl();
            });
        }else {
            updateControl();
        }
    }

	KDApi.register('draggableTree', MyComponent);
})(window.KDApi,jQuery);
