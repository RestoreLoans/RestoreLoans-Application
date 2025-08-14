import { defineStore } from 'pinia';
import api from '../services/api';




export const useDashboardAuthStore = defineStore('dashboard', {
  state: () => ({
     loans: []

  }),
   getters: {
  
  },

  actions: {

  

    async loan(credentials) {
    await api.post('loans', credentials);
    },
     async getYourLoans() {
      const res = await api.get('loans/');
      console.log(res.data);
      this.loans = res.data;
    },



  },
});
