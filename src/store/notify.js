import loadMore from '../assets/js/loadMore.js'
import axios from 'axios'

export default {
  namespaced: true,

  state: {
    messages: [],
    messagesMain: [],
  },
  mutations: {
    setMessage (state, payload) {
      state.messages = payload
    },
    setMessageMain (state, payload) {
      state.messagesMain = payload
    },
    loadMessages (state,payload) {
      state.messagesMain = [...state.messagesMain, ...payload]
    }
  },
  actions: {
    loadMessages ({commit, getters}) {
      let res = getters.getMessageFilter
      commit('loadMessages', loadMore(res))
    },
    setMessage ({ commit }, payload) {
      commit('setMessage', payload)
    },
    setMessageMain ({ commit }, payload) {
      commit('setMessageMain', payload)
    },
    getNotify ({ dispatch }) {
      dispatch('loading/setLoading', true, {root: true})
      axios
        .get('https://tocode.ru/static/c/vue-pro/notifyApi.php')
        .then(response => {
          let res = response.data.notify,
          messages = [],
          messagesMain = [];
          for (let message of res){
            if (message.main) messagesMain.push(message)
            else messages.push(message)
          }
          dispatch('setMessage', messages)
          dispatch('setMessageMain', messagesMain)
        })
        .catch(error => dispatch('error/setError', error, {root: true}))
        .finally(() => (dispatch('loading/setLoading', false, {root: true})))
    },
    getNotifyLazy ({ dispatch }) {
      dispatch('loading/setLoading', true, {root: true})
      setTimeout(() => {
        dispatch('getNotify')
      }, 1800)
    },
  },
  getters: {
    getMessage (state) {
     return state.messages
    },
    getMessageFilter (state) {
      return state.messages.filter(mes => mes.main === false)
     },
    getMessageMain (state) {
      return state.messagesMain
     }
  }
}