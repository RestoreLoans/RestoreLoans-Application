<template>
  <div class="container py-4">
    <h2 class="text-center mb-4">Company Management</h2>

    <!-- Create / Edit Form -->
    <div class="card p-4 pmb-4" v-if="!companyInformation" >
      <h4>{{ isEditing ? 'Edit Company' : 'Add New Company' }}</h4>
      <form @submit.prevent="isEditing ? updateCompany() : addCompany()">
        <div class="form-group mb-2">
          <label>Name</label>
          <input v-model="form.name" type="text" class="form-control" required />
        </div>
        <div class="form-group mb-2">
          <label>Address</label>
          <input v-model="form.address" type="text" class="form-control" required />
        </div>
        <div class="form-group mb-2">
          <label>Email</label>
          <input v-model="form.email" type="email" class="form-control" required />
        </div>
        <div class="form-group mb-2">
          <label>Phone</label>
          <input v-model="form.phone" type="text" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-primary w-100 mt-2">
          {{ isEditing ? 'Update Company' : 'Add Company' }}
        </button>
      </form>
    </div>

    <!-- Company List -->

    <div class="card p-4">
      <h4>Company data</h4>
      <div v-if="!companyInformation">No companies available.</div>
       <table class="company-table" v-if="companyInformation">
        <tbody>
          <tr>
            <th>Name</th>
            <td>{{ companyInformation.name }}</td>
          </tr>
          <tr>
            <th>Address</th>
            <td>{{ companyInformation.address }}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{{ companyInformation.email }}</td>
          </tr>
          <tr>
            <th>Phone</th>
            <td>{{ companyInformation.phone }}</td>
          </tr>
          <tr>
            <th>User ID</th>
            <td>{{ companyInformation.user_id ?? 'N/A' }}</td>
          </tr>
          <tr>
            <th>ID</th>
            <td>{{ companyInformation.id }}</td>
          </tr>
          <tr>
            <th>Created At</th>
            <td>{{ companyInformation.created_at }}</td>
          </tr>
          <tr>
            <th>Updated At</th>
            <td>{{ companyInformation.updated_at }}</td>
          </tr>
        </tbody>
      </table>
      <div v-if="companyInformation" class="mt-3">
        <button class="btn btn-sm btn-danger space" @click="deleteCompany(companyInformation.id)">Delete</button>
      </div>
             
     <!-- <ul class="list-group">
      
         
          <div>
            <button class="btn btn-sm btn-warning me-2" @click="editCompany(company)">Edit</button>
            <button class="btn btn-sm btn-danger" @click="deleteCompany(company.id)">Delete</button>
          </div>
        
      </ul>-->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted ,computed} from 'vue'
import { useCompanyStore } from '../stores/company'
import { useAuthStore } from '../stores/auth'
const authStore = useAuthStore()
const companyStore = useCompanyStore()
const companyInformation = ref(null);
const companies = ref([])
const form = ref({
  name: '',
  address: '',
  email: '',
  phone: ''
})
const isEditing = ref(false)
const editingId = ref(null)
onMounted(async() => {
  try {
    console.log("logged in");
        computed(() => authStore.user.id  )
        console.log("medupe");
        console.log(authStore.user )

     
           await  companyStore.getCompanies(authStore.user.company_id )
             companyInformation.value = companyStore.companyInformation;
      
       
     



  } catch (error) {
    console.error('Failed to fetch history:', error)
  }
})

const fetchCompanies = async () => {
  try {
  //  const res = await axios.get(apiBase)
   // companies.value = res.data
  } catch (err) {
    console.error('Error fetching companies', err)
  }
}

const addCompany = async () => {
  try {

    console.log("ANOTHERVALUE"+authStore.user.id);

const loanData = {
 name: form.value.name,
  address: form.value.address,
  email:  form.value.email,
  phone:  form.value.phone,
  user_id: authStore.user.id
}
   await  companyStore.addCompany(loanData);
await  authStore.getProfile(authStore.user.id );
await  companyStore.getCompanies(authStore.user.company_id )
  companyInformation.value = companyStore.companyInformation;


   // await fetchCompanies()
   // resetForm()
  } catch (err) {
    console.error('Error adding company', err)
  }
}

const editCompany = (company) => {
  form.value = { ...company }
  editingId.value = company.id
  isEditing.value = true
}

const updateCompany = async () => {
  try {
 //   await axios.put(`${apiBase}${editingId.value}/`, form.value)
    await fetchCompanies()
    resetForm()
  } catch (err) {
    console.error('Error updating company', err)
  }
}

const deleteCompany = async (id) => {
  if (confirm('Are you sure you want to delete this company?')) {
    try {
       await  companyStore.deleteCompany(id);
         await  authStore.getProfile(authStore.user.id );

  companyInformation.value = null



      // await fetchCompanies()

    } catch (err) {
      console.error('Error deleting company', err)
    }
  }
}

const resetForm = () => {
  form.value = { name: '', address: '', email: '', phone: '' }
  isEditing.value = false
  editingId.value = null
}

onMounted(fetchCompanies)
</script>

<style scoped>
.container {
  max-width: 700px;
  margin: auto;
}
.table-container {
  max-width: 100%;
  overflow-x: auto; /* horizontal scroll if table is too wide */
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.title {
  margin-bottom: 16px;
  font-size: 1.5rem;
  color: #333;
  font-weight: 600;
}

.company-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px; /* ensures horizontal scroll if smaller viewport */
}

.company-table th,
.company-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.company-table th {
  background-color: #f0f0f0;
  font-weight: 500;
  color: #555;
}

.company-table tr:hover {
  background-color: #f5f5f5;
  transition: background-color 0.2s;
}
</style>
