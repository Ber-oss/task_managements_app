<template>
    <Sidebar />
    <div id="content-wrapper" class="d-flex flex-column">
      <!-- Content Wrapper -->
      <div id="content-wrapper" class="d-flex flex-column">
        <!-- Main Content -->
        <div id="content">
          <!-- Topbar -->
          <nav
            class="
              navbar navbar-expand navbar-light
              bg-white
              topbar
              mb-4
              static-top
              shadow
            "
          >
            <!-- Sidebar Toggle (Topbar) -->
            <button
              id="sidebarToggleTop"
              class="btn btn-link d-md-none rounded-circle mr-3"
            >
              <i class="fa fa-bars"></i>
            </button>
            <!-- Topbar Navbar -->
            <ul class="navbar-nav ml-auto">
            
              <div class="topbar-divider d-none d-sm-block"></div>
  
              <!-- Nav Item - User Information -->
              <li class="nav-item dropdown no-arrow">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span class="mr-2 d-none d-lg-inline text-gray-600 small"
                    >{{store.user.data.name}}</span
                  >
                  <img
                    class="img-profile rounded-circle"
                    :src="store.user.avatar"
                  />
                </a>
                <!-- Dropdown - User Information -->
                <div
                  class="
                    dropdown-menu dropdown-menu-right
                    shadow
                    animated--grow-in
                  "
                  aria-labelledby="userDropdown"
                >
                  <router-link class="dropdown-item" :to="{name:'profile'}">
                    <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                    Profile
                  </router-link>
                  <div class="dropdown-divider"></div>
                  <a
                    class="dropdown-item"
                    href="#"
                    
                    @click.prevent="logout"
                  >
                    <i
                      class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"
                    ></i>
                    Logout
                  </a>
                </div>
              </li>
            </ul>
          </nav>
          <!-- End of Topbar -->
          <!-- Begin Page Content -->
          <div class="container-fluid">
              <router-view></router-view>
          </div>
          
        </div>
        <!-- End of Main Content -->
  
        <!-- Footer -->
       
        <!-- End of Footer -->
      </div>
    </div>
  </template>
  
  <script>
  // import {onMounted,computed} from "vue";

  import Sidebar from "../components/Sidebar.vue";

  // import useUser from '../services/user';

  import {useUserStore} from '../store/userStore';

  import { useRouter } from "vue-router";

  export default {
    components: {
      Sidebar,
    },
    
  
    setup() {
      const store=useUserStore();

      // const {user,getUser}=useUser();

      const router=useRouter();


      // const avatar=computed(()=>{
      //     return store.user.data.profile.avatar_url?store.user.data.profile.avatar_url:'/avatars/default.png'
      // })

      // onMounted(async ()=>{
      //     await getUser(store.user.data.id);
      //     console.log(user.value)
      // })

      const logout=()=>{
        localStorage.clear();
        store.updateUser();
        router.push({name:'login'});
      }

      return {
        store,
        logout
      };
    },
  };
  </script>
  
  <style lang="css" scoped>
  </style>