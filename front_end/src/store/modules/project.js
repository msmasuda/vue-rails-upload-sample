import { getProjects, createProject, updateProject, deleteProject } from '@/api/project'

const state = {
  id: '',
  user_id: '',
  name: '',
  data: [],
  input_mode: 0
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
  }
}

const getters = {
  data: state => state.data,
  input_mode: state => state.input_mode
}

const actions = {
  getProjectData({ commit }, condition) {
    return new Promise((resolve, reject) => {
      getProjects(condition).then(ret => {
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
  createProject({ commit }, data) {
    return new Promise((resolve, reject) => {
      createProject(data).then(ret => {
        ret.data.input_mode = 0
        commit('ADD_DATA', ret.data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateProject({ commit }, data) {
    return new Promise((resolve, reject) => {
      updateProject(data).then(ret => {
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
  deleteProject({ commit }, data) {
    return new Promise((resolve, reject) => {
      deleteProject(data).then(ret => {
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
