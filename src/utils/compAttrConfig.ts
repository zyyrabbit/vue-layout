import {
  index
} from '@/utils/index.d'
// 过来属性配置
export const filterAttrs: index = {
  'config-id': true,
   id: true
};

export const filterProps: index = {
  id: true
}

const common: index = { 
  boolean: 'el-switch',
  string: 'el-input',
  number: 'el-input'
}
// 枚举
let justify = {
  type: 'el-select',
  options: ['start', 'end', 'center', 'space-around', 'space-between']
}

let align = {
  type: 'el-select',
  options: ['top', 'middle', 'bottom']
}

let size = {
  type: 'el-select',
  options: ['medium' , 'small', 'mini']
}
let tag = {
  type: 'el-select',
  options: ['div', 'span', 'p']
}

// 组件匹配
const ElRow: index = { justify, align, tag }
const ElCol: index = { tag }
const ElForm: index = {
  'label-posiiton': {
    type: 'el-select',
    options: ['right' , 'left', 'top']
  }
}
const ElFormItem: index = { size }
const ElInput: index = { size }
const ElButton: index = { 
  size,
  type: {
    type: 'el-select',
    options: ['default', 'primary', 'success', 'warning', 'danger', 'info', 'text']
  }
}
const ElProgress: index = {
  type: {
    type: 'el-select',
    options: ['line', 'circle', 'dashboard']
  },
  status: {
    type: 'el-select',
    options: ['success', 'exception']
  }
}
const ElSlider: index = {
  'input-size': {
    type: 'el-select',
    options: ['large', ...size.options]
  }
}
const LeafHtml: index = {
  tag
}
export const attrConfig: index = {
  ElRow,
  ElCol,
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  common,
  ElProgress,
  ElSlider,
  LeafHtml
}