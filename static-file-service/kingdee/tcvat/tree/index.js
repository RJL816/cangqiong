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
			console.log('-----init', this.model, props)
			isUpdate = false;
			setHtml(this.model, props, isUpdate);
		},
		update: function (props) {
			console.log('-----update', this.model, props)
			isUpdate = true;
			setHtml(this.model, props, isUpdate);
		},
		destoryed: function () {
			console.log('-----destoryed', this.model)
		}

	}
	var setHtml = function (model, props, isUpdate) {
		var popsData = {};
		if (props != null && props.data != null) {
			popsData = props.data;
		}
		var pageid=popsData['pageid'];
		KDApi.loadFile("./jstree.min.js", model, function() {
			KDApi.loadFile("./themes/default/style.min.css", model, function() {
				KDApi.loadFile("./themes/default/tree.css", model, function() {
					KDApi.templateFilePath("./html/tree.html", model.schemaId, {
						pageid: pageid
					}).then(
						function(result) {
							model.dom.innerHTML = result;
							initTree(model, popsData, pageid);
						}
					);
				});
			});
		});
	}

	function resolveData(type, arr) {
		for (var i = 0; i < arr.length; i++) {
			if (type === arr[i].type) {
				arr[i]['state'] = {
					'opened': true,
					'selected': true
				}
				break;
			} else {
				//arr[i]['state'] = {
				//	'opened': true
				//}
				if (arr[i].children) {
					resolveData(type, arr[i].children)
				}
			}
		}
	}

	function expendAll(arr) {
		for (var i = 0; i < arr.length; i++) {
			arr[i]['state'] = {
				'opened': true
			}
			if (arr[i].children) {
				expendAll(arr[i].children)
			}

		}
	}

	var initTree = function (model, props, pageid) {
		var treeData = props['treeData'];
		var type = props['selected'];//data.node.original.type;			
		if (type) {
			resolveData(type, treeData);
			model.invoke('changeData', { "number": type });
		}else{
			if(treeData){
				expendAll(treeData);
			}			
		}

		var level = 2;
		$(
			function () {
				$('#' + pageid + 'jstree_demo_div').jstree(
					{
						'core': {
							'themes': {
								'icons': false,
								'dots': false
							},
							'data': treeData
						}
					}
				);
			}
		);

		$('#' + pageid + 'jstree_demo_div').on("changed.jstree", function (e, data) {
			//        
			var node = data.selected;
			var opened = $('#' + pageid + 'jstree_demo_div').jstree(true).is_open(node);
			if (opened) {
				$('#' + pageid + 'jstree_demo_div').jstree(true).close_node(node)
			} else {
				$('#' + pageid + 'jstree_demo_div').jstree(true).open_node(node)
			}

			//控制箭頭展示
			//$("#jstree_demo_div li[aria-level=" + level + "] .jstree-anchor").addClass("no-arrow");
			// var type = data.node.original.type;
			// model.invoke('changeData',{"number":type});
		});

		$('#' + pageid + 'jstree_demo_div').on("select_node.jstree", function (nodes, selected, event) {
			//调用服务端更新页面
			var type = selected.node.original.type;
			model.invoke('changeData', { "number": type });
			nodes.open_node();
		});

		$('#' + pageid + 'jstree_demo_div').on("ready.jstree", function (e, data) {
			//控制箭頭展示
			$("#jstree_demo_div li[aria-level=" + level + "] .jstree-anchor").addClass("no-arrow");
		});
	}

	KDApi.register('tree', MyComponent)
})(window.KDApi, jQuery);
