import {createRouter,createWebHistory} from 'vue-router';

import Home from '../components/Home';
import ProjectsIndex from '../components/projects/ProjectsIndex';

const routes=[
    {
        'path':'/',
        'name':'home',
        'component':Home
    },
    {
        'path':'/projects',
        'name':'projects.index',
        'component':ProjectsIndex
    }
];

export default createRouter({
    history:createWebHistory,
    routes
});