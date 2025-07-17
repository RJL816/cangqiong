/**
 * @drscription 节点类型图标设计器对象
 * @param designerID 设计器ID
 * @param basePath 基础路径
 */
function NodeTypeDesigner(designerID, basePath) {
    if (designerID == null || designerID == undefined) {
        console.error("参数设计器ID为空");
        return;
    }

    if (typeof (designerID) != "string") {
        console.error("参数设计器ID不是字符");
        return;
    }

    if (designerID.trim().length == 0) {
        console.error("参数设计器ID为空");
        return;
    }

    //设计器ID
    this.designerID = designerID;

    //基础路径
    this.basePath = ".";

    if (designerID != null && designerID != undefined) {
        if (typeof (designerID) == "string") {
            if (designerID.trim().length > 0) {
                this.basePath = basePath;
            }
        }
    }
}

NodeTypeDesigner.prototype = {
    /**
     * 设计器ID
     */
    designerID: "",
    /**
     * 设计器基础路径
     */
    basePath: "",
    /**
     * 空白图片JSON对象
     */
    blankImgJSON: "",
    /**
     * 控件
     */
    ctrl: undefined,
    /**
     * 设计器
     */
    designer: undefined,
    /**
     * 画布
     */
    drawer: undefined,
    /**
     * 设计器主面板DIV（jQuery）
     */
    jQueryDIVMain: undefined,
    /**
     * 设计器主面板DIV
     */
    divMain: undefined,
    /**
     * 画布DIV
     */
    divCanvas: undefined,
    /**
     * DIV_设计器主面板
     */
    CONST_DIVMAINID: "ntdMain",
    /**
     * DIV_画布
     */
    CONST_DIVCANVASID: "ntdCanvas",
    /**
     * 分隔符
     */
    CONST_SPLITSYMBOL: "-",
    /**
     * 设计器控件反馈_更新自定义图形数据
     */
    CONST_RESPONSE_UPDATECUSTOMIMGDATA: "update-custom-img-data",
    /**
     * 设计器控件反馈_更新自定义图形JSON
     */
    CONST_RESPONSE_UPDATECUSTOMIMGJSON: "update-custom-img-json",
    /**
     * @description 检查变量是否为空
     * @param obj 变量
     * @return boolean 布尔值
     */
    isEmpty: function (obj) {
        if (obj == null || obj == undefined) return true;

        return false;
    },
    /**
     * @description 检查变量是否为空字符串
     * @param obj 变量
     * @return boolean 布尔值
     */
    isEmptyString: function (obj) {
        if (this.isEmpty(obj) || typeof (obj) != "string") return true;

        if (obj.trim().length == 0) return true;

        return false;
    },
    /**
     * @description 检查变量是否为数字
     * @param obj 变量
     * @return boolean 布尔值
     */
    isNumber: function (obj) {
        if (this.isEmpty(obj) || typeof (obj) != "number" || Number.isNaN(obj)) return false;

        return true;
    },
    /**
     * @description 检查变量是否为布尔
     * @param obj 变量
     * @return boolean 布尔值
     */
    isBoolean: function (obj) {
        if (this.isEmpty(obj) || typeof (obj) != "boolean") return false;

        return true;
    },
    /**
     * @description 检查数组是否为空
     * @param arr 数组
     * @return boolean 布尔值
     */
    isEmptyArray: function (obj) {
        if (this.isEmpty(obj) || typeof (obj) != "object") return true;

        if (obj.length == 0) return true;

        return false;
    },
    /**
     * @description 创建画板插件数组
     * @return Array 画板插件数组
     */
    createDrawerPlugins: function () {
        var tmpDrawerPlugins = [
            'UploadImgData',
            'ClearButton',
            'Pencil',
            'Eraser',
            'Text',
            'Line',
            'ArrowOneSide',
            'ArrowTwoSide',
            'Triangle',
            'Rectangle',
            'Circle',

            'Color',
            'ShapeBorder',
            'BrushSize',
            'ShapeContextMenu',
            'ToggleVisibilityButton',
            'OvercanvasPopup',
            'OpenPopupButton',
            'Zoom',
            'OpacityOption',
            'LineWidth',
            'StrokeWidth',

            'TextLineHeight',
            'TextAlign',
            'TextFontFamily',
            'TextFontSize',
            'TextFontWeight',
            'TextFontStyle',
            'TextDecoration',
            'TextColor',
            'TextBackgroundColor'
        ];

        return tmpDrawerPlugins;
    },
    /**
     * @description 创建画板插件配置对象
     * @return Object 画板插件配置对象
     */
    createDrawerPluginsConfig: function () {
        var tmpDrawerPluginConfig = {
            ShapeBorder: {
                color: 'rgba(0, 0, 0, 0)'
            },
            Pencil: {
                cursorUrl: 'pencil',
                brushSize: 3
            },
            Eraser: {
                brushSize: 5
            },
            Circle: {
                centeringMode: 'normal'
            },
            Rectangle: {
                centeringMode: 'normal'
            },
            Triangle: {
                centeringMode: 'normal'
            },
            Text: {
                fonts: {
                    'Consolas': "Consolas, Monaco, monospace",
                    'Georgia': 'Georgia, serif',
                    'Palatino': "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
                    'Times New Roman': "'Times New Roman', Times, serif",
                    'Arial': 'Arial, Helvetica, sans-serif',
                    'Arial Black': "'Arial Black', Gadget, sans-serif",
                    'Comic Sans MS': "'Comic Sans MS', cursive, sans-serif",
                    'Impact': 'Impact, Charcoal, sans-serif',
                    'Lucida Grande': "'Lucida Sans Unicode', 'Lucida Grande', sans-serif",
                    'Tahoma': 'Tahoma, Geneva, sans-serif',
                    'Trebuchet MS': "'Trebuchet MS', Helvetica, sans-serif",
                    'Verdana': 'Verdana, Geneva, sans-serif',
                    'Courier New': "'Courier New', Courier, monospace",
                    'Lucida Console': "'Lucida Console', Monaco, monospace"
                },
                defaultFont: 'Consolas',
                editIconMode: false,
                defaultValues: {
                    fontSize: 72,
                    lineHeight: 2,
                    textFontWeight: 'bold'
                },
                predefined: {
                    fontSize: [8, 12, 14, 16, 32, 40, 72],
                    lineHeight: [1, 2, 3, 4, 6]
                }
            },
            ShapeContextMenu: {
                position: {
                    touch: 'pointer',
                    mouse: 'cursor'
                }
            },
            Zoom: {
                enabled: true,
                showZoomTooltip: true,
                useWheelEvents: false,
                zoomStep: 1.2,
                defaultZoom: 1,
                maxZoom: 2,
                minZoom: 0.2,
                smoothnessOfWheel: 0,
                enableMove: true,
                enableWhenNoActiveTool: true,
                enableButton: true
            },
            Image: {
                scaleDownLargeImage: true,
                maxImageSizeKb: 128,
                cropIsActive: true
            },
            BackgroundImage: {
                scaleDownLargeImage: true,
                maxImageSizeKb: 128,
                acceptedMIMETypes: ['image/jpeg', 'image/png', 'image/gif'],
                dynamicRepositionImage: true,
                dynamicRepositionImageThrottle: 100,
                cropIsActive: false
            }
        };

        return tmpDrawerPluginConfig;
    },
    /**
     * @description 创建画板对象
     * @param container 容器
     * @return Object 画板对象
     */
    createDrawer: function (container) {
        if (this.isEmpty(container)) {
            console.error("参数容器为空");

            return;
        }

        if (!this.isNumber(container.length)) {
            console.error("参数容器为空");

            return;
        }

        if (container.length == 0) {
            console.error("参数容器为空");

            return;
        }

        var width = container.width();

        var height = container.height();

        var tmpContainer = container[0];

        if (this.isEmpty(tmpContainer)) {
            console.error("参数容器为空");

            return;
        }

        var containerID = tmpContainer.id;

        if (this.isEmptyString(containerID)) {
            console.error({ msg: "参数容器的ID为空", param: tmpContainer });

            return;
        }

        var tmpDrawerPlugins = this.createDrawerPlugins();

        var tmpDrawerPluginConfig = this.createDrawerPluginsConfig();

        var tmpDrawer = new DrawerJs.Drawer(null, {
            toolbarSize: 35,
            toolbarSizeTouch: 43,
            tooltipCss: {
                color: 'white',
                background: 'black'
            },
            backgroundCss: 'transparent',
            activeColor: '#19A6FD',
            canvasProperties: {
                selectionColor: 'rgba(255, 255, 255, 0.3)',
                selectionDashArray: [3, 8],
                selectionBorderColor: '#5f5f5f'
            },
            objectControls: {
                borderColor: 'rgba(102,153,255,0.75)',
                borderOpacityWhenMoving: 0.4,
                cornerColor: 'rgba(102,153,255,0.5)',
                cornerSize: 12,
                hasBorders: true
            },
            objectControlsTouch: {
                borderColor: 'rgba(102,153,255,0.75)',
                borderOpacityWhenMoving: 0.4,
                cornerColor: 'rgba(102,153,255,0.5)',
                cornerSize: 20,
                hasBorders: true
            },
            defaultImageUrl: this.basePath + "/src/drawer.jpg",
            basePath: this.basePath,
            plugins: tmpDrawerPlugins,
            pluginsConfig: tmpDrawerPluginConfig,
            defaultActivePlugin: { name: 'Pencil', mode: 'onNew' },
            transparentBackground: false,
            exitOnOutsideClick: false,
            editOnClick: false,
            toolbars: {
                drawingTools: {
                    position: 'top',
                    positionType: 'inside',
                    compactType: 'scrollable',
                    hidden: false,
                    toggleVisibilityButton: false,
                    fullscreenMode: {
                        position: 'top',
                        hidden: false,
                        toggleVisibilityButton: false
                    }
                },
                toolOptions: {
                    position: 'bottom',
                    positionType: 'inside',
                    compactType: 'scrollable',
                    hidden: false,
                    toggleVisibilityButton: false,
                    fullscreenMode: {
                        position: 'bottom',
                        compactType: 'popup',
                        hidden: false,
                        toggleVisibilityButton: false
                    }
                },
                settings: {
                    position: 'right',
                    positionType: 'inside',
                    compactType: 'scrollable',
                    hidden: false,
                    toggleVisibilityButton: false,
                    fullscreenMode: {
                        position: 'bottom',
                        hidden: true,
                        toggleVisibilityButton: true
                    }
                }
            },
            texts: {
                'Add Drawer': 'Add Drawer',
                'Insert Drawer': 'Insert Drawer',
                'Insert': 'Insert',
                'Free drawing mode': 'Free drawing mode',
                'SimpleWhiteEraser': 'SimpleWhiteEraser',
                'Eraser': 'Eraser',
                'Delete this canvas': 'Delete this canvas',
                'Are you sure want to delete this canvas?': 'Are you sure want to delete this canvas?',

                'Size (px)': 'Size (px)',
                'Position': 'Position',
                'Inline': 'Inline',
                'Left': 'Left',
                'Center': 'Center',
                'Right': 'Right',
                'Floating': 'Floating',
                'Canvas properties': 'Canvas properties',
                'Background': 'Background',
                'transparent': 'transparent',
                'Cancel': 'Cancel',
                'Save': 'Save',

                'Enter fullscreen mode': 'Enter fullscreen mode',
                'Exit fullscreen mode': 'Exit fullscreen mode',

                'Bring forward': 'Bring forward',
                'Send backwards': 'Send backwards',
                'Bring to front': 'Bring to front',
                'Send to back': 'Send to back',
                'Duplicate': 'Duplicate',
                'Remove': 'Remove',

                'Size:': 'Size:',

                'Fill:': 'Fill:',
                'Transparent': 'Transparent',

                'Border:': 'Border:',
                'None': 'None',

                'Draw an arrow': 'Draw an arrow',
                'Draw a two-sided arrow': 'Draw a two-sided arrow',
                'Lines and arrows': 'Lines and arrows',

                'Draw a circle': 'Draw a circle',

                'Draw a line': 'Draw a line',

                'Draw a rectangle': 'Draw a rectangle',

                'Draw a triangle': 'Draw a triangle',

                'Draw a Polygon': 'Draw a Polygon',
                'Stop drawing a polygon': 'Stop drawing a polygon (esc)',
                'Click to start a new line': 'Click to start a new line',

                'Draw a text': 'Draw a text',
                'Click to place a text': 'Click to place a text',
                'Font:': 'Font:',

                'Move canvas': 'Move canvas',

                'Click to start drawing a ': 'Click to start drawing a '
            }
        }, width, height);

        tmpDrawer.designerID = this.designerID;

        tmpDrawer.drawerContainerID = containerID;

        return tmpDrawer;
    },
    /**
     * @description 初始化
     * @param  ctrl 控件
     */
    initial: function (ctrl) {
        if (this.isEmpty(ctrl)) {
            console.error("参数控件为空");

            return;
        }

        this.ctrl = ctrl;

        var ctrlDOM = ctrl.dom;

        if (this.isEmpty(ctrlDOM)) {
            console.error("获取控件DOM失败");

            return;
        }

        var suffix = this.CONST_SPLITSYMBOL + this.designerID;

        //如果已创建画板对象则不重复执行
        if (!this.isEmpty(this.drawer)) return;

        //获取画布DIV
        var divCanvasID = this.CONST_DIVCANVASID + suffix;
        this.divCanvas = document.getElementById(divCanvasID);

        if (this.isEmpty(this.divCanvas)) {
            this.divCanvas = document.createElement("div");
            this.divCanvas.id = divCanvasID;

            this.divCanvas.style.display = "none";
            this.divCanvas.style.width = "100%";

            ctrlDOM.appendChild(this.divCanvas);
        }

        //获取设计器主DIV
        var divMainID = this.CONST_DIVMAINID + suffix;
        this.divMain = document.getElementById(divMainID);

        if (this.isEmpty(this.divMain)) {
            this.divMain = document.createElement("div");
            this.divMain.id = divMainID;

            this.divMain.setAttribute("class", "ntdMain");

            ctrlDOM.appendChild(this.divMain);
        }

        this.jQueryDIVMain = $("#" + divMainID);

        if (this.isEmpty(this.jQueryDIVMain)) {
            console.error("获取DIV元素" + CONST_DIVMAINID + "失败");

            return;
        }

        if (this.jQueryDIVMain.length == 0) {
            console.error("获取DIV元素" + CONST_DIVDMAINID + "失败");

            return;
        }

        this.drawer = this.createDrawer(this.jQueryDIVMain);

        if (this.isEmpty(this.drawer)) {
            console.error("创建画板对象失败");

            return;
        }

        this.jQueryDIVMain.append(this.drawer.getHtml());

        this.drawer.onInsert();

        this.drawer.api.startEditing();

        this.blankImgJSON = this.drawer.api.getCanvasAsJSON();

        this.drawer.designer = this;

        this.divMain.ntd = this;

        window.onresize = function () {
            var ntdMains = document.getElementsByClassName("ntdMain");

            if (!ntdMains) return;

            if (ntdMains.length == 0) return;

            var ntdMainsLength = ntdMains.length;

            var ntdIDArray = [];

            for (var index = 0; index < ntdMainsLength; index++) {
                var ntdMain = ntdMains[index];

                if (!ntdMain) continue;

                if (!ntdMain.ntd) continue;

                var tmpDesignerID = ntdMain.ntd.designerID;

                if (ntdIDArray.indexOf(tmpDesignerID) >= 0) continue;

                ntdIDArray.push(tmpDesignerID);

                var ntd = ntdMain.ntd;

                if (ntd.isEmpty(ntd.divMain)) continue;

                var divMainID = ntd.divMain.id;

                if (ntd.isEmptyString(divMainID)) continue;

                var width = $("#" + divMainID).width();

                var height = $("#" + divMainID).height();

                ntd.drawer.api.setSize(width, height);
            }
        };

    },
    /**
     * @description 加载画板内容
     * @param imgJSON 图形JSON
     */
    load: function (imgJSON) {
        if (this.isEmptyString(imgJSON)) {
            console.error("参数图形JSON为空");

            return;
        }

        if (this.isEmpty(this.drawer)) {
            console.error("获取画板对象失败");

            return;
        }

        this.drawer.api.loadCanvasFromData(imgJSON);
    },
    /**
     * @description 保存画布内容
     */
    save: function () {
        if (this.isEmpty(this.drawer)) {
            console.error("获取画板对象失败");

            return;
        }

        var imgData = this.drawer.api.getCanvasAsImage();

        var imgJSON = this.drawer.api.getCanvasAsJSON();

        if (this.isEmptyString(imgData) || this.isEmptyString(imgJSON)) {
            console.error({ msg: "获取画布内容失败", param: ntdDrawer });

            return;
        }

        if (this.isEmpty(this.ctrl)) {
            console.error("获取设计器失败");

            return;
        }

        this.ctrl.invoke(this.CONST_RESPONSE_UPDATECUSTOMIMGDATA, imgData);

        this.ctrl.invoke(this.CONST_RESPONSE_UPDATECUSTOMIMGJSON, imgJSON);

    },
    /**
     * @description 清除画布内容
     */
    clear: function () {
        if (this.isEmpty(this.drawer)) {
            console.error("获取画板对象失败");

            return;
        }

        if (this.isEmpty(this.blankImgJSON)) this.blankImgJSON = new Object();

        this.drawer.api.loadCanvasFromData(this.blankImgJSON);
    },
    /**
     * @description 设置画布是否可编辑
     * @param editable 是否可编辑
     */
    setEditable: function (editable) {
        if (!this.isBoolean(editable)) {
            console.error("参数是否可编辑不是有效的数字");

            return;
        }

        if (this.isEmpty(this.drawer)) {
            console.error("获取画板对象失败");

            return;
        }

        if (editable) {
            this.drawer.api.startEditing();
        } else {
            this.drawer.api.stopEditing();
        }

    },
    /**
     * @description 关闭
     */
    destory: function () {
        if (this.isEmpty(this.drawer)) {
            console.error("获取画板对象失败");

            return;
        }

        this.drawer.api.stopEditing();

        this.drawer = undefined;

        if (this.isEmpty(this.divCanvas)) {
            console.error("获取DIV " + this.CONST_DIVCANVASID + " 失败");

            return;
        }


        var parentDIV = isEmpty(this.divCanvas) ? null : this.divCanvas.parentElement;

        if (!this.isEmpty(parentDIV)) {
            while (parentDIV.childElementCount > 0) {
                parentDIV.removeChild(parentDIV.children[0]);
            };
        }

    }
}
