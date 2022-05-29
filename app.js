const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const dotenv = require("dotenv")
dotenv.config()
const user = require('./routes/user')
const menus = require('./routes/menus')
const role = require('./routes/role')
const koajwt = require('koa-jwt');
const morgan = require('koa-morgan')
const fs = require('fs')
const path = require('path')
const { errorModel, code } = require('./utils/stateModel')
//Create an initial user for easy login, (so you don't have to manually insert the first user, you can delete it after the first run)
const {createFirstUser} = require("./controller/user")
createFirstUser({username:'admin',password:'123456'})
// error handler
onerror(app)
//const user = require("./db/models/user")
// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

app.use(async (ctx, next) => {
  //日志设置token
  morgan.token("query",()=>{
    let data={}
    if(ctx.method=="POST"){
      data=ctx.request.body
    }else{
      data=ctx.request.query
    }
   
    return `${ctx.method}-${new Date()}-请求参数:${JSON.stringify(data)}`
  })
  // Allow requests from all domains
  ctx.set("Access-Control-Allow-Origin", "*");
  // Set the allowed HTTP request methods
  ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
  // field is required. It is also a comma-separated string indicating all header fields supported by the server.
  ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type,token");
  if (ctx.method == 'OPTIONS') {
    ctx.body = '';
    ctx.status = 204;
    return
  }
  ctx.request.header.authorization = `Bearer ${ctx.request.header.token}`
  await next().catch(err => {
    // Catch the next middleware error
    if (err.status == 401) {
      //JWT token verification failed
      ctx.body = new errorModel('Token verification failed', code.TOKEN_ERROR)
    } else {
      throw err
    }
  })
})
if (process.env.NODE_ENV === 'dev') {
  //Record custom logs
  morgan.format("myrule",":query")
  const writeStream = fs.createWriteStream(path.join(__dirname, 'log', 'access.log'),{flags: 'a'})
  app.use(morgan('myrule', {
    stream: writeStream
  }));
} else {
  app.use(morgan('dev'));

}
//koajwt middleware authentication, unless the login interface does not need
app.use(koajwt({ secret: process.env.JWT_SECRET }).unless({
  path: /^\/api\/user\/login/
}))

// routes
app.use(user.routes(), user.allowedMethods())
app.use(menus.routes(), menus.allowedMethods())
app.use(role.routes(), menus.allowedMethods())
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
