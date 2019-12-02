
import {
  IComponentConfig,
  index,
} from '@/utils/index.d';
import {
  deleteCompByConfigId
} from './configHelper';

const state: index = {
  selectConfig: null,
  pageConfig: {
    configs: [],
    jsCode: `
      data() {
        return {
          value: ''
        }
      },

      created() {

      },

      mounted() {

      },

      methods: {
        change(val) {
          console.log(val)
        }
      }`,
    cssCode: ''
  }
};

const actions = {
  setSelectConfig ({ commit }: any, data: IComponentConfig) {
    commit('SET_SELECT_CONFIG', data);
  },
  addConfig ({ commit }: any, data: IComponentConfig) {
    commit('ADD_CONFIG', data);
  },
  clearAll ({ commit }: any) {
    commit('CLEAR_ALL');
  },
  deleteById ({ commit }: any, configId: string) {
    commit('DELETE_BY_ID', configId);
  },
  
};

const mutations = {
  SET_SELECT_CONFIG (state: index, data: IComponentConfig) {
    state.selectConfig = data;
  },
  ADD_CONFIG (state: index, data: IComponentConfig) {
    state.pageConfig.configs.push(data);
  },
  CLEAR_ALL (state: index) {
    state.pageConfig.configs = [];
  },
  DELETE_BY_ID (state: index, configId: string) {
    deleteCompByConfigId(state.pageConfig.configs, configId)
  },
};

const getters = {
  selectConfig: (state: index) => state.selectConfig,
  configs: (state: index) => state.pageConfig.configs,
  pageConfig: (state: index) => state.pageConfig,
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
