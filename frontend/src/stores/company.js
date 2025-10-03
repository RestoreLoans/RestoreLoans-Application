import { defineStore } from 'pinia';
import api from '../services/api';




export const useCompanyStore = defineStore('company', {
  state: () => ({
     companyInformation: null

  }),
   getters: {
  
  },

  actions: {

  

    async addCompany(credentials) {
   const  res= await api.post('companies', credentials);


    },
     async getCompanies(id) {
      const res = await api.get('companies/'+id);
      console.log(res.data);
      this.companyInformation = res.data;
    },
       async deleteCompany(id) {
     await api.delete('companies/'+id);


    },



  },
});
