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
                    component: resolve => require(['@/components/pages/Readme.vue'], resolve),
                    meta:{
                    	auth:true 
                    }
                },
                {
                    path: '/basetable',
                    component: resolve => require(['@/components/pages/BaseTable.vue'], resolve),
                    meta:{
                    	auth:true 
                    }
                },
                {
                    path: '/baseform',
                    component: resolve => require(['@/components/pages/BaseForm.vue'], resolve),
                    meta:{
                    	auth:true 
                    }
                },
                {
                    path: '/boss',
                    component: resolve => require(['@/components/pages/Boss.vue'], resolve),
                    meta:{
                    	auth:true 
                    }
                },
                {
                    path: '/vuetable',
                    component: resolve => require(['@/components/pages/VueTable.vue'], resolve),
                    meta:{
                    	auth:true 
                    }
                },
                {
                    path: '/bosstest',
                    component: resolve => require(['@/components/pages/bosstest.vue'], resolve),
                    meta:{
                    	auth:true 
                    }
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
	if((!localStorage.getItem('ms_username')&&to.path!=='/login')&&(to.meta&&to.meta.auth)){
		console.log('login------------------------------')
		next({
	        path: '/login',
	        query: { redirect: to.fullPath }
	      });
	}else if(to.path=='/login'&&localStorage.getItem('ms_username')){
		//已登录用户后退到登陆后的处理
		if(to.query&&to.query.redirect){
			next({
		        path: to.query.redirect
	      	});		
		}else{
			next({
		        path: '/home'
	      	});		
		}
		
	}else{
		next();
	}
})

export default router 
