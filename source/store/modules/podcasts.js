// initial state
const state = () => ({
  speed: 0,
  speedHistory: new Array(),
  errors: [],
  loading: false,
})

// getters
const getters = {
  getSpeed: (state, getters, rootState) => {
    return state.speed;
  },
}

// actions
const actions = {
  stopRecorder (context) {
    this._watcherVM.$socket.emit("recorder directive", {directive:"shutdown"});
  },
}

// mutations
const mutations = {
  SOCKET_SPEEDOMETER_UPDATE_BROADCAST (state, payload) {
    state.speed = payload.data['currentRevsPerMin'];
    state.speedHistory.push(Object.assign({}, payload.data, {recieved: (+new Date())}));
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
