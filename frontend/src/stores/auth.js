import { defineStore } from 'pinia';
import api from '../services/api';




export const useAuthStore = defineStore('auth', {
  state: () => ({
    user:JSON.parse(localStorage.getItem('user')) ||null, // load stored user,
    token: localStorage.getItem('token') || '',

  }),
   getters: {
    isAuthenticated: (state) => !!state.token, // 👈 true if token exists
  },

  actions: {

    async register(data) {
      await api.post('auth/register', data);
    },

    async login(credentials) {
      const res = await api.post('auth/login', credentials,
      );
       
         
      this.token = res.data.access_token;
         this.user = res.data.user;
         console.log(this.user);
      localStorage.setItem('token', this.token);
            localStorage.setItem('user', JSON.stringify(this.user));
    },

    async getProfile(id) {
      const res = await api.get('users/'+id);
      this.user = res.data;

      
     
            localStorage.setItem('user', JSON.stringify(this.user));
    },


    logout() {
      this.user = null;
      this.token = '';
      localStorage.removeItem('token');
         localStorage.removeItem('user');
    },
  },
});
