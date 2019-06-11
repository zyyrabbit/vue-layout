import Vue from 'vue';
import Router, {RouteConfig} from 'vue-router';

Vue.use(Router);

const router = require.context('@/views', true, /\.router\.ts$/);

const routerPage: RouteConfig = {
  path: '',
  name: 'container',
  redirect: '/main',
  component: () => import('@/components/Layout/PageView.vue'),
  children: [],
};

let routes: RouteConfig[] = [];


router.keys().forEach((v) => {
  routes = [...routes, ...router(v).default];
});

routerPage.children = routes

export default new Router({
  routes: [routerPage],
});

