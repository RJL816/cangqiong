var wordList = {
  hello: { zh_CN: '您好', en_US: 'Hello', zh_TW: '您好' },
  welComeMsg: { zh_CN: '欢迎登录金蝶云苍穹', en_US: 'Welcome to Kingdee Cloud Cosmic', zh_TW: '歡迎登錄金蝶雲蒼穹' },
  downloadTitle: { zh_CN: 'Hi,您的浏览器需要升级', en_US: 'Hi, your browser needs to be upgraded', zh_TW: 'Hi,您的瀏覽器需要升級' },
  downloadTips: {
    zh_CN: '当前浏览器版本过低，为了能正常体验金蝶云苍穹，我们建议您升级最新版IE浏览器或者下载新版Chrome',
    en_US: 'The current browser version is too low. In order to experience the Kingdee Cloud Cosmic normally, we recommend that you upgrade the latest version of IE browser or download a new version of Chrome',
    zh_TW: '當前瀏覽器版本過低，為了能正常體驗金蝶雲苍穹，我們建議您升級最新版IE瀏覽器或者下載新版Chrome'
  },
  downloadSpan: { zh_CN: '立即下载', en_US: 'download', zh_TW: '立即下載' },
  mobileDownloadBrowserTips: {
    zh_CN: '您的浏览器版本过低，无法正常访问当前页面，请先尝试升级浏览器版本',
    en_US: 'Your browser version is too low to access the current page normally, please try to upgrade the browser version first.',
    zh_TW: '您的瀏覽器版本過低，無法正常訪問當前頁面，請先嘗試升級瀏覽器版本'
  },
  comma: {
    zh_CN: '，',
    en_US: ', ',
    zh_TW: '，'
  },
  exclamationPoint: {
    zh_CN: '！',
    en_US: '!',
    zh_TW: '！'
  }
}

var matchArr = window.location.pathname.match(/\/(\w+)\//)
var name = matchArr ? matchArr[1] : ''
var localeKey = name ? name + '-' + 'login-lang' : 'login-lang'
var locale = (window.localStorage && window.localStorage.getItem && window.localStorage.getItem(localeKey)) || 'zh_CN'
var username = window.localStorage && window.localStorage.getItem && window.localStorage.getItem('ierp-login-username')
var hello = wordList.hello[locale] || wordList.hello.en_US
var welComeMsg = wordList.welComeMsg[locale] || wordList.welComeMsg.en_US
var downloadTitle = wordList.downloadTitle[locale] || wordList.downloadTitle.en_US
var downloadTips = wordList.downloadTips[locale] || wordList.downloadTips.en_US
var mobileDownloadBrowserTips = wordList.mobileDownloadBrowserTips[locale] || wordList.mobileDownloadBrowserTips.en_US
document.getElementById('__kd_download_title').innerText = downloadTitle
document.getElementById('__kd_download_tips').innerText = downloadTips
document.getElementById('__kd_download_browser_mobile_tips').innerHTML = mobileDownloadBrowserTips
if (username != null) {
  window.localStorage.removeItem('ierp-login-username')
  document.getElementById('_kd_hello_kd_username').innerText = hello + (username ? ((wordList.comma[locale] || wordList.comma.en_US) + username + (wordList.exclamationPoint[locale] || wordList.exclamationPoint.en_US)) : '')
  document.getElementById('__kd_welcomemsg').innerText = window.__kd_welcomemsg__ ? window.__kd_welcomemsg__ : welComeMsg
  var welcomeDom = document.getElementById('__kd_welcome')
  welcomeDom.style.display = 'flex'
  setTimeout(function () {
    var childNodes = welcomeDom.getElementsByTagName('div')
    for (var i = 0; i < childNodes.length; i++) {
      var childNode = childNodes[i]
      var className = childNode.getAttribute('class')
      childNode.setAttribute('class', className + ' anim-drop')
    }
    welcomeDom.style.opacity = 0
    setTimeout(function () {
      welcomeDom.style.display = 'none'
    }, 3800)
  }, 100)
}
