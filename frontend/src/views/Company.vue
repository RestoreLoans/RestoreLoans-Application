<template>
  <div class="container py-4">
    <h2 class="text-center mb-4">Company Management</h2>

    <!-- Create / Edit Form -->
    <div class="card p-4 mb-4">
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
      <h4>Company List</h4>
      <div v-if="companies.length === 0">No companies available.</div>
      <ul class="list-group">
        <li v-for="company in companies" :key="company.id" class="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <strong>{{ company.name }}</strong><br />
            {{ company.address }}<br />
            {{ company.email }} | {{ company.phone }}
          </div>
          <div>
            <button class="btn btn-sm btn-warning me-2" @click="editCompany(company)">Edit</button>
            <button class="btn btn-sm btn-danger" @click="deleteCompany(company.id)">Delete</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const companies = ref([])
const form = ref({
  name: '',
  address: '',
  email: '',
  phone: ''
})
const isEditing = ref(false)
const editingId = ref(null)
const apiBase = VITE_API_URL + '/companies/'

const fetchCompanies = async () => {
  try {
    const res = await axios.get(apiBase)
    companies.value = res.data
  } catch (err) {
    console.error('Error fetching companies', err)
  }
}

const addCompany = async () => {
  try {
    await axios.post(apiBase, form.value)
    await fetchCompanies()
    resetForm()
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
    await axios.put(`${apiBase}${editingId.value}/`, form.value)
    await fetchCompanies()
    resetForm()
  } catch (err) {
    console.error('Error updating company', err)
  }
}

const deleteCompany = async (id) => {
  if (confirm('Are you sure you want to delete this company?')) {
    try {
      await axios.delete(`${apiBase}${id}/`)
      await fetchCompanies()
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
</style>
