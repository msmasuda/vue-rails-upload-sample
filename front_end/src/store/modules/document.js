import { getDocuments, getDocument, createDocument, updateDocument, deleteDocument } from '@/api/document'

const state = {
  id: '',
  project_id: '',
  name: '',
  data: [],
  input_mode: 0,
  currentData: {}
}

const mutations = {
  SET_DATA: (state, payload) => {
    state.data = payload
  },
  ADD_DATA: (state, payload) => {
    state.data.push(payload)
  },
  SET_INPUT_MODE: (state, payload) => {
    state.input_mode = payload
  },
  SET_PROJECT_ID: (state, payload) => {
    state.project_id = payload
  },
  SET_CURRENT_DATA: (state, payload) => {
    state.currentData = payload
  }
}

const getters = {
  data: state => state.data,
  input_mode: state => state.input_mode,
  currentData: state => state.currentData
}

const actions = {
  getDocumentData({ commit }, project_id) {
    commit('SET_PROJECT_ID', project_id)
    return new Promise((resolve, reject) => {
      getDocuments(project_id).then(ret => {
        ret.data.forEach(d => {
          d.input_mode = 0
        })
        commit('SET_DATA', ret.data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getDocument({ commit }, id) {
    return new Promise((resolve, reject) => {
      getDocument(id).then(ret => {
        commit('SET_CURRENT_DATA', ret.data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  createDocument({ commit }, data) {
    // console.log(data)
    return new Promise((resolve, reject) => {
      createDocument(data).then(ret => {
        ret.data.input_mode = 0
        commit('ADD_DATA', ret.data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateDocument({ commit }, data) {
    return new Promise((resolve, reject) => {
      updateDocument(data).then(ret => {
        ret.data.forEach(d => {
          d.input_mode = 0
        })
        commit('SET_DATA', ret.data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  changeInputMode({ commit }, id) {
    const data = state.data
    const target = data.find(f => f.id === id)
    target.input_mode = 1
    commit('SET_DATA', data)
  },
  deleteDocument({ commit }, data) {
    return new Promise((resolve, reject) => {
      deleteDocument(data).then(ret => {
        ret.data.forEach(d => {
          d.input_mode = 0
        })
        commit('SET_DATA', ret.data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
