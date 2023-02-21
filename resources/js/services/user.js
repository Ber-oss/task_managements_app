import { ref } from "vue";
import { useRouter } from "vue-router";
import client from "../axios/index";
import { useUserStore } from '../store/userStore';
import { useToast } from "vue-toastification";


export default function useUser(){
    const user=ref([]);
    const users=ref([]);
    
    const errors=ref({});

    const router=useRouter();

    const {axiosClient}=client();

    const store = useUserStore();

    const toast = useToast();

    const getUsers=async()=>{
        try{
            const response=await axiosClient.get('users');
            users.value=response;
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

    const getUser=async(id)=>{
        try{
            const response=await axiosClient.get(`users/${id}`);
            user.value=response.data.user;
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

    const saveUser=async (data)=>{
        try{
            await axiosClient.post('users',data);
            toast.success("User created", {
                timeout: 2000
            });
            router.push({name:'users.index'});
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

    const updateUser=async (id,data)=>{
        try{
            await axiosClient.patch(`users/${id}`,data);
            toast.success("User updated", {
                timeout: 2000
            });
            router.push({name:'users.index'});
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

    const updateProfile=async (id,data)=>{
        try{
            await axiosClient.post(`users/${id}/profile`,data);
            await getUser(id);
   
            localStorage.setItem(
                'avatar',
                user.value.profile.avatar_url
                ?user.value.profile.avatar_url
                :'/avatars/default.png'
            )

            store.updateUser();

            toast.success("Profile updated", {
                timeout: 2000
            });
            errors.value={};
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

    const deleteUser=async (id)=>{
        try{
            await axiosClient.delete(`users/${id}`);
        }
        catch(error){
            if(error.response.status==401){
                localStorage.clear();
                store.updateUser();
                router.push({name:'login'});
            }
            else{
                console.log("error data",error.data)
            }
            
        }
    }

    return {
        users,
        user,
        getUsers,
        getUser,
        saveUser,
        updateUser,
        deleteUser,
        updateProfile,
        errors
    }

}