const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    roleName: String,
    remark: String,
    permSign: {
        type:[],
        default:[]
    },//permission sign
    permId: {
        type:[],
        default:[]
    },//Role Menu Collection
    checkedKeys:{
        type:[],
        default:[]
    },//Role selected child node collection
    updateTime: {
        type: Date,
        default: Date.now()
    },
    createTime: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("roles", userSchema, "roles")