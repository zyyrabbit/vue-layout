
import {
  IComponentConfig,
  index,
} from '@/utils/index.d';

const state: index = {
  selectConfig: null
};

const actions = {
  setSelectConfig ({ commit }: any, data: IComponentConfig) {
    commit('SET_SELECT_CONFIG', data);
  }
};

const mutations = {
  SET_SELECT_CONFIG (state: index, data: IComponentConfig) {
    state.selectConfig = data;
  },
};

const getters = {
  selectConfig: (state: index) => state.selectConfig,
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
