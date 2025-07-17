// 导入自己需要的组件
import {Dialog, Button, Input, Select, Option, Autocomplete, Carousel, CarouselItem, Image } from 'element-ui'
const element = {
    install: function (Vue) {
        Vue.use(Carousel)
        Vue.use(CarouselItem)
        Vue.use(Image)
    }
}
export default element
