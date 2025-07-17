(function (KDApi, $, _) {
    function MyComponent(model) {
        this._setModel(model);
    }

    var isUpdate = false;
    MyComponent.prototype = {
        _setModel: function (model) {
            this.model = model;
        },
        init: function (props) {
            isUpdate = false;
            setHtml(this.model, props, isUpdate);
        },
        update: function (props) {
            isUpdate = true;
            setHtml(this.model, props, isUpdate);
        },
        destoryed: function () {

        }
    }
    var setHtml = function (model, props, isUpdate) {
        KDApi.loadFile('./css/identity.css', model, function() {
            updateHtml(model, props, isUpdate);
        })
    }
    
    var updateHtml = function(model, props, isUpdate){
        var defaultPath = KDApi.getNameSpace(model) + './img/test.png';
        var template = '<div class="hr-avatar">' +
                            '<img class="hr-head" src="<%= avatarPath %>" onerror="onerror=null;src=\'' + defaultPath +'\'"/>' +
                            '<img title="<%= identity %>" class="head-delete" src="<%= identityPath %>" />' +
                        '</div>'
        var avatarPath = getUrl(model, getValue(model, props, 'path'));
        var identityPath = getUrl(model, getValue(model, props, 'identityPath'));
        var identity = getValue(model, props, 'identity');
        var result = KDApi.getHTMLStringBytemplate(template, {
            avatarPath: avatarPath ? avatarPath : defaultPath,
            identityPath: identityPath ? identityPath : defaultPath,
            identity: JSON.parse(identity)['zh_CN'] || ''
        });
        if(model.dom.innerHTML === '' || isUpdate){
            model.dom.innerHTML = result;
        }
        initEvent(model, props);
    }

    var initEvent = function (model, props) {
        $(model.dom).css("overflow", "visible").attr("data-page-id",model.pageId + '_' + model.key);
        $('.hr-head', model.dom).css({
            "width": model.dom.style.width,
            "height": model.dom.style.height,
        }).click(function () {
            model.invoke('click', model.key);
        })
        $('.head-delete', model.dom).css({
            "top": '0px',
            "left": model.dom.style.width ? parseInt(model.dom.style.width) - 12 + 'px' : '38px',
        })
    }
    var getValByKey = function (array, key) {
        var array = array.filter(function(items){
            return items['key'] === key
        })
        return array[0] && array[0].value
    }

    //给模板传入的参数的获取方法
    var getValue = function(model, props, key){
        var data = props.data;
        var configItems = props.configItems;
        return data && getValByKey(data, key) ? getValByKey(data, key) : configItems && getValByKey(configItems, key)
    }

    var getUrl = function (model, path) {
        /*if(!/^http(s)?/.test(path)){
            var fileserver = window.store.getState().getIn(['forms',model.pageId,'config','fileserver']);
            return fileserver + path;
        }*/
		var fileserver = window.store.getState().getIn(['forms',model.pageId,'config','fileserver']);
		return getImgFullPath(fileserver, path);
        //return path;
    }
	var getImgFullPath = function(fileServer='', imgPath='', addVersion=true){
		if (/^data:?/.test(imgPath)) {
			return imgPath;	//base64格式
		}
		if (!/^http(s)?/.test(imgPath)) {
			imgPath = fileServer + imgPath; //非http或https打头

			//如果fileServer是相对路径,则需要前端自动带上域名,否则相对路径在移动端无法(通过yunzhijia)预览
			if(!/^http(s)?/.test(imgPath)){
				let originStr = window.location.origin || (window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: ''));
				imgPath = originStr + '/' + imgPath;
			}
		}

		if(addVersion){
			let version = getImgVersion();
			if(version===undefined || version===null || version===''){
				return imgPath;
			}else{
				if (/\?/g.test(imgPath)) {
					return `${imgPath}&v=${version}`;
				} else {
					return `${imgPath}?v=${version}`;
				}
				// return `${imgPath}?v=${version}`;
			}
		}


		return imgPath;
	}
	
	let IMG_VERSION = undefined; //图片版本号
	/*
	 * 获取图片版本号(获取一次后缓存,由服务端发送过来)
	 */
	var getImgVersion = function(){
		if(IMG_VERSION===undefined){
			let state = store.getState();
			IMG_VERSION = state.getIn(['forms',state.get('rootPageId'),'config','imgversion']); //图片版本路径(全局一致)
			if(IMG_VERSION===undefined){
				IMG_VERSION=''; //取过一次,如果不存在,就设为空
			}
			//test data
			// IMG_VERSION = '1.11';
		}
		return IMG_VERSION;
	}
    KDApi.register('identityavatar', MyComponent)
})(window.KDApi, jQuery, _);