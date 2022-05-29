const router = require('koa-router')()
const {addMenus,queryMenus,delMenuList} = require("../controller/menus")
router.prefix('/api/menus')
router.get("/menulist",async (ctx)=>{
    await queryMenus(ctx,ctx.request.query)
})
router.post("/addmenulist",async (ctx)=>{
    await addMenus(ctx,ctx.request.body)
})
//删除菜单
router.post("/delMenuList",async (ctx)=>{
    const {_id }= ctx.request.body
    await delMenuList(ctx,_id)
})

module.exports = router