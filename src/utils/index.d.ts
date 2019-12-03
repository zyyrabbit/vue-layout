export type index = {[index: string]: any};
export type callback = (key: string, value?: any, index?: number) => void;
type strategy = (target: any, origin: any) => void;
export type Reg = { [index: string]: RegExp };

export interface IComponentConfig {
  name: string; // 组件名称
  rule?: index; // 表单校验
  id?: string;
  type?: string;
  el?: HTMLElement; // 组件关联的元素
  parent: IComponentConfig | null; // 指向父配置项
  props?: index; // 组件props
  attrs?: index; // 组件attrs
  children: IComponentConfig[];
  parentName?: string; // 父组件名称
  droppable?: boolean; // 组件是否可以内嵌元素
  placeholder?: string;
  'class'?: string;
  action?: index; // 组件触发动作
  style?: index;
  on?: any;
  nativeOn?: any;
  layout?: index; // 用于拖拽布局
}

export type ConfigOrNull = IComponentConfig | null

export interface PageConfig {
  configs: IComponentConfig[],
  jsCode: string,
  cssCode: string
}