import $http from '../http'
const login = (data) => {
    return $http({
        url:'/api/user/logininfo',
        method:'get',
        data
    })
}
export default{
    login
}