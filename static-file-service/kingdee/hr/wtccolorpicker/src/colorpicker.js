'use strict';

(function () {
    function Colorpicker(opt) {
        this.myTool = new KdWtcMyTool();
        this.init(opt);
    }

    Colorpicker.prototype = {
        init: function(opt) {
            // 初始化变量：
            var _this = this;
            var el = opt.el,
                type = opt.type,
                color = opt.color;

            this.Opt = {
                model: opt.model,
                el: el,
                color: color,
                status: opt.status,
                tips: opt.tips,
            };

            this.bindElem = this.Opt.model.dom.getElementsByClassName(el)[0]; // 绑定的元素

            // 获取dom：
            var div = this.Opt.model.dom.querySelector(".color-picker-main");
            this.elem_icon = this.Opt.model.dom.querySelector(".color-picker-icon");
            this.elem_selectBtn = this.Opt.model.dom.querySelector(".color-picker-btn-inner");
            this.elem_colorPickerText = this.Opt.model.dom.querySelector(".wtc_colorPicker-text");
            this.elem_colorPickerSelect = this.Opt.model.dom.querySelector(".color-picker-select");

            this.elem_wrap = div; // 最外层容器
            this.fixedBg = div.children[0]; // 拾色器后面固定定位的透明div 用于点击隐藏拾色器
            this.elem_colorPalette = div.getElementsByClassName("color-palette")[0];

            // 判断类型，显示不同的文本（0：日期类型；1：班次）：
            if(type === 0) {
                // 日期类型
                this.elem_colorPickerText.style.display = 'none';
                this.elem_colorPickerSelect.style.borderBottom = 'none';
            }

            // 初始化颜色按钮：
            this.elem_colorPalette.innerHTML = this.getPaletteColorsItem();
            // 初始化弹出框大小：
            this.pancel_width = this.elem_colorPalette.offsetWidth;
            this.pancel_height = this.elem_colorPalette.offsetHeight;
            // 弹出框隐藏
            $(div).css({"display": 'none'});

            //初始化tips：
            let dom_tipsIcon = this.Opt.model.dom.querySelector(".wtc_colorPicker-text-tips");

            dom_tipsIcon.onmouseenter = function (e) {
                _this.myTool.showPopover({
                    target: this,
                    isHtml:true,
                    showTriangle: true,  //是否显示三角形
                    tipsDirection: 'top',
                    data: `<div style="max-width:200px;word-break: break-all;">${_this.Opt.tips}</div>`
                })
            };
            dom_tipsIcon.onmouseleave = function (e) {
                _this.myTool.cancelPopover()
            };

            if(this.Opt.status !== 'VIEW'){
                this.bindElem.addEventListener("click", function () {
                    _this.show();
                }, false);
                this.elem_icon.addEventListener("click", function () {
                    _this.show();
                }, false);
                this.fixedBg.addEventListener("click", function (e) {
                    _this.hide();
                }, false);

                this.elem_colorPalette.addEventListener("click", function (e) {
                    if (e.target.tagName.toLocaleLowerCase() === "p") {
                        let color = $(e.target).attr('bgc');
                        _this.setColorByInput(color);
                        _this.hide();
                        // model.invoke，用于给后端发送请求，第一个参数是事件名，可自定义；第二个参数是发送给后端的数据，可以是任意类型
                        _this.Opt.model.invoke('click', color)
                    }
                }, false);
            } else {
                $(this.elem_colorPickerSelect).css({
                    'borderBottom': '1px solid #e5e5e5',
                    'cursor': 'auto'
                });
                $(this.elem_icon).css({"display": 'none'});
            }

            if(color){
                // 初始化颜色数据：
                this.setColorByInput(color);
            }
        },

        // 获取颜色item对应的dom语句：
        getPaletteColorsItem: function () {
            let str = '';
            let palette = [
                "#276FF5", "#389E0D", "#701DF0", "#16B8B1", "#FF5F1F", "#FF3B72",
                "#16B0F1", "#FF991C", "#8590A6"
            ];
            // let palette = [  // 旧版班次颜色
            //     "#1890FF", "#0FB4B4", "#389E0D", "#D48806", "#C62483", "#722ED1",
            //     "#4059BD", "#D46B08", "#096DD9", "#06868A", "#237804", "#D4B106",
            //     "#2F54EB", "#7CB305"
            // ];
            palette.forEach(function (item) {
                str += `<p bgc="${item}" style="background:${item}"></p>`;
            });
            return str;
        },

        // 设置选中的颜色：
        setColorByInput: function(color) {
            $(this.elem_selectBtn).css({"background": color});
        },

        /*显示颜色面板*/
        show: function() {
            var elem = this.bindElem;
            var top = elem.offsetTop - elem.scrollTop;
            var left = elem.offsetLeft - elem.scrollLeft;
            // 计算出颜色选择器距离屏幕左上角的坐标：
            while (elem.offsetParent) {
                top += elem.offsetParent.offsetTop - elem.offsetParent.scrollTop;
                left += elem.offsetParent.offsetLeft - elem.offsetParent.scrollLeft;
                elem = elem.offsetParent;
            }

            this.pancelLeft = left;
            this.pancelTop = top + this.bindElem.offsetHeight + 12;

            if(this.pancel_width + this.pancelLeft > document.documentElement.clientWidth) this.pancelLeft = document.documentElement.clientWidth-this.pancel_width;
            if(this.pancel_height + this.pancelTop > document.documentElement.clientHeight) this.pancelTop = top-this.pancel_height;

            // 固定弹出框位置
            $(this.elem_wrap).css({
                "left": this.pancelLeft + "px",
                "top": this.pancelTop + "px"
            });

            $(this.elem_wrap).fadeIn(300);

            // 箭头180度旋转
            $(this.elem_icon).css({
                "transform": "rotate(180deg)"
            })
        },

        /*隐藏颜色面板*/
        hide: function() {
            // 箭头180度旋转
            $(this.elem_icon).css({
                "transform": "rotate(0)"
            });
            // 弹出框隐藏
            $(this.elem_wrap).fadeOut(300);
        },

        // 颜色格式转换：
        /*HSBToRGB: function(hsb) {
            var rgb = {};
            var h = Math.round(hsb.h);
            var s = Math.round(hsb.s * 255 / 100);
            var v = Math.round(hsb.b * 255 / 100);

            if (s == 0) {
                rgb.r = rgb.g = rgb.b = v;
            } else {
                var t1 = v;
                var t2 = (255 - s) * v / 255;
                var t3 = (t1 - t2) * (h % 60) / 60;

                if (h == 360) h = 0;

                if (h < 60) {
                    rgb.r = t1;
                    rgb.b = t2;
                    rgb.g = t2 + t3;
                } else if (h < 120) {
                    rgb.g = t1;
                    rgb.b = t2;
                    rgb.r = t1 - t3;
                } else if (h < 180) {
                    rgb.g = t1;
                    rgb.r = t2;
                    rgb.b = t2 + t3;
                } else if (h < 240) {
                    rgb.b = t1;
                    rgb.r = t2;
                    rgb.g = t1 - t3;
                } else if (h < 300) {
                    rgb.b = t1;
                    rgb.g = t2;
                    rgb.r = t2 + t3;
                } else if (h < 360) {
                    rgb.r = t1;
                    rgb.g = t2;
                    rgb.b = t1 - t3;
                } else {
                    rgb.r = 0;
                    rgb.g = 0;
                    rgb.b = 0;
                }
            }

            return { r: Math.round(rgb.r), g: Math.round(rgb.g), b: Math.round(rgb.b)};
        },
        rgbToHex: function(rgb) {
            var hex = [rgb.r.toString(16), rgb.g.toString(16), rgb.b.toString(16)];
            hex.map(function (str, i) {
                if (str.length == 1) {
                    hex[i] = '0' + str;
                }
            });

            return hex.join('');
        },
        hexToRgba: function(hex) {
            return {
                r: parseInt(hex.slice(1, 3), 16),
                g: parseInt(hex.slice(3, 5), 16),
                b: parseInt(hex.slice(5, 7), 16),
                a: hex.length === 9 ? parseInt(hex.slice(-2), 16) / 255 : 1
            };
        },
        hexToHsb: function(hex) {
            return this.rgbToHsb(this.hexToRgba(hex));
        },
        rgbToHsb: function(rgb) {
            var hsb = { h: 0, s: 0, b: 0 };
            var min = Math.min(rgb.r, rgb.g, rgb.b);
            var max = Math.max(rgb.r, rgb.g, rgb.b);
            var delta = max - min;
            hsb.b = max;
            hsb.s = max != 0 ? 255 * delta / max : 0;
            if (hsb.s != 0) {
                if (rgb.r == max) hsb.h = (rgb.g - rgb.b) / delta;else if (rgb.g == max) hsb.h = 2 + (rgb.b - rgb.r) / delta;else hsb.h = 4 + (rgb.r - rgb.g) / delta;
            } else hsb.h = -1;
            hsb.h *= 60;
            if (hsb.h < 0) hsb.h += 360;
            hsb.s *= 100 / 255;
            hsb.b *= 100 / 255;
            return hsb;
        }*/
    };

    window.Colorpicker = Colorpicker;
})();