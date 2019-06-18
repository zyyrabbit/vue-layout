type index = {[index: string]: any};
export interface IComponentConfig {
  name: string,
  props?: index,
  attrs?: index,
  children?: IComponentConfig[],
  droppable?: boolean,
  id?: string,
  type?: string,
  placeholder?: string,
  'class'?: string
}

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
    children: ['备选项'] // 待解决ts检查报错
  },
  {
    name:  'el-button',
    attrs: {
      type: 'primary',
      size: ''
    },
    children: ['按钮'] // 待解决ts检查报错
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
      total: 50,
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
export const configs: IComponentConfig[] = [
  ...layout,
  ...formElement,
  ...data
]