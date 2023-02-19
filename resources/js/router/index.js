import {createRouter,createWebHistory} from 'vue-router';

import DashboardPage from '../pages/DashboardPage.vue'
import ProjectIndex from '../pages/projects/ProjectIndex.vue'
import TaskIndex from '../pages/tasks/TaskIndex.vue'

const routes=[
    {
        'path':'/',
        'name':'dashboard',
        'component':DashboardPage
    },
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
];

export default createRouter({
    history:createWebHistory(),
    routes
});