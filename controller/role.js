const { code } = require('../utils/stateModel')
const Role = require('../db/models/roleSchema')
const Counter = require('../db/models/counterSchema')
const pagerFun = require('../utils/pager')
const { successModel, errorModel } = require("../utils/stateModel")
//query role
const rolelist = async (ctx, { roleName, pageNum, pageSize }) => {
    let params = {}
    let pager = {}
    if (roleName) params.roleName = roleName
    const query = Role.find(params,
        'roleName permId remark permSign checkedKeys updateTime')
    const rolelist = await query.skip(pagerFun(pageNum, pageSize).skipIndex).limit(pagerFun(pageNum, pageSize).pager.pageSize)
    const total = await Role.countDocuments(params)
    pager.total = total
    pager.pageNum = parseInt(pageNum)
    console.log(rolelist)
    if (rolelist) { 
        ctx.body = new successModel({ rolelist, pager })
        return
 }
    return ctx.body = new errorModel("Lookup failed")
}
const updateaddlist = async (ctx, { _id, action,...updataPrams }) => {
    if (action) {
        try {
            const userList = await Role.findOneAndUpdate({ _id }, updataPrams)
            if (userList) {
                ctx.body = new successModel("Successfully modified")
                return
            }
            return ctx.body = new errorModel("fail to edit")
        } catch (error) {
            ctx.body = new errorModel(error.message)
            return
        }

    }
    //add role
    if (!updataPrams.roleName) {
        ctx.body = new errorModel('Parameter error', code.PARAM_ERROR)
        return
    }
    const res = await Role.findOne({ $or: [{ roleName:updataPrams.roleName }] })
    if (res) {
        ctx.body = new errorModel(`The new user name already exists: role name is ${res.roleName}`)
        return
    }
    try {
        const res = await Counter.findOne({ id: "roleid" })
        if (!res) {
            await Counter.create({
                "id": "roleid",
                "sequence_value": 0
            })
        }
        const count = await Counter.findOneAndUpdate({ id: 'userId' }, { $inc: { sequence_value: 1 } }, { new: true })
        const Roles = await new Role({
            roleId: count.sequence_value, ...updataPrams
        })
        await Roles.save();
        ctx.body = new successModel('added successfully')
    } catch (error) {
        ctx.body = new errorModel(`fail to add,${error}`, code.DB_ERROR)
    }



}
//Delete(real delete not logic delete)
const dellist = async (ctx, { _id }) => {
    if (!_id) {
        ctx.body = new errorModel("Parameter error", code.PARAM_ERROR)
        return
    }
    //_id接收数组
    try {
        const res = await Role.deleteMany({ _id: { $in: _id } })
        ctx.body = new successModel(`successfully deleted`)
    } catch (error) {
        ctx.body = new errorModel("fail to delete", code.DB_ERROR)
    }

}
module.exports = {
    rolelist,
    updateaddlist,
    dellist
}