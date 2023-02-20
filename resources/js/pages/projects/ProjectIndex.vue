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
                >
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>description</th>
                        <th>date</th>
                    </tr>
                </thead>
                </DataTable>
                <!-- <DataTable
                    class="table table-bordered"
                    id="dataTable"
                    width="100%"
                    cellspacing="0"
                >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Office</th>
                            <th>Age</th>
                            <th>Start date</th>
                            <th>Salary</th>
                        </tr>
                    </thead>
                   
                    <tbody>
                        <tr>
                            <td>Tiger Nixon</td>
                            <td>System Architect</td>
                            <td>Edinburgh</td>
                            <td>61</td>
                            <td>2011/04/25</td>
                            <td>$320,800</td>
                        </tr>
                        <tr>
                            <td>Garrett Winters</td>
                            <td>Accountant</td>
                            <td>Tokyo</td>
                            <td>63</td>
                            <td>2011/07/25</td>
                            <td>$170,750</td>
                        </tr>
                        <tr>
                            <td>Ashton Cox</td>
                            <td>Junior Technical Author</td>
                            <td>San Francisco</td>
                            <td>66</td>
                            <td>2009/01/12</td>
                            <td>$86,000</td>
                        </tr>          
                    </tbody>
                </DataTable> -->
            </div>
        </div>
    </div>
</template>

<script>
import { useUserStore } from '../../store/userStore';
import DataTable from 'datatables.net-vue3';
import DataTablesLib from 'datatables.net';
import 'datatables.net-responsive-dt'


DataTable.use(DataTablesLib);

 
export default {
    components:{
        DataTable
    },

    setup(){
        const store = useUserStore();
        const options={
            responsive: true,

            processing: true,
            serverSide: true,

            ajax: {
                url: "/api/projects/getData",
                type: 'post',
                dataSrc: 'data', 
                headers: {
                    Authorization: `Bearer: ${store.user.token}`
                },
            },

            orderCellsTop: true,
            fixedHeader: true,
           
            columns: [
                {
                    targets: 0,
                    title: 'Name',
                    data: 'name',
                },
                {
                    targets: 1,
                    title: 'Description',
                    data: 'description',
                    render: function (data, type, row, meta) {
                        return row.description.slice(0, 50)+'...'
                    }
                },
                {
                    targets: 2,
                    title: 'Date',
                    data: 'created_at',
                }
            ]
        }

        return {
            options
        }
    }
};
</script>
