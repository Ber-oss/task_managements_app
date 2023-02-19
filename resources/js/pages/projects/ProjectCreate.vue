<template>
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Projects/create</h1>
        <router-link :to="{name:'projects.index'}" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
            class="fas fa-arrow-left fa-sm text-white-50"></i> Projects</router-link>
    </div>
   
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">
                Add new project
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
                <div class="form-group">
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>

import {reactive} from 'vue';
import useProject from '../../services/project';

export default {
    setup(){
        const {saveProject,errors}=useProject();

        const form=reactive({
            name:'',
            description:''
        })

        const save=async()=>{
            await saveProject(form);
            console.log("err",errors.value)
        }

        return{
            form,
            save,
            errors
        }
       
    }
};
</script>

<style lang="scss" scoped></style>
