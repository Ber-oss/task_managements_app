<template>
    <div>
        <h1 class="h3 mb-0 text-gray-800">Profile</h1>
    </div>
 
    <div class="card shadow my-4 h-100 ">
        <div class="card-header">
            <h6 class="m-0 font-weight-bold text-primary">Profile of : {{authUser.data.name}}</h6>
        </div>
        <div class="card-body">
            <form action="" @submit.prevent="save">
                <div class="form-group">
                    <label for="first_name">First name</label>
                    <input type="text" v-model="profile.first_name" id="first_name" class="form-control" placeholder="First name">
                    <span class="text-danger" v-if="errors && errors.first_name">{{ errors.first_name[0] }}</span>
                </div>
                <div class="form-group">
                    <label for="last_name">Last name</label>
                    <input type="text" v-model="profile.last_name" id="last_name" class="form-control" placeholder="Last name">
                    <span class="text-danger" v-if="errors && errors.last_name">{{ errors.last_name[0] }}</span>
                </div>
                <div class="form-group">
                    <label>Profile</label>
                    <select class="form-control" v-model="profile.profile">
                        <option value='project manager'>project manager</option>
                        <option value='web developer'>web developer</option>
                        <option value='mobile developer'>mobile developer</option>
                    </select>
                    <span class="text-danger" v-if="errors && errors.profile">{{ errors.profile[0] }}</span>
                </div>

                <div class="form-group">
                    <label>Avatar</label>
                    <input type="file" class="form-control" accept="image/jpeg" @change=uploadImage>
                    <img :src="previewImage" class="uploading-image" width="400" height="200"/>
                </div>

                <div class="form-group">
                    <button type="submit" class="btn btn-primary btn-block">
                        <span>Save</span><pulse-loader :loading="loading"></pulse-loader>
                    </button>
                </div>
            </form>
        </div>
    </div>
 

</template>

<script>

import {onMounted,reactive,ref} from 'vue';
import {useUserStore} from "../store/userStore";
import useUser from '../services/user';

import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

export default {
    components: {
        PulseLoader
    },
    setup(){
        const {user:authUser}=useUserStore();
        const {user,getUser,updateProfile,errors}=useUser();

       const loading=ref(false);

        const profile=reactive({
                first_name:'',
                last_name:'',
                profile:'',
                avatar:null,
        });

        const previewImage=ref('');


        const uploadImage=(e)=>{
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{
                previewImage.value = e.target.result;
                profile.avatar=previewImage.value
            };
        }

        const save=async () =>{
            loading.value=true
            await updateProfile(authUser.data.id,profile);
            if(user.value.profile){
                profile.first_name=user.value.profile.first_name,
                profile.last_name=user.value.profile.last_name,
                profile.profile=user.value.profile.profile
            }
            loading.value=false
       }

       onMounted(async ()=>{
            await getUser(authUser.data.id);
            if(user.value.profile){
                profile.first_name=user.value.profile.first_name,
                profile.last_name=user.value.profile.last_name,
                profile.profile=user.value.profile.profile,
                previewImage.value=user.value.profile.avatar_url
            }
       })
        

        return{
            authUser,
            profile,
            errors,
            save,
            previewImage,
            uploadImage,
            loading
        }
       
    }
};
</script>

<style>
.uploading-imag{
    width:5vw;
    height:5vh;
}
</style>