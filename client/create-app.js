import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './app.vue'
import Meta from 'vue-meta'

import './assets/styles/global.styl'
import createRouter from './config/router'
import createStore from './store/store'
import Notification from './components/notification'
import Tabs from './components/tabs'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Meta)
Vue.use(Notification)
Vue.use(Tabs)

export default () => {
  const router = createRouter()
  const store = createStore()

  const app = new Vue({
    router,
    store,
    render: (h) => h(App)
  })

  return {app, router, store}
}
