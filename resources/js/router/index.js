import {createRouter,createWebHistory} from 'vue-router';

import LoginPage from '../pages/LoginPage.vue'
import DashboardPage from '../pages/DashboardPage.vue'
import ProjectIndex from '../pages/projects/ProjectIndex.vue'
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
        'children':[
            {
                'path':'/projects',
                'name':'projects.index',
                'component':ProjectIndex
            },
            {
                'path':'/tasks',
                'name':'tasks.index',
                'component':TaskIndex
            },
        ]
    },
  
];

export default createRouter({
    history:createWebHistory(),
    routes
});