(function () {
  function getOsAndBrowserInfo () {
    var osName = 'unknownOS'
    var bit = 'unknownBit'
    if (navigator.appVersion.indexOf('Win') != -1) {
      osName = 'windows'
      if (navigator.userAgent.indexOf('WOW64') > -1) {
        bit = 64
      } else {
        bit = 32
      }
    } else if (navigator.appVersion.indexOf('Mac') != -1) {
      osName = 'macOS'
    } else if (navigator.appVersion.indexOf('X11') != -1) {
      osName = 'unix'
    } else if (navigator.appVersion.indexOf('Linux') != -1) {
      osName = 'linux'
    }

    var userAgent = navigator.userAgent

    var tem

    var userAgentMatch = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []
    if (/trident/i.test(userAgentMatch[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(userAgent) || []
      return {
        os: osName,
        bit: bit,
        browser: {
          name: 'IE',
          version: (tem[1] || '')
        }
      }
    }
    if (userAgentMatch[1] === 'Chrome') {
      tem = userAgent.match(/\bOPR\/(\d+)/)
      if (tem != null) {
        return {
          os: osName,
          bit: bit,
          browser: {
            name: 'Opera',
            version: tem[1]
          }
        }
      }
    }
    userAgentMatch = userAgentMatch[2] ? [userAgentMatch[1], userAgentMatch[2]] : [navigator.appName, navigator.appVersion, '-?']
    // 移动设备排除在外，因为移动设备大多数浏览器包含 Version/4.0 之类的，容易把浏览器版本搞错
    if (!isMobileDevices()) {
      tem = userAgent.match(/version\/(\d+)/i)
      if (tem !== null) {
        const projectVersionTem = userAgent.match(/projectversion\/(\d+)/i)
        // 匹配到version且其前面不是project
        if (!projectVersionTem || (projectVersionTem && tem.index - projectVersionTem.index !== 7)) {
          userAgentMatch.splice(1, 1, tem[1])
        }
      }
    }

    return {
      os: osName,
      bit: bit,
      browser: {
        name: userAgentMatch[0],
        version: userAgentMatch[1]
      }
    }
  }

  function canView (clientType) {
    var osAndBrowserInfo = getOsAndBrowserInfo()
    var browserName = osAndBrowserInfo.browser.name
    var browserVersion = osAndBrowserInfo.browser.version
    if (clientType === 'MOBILE') {
      window.webInMobile = true
      if (browserName === 'Chrome' && browserVersion < 50) {
        return false
      }
      return true
    } else {
      if (browserName === 'IE' && browserVersion >= 11) {
        return true
      } else if (browserName === 'Chrome' && browserVersion >= 50) {
        return true
      } else if (browserName === 'Safari' && browserVersion >= 11) {
        return true
      } else if (browserName === 'Firefox' && browserVersion >= 50) {
        return true
      } else if (browserName === 'Opera' && browserVersion >= 65) {
        return true
      }
      return false
    }
  }

  function loadjs (url, callback, errorcallback) {
    const sc = document.createElement('script')
    sc.setAttribute('type', 'text/javascript')
    sc.src = url
    document.body.appendChild(sc)

    if (window.ActiveXObject || 'ActiveXObject' in window) {
      if (sc.readyState) {
        sc.onreadystatechange = function () {
          if (this.readyState === 'loaded' || this.readyState === 'complete') {
            callback()
          }
        }
        sc.onerror = function () {
          errorcallback()
        }
      } else {
        sc.onload = function () {
          callback()
        }
        sc.onerror = function () {
          errorcallback()
        }
      }
    } else { // 不是ie
      sc.onload = function () {
        callback()
      }
      sc.onerror = function () {
        errorcallback()
      }
    }
  }

  function enableDarkReader () {
    const customStyleStorage = JSON.parse(window.sessionStorage.getItem('kd_dark_custom_style') || '{}')
    const fixDarkModeStyle = customStyleStorage.fixDarkModeStyle
    const ignoreInlineStyle = customStyleStorage.ignoreInlineStyle
    try {
      if (window.__kd_appearance_mode__ === 'dark') {
        DarkReader.setFetchMethod(window.fetch)
        DarkReader.enable({
          brightness: 100,
          contrast: 90,
          sepia: 10
        }, {
          css: fixDarkModeStyle,
          ignoreInlineStyle: ignoreInlineStyle
        })
      } else {
        DarkReader.setFetchMethod(window.fetch)
        DarkReader.auto({
          brightness: 100,
          contrast: 90,
          sepia: 10
        }, {
          css: fixDarkModeStyle,
          ignoreInlineStyle: ignoreInlineStyle
        })
      }
    } catch (err) {
      console.warn(err)
    }
  }

  // 暗黑处理
  if (window.__kd_appearance_mode__ === 'dark' || window.__kd_appearance_mode__ === 'automatic') {
    const osAndBrowserInfo = getOsAndBrowserInfo()
    const browserName = osAndBrowserInfo.browser.name

    if (browserName !== 'IE') {
      const customStyleStorage = window.sessionStorage.getItem('kd_dark_custom_style')
      function loadDarkReaderFile () {
        loadjs(
          window.__kd_cdnPath__ + '/public/thirdjs/darkreader@1.0.1.min.js',
          enableDarkReader,
          function () {
            console.error('load darkreader fail')
          }
        )
      }
      if (['', null].includes(customStyleStorage)) {
        loadjs(window.__kd_cdnPath__ + '/public/thirdjs/fixDarkModeStyle.js', loadDarkReaderFile, function () {
          console.error('load fixDarkModeStyle fail')
        })
      } else {
        loadDarkReaderFile()
      }
    }
  }

  function isMobileDevices () {
    if (/Android|iPhone/i.test(navigator.userAgent)) {
      // 当前设备是移动设备
      return true
    }
    return false
  }

  if (isMobileDevices()) {
    if (!canView('MOBILE')) {
      // 提示移动端的浏览器版本过低
      window.terminate = true // 全局变量
      document.getElementById('__kd_welcome').style.display = 'none'
      document.getElementById('__kd_content__').style.display = 'none'
      document.querySelector('#__kd_download_browser_mobile img').setAttribute('src', window.__kd_cdnPath__ + '/public/thirdjs/image/page_nodata.png')
      document.getElementById('__kd_download_browser_mobile').style.display = 'flex'
    }
  } else {
    if (!canView('WEB')) {
      // 提示PC端的浏览器版本过低
      window.terminate = true // 全局变量
      document.getElementById('__kd_welcome').style.display = 'none'
      document.getElementById('__kd_content__').style.display = 'none'
      document.querySelector('#__kd_download_browser img').setAttribute('src', window.__kd_cdnPath__ + '/public/thirdjs/image/downloadBrowser.png')
      document.getElementById('__kd_download_browser').style.display = 'block'
    }
  }

  function getCusCdnPath (cusCdnPathStr) {
    var cusCdnPath = '.'
    if (cusCdnPathStr) {
      cusCdnPath = cusCdnPathStr.split('=').filter(function(str){return str.indexOf('kd_debug_extendJS_cdn') === -1})[0] || '.'
    }
    return /^http(s)?/.test(cusCdnPath) ? cusCdnPath : '.'
  }

  function getCusCdnPathStr () {
    var searchStr = window.location.search
    var cusCdnPathStrArr = []
    if (typeof searchStr === 'string') {
      cusCdnPathStrArr = searchStr.substring(1).split('&').filter(function(str) {return str.indexOf('kd_debug_extendJS_cdn') > -1})
    }
    return cusCdnPathStrArr[0]
  }

  if (window.__kd_preset_js__) {
    var custJSFile = document.createElement('script')
    custJSFile.type = 'text/javascript'
    var cusCdnPathStr = getCusCdnPathStr()
    if (cusCdnPathStr) {
      var path = window.__kd_preset_js__.substr(1, window.__kd_preset_js__.length)
      var cdnPath = getCusCdnPath(cusCdnPathStr)
      custJSFile.src = cdnPath + path
    } else {
      custJSFile.src = window.__kd_preset_js__
    }
    document.body.appendChild(custJSFile)
  }

  // 增加自定义文件引入
  if (window.__kd_custome_js__) {
    var custJSFile = document.createElement('script')
    custJSFile.type = 'text/javascript'
    // window.__kd_custome_js__ = "./isv/kdtest/globalfiles/index.js" // 挂本地代码时调试用
    var cusCdnPathStr = getCusCdnPathStr()
    if (cusCdnPathStr) {
      var path = window.__kd_custome_js__.substr(1, window.__kd_custome_js__.length)
      var cdnPath = getCusCdnPath(cusCdnPathStr)
      custJSFile.src = cdnPath + path
    } else {
      custJSFile.src = window.__kd_custome_js__
    }
    document.body.appendChild(custJSFile)
  }
  // 设置全局loading
  var loadingStorage = JSON.parse(window.localStorage.getItem('kd_loading_info') || '{}')
  function fetchSvgSourceCode (targetDom, localPath) {
    var themeColor = window.localStorage.getItem('sys_info_theme_color')
    var noAnimationClass = loadingStorage.noAnimation ? 'kd-cq-loading-noanimation' : ''
    var xhr = new window.XMLHttpRequest()
    xhr.timeout = 600 // 超时时间600ms
    xhr.open('GET', localPath, true)
    xhr.onload = function () {
      if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 0)) {
        var svgSource = xhr.responseText
        var loadingHtml ='<div class=\"kd-cq-loading\" style=\"position: fixed; left: 50%; top: 50%; transform:translate(-50%,-50%);\"><div style=\"color: ' + themeColor + ';\" ' + 'class=\"kd-cq-loading-wrapper ' + noAnimationClass + '\">' + svgSource + '</div></div>'
        targetDom.innerHTML = loadingHtml
      }
      targetDom.style.display = 'block'
    }
    xhr.ontimeout = function () {
      targetDom.style.display = 'block' // 请求超过600ms显示默认loading
    }
    xhr.send()
  }

  if (document.getElementById('__kd_content__')) {
    var localPath = loadingStorage.svgIconPath
    var targetDom = document.getElementById('__kd_content__').querySelector('.kd_loading')
    if (localPath) {
      fetchSvgSourceCode(targetDom, localPath)
    } else {
      targetDom.style.display = 'block'
    }
  }

  if (window.__kd_custome_css__) {
    const custCssFile = document.createElement('link')
    custCssFile.rel = 'stylesheet'
    custCssFile.type = 'text/css'
    custCssFile.href = window.__kd_custome_css__
    document.head.appendChild(custCssFile)
  }
})()
