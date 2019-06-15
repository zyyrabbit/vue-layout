export interface IComponentConfig {
  name: string,
  props?: object,
  attrs?: object,
  children?: IComponentConfig[],
  droppable?: boolean,
  id?: string,
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
    name:  'el-row',
    droppable: true,
    props: {
      gutter: 0,
      type: 'flex',
      justify: 'start',
      align: 'top',
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
      pull: 0,
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
      'label-position': 'right',
      model: {},
      disabled: false,
    },
    children: []
  },
  {
    name:  'el-form-item',
    droppable: true,
    placeholder: 'div',
    props: {
      label: '',
      size: '',
      'label-width': '',
      required: false,
      'show-message': true,
      'inline-message': false,
    },
    children: []
  },
  {
    name:  'el-input',
    props: {
      prop: '',
      label: '',
      clearable: false,
      disabled: false,
    },
    attrs: {
      placeholder: '请输入内容',
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
    name:  'el-button',
    attrs: {
      type: 'primary',
    },
    children: ['按钮'] // 待解决ts检查报错
  }
]
export const configs: IComponentConfig[] = [
  ...layout,
  ...formElement
]