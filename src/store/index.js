import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import robot from './modules/robot';
import * as getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    robot,
  },
  strict: false,
});
