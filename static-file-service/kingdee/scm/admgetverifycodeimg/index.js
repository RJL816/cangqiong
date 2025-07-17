(function (KDApi, $) {
    // 构造函数
    function MyComponent (model) {
      this._setModel(model)
    }
  
    var themeColor
    MyComponent.prototype = {
      // 绑定model
      _setModel: function (model) {
        this.model = model
      },
      // 生命周期：初始化
      init: function (props) {
        console.log('-----init', this.model, props)   
        setHtml(this.model, props)
      },
      // 生命周期：更新
      update: function (props) {
        console.log('-----update', this.model, props)
        updateHtml(this.model, props)
      },
      // 生命周期：销毁
      destoryed: function () {
        console.log('-----destoryed', this.model)
      }
  
    }
  
    // 加载文件和模板
    var setHtml = function (model, props) {
    //   var cssHref = KDApi.getNameSpace(model) + './css/delLabel.css'
    //   if ($('link[href="' + cssHref + '"]').length === 0) {
    //     // 加载css文件
    //     KDApi.loadFile('./css/delLabel.css', model, function () {
    //       updateHtml(model, props)
    //     })
    //   }
      // 加载模板
      updateHtml(model, props)
    }
  
    var updateHtml = function (model, props) {
    //   模板字符串
    // var str = props.data && props.data.get('text') ? props.data.get('text') : 'QAQ'
    // var value = props.data && props.data.inputvalue || 'QAQ'
    var value = props.data
    var customCtrParam = props.data
            

    //   var template = '<h1>init: Hello World!!!~!!</h1>' 
    // //   + ' <img src=' + '"<%= text %>"' + ' style="width:400px" />'
    // //   + ' <img src=' + '<%= text %>' + ' style="width:400px" />'
    // //   + ' <h1>images: </h1>' + ' <img src=' + '"<%= text %>"' + ' style="width:400px" />'
    //   // 根据接收的参数将字符串模板转为innerHTML
    //   var result = KDApi.getHTMLStringBytemplate(template, {
    //     text: props.data && props.data.get('text') ? props.data.get('text') : 'QAQ'
    //   })
    console.log('-----------------init' + value + ' ' + customCtrParam)
    //   model.dom.innerHTML = '<h1>' + 'init: Hello World!!!~!!' + str  + '</h1>' 
    // model.dom.innerHTML = '<h1>' + 'init: Hello World!!!~!!' +  '</h1>' 
    var jpg = JSON.stringify(value);
    var arr = jpg.split(':')

    model.dom.innerHTML =  '<img src=' + arr[1] + ':' + arr[2] +  ' width="118px" height="45px" />'
    //   model.dom.innerHTML =   ' <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAoAFADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD2tBC2mxamqu8iRvcxebcAEBwWKF1JUryB1Kjap52g1Je3KulqBaC4imlTG9HOxg6kEgI20jDNlsAMoBIzkXYgVQIzO5QBS7gAtx14wPyFZ72rXV415b3wnhx5bWsgV4d8b5BGOVcMCCeeeo+UYSTWqBeexotuByOVAOVxyT25z9agiuPPjgli3yJI5yVULsGD94NyMEAEDnPUAZxDHqLKIlu7SW3mkTf5akSkdMjC5JxkAnGM9+RmSOSxZI3WaKQCU+W7Sb8SNngEk4OGIAHQHA4ptBazJ4pvMwGjkjfYrsrr93OeMjKkjBzgn9RUcjW0BmlmbYsQ895JSdkY2kEhjwvAOcdM5PXllx5ksQt4pLpHLiNriNUBj+Xdu+cYIPC/KDy3QYJEiSwXLOisJQrAk7cqCGIwDjGQyHI6g9ccU30aGLHtuBHcBpQjKHRGBTHB6qQDnB5DdMDgEUXEUc8Yhmt1nidvmVlBUY5BIPuB0zzj61VtY7260SOLUF8i5kj2zBJyzAdD86BMMV7qBtJ4yAM3mD7l2soXPzArkkYPTnjnH5H14m9xNLYqyG5hkhZkkud820iHaixL82GILZbAKg8nJGQo6VbKhipOflORgkdsc+vWq8ksFjbyXM4SHcQ0hQZLOcKBwMsT8qjjJ4AHQUx4YbuB4JYRdPb/ACZuosBmMeCQduCCrkEqMcsOxFOwJps5zSPHljryXE9taaraiyZ0lguLZVeaVVcmBFyS0oCbtq9BjPXibw7q1l40s49Zs7Nl02VpFeO+tlDmRRs3pjIIKsyltx4XbgfNXJa34E8RS6r4ouNL1CSwsz/p2nJHJ8z3TovmsH3qY2PllMtlQsrYwMiu58IaUPD3gzSNNa3MEkNugmiUmTbK3MnIJ/jZjwcD6U3GOthtK2pZuJ49P0Oa71GKO1WESSyR2s5wSS3RsJlm3dwPmPrg1z0WgahqsdvqGr6vNbahcxssUcWESLcCVjMZXLkAuTkg8Y5xmtzxFpk+taHdaWrBXnUss23CKVdWVSM556ZAPQn0B5TUNP1TxS2288MQQagsPlfbJb8hY8Fvm8tTnBO7b17dRXRSUbb2+79S1r1NLw/o2p2Npbfa7uWO9mMjvaiUbVxjD8MfQDgEDzACvFV9O8c6RrUSwprIgnYLhJwUbc4I2h12jjP90gHnnit2TT/7G8NnTNFhSWdYyUgkuDE8y5HmEOOVYgnDDADFegrjV0bxVdbTPoqo13rgvroveo37hNuyJ8Z3IMnGM42fd6VUVCpzOT9NUvw3Mqjvvt6HY6d4jttWiu/szSMYTiUxjDQArkErIqt6kfKQecZ6CRVsRrD6k7LBcgGMZX97PGQuFw6bwAwOFQ4J55JIGP4M0/URFqJ1XTJbJJZxPa/6QNyRMB+5Gw5VU2gAHA5+6MVqy6hdw2eBby31wxKPY7F3nlgTv+VVjOxiGcDdjHUgVjUUYSai9PUcdUec+D5R4YvvEq6FYyahef2q9qmmJPgCBHCo5YoxXBkxlmAI3H+AmvSfDFxqlxpTNq2kx6ZMJn2RRzrMGQncGLAnk5IJ7kE8ZxXndnpXiXwtJp9xa6Ve6hc+TLFfyTXCR9SHjIkLNt25wQS0fynjO4j0jTBdyafDdK0KzToss8bhXPmbQGUyR4U4wF3bT09MCueEWtDerUUldbPr100LFyzW2nPLczsZYomlZ4sRqCEwSNx2gdSA5IHc8ZFmdoli/fSKiMypliMEkgBefUkD8aKK15U0vM5b7jod3kR79+7aM78bs4744z9OKgkS1mF356lotnlTrOG8orjJ4b5SMOckdehPy4BRRBfgOTsnYg82LT7a3uJz9lTygsoZSI4lRGY5wxSIDnLZxwBk/LVqO1jgmaSEbN/31BO08sxIXOAxZiS2MnvnAwUUSWiZSfQrSi8nuJVR43gjkUeWUkgYEBGB8wEhxnOQFwc7SflYEa9lScJLaXKrxuZV3IPvcrtyTkjHOOMZxnBKKW+haVxRdW1zMkUgjkdpDsjdQrxjYQSVY5556Dow4xk0SZiu4I2t2c3MhL3EKlAu3LIGIJPQYycKcEEjKqxRRZbE2P/Z" style="width:400px" />' + ' <h1>init: Hello World!!</h1>'
      // 绑定DOM操作事件
      initEvent(model, props)
    }
  
    
    // DOM节点操作函数
    var initEvent = function (model, props) {
        $(model.dom).click(function () {
            model.invoke('refreshcode', '')
          })
    }
    console.log('-----------------init')
    // 注册自定义控件
    KDApi.register('admgetverifycodeimg', MyComponent)
  })(window.KDApi, jQuery)
  