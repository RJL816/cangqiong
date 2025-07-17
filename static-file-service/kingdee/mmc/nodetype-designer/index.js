(function (KDApi, $, _) {
	function MyComponent(model) {
		this._setModel(model);
	}

	MyComponent.prototype = {
		/**
		 * 请求_初始化
		 */
		CONST_REQUEST_INITIAL: "initial",
		/**
		 * 请求_加载画布内容
		 */
		CONST_REQUEST_LOAD: "load",
		/**
		 * 请求_测试
		 */
		CONST_REQUEST_TEST: "test",
		/**
		 * 请求_设置是否可编辑
		 */
		CONST_REQUEST_SETEDITABLE: "set-editable",
		/**
		 * 反馈_清除控件数据
		 */
		CONST_RESPONSE_CLEARCONTROLDATA: "clear-control-data",
		_setModel: function (model) {
			this.model = model;
		},
		init: function (props) {
			console.log("----初始设计器----", this.model, props);

			if (!this.isObject(props)) return;

			var initialData = props.data;

			props.data = "";

			var initialProps = new Object();

			var params = new Object();

			params["action"] = this.CONST_REQUEST_INITIAL;
			params["data"] = initialData;

			initialProps.data = params;

			this.invokeDesigner(this.model, initialProps);
		},
		update: function (props) {
			console.log("----更新设计器----", this.model, props);

			var params = this.isObject(props) ? props.data : null;

			var action = this.isObject(params) ? params["action"] : null;

			if (!this.isEmptyString(action)) {
				if (action != this.CONST_REQUEST_INITIAL) {
					this.invokeDesigner(this.model, props);

					this.model.invoke(this.CONST_RESPONSE_CLEARCONTROLDATA, this.model.schemaId);
				}
			}
		},
		destoryed: function () {
			console.log("----关闭设计器----", this.model);

			if (this.isEmpty(this.model.ntd)) return;

			//关闭
			this.model.ntd.destory(designerID);
		},
		/**
		 * @description 获取设计器ID
		 * @param string srcID 来源ID
		 * @return string 设计器ID
		 */
		getDesignerID: function (srcID) {
			if (this.isEmptyString(srcID)) return "";

			var beginIndex = srcID.indexOf("phm_nodetype");

			if (beginIndex < 0) {
				return srcID;
			} else {
				return srcID.substr(beginIndex);
			}
		},
		/**
		 * @description 检查变量是否为空
		 * @param obj 变量
		 * @return boolean 布尔值
		 */
		isEmpty: function (obj) {
			if (obj == null || obj == undefined) return true;

			return false;
		},
		/**
		 * @description 检查变量是否为空字符串
		 * @param obj 变量
		 * @return boolean 布尔值
		 */
		isEmptyString: function (obj) {
			if (this.isEmpty(obj) || typeof (obj) != "string") return true;

			if (obj.trim().length == 0) return true;

			return false;
		},
		/**
		 * @description 检查变量是否为Object
		 * @param obj 变量
		 * @return boolean 布尔值
		 */
		isObject: function (obj) {
			if (this.isEmpty(obj) || typeof (obj) != "object") return false;

			return true;
		},
		/**
		 * @description 检查数组是否为空
		 * @param arr 数组
		 * @return boolean 布尔值
		 */
		isEmptyArray: function (obj) {
			if (!this.isObject(obj)) return true;

			if (obj.length == 0) return true;

			return false;
		},
		/**
		 * @description 调用设计器
		 * @param model 模型
		 * @param props 属性
		 */
		invokeDesigner: function (model, props) {
			if (this.isEmpty(props) || this.isEmpty(model)) return;

			var params = props.data;

			if (!this.isObject(params)) return;

			var action = params["action"];

			var data = params["data"];

			if (this.isEmptyString(action)) return;

			if (action == this.CONST_REQUEST_INITIAL) {

				if (this.isObject(data)) {
					if (!this.isEmpty(data)) {
						model.initialData = data;
					}
				}

				//初始化
				//加载CSS
				KDApi.loadFile(["./nodetype-designer.css", "./src/bootstrap.min.css", "./src/font-awesome.min.css", "./src/drawerJs.css"], model, () => {
					//加载JS
					KDApi.loadFile(["./nodetype-designer.js", "./src/jquery-3.4.1.min.js", "./src/jquery-migrate-1.2.1.min.js", "./src/drawerJs.standalone.js"], model, () => {
						$(model.dom).css("overflow", "visible");

						var pageID = model.pageId;

						if (this.isEmptyString(pageID)) return;

						var designerID = this.getDesignerID(pageID);

						if (this.isEmpty(this.model.ntd)) {
							this.model.ntd = new NodeTypeDesigner(designerID, "kingdee/mmc/nodetype-designer/src");
						}

						//初始化
						this.model.ntd.initial(model);

						//等初始化完成后再执行其他操作
						var initialData = model.initialData;

						var requestArray = this.isObject(initialData) ? initialData.data : null;

						if (!this.isEmptyArray(requestArray)) {
							var requestArrayLength = requestArray.length;

							for (var index = 0; index < requestArrayLength; index++) {
								request = requestArray[index];

								var initialProps = new Object();

								initialProps.data = request;

								this.invokeDesigner(model, initialProps);
							}

							model.invoke(this.CONST_RESPONSE_CLEARCONTROLDATA, model.schemaId);
						}
					});
				});
			} else {
				if (this.isEmpty(this.model.ntd)) {
					return;
				}

				if (action == this.CONST_REQUEST_LOAD) {
					//加载
					this.model.ntd.load(data);
				} else if (action == this.CONST_REQUEST_SETEDITABLE) {
					//设置是否可编辑
					this.model.ntd.setEditable(data);
				} else if (action == this.CONST_REQUEST_TEST) {
					//测试
					this.model.ntd.test();
				}
			}
		}
	}

	console.log("----注册设计器----");

	KDApi.register("nodetype-designer", MyComponent);
})(window.KDApi, jQuery, _);