import Vue from 'vue'
import Router from 'vue-router'

import LoginRegister from '@/components/LoginRegister'
import Home from '@/components/Home'
import profile from '@/components/profile'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'LoginRegister',
      component: LoginRegister
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem('token')
        if (token) {
          next()
        }else {
          swal({
            title: 'Ooops',
            text: `You don't Have Access! `,
            icon: 'error',
            button: 'OK'
          })
          next('/')
        }
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile,
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem('token')
        if (token) {
          next()
        }else {
          swal({
            title: 'Ooops',
            text: `You don't Have Access! `,
            icon: 'error',
            button: 'OK'
          })
          next('/')
        }
      }
    }
  ]
})
