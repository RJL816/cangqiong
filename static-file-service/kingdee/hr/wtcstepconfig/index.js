(function (KDApi, $) {
    function StepConfig(model) {
        this._setModel(model)
    }

    StepConfig.prototype = {
        _setModel: function (model) {
            this.model = model
        },
        init: function (props) {
            // this.uniqueId = new Date().getTime();
            // this.themeNum = props.themeNum;
            // this.initFunc(this.model, props);
            this.timestamp = null;
        },
        update: function (props) {
            if (props.data && props.data.event === 'init') {
                this.uniqueId = new Date().getTime();
                this.themeNum = props.themeNum;
                this.initFunc(this.model, props);
            }
            /*点击保存、提交、保存并提交按钮触发*/
            if (props.data && (props.data.event === 'savedata' || props.data.event === 'submitdata' || props.data.event === 'saveauditdata' || props.data.event === 'savedatanew')) {
                if(props.data.timestamp !== this.timestamp) {
                    this.model.invoke(props.data.event, {data: this.stepConfig.data.data});
                    this.timestamp = props.data.timestamp;
                }
            }
            /*新增阶段*/
            if (props.data && props.data.event === 'addphase') {
                this.stepConfig.addPhase(props.data.position, props.data.data)
            }

            /*编辑阶段*/
            if (props.data && props.data.event === 'editphase') {
                this.stepConfig.modifyPhase(props.data.position, props.data.data)
            }

            /*改变状态，从编辑态到查看态，从查看态到编辑态*/
            if (props.data && props.data.event === 'refreshStatus') {
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
                    openAll: KDApi.getLangMsg(model, 'openAll'),
                    foldAll: KDApi.getLangMsg(model, 'foldAll'),
                    start: KDApi.getLangMsg(model, 'start'),
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


            // type:页面状态 0:编辑态 1:查看态
            // del:可删除
            // syspreset:系统预制
            // index:排序号
            // resulttype:结果类型 '0':'项目值' '1':'时间对'
            // calrule:计算规则 '0':'自定义编码' '1':'自定义公式'
            // repeat:是否可重复
            // phaseresultdeal: 'xxx',  //高级配置tips内容
            // phasesave: 'xxx',   //高级配置tips内容
            // noreturnhandler: 'xxx',   //高级配置tips内容

            /*props = {
                data: {
                    event: 'init',
                    type: 0,    // 0编辑态， 1查看态
                    updatedate: '2021-08-11',
                    updateby: '张三',
                    power: true,  //是否有权限
                    phaseresultdeal: 'xxx',  //高级配置tips内容
                    phasesave: 'xxx',   //高级配置tips内容
                    noreturnhandler: 'xxx',   //高级配置tips内容
                    data: [
                        {
                            edit: false,
                            phase: '阶段1',
                            phaseId: 123,   //阶段id
                            move: true,  //是否可移动
                            del: true,
                            phaseResultDeal: 0,  //阶段结果处理：0合并，1覆盖
                            phaseSave: 0,  //阶段落库：0否，1 是
                            noReturnHandler: 0,  //无输出决策器：0下一步，1继续，2跳出，3终止，4错误
                            steps: [
                                {
                                    id: 13213151231511,
                                    step: '步骤1',
                                    del: true,
                                    syspreset: false,
                                    index: 1,
                                    bitindex: 1,
                                    startdate: '2021-08-11',
                                    enddate: '2021-08-12',
                                    resultType: '1',
                                    calrule: '1',
                                    repeat: false,
                                    move: true,  //是否可移动
                                    noReturnHandler: 4,  //无输出决策器：0下一步，1继续，2跳出，3终止，4错误
                                }, {
                                    id: 13213151231512,
                                    step: '步骤2',
                                    del: false,
                                    syspreset: false,
                                    index: 2,
                                    bitindex: 3,
                                    startdate: '2021-08-11',
                                    enddate: '2021-08-12',
                                    resultType: '1',
                                    calrule: '1',
                                    repeat: false,
                                    move: true,  //是否可移动
                                    desc: "",   //描述
                                    noReturnHandler: 0,  //无输出决策器：0下一步，1继续，2跳出，3终止，4错误
                                }, {
                                    id: 13213151231513,
                                    step: '步骤3',
                                    del: false,
                                    syspreset: false,
                                    index: 3,
                                    bitindex: 2,
                                    startdate: '2021-08-11',
                                    enddate: '2021-08-12',
                                    resultType: '1',
                                    calrule: '1',
                                    repeat: false,
                                    move: true,  //是否可移动
                                    desc: "啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊",   //描述
                                    noReturnHandler: 0,  //无输出决策器：0下一步，1继续，2跳出，3终止，4错误
                                }
                            ]
                        },
                        {
                            edit: false,
                            phase: '阶段2',
                            phaseId: 2,   //阶段id
                            move: false,  //是否可移动
                            del: true,
                            phaseResultDeal: 1,  //阶段结果处理：0合并，1覆盖
                            phaseSave: 1,  //阶段落库：0否，1 是
                            noReturnHandler: 1,  //无输出决策器：0下一步，1继续，2跳出，3终止，4错误

                            steps: [{
                                id: 13213151231514,
                                step: '步骤4',
                                del: false,
                                syspreset: false,
                                index: 0,
                                bitindex: 0,
                                startdate: '2021-08-11',
                                enddate: '2021-08-12',
                                resultType: '1',
                                calrule: '1',
                                repeat: false,
                                move: false,  //是否可移动
                                desc: "xxxx",   //描述
                                noReturnHandler: 0,  //无输出决策器：0下一步，1继续，2跳出，3终止，4错误
                            }, {
                                id: 13213151231515,
                                step: '步骤5',
                                del: true,
                                syspreset: false,
                                index: 5,
                                bitindex: 3,
                                startdate: '2021-08-11',
                                enddate: '2021-08-12',
                                resultType: '1',
                                calrule: '1',
                                repeat: false,
                                move: false,  //是否可移动
                                desc: "xxxx",   //描述
                                noReturnHandler: 0,  //无输出决策器：0下一步，1继续，2跳出，3终止，4错误
                            }, {
                                id: 13213151231516,
                                step: '步骤6',
                                del: false,
                                syspreset: false,
                                index: 6,
                                bitindex: 1,
                                startdate: '2021-08-11',
                                enddate: '2021-08-12',
                                resultType: '1',
                                calrule: '1',
                                repeat: true,
                                move: false,  //是否可移动
                                desc: "xxxx",   //描述
                                noReturnHandler: 0,  //无输出决策器：0下一步，1继续，2跳出，3终止，4错误
                            }
                            ]
                        },
                        {
                            edit: true,
                            phase: '阶段3',
                            phaseId: 3,   //阶段id
                            move: true,  //是否可移动
                            del: true,
                            phaseResultDeal: 0,  //阶段结果处理：0合并，1覆盖
                            phaseSave: 0,  //阶段落库：0否，1 是
                            noReturnHandler: 2,  //无输出决策器：0下一步，1继续，2跳出，3终止，4错误

                            steps: [{
                                id: 13213151231517,
                                step: '步骤7',
                                del: true,
                                syspreset: false,
                                index: 0,
                                bitindex: 0,
                                startdate: '2021-08-11',
                                enddate: '2021-08-12',
                                resultType: '1',
                                calrule: '1',
                                repeat: false,
                                move: true,  //是否可移动
                                desc: "xxxx",   //描述
                                noReturnHandler: 0,  //无输出决策器：0下一步，1继续，2跳出，3终止，4错误
                            }]
                        }
                    ]
                }
            };*/

            var para = {
                model: model,
                data: props.data,
                KDApi: KDApi,
                uniqueId: this.uniqueId,
                themeNum: this.themeNum
            };

            this.stepConfig = new KdWtcStepConfig(para);
        },
    };

    KDApi.register('wtcstepconfig', StepConfig, {isMulLang: true})
})(window.KDApi, jQuery);