/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 *  自定义控件书写模板
 */
(function (KDApi, $) {
  // 构造函数，变量名随意，与最后一句代码的KDApi.register的第二个参数一致即可
  function FDThemeselect(model) {
    this._setModel(model);
  }

  var __this = {};

  function getPosition(pageId) {
    var icon = document.getElementById('kd-fdcustom-theme-icon'+pageId);
    if (!icon) return {};
    var iconRect = icon.getBoundingClientRect();
    return {
      top: iconRect.top,
      right: iconRect.right
    };
  }
  
    function setDropDownPositionEvent(pageId) {
		return function(){
			var dropdown = document.getElementById('kd-fdcustom-dropdown'+pageId);
			var offsetTop = 10;
			var selfHeight = 14;
			var pos = getPosition(pageId);

			dropdown.style.top = pos.top + selfHeight + offsetTop + 'px';
			dropdown.style.right = window.innerWidth - pos.right + 'px';
		}
  }
  
	
  function setDropDownPosition(pageId) {
    var dropdown = document.getElementById('kd-fdcustom-dropdown'+pageId);
    var offsetTop = 10;
    var selfHeight = 14;
    var pos = getPosition(pageId);

    dropdown.style.top = pos.top + selfHeight + offsetTop + 'px';
    dropdown.style.right = window.innerWidth - pos.right + 'px';
  }
  
  

  function getTargetKey(target) {
    var dataKey = target.dataset.key;

    if (!dataKey && target !== document.body) {
      target = target.parentElement;
      dataKey = getTargetKey(target);
      return parseInt(dataKey);
    }

    return parseInt(dataKey);
  }

  function isInteger(obj) {
    return obj % 1 === 0;
  }

  function onClick(event, model, data) {
    var target = event.target;
    var dataKey = getTargetKey(target);
    var key;

    if (data instanceof Array && isInteger(dataKey)) {
      key = data[dataKey].id;
      invokeService(model, 'click', {
        key: key
      });
      hideDropdown(model.pageId);
    }

    event.stopPropagation();
  }

  function toggleDropdown(pageId) {
    var dropdown = document.getElementById('kd-fdcustom-dropdown'+pageId);
    var dropdownShow = dropdown.classList.contains('kd-fdcustom-dropdown-show');
    dropdownShow ? hideDropdown(pageId) : showDropdown(pageId);
  }

  function hideDropdown(pageId) {
    var dropdown = document.getElementById('kd-fdcustom-dropdown'+pageId);
    var icon = document.getElementById('kd-fdcustom-theme-icon'+pageId);
    icon.style.transform = 'rotate(0deg)';
    dropdown.classList.remove('kd-fdcustom-dropdown-show');
	var c =__this[pageId+"_click"];
	var d =__this[pageId+"_resize"];
    window.removeEventListener('click', c, true);
    window.removeEventListener('resize', d);
  }

  function showDropdown(pageId) {
    var dropdown = document.getElementById('kd-fdcustom-dropdown'+pageId);
    setDropDownPosition(pageId); // 隐藏时窗口resize

    var icon = document.getElementById('kd-fdcustom-theme-icon'+pageId);
    icon.style.transform = 'rotate(180deg)';
    dropdown.classList.add('kd-fdcustom-dropdown-show');
	var c = clickOutSide(pageId);
	var d = setDropDownPositionEvent(pageId);
	__this[pageId+"_click"] = c;
	__this[pageId+"_resize"] = c;
    window.addEventListener('click', c, true);
    window.addEventListener('resize', d);
  }

  function addDropdownItemEventListner(model,props) {
    var dropdown = document.getElementById('kd-fdcustom-dropdown'+model.pageId);
    dropdown.addEventListener('click', function (e) {
      onClick(e, model, props.data || []);
    }, true);
  }

  function removeDropdownItemEventListner(model, props) {
    var dropdown = document.getElementById('kd-fdcustom-dropdown'+model.pageId);
    dropdown.removeEventListener('click', function (e) {
      onClick(e, model, props.data || []);
    }, true);
  }
  
  	
  function clickOutSide(pageId) {
	 return function(e){ 
		var _document$getElementB, _document$getElementB2;

		var dropdown = document.getElementById('kd-fdcustom-dropdown'+pageId);
		var lang = document.getElementById('kd-fdcustom-theme'+pageId);
		var dialogDom = document.querySelector('#dialogShow'); // 判断内容选择弹出层是否存在

		var targetDom = event.target;
		var clickInSideslippingFlex = false;
		var isNotificationDom = (_document$getElementB = document.getElementById('kd-notification')) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.contains(targetDom);
		var isSysNotificationDom = (_document$getElementB2 = document.getElementById('system-notification')) === null || _document$getElementB2 === void 0 ? void 0 : _document$getElementB2.contains(targetDom);

		if (dialogDom || isNotificationDom || isSysNotificationDom) {
		  clickInSideslippingFlex = true;
		}

		if (clickInSideslippingFlex) return;

		if (!dropdown.contains(e.target) && !lang.contains(e.target)) {
		  hideDropdown(pageId);
		  e.stopPropagation();
		}
	 }
  }

  function addButtonEvent(pageId) {
    var langEle = document.getElementById('kd-fdcustom-theme'+pageId);
    langEle.onclick = function (e) {
      e.stopPropagation();
      toggleDropdown(pageId);
    };
  }

  function createULElement(pageId) {
    var ul = document.createElement('ul');
    ul.id = 'kd-fdcustom-dropdown'+pageId;
    ul.classList.add('kd-fdcustom-dropdown');
    document.body.appendChild(ul);
  }

  function clearDropdownItems(pageId) {
    var dropdown = document.getElementById('kd-fdcustom-dropdown'+pageId);

    if (dropdown) {
      dropdown.innerHTML = '';
    }
  }

  function createDropdownElement(model,props, lang) {
    createULElement(model.pageId);
    createDropdownItems(model,props, lang);
  }

  function updateDropdownItems(model,props, lang) {
    clearDropdownItems(model.pageId);
    createDropdownItems(model,props, lang);
  }

  function createDropdownItems(model,props, lang) {
    var dropdown = document.getElementById('kd-fdcustom-dropdown'+model.pageId);
    if (!dropdown) return;
    if (props.data instanceof Array) {
      var fragment = document.createDocumentFragment();
      props.data.forEach(function (item, index) {
        var li = document.createElement('li');

        if (item.isSelected) {
          li.classList.add('kd-fdcustom-dropdown-item-selected');
        }

        li.classList.add('kd-fdcustom-dropdown-item');
        li.innerHTML = "\n                    <div style=\"background-color: ".concat(item.colorValue, "\" class=\"kd-fdcustom-theme-item-color\"></div>\n                    <div class=\"kd-fdcustom-theme-item-description\">").concat(item.description[lang], "</div>\n                ");
        li.classList.add('kd-fdcustom-theme-item');
        li.title = item.description[lang];
        li.setAttribute('data-key', index);
        fragment.appendChild(li);
      });
      dropdown.appendChild(fragment);
      setDropDownPosition(model.pageId);
    }
  }

  function invokeService(model, methodName, args) {
    model.invokeAsync(methodName, args);
  }

  function setDescValue(pageId,value) {
    var descEle = document.getElementById('kd-fdcustom-theme-description'+pageId);
    if (!descEle) return;
    descEle.innerText = value;
  }

  function setColorValue(pageId,value) {
    var colorEle = document.getElementById('kd-fdcustom-theme-color'+pageId);
    if (!colorEle) return;
    colorEle.style.backgroundColor = value;
  }

  function getSelectedValue(data) {
    return data.find(function (item) {
      return item.isSelected === true;
    });
  } // 原型中封装生命周期函数，固定格式


  FDThemeselect.prototype = {
    _setModel: function _setModel(model) {
      this.model = model;
    },
    init: function init(props) {
	  this.props = props;
      // TO DO
	  initFunc(this.model,props);
    },
    update: function update(props) {
	  this.props = props;
      // TO DO  u指令更新数据
      var selectedValue = getSelectedValue(props.data || []);
      selectedValue && setDescValue(this.model.pageId,selectedValue.description[props.lang || 'zh_CN']);
      selectedValue && setColorValue(this.model.pageId,selectedValue.colorValue);
      updateDropdownItems(this.model,props, props.lang || 'zh_CN');
    },
    destoryed: function destoryed() {
	  var c =__this[this.model.pageId+"_click"];
      window.removeEventListener('click', clickOutSide(c), true);
      removeDropdownItemEventListner(this.mode,this.props);
    }
  }; // Other Code

  var initFunc = function initFunc(model,props) {
    window.KDApi.getTemplateStringByFilePath('./html/fdthemeSelect.html', model,{pageId:model.pageId}).then(function (result) {
      window.KDApi.loadFile('./css/fdindex.css', model, function () {
        model.dom.innerHTML = result;
        addButtonEvent(model.pageId);
        var selectedValue = getSelectedValue(props.data || []);
        selectedValue && setDescValue(model.pageId,selectedValue.description[props.lang || 'zh_CN']);
        selectedValue && setColorValue(model.pageId,selectedValue.colorValue);
        createDropdownElement(model,props, props.lang || 'zh_CN');
        addDropdownItemEventListner(model,props); // init里面监听会有问题
      });
    });
  }; // 你只需知道第一个参数是你接下来要新增控件方案时填的方案id，第二个参数是上面声明的构造函数


  KDApi.register('fdthemeselect', FDThemeselect);
})(window.KDApi, jQuery); // 这里的jQuery不是必须要传进去的，可移除，要用到的时候才传，PC端系统默认会有jQuery对象，版本是1.12.4

/***/ })

/******/ });
//# sourceMappingURL=index.js.map