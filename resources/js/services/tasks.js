import { ref } from "vue" 
import { useRouter } from "vue-router";
import client from "../axios/index";


export default function useTask(){
    const tasks=ref([]);
    const task=ref({});
    const errors=ref({});

    const router=useRouter();

    const {axiosClient}=client();

    const getTasks=async()=>{
        try{
            const response=await axiosClient.get('tasks');
            tasks.value=response;
        }
        catch(error){
            console.log("error",error)
        }
     
    }

    const getTask=async(id)=>{
        try{
            const response=await axiosClient.get(`tasks/${id}`);
            task.value=response.data.task;
        }
        catch(error){
            console.log("error",error)
        }
   
    }

    const saveTask=async (data)=>{
        try{
            await axiosClient.post('tasks',data);
            router.push({name:'tasks.index'});
        }
        catch(error){
            errors.value=error.response.data.errors
            console.log("error",error)
        }
    }

    const updateTask=async (id,data)=>{
        try{
            await axiosClient.patch(`tasks/${id}`,data);
            router.push({name:'tasks.index'});
        }
        catch(error){
            errors.value=error.response.data.errors
            console.log("error",error)
        }
    }

    const deleteTask=async (id)=>{
        try{
            await axiosClient.delete(`tasks/${id}`);
            router.push({name:'tasks.index'});
        }
        catch(error){
            console.log("error data",error.data)
        }
    }

    return {
        tasks,
        task,
        membres,
        getTasks,
        getTask,
        saveTask,
        updateTask,
        deleteTask,
        errors
    }

}