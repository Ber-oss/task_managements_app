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
                <table v-if="task.members && task.members.length" class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
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
                <div v-else>
                    no members have been added
                </div>
            </div>
        </div>
    </div>   
    <div class='col-12 mt-2' v-if="task.members">
        <div  v-if="task.members.map(i=>i.id).includes(user.data.id)">
            <div class="card shadow mb-4 h-100">
                <div class="card-body">
                    <form action="" @submit.prevent="save">
                        <div class="form-group">
                            <label for="name">Note</label>
                            <textarea type="text" v-model="form.note" id="note" class="form-control" placeholder="Note"></textarea>
                            <span class="text-danger" v-if="errors && errors.note">{{ errors.note[0] }}</span>
                        </div>
                        <div class="form-group mt-2">
                            <div class="form-group">
                                <label>Status</label>
                                <select class="form-control" v-model="form.status">
                                    <option value="pending">Pending</option>
                                    <option value="processing">Processing</option>
                                    <option value="completed">Completed</option>
                                </select>
                                <span class="text-danger" v-if="errors && errors.status">{{ errors.status[0] }}</span>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <button type="submit" class="btn btn-primary btn-block">Save</button>
                        </div>
                    </form> 
                </div>
            </div>   
        </div>
    </div>
    
    
    
   </div>
  
</template>

<script>

import {onMounted,reactive} from 'vue';
import useTask from '../../../services/task';
import {useUserStore} from '../../../store/userStore';
export default {

    props:['slug','project_slug'],

    setup(props){
        const {task,getTask,updateNote}=useTask();

        const {user}=useUserStore();

        const statusColor={
            'pending':'warning',
            'processing':'primary',
            'completed':'success'
        };

        const form=reactive({
            note:'',
            status:''
        })

        const save=async()=>{
            await updateNote(props.slug,user.data.id,props.project_slug,form);
        }
        
        onMounted(async()=>{
            await getTask(props.slug);
            form.note=task.value.members?task.value.members.find(i=>i.id==user.data.id).pivot.note:'';
            form.status=task.value.status;
        })

        return{
            task,
            statusColor,
            user,
            form,
            save
        }
       
    }
};
</script>

