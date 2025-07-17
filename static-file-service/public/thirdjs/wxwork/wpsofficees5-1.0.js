"use strict";

// 插件地址
// url 必须以 '/' 结尾
var ADDON_VERSION = '0.5';
var pathname = window.location.pathname.replace('index.html', '');
var pluginList = [{
  name: 'KingdeeWps',
  addonType: 'wps',
  online: false,
  url: "".concat(window.location.origin).concat(pathname, "public/thirdjs/wps/KingdeeWps_").concat(ADDON_VERSION, ".7z/"),
  version: ADDON_VERSION
}
// { name: 'KingdeeWps', addonType: 'wps', online: false, url: 'http://localhost:3000/ierp/feature_sit/public/thirdjs/wps/kingdeewps_0.4.7z/', version: ADDON_VERSION }
];

// find方法兼容ie
function find (arr, predicate) {
  for (var i = 0; i < arr.length; i++) {
    if (predicate(arr[i], i, arr)) {
      return arr[i]
    }
  }
  return undefined
}

function openUrl(url) {
  var callback = function callback() {
    if (!url) return;
    // 多进程
    var client = new window.WpsClient(window.WpsInvoke.ClientType.wps);
    // Https 的话会由于证书问题被浏览器拦截
    client.InvokeAsHttp('KingdeeWps', 'dispatcher', {
      funcs: [{
        openPanel: {
          url: url
        }
      }]
    }, null, true);
    setTimeout(function () {
      window.close();
    }, 300);
  };
  if (document.getElementById('kd_wps')) {
    installAddon(callback);
    return;
  }
  install(callback);
}

/**
 * 安装加载项，对外暴露的方法
 * @param {function} callback 安装回调
 */
var install = function install(callback) {
  installAddon(callback)
};

/**
 * 安装加载项
 * @param {function} callback 回调
 * @returns
 */
var installAddon = function installAddon(callback) {
  if (!window.WpsAddonMgr) return;
  // WpsAddonMgr 的方法会启动 wps 端口服务（非启动软件）
  // 行为类似于 window.location.href = ksoWPSCloudSvr://start=RelayHttpServer
  // 服务启动成功后，http 会监听 58890，https 监听 58891
  // 开始安装加载项
  try {
    window.WpsAddonMgr.getAllConfig(function (res) {
      if (res.status === 0) {
        var response;
        try {
          response = JSON.parse(res.response);
        } catch (err) {
          installWpsAddinOne(callback);
          return;
        }
        if (!response) {
          installWpsAddinOne(callback);
          return;
        }
        var isKDAddonInstalled = find(response, function (addon) {
          return addon.name === 'KingdeeWps' && addon.version === ADDON_VERSION;
        });
        if (!isKDAddonInstalled) {
          installWpsAddinOne(callback);
        } else {
          callback === null || callback === void 0 ? void 0 : callback();
        }
      } else {
        displayErrMessage();
      }
    });
  } catch (error) {
    console.log(error, 'installAddon');
  }
};
var publishIndex = 0;
/**
 * 安装单个加载项
 * @param {function} callback 回调函数
 * @returns
 */
var installWpsAddinOne = function installWpsAddinOne(callback) {
  if (!window.WpsAddonMgr) return;
  try {
    window.WpsAddonMgr.enable(pluginList[publishIndex], function (e) {
      if (e.status !== 0) {
        displayErrMessage();
        return;
      }
      callback === null || callback === void 0 ? void 0 : callback();
    });
  } catch (error) {
    console.log(error, 'installWpsAddinOne');
  }
};
var displayErrMessage = function displayErrMessage() {
  var message = '请先安装或允许浏览器打开 WPS 客户端。';
  alert(message);
};

// 获取wps地址
function getParam(name, url, isOneParam) {
  if (!url) return false;
  var text = isOneParam ? name + '=([^&]+)' : '[?&]' + name + '=(.*)';
  var regex = new RegExp(text);
  var results = regex.exec(url);
  if (!results) return false;
  if (!results[1]) return false;
  return decodeURI(results[1]);
}

// 打开wps
function openWps(para) {
  if (!para) return;
  openUrl(para);
}
document.addEventListener('DOMContentLoaded', function () {
  window.focus();
  var para = getParam('wpsoffice', window.location.href);
  if (!para) return
  // 倒计时时长
  var timeCount = 3;
  var timer;
  // 获取addonversion版本
  ADDON_VERSION = getParam('addonversion', window.location.href, true);
  var timeTipDom = document.querySelector("div");
  timeTipDom.innerHTML = "\u5012\u8BA1\u65F6".concat(timeCount, "\u79D2\u540E\u81EA\u52A8\u6253\u5F00");
  // 3秒倒计时
  timer = setInterval(function () {
    if (timeCount > 0) {
      timeCount = timeCount - 1;
      timeTipDom.innerHTML = "\u5012\u8BA1\u65F6".concat(timeCount, "\u79D2\u540E\u81EA\u52A8\u6253\u5F00");
    } else {
      clearInterval(timer);
      openWps(para);
    }
  }, 1000);
  // 监听点击事件
  document.querySelector(".tip").addEventListener('click', function () {
    clearInterval(timer);
    openWps(para);
  });
});
