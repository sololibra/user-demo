const Menus = require('../db/models/menuSchema')
const Role = require('../db/models/roleSchema')
const Counter = require('../db/models/counterSchema')
const { successModel, errorModel, code } = require("../utils/stateModel")
const { getMenuTree, delMenuTree } = require('../utils/operatMenu')
const jwt = require("jsonwebtoken")
const SECRET = process.env.JWT_SECRET
//Query menu list

const queryMenus = async (ctx, params) => {
    //Get users from token
    const { userList } = jwt.verify(ctx.headers.token, SECRET)
    //inquiry
    const resRole = await Role.find({ _id: { $in: userList.roleNames } })
    let menuIds = []
    resRole.forEach((item) => {
        menuIds = menuIds.concat(item.permId)
    })
    let { menuType, menuNum } = params
    // if (_ids) {
    //     _ids = JSON.parse(_ids)
    // }
    let selectParams = {}
    let conditionParams = {};
    if (menuType == 1) {
        selectParams.menuType = 1
    }
    //If the username is admin, all menu permissions are obtained by default
    if (menuNum || userList.user_name == 'admin') {
        if (userList.user_name == 'admin') {

            const exitMenu = await Menus.findOne({ name: 'Menu management' })
            if (!exitMenu) {
                await Menus.create({
                    id: 0,
                    menu_type: 1,
                    url: '/sys/menu',
                    name: 'Menu management',
                    icon:'el-icon-menu',
                    parent_id:null,
                })
            }
        }
        conditionParms = {}
    } else {
        conditionParms = { _id: { $in: menuIds } }
    }
    const res = await Menus.find({ ...selectParams, ...conditionParams }).sort({ 'orderNum': 1 })

    if (res) {
        const menuArr = getMenuTree(res, null, [])
        ctx.body = new successModel(menuArr, "Success")
        return
    }
    ctx.body = new errorModel("Failure", code.DB_ERROR)
}
//Add or edit the menu
const addMenus = async (ctx, params) => {
    const { menuType, name, url, icon, limitCode, parentId, orderNum, level, updateTime, _id, action } = params
    const body = { menuType, name, url, icon, limitCode, parentId, orderNum, level, updateTime }
    //add
    if (action == 0) {
        try {
            const res = await Counter.findOne({ id: "menuId" })
            if (!res) {
                await Counter.create({
                    "id": "menuId",
                    "sequence_value": 1
                })
            }
            const doc = await Counter.findOneAndUpdate({ id: 'menuId' }, { $inc: { sequence_value: 1 } }, { new: true })
            if (!doc) {
                ctx.body = new errorModel("Success", code.DB_ERROR)
                return
            }
            await Menus.create({ id: doc.sequence_value, ...body })
            ctx.body = new successModel("Failure")
        } catch (error) {
            ctx.body = new errorModel("Success", code.DB_ERROR)
        }
        return
    }
    //edit
    try {
        const res = await Menus.findOneAndUpdate({ _id }, body)
        if (!res) {
            ctx.body = new errorModel("Failure", code.DB_ERROR)
            return
        }
        ctx.body = new successModel("Success")
    } catch (error) {
        ctx.body = new errorModel("Failure", code.DB_ERROR)
    }
}
//Del
const delMenuList = async (ctx, _id) => {
    const res = await Menus.find()
    const _ids = delMenuTree(res, _id, [])
    const delIts = await Menus.deleteMany({ _id: _ids })
    if (delIts) {
        ctx.body = new successModel('Delete success')
        return
    }
    ctx.body = new errorModel("Delete Failure", code.DB_ERROR)
}
module.exports = { queryMenus, addMenus, delMenuList }
