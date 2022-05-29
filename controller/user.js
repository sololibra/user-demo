const {code} = require('../utils/stateModel')
const User = require('../db/models/userSchema')
const Counter = require('../db/models/counterSchema')
const pagerFun = require('../utils/pager')
const {successModel, errorModel} = require("../utils/stateModel")
const login = async (username, password) => {
    const loginstate = await User.findOne({username, password},
        'userId username userEmail mobile sex roleNames')

    if (loginstate) {
        return loginstate
    }
    return false
}

const loginInfo = async (username) => {
    const userInfo = await User.findOne({username},'userId username userEmail mobile sex roleNames')
    return userInfo ? userInfo : false;
}

const userlist = async (username, mobile, pageNum, pageSize) => {
    let params = {}
    let pager = {}
    if (username) params.username = username
    if (mobile) params.mobile = mobile
    const query = User.find(params,
        'userId username realname userEmail mobile password sex roleNames')
    const userList = await query.skip(pagerFun(pageNum, pageSize).skipIndex).limit(pagerFun(pageNum, pageSize).pager.pageSize)
    const total = await User.countDocuments(params)
    pager.total = total
    pager.pageNum = parseInt(pageNum)
    if (userList) return {userList, pager}
    return false
}
const createFirstUser = async (params) => {
    const res = await User.findOne({username: "admin"})
    if (res) {
        return
    }
    const user = await new User({
        userId: 0, ...params
    })
    await user.save();

}
const updateaddlist = async (ctx, {_id, action, ...params}) => {
    if (action) {
        try {
            const userList = await User.findOneAndUpdate({_id}, {...params})
            if (userList) {
                ctx.body = new successModel("修改成功")
                return
            }
            return ctx.body = new errorModel("修改失败")
        } catch (error) {
            ctx.body = new errorModel(error.message)
            return
        }

    }
    //add user
    if (!params.username || !params.mobile || !params.userEmail || !params.password) {
        ctx.body = new errorModel('Parameter error', code.PARAM_ERROR)
        return
    }
    const res = await User.findOne({$or: [{username: params.username}, {userEmail: params.userEmail}]})
    if (res) {
        ctx.body = new errorModel(`New username already exists: the username is ${res.username} and the email is ${res.userEmail}`)
        return
    }
    try {
        const res = await Counter.findOne({id: "userId"})
        if (!res) {
            await Counter.create({
                "id": "userId",
                "sequence_value": 1
            })
        }

        const count = await Counter.findOneAndUpdate({id: 'userId'}, {$inc: {sequence_value: 1}}, {new: true})
        const user = await new User({
            userId: count.sequence_value, ...params
        })
        await user.save();
        ctx.body = new successModel('added successfully')
    } catch (error) {
        ctx.body = new errorModel(`Add failed: ${error}`, code.DB_ERROR)
    }


}
//删除用户（一般删除用户并非真正删除，而是改变状态，这里使用了真正的删除）
const dellist = async (ctx, {_id}) => {
    if (!_id) {
        ctx.body = new errorModel("Parameter error", code.PARAM_ERROR)
        return
    }
    //_id接收数组
    try {
        const res = await User.deleteMany({_id: {$in: _id}})
        ctx.body = new successModel(`Successfully deleted`)
    } catch (error) {
        ctx.body = new errorModel("Failed to delete", code.DB_ERROR)
    }

}
module.exports = {
    login,
    loginInfo,
    userlist,
    updateaddlist,
    dellist,
    createFirstUser
}