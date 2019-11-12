import Vue from 'vue'

export default {
  namespaced: true,


  state: {
    error: null,
  },
  mutations: {
    setError (state, payload){
      Vue.set(state, 'error', payload)
    }
  },
  actions: {
    setError ({ commit }, payload) {
      commit('setError', payload)
    }
  },
  getters: {

  }
}