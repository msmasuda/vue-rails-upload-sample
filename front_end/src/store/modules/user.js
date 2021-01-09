import { login, logout, getInfo } from '@/api/user'
import {
  setToken,
  setClient,
  setUid,
  removeToken,
  removeClient,
  removeUid,
  getUid
} from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: '',
  client: '',
  uid: '',
  name: '',
  avatar: '',
  roles: ['admin', 'editor'],
  userInfo: {}
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_CLIENT: (state, client) => {
    state.client = client
  },
  SET_UID: (state, uid) => {
    state.uid = uid
  },
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { email, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ email: email.trim(), password: password }).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 認証情報保存
  setAuth({ commit }, auth) {
    return new Promise(resolve => {
      commit('SET_TOKEN', auth['access-token'])
      commit('SET_CLIENT', auth['client'])
      commit('SET_UID', auth['uid'])
      setToken(auth['access-token'])
      setClient(auth['client'])
      setUid(auth['uid'])
      resolve()
    })
  },

  // get user info
  getInfo({ commit }) {
    const uid = getUid()
    return new Promise((resolve, reject) => {
      getInfo(uid).then(response => {
        const { data } = response
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        commit('SET_USER_INFO', data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_CLIENT', '')
        commit('SET_UID', '')
        removeToken()
        removeClient()
        removeUid()
        commit('SET_USER_INFO', {})
        resetRouter()
        dispatch('tagsView/delAllViews', null, { root: true })
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_CLIENT', '')
      commit('SET_UID', '')
      removeToken()
      removeClient()
      removeUid()
      commit('SET_USER_INFO', {})
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
