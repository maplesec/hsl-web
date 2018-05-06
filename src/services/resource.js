import axios from '@/services/axios'

// 获取资源列表
export const getResourceList = () => axios.get('/acl_resource')

// 添加资源
export const addResource = () => axios.post('./acl_resource')

// 删除资源
export const deleteResource = (id) => axios.delete('./acl_resource/' + id)

// 编辑资源
export const editResource = (id, params) => axios.put('./acl_resource/' + id, params)

// 编辑单个用户
export const getUser = (id) => axios.get('/acl_resource/' + id)
