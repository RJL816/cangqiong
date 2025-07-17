// 导入自己需要的组件
import {Dialog, DatePicker, Input, Select, Option, Autocomplete, Pagination,Divider,Timeline, TimelineItem,Checkbox,Switch,Popover,InputNumber} from 'element-ui'
const element = {
    install: function (Vue) {
        Vue.use(Dialog)
        Vue.use(DatePicker)
        Vue.use(Input)
        Vue.use(Select)
        Vue.use(Option)
        Vue.use(Autocomplete)
        Vue.use(Pagination)
        Vue.use(Divider)
        Vue.use(Timeline)
        Vue.use(TimelineItem)
        Vue.use(Checkbox)
        Vue.use(Switch)
        Vue.use(Popover)
        Vue.use(InputNumber)
    }
}
export default element
