define([
	"jquery",
	"jqTmpl",
	"js/layer.js",
	"js/formatTable.js",
	"text!../pages/editOps.htm",
	], function($,jqTmpl,layer,formatTable,editOps) {
	return {
	    initEvents: function() { //registry event
            $(".property-panel").on('click', 'ul [type="operations"]', function() { //绑定右侧输入框的change事件
				var _self = this;
			    var content = $('<div id="ops_content"></div>');
			    var settings = {
					"type":"white",
					"title":"选择操作",
					"bg":"#ffffff",
					"create":true,
					"delete":true,
					"edit":true,
					"edit-inline":true
			    }
				var data = {
				    head:[{"cb":""},{"name":"操作编码"},{"value":"操作名称"},{"index":"操作类型"}],
					body:[]
				}
			    var table = formatTable.initTemplate(data,'ops_content',false,settings, true);
			    formatTable.init(data,'ops_content');
			    content.append(table);
				var index = layer.open({
				    skin:"jfsEditor-d selectBoxDialog opsDialog",
				    type:1,
				    title:false,
				    content:content[0].outerHTML,
				    area:['600px','500px'],
				    btn:['取消','重置','确定'],
				    success:function(){
					    formatTable.initEvents('ops_content',settings);
				    },
				    yes:function(index, layero){
				        layer.close(index);
				    }
			    });
			});
			$("body").on('click', '.opsDialog [type="edit"].tools,.opsDialog [type="create"].tools', function(e) {
				var content = $(editOps).tmpl({});
				var index = layer.open({
				    skin:"jfsEditor-d createDialog editOpsDialog",
				    type:1,
				    title:"操作编辑",
				    content:content[0].outerHTML,
				    area:['710px','630px'],
				    btn:['取消','确定'],
				    yes:function(index, layero){
				        layer.close(index);
				    }
			    });
				e.preventDefault();
			});
			$("body").on('click', '.editOpsDialog .cus-tab [tab]', function(e) {
			   $(this).closest('.cus-tab-wrapper').find('[tab]').toggleClass('active');
			   $(this).closest('.cus-tab-wrapper').find('[link-tab]').toggleClass('hide');
			});
		}
	}
});