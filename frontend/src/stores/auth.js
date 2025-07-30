import { defineStore } from 'pinia';
import api from '../services/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token1') || '',
  }),

  actions: {
    async register(data) {
      await api.post('auth/register', data);
    },

    async login(credentials) {
      const res = await api.post('auth/login', credentials,
      );
      this.token = res.data.access_token;
      console.log(this.token);
      localStorage.setItem('token', this.token);
    },

    async getProfile() {
      const res = await api.get('users/profile');
      this.user = res.data;
    },

    logout() {
      this.user = null;
      this.token = '';
      localStorage.removeItem('token');
    },
  },
});
