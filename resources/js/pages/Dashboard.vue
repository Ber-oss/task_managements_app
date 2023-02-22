<template>
    <div>
        <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
    </div>

     <div class="row mt-2">
        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-info shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Projects (total)
                            </div>
                            <div class="row no-gutters align-items-center">
                                <div class="col-auto">
                                    <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">{{data.total_projects}}</div>
                                </div>          
                            </div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-success shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                Completed tasks</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{data.completed_tasks}}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-clipboard-list fa-2x text-success-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-warning shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                Pending tasks</div>
                            <div class="h5 mb-0 font-weight-bold text-warning-800">{{data.pending_tasks}}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-clipboard-list fa-2x text-warning-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-primary shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                Processing tasks</div>
                            <div class="h5 mb-0 font-weight-bold text-primary-800">{{data.processing_tasks}}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-clipboard-list fa-2x text-primary-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import client from "../axios/index";
import {onMounted,ref} from "vue";

export default {
    setup(){
        const {axiosClient}=client();

        const data=ref({
            total_projects:'',
            completed_tasks:'',
            pending_tasks:'',
            processing_tasks:''
        });

        onMounted(async()=>{
            const response=await axiosClient.get('statistics');
            response
            data.value={...response.data}
        })

        return {
            data
        }

    }
};
</script>

