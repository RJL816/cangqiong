(function (KDApi, $) {
    function StepConfig(model) {
        this._setModel(model)
    }

    StepConfig.prototype = {
        _setModel: function (model) {
            this.model = model
        },
        init: function (props) {
            this.uniqueId = new Date().getTime();
            this.themeNum = props.themeNum;
            let dataObj = JSON.parse(props.data);
            props.data = dataObj;
            this.initFunc(this.model, props);
            this.timestamp = null;
        },
        update: function (props) {
            props.data = JSON.parse(props.data);
            if (props.data && props.data.operate === 'init') {
                this.uniqueId = new Date().getTime();
                this.themeNum = props.themeNum;
                this.initFunc(this.model, props);
            }
            if (props.data && props.data.operate === 'click') {
                this.stepConfig.reBuildLine();
            }

            if (props.data && (props.data.operate === 'add' || props.data.operate === 'copy')) {
                this.stepConfig.addPhase_inner(props.data.data[0].nodes[0].nodeSeq, props.data.data[0].nodes, props.data.data[0].workflowType)
            }

            if (props.data && props.data.operate === 'edit') {
                // this.stepConfig.modifyPhase(props.data.position, props.data.data)
                this.stepConfig.editphase(props.data.data[0].nodes[0].nodeSeq, props.data.data[0].nodes[0], props.data.data[0].workflowType)
            }

            if (props.data && props.data.operate === 'delete') {
                this.stepConfig.deleteNode(props.data)
            }

            if (props.data && props.data.operate === 'refreshStatus') {
                if(props.data.timestamp !== this.timestamp) {
                    this.stepConfig.refreshStatus(props.data.type);
                }
            }
        },
        destoryed: function () {
            $(document).off('keyup.stepConfig_keyup_' + this.uniqueId);// 防止事件被多次注册
            $(window).off('resize.stepConfig_resize_' + this.uniqueId);// 防止事件被多次注册
            $('._2IuNtC78.hover-theme-fc').off('click.stepConfig_click_' + this.uniqueId);// 防止事件被多次注册
            $('._1dWRVXYw').off('click.stepConfig_click_1dWRVXYw_' + this.uniqueId);// 防止事件被多次注册
        },

        initFunc: function (model, props) {
            let $this = this;
            // KDApi.loadFile可以通过路径加载js或css文件，并且在html文件头生成script或者link标签，第一个参数是路径，第二个参数是model，第三个参数是加载完成后执行的回调函数
            // KDApi.loadFile(['./css/stepConfig.css', './src/stepConfig.js', './src/myTool.js'], model, function() {
            KDApi.loadFile(['./css/stepConfig.css', './js/stepConfig.js', './js/myTool.js'], model, function () {
                // 通过路径去获取html字符串，第一个参数是路径，第二个参数是model，第三个参数是HTML模板中变量的值
                KDApi.getTemplateStringByFilePath('./html/stepConfig.art', model, {
					flowTitle: KDApi.getLangMsg(model, 'flowTitle'),
                    themeNum: props.themeNum || '#276FF5'
                }).then(function (result) {
                    model.dom.innerHTML = result;
                    // 初始化
                    $this.initStepConfig(model, props);
                })
            })
        },

        initStepConfig: function (model, props) {
            // 后端插件通过setData传给前端的数据，前端可以通过props.data去获取
            var $this = this;

           /* props = {
                data: {
                    operate: 'init',  //操作
                    type: 0,    // 0编辑态， 1查看态
                    checked: '1,1',  //选中流程节点                 
                    data: [
                        {
                            flowSeq: false,
                            flowName: '主流程',
                            isMatrixProc: false,
			                isMajorProc: true,
                            nodes: [
                                {
                                    "nodeSeq": 1,
                                    "nodeName": "自我评估",
                                    "nodeTypeName": "自评",
                                    "nodeWeight": 10,
                                    "isLast": false
                                },
                                {
                                    "nodeSeq": 2,
                                    "nodeName": "同事互评",
                                    "nodeTypeName": "互评",
                                    "nodeWeight": 20,
                                    "isLast": false
                                },
                                {
                                    "nodeSeq": 3,
                                    "nodeName": "直接上级评估",
                                    "nodeTypeName": "上级评估",
                                    "nodeWeight": 50,
                                    "isLast": false
                                }
                            ]
                        },
                        {
                            edit: false,
                            phase: '流程2',
                            phaseId: '10%',   //阶段id
                            phaseType: '同事', 
                            move: false,  //是否可移动
                            del: true,
                            phaseResultDeal: 1,  //阶段结果处理：0合并，1覆盖
                            phaseSave: 1,  //阶段落库：0否，1 是
                            noReturnHandler: 1,  //无输出决策器：0下一步，1继续，2跳出，3终止，4错误
                        }
                       
                    ]
                }
            }; */

            var para = {
                model: model,
                data: props.data,
                KDApi: KDApi,
                uniqueId: this.uniqueId,
                themeNum: this.themeNum
            };

            this.stepConfig = new KdOpmcStepConfig(para);
        },
    };

    KDApi.register('opmcworkflow', StepConfig, {isMulLang: true})
})(window.KDApi, jQuery);