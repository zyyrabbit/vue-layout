import { IComponentConfig } from './componentConfig';

export interface IPageConfig {
  jsCode: string;
  cssCode: string;
  config: IComponentConfig;
}

export default class PageConfig {
  private jsCode!: string;
  private cssCode!: string;
  private config!: IComponentConfig;

  constructor(options: IPageConfig) {
    this.jsCode = options.jsCode;
    this.cssCode = options.cssCode;
    this.config = options.config;
  }
}