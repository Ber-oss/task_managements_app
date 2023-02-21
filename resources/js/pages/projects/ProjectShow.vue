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
            </div>
        </div>
    </div>
    <div class="col-6">
        <div class="card shadow mb-4 h-100">
            <div class="card-header">
                <h6 class="m-0 font-weight-bold text-primary">Team</h6>
            </div>
            <div class="card-body">
                <template v-if="project.tasks">
                    <h4  v-for="membre in project.tasks.map(i=>{i.members}).flat()" :key="membre.id" class="small font-weight-bold">{{ membre.name }} </h4>
                </template>
                <div v-else>
                    No tasks created for this project
                </div>
            </div>
        </div>
    </div>
    <div class="col-12 mt-3">
        <div class="card shadow mb-4">
            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Tasks</h6>
                <router-link :to="{name:'tasks.create',params:{project_slug:project.slug}}" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
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

import {onMounted,ref} from 'vue';
import useProject from '../../services/project';
import useTask from '../../services/task';

import { useToast } from "vue-toastification";

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
        const {project,getProject}=useProject();
        const {deleteTask}=useTask();
        const {options}=task_datatable(props.slug);

        const toast = useToast();

        const dt=ref(null)

        const router=useRouter();

        onMounted(async ()=>{
            await getProject(props.slug);
            const {tasks}={...project.value}

            console.log(tasks.map(i=>{i.members}))
            $(dt.value.dt().table().body()).on('click', '.btn-show', function () {
                let task_slug=this.getAttribute('data-slug')
                router.push({name:'tasks.show',params:{slug:task_slug,project_slug:props.slug}})
            });
            $(dt.value.dt().table().body()).on('click', '.btn-edit', function () {
                let task_slug=this.getAttribute('data-slug')
                router.push({name:'tasks.edit',params:{slug:task_slug,project_slug:props.slug}})
            });
            $(dt.value.dt().table().body()).on('click','.btn-delete', function () {
                let slug=this.getAttribute('data-slug')
                if(confirm('Do you want to delete this task?')){
                    deleteTask(slug).then(()=>{
                        dt.value.dt().table().ajax.reload();
                        toast.success("Task deleted", {
                            timeout: 2000
                        });
                    })            
                }  
            });
        })

        

        return{
            project,
            options,
            dt
        }
       
    }
};
</script>

