import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import theme from './stores/modules/theme';
import config from './stores/modules/config';

const DEBUG = process.env.NODE_ENV === 'development';

Vue.use(Vuex);

const module = require.context('@/views', true, /\.module\.js$/);
let modules = {};

module.keys().forEach(v => {
  modules = { ...modules, ...module(v) };
});

export default new Vuex.Store({
  modules: Object.assign({}, modules, {
    theme,
    config
  }),
  strict: DEBUG,
  plugins: DEBUG ? [createLogger({})] : [],
});
