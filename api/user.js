import { request } from '@/plugins/request'

export const login = data => {
  return request({
    method: 'POST',
    url: '/users/login',
    data
  })
}
export const register = data => {
  return request({
    method: 'POST',
    url: '/users',
    data
  })
}
export const editUser = data => {
  return request({
    method: 'PUT',
    url: '/user',
    data
  })
}
export const getUser = username => {
  return request({
    method: 'GET',
    url: `/profiles/${username}`,
  })
}