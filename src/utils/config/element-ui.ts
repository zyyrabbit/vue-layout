import {
  index,
  IComponentConfig,
} from '@/utils/index.d'

// 判断是否可以拖入生成框内
export const specCompNamesMap: index = {
  'el-form-item': 'el-form',
  'el-table-column': 'el-table'
};

const layout: IComponentConfig[] = [
  {
    name:  'el-row',
    droppable: true,
    parent: null,
    props: {
      gutter: 0
    },
    attrs: {
      justify: 'start',
      align: 'top',
      type: 'flex',
      tag: 'div',
    },
    'class': 'leaf-layout',
    children: []
  },
  {
    name:  'el-col',
    droppable: true,
    parent: null,
    props: {
      span: 24,
      offset: 0,
      push: 0,
      pull: 0
    },
    attrs: {
      tag: 'div'
    },
    'class': 'leaf-layout',
    children: []
  },
  
]

// 表单元素
const formElement: IComponentConfig[] = [
  {
    name:  'el-form',
    droppable: true,
    parent: null,
    'class': 'leaf-layout',
    props: {
      model: {},
      disabled: false,
    },
    attrs: {
      'label-position': 'right',
    },
    children: []
  },
  {
    name:  'el-form-item',
    parentName: 'el-form',
    parent: null,
    droppable: true,
    rule: {
      map: {
        reuqire: "{ required: true, message: '年龄不能为空'}", 
      },
      checked: [],
    },
    placeholder: 'div',
    props: {
      'show-message': true,
      'inline-message': false,
    },
    attrs: {
      'label-width': '100px',
      label: '标题',
      size: '',
      prop: 'key'
    },
    'class': 'leaf-layout',
    children: []
  },
  {
    name:  'el-input',
    parent: null,
    children: [],
    action: {
      names: ['blur', 'change'],
      map: {}
    },
    props: {
      value: '',
      clearable: false,
      disabled: false,
    },
    attrs: {
      placeholder: '请输入内容',
      size: ''
    }
  },
  {
    name:  'el-select',
    parent: null,
    props: {
      value: 1
    },
    children: [{
      name: 'el-option',
      parent: null,
      children: [],
      props: {
        label: '选项',
        value: 1
      }
    },{
      name: 'el-option',
      parent: null,
      children: [],
      props: {
        label: '选项',
        value: 2
      }
    }]
  },
  {
    name:  'el-radio',
    parent: null,
    children: [],
    props: {
      value: '单选框',
    },
    attrs: {
      label: '单选框'
    }
  },
  {
    name:  'el-checkbox',
    props: {
      value: true,
    },
    children: ['备选项']
  },
  {
    name:  'el-button',
    attrs: {
      type: 'primary',
      size: ''
    },
    children: ['按钮']
  }
]
// Data
const data = [
  {
    name:  'el-table',
    droppable: true,
    props: {
      data: []
    },
    'class': 'leaf-layout',
    children: []
  },
  {
    name:  'el-table-column',
    parentName: 'el-table',
    placeholder: 'div',
    attrs: {
      prop: '',
      label: '标题',
      width: '',
    }
  },
  {
    name:  'el-progress',
    props: {
      percentage: 50
    },
    attrs: {
      type: 'line',
      status: 'success'
    },
    'class': 'leaf-layout',
  },{
    name:  'el-pagination',
    props: {
      total: 30,
      background: true,
    },
    attrs: {
      layout: 'prev, pager, next',
    }
  },{
    name:  'el-slider',
    props: {
      value: 50
    }
  }
]



const ElementUIConfigs: IComponentConfig[] = [
  ...layout,
  ...formElement,
  ...data
]


export default ElementUIConfigs;