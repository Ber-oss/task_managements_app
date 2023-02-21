import {createRouter,createWebHistory} from 'vue-router';

import { useUserStore } from '../store/userStore'

import LoginPage from '../pages/LoginPage.vue'
import DashboardPage from '../pages/DashboardPage.vue'
import ProfilePage from '../pages/ProfilePage.vue'
import ProjectIndex from '../pages/projects/ProjectIndex.vue'
import ProjectCreate from '../pages/projects/ProjectCreate.vue'
import ProjectShow from '../pages/projects/ProjectShow.vue'
import ProjectEdit from '../pages/projects/ProjectEdit.vue'
import ProjectTaskCreate from '../pages/projects/tasks/ProjectTaskCreate.vue'
import ProjectTaskEdit from '../pages/projects/tasks/ProjectTaskEdit.vue'
import ProjectTaskShow from '../pages/projects/tasks/ProjectTaskShow.vue'
import TaskIndex from '../pages/tasks/TaskIndex.vue'

const routes=[
    {
        'path':'/login',
        'name':'login',
        'component':LoginPage,
        'meta': {requiresAuth: false},
    },
    {
        'path':'/',
        'name':'dashboard',
        'component':DashboardPage,
        'meta': {requiresAuth: true},
        'children':[
            {
                'path':'/profile',
                'name':'profile',
                'component':ProfilePage
            },
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
                'path':'/tasks/create/:project_slug?',
                'name':'tasks.create',
                'component':ProjectTaskCreate,
                "props":true
            },
            {
                'path':'/tasks/edit/:slug/:project_slug?',
                'name':'tasks.edit',
                'component':ProjectTaskEdit,
                "props":true
            },
            {
                'path':'/tasks/details/:slug/:project_slug?',
                'name':'tasks.show',
                'component':ProjectTaskShow,
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
    } 

    else if (!to.meta.requiresAuth && store.user.token) {
        next({name:'dashboard'});
    } else {
        next();
    }
});


export default router;
