import { 
  index
} from '@/utils';
const common: index = { 
  Boolean: 'el-switch',
  String: 'el-input',
  Number: 'el-input'
}
const ElRow: index = {
  justify: {
    type: 'el-select',
    options: ['start', 'end', 'center', 'space-around', 'space-between']
  },
  align: {
    type: 'el-select',
    options: ['top', 'middle', 'bottom']
  }
}
const ElInput: index = {
  size: {
    type: 'el-select',
    options: ['medium' , 'small', 'mini']
  }
}

export const attrConfig: index = {
  ElRow,
  ElInput,
  common
}