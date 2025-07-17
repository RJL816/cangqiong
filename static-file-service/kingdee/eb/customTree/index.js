/**
 *  自定义控件书写模板
 */
 (function (KDApi, $) {
    //使用Map并根据页面ID区分多页签
    var componentMap = window.componentMap;
    if (!componentMap) {
        componentMap = new Map();
        window.componentMap = componentMap;
    }

    // 构造函数，变量名随意，与最后一句代码的KDApi.register的第二个参数一致即可
    function CustomTree(model) {
        this._setModel(model)
    }

    // 原型中封装生命周期函数，固定格式
    CustomTree.prototype = {
        _setModel: function (model) {
            this.model = model
        },
        init: function (props) {
            //根据页面ID获取对象
            var componentPojo = componentMap.get(this.model.pageId);
            if (!componentPojo) {
                componentPojo = {};
                //这里特意在页面ID前面拼接上"vue"字符串,一是防止页面ID重复,而是防止页面ID由数字开头,防止vue对应elString出现问题
                componentPojo.elString = "vue" + this.model.pageId;
                //放到Map中
                componentMap.set(this.model.pageId, componentPojo);
            }
            initFunc(this.model, props)
        },
        update: function (props) {
            unpdataFunc(this.model, props)
        },
        destoryed: function () {
            //根据页面ID获取对象
            var componentPojo = componentMap.get(this.model.pageId);
            if (componentPojo && componentPojo.vm && componentPojo.vm.$destroy) {
                //从Map中移除该页面ID对应的元素
                componentMap.delete(this.model.pageId);
            }
            var vmPojo = componentMap.get(this.model.pageId+"_vue");
            if(vmPojo && vmPojo.vm && vmPojo.vm.$destroy){
                 //调用vue的$destroy,销毁该vue实例的各种监听等
                 vmPojo.vm.$destroy();
                 //从Map中移除该页面ID对应的元素
                 componentMap.delete(this.model.pageId+"_vue");
            }
        }
    }


    var unpdataFunc = function (model, props) {
        console.log(props.data)
        var vm = componentMap.get(model.pageId+"_vue").vm;
        if(!vm){
            return;
        }
        if (props.data.hasOwnProperty('focusId')) {
            vm.$nextTick(function () {
                //设置选中行的id为3
                vm.$refs.tree.setCurrentKey(props.data.focusId);
            });
        }
        else {

            vm.treeData = props.data.list;
            vm.collectedId = props.data.startId;
            vm.$nextTick(function () {
                //设置选中行的id为3
                vm.$refs.tree.setCurrentKey(props.data.selectId);
                if (props.data.hasOwnProperty('needClick')) {
                    model.invoke("click", props.data.selectId)
                }
               
                if (props.data.expandAll === "true") {
                    const tree = vm.$refs.tree;
                    const nodes = tree.store._getAllNodes();
                    nodes.forEach(element => {
                        element.expanded = true;
                    });
                    tree.updateKeyChildren();
                }
                else if (props.data.expandAll === "false") {
                    const tree = vm.$refs.tree;
                    const nodes = tree.store._getAllNodes();
                    nodes.forEach(element => {
                        element.expanded = false;
                    });
                    tree.updateKeyChildren();
                }
                else if (props.data.expandCurr === "false") {
                    const tree = vm.$refs.tree;
                    const targetNode = tree.store._getAllNodes().find(item => item.data.id === props.data.selectId);
                    if (targetNode) {
                        targetNode.expanded = false;
                    }
                    tree.updateKeyChildren();
                }
                else if (props.data.expandCurr === "true") {
                    const tree = vm.$refs.tree;
                    const targetNode = tree.store._getAllNodes().find(item => item.data.id === props.data.selectId);
                    if (targetNode) {
                        targetNode.expanded = true;
                    }
                    tree.updateKeyChildren();
                }
            });
        }

    }


    // Other Code
    var initFunc = function (model, props) {
        var namespaceString = KDApi.getNameSpace(model);
        var vueTemplateUrlString = namespaceString + "vue_template.html?version=" + new Date().getTime();
        var elString = componentMap.get(model.pageId).elString;
        KDApi.loadFile("./lib/vue/vue.js", model, function () {
            console.log("load js ok")
            KDApi.loadFile("./lib/element-ui/index.js", model, function () {
                console.log("load element.js ok")
                KDApi.loadFile("./lib/element-ui/index.css", model, function () {
                    KDApi.loadFile("./css/tree.css", model, function () {
                        console.log("load css ok")
                        $.get(vueTemplateUrlString, {}, function (htmlUrlString) {
                            var htmlString = '<div id="'+elString+'" style="width: 100%;">'+ htmlUrlString +'</div>';
                            console.log(htmlString)
                            initVue(model, props,htmlString);
                            // var vm = componentMap.get(model.pageId+"_vue");
                            // if(!vm){
                            //     return;
                            // }
                            model.invoke("init", true)
                        })
                      
                    })
                })
            })
        })
    }



    var initVue = function (model, props, template) {
        vm = new Vue({
            el: model.dom,
            template,
            watch: {
                filterText(val) {
                    this.$refs.tree.filter(val);
                },
            },
            methods: {
                filterNode(value, data) {
                    if (!value)
                        return true;
                    return data.label.indexOf(value) !== -1;
                },
                edit: function (node, data) {
                    if (this.isLoading) {
                        return;
                    }
                    this.isLoading = true;
                    model.invoke("edit", data)
                    setTimeout(() => {
                        this.isLoading = false;
                    }, 1000);
                },
                remove: function (node, data) {
                    if (this.isLoading) {
                        return;
                    }
                    this.isLoading = true;
                    model.invoke("remove", data)
                    setTimeout(() => {
                        this.isLoading = false;
                    }, 1000);
                },
                addcategory: function (node, data) {
                    if (this.isLoading) {
                        return;
                    }
                    this.isLoading = true;
                    model.invoke("addcategory", data)
                    setTimeout(() => {
                        this.isLoading = false;
                    }, 1000);
                },
                addReport: function (node, data) {
                    if (this.isLoading) {
                        return;
                    }
                    this.isLoading = true;
                    model.invoke("addReport", data)
                    setTimeout(() => {
                        this.isLoading = false;
                    }, 1000);
                },
                start: function (node, data) {
                    if (this.isLoading) {
                        return;
                    }
                    this.isLoading = true;
                    model.invoke("start", data)
                    setTimeout(() => {
                        this.isLoading = false;
                    }, 1000);
                },
                unStart: function (node, data) {
                    if (this.isLoading) {
                        return;
                    }
                    this.isLoading = true;
                    model.invoke("unStart", data)
                    setTimeout(() => {
                        this.isLoading = false;
                    }, 1000);
                },
                isCheckNode: function (node) {
                    return this.checkedKeys.includes(node.data.id)
                },
                isCollectedId: function (node) {
                    return this.collectedId.includes(node.data.id);
                },
                getLabelImageUrl: function (node) {
                    if (node.data.category === "report" || node.data.category === "report-share" || node.data.category === "dim-category" || node.data.category === "report-public") {
                        return KDApi.getNameSpace(model) + 'img/report.png';
                    } else {
                        return KDApi.getNameSpace(model) + 'img/folder.png';
                    }
                },
                treeCheck: function (data, list) {
                    this.$refs.tree.setCheckedKeys([])
                    // if(list.checkedKeys.length >0){
                    this.$refs.tree.setCheckedKeys([data.id])
                    this.checkedKeys = [data.id]
                    model.invoke("click", data)
                    // }
                },
                mouseenter: function (data) {
                    data.show = true;
                },
                mouseleave: function (data) {
                    data.show = false;
                },
                 //多语言
                getLangMsg(key, defaultValueString) {
                   if (!model) {
                        return defaultValueString;
                    }
                   var valueString = KDApi.getLangMsg(model, key)
                   if (!valueString) {
                       return defaultValueString;
                     }
                    return valueString;
                   },
            },
            data: {
                filterText: "",
                model: model,
                treeData: [],
                isLoading: false,
                collectedId: [],
                checkedKeys: [],
                defaultProps: {
                    children: "children",
                    label: "label",
                    show: false,
                },
                imgFolderUrl: KDApi.getNameSpace(model) + 'img/folder.png',
                imgReportUrl: KDApi.getNameSpace(model) + 'img/report.png'
            },
        });
        var componentPojo = componentMap.get(model.pageId+"_vue");
        if (!componentPojo) {
            componentPojo = {};
            //这里特意在页面ID前面拼接上"vue"字符串,一是防止页面ID重复,而是防止页面ID由数字开头,防止vue对应elString出现问题
            componentPojo.vm =vm;
            //放到Map中
            componentMap.set(model.pageId+"_vue", componentPojo);
        }
    }



    // 你只需知道第一个参数是你接下来要新增控件方案时填的方案id，第二个参数是上面声明的构造函数
    KDApi.register('customTree', CustomTree, {
         isMulLang: true
    })

})(window.KDApi, jQuery) // 这里的jQuery不是必须要传进去的，可移除，要用到的时候才传，PC端系统默认会有jQuery对象，版本是1.12.4


