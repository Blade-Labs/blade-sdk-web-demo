import { createStore } from 'vuex'
import { BladeService } from '../services/BladeService'

const bladeSDK = BladeService.getInstance()

export default createStore({
  state: {
    output: bladeSDK.getInfo(),
    isInit: false,
    isAccount: false,
    tempAccount: null,
  },
  mutations: {
    SET_INIT(state) {
      state.isInit = true
    },
    SET_ACCOUNT(state) {
      state.isAccount = true
    },
    SET_TEMP_ACCOUNT(state, value) {
      state.tempAccount = value

      if (value === null) {
        state.isAccount = false
      }
    }
  },
  actions: {
    setInit({ commit }) {
      commit('SET_INIT')
    },
    setAccount({ commit }) {
      commit('SET_ACCOUNT')
    },
    setTempAccount({ commit }, value) {
      commit('SET_TEMP_ACCOUNT', value)
    }
  },
  modules: {
  }
})
