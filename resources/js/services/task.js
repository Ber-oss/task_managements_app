import { ref } from "vue";
import { useRouter } from "vue-router";
import client from "../axios/index";
import { useUserStore } from '../store/userStore';
import { useToast } from "vue-toastification";

export default function useTask(){
    const tasks=ref([]);
    const task=ref({});
    const errors=ref({});

    const toast = useToast();

    
    const router=useRouter();

    const {axiosClient}=client();

    const store = useUserStore();

    const getTasks=async()=>{
        try{
            const response=await axiosClient.get('tasks');
            tasks.value=response;
        }
        catch(error){
            if(error.response.status && error.response.status==401){
                localStorage.clear();
                store.updateUser();
                router.push({name:'login'});
            }
            console.log("error",error)
        }
     
    }

    const getTask=async(id)=>{
        try{
            const response=await axiosClient.get(`tasks/${id}`);
            task.value=response.data.task;
        }
        catch(error){
            if(error.response.status && error.response.status==401){
                localStorage.clear();
                store.updateUser();
                router.push({name:'login'});
            }
            console.log("error",error)
        }
   
    }

    const saveTask=async (data,toProjectShow=false)=>{
        try{
            await axiosClient.post('tasks',data);

            toast.success("Task created", {
                timeout: 2000
            });

            if(toProjectShow){
                router.push({name:'projects.show',params:{slug:data.project_slug}});
            }
            else{
                router.push({name:'tasks.index'});
            }
           
        }
        catch(error){
            if(error.response.status && error.response.status==401){
                localStorage.clear();
                store.updateUser();
                router.push({name:'login'});
            }
            else{
                errors.value=error.response.data.errors
                console.log("error",error)
            }
           
        }
    }

    const updateTask=async (id,data,toProjectShow=false)=>{
        try{
            await axiosClient.patch(`tasks/${id}`,data);

            toast.success("Task updated", {
                timeout: 2000
            });

            if(toProjectShow){
                router.push({name:'projects.show',params:{slug:data.project_slug}});
            }
            else{
                router.push({name:'tasks.index'});
            }
        }
        catch(error){
            if(error.response.status && error.response.status==401){
                localStorage.clear();
                store.updateUser();
                router.push({name:'login'});
            }
            else{
                errors.value=error.response.data.errors
                console.log("error",error)
            }
           
        }
    }

    const updateNote=async(slug,user_id,project_slug,data)=>{
        try{
            await axiosClient.patch(`tasks/note/${slug}/${user_id}`,data);

            toast.success("Task updated", {
                timeout: 2000
            });
            router.push({name:'projects.show',params:{slug:project_slug}});
           
        }
        catch(error){
            if(error.response.status && error.response.status==401){
                localStorage.clear();
                store.updateUser();
                router.push({name:'login'});
            }
            else{
                errors.value=error.response.data.errors
                console.log("error",error)
            }
           
        }
    }

    const deleteTask=async (id)=>{
        try{
            await axiosClient.delete(`tasks/${id}`);
            toast.success("Task deleted", {
                timeout: 2000
            });
        }
        catch(error){
            if(error.response.status && error.response.status==401){
                localStorage.clear();
                store.updateUser();
                router.push({name:'login'});
            }
            else{
                console.log("error data",error.response.data)
            }
            
        }
    }

    return {
        tasks,
        task,
        getTasks,
        getTask,
        saveTask,
        updateTask,
        deleteTask,
        updateNote,
        errors
    }

}