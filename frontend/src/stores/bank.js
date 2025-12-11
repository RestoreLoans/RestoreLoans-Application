import { defineStore } from 'pinia';
import api from '../services/api';




export const useBankStore = defineStore('bank', {
  state: () => ({
     bankInformation: null

  }),
   getters: {
  
  },

  actions: {

  

    async addBank(credentials) {
   const  res= await api.post('bank-details', credentials);


    },
     async getBank(id) {
      const res = await api.get('bank-details/'+id);
      console.log(res.data);
      this.companyInformation = res.data;
    },
       async deleteCompany(id) {
     await api.delete('bank-details/'+id);


    },



  },
});
