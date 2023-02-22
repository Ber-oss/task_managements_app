import { useUserStore } from '../../store/userStore';
import useTask from '../task';
import { useRouter } from 'vue-router';

export default function task_datatable(dt,project_slug=''){
    const store = useUserStore();
    const router=useRouter();
    const {deleteTask}=useTask();

    const options={
        // responsive: true,
        dom: 'rtip',
        order: [[5, 'desc'],[0,'asc']],

        processing: true,
        serverSide: true,

        ajax: {
            url: "/api/tasks/getData",
            type: 'post',
            dataSrc: 'data', 
            data:{
                project_slug,
            },
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
                    return row.description?row.description.slice(0, 50)+'...':'--'
                }
            },
            {
                targets: 2,
                title: 'Start date',
                data: 'start_date',
                render: function (data, type, row, meta) {
                    return row.start_date? new Date(row.start_date).toLocaleDateString('fr-FR'):'--'
                }
            },
            {
                targets: 3,
                title: 'End date',
                data: 'end_date'
            },
            {
                targets: 4,
                title: 'Status',
                data: 'status',
                render: function (data, type, row, meta) {
                    const status={
                        'pending':'warning',
                        'processing':'primary',
                        'completed':'success'
                    }
                        
                    
                    return `<span class='badge badge-${status[row.status]}'>${row.status}</span>`
                }
            },
            {
                targets:5,
                title: 'Created at',
                data: 'created_at',
            },
            {
                targets: 6,
                title:'Action',
                data:'slug',
                "orderable": false,
                render: function (data, type, row, meta) {
                    return store.user.data.id==row.project.user_id?`
                        <div class="d-flex">                       
                            <a href="javascript:0;" data-slug=${row.slug}  class="btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon mr-2 btn-show" title="Details">
                                    <i class="fas fa-eye text-primary"></i>
                            </a>
                            
                            <a href="javascript:0;" data-slug=${row.slug} class="btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon mr-2 btn-edit" title="Modifier">
                                <i class="fas fa-pen text-success"></i>
                            </a>
                        
                            <a href="javascript:0;" data-slug=${row.slug} class="btn btn-sm btn-clean btn-icon btn-delete" title="Delete">
                                <i class="fas fa-trash text-danger"></i>
                            </a>
                    
                        </div>`:
                        `
                        <div class="d-flex">                       
                            <a href="javascript:0;" data-slug=${row.slug}  class="btn btn-sm btn-primary btn-text-primary btn-hover-primary btn-icon mr-2 btn-show" title="Details">
                                <i class="fas fa-eye text-white"></i> Details
                            </a>   
                        </div>`

                        ;
                }
            }
        ]
    }

    const evt=()=>{
        $(dt.value.dt().table().body()).on('click', '.btn-show', function () {
            let task_slug=this.getAttribute('data-slug')
            router.push({name:'tasks.show',params:{slug:task_slug,project_slug}})
        });
        $(dt.value.dt().table().body()).on('click', '.btn-edit', function () {
            let task_slug=this.getAttribute('data-slug')
            router.push({name:'tasks.edit',params:{slug:task_slug,project_slug}})
        });
        $(dt.value.dt().table().body()).on('click','.btn-delete', function () {
            let slug=this.getAttribute('data-slug')
            if(confirm('Do you want to delete this task?')){
                deleteTask(slug).then(()=>{
                    dt.value.dt().table().ajax.reload();
                })            
            }  
        });
    }

    return {
        options,
        evt
    }
}