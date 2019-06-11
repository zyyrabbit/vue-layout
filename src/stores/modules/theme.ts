import * as types from '../mutation-types';

interface ThemeVo {
  theme: string;
}

const state: ThemeVo = {
  theme: ''
};

const actions = {
  setTheme({ commit }: any, data: string) {
    commit(types.SET_THEME, data);
  },
};

const mutations = {
  [types.SET_THEME](state: ThemeVo, data: string) {
    state.theme = data;
  },
};

const getters = {
  theme: (state: ThemeVo) => state.theme,
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
