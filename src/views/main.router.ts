export default [
  {
    path: 'main',
    name: 'main',
    component: () => import('./main.vue'),
    meta: {
      title: '主页面',
    },
  }
];
