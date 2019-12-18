import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
Vue.use(Vuex)

const state = {}

const mutations = {
  saveLoginInfo(state, { userType, LoginInfo, token }) {
    this.commit('clearState')
    Vue.set(state, 'userType', userType)

    if (userType == 0) {
      Vue.set(state, 'homePage', '/customer')
      Vue.set(state, 'userInfo', LoginInfo)
    } else {
      Vue.set(state, 'homePage', '/manage')
      Vue.set(state, 'adminInfo', LoginInfo)
    }
    Vue.set(state, 'token', token)
  },
  setUserName(state, userName) {
    if (state.userType == 0) {
      state.userInfo.userName = userName
    }
  },
  setPhoneNumber(state, phoneNumebr) {
    if (state.userType == 0) {
      state.userInfo.phoneNumebr = phoneNumebr
    }
  },
  clearState(state) {
    for (let key in state) {
      delete state[key]
    }
  },
  logout(state) {
    this.commit('clearState')
  }
}

const actions = {
  // async getAdminData({ commit }) {
  //   try {
  //     const res = await getAdminInfo()
  //     if (res.status == 1) {
  //       commit('saveAdminInfo', res.data)
  //     } else {
  //       throw new Error(res.type)
  //     }
  //   } catch (err) {
  //     // console.log(err.message)
  //   }
  // }
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})
