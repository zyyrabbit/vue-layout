
interface ComponentConfig {
  name: string,
  props?: object,
  attrs?: object
}

const configs: ComponentConfig[] = [
  {
    name:  'el-row'
  },
  {
    name:  'el-input',
    props: {
      value: 'a'
    },
    attrs: {
      a: 'foo'
    }
  },
  {
    name:  'el-select',
    props: {
      value: 'a'
    }
  },
  {
    name:  'el-radio',
    props: {
      value: 'a'
    }
  }
]

export default configs;