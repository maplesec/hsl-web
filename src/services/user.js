import axios from '@/services/axios'

// 获取用户列表
export const getUserList = () => axios.get('/acl_user')

// 添加用户
export const addUser = (params) => axios.post('/acl_user', params)

// 删除用户
export const deleteUser = (id) => axios.delete('/acl_user/' + id)

// 编辑用户
export const editUser = (id, params) => axios.put('/acl_user/' + id, params)

// 获取单个用户
export const getUser = (id) => axios.get('/acl_user/' + id)

// 设置用户角色
export const setUserRoles = (id, params) => axios.post(`/acl_user/${id}/roles`, params)

// 获取用户角色
export const getUserRoles = (id, params) => axios.get(`/acl_user/${id}/roles`, params)