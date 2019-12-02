import {
  IComponentConfig,
} from '@/utils/index.d';

// 递归查找删除
export const deleteCompByConfigId = (configs: IComponentConfig[], configId: string, parentConfig?: IComponentConfig) => {
  configs.some((config: IComponentConfig, index: number) => {
    if (config.id === configId) {
      configs.splice(index, 1);
      if (parentConfig && parentConfig.class!.indexOf('no-border') > 0) {
        parentConfig.class = parentConfig.class!.replace(/no\-border/, '')
      }
      return true;
    }
    if (config.children) {
      return deleteCompByConfigId(config.children, configId, config);
    }
    return false;
  })
}