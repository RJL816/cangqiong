// 导入自己需要的组件
import { Popover,Input,Select,Option,Checkbox,Popconfirm,Tooltip,Button } from 'element-ui'
const element = {
    install: function (Vue) {
        Vue.use(Popover)
        Vue.use(Select)
        Vue.use(Option)
        Vue.use(Input)
        Vue.use(Checkbox)
        Vue.use(Popconfirm)
        Vue.use(Tooltip)
        Vue.use(Button)
    }
}
export default element
