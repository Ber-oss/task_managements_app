import { useUserStore } from '../../store/userStore';
import useProject from '../project';
import { useRouter } from 'vue-router';


export default function project_datatable(dt){
    const store = useUserStore();
    const router=useRouter();
    const {deleteProject}=useProject();

    const options={
        // responsive: true,
        dom: 'rtip',
        order: [[2, 'desc'],[0,'asc']],

        processing: true,
        serverSide: true,

        ajax: {
            url: "/api/projects/getData",
            type: 'post',
            dataSrc: 'data', 
            data:{
                user_id:store.user.data.id
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
                title: 'Created at',
                data: 'created_at',
            },
            {
                targets: 3,
                title: 'Created by',
                data: 'user.name',
            },
            {
                targets: 4,
                title:'Action',
                data:'slug',
                "orderable": false,
                render: function (data, type, row, meta) {
                    return store.user.data.id==row.user_id?`
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
                        </div>`;
                }
            },
            {
                targets: 5,
                title: 'user_id',
                data: 'user_id',
                visible:false
            },
            
        ]
    }

    const evt=()=>{
        $('#datatable_search_global').on('keyup', function (e) {
            e.preventDefault();
            dt.value.dt().table().search(e.target.value).draw()
        });

        $('#datatable_search_name').on('keyup', function (e) {
            dt.value.dt().table().column(0).search(e.target.value).draw()
        });

        $('#datatable_search_user_id').on('change', function (e) {
            if(e.target.value!=''){
                dt.value.dt().table().column(5).search(store.user.data.id).draw()
            }     
            else{
                dt.value.dt().table().column(5).search("").draw()
            }  
        });

        $('#datatable_search_created_at').on('change', function (e) {
            dt.value.dt().table().column(2).search(e.target.value).draw()
        });

        $(dt.value.dt().table().body()).on('click', '.btn-show', function () {
            let slug=this.getAttribute('data-slug')
            let id=this.getAttribute('data-id')
            router.push({name:'projects.show',params:{slug,id}})
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
                })            
            }              
        });
    }

    return {
        options,evt
    }
}