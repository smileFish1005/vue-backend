import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: resolve => require(['@/components/Hello.vue'], resolve)
    },
    {
      path: '/readme',
      component: resolve => require(['@/components/pages/ReadMe.vue'], resolve)
    },
    {
      path: '/basetable',
      component:  resolve => require(['@/components/pages/BaseTable.vue'], resolve)
    },
    {
      path: '/baseform',
      name: 'baseform',
      component:  resolve => require(['@/components/pages/BaseForm.vue'], resolve)
    }
  ]
})
