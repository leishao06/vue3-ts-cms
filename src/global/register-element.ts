// 此文件用于全局需要的 Element-plus 组件
import { App } from 'vue'

import {
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadio,
  ElAlert,
  ElAside
} from 'element-plus'

const components = [
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadio,
  ElAlert,
  ElAside
]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}