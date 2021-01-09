import request from '@/utils/request'

export function getDocuments(project_id) {
  return request({
    url: '/documents',
    method: 'get',
    params: { project_id }
  })
}

export function getDocument(id) {
  return request({
    url: `/documents/${id}`,
    method: 'get'
  })
}

export function createDocument(data) {
  return request({
    url: `/documents`,
    method: 'post',
    data
  })
}

export function updateDocument(data) {
  return request({
    url: `/documents/${data.id}`,
    method: 'put',
    data
  })
}

export function deleteDocument(id) {
  return request({
    url: `/documents/${id}`,
    method: 'delete'
  })
}
