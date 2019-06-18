import { 
  index
} from '@/utils';
const common: index = { 
  Boolean: 'el-switch',
  String: 'el-input',
  Number: 'el-input'
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

// 组件匹配
const ElRow: index = { justify, align }
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
  tag: {
    type: 'el-select',
    options: ['div', 'span', 'p']
  }
}
export const attrConfig: index = {
  ElRow,
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  common,
  ElProgress,
  ElSlider,
  LeafHtml
}