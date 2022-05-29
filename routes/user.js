const router = require("koa-router")()
const { login, loginInfo,userlist, updateaddlist, dellist } = require("../controller/user")
const { successModel, errorModel } = require("../utils/stateModel")
const SECRET = process.env.JWT_SECRET
const Role = require('../db/models/roleSchema')
const jwt = require("jsonwebtoken")
router.prefix('/api/user')
router.post('/login', async (ctx, next) => {
    const { username, password } = ctx.request.body
    const userList = await login(username, password)
    // async function delay(time) {
    //     return new Promise(function(resolve, reject) {
    //       setTimeout(function(){
    //         resolve();
    //       }, time);
    //     });
    //   };
    //   await delay(2000);
    if (!userList) {
        ctx.body = new errorModel('用户名或密码错误', '1001')
        return
    }
    const roleList = await Role.find({ _id: userList.roleNames })
    //button permission return
    let permSign = []
    if (roleList.length) {
        for (let i in roleList) {
            permSign = permSign.concat(roleList[i].permSign)
        }
    }
    //jwt设置token返回前端
    const token = jwt.sign({ userList }, SECRET, { expiresIn: "2h" })
    ctx.body = new successModel({ token,permSign })
})

router.get('/logininfo',async (ctx,next) => {
    const { username } = ctx.request.body
    const userList = await loginInfo(username)
    let {roleNames=[]} = userList
    const roleList = await Role.find({ _id: roleNames })
    //button permission return
    let permSign = []
    if (roleList.length) {
        for (let i in roleList) {
            permSign = permSign.concat(roleList[i].permSign)
        }
    }
    //jwt sets the token to return to the front end
    const token = jwt.sign({ userList }, SECRET, { expiresIn: "2h" })
    ctx.body = new successModel({ token,permSign })
})

router.get('/userlist', async (ctx, next) => {
    const { username, mobile, pageNum } = ctx.query
    const { userList, pager } = await userlist(username, mobile, pageNum)

    if (!userList) {
        ctx.body = new errorModel('WRONG USER NAME OR PASSWORD', '1001')
        return
    }
    ctx.body = new successModel({ userList, pager })
})
//编辑、新增
router.post('/updateaddlist', async (ctx, next) => {
    await updateaddlist(ctx, ctx.request.body)

})
//删除
router.post('/dellist', async (ctx, next) => {
    await dellist(ctx, ctx.request.body)

})
module.exports = router