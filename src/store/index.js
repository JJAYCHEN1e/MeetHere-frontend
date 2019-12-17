import Vue from 'vue'
import Vuex from 'vuex'
import { getAdminInfo } from '@/api/getData'

Vue.use(Vuex)

const state = {
  userType: '',
  userInfo: {
    custumerId: '',
    email: '',
    phoneNumebr: '',
    userName: '',
    registeredTime: ''
  },
  adminInfo: {
    adminId: '',
    email: '',
    phoneNumebr: '',
    adminName: ''
  },
  token: ''
}

const mutations = {
  saveLoginInfo(state, { userType, LoginInfo, token }) {
    state.userType = userType
    if (userType == 0) {
      state.userInfo = LoginInfo
    } else {
      state.adminInfo = LoginInfo
    }
    state.token = token
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
