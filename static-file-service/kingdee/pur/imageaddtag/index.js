(function(KDApi, $){
    function imageaddtag(model) {
        this._setModel(model)
    }

    imageaddtag.prototype = {
        _setModel: function(model) {
            this.model = model;
        },
        init: function(props) {
		   initFunc(this.model, props);
		   
        },
        update: function(props) {
		   drawtag(this.model, props);
		   cleartag(this.model, props);
		   clearAll(this.model, props);	
		   showAlltag(this.model, props);
			edittag(this.model, props);		   
        },
        destoryed: function() {
            
        }
    }
	
	var initFunc = function(model, props) {
    // 通过路径去获取html字符串，第一个参数是模版文件路径，第二个参数是model，第三个参数是HTML模板中变量的值
		KDApi.getTemplateStringByFilePath('./html/imageaddtag.html', model, {
			}).then(function(result) {
				model.dom.innerHTML = result;
				initEvent(model, props)
		})
	}
	

	
	var initEvent = function (model, props) {
		var tagcontainer = model.dom.getElementsByClassName('tagcontainer')[0];
		tagcontainer.setAttribute("page-data-id",model.pageId+'_tagcontainer');
		const debouncedImageClick = debounce((event) => {
		imageClick(event, model, props);
		}, 800);
		tagcontainer.addEventListener('click', debouncedImageClick); 		
		//初始化时加载原有的标签数据
		showAlltag(model, props);
	}
	
	var imageClick = function(e,model, props){
		if (e.target.id !== 'tagcontainer') return;
		//const tagcontainer = model.dom.getElementsByClassName('tagcontainer')[0];
		//var pagedataid = this.model.pageId+'_tagcontainer';
		//var selector ='[page-data-id="' + pagedataid + '"]';  
		//var tagcontainer = document.querySelector(selector);
		var tagcontainer = e.srcElement;
		const containerRect = tagcontainer.getBoundingClientRect();
		const x = e.clientX - containerRect.left;
		const y = e.clientY - containerRect.top;
		var params = {
			'left':x,
			'top':y
		};
		model.invoke('addtag', params);
	}


	function debounce(func, wait) {
		let timeout;
		return function(...args) {
			clearTimeout(timeout);
			timeout = setTimeout(() => func.apply(this, args), wait);
		};
	}
	
	
	var edittag = function(model, props) {
		if(!props.data.iseditdrawtag){
			return;
		}
		var tagid = props.data.tagid;
		const targetTag = document.getElementById(tagid);
		if (targetTag) {
			targetTag.setAttribute('data-tooltip', props.data.tagname);
		}
	}
	
	var clearAll = function(model, props){
		if(!props.data.isclearall){
			return;
		}
		var pagedataid = model.pageId+'_tagcontainer';
		var selector ='[page-data-id="' + pagedataid + '"]'; 
		var tagcontainer = document.querySelector(selector);
		const tagsToRemove = tagcontainer.querySelectorAll('.tag');
		tagsToRemove.forEach(function(tag){
			var tagcontainer = model.dom.getElementsByClassName('tagcontainer')[0];
			 tagcontainer.removeChild(tag);
		});
	}
	
	var showAlltag = function(model, props) {
		if(!props.data || !props.data.isshowtag){
			return;
		}
		if(props.data.isshowtag){
			//var tagcontainer = model.dom.getElementsByClassName('tagcontainer')[0];
			var pagedataid = model.pageId+'_tagcontainer';
		var selector ='[page-data-id="' + pagedataid + '"]'; 
		var tagcontainer = document.querySelector(selector);
			//先清除掉全部标签，再添加
			const tagsToRemove = tagcontainer.querySelectorAll('.tag');
			tagsToRemove.forEach(function(tag) {
				 tagcontainer.removeChild(tag);
			});
		}
		if(!props.data.tagdata){
			return;
		}
		var taglist = props.data.tagdata;
		taglist.forEach(tagdata => {
			const tag = document.createElement('div');
			var themeColor = getThemeColor(props.themeColor);
			tag.classList.add('tag');
			tag.id = tagdata.tagid;
			tag.setAttribute('data-tooltip', tagdata.tagname);
			tag.style.left = tagdata.left + 'px';
			tag.style.top = tagdata.top + 'px';
			tag.style.position = 'relative';
			tag.style.backgroundColor = themeColor;
			//tag.addEventListener('click', debounce(tagclick, 800)); 
			const debouncedTagClick = debounce((event) => {
				tagclick(event, model);
			}, 800);
			tag.addEventListener('click', debouncedTagClick); 	
			 tagcontainer.appendChild(tag);
		});
	}
	var cleartag = function(model, props) {
		if(!props.data.isclear){
			return;
		}
		var taglist = props.data.tagids;
		//var tagcontainer = document.querySelector('[page-data-id="${pagedataid}"]');
		var pagedataid = model.pageId+'_tagcontainer';
		var selector ='[page-data-id="' + pagedataid + '"]'; 
		var tagcontainer = document.querySelector(selector);
		taglist.forEach(tagdata => {
			const targetTag = document.getElementById(tagdata);
			if (targetTag) {
				//var tagcontainer = model.dom.getElementsByClassName('tagcontainer')[0];
				 tagcontainer.removeChild(targetTag);
			}
		})
		
		
	}
	
	var drawtag = function(model, props) {
		if(!props.data.left || !props.data.isdrawtag){
			return;
		}		
        addtagbutton(props,model);
		
	}
	
	var addtagbutton = function(props,model){
	    const tag = document.createElement('div');
		var themeColor = getThemeColor(props.themeColor);
		tag.id = props.data.tagid;
		tag.classList.add('tag');
		tag.setAttribute('data-tooltip', props.data.tagname);
		tag.style.left = props.data.left + 'px';
		tag.style.top = props.data.top + 'px';
		tag.style.position = 'relative'; 
		tag.style.backgroundColor = themeColor;
		const debouncedTagClick = debounce((event) => {
			tagclick(event, model);
		}, 800);
		tag.addEventListener('click', debouncedTagClick); 		
		var pagedataid = model.pageId+'_tagcontainer';
		var selector ='[page-data-id="' + pagedataid + '"]'; 
		var tagcontainer = document.querySelector(selector);
		 tagcontainer.appendChild(tag);
	}
	
	var tagclick = function(e,model){
		var params = {
			'tagid':e.target.id,
		};
		model.invoke('tagclick', params);
	}

		
	// 获取主题色
   var getThemeColor = function(themeColor) {
    switch (themeColor) {
      case 'blue':
        return '#5582F3'
      case 'green':
        return '#29C392'
      case 'orange':
        return '#FC8555'
      case 'purple':
        return '#6869FB'
      default:
        return '#5582F3'
    }
  }

    // KDApi注册一个id号，这个id号要和控件方案的id号对应
    KDApi.register('imageaddtag', imageaddtag)
})(window.KDApi,jQuery)