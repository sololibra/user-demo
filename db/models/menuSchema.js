//菜单表
const mongoose = require("../db")
const menuSchema = mongoose.Schema({
    id: {
        required: true,
        type: Number
    },
    menuType: {
        type: Number,
        default: 1
    },//Menu Type 1: Menu 2: Button
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        default:''
    },//router
    icon: {
        type:String,
        default:''
    },//icon
    limitCode: String,//权限标识
    parentId:{
        type:mongoose.Types.ObjectId,
        default:null
    },//parent menu id
    orderNum: {
        type: Number,
        default: new Date().getTime()
    },//菜单排序
    level:String,//menu level
    //children:{},
    createTime: {
        type: String,
        default: new Date().getTime()
    },//create at
    updateTime: {
        type: String,
        default: new Date().getTime()
    }//update at
})
const menus = mongoose.model("menus", menuSchema)
module.exports = menus