(function(KDApi, $) {
	function Edm(model) {
		this._setModel(model)
	}
	Edm.prototype = {
		_setModel: async function(model) {
			this.model = model
		},
		init: function(props) {
			initFunc(this.model, props)
		},
		update: function(props) {

		},
		
		destoryed: function() {
	
		},

	} 
	const initFunc = function(model, props, uploadId) {
			KDApi.loadFile('./css/index.css', model, function() {
				KDApi.getTemplateStringByFilePath('./edm.html', model, {
				   uploadfiletips: KDApi.getLangMsg(model, 'uploadfiletips'),
				}).then(function(result) {
					model.dom.innerHTML = result
				}).then(function() {
					initEdmDOM(model, props)
				})

			})
	}
	
	function initEdmDOM(model, props, uploadId) {
		// 点击事件，打开文件上传窗口
		$(model.dom).on("click", '.uploadfilesource', function() {
		    let uploadBtn = $(`div[data-page-id="${model.pageId}_fileupload"]`).find('.rc-upload')
			uploadBtn.trigger('click')
			
		})

	}
  
	KDApi.register('hrreportimportfile', Edm, {isMulLang: true})
})(window.KDApi, jQuery)

