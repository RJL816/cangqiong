(function(KDApi,$){
    function MyComponent(model){
        this._setModel(model);
    }
    MyComponent.prototype = {
        _setModel: function(model) {
            this.model = model;
        },
        init:function(props){
            //console.log('-----init',this.model,props);
			setHtml(this.model, props);
        },
        update:function(props){
            //console.log('-----update',this.model,props)
			updateHtml(this.model, props);
        },
        destoryed:function(){
            //console.log('-----destoryed',this.model)
        }
    }

	var setHtml = function(model, props) {
		KDApi.loadFile('./css/barcode.css', model, () => {
			var tmplHtml = '<div style="height: 90%"><input class="barcode-btm" type="text"></input>' 
							+ '</div><div class="kd-field-no-tip"></div>';
			model.dom.innerHTML = tmplHtml;
			var _enterClear = false;
			var _enterNext  = false;
			var configItems = props.configItems;
			if (configItems) {
				for (var i = 0; i < configItems.length; i++) {
					var configItem = configItems[i];
					if (configItem.key == 'enterClear') {
						if (configItem.value == 'true') {
							_enterClear = true;
						}
					} else if (configItem.key == 'enterNext') {
						if (configItem.value == 'true') {
							_enterNext = true;
						}
					}
				}
			}
			
			initEvent(model, props, _enterClear, _enterNext);
		})
	}
  
	// listen to return key pressing, send data to service side
	var initEvent = function(model, props, enterClear, enterNext) {
		$(model.dom).find('input').keydown(function(e) {
			if (e.keyCode === 13) { // enter key
				var value = $(this).val();
				//console.log('-- enter key ---, val:', value);
			    if (value && value.trim().length > 0) {
				    model.invoke('barcode', value);
				    if (enterClear) {
				        $(this).val('');
				    }
				}
				if (enterNext) {
				    // move focus to next input
					const inputs = Array.from(document.querySelectorAll('input[type="text"]'));
					const index = inputs.indexOf(e.target);
					if (index < inputs.length) {
					    inputs[index + 1].focus();
					}
				}
			}
		});
	}
	
	var updateHtml = function(model, props) {
		if (props.data) {
			//console.log('-----update, set: ' + props.data);
			// data is setted by java, if it's a map, map's key is converted to props.data's property
			// java code setted map has three keys, method / ts / data (data entry can be omitted)
			var data = props.data;
			if (data.method === 'setvalue') {
				$(model.dom).find('input').val(data.data);
			} else if (data.method === 'setfocus') {
			    $(model.dom).find('input').focus();
			}
		}
	}
	
    KDApi.register('barcodeinput', MyComponent)
})(window.KDApi,jQuery);
