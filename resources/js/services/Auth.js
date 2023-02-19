import { useRouter } from 'vue-router';
import { useUserStore } from '../store/userStore'

export default function useAuth(){
    const store = useUserStore()
    const router=useRouter()
    const login=async ({email,password})=>{
        try{
            const authResponse=await axios.post('api/auth/login', {
                email,
                password
            });

            localStorage.setItem('userData',JSON.stringify(authResponse.data.user))
            localStorage.setItem('token',authResponse.data.access_token)

            store.updateUser()

            router.push({name:'dashboard'})
        }
        catch(err){
            console.log("error",err)
        }
    }

    return{
        login
    }
}