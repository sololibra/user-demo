import axios from 'axios'
import Cookies from 'js-cookie'
import router from '../router'
import { Message } from 'element-ui'
import { Loading } from 'element-ui';
import {removeAll} from '@/utils/storage'
const showStatus = (status) => {
    let message = ''
    switch (status) {
        case 400:
            message = 'Request error(400)'
            break
        case 401:
            message = 'Unauthorized, please log in again(401)'
            break
        case 403:
            message = 'Access denied(403)'
            break
        case 404:
            message = 'Error in request(404)'
            break
        case 408:
            message = 'Request timed out(408)'
            break
        case 500:
            message = 'Server error(500)'
            break
        case 501:
            message = 'Service not implemented(501)'
            break
        case 502:
            message = 'Network Error(502)'
            break
        case 503:
            message = 'Service is not available(503)'
            break
        case 504:
            message = 'Network timeout(504)'
            break
        case 505:
            message = 'HTTP version not supported(505)'
            break
        default:
            message = `Connection error(${status})!`
    }
    return `${message}，Please check the network or contact the administrator！`
}

const service = axios.create({
    method: 'get',
    //Determine whether to request the proxy server or directly request the back-end service. The direct request requires the back-end to configure cross-domain
    baseURL: process.env.VUE_APP_API_MODE === 'proxy' ? `${process.env.VUE_APP_SERVER}:${process.env.VUE_APP_SERVER_PORT}` : `${process.env.VUE_APP_API}`,
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    timeout: 30000
})
//Whether the request uses global loading by default
let loading = true
//Whether to use the default unified global pop-up window, the default use
let isShowToast = true
let loadingInstance;
// Request interceptor
service.interceptors.request.use((config) => {
    let { data } = config
    if (data.isShowToast) { isShowToast = data.isShowToast; delete data.isShowToast }
    if (data.loading) { loading = data.loading; delete data.loading }
    //Global loading
    if (loading) loadingInstance = Loading.service({ background: 'rgba(0, 0, 0, 0.3)' });

    const token = Cookies.get('token')
    //Judgment token
    if (token) {
        config.headers.token = token
    } else {
        if (router.app._route.name !== 'login') {
            router.push('/login')
            return
        }
    }
    return config
}, (error) => {
    //Error thrown to business code
    //Close popup
    if (loading) loadingInstance.close()
    error.data = {}
    error.data.message = 'The server is abnormal, please contact the administrator！'
    return Promise.resolve(error)
})

// Response interceptor
service.interceptors.response.use((response) => {
    const status = response.status
    let message = ''

    if (loading) loadingInstance.close()

    if (status < 200 || status >= 300) {
        //Handle http errors and throw them to business code
        message = showStatus(status)
        if (isShowToast) {
            Message({
                message: message,
                type: 'warning'
            })
        }

        if (typeof response.data === 'string') {
            response.data = { message }
        } else {
            response.data.message = message
        }
    }

    const { errorCode } = response.data
    if (errorCode != '0000') {
        if (isShowToast) {
            let message=''
            switch (errorCode) {
                case '1004':
                    Cookies.remove('token')
                    removeAll()
                    message = "Token verification failed"
                    router.push('/login')
                    break
                case '1002':
                    message = "wrong user name or password"
                    break
                default:
                    message = response.data.message
            }
            Message({
                message: message,
                type: 'warning'
            })
        }


    }
    return response.data
}, (error) => {
    // Error thrown to business code
    let errorMsg = {}
    errorMsg.errorCode = -1
    errorMsg.data = null
    errorMsg.message = error
    Message({
        message: 'The server is abnormal, please contact the administrator！',
        type: 'warning'
    })
    if (loading) loadingInstance.close()
    return Promise.resolve(errorMsg)
})
const $http = (options) => {
    if (!options.data) { options.data = {} }

    if (options.method === 'get') {
        options.params = options.data
    }
    return service(options)
}
export default $http