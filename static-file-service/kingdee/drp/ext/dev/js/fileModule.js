define(["jquery"], function($) {
	return {
		FileTab: function(index, name,flag,appId) {
			if(name) {
				var node = $('<li class="tab active" appId="'+appId+'" fileFlag="'+flag+'" item=' + (index - 1) + '><span class="name">' + name + '</span><span class="close"><i class="iconfont icon-delect"></i></span></li>');
				if(flag === "expand"){
					node.find('span.name').after('<span>[扩展]</span>');
				}
				return node;
			} else {
				var node = $('<li class="tab active" appId="'+appId+'" fileFlag="'+flag+'" item=' + (index - 1) + '><span class="name">新建文件' + index + '</span><span class="close"><i class="iconfont icon-delect"></i></span></li>');
				if(flag === "expand"){
					node.find('span.name').after('<span>[扩展]</span>');
				}
				return node;
			}
		},
		FileContent: function(index,platform,flag) {
			platform = platform === "mobile"? platform : "pc";
			return $('<div class="show" fileFlag="'+flag+'" data-item=' + (index - 1) + '><div id="view" viewid="view" class="view actual-view" platform="'+platform+'"><div platform="'+platform+'" xml="pageview" id="pageview_new" viewid="PAGEVIEW_0"><div id="view_new"  viewid="VIEW_1" xml="view" data="{\'id\':\'view_default\',\'viewid\':\'VIEW_1\',\'xml\':\'view\'}"></div></div></div><div spellcheck="false" contenteditable="true" id="xml" class="xml hide"><pageview id="pageview_new"><view id="view_new"></view></pageview></div><div class="button-group"><span class="switch view-btn active">可视化</span><span class="switch xml-btn">XML</span><div class="condition-switch">显示隐藏组件<div class="cus-switch1"><span></span></div></div></div></div>');
		}
	}
});