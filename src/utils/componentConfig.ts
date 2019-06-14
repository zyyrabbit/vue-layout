export interface IComponentConfig {
  name: string,
  props?: object,
  attrs?: object,
  children?: IComponentConfig[],
  droppable?: boolean
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

export const configs: IComponentConfig[] = [
  ...layout,
  {
    name:  'el-input',
    props: {
      value: 1,
      size: '',
      clearable: false,
      disabled: false,
    },
    attrs: {
      placeholder: '请输入内容'
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
      value: '单选按钮',
    },
    attrs: {
      label: '单选按钮'
    }
  }
]