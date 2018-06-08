const Router = require('koa-router')

const userRouter = new Router({ prefix: '/user' })

userRouter.post('/login', async ctx => {
  const user = ctx.request.body
  if (user.username === 'ross' && user.password === 'ross') {
    ctx.session.user = {
      username: 'ross'
    }
    ctx.body = {
      success: true,
      data: {
        username: 'ross'
      }
    }
  } else {
    ctx.status = 400
    ctx.body = {
      success: false,
      message: 'username or password error'
    }
  }
})

module.exports = userRouter
