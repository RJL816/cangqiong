/**
 * 过滤xss攻击字符串
 */

import { inHTMLData } from 'xss-filters'

export default function xssFilters (text = '') {
  return inHTMLData(text)
}
