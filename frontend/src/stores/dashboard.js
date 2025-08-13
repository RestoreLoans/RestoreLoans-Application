import { defineStore } from 'pinia';
import api from '../services/api';




export const dashboardAuthStore = defineStore('dashboard', {
  state: () => ({
  

  }),
   getters: {
  
  },

  actions: {

  

    async loan(credentials) {
      const res = await api.post('auth/login', credentials,
      );
       
         
      this.token = res.data.access_token;
         this.user = res.data.user;
      localStorage.setItem('token', this.token);
            localStorage.setItem('user', JSON.stringify(this.user));
    },



  },
});
