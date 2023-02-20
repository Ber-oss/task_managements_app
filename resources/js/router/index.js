import {createRouter,createWebHistory} from 'vue-router';

import { useUserStore } from '../store/userStore'

import LoginPage from '../pages/LoginPage.vue'
import DashboardPage from '../pages/DashboardPage.vue'
import ProjectIndex from '../pages/projects/ProjectIndex.vue'
import ProjectCreate from '../pages/projects/ProjectCreate.vue'
import ProjectShow from '../pages/projects/ProjectShow.vue'
import ProjectEdit from '../pages/projects/ProjectEdit.vue'
import ProjectTaskCreate from '../pages/projects/tasks/ProjectTaskCreate.vue'
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
                'path':'/projects/details/:slug',
                'name':'projects.show',
                'component':ProjectShow,
                'props':true
            },
            {
                'path':'/projects/edit/:slug',
                'name':'projects.edit',
                'component':ProjectEdit,
                'props':true
            },
            {
                'path':'/tasks',
                'name':'tasks.index',
                'component':TaskIndex
            },
            {
                'path':'/tasks/create/:project_id?',
                'name':'tasks.create',
                'component':ProjectTaskCreate,
                "props":true
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
