<template>
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Tasks/edit</h1>
        <router-link :to="{name:'projects.show',params:{slug:project_slug}}" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
            class="fas fa-arrow-left fa-sm text-white-50"></i> Project</router-link>
    </div>
   
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">
                Edit task
            </h6>
        </div>
        <div class="card-body">
            <form action="" @submit.prevent="save">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" v-model="form.name" id="name" class="form-control" placeholder="Name">
                    <span class="text-danger" v-if="errors && errors.name">{{ errors.name[0] }}</span>
                </div>
                <div class="form-group mt-2">
                    <label for="description">Description</label>
                    <textarea id="description" v-model="form.description" class="form-control" cols="30" rows="10" placeholder="Description"></textarea>
                    <span class="text-danger" v-if="errors && errors.description">{{ errors.description[0] }}</span>
                </div>
                <div class="form-group mt-2">
                    <label for="description">Start date</label>
                    <input type="date" class="form-control" v-model="form.start_date">
                    <span class="text-danger" v-if="errors && errors.start_date">{{ errors.start_date[0] }}</span>
                </div>
                <div class="form-group mt-2">
                    <label for="description">End date</label>
                    <input type="date" class="form-control" v-model="form.end_date">
                    <span class="text-danger" v-if="errors && errors.end_date">{{ errors.end_date[0] }}</span>
                </div>
                <div class="form-group">
                    <label>Membres</label>
                    <v-select :options="users" @input="searchUser" v-model="form.members" multiple @close="selectClosed" :selectable="option => option.value"></v-select>
                    
                </div>
                <div class="form-group">
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>

import {reactive,ref,onMounted} from 'vue';

import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

import useTask from '../../../services/task';

import client from "../../../axios/index";

export default {
    components:{
        vSelect
    },
    
    props:['slug','project_slug'],

    setup(props){
        const {axiosClient}=client();

        const users=ref([]);

        const {getTask,task,updateTask,errors}=useTask();

        
        const form=reactive({
            name:'',
            description:'',
            start_date:'',
            end_date:'',
            project_slug:props.project_slug,
            members:[]
        })


        onMounted(async()=>{
            await getTask(props.slug);
            form.name=task.value.name,
            form.description=task.value.description
            form.start_date=task.value.start_date
            form.end_date=task.value.end_date
            form.members=task.value.members.map(i=>{
                return {
                    value:i.id,
                    label:i.name
                }
            })
        })

       
        const searchUser=async (event)=>{
            if(event.target.value.length>3){
                const res= await axiosClient.post('/getUsers',{search:event.target.value});
                users.value=res.data.users.map(i=>{
                    return {
                        value:i.id,
                        label:i.name
                    }
                })
            }   
        }

        const selectClosed=()=>{
            users.value=[];
        }

        const save=async()=>{
            const formData={...form};
            const members=[...formData.members];
            if(members.length){
                formData.members=members.map(i=>i.value)
            }
            await updateTask(props.slug,formData,true);
        }

        return{
            form,
            save,
            users,
            searchUser,
            selectClosed,
            errors
        }
       
    }
};
</script>

