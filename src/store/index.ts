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
    STOP_BLADE(state) {
      state.isInit = false
      state.isAccount = false
    },
    SET_TEMP_ACCOUNT(state, value) {
      state.tempAccount = value
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
    },
    stopBlade({ commit }) {
      commit('STOP_BLADE')
    }
  },
  modules: {
  }
})