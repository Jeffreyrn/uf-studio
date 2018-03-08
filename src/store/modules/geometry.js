
import * as types from '../mutation-types';

const state = {
  xarm: [],
}
const actions = {
}
const mutations = {
  [types.SET_XARM_SRC](state, data) {
    state.xarm[data.index] = data.geometry
  },
}

export default { state, actions, mutations }
