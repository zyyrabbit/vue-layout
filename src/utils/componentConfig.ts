type index = {[key: string]: any};
export interface IComponentConfig {
  name: string, // 组件名称
  props?: index, // 组件props
  attrs?: index, // 组件attrs
  children?: IComponentConfig[] | string[],
  parentName?: string, // 父组件名称
  droppable?: boolean, // 组件是否可以放置元素
  id?: string,
  type?: string,
  placeholder?: string,
  'class'?: string,
  layout?: index, // 用于拖拽布局
}
// 判断是否可以拖入生成框内
export const specCompNamesMap: index = {
  'el-form-item': 'el-form',
  'el-table-column': 'el-table'
};

const layoutComNames = ['el-container', 'el-header', 'el-main', 'el-footer'].map((name: string) => {
  return {
    name,
    droppable: true,
    children: []
  }
})

const layout: IComponentConfig[] = [
  /* ...layoutComNames,
  {
    name:  'el-aside',
    droppable: true,
    props: {
      width: '20%',
    },
    children: []
  }, */
  {
    name:  'leaf-html',
    type: 'html',
    droppable: true,
    placeholder: 'div',
    attrs: {
      tag: 'div',
      text: '',
      id: 'plain-html-layout'
    },
    children: []
  },
  {
    name:  'el-row',
    droppable: true,
    props: {
      gutter: 0
    },
    attrs: {
      justify: 'start',
      align: 'top',
      type: 'flex',
      tag: 'div',
    },
    children: []
  },
  {
    name:  'el-col',
    droppable: true,
    props: {
      span: 24,
      offset: 0,
      push: 0,
      pull: 0
    },
    attrs: {
      tag: 'div'
    },
    children: []
  },
  
]

// 表单元素
const formElement: IComponentConfig[] = [
  {
    name:  'el-form',
    droppable: true,
    class: '',
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
    droppable: true,
    placeholder: 'div',
    props: {
      required: false,
      'show-message': true,
      'inline-message': false,
    },
    attrs: {
      'label-width': '',
      label: '',
      size: '',
    },
    children: []
  },
  {
    name:  'el-input',
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
    props: {
      value: 1
    },
    children: [{
      name: 'el-option',
      props: {
        label: '选项',
        value: 1
      }
    },{
      name: 'el-option',
      props: {
        label: '选项',
        value: 2
      }
    }]
  },
  {
    name:  'el-radio',
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
    children: []
  },
  {
    name:  'el-table-column',
    parentName: 'el-table',
    placeholder: 'div',
    attrs: {
      prop: '',
      label: '',
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
    }
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

// G2
const G2Configs: IComponentConfig[] = [
  {
    name:  'g2-bar-chart'
  }
];

const _configs: index =  {
   G2: G2Configs,
  'Element-UI': ElementUIConfigs
}

// 设置vue-grid-layout属性
Object.keys(_configs).forEach(typeKey => {
  _configs[typeKey].forEach((config: IComponentConfig, index: number) => {
    config.layout = {
      x: 0,
      y: 0,
      w: 8,
      h: 2,
      i: -1 // 占位符
    }
  })
});


export const configs = _configs;