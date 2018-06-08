// import Todo from '../views/todo/todo.vue'
// import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    // component: Todo,
    component: () => import(/* webpackChunkName:"todo-view" */'../views/todo/todo.vue'), // 异步加载
    props: (route) => ({id: route.query.a}),
    name: 'app',
    meta: {
      title: 'this is app',
      description: 'APP'
    },
    children: []
  },
  {
    path: '/login',
    // component: Login,
    component: () => import(/* webpackChunkName:"login-view" */'../views/login/login.vue')
  }
]
