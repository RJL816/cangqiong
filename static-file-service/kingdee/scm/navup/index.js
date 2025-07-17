(function(KDApi,$,_){
    function MyComponent(model){
        this._setModel(model);
    }

    var isUpdate = false;
    MyComponent.prototype = {
        _setModel: function(model) {
            this.model = model;
        },
        init:function(props){
          console.log('-----init',this.model,props)
          isUpdate = false;
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
        var customCtrParam = props.data ? JSON.parse(props.data):[]
        KDApi.loadFile('./css/main.css', model,function(){
            KDApi.templateFilePath('./html/navup.html', model,{
                categoryItem : customCtrParam.categoryItem,
                isShowSecondInMain : customCtrParam.isShowSecondInMain,
                rootName : customCtrParam.rootName
            }).then(
                function(result){
                    if(model.dom.innerHTML === "" || isUpdate){
                        model.dom.innerHTML = result;
                    } 
					initEvent(model,props)
                }
            )
        })
    }
	
	function getThemeColor(props){
        switch(props.themeColor){
            case 'blue':
                return '#5582F3';
                break;
            case 'green':
                return '#29C392';
                break;
            case 'orange':
                return '#FC8555';
                break;
            case 'purple':
                return '#6869FB';
                break;
        }
    }
	
	//设置主题设色
	function setThemeColor(props,model){
		var themeColor = getThemeColor(props);
		$(".hc_lnav .allbtn h2 a",model.dom).css({
			"background-color":themeColor
		});
		$(".hc_lnav .allbtn h2 a:hover",model.dom).css({
			"background-color":themeColor
		});
		//$(".hc_lnav .allbtn ul li .pop",model.dom).css({
		//	"border-bottom":themeColor+"  2px solid",
		//	"border-right":themeColor+" 2px solid"
		//});
		//$(".hc_lnav .allbtn ul",model.dom).css({
		//	"border-bottom":themeColor+"  2px solid",
		//	"border-right":themeColor+" 2px solid"
		//})
		
	}
	
	var initEvent = function(model,props){
		$('.category',model.dom).click(function(event){
			console.log(event);
			console.log($('.category'));
			var target =  event.currentTarget;
			var longnumber = $(target).attr("longnumber");
			var label = $(target).attr("label");
			var number = $(target).attr("number");
			console.log('longnumber:'+longnumber);
			var clickdata = {
				"longnumber":longnumber,
				"label":label,
				"number":number
			};
            model.invoke('click',JSON.stringify(clickdata));
        })
		//setThemeColor(props,model);
    }
	
    console.log("-----------------init")
    KDApi.register('navup', MyComponent)
})(window.KDApi,jQuery,_);