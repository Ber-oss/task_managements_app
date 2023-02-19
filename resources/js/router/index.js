import {createRouter,createWebHistory} from 'vue-router';

import { useUserStore } from '../store/userStore'

import LoginPage from '../pages/LoginPage.vue'
import DashboardPage from '../pages/DashboardPage.vue'
import ProjectIndex from '../pages/projects/ProjectIndex.vue'
import ProjectCreate from '../pages/projects/ProjectCreate.vue'
import TaskIndex from '../pages/tasks/TaskIndex.vue'

const routes=[
    {
        'path':'/login',
        'name':'login',
        'component':LoginPage
    },
    {
        'path':'/',
        'name':'dashboard',
        'component':DashboardPage,
        'meta': {requiresAuth: true},
        'children':[
            {
                'path':'/projects',
                'name':'projects.index',
                'component':ProjectIndex
            },
            {
                'path':'/projects/create',
                'name':'projects.create',
                'component':ProjectCreate
            },
            {
                'path':'/tasks',
                'name':'tasks.index',
                'component':TaskIndex
            },
        ]
    },
  
];

const router=createRouter({
    history:createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const store = useUserStore()
    if (to.meta.requiresAuth && !store.user.token) {
        next({name: 'login'});
    } else {
        next();
    }
});


export default router;
