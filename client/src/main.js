// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import VueResource from 'vue-resource'
import App from './App'
import router from './router'
var $ = require("jquery");

Vue.use(VueResource);

Vue.config.productionTip = false

// Jquery for login and register panel//
$(function() {
  $('#login-form-link').click(function(e) {
  $("#login-form").delay(100).fadeIn(100);
  $("#register-form").fadeOut(100);
  $('#register-form-link').removeClass('active');
  $(this).addClass('active');
  e.preventDefault();
  });
  $('#register-form-link').click(function(e) {
    $("#register-form").delay(100).fadeIn(100);
    $("#login-form").fadeOut(100);
    $('#login-form-link').removeClass('active');
    $(this).addClass('active');
    e.preventDefault();
  });
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  template: '<App/>',
  components: { App }
})
