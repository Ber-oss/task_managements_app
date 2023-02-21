import { defineStore } from 'pinia'


export const useUserStore = defineStore('user', {
    state: () => ({ 
        user:{
            data:localStorage.getItem('userData')
            ?JSON.parse(localStorage.getItem('userData'))
            :{},

            token:localStorage.getItem('token') || null,
            avatar:localStorage.getItem('avatar') || null
        }
     }),

     actions: {
        // since we rely on `this`, we cannot use an arrow function
        updateUser() {
          this.user.token=localStorage.getItem('token') || null

          this.user.data=localStorage.getItem('userData')
          ?JSON.parse(localStorage.getItem('userData'))
          :{};

          this.user.avatar=localStorage.getItem('avatar') || null
        }
      },
})