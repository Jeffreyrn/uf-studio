import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import robot from './modules/robot';

Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  modules: {
    robot,
  },
  strict: false,
});
