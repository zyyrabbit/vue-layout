export type index = {[index: string]: any};
export type callback = (key: string, value?: any, index?: number) => void;
type strategy = (target: any, origin: any) => void;
export type Reg = { [index: string]: RegExp };

export interface IComponentConfig {
  name: string; // 组件名称
  props?: index; // 组件props
  attrs?: index; // 组件attrs
  children?: IComponentConfig[] | string[];
  parentName?: string; // 父组件名称
  droppable?: boolean; // 组件是否可以放置元素
  id?: string;
  type?: string;
  placeholder?: string;
  'class'?: string;
  action?: index; // 组件触发动作
  style?: index;
  el?: HTMLElement;
  layout?: index; // 用于拖拽布局
}


export interface PageConfig {
  configs: IComponentConfig[],
  jsCode: string,
  cssCode: string
}