(function (KDApi, $) {
    function CalculationReport(model) {
        this._setModel(model)
    }

    CalculationReport.prototype = {
        _setModel: function (model) {
            this.model = model
        },
        init: function (props) {
            /*props.data = {
                "event": "init",
                args: {
                    "color": "#DC143C",
                    "createId": 1409487252102338560,
                    "group": "考勤计算报告",
                    "index": 1,
                    "version": "V2022-09-0700000001",
                    "children": [{
                        "group": "参数初始化",
                        "index": 1,
                        "labels": [{"index": 1, "key": "耗时", "type": "view", "value": "00 : 00 : 18"}],
                        "children": [
                            {
                                "group": "有效卡",
                                "index": 1,
                                "labels": [
                                    {"index": 1, "key": "参数编码", "type": "view", "value": "LOGIC_CARD"},
                                    {
                                        "index": 2,
                                        "key": "耗时(毫秒)",
                                        "type": "view",
                                        "value": "93"
                                    },
                                    {"index": 3, "key": "初始化结果", "type": "view", "value": "{\"cache\":{}}"}
                                ]
                            },
                            {
                                "group": "考勤项目定义",
                                "index": 2,
                                "labels": [{"index": 1, "key": "参数编码", "type": "view", "value": "ATT_ITEM_SPEC"}, {
                                    "index": 2,
                                    "key": "耗时",
                                    "type": "view",
                                    "value": "00 : 00 : 01"
                                }, {
                                    "index": 3,
                                    "key": "初始化结果",
                                    "type": "click",
                                    "value": "{\"bid2SpecBo\":{1438448696617337856:{\"boVersion\":{\"bid\":1438448696617337856,\"combo\":false,\"dataAccuracy\":2,\"dataType\":\"DURATION\",\"id\":1438448696617337856,\"itemType\":\"1\",\"lastTermItemBid\":0,\"lastYearItemBid\":0,\"name\":\"早到时长\",\"number\":\"EX_1050_S\",\"origin",
                                    "vid": "1504179571614845953"
                                }]
                            },
                            {
                                "group": "排班表",
                                "index": 3,
                                "labels": [
                                    {"index": 1, "key": "参数编码", "type": "view", "value": "ROSTER"},
                                    {
                                        "index": 2,
                                        "key": "耗时",
                                        "type": "view",
                                        "value": "00 : 00 : 04"
                                    }, {
                                        "index": 3,
                                        "key": "初始化结果",
                                        "type": "click",
                                        "value": "{\"shiftTableMap\":{1500165080724134912:{\"attPersonId\":1500165080724134912,\"rosterSpecMap\":{\"2021-07-31\":{\"dateAttribute\":\"OFFDAY\",\"dateType\":{\"id\":1020,\"number\":\"1020_S\"},\"holiday\":\"\",\"id\":0,\"rosterDate\":\"2021-07-31\",\"rosterType\":\"0\",\"shiftSpec\":{\"all",
                                        "vid": "1504179571950389248"
                                    }]
                            },
                            {
                                "group": "单据时段信息",
                                "index": 4,
                                "labels": [{
                                    "index": 1,
                                    "key": "参数编码",
                                    "type": "view",
                                    "value": "BILL_TIME_BUCKET"
                                }, {"index": 2, "key": "耗时", "type": "view", "value": "00 : 00 : 09"}, {
                                    "index": 3,
                                    "key": "初始化结果",
                                    "type": "view",
                                    "value": "{\"btbId2Btb\":{}}"
                                }]
                            },
                            {
                                "group": "舍入规则",
                                "index": 5,
                                "labels": [{"index": 1, "key": "参数编码", "type": "view", "value": "ROUND_SPEC"}, {
                                    "index": 2,
                                    "key": "耗时(毫秒)",
                                    "type": "view",
                                    "value": "900"
                                }, {
                                    "index": 3,
                                    "key": "初始化结果",
                                    "type": "click",
                                    "value": "{1128796057313014784:{\"id\":1128796057313014784,\"roundList\":[{\"circulate\":true,\"containLower\":false,\"containUpper\":false,\"lowerLimitValue\":0.000000,\"originValue\":false,\"targetValue\":0.500000,\"upperLimitValue\":1.000000}]},1128796744214180864:{\"id\":1128",
                                    "vid": "1504179571950389251"
                                }]
                            },
                            {
                                "group": "人员考勤期间",
                                "index": 6,
                                "labels": [{"index": 1, "key": "参数编码", "type": "view", "value": "ATT_PERIOD"}, {
                                    "index": 2,
                                    "key": "耗时",
                                    "type": "view",
                                    "value": "00 : 00 : 02"
                                }, {
                                    "index": 3,
                                    "key": "初始化结果",
                                    "type": "click",
                                    "value": "{\"perAttPeriodMap\":{1500165080724134912:[{\"attPeriodId\":1499185308380474391,\"fileBoId\":1500165730757343232,\"fileId\":1500165868414401555,\"id\":\"1500165080724134912_14991853083804743912021-07-01\",\"mhsa\":1473188824501805056,\"perAttBeginDate\":162506880000",
                                    "vid": "1504179571950390275"
                                }]
                            },
                            {
                                "group": "出勤状态定义",
                                "index": 7,
                                "labels": [{
                                    "index": 1,
                                    "key": "参数编码",
                                    "type": "view",
                                    "value": "ATT_STATUS_RELATION"
                                }, {"index": 2, "key": "耗时", "type": "view", "value": "00 : 00 : 01"}, {
                                    "index": 3,
                                    "key": "初始化结果",
                                    "type": "view",
                                    "value": "{\"bid2SpecBo\":{}}"
                                }]
                            },
                            {
                                "group": "打卡标识定义",
                                "index": 8,
                                "labels": [{"index": 1, "key": "参数编码", "type": "view", "value": "CHECKPOINT_TAG"}, {
                                    "index": 2,
                                    "key": "耗时",
                                    "type": "view",
                                    "value": "00 : 00 : 01"
                                }, {
                                    "index": 3,
                                    "key": "初始化结果",
                                    "type": "click",
                                    "value": "{\"bid2SpecBo\":{1409486356291257344:{\"boVersion\":{\"bid\":1409486356291257344,\"id\":1409486356291257344,\"number\":\"A_001\",\"timeCardRelationEntryPackageList\":[{\"punchCardExceptionType\":\"1\",\"punchCardTag\":\"1030_S\",\"shiftTimeBucketProperty\":\",1010_S,\",\"timeC",
                                    "vid": "1504179571958778880"
                                }]
                            },
                            {
                                "group": "考勤项目对标签状态定义",
                                "index": 9,
                                "labels": [{
                                    "index": 1,
                                    "key": "参数编码",
                                    "type": "view",
                                    "value": "ATT_LABEL_RELATION"
                                }, {"index": 2, "key": "耗时", "type": "view", "value": "00 : 00 : 01"}, {
                                    "index": 3,
                                    "key": "初始化结果",
                                    "type": "click",
                                    "value": "{\"bid2SpecBo\":{1322304085419912192:{\"boVersion\":{\"attItemLabelEntryPackageList\":[{\"attItem\":\"OR_1100_S,OR_1100_S,OR_1010_S,OR_1010_S\",\"attStatus\":\"1012_S\",\"dateType\":\",DS-0001:2,\",\"pairLabel\":\"1010_S\",\"shiftTimeBucketProperty\":\",1020_01_S,1020_02_S,\"",
                                    "vid": "1504179571958777856"
                                }]
                            },
                            {
                                "group": "假期映射表",
                                "index": 10,
                                "labels": [{"index": 1, "key": "参数编码", "type": "view", "value": "HOLIDAY_MAP"}, {
                                    "index": 2,
                                    "key": "耗时(毫秒)",
                                    "type": "view",
                                    "value": "709"
                                }, {
                                    "index": 3,
                                    "key": "初始化结果",
                                    "type": "click",
                                    "value": "{1480326428737238016:{\"dateAttribute\":\"HOLIDAY\",\"dateType\":{\"dateAttribute\":\"HOLIDAY\",\"id\":1422518709926276096,\"number\":\"DT00023\"},\"id\":1480326428737238016,\"number\":\"3169\"},1493488343307089920:{\"dateAttribute\":\"HOLIDAY\",\"dateType\":{\"dateAttribute\":\"H",
                                    "vid": "1504179571958778883"
                                }]
                            },
                            {
                                "group": "配置组合",
                                "index": 11,
                                "labels": [{"index": 1, "key": "参数编码", "type": "view", "value": "CONFIG_MIX"}, {
                                    "index": 2,
                                    "key": "耗时",
                                    "type": "view",
                                    "value": "00 : 00 : 02"
                                }, {
                                    "index": 3,
                                    "key": "初始化结果",
                                    "type": "click",
                                    "value": "{\"attitemmap\":1322304085419912192,\"attstsmap\":1321037170454060032,\"bizDataSourceList\":[{\"biztype\":\"1010_S\",\"datasourceId\":1321104904177118208,\"exattr\":0},{\"biztype\":\"1020_S\",\"datasourceId\":1321103213327346688,\"exattr\":0},{\"biztype\":\"1030_S\",\"datasour",
                                    "vid": "1504179571958777859"
                                }]
                            },
                            {
                                "group": "核算结果调整",
                                "index": 12,
                                "labels": [{
                                    "index": 1,
                                    "key": "参数编码",
                                    "type": "view",
                                    "value": "ATT_RECORD_ADJUST"
                                }, {"index": 2, "key": "耗时", "type": "view", "value": "00 : 00 : 03"}, {
                                    "index": 3,
                                    "key": "初始化结果",
                                    "type": "view",
                                    "value": "初始化异常返回结果为空"
                                }]
                            },
                            {
                                "group": "人员映射",
                                "index": 13,
                                "labels": [{"index": 1, "key": "参数编码", "type": "view", "value": "ATT_PERINFO"}, {
                                    "index": 2,
                                    "key": "耗时",
                                    "type": "view",
                                    "value": "00 : 00 : 03"
                                }, {"index": 3, "key": "初始化结果", "type": "view", "value": "初始化异常返回结果为空"}]
                            },
                            {
                                "group": "计算消息记录",
                                "index": 14,
                                "labels": [{
                                    "index": 1,
                                    "key": "参数编码",
                                    "type": "view",
                                    "value": "COUNT_MSG_CONTENT"
                                }, {"index": 2, "key": "耗时(毫秒)", "type": "view", "value": "254"}, {
                                    "index": 3,
                                    "key": "初始化结果",
                                    "type": "view",
                                    "value": "初始化异常返回结果为空"
                                }]
                            },
                            {
                                "group": "档案柜",
                                "index": 15,
                                "labels": [{"index": 1, "key": "参数编码", "type": "view", "value": "ATT_FILE"}, {
                                    "index": 2,
                                    "key": "耗时",
                                    "type": "view",
                                    "value": "00 : 00 : 18"
                                }, {"index": 3, "key": "初始化结果", "type": "view", "value": "初始化异常返回结果为空"}]
                            }
                        ]
                    }]
                }
            };
            props.data.args = JSON.stringify(props.data.args);*/

            this.uniqueId = new Date().getTime();
            this.themeNum = props.themeNum;
            this.initFunc(this.model, props);
        },
        update: function (props) {
            if (props.data && props.data.event === 'getMessage') {
                this.calculationReport.showDialog(props.data.args, props.data.width, props.data.height)
            }
        },


        initFunc: function (model, props) {
            let $this = this;
            // KDApi.loadFile可以通过路径加载js或css文件，并且在html文件头生成script或者link标签，第一个参数是路径，第二个参数是model，第三个参数是加载完成后执行的回调函数
            // KDApi.loadFile(['./css/calculationReport.css', './js/calculationReport_src.js', './js/myTool.js'], model, function () {
                KDApi.loadFile(['./css/calculationReport.css', './js/calculationReport.js', './js/myTool.js'], model, function () {
                // 通过路径去获取html字符串，第一个参数是路径，第二个参数是model，第三个参数是HTML模板中变量的值
                KDApi.getTemplateStringByFilePath('./html/calculationReport.art', model, {}).then(function (result) {
                    model.dom.innerHTML = result;
                    // 初始化
                    $this.initCalculationReport(model, props);
                })
            })
        },
        initCalculationReport: function (model, props) {
            var $this = this;

            var para = {
                model: model,
                data: [JSON.parse(props.data.args)],
                KDApi: KDApi,
                themeNum: this.themeNum,
                uniqueId: this.uniqueId
            };

            this.calculationReport = new KdWtcCalculationReport(para);
        },
    };

    KDApi.register('wtccalculationreport', CalculationReport, {isMulLang: true})
})(window.KDApi, jQuery);