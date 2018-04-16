
import * as types from '../mutation-types';

const state = {
  xarm: [],
  preloaded: false,
}
const actions = {
}
const mutations = {
  [types.SET_XARM_SRC](state, data) {
    state.xarm[data.index] = data.geometry
  },
  [types.XARM_SRC_LOADED](state) {
    state.preloaded = true
  },
}

export default { state, actions, mutations }
