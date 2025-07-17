// 在main.js上通过import引入Vue库和自己写的Vue组件库
import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css'
import element from './element/index'

Vue.use(element)

import PersonList from './components/PersonList.vue';
import eventBus from "../../../../../../util/eventBus";


(function (KDApi) {
    function MyComponent(model) {
        this._setModel(model)
    }

    MyComponent.prototype = {
        _setModel: function (model) {
            this.model = model
        },
        init: function (props) {
            console.log('-----init', this.model.style, props)
            setHtml(this.model, props)
        },
        update: function (props) {
            // updateHtml(this.model, props)
            eventBus.pub(this.model, 'update', props)
        },
        destoryed: function () {
            console.log('-----destoryed', this.model)
        }
    }

    const setHtml = (model, props) => {
        KDApi.loadFile('./css/index.css', model, () => {
            const {invoke, dom} = model
            Vue.prototype.getLangMsg = (key, configObj) => {
                return KDApi.getLangMsg(model, key, configObj)
            }
            Vue.prototype.invoke = (eventName, args)=>{
                invoke(eventName, args)
            }
            new Vue({
                el: model.dom,
                template: '<PersonList :themeNum="themeNum" :lang="lang" :cusParam_result="cusParam_result" />',
                components: {
                    PersonList
                },
                data: {
                    themeNum:"#5582F3",
                    lang:"zh_CN",
                    cusParam_result:null,
                },
                destoryed() {
                    console.log('`')
                },
                mounted() {
                    if(props.themeNum){this.themeNum = props.themeNum;}
                    if(props.lang){this.lang = props.lang;}
                    if(!props.data){return}
                    this.getCusParam(props,"cusParam_result");
                    this.updateSub = eventBus.sub(model, 'update', (props) => {
                        if(props.themeNum){this.themeNum = props.themeNum;}
                        if(!props.data){return}
                        this.getCusParam(props,"cusParam_result");
                    })
                    console.log("cusParam_result",this.cusParam_result)
                },
                methods: {
                    getCusParam(props, key) {
                        if (props.data.hasOwnProperty(key) && props.data[key]) {
                            this[key] = props.data[key] ? JSON.parse(props.data[key]) : null;
                        }
                    }
                }
            })
        })
    }

    // 注册自定义组件
    KDApi.register('selectPerson', MyComponent,{
        isMulLang: true
    })
})(window.KDApi)
