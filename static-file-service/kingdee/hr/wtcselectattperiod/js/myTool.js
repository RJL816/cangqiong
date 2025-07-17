'use strict';

(function () {
    function MyTool(para) {
        // 这里可以传主题色等
        this.timer = null;
        this.popover_isEnter = false;
    }

    /*
    * data = {
         title: '操作确认'
         text: '是否确定呢？',
         img: './a.png'
         showTitle: false,
         showImg: false,
         confirmBtn: '确定',
         cancelBtn: '取消',
         confirmCallback: function(){},
         cancelCallback: function(){}
    * }
    * */
    MyTool.prototype.confirmDialog = function (data) {
        var dom_body = document.querySelector('body');
        var dom_temp = document.createElement('div');
        dom_temp.className = 'wtc_kztTool_dialog-wrap';
        dom_temp.style.cssText = "position: fixed;left:0;right:0;bottom:0;top:0;width: 100%;height: 100%;background-color: rgba(55,55,55,.5);z-index: 9999;overflow: hidden;";
        dom_temp.innerHTML = '\n            <div class="wtc_kztTool_dialog" style="position: absolute;left:50%;top:50%;' + (data.showImg ? 'width:460px;' : '') + 'min-width: 300px;max-width: 460px;transform: translate(-50%, -50%);background-color: #fff;border-radius: 8px;padding:20px;box-sizing: border-box;box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);overflow: hidden;text-align: center;">\n                <div class="wtc_kztTool_dialog-title" style="font-size:18px;color:#333;text-align: left;margin-bottom: 20px;padding-right:20px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:' + (data.showTitle ? 'block' : 'none') + ';">' + data.title + '</div>\n                <div class="wtc_kztTool_dialog-img" style="text-align:center;margin-bottom: 20px;padding:0 20px;height:100px;display:' + (data.showImg ? 'block' : 'none') + ';">\n                    <img src="' + data.img + '" height="100" />\n                </div>\n                <div class="wtc_kztTool_dialog-text" style="margin-bottom: 30px;text-align: center;word-break: break-all;color:#828282;font-size: 16px;">' + data.text + '</div>\n                <div class="wtc_kztTool_dialog-btns" style="overflow: hidden; text-align: center;">\n                     <div class="wtc_kztTool_dialog-cancel-btn" style="display:inline-block;margin-right:20px;padding: 5px 20px;background-color: #fff;color: #666;border:1px solid #ccc;font-size: 14px;border-radius: 2px;cursor: pointer;">' + data.cancelBtn + '</div>\n                     <div class="wtc_kztTool_dialog-confirm-btn" style="display:inline-block;padding: 6px 20px;background-color: #5e80eb;color: #fff;font-size: 14px;border-radius: 2px;cursor: pointer;">' + data.confirmBtn + '</div>\n                </div>\n                <div class="wtc_kztTool_dialog-close" style="position: absolute; right: 20px;top:14px;font-size: 22px;color:#ccc;cursor: pointer;">x</div>\n             </div>\n        ';

        dom_temp.querySelector('.wtc_kztTool_dialog-confirm-btn').onclick = function () {
            dom_temp.parentElement.removeChild(dom_temp);
            data.confirmCallback();
        };

        dom_temp.querySelector('.wtc_kztTool_dialog-confirm-btn').onmouseenter = function () {
            this.style.opacity = 0.7;
        };
        dom_temp.querySelector('.wtc_kztTool_dialog-confirm-btn').onmouseleave = function () {
            this.style.opacity = 1;
        };

        dom_temp.querySelector('.wtc_kztTool_dialog-cancel-btn').onmouseenter = function () {
            this.style.border = '1px solid #5e80eb';
            this.style.color = '#5e80eb';
        };
        dom_temp.querySelector('.wtc_kztTool_dialog-cancel-btn').onmouseleave = function () {
            this.style.border = '1px solid #ccc';
            this.style.color = '#666';
        };

        dom_temp.querySelector('.wtc_kztTool_dialog-close').onmouseenter = function () {
            this.style.color = '#5e80eb';
        };
        dom_temp.querySelector('.wtc_kztTool_dialog-close').onmouseleave = function () {
            this.style.color = '#ccc';
        };

        dom_temp.querySelector('.wtc_kztTool_dialog-cancel-btn').onclick = function () {
            dom_temp.parentElement.removeChild(dom_temp);
            data.cancelCallback();
        };
        dom_temp.querySelector('.wtc_kztTool_dialog-close').onclick = function () {
            dom_temp.parentElement.removeChild(dom_temp);
            data.cancelCallback();
        };

        document.onkeyup = function () {
            if (event.keyCode === 13) {
                // enter键
                dom_temp.parentElement.removeChild(dom_temp);
                document.onkeyup = null;
                data.confirmCallback();
            }
            if (event.keyCode === 27) {
                // esc键
                dom_temp.parentElement.removeChild(dom_temp);
                document.onkeyup = null;
                data.cancelCallback();
            }
        };

        dom_body.appendChild(dom_temp);
    };

    /*
    * data = {
          type: 'warn',   // success  warn  error
          message: `message1`
      }
    * */
    MyTool.prototype.message = function (data) {
        var icon = void 0;
        var color = void 0;
        var background = void 0;
        switch (data.type) {
            case 'success':
                icon = '√';
                color = '#67c23a';
                background = '#e1f3d8';
                break;
            case 'warn':
                icon = '!';
                color = '#e6a23c';
                background = '#fdf6ec';
                break;
            case 'error':
                icon = '×';
                color = '#f56c6c';
                background = '#fef0f0';
                break;
        }

        var dom_body = document.querySelector('body');
        var dom_temp = document.createElement('div');
        dom_temp.className = 'wtc_kztTool_message-wrap';
        dom_temp.style.cssText = 'position: fixed;display: flex;top: -50px;left: 50%;transform: translateX(-50%);z-index: 9999;min-width: 200px;padding: 14px 20px;border-radius: 6px;background-color: ' + background + ';opacity: 0;animation: showMessage 0.6s;animation-fill-mode: forwards;';
        dom_temp.innerHTML = '\n            <style>@keyframes showMessage { from {opacity:0; top: -50px;} to {opacity:1; top: 40px}}</style>\n            <div class="wtc_kztTool_message-icon" style="flex: 0 0 16px;border-radius: 50%;background-color: ' + color + ';text-align: center;height: 16px;line-height: 16px;margin-right: 10px;font-size: 14px;color: #fff;">' + icon + '</div>\n            <div class="wtc_kztTool_message-text" style="flex: 1;color: ' + color + ';font-size: 14px;margin-top: -2px;white-space: nowrap;">' + data.message + '</div>\n        ';

        // 判断是否已存在提示框，存在则先移除：
        var dom_message = dom_body.querySelector('.wtc_kztTool_message-wrap');
        if (dom_message) {
            dom_message.parentElement.removeChild(dom_message);
            clearTimeout(this.timer);
        }

        dom_body.appendChild(dom_temp);

        // 设置消失时间：
        this.timer = setTimeout(function () {
            dom_temp.parentElement.removeChild(dom_temp);
        }, 3000);
    };

    /*
      data = {
         themeColor: 'red',
         positionX: 100,
         positionY: 100,
         data: [
            [  // 组
                {
                    value: '1111',
                    iconLeft: 'icon iconfont icon-home',
                    iconRight: 'icon iconfont icon-sousuo',
                    disabled: true,
                    index:1,
                    isHtml: true,
                    children: []
                }
            ],
         ],
         callback: function(){}
      }
      注意：当isHtml为true：value中为对应的html，其他的属性忽略
      返回右键菜单的根元素，用户可以自定义事件
    * */
    MyTool.prototype.rightClickMenu = function (data) {
        var $this = this;
        var str = '';
        var dom_body = document.querySelector('body');
        var dom_temp = document.createElement('div');
        dom_temp.className = 'wtc_kztTool_rightClickMenu-wrap';
        dom_temp.style.cssText = "display:none;position: fixed;left:0;right:0;bottom:0;top:0;width: 100%;height: 100%;background-color: rgba(55,55,55,0);z-index: 9999;overflow: hidden;";

        html_func(data.data, true);

        function html_func(menuData, isRoot) {
            str += '\n                <div class="wtc_kztTool_rightClickMenu-group" style="position: absolute;display:' + (isRoot ? 'block' : 'none') + ';border-radius: 2px;box-shadow: rgba(0, 0, 0, 0.2) 2px 2px 3px 1px;background: #fff;box-sizing: border-box;width:140px;">\n            ';

            for (var i = 0; i < menuData.length; i++) {
                str += '<div class="wtc_kztTool_rightClickMenu-list" style="' + (i < menuData.length - 1 ? 'border-bottom: 1px solid #ddd;' : '') + 'margin:0;padding:0;font-size: 12px;">';
                var arrGroup = menuData[i];
                for (var j = 0; j < arrGroup.length; j++) {
                    if (arrGroup[j].isHtml) {
                        str += arrGroup[j].value;
                    } else {
                        str += '\n                        <div class="wtc_kztTool_rightClickMenu-item" disabled="' + arrGroup[j].disabled + '" index="' + arrGroup[j].index + '" style="position:relative;display:flex;padding:10px;color:' + (arrGroup[j].disabled ? '#ccc' : '#333') + ';cursor:' + (arrGroup[j].disabled ? 'auto' : 'pointer') + ';">\n                            <div class="wtc_kztTool_rightClickMenu-item-icon-left" style="flex:0 0 20px;"><i class="' + arrGroup[j].iconLeft + '" style="font-size: 14px;"></i></div>\n                            <div class="wtc_kztTool_rightClickMenu-item-text" style="flex:1;margin-right:4px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">' + arrGroup[j].value + '</div>\n                            <div class="wtc_kztTool_rightClickMenu-item-icon-right" style="flex:0 0 20px;"><i class="' + (arrGroup[j].children.length > 0 ? arrGroup[j].iconRight : '') + '" style="font-size: 14px;"></i></div>\n                        ';

                        if (arrGroup[j].children.length > 0) {
                            html_func(arrGroup[j].children, false);
                        }

                        str += '</div>';
                    }
                }
                str += '</div>';
            }
            str += '</div>';
        }

        dom_temp.innerHTML = str;

        // 判断菜单位置是否超出屏幕范围：
        var dom_rootGroup = dom_temp.firstElementChild;
        var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
        var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;

        // scrollWidth、scrollHeight需要等dom都挂载后才会计算，所以需要异步一下；异步的过程中，会出现右键菜单位置闪动，所以需要先隐藏再显示：
        setTimeout(function () {
            dom_temp.style.display = 'block'; //显示菜单

            if (data.positionX + dom_rootGroup.scrollWidth > clientWidth) {
                dom_rootGroup.style.left = clientWidth - dom_rootGroup.scrollWidth + 'px';
            } else {
                dom_rootGroup.style.left = data.positionX + 'px';
            }

            if (data.positionY + dom_rootGroup.scrollHeight > clientHeight) {
                dom_rootGroup.style.top = clientHeight - dom_rootGroup.scrollHeight + 'px';
            } else {
                dom_rootGroup.style.top = data.positionY + 'px';
            }
        }, 0);

        var dom_menuItem = dom_temp.querySelectorAll('.wtc_kztTool_rightClickMenu-item');

        var _loop = function _loop(i) {
            if (dom_menuItem[i].getAttribute('disabled') === 'false') {
                dom_menuItem[i].onmouseenter = function () {
                    this.style.color = data.themeColor;
                    // this.style.backgroundColor = '#eee';
                    // let dom_curGroup = this.parentElement.parentElement;
                    var dom_childGroup = this.querySelector('.wtc_kztTool_rightClickMenu-group');
                    if (dom_childGroup) {
                        dom_childGroup.style.display = 'block';
                        // 判断这一层级位置是否已计算好：
                        if (dom_childGroup.style.left === '') {
                            // 未计算
                            var menuPosition = $this.getPosition(dom_childGroup, null);

                            // 140是当前组的宽度：
                            if (menuPosition.left + dom_childGroup.scrollWidth + 140 > clientWidth) {
                                dom_childGroup.style.left = -dom_childGroup.scrollWidth + 'px';
                            } else {
                                dom_childGroup.style.left = '140px';
                            }

                            if (menuPosition.top + dom_childGroup.scrollHeight > clientHeight) {
                                dom_childGroup.style.bottom = '0px';
                            } else {
                                dom_childGroup.style.top = '0px';
                            }
                        }
                    }
                };
                dom_menuItem[i].onmouseleave = function () {
                    this.style.color = '#333';
                    // this.style.backgroundColor = '#fff';
                    var dom_childGroup = this.querySelector('.wtc_kztTool_rightClickMenu-group');
                    if (dom_childGroup) dom_childGroup.style.display = 'none';
                };
            }

            dom_menuItem[i].onmousedown = function (e) {
                //取消事件冒泡
                if (e.stopPropagation) {
                    e.stopPropagation();
                } else {
                    e.cancelBubble = false;
                }

                if (dom_menuItem[i].getAttribute('disabled') === 'false') {
                    var index = this.getAttribute('index');
                    data.callback(index);
                }

                dom_temp.parentElement.removeChild(dom_temp);
            };
        };

        for (var i = 0; i < dom_menuItem.length; i++) {
            _loop(i);
        }

        dom_temp.onmousedown = function () {
            dom_temp.parentElement.removeChild(dom_temp);
        };

        dom_temp.oncontextmenu = function () {
            return false;
        };

        dom_body.appendChild(dom_temp);
        return dom_temp;
    };

    /*
    data = {
      positionX: 100,
      positionY: 100,
      isHtml:true,
      data: '<div>1111</div>',  // 当isHtml为true时，则data传HTML数据；否则传具体字符串
      callback: function(){}
    }
    注意：当isHtml为true：value中为对应的html，其他的属性忽略
    返回右键菜单的根元素，用户可以自定义事件
    * */
    MyTool.prototype.popover = function (data) {
        var $this = this;
        var str = '';
        var dom_body = document.querySelector('body');
        var dom_temp = document.createElement('div');
        dom_temp.className = 'wtc_kztTool_popover-wrap';
        dom_temp.style.cssText = "position:fixed; display:none;font-size:14px;color:#333;line-height:20px;z-index:9999;";
        if (!data.isHtml) dom_temp.style.maxWidth = '200px';

        str += '\n            <div class="wtc_kztTool_popover-triangle wtc_kztTool_popover-triangle-top-left" style="display:none;position:absolute;top:0;left:20px;width: 0;height: 0;border-left: 10px solid transparent;border-right: 10px solid transparent;border-bottom: 10px solid #eee;">\n                <div style="width: 0;height: 0;position: absolute;top: 2px;left: -8px;border-left: 8px solid transparent;border-right: 8px solid transparent;border-bottom: 8px solid #fff;"></div>\n            </div>\n            <div class="wtc_kztTool_popover-triangle wtc_kztTool_popover-triangle-top-right" style="display:none;position:absolute;top:0;right:20px;width: 0;height: 0;border-left: 10px solid transparent;border-right: 10px solid transparent;border-bottom: 10px solid #eee;">\n                <div style="width: 0;height: 0;position: absolute;top: 2px;left: -8px;border-left: 8px solid transparent;border-right: 8px solid transparent;border-bottom: 8px solid #fff;"></div>\n            </div>\n            <div class="wtc_kztTool_popover-triangle wtc_kztTool_popover-triangle-bottom-left" style="display:none;position:absolute;bottom:0;left:20px;width: 0;height: 0;border-left: 10px solid transparent;border-right: 10px solid transparent;border-top: 10px solid #eee;">\n                <div style="width: 0;height: 0;position: absolute;bottom: 2px;left: -8px;border-left: 8px solid transparent;border-right: 8px solid transparent;border-top: 8px solid #fff;"></div>\n            </div>\n            <div class="wtc_kztTool_popover-triangle wtc_kztTool_popover-triangle-bottom-right" style="display:none;position:absolute;bottom:0;right:20px;width: 0;height: 0;border-left: 10px solid transparent;border-right: 10px solid transparent;border-top: 10px solid #eee;">\n                <div style="width: 0;height: 0;position: absolute;bottom: 2px;left: -8px;border-left: 8px solid transparent;border-right: 8px solid transparent;border-top: 8px solid #fff;"></div>\n            </div>\n            <div class="wtc_kztTool_popover" style="margin:2px;padding:10px;border-radius: 2px;box-shadow: rgba(0, 0, 0, 0.24) 0px 1px 8px 0px;background: #fff;box-sizing: border-box;">' + data.data + '</div>\n        ';

        dom_temp.innerHTML = str;

        // 判断菜单位置是否超出屏幕范围：
        var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
        var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;

        // scrollWidth、scrollHeight需要等dom都挂载后才会计算，所以需要异步一下；异步的过程中，会出现右键菜单位置闪动，所以需要先隐藏再显示：
        setTimeout(function () {
            dom_temp.style.display = 'block'; //显示菜单

            if (data.positionX + dom_temp.scrollWidth > clientWidth && data.positionY + dom_temp.scrollHeight > clientHeight) {
                //右下角
                dom_temp.style.left = data.positionX - dom_temp.scrollWidth + 'px';
                dom_temp.style.top = data.positionY - dom_temp.scrollHeight + 'px';
                // document.querySelector('.wtc_kztTool_popover-triangle-bottom-right').style.display = 'block';
            } else if (data.positionX + dom_temp.scrollWidth > clientWidth && data.positionY + dom_temp.scrollHeight <= clientHeight) {
                // 右上角
                dom_temp.style.left = data.positionX - dom_temp.scrollWidth + 'px';
                dom_temp.style.top = data.positionY + 'px';
                // document.querySelector('.wtc_kztTool_popover-triangle-top-right').style.display = 'block';
            } else if (data.positionX + dom_temp.scrollWidth <= clientWidth && data.positionY + dom_temp.scrollHeight > clientHeight) {
                // 左下角
                dom_temp.style.left = data.positionX + 'px';
                dom_temp.style.top = data.positionY - dom_temp.scrollHeight + 'px';
                // document.querySelector('.wtc_kztTool_popover-triangle-bottom-left').style.display = 'block';
            } else {
                // 左上角
                dom_temp.style.left = data.positionX + 'px';
                dom_temp.style.top = data.positionY + 'px';
                // document.querySelector('.wtc_kztTool_popover-triangle-top-left').style.display = 'block';
            }
        }, 0);

        dom_temp.onmouseenter = function (e) {
            $this.popover_isEnter = true;
        };

        dom_temp.onmouseleave = function (e) {
            $this.popover_isEnter = false;
            setTimeout(function () {
                if (!$this.popover_isEnter) {
                    dom_temp.parentElement && dom_temp.parentElement.removeChild(dom_temp);
                }
            }, 100);
        };

        dom_body.appendChild(dom_temp);
        return dom_temp;
    };

    /*
    * 获取该节点到目标节点的距离
    * targetNode = null 表示到屏幕的距离
    * */
    MyTool.prototype.getPosition = function (node, targetNode) {
        var left = node.offsetLeft;
        var top = node.offsetTop;
        var parent = node.offsetParent;
        while (parent && parent !== targetNode) {
            left += parent.offsetLeft;
            top += parent.offsetTop;
            parent = parent.offsetParent;
        }
        return { "left": left, "top": top };
    };

    window.KdWtcMyTool = MyTool;
})();