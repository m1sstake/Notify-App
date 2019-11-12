import Vue from 'vue'

export default {
  namespaced: true,


  state: {
    loading: false
  },
  mutations: {
    setLoading (state, flag) {
      Vue.set(state, 'loading', flag)
    }
  },
  actions: {
    setLoading ({ commit }, flag) {
      commit('setLoading', flag)
    }
  },
  getters: {

  },

}