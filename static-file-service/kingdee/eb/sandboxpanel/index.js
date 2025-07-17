/**
 * Vue实例在setHtml方法中声明，初始化执行init的时候就能够创建
 * 声明Vue实例对象时，在其挂载完毕的生命周期里声明一个订阅，用于订阅update方法中发布的消息，从而更新实例数据
 * update方法中，发布一个消息，让Vue实例接收消息，更新数据
 * 在Vue实例的destroyed中，结束订阅
 * 注意loadFile中index.css的引入路径，因为webpack打包后将其放在了css文件夹里，所以路径是./css/index.css
 */
(function (KDApi) {
  function SandboxComponent (model) {
    this._setModel(model)
  }

  SandboxComponent.prototype = {
    _setModel: function (model) {
      this.model = model
    },
    init: function (props) {
      console.log('-----init', this.model, props)
      setHtml(this.model, props)
    },
    update: function (props) {
      console.log('-----update', this.model, props)
      entryObjs[this.model.pageId]._update(this.model, props)
    },
    destoryed: function () {
      let vm = entryObjs[this.model.pageId].vm
      console.log('-----destoryed, pageId vm', this.model.pageId, vm)
      if (vm) {
        vm.$destroy()
      }
    }
  }

  const entryObjs = {};

  const setHtml = function(model, props) {
    let cssFilePath = './component/css/index.css';
    KDApi.loadFile(cssFilePath, model, function() {
      console.log("success to load file: " + cssFilePath);

      let jsFilePath2 = './component/main.prod.js';
      console.info('Vue', window.Vue)
      if (window.Vue) {
        KDApi.loadFile(jsFilePath2, model, function() {
          console.log("success to load file: " + jsFilePath2);

          let entryObj = sandbox.sandboxEntry()
          entryObj._init(model, props, KDApi.getLangMsg)
          entryObjs[model.pageId] = entryObj
        })
      } else {
        let vueLibPath = './lib/vue/2.6.11/vue.min.js';
        KDApi.loadFile(vueLibPath, model, function() {
          console.log("success to load file: " + vueLibPath);

          KDApi.loadFile(jsFilePath2, model, function() {
            console.log("success to load file: " + jsFilePath2);

            let entryObj = sandbox.sandboxEntry()
            entryObj._init(model, props, KDApi.getLangMsg)
            entryObjs[model.pageId] = entryObj
          })
        });
      }
    })
  }


  // 注册自定义组件
  KDApi.register('sandboxpanel', SandboxComponent, {
    isMulLang: false
  })
})(window.KDApi)
