import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import Home from '@/views/Home/Home.vue'
import Login from '@/views/Login/Login.vue'
import Register from '@/views/Register/Register.vue'
import Charts from '@/views/Charts/Charts.vue'
import Information from '@/views/Information/Information.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        redirect: '/charts',
        meta: {
            auth: true,
            menu: true,
            title: '信息维护',
            icon: 'el-icon-s-home'
        },
        children: [
            {
                path: '/charts',
                name: 'Charts',
                component: Charts,
                meta: {
                    auth: true,
                    menu: true,
                    title: '数据展示',
                    icon: 'el-icon-s-home'
                }
            },
            {
                path: '/information',
                name: 'Information',
                component: Information,
                meta: {
                    auth: true,
                    menu: true,
                    title: '员工信息',
                    icon: 'el-icon-s-home'
                }
            }

        ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, _from, next) => {
    if (to.meta.auth){ 
        next()
    } else {
        next()
    }
})

export default router