// 用户表
const mongoose = require('../db')
const userSchema = mongoose.Schema({
    "userId": Number,
    "username": {
        type: String,
        required: true
    },
    "password": {
        type: String,
        required: true
    },
    "realname": String,
    "userEmail" : String,
    "mobile":String,
    "sex":Number,
    "roleNames":[],//role 0:super
    "createTime" : {
        type:String,
        default:new Date().getTime()
    },
    "updateTime" : {
        type:String,
        default:new Date().getTime()
    }
})
const user = mongoose.model('users', userSchema,'users')
module.exports = user