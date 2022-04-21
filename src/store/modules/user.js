export default {
  namespaced: true,

  state: {
    proFile: {}
  },

  mutations: {
    setProFile (state, payload) {
      state.proFile = payload
    },

    logout (state, payload) {
      state.proFile = {}
    }
  }
}
