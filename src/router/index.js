import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import ReadMe from '@/components/pages/ReadMe'
import BaseTable from '@/components/pages/BaseTable'

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
    },
    {
      path: '/basetable',
      name: 'basetable',
      component: BaseTable
    }
  ]
})
