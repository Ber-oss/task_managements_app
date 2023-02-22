import { useRouter } from 'vue-router';
import { useUserStore } from '../store/userStore';
import { useToast } from "vue-toastification";

export default function useAuth(){
    const store = useUserStore();
    const router=useRouter();

    const toast = useToast();

    const login=async ({email,password})=>{
        try{
            const authResponse=await axios.post('api/auth/login', {
                email,
                password
            });

            localStorage.setItem('userData',JSON.stringify(authResponse.data.user))
            localStorage.setItem('token',authResponse.data.access_token)
            localStorage.setItem(
                'avatar',
                authResponse.data.user.profile.avatar_url || '/avatars/default.png'
            )

            store.updateUser()

            router.push({name:'dashboard'})
        }
        catch(err){
            if(err.response.status==401){
                toast.error("Unauthorized", {
                    timeout: 2000
                });
            }
           
            console.log("error",err)
        }
    }

    return{
        login
    }
}