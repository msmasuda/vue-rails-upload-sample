import request from '@/utils/request'

export function getProjects(user_id) {
  return request({
    url: '/projects',
    method: 'get',
    params: { user_id }
  })
}

export function createProject(data) {
  return request({
    url: `/projects`,
    method: 'post',
    data
  })
}

export function updateProject(data) {
  return request({
    url: `/projects/${data.id}`,
    method: 'put',
    data
  })
}

export function deleteProject(id) {
  return request({
    url: `/projects/${id}`,
    method: 'delete'
  })
}
