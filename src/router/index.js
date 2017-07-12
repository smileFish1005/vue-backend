import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import ReadMe from '@/components/pages/ReadMe'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/readme',
      name: 'ReadMe',
      component: ReadMe
    }
  ]
})
