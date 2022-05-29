const router = require('koa-router')()
const { updateaddlist, rolelist, dellist } = require("../controller/role")
router.prefix('/api/role')
router.get("/rolelist", async (ctx) => {
    await rolelist(ctx, ctx.request.query)
})
router.post("/addrolelist", async (ctx) => {
    await updateaddlist(ctx, ctx.request.body)
})
//删除角色
router.post("/delroleList", async (ctx) => {
    await dellist(ctx, ctx.request.body)
})

module.exports = router