/**
* @Description 判断点击的元素是否为外部元素，可用于选择器下拉点击关闭等场景
* @authors he_ying_jin (he_ying_jin@kingdee.com)
* @param {element[array] | element} target 目标元素，可以是数组
* @param {function} callback 事件触发后回调
* @param {object} type 监听事件类型 默认为click
* @returns 返回判断结果，isClickOutside为true表示此次事件在元素外部触发，并调用外部回调
*/
const clickOutside = (target, callback, { type = 'click' } = {}) => {
  const onClick = (event) => {
    const targets = Array.isArray(target) ? target : [target]
    const isClickOutside = targets.every((item) => {
      return item && !item.contains(event.target)
    })
    if (isClickOutside) {
      callback(isClickOutside)
    }
  }
  // 使用捕获阶段进行监听，防止被阻止冒泡
  document.addEventListener(type, onClick, true)
  return () => {
    document.removeEventListener(type, onClick, true)
  }
}

export default clickOutside
