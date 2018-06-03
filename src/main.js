// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import axios from './services/axios'
import prototypeFunc from './utils/prototypeFunc'
import store from './store'

import i18n from './lang'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(prototypeFunc)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  axios,
  components: {App},
  template: '<App/>',
  i18n
})
