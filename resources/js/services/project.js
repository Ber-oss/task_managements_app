import { ref } from "vue";
import { useRouter } from "vue-router";
import client from "../axios/index";


export default function useProject(){
    const projects=ref([]);
    const project=ref({});
    const membres=ref([]);
    const errors=ref({});

    const router=useRouter();

    const {axiosClient}=client();

    const getProjects=async()=>{
        try{
            const response=await axiosClient.get('projects');
            projects.value=response;
        }
        catch(error){
            console.log("error",error)
        }
     
    }

    const getProject=async(id)=>{
        try{
            const response=await axiosClient.get(`projects/${id}`);
            project.value=response.data.project;
            membres.value=response.data.membres;
        }
        catch(error){
            console.log("error",error)
        }
   
    }

    const saveProject=async (data)=>{
        try{
            await axiosClient.post('projects',data);
            router.push({name:'projects.index'});
        }
        catch(error){
            errors.value=error.response.data.errors
            console.log("error",error)
        }
    }

    const updateProject=async (id,data)=>{
        try{
            await axiosClient.patch(`projects/${id}`,data);
            router.push({name:'projects.index'});
        }
        catch(error){
            errors.value=error.response.data.errors
            console.log("error",error)
        }
    }

    const deleteProject=async (id)=>{
        try{
            await axiosClient.delete(`projects/${id}`);
            router.push({name:'projects.index'});
        }
        catch(error){
            console.log("error data",error.data)
        }
    }

    return {
        projects,
        project,
        membres,
        getProjects,
        getProject,
        saveProject,
        updateProject,
        deleteProject,
        errors
    }

}