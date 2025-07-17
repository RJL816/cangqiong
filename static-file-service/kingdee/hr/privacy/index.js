'use strict';

(function (KDApi) {
  function Component(model) {
    this._setModel(model);
  }
  // windwo.deviceType == pc or mobile
  var $ = void 0;
  if (window.deviceType == "pc") {
    $ = jQuery;
  }
  Component.prototype = {
    _setModel: function _setModel(model) {
      this.model = model;
    },
    init: function init(props) {
      initFunc(this.model, props);
    },
    update: function update(props) {},
    destoryed: function destoryed() {
      this.model.dom.remove();
    }

  };
  var initFunc = function initFunc(model, props) {
    var valueObj = props.data.value;
    KDApi.loadFile('./html/index.css', model, function () {
      KDApi.getTemplateStringByFilePath('./html/dom.html', model, {
        des1: valueObj.prefix || '',
        des2: valueObj.title || ''
      }).then(function (result) {
        model.dom.innerHTML = result;
        initDomFunc(model, props);
      });
    });
  };
  var initDomFunc = function initDomFunc(model, props) {
    model.dom.getElementsByClassName('privacyLink')[0].onclick = function () {
      model.invoke('clickPrivacyLink');
    };
  };

  KDApi.register('privacy', Component);
})(window.KDApi);