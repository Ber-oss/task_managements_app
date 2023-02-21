<template>
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Tasks/{{ task.name }}</h1>
        <router-link :to="{name:'projects.show',params:{slug:project_slug}}"  class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
            class="fas fa-arrow-left fa-sm text-white-50"></i> Project</router-link>
    </div>
   <div class="row">
    <div class="col-6">
        <div class="card shadow mb-4 h-100">
            <div class="card-header">
                <h6 class="m-0 font-weight-bold text-primary">Task:{{task.name}}</h6>
            </div>
            <div class="card-body">
                <h4>Description: </h4>
                <p>{{ task.description }}</p>
                <hr>
                <h4>Created at: </h4>
                <p>{{ task.created_at }}</p>
                <hr>
                <h4>Status: </h4>
                <p>
                    <span :class="['badge',`badge-${statusColor[task.status]}`]">{{ task.status }}</span>
                </p>
            </div>
        </div>
    </div>
    <div class="col-6">
        <div class="card shadow mb-4 h-100">
            <div class="card-header">
                <h6 class="m-0 font-weight-bold text-primary">Members</h6>
            </div>
            <div class="card-body"> 
                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Note</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="membre in task.members" :key="membre.id">
                            <td style="width:20%">{{ membre.name }}</td>
                            <td>{{ membre.pivot.note || '---' }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>   
   </div>
  
</template>

<script>

import {onMounted,ref} from 'vue';
import useTask from '../../../services/task';

export default {

    props:['slug','project_slug'],

    setup(props){
        const {task,getTask}=useTask();

        const statusColor={
            'pending':'warning',
            'processing':'primary',
            'completed':'success'
        };
        
        onMounted(async()=>{
            await getTask(props.slug);
        })

        return{
            task,
            statusColor
        }
       
    }
};
</script>

