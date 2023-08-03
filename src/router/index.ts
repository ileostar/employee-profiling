import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUsersStore } from '@/stores/users'
import * as _ from 'lodash'
import api from '@/api/api'

// 主页面
import Home from '@/views/Home/Home.vue'
// 登录注册
import Login from '@/views/Login/Login.vue'
import Register from '@/views/Register/Register.vue'
// 信息维护
import Charts from '@/views/Charts/Charts.vue'
import Information from '@/views/Information/Information.vue'
import Performance from '@/views/Performance/Performance.vue'
import TagManage from '@/views/TagManage/TagManage.vue'
import AccountManage from '@/views/AccountManage/AccountManage.vue'
// 员工画像
import EmployeePortrait from '@/views/EmployeePortrait/EmployeePortrait.vue'
// 岗位画像
import OverallPortrait from '@/views/OverallPortrait/OverallPortrait.vue'
import PositionPortrait from '@/views/PositionPortrait/PositionPortrait.vue'
// 人岗匹配
import Matching from '@/views/Matching/Matching.vue'
// 缺省页
import NotFound from '@/views/NotFound/NotFound.vue'
import NotAuth from '@/views/NotAuth/NotAuth.vue'
import NotServer from '@/views/NotServer/NotServer.vue'
import { useTagStore } from '@/stores/tag'

declare module 'vue-router' {
    interface RouteMeta {
        auth?: boolean;
        menu?: boolean;
        title?: string;
        icon?: string;
    }
}

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        redirect: '/maintenance',
        meta: {
            auth: true,
            menu: true,
            title: '信息维护',
            icon: '#icon-yonghuweihu'
        },
        children: [
            {
                path: '/maintenance',
                name: 'Maintenance',
                redirect: '/charts',
                meta: {
                    auth: true,
                    menu: true,
                    title: '信息维护',
                    icon: '#icon-yonghuweihu'
                },
                children:[
                    {
                        path: '/charts',
                        name: 'Charts',
                        component: Charts,
                        meta: {
                            auth: true,
                            menu: true,
                            title: '数据展示',
                            icon:  '#icon-a-007_shujufenxi'             
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
                            icon: '#icon-yuangongguanli'
                        }
                    },
                    {
                        path: '/performance',
                        name: 'Performance',
                        component: Performance,
                        meta: {
                            auth: true,
                            menu: true,
                            title: '绩效成绩',
                            icon: '#icon-jixiaopinggu'
                        }
                    },
                    {
                        path: '/tagManage',
                        name: 'TagManage',
                        component: TagManage,
                        meta: {
                            auth: true,
                            menu: true,
                            title: '标签管理',
                            icon: '#icon-biaoqian'
                        },
                        async beforeEnter(_to, _from, next){
                            const tagStore = useTagStore()
                            const { info: tagInfo } = storeToRefs(tagStore)
                            if( _.isEmpty(tagInfo.value) ){
                              const res = await api.selectTag()
                              if(res.data.state === 200){
                                tagStore.updateTagInfos(res.data.data)
                              }
                              else{
                                return;
                              }
                            }
                            next()
                          }
                    },
                    {
                        path: '/accountManage',
                        name: 'AccountManage',
                        component: AccountManage,
                        meta: {
                            auth: true,
                            menu: true,
                            title: '账号管理',
                            icon: '#icon-zhanghaoguanli1'
                        }
                    },   
                ]
            },
            {    
                path: '/employeePortrait',
                name: 'EmployeePortrait',
                component: EmployeePortrait,
                meta: {
                    auth: true,
                    menu: true,
                    title: '员工画像',
                    icon: '#icon-yonghuhuaxiang1'
                },
            },
            {    
                path: '/post',
                name: 'post',
                redirect: '/overallPortrait',
                meta: {
                    auth: true,
                    menu: true,
                    title: '岗位画像',
                    icon: '#icon-yonghuhuaxiang'
                },
                children: [
                {
                    path: '/overallPortrait',
                    name: 'OverallPortrait',
                    component: OverallPortrait,
                    meta: {
                        auth: true,
                        menu: true,
                        title: '总体画像',
                        icon:  '#icon-gangweijibie'             
                    }
                },
                {
                    path: '/positionPortrait',
                    name: 'PositionPortrait',
                    component: PositionPortrait,
                    meta: {
                        auth: true,
                        menu: true,
                        title: '岗位画像',
                        icon:  '#icon-gangweiguanli'             
                    }
                }
                ]
            },
            {    
                path: '/matching',
                name: 'Matching',
                component: Matching,
                meta: {
                    auth: true,
                    menu: true,
                    title: '人岗匹配',
                    icon: '#icon-gangweixinxi'
                },
            },

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
    {
      path: '/403',
      name: 'notAuth',
      component: NotAuth
    },
    {
      path: '/404',
      name: 'notFound',
      component: NotFound
    },
    {
      path: '/500',
      name: 'notServer',
      component: NotServer
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404'
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, _from, next) => {
    const usersStore = useUsersStore()
    const { token,infos } = storeToRefs(usersStore)
    if (to.meta.auth  && _.isEmpty(infos.value) ){ 
        if(token.value) {
            next();
        } else {
            next('/login')
        }
    } else {
        if( token.value && to.path === '/login' ){
            next('/');
        }
        else{
            next();
        }
    }
})

export default router