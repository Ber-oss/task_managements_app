import { useUserStore } from '../../store/userStore';
export default function project_datatable(){
    const store = useUserStore();
    const options={
        // responsive: true,

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
            }
        ]
    }

    return {
        options
    }
}