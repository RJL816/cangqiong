(function(KDApi,$,_){

    function MyComponent(model){
        this._setModel(model);
    }


    MyComponent.prototype = {
        _setModel: function(model) {
            this.model = model;
        },
        init:function(props){
          console.log('-----init',this.model,props)
          isUpdate = false;
          initHtml(this.model,props);
        },
        update:function(props){
          console.log('-----update',this.model,props)
          updateHtml(this.model,props);
        },
        destoryed:function(){
            console.log('-----destoryed',this.model)
        }
    }
	var updateHtml = function(model,props){
		var popsData = {};
		if (props != null && props.data != null) {
			popsData = props.data;
		}
		$('.fpy-loading').hide();
		$('#retry-imc').hide();
		$('#exit-imc').hide();
		$('#failed').hide();
		console.log('-----popsData',popsData);
		var eventkey=popsData.eventKey;
		console.log('-----eventkey',eventkey);
		if(eventkey == 'updatePrint') {
			console.log('-----eventkey',eventkey);
			$('.fpy-loading').show();
			$('#printseq-content').html(popsData['printseq']);
			$('#invoicecode-content').html(popsData['invoicecode']);
			$('#invoiceno-content').html(popsData['invoiceno']);
			$('#printtype-content').html(popsData['printtype']);

			if('failed' == popsData['status']){
				$('.fpy-loading').hide();
				$('#retry-imc').show();
				$('#exit-imc').show();
				$('#failed').show();
				$('#failed-content').html(popsData['failedcontent']);
			}
			foreachEvent(model,popsData);
		}
	};

	var initHtml = function(model,props){
		var popsData = {};
		if (props != null && props.data != null) {
			popsData = props.data;
		}
		KDApi.loadFile(['./css/fpy-loading.css', './css/paperinvoiceprint.css'], model,function(){
            KDApi.templateFilePath('./html/paperinvoiceprint.html', model,popsData).then(
                function(result){
                    if(model.dom.innerHTML === ""){
                        model.dom.innerHTML = result;
					}
					setEvent(model)
                }
            )
        })
	};
	function setEvent(model) {
		$('#close-btn').on('click', function() {
			console.log('click close!!!!')
			model.invoke('closePrint','close');
		});
		$('#exit-imc').on('click', function() {
			console.log('exit')
			model.invoke('exit','exit');
		});
		$('#retry-imc').on('click', function() {
			console.log('retry')
			model.invoke('retry','retry');
		})
	}
	var foreachEvent = function(model,popsData){
		console.log('-----timeflag',popsData.timeflag);
		if(popsData.timeflag > 0){
			setTimeout(function(){
				console.log('-----setTimeout','setTimeout');
				model.invoke('foreachData',popsData);
			}, 500);
		}else{
			model.invoke('closePrint','finish');
		}
	}
    KDApi.register('syncbatch', MyComponent);
})(window.KDApi,jQuery);
