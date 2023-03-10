<template>
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Projects/{{ project.name }}</h1>
        <router-link :to="{name:'projects.index'}" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
            class="fas fa-arrow-left fa-sm text-white-50"></i> Projects</router-link>
    </div>
   <div class="row">
    <div class="col-6">
        <div class="card shadow mb-4 h-100">
            <div class="card-header">
                <h6 class="m-0 font-weight-bold text-primary">Project:{{project.name}}</h6>
            </div>
            <div class="card-body">
                <h4>Description: </h4>
                <p>{{ project.description }}</p>
                <hr>
                <h4>Created at: </h4>
                <p>{{ project.created_at }}</p>
                <hr>
                <h4>By: </h4>
                <p v-if="project.user">{{ project.user.name }}</p>
                <hr>
                <h4>Status <span v-if="project.progress"
                    class="float-right">{{project.progress.toFixed(2)}}%</span></h4>
                <div class="progress mb-4">
                    <div class="progress-bar" role="progressbar" :style="{ width: `${project.progress}%`}"
                        :aria-valuenow="project.progress" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-6">
        <div class="card shadow mb-4 h-100">
            <div class="card-header">
                <h6 class="m-0 font-weight-bold text-primary">Team</h6>
            </div>
            <div class="card-body">
                <template v-if="members.length">
                    <h5  v-for="membre in members" :key="membre.id" class="font-weight-bold">- {{ membre.name }} </h5>
                </template>
                <div v-else>
                    no members have been added
                </div>
            </div>
        </div>
    </div>
    <div class="col-12 mt-3">
        <div class="card shadow mb-4">
            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Tasks</h6>
                <router-link v-if="project.user_id==user.data.id" :to="{name:'tasks.create',params:{project_slug:project.slug}}" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                class="fas fa-plus fa-sm text-white-50"></i> Create task</router-link>
                </div>
            <div class="card-body">
                <div class="table-responsive">
                    <DataTable
                        :options="options"
                        ref="dt"
                        class="table table-bordered"
                    />
                </div>
            </div>
        </div>
    </div>
        
   </div>
  
</template>

<script>

import {onMounted,ref,computed} from 'vue';
import useProject from '../../services/project';
import useTask from '../../services/task';
import {useUserStore} from '../../store/userStore';

import task_datatable from '../../services/datatables/task-datatable';
import DataTable from 'datatables.net-vue3';
import DataTablesLib from 'datatables.net';

import 'datatables.net-responsive-dt'

import { useRouter } from 'vue-router';

DataTable.use(DataTablesLib)

export default {
    components:{
        DataTable
    },

    props:['slug'],

    setup(props){
        const dt=ref(null);

        const {project,getProject}=useProject();
        const {deleteTask}=useTask();
        const {options,evt}=task_datatable(dt,props.slug);


        const {user}=useUserStore();

        const router=useRouter();

        const members=computed(()=>{
            let members=project.value.tasks?project.value.tasks.map(item=>item.members).flat():[];
          
            members=members.filter((item,index) => members.indexOf(members.find(it=>it.id==item.id)) === index)
            
            return members;
        });

        onMounted(async ()=>{
            await getProject(props.slug);
         
            evt();
        })
    

        return{
            project,
            options,
            members,
            user,
            dt
        }
       
    }
};
</script>

