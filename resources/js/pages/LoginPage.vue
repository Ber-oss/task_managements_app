<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-xl-10 col-lg-8 col-md-9">
        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body p-0">
              <div class="col-lg-12">
                <div class="p-5">
                  <div class="text-center">
                    <h1 class="h4 text-gray-900 mb-4">Login !</h1>
                  </div>
                  <form class="user" @submit.prevent="submitForm">
                    <div class="form-group">
                      <input
                        type="email"
                        class="form-control form-control-user"
                        id="exampleInputEmail"
                        aria-describedby="emailHelp"
                        placeholder="Enter Email Address..."
                        v-model="form.email"
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="password"
                        class="form-control form-control-user"
                        id="exampleInputPassword"
                        placeholder="Password"
                        v-model="form.password"
                      />
                    </div>
                    <button
                      type="submit"
                      class="btn btn-primary btn-user btn-block"
                    >
                      Login
                    </button>
                  </form>                
                </div>
              </div>          
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive} from 'vue';
import useAuth from "../services/Auth"
export default {
    setup(){

        const {login}=useAuth()

        const form=reactive({
            email:'',
            password:''
        })

        const submitForm=async()=>{
            await login({...form})
        }

        return {
            submitForm,
            form
        }
    }
};
</script>

<style lang="scss" scoped>
</style>