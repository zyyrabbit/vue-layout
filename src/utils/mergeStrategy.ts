
import { objForEach, index } from '@/utils';
type strategy = (target: any, origin: any) => void;
const defaultMergeStrategy: index = {
  props: (target: any, origin: any) => {
    target.props = origin.props;
  },
  attrs: (target: any, origin: any) => {
    target.attrs = {
      ...target.attrs,
      ...origin.attrs
    }
  },
  nativeOn: (target: any, origin: any) => {
    target.nativeOn = {
      ...target.nativeOn,
      ...origin.nativeOn
    }
  },
  class: (target: any, origin: any) => {
    target.class = origin.class.split(',');
  },
  on: (target: any, origin: any) => {
    if (target.on && origin.name !== 'el-select') {
      delete target.on.focus
    }
    target.on = {
      ...target.on,
      ...origin.on
    }
  }
}

export function mergeStrategy(target: any, origin: any) {
  objForEach(origin, (key) => {
    let strategy: strategy = defaultMergeStrategy[key];
    strategy && strategy(target, origin);
  })
}