import { ref } from "vue";
import { useRouter } from "vue-router";
import client from "../axios/index";
import { useUserStore } from '../store/userStore';


export default function useTask(){
    const tasks=ref([]);
    const task=ref({});
    const errors=ref({});

    const router=useRouter();

    const {axiosClient}=client();

    const store = useUserStore();

    const getTasks=async()=>{
        try{
            const response=await axiosClient.get('tasks');
            tasks.value=response;
        }
        catch(error){
            if(error.response.status==401){
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
            if(error.response.status==401){
                localStorage.clear();
                store.updateUser();
                router.push({name:'login'});
            }
            console.log("error",error)
        }
   
    }

    const saveTask=async (data)=>{
        try{
            await axiosClient.post('tasks',data);
            router.push({name:'tasks.index'});
        }
        catch(error){
            if(error.response.status==401){
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

    const updateTask=async (id,data)=>{
        try{
            await axiosClient.patch(`tasks/${id}`,data);
            router.push({name:'tasks.index'});
        }
        catch(error){
            if(error.response.status==401){
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
            router.push({name:'tasks.index'});
        }
        catch(error){
            if(error.response.status==401){
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
        errors
    }

}