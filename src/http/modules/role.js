import $http from '../http'
//查询角色列表
const roleList = (data) => {
    return $http({
        url:'/api/role/rolelist',
        method:'get',
        data
    })
}
//编辑新增角色
const addRoleList = (data) => {
    return $http({
        url:'/api/role/addrolelist',
        method:'post',
        data
    })
}
//删除角色
const delroleList = (data) => {
    return $http({
        url:'/api/role/delroleList',
        method:'post',
        data
    })
}
export default {
    roleList,
    addRoleList,
    delroleList
}