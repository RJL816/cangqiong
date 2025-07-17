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
	var left_bracket = [{
		key: '(',
		value: '('
	}, {
		key: '((',
		value: '(('
	}, {
		key: '(((',
		value: '(((',
	}];
	var right_bracket = [{
		key: ')',
		value: ')'
	}, {
		key: '))',
		value: '))'
	}, {
		key: ')))',
		value: ')))',
	}];


	var setHtml = function (model, props, isUpdate) {
		var popsData = {};
		if (props != null && props.data != null) {
			popsData = props.data;
		}
		if (isUpdate && popsData.updateElement) {
			updateElement(popsData.updateElement);
		} else if (isUpdate && popsData.submitData) {
			getHtmlDatas(model);
		} else if (popsData.data) {
			KDApi.loadFile("./css/filter.css", model, () => {
				KDApi.templateFilePath("./html/filter.html", model).then(
					result => {
						model.dom.innerHTML = result;
						init(model, popsData.data);
					}
				);
			});
		}
	}


	/**
	 * 初始化
	 * @param {初始化数据集合} dataList 
	 */
	function init(model, dataList) {
		insert(model, dataList);

		/**
		 * 添加条件按钮监听
		 */
		$(".addBtn").click(function (event) {
			var dataList = [{
				bracketLeft: '',
				element: {
					id: '',
					value: ''
				},
				condition: '=',
				contrasType: '1',
				contrastValue: {
					element: {
						id: '',
						value: ''
					},
					input: ''
				},
				bracketRight: '',
				operator: '&',
			}];
			insert(model, dataList)
		});


	}

	function updateElement(data) {
		var row = $("#dataList .row").get(data.row);
		$(row).find("[key=" + data.col + "]").find(".arrow").attr("value", data.id);
		$(row).find("[key=" + data.col + "]").find(".arrow").attr("title", data.value);
		$(row).find("[key=" + data.col + "]").find(".arrow").text(data.value);
	}

	/**
	 * 下拉列表创建
	 * @param {下拉数据集合} dateList 
	 * @param {选中值} selected 
	 */
	function createOption(dateList, selected) {

		var str = "<option value='' class='hidden'></option>";
		for (var i = 0; i < dateList.length; i++) {
			if (selected === dateList[i].key) {
				str += "<option value='" + selected + "' selected>" + dateList[i].value + "</option>";
			} else {
				str += "<option value='" + dateList[i].key + "'>" + dateList[i].value + "</option>";
			}
		}

		return str;
	}


	/**
	 * 插入数据
	 * @param {插入数据集合} data
	 */
	function insert(model, data) {
		var operator = [{
			key: '&',
			value: KDApi.getLangMsg(model,"and")
		}, {
			key: '|',
			value: KDApi.getLangMsg(model,"or")
		}];
		var condition = [{
			key: '=',
			value: KDApi.getLangMsg(model,"equals")
		}, {
			key: '!=',
			value: KDApi.getLangMsg(model,"notequals")
		}, {
			key: '>',
			value: KDApi.getLangMsg(model,"largethan")
		}, {
			key: '<',
			value: KDApi.getLangMsg(model,"lessthan")
		}, {
			key: '>=',
			value: KDApi.getLangMsg(model,"largeequals")
		}, {
			key: '<=',
			value: KDApi.getLangMsg(model,"lessequals")
		}];
		var contrasType = [{
			key: '1',
			value: KDApi.getLangMsg(model, "element")
		}, {
			key: '2',
			value: KDApi.getLangMsg(model, "fixedvalue")
		}];
		if (data.length === 0) {
			return;
		}
		for (var i = 0; i < data.length; i++) {
			var tr =
				"<tr class='row'>" +
				"<td key='td0'>" +
				"<select>" +
				createOption(left_bracket, data[i].bracketLeft) +
				"</select>" +
				"</td>" +
				"<td key='td1'>" +
				"<div class=\"arrow\" title='" + data[i].element.value + "' value='" + data[i].element.id + "'>" + data[i].element.value + "</div>" +
				"</td>" +
				"<td key='td2'>" +
				"<select>" +
				createOption(condition, data[i].condition) +
				"</select>" +
				"</td>" +
				"<td key='td3'>" +
				"<select>" +
				createOption(contrasType, data[i].contrasType) +
				"</select>" +
				"</td>" +
				"<td key='td4'>" +
				"<div title='" +data[i].contrastValue.element.value + "' class='arrow" + (data[i].contrasType === '1' ? "" : " hidden") + "' value='" + data[i].contrastValue.element.id + "'>" + data[i].contrastValue.element.value + "</div>" +
				"<input value='" + data[i].contrastValue.input + "' class='" + (data[i].contrasType === '1' ? " hidden" : "") + "'/>" +
				"</td>" +
				"<td key='td5'>" +
				"<select>" +
				"<option value='' class='hidden'></option>" +
				createOption(right_bracket, data[i].right_bracket) +
				"</select>" +
				"</td>" +
				"<td key='td6'>" +
				"<select>" +
				createOption(operator, data[i].operator) +
				"</select>" +
				"</td>" +
				'<td key="td7">' +
				'<svg class="icon deleteBtn" width="30" height="30" style="vertical-align: middle;fill: currentColor;overflow: hidden;"' +
				'viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">' +
				'<path d="M512 512m-341.333333 0a341.333333 341.333333 0 1 0 682.666666 0 341.333333 341.333333 0 1 0-682.666666 0Z"' +
				'   fill="#1D1D1D" class="selected-path" style="fill: rgb(205, 205, 205);"></path>' +
				'<path d="M550.684444 510.464l120.661334 120.661333a28.615111 28.615111 0 0 1 0 40.220445 28.728889 28.728889 0 0 1-40.220445 0L510.464 550.684444 389.802667 671.345778a28.728889 28.728889 0 0 1-40.220445 0 28.728889 28.728889 0 0 1 0-40.220445l120.661334-120.661333-120.661334-120.661333a28.615111 28.615111 0 0 1 0-40.220445 28.728889 28.728889 0 0 1 40.220445 0l120.661333 120.661334 120.661333-120.661334a28.728889 28.728889 0 0 1 40.220445 0 28.728889 28.728889 0 0 1 0 40.220445L550.684444 510.464z"' +
				'fill="#FFFFFF"></path>' +
				'</svg>' +
				'</td>' +
				"</tr>";

			$("#dataList").append(tr);
		}

		$(".deleteBtn").click(function (event) {
			$(this).parent().parent().remove();
		});

		$("#dataList .row [key=td3] select").change(function () {
			var val = $(this).val();
			if (val === '1') {
				$(this).parent().parent().find("[key=td4]").find(".arrow").removeClass("hidden");
				$(this).parent().parent().find("[key=td4]").find("input").addClass("hidden");
			} else {
				$(this).parent().parent().find("[key=td4]").find(".arrow").addClass("hidden");
				$(this).parent().parent().find("[key=td4]").find("input").removeClass("hidden");
			}
		});

		$("#dataList .row [key=td1] .arrow,[key=td4] .arrow").click(function (event) {
			var row = $(this).closest("tr").index();
			var col = $(this).parent().attr("key");
			model.invoke('elementSelect', { "row": row, col: col });
		});
	}

	/**
	 * 获取页面数据
	 * return {list:数据结合，jsonStr:json串}
	 */
	function getHtmlDatas(model) {
		var html = $("#dataList .row");
		if (!html || html.length === 0) {
			model.invoke('submitData', null);
			return "";
		}
		var list = [];
		var jsonStr = "";
		for (var i = 0; i < html.length; i++) {
			var row = html.get(i);
			var left = $(row).find("[key=td0]").find("select").val();
			var leftText = $(row).find("[key=td0]").find("option:selected").text();
			var element = $(row).find("[key=td1]").find(".arrow").attr("value");
			var elementText = $(row).find("[key=td1]").find(".arrow").text();
			var condition = $(row).find("[key=td2]").find("select").val();
			var conditionText = $(row).find("[key=td2]").find("option:selected").text();
			var contrasType = $(row).find("[key=td3]").find("select").val();
			var contrasTypeText = $(row).find("[key=td3]").find("option:selected").text();
			var contrastElement = $(row).find("[key=td4]").find(".arrow").attr("value");
			var contrastElementText = $(row).find("[key=td4]").find(".arrow").text();
			var contrastInput = $(row).find("[key=td4]").find("input").val();
			var right = $(row).find("[key=td5]").find("select").val();
			var rightText = $(row).find("[key=td5]").find("option:selected").text();
			var operator = $(row).find("[key=td6]").find("select").val();
			var operatorText = $(row).find("[key=td6]").find("option:selected").text();
			jsonStr += (left + elementText + conditionText + contrasTypeText)
			if (contrasType === '1') {
				//元素
				jsonStr += contrastElementText;
			} else if (contrasType === '2') {
				//固定值
				jsonStr += contrastInput;
			}
			if(i != html.length -1) {
				jsonStr += (rightText + operatorText);
			}
			

			list.push({
				bracketLeft: left,
				element: {
					id: element,
					value: elementText
				},
				condition: condition,
				contrasType: contrasType,
				contrastValue: {
					element: {
						id: contrastElement,
						value: contrastElementText
					},
					input: contrastInput
				},
				bracketRight: right,
				operator: operator,
			});
		}

		model.invoke('submitData', {list:list,jsonStr:jsonStr});

	}


	KDApi.register('filter', MyComponent, {isMulLang: true})
})(window.KDApi, jQuery);
