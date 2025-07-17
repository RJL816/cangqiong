;
(function() {
	'use strict';
    var _self = null;
	function FormatXML(dom) {
		this.template = "";
		this.lineArr = [];
		this.xmlDoc = {};
		this.isChinese = false;
		this.lineCount = 0;
        this.view = require("js/view.js");
		this.xmlParseToHTML(dom);
		this.template = this.lineArr[this.lineArr.length - 1].innerHTML;
		if(this.template === "") {
			this.template = "<div class='children'><div class='start-line' contenteditable='true'><font color='black'><</font><font color='black'>></font></div></div>";
		}
		_self = this;
		return this;
	}
	FormatXML.prototype.loadXMLByText = function(param) {
		var xmlDoc, str;
		str = encodeURI(param);
		//change the blank text to standred space
		str = str.replace(/%C2%A0/g, "%20");
		param = decodeURI(str);

		try {
			xmlDoc = new ActiveXObject("MicroSoft.XMLDOC");
			xmlDoc.async = false;
			xmlDoc.loadXML(param);
		} catch(e) {
			try {
				var parser = new DOMParser();
				xmlDoc = parser.parseFromString(param, "text/xml");
			} catch(e) {
				console.log("create xml document failed");
			}
		}

		return xmlDoc;
	}
	FormatXML.prototype.xmlParseToHTML = function(node) {
		var startline, content, endline, line, text = "",name="";
		name = this.convertName(node.nodeName);
		line = this.createNode("div", {
			"class": "children"
		});

		startline = this.createNode("div", {
			"class": "start-line",
			"contenteditable": "true"
		});
		if("#comment" === node.nodeName.toLowerCase()) {
			startline.innerText = "<font color='#23a5fd'>&lt;!-- </font>";
		}else {
		    this.lineCount++;
			startline.innerText = "<font class='line-num hide' contenteditable='false'>linenum</font><font class='line-num' contenteditable='false'>"+this.lineCount+"</font><font>&lt;</font>" + "<font color='#23a5fd'>" + name.toLowerCase() + "</font>";
		}
		content = this.createNode("div", {
			"class": "content-line",
			"contenteditable": "true"
		});
		endline = this.createNode("div", {
			"class": "end-line",
			"contenteditable": "true"
		});
		if("#comment" === node.nodeName.toLowerCase()) {
			endline.innerHTML = "<font color='#23a5fd'> --></font>";
		}else {
			if(!node.getAttribute('singletag')){
				endline.innerHTML = "<font>&lt;/</font>" + "<font color='#23a5fd'>" + name.toLowerCase() + "</font>" + "<font>&gt;</font>";
		    }
		}
		if(node.nodeType == 1) {
			if(node.attributes.length > 0) {
				if(document.querySelectorAll('.linkFocus')[0]){
					document.querySelectorAll('.linkFocus')[0].className = document.querySelectorAll('.linkFocus')[0].className.replace(/linkFocus/g,"");
				}
				for(var j = 0; j < node.attributes.length; j++) {
					var attribute = node.attributes[j];
					attribute['value'] = (attribute['value'] ? attribute['value'] : '').trim().replace(/>/g, "&gt;").replace(/</g, "&lt;");
					if(["viewid","bspace","autocreated","valuelist","xmlstr","singletag"].indexOf(attribute.nodeName) !== -1){
						text += "<font color='red' class='hide'>" + attribute.nodeName + "</font>" + "<font class='hide'>=</font>" + "<font color='green' class='hide e-viewid'>" + '"' + attribute['value'] + '"' + "</font> ";
					}else{
						attribute['value']  = attribute['value'].replace(/&lt;/g,'& lt;').replace(/&gt;/g,'& gt;');
						text += "<font color='red'>" + attribute.nodeName + "</font>" + "<font>=</font>" + "<font color='green'>" + '"' + attribute['value'] + '"' + "</font> ";
					}
				}
			}
		} else if(node.nodeType == 3) {
			console.log("this node type is 3");
		}
		if("#comment" === node.nodeName.toLowerCase()) {
			startline.innerHTML = startline.innerText;
		}else{
			if(node.getAttribute('singletag')){
				startline.innerHTML = startline.innerText + " " + text + "<font>\/&gt;</font>";
			}else{
				startline.innerHTML = startline.innerText + " " + text + "<font>&gt;</font>";
			}
		}
		line.appendChild(startline);
		startline.setAttribute('linenum',this.lineCount);
		if(node.hasChildNodes()) {
			for(var i = 0; i < node.childNodes.length; i++) {
				var item = node.childNodes[i];
				if(item) {
					if(item && item.nodeName === "#text") {
						continue;
					} else {
						var children = this.xmlParseToHTML(item);
						line.appendChild(children);
					}
				}
			}
		}
		if(node.childNodes.length < 1 || (node.children && node.children.length < 1)) {
			content.textContent = node.textContent.trim();
			if(content.childNodes.length > 0 || (content.children && content.children.length > 0)){
				line.appendChild(content);
			}
		}
		if(endline.children && endline.children.length > 0){
		    this.lineCount++;
			endline.innerHTML = "<font class='line-num hide' contenteditable='false'>linenum</font><font class='line-num' contenteditable='false'>"+this.lineCount+"</font>" + endline.innerHTML;
			endline.setAttribute('linenum',this.lineCount);
			line.appendChild(endline);
		}
		if(node.nodeName === "XMLTEXT"||node.nodeName.toLowerCase() === "div") {
			this.lineCount--;
			startline.remove();
			this.lineCount--;
			endline.remove();
		}
		if(this.lineArr){this.lineArr.push(line);}
		return line;
	}
	FormatXML.prototype.convertName = function(name) {
		switch(name.toLocaleLowerCase()){
			case "htmltext" : return "html";break;
			default : return name;break;
		}
	}
	/**
	 * @param
	 * ele string---the element type
	 * obj object---attribute object*/
	FormatXML.prototype.createNode = function(ele, obj) {
		var node;
		node = document.createElement(ele);
		for(var i in obj) {
			node.setAttribute(i, obj[i]);
		}
		return node;
	}
	FormatXML.prototype.mousedown = function(e) {
		e.stopPropagation() ? e.stopPropagation() : e.cancelBubble = true;
		/**document.querySelectorAll("#input-reminder ul")[0].style.visibility = "hidden";
		document.querySelectorAll("#input-reminder ul")[0].style.left = e.clientX + "px";
		document.querySelectorAll("#input-reminder ul")[0].style.top = e.clientY + 20 + "px";*/
	}

	FormatXML.prototype.editStart = function(e) {
		if("Process" === e.key || !e.key) {
			_self.isChinese = true;
		} else {
			_self.isChinese = false;
		}
		e.stopPropagation() ? e.stopPropagation() : e.cancelBubble = true;
		var range = window.getSelection().getRangeAt(0);
		var currentNode = range.startContainer.parentNode.parentNode;
		var newNode = document.createElement("div");
		newNode.setAttribute("class", "children");
		var child = document.createElement("div");
		child.setAttribute("class", "start-line");
		child.setAttribute("contenteditable", "true");
		child.innerHTML = "<font color='black'><</font><font color='black'>></font>";
		newNode.appendChild(child);
		switch(e.keyCode) {
			case 13:
				if(range.startContainer.data && (range.startContainer.data.indexOf(">") !== -1) &&
					(!range.startContainer.data.match(/\w/))) {
					if(currentNode.innerText.indexOf("/>") !== -1 || currentNode.className.indexOf("end-line") !== -1) {
						currentNode.parentNode.insertAdjacentElement("afterEnd", newNode);
					} else {
						currentNode.insertAdjacentElement("afterEnd", newNode);
					}
					range.setStartBefore(newNode);
					e.preventDefault();
				}
				break;
			default:
				break;

		}
	}

	FormatXML.prototype.editEnd = function(e) {
		e.stopPropagation() ? e.stopPropagation() : e.cancelBubble = true;
		e.preventDefault();
		if(!("keyup" === e.type && _self.isChinese)) {
			if(e.ctrlKey) {
				switch(e.keyCode) {
					case 90: //ctrl+Z
						break;
					default:
						break;
				}
			} else {
				//activeReminder();
				switch(e.keyCode) {
					case 8:
					case 16:
					case 17:
					case 32:
					case 37:
					case 38:
					case 39:
					case 40:
					case 67:
					case 187:
					case 222:
						break;
					default:
						//insertAttr();
						e.preventDefault();
						break;
				}
			}
		}

		/**if(document.querySelectorAll("#input-reminder ul li[class='']").length > 0) {
			document.querySelectorAll("#input-reminder ul")[0].style.visibility = "visible";
			var left = document.querySelectorAll("#input-reminder ul")[0].style.left;
			left = left.replace("px", "");
			left = parseInt(left) + 10;
			left = left + "px";
			document.querySelectorAll("#input-reminder ul")[0].style.left = left;
		}*/
	}
	FormatXML.prototype.uploadXML = function(param) {

	}
	FormatXML.prototype.watch = function(layer) {
		/**if(layer && layer.addEventListener) {
			layer.addEventListener('mousedown', this.mousedown);
			layer.addEventListener('keydown', this.editStart);
			layer.addEventListener('keyup', this.editEnd);
			layer.addEventListener('compositionstart', this.editStart);
			layer.addEventListener('compositionend', this.editEnd);
		}*/
	}
	FormatXML.load = function(param) {
		return new FormatXML(param);
	}
	window.FormatXML = FormatXML;

	function activeReminder() {
		var range = window.getSelection().getRangeAt(0);
		if("#text" === range.startContainer.nodeName) {
			var str = range.startContainer.wholeText;
			var re = "";
			str = str.trim();
			str = str.replace(/(=)|(\/)|(<)|(>)/g, "");
			if(str.split(" ").length > 1) {
				re = new RegExp(str.split(" ")[1], "");
			} else {
				re = new RegExp(str, "");
			}
			var a = document.querySelectorAll("#input-reminder ul li");
			findReminder(a, function(n) {
				var c = a[n].innerHTML;
				if(c.match(re)) {
					a[n].className = "";
				} else {
					a[n].className = "hide";
				}
			})
		}
	}

	function findReminder(a, f) {
		for(var i = 0, j = a.length; i < j; i++) {
			f.call(a[i], i);
		}
	}
}());