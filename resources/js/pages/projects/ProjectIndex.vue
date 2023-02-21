<template>
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Projects</h1>
        <router-link :to="{name:'projects.create'}" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
            class="fas fa-plus fa-sm text-white-50"></i> Create project</router-link>
    </div>
    <!-- DataTales Example -->
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">
                Projects
            </h6>
        </div>
        <div class="card-body">
            <div class="mb-7">
            <div class="row">
                <div class="col-12">
                    <div class="row">
                        <div class="col-md-3 my-2">
                            <div class="d-flex align-items-center">
                                <input type="text" class="form-control" placeholder="Global"
                                    id="datatable_search_global" />
                            </div>
                        </div>
                        <div class="col-md-3 my-2">
                            <div class="d-flex align-items-center">
                                <select class="form-control" id="datatable_search_own">
                                    <option value="">My projects</option>
                                    <option value="" selected>Projects that i have created</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="col-md-3 my-2">
                            <div class="d-flex align-items-center">
                                <input type="text" class="form-control" placeholder="Name"
                                    id="datatable_search_name" />
                            </div>
                        </div>

                    </div>
                </div>
                <!-- <div class="col-lg-3 col-xl-4 mt-5 mt-lg-0">
                        <a href="#" class="btn btn-light-primary px-6 font-weight-bold">Search</a>
                    </div> -->
            </div>
        </div>
            <div class="table-responsive">
                <DataTable
                    :options="options"
                    ref="dt"
                    class="table table-bordered"
                />
            </div>
        </div>
    </div>
</template>

<script>
import useProject from '../../services/project';

import project_datatable from '../../services/datatables/project-datatable';
import DataTable from 'datatables.net-vue3';
import DataTablesLib from 'datatables.net';
import 'datatables.net-responsive-dt';

import {ref,onMounted} from "vue"

import { useRouter } from 'vue-router';

import { useToast } from "vue-toastification";

DataTable.use(DataTablesLib);

 
export default {
    components:{
        DataTable
    },

    setup(){    
        const {deleteProject}=useProject();
        const {options}=project_datatable();
        const toast = useToast();

        const dt=ref(null)

        const router=useRouter();

        onMounted(()=>{
            $(dt.value.dt().table().body()).on('click', '.btn-show', function () {
                let slug=this.getAttribute('data-slug')
                router.push({name:'projects.show',params:{slug}})
            });
            $(dt.value.dt().table().body()).on('click', '.btn-edit', function () {
                let slug=this.getAttribute('data-slug')
                router.push({name:'projects.edit',params:{slug}})
            });
          
            $(dt.value.dt().table().body()).on('click', '.btn-delete', function () {
                let slug=this.getAttribute('data-slug')
                if(confirm('Do you want to delete this project?')){
                    deleteProject(slug).then(()=>{
                        dt.value.dt().table().ajax.reload();
                        toast.success("Project deleted", {
                            timeout: 2000
                        });
                    })            
                }              
            });
        })

        return {
            options,
            dt
        }
    }
};
</script>
