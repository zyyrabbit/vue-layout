import 'element-ui/lib/theme-chalk/index.css';
import './assets/style.scss';
// 以下为代码高亮显示
import 'highlight.js/styles/atom-one-light.css';
import variables from './assets/_variables.scss';

import { VueConstructor } from 'vue';
import { Route } from 'vue-router';
import Component from 'vue-class-component';
import Element from 'element-ui';
import { Comps } from './components/index';
import { mixins } from './mixins/index';
import router from './router';
import stores from './store';
import { importSvgIcons, svgs } from './svgicon';
import lodash from 'lodash';
// 以下为代码高亮显示
import VueHighlightJS from 'vue-highlightjs';


class Bootstrap {
  public router: any;
  public stores: any;

  constructor(routers: any, stores: any) {
    this.router = routers;
    this.stores = stores;
  }

  public install(Vue: VueConstructor) {
    for (const key in Comps) {
      if (Comps.hasOwnProperty(key)) {
        Vue.component(key, Comps[key]);
      }
    }

    // 注册全局混入
    for (const key in mixins) {
      Vue.mixin(mixins[key]);
    }
    // 引入主题色
    this.stores.dispatch('theme/setTheme', variables.theme);

    this.router.beforeEach(async (to: Route, from: Route, next: any) => {
      // 默认有权限
      next();
    });

    this.router.afterEach((to: Route, from: Route) => {
      document.title = `leaf-vue-layout`;
    });

    // 注册 RouterHooks
    Component.registerHooks([
      'beforeRouteEnter',
      'beforeRouteLeave',
      'beforeRouteUpdate', // for vue-router 2.2+
    ]);

    // 自动加载 svg 图标
    importSvgIcons(svgs);

    // 引入lodash
    Vue.prototype.$lodash = lodash;
    // 重置 Element-Ui 部分组件的样式
    Element.Pagination.props.layout.default = 'total, prev, pager, next, sizes';
    Element.Pagination.props.background = { type: Boolean, default: true };
    Element.Input.props.clearable = { type: Boolean, default: true };
    Element.Card.props.shadow = { type: String, default: 'never' };
    Element.Dialog.props.appendToBody = { type: Boolean, default: true };
    Element.Dialog.props.closeOnClickModal = { type: Boolean, default: false };
    Element.Table.props.highlightCurrentRow = { type: Boolean, default: true };
    Element.Table.props.border = { type: Boolean, default: true };
    Element.Table.props.headerCellStyle = {
      type: String,
      default: 'color: #777777;background:#fafafa',
    };
    Element.TableColumn.props.showOverflowTooltip = {
      type: Boolean,
      default: true,
    };
    Element.MessageBox.setDefaults({ type: 'warning' });
    Vue.use(Element, { size: 'small', zIndex: 3000 });

    Vue.use(VueHighlightJS);
  }
}

export default new Bootstrap(router, stores);
