import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: resolve => require(['@/components/Home.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['@/components/pages/Readme.vue'], resolve)
                },
                {
                    path: '/basetable',
                    component: resolve => require(['@/components/pages/BaseTable.vue'], resolve)
                },
                {
                    path: '/baseform',
                    component: resolve => require(['@/components/pages/BaseForm.vue'], resolve)
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['@/components/pages/Login.vue'], resolve)
        },
    ]
})
router.beforeEach((to, from, next) => {
	//router.push({ path: '/login' })
	if(!localStorage.getItem('ms_username')&&to.path!=='/login'){
		console.log('login------------------------------')
		next('/login');
	}else{
		next();
	}
})

export default router 
