// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from "axios";
import App from './App'
import router from './router'
import swal from 'sweetalert'

const swalPlugin={}
swalPlugin.install = (Vue) => {
  Vue.prototype.$swal = swal
}
Vue.use(swalPlugin)

const my_axios = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers:{
    Authorization : localStorage.getItem('token'),
    contentType : "application/x-www-form-urlencoded"
  }
});
Vue.prototype.$http = my_axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
