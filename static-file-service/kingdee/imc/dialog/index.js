/**
 *  自定义控件书写模板
 */
(function(KDApi, $){
    // 构造函数，变量名随意，与最后一句代码的KDApi.register的第二个参数一致即可
    function Dialog (model) {
        this._setModel(model)
    }

	var loading = false;
	var interval;
	
    // 原型中封装生命周期函数，固定格式
    Dialog.prototype = {
        _setModel: function(model) {
            this.model = model
        },
        init: function(props){
            // TO DO
            initFunc(this.model, props)
        },
        update: function(props){
            // TO DO
			updateFunc(this.model, props)
        },
        destoryed: function(){
            // TO DO
			destoryedFunc()
        }
    }

    // Other Code
    var initFunc = function(model, props) {
		console.log('initFunc。。。', model, props)
    }

	// Other Code
    var updateFunc = function(model, props) {
		console.log('updateFunc。。。', props.data, model.pageId);
		if (props.data) {
			var popsData=props.data; 
			console.log('popsData', popsData);
			var show=popsData['show']; 
			if (show == "end") {
				hideLoading('#'+model.pageId);
				loading = false;
			} else {
				KDApi.loadFile(['./dialog.css'], model, function() {
				if (!loading) {
				   loading = true;
				   dialog('#'+model.pageId);
				}
				showLoading(model, popsData);
			});
			}
		}
    }
	
	// Other Code
    var destoryedFunc = function() {
		console.log('destoryedFunc。。。')
		if (loading) {
		    hideLoading();
			loading = false;
		}
    }
	
	function dialog(divname) {
		this.html = "<div class='loadModal'>" + 
			"<div class='dialog'>" + 
				"<div class='loading'>" +
					"<div class='round0'><a class='cirle col1'></a></div>" +
					"<div class='round1'><a class='cirle col2'></a></div>" +
					"<div class='round3'><a class='cirle col3'></a></div>" +
					"<div class='round2'><a class='cirle col4'></a></div>" +
				"</div>" + 
				"<div class='contentTxt'></div>" +
			"</div></div>";
		$(divname).append(this.html);
	}

	function showLoading(model, popsData){ 
		var divname='#'+model.pageId;
		var length=$(divname).find('.loadModal').length;
		if(length<1){
			dialog(divname);
		} 
		var contentHtml = '';
		var content=popsData['content']; 
		if (content) {
		   for (var j=0; j< content.length; j++) {
			contentHtml += '<p>'+ content[j] +'<p>';
		   }
		}
		$(divname).find('.dialog').find('.contentTxt').empty().append(contentHtml);
		this.index = 0;
		var self = this;
		this.animateObj = setInterval(function() {
			var current = $('.loading') .find('.round' + self.index) .find('.cirle');
			self.index +=1;
			scaleRound(current);
			if (self.index == 4) {
				self.index = 0;
			}
		}, 400);
		
		function scaleRound(name){
			name.animate({
			width: '20px',
			height: '20px',
			}, 300, function() {
				name.animate({
					width: '16px',
					height: '16px',
				}, 200);
			});
		}
		
		var millisec=popsData['millisec']; 
		var dialogId=popsData['dialogId']; 
		if(millisec && millisec>0){
			if(!interval){
				var times=popsData['times'];
				if(!times){
					times=1000;
				}
				interval = setInterval(function(){
					var length=$(divname).find('.loadModal').length;
					if(length<1||times<1){
						clearInterval(interval);  
						interval=null;
						hideLoading(divname);
					}else{ 
						times--;
						model.invoke('dialog', {"dialogId":dialogId});  
					}
				},millisec);
			}
		}
		
		
	} 

	function hideLoading(divname) {
		clearInterval(this.animateObj);
		$(divname).find('.loadModal').remove();
	}

    // 你只需知道第一个参数是你接下来要新增控件方案时填的方案id，第二个参数是上面声明的构造函数
    KDApi.register('dialog', Dialog)
})(window.KDApi, jQuery) // 这里的jQuery不是必须要传进去的，可移除，要用到的时候才传，PC端系统默认会有jQuery对象，版本是1.12.4