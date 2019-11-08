import {
  index,
  IComponentConfig,
} from '@/utils/index.d';

import ElementUIConfigs from './config/element-ui';
import G2Configs from './config/g2';
import htmlConfigs from './config/html';

// 判断是否可以拖入生成框内
export const specCompNamesMap: index = {
  'el-form-item': 'el-form',
  'el-table-column': 'el-table'
};

const _configs: index =  {
   G2: G2Configs,
  'Element-UI': ElementUIConfigs,
  HTML: htmlConfigs
}

// 设置vue-grid-layout style属性
Object.keys(_configs).forEach(typeKey => {
  _configs[typeKey].forEach((config: IComponentConfig, index: number) => {
    config.layout = {
      x: 0,
      y: 0,
      w: 24,
      h: 2,
      i: -1 // 占位符
    }
    
    config.style = {
      marginTop: '0',
     // width: '200px',
    }
  })
});


export const configs = _configs;