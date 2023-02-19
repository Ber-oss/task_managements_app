import axios from "axios";
import { useUserStore } from '../store/userStore';


export default function client(){
    const store = useUserStore();
    const axiosClient = axios.create({
        baseURL: '/api'
    })
    
    axiosClient.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')|| ''}`
        return config;
    })

    return {
        axiosClient 
    }
};  