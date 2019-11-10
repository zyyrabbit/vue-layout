import 'element-ui/lib/theme-chalk/index.css';
import './assets/style.scss';
// 以下为代码高亮显示
import 'highlight.js/styles/atom-one-light.css';
import variables from './assets/_variables.scss';
import { importSvgIcons, svgs } from './svgicon';
// 以下为代码高亮显示
import VueHighlightJS from 'vue-highlightjs';
import { VueConstructor } from 'vue';
import { Route } from 'vue-router';
import router from './router';
import { Comps } from './components/index';
import { mixins } from './mixins/index';
import stores from './store';
import Element from 'element-ui';
import { getComponents } from  '@/components/g2/index.ts';

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

    let G2Comps = getComponents();
    for (const comp of G2Comps) {
      Vue.component(comp.name, comp);
    }

    // 自动注册
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
      document.title = `leaf-design`;
    });

    // 自动加载 svg 图标
    importSvgIcons(svgs);

    Element.MessageBox.setDefaults({ type: 'warning' });
    Vue.use(Element, { size: 'small', zIndex: 3000 });
    Vue.use(VueHighlightJS);
  }
}

export default new Bootstrap(router, stores);
