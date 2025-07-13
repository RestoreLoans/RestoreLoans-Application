<template>
  <div class="container mt-4">
    <h2 class="mb-3">Document Manager</h2>

    <!-- Search -->
    <div class="card p-3 mb-4">
      <h5>Search Filters</h5>
      <div class="row mb-2">
        <div class="col-md-3">
          <input v-model="filters.user_id" type="number" placeholder="User ID" class="form-control">
        </div>
        <div class="col-md-3">
          <input v-model="filters.loan_id" type="number" placeholder="Loan ID" class="form-control">
        </div>
        <div class="col-md-3">
          <input v-model="filters.document_name" type="text" placeholder="Document Name" class="form-control">
        </div>
        <div class="col-md-3">
          <select v-model="filters.document_status" class="form-control">
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>
      <button @click="fetchDocuments" class="btn btn-primary">Search</button>
    </div>

    <!-- Form -->
    <div class="card p-3 mb-4">
      <h5>{{ editMode ? 'Edit Document' : 'Upload Document' }}</h5>
      <form @submit.prevent="saveDocument">
        <div class="row">
          <div class="col-md-4 mb-2">
            <input v-model="form.user_id" type="number" class="form-control" placeholder="User ID" required />
          </div>
          <div class="col-md-4 mb-2">
            <input v-model="form.loan_id" type="number" class="form-control" placeholder="Loan ID" required />
          </div>
          <div class="col-md-4 mb-2">
            <input v-model="form.document_name" type="text" class="form-control" placeholder="Document Name" required />
          </div>
          <div class="col-md-4 mb-2">
            <input v-model="form.file_name" type="text" class="form-control" placeholder="File Name" />
          </div>
          <div class="col-md-4 mb-2">
            <input v-model="form.file_path" type="text" class="form-control" placeholder="File Path" />
          </div>
          <div class="col-md-4 mb-2">
            <input v-model="form.file_size" type="number" class="form-control" placeholder="File Size (bytes)" />
          </div>
          <div class="col-md-4 mb-2">
            <select v-model="form.status" class="form-control">
              <option value="">Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div class="col-md-8 mb-2">
            <input v-model="form.remarks" type="text" class="form-control" placeholder="Remarks" />
          </div>
        </div>
        <button type="submit" class="btn btn-success">
          {{ editMode ? 'Update' : 'Upload' }}
        </button>
        <button type="button" class="btn btn-secondary ms-2" @click="resetForm" v-if="editMode">Cancel</button>
      </form>
    </div>

    <!-- Table -->
    <div class="card p-3">
      <h5>All Documents</h5>
      <table class="table table-bordered mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Loan</th>
            <th>Doc Name</th>
            <th>Status</th>
            <th>File</th>
            <th>Size</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="doc in documents" :key="doc.id">
            <td>{{ doc.id }}</td>
            <td>{{ doc.user_id }}</td>
            <td>{{ doc.loan_id }}</td>
            <td>{{ doc.document_name }}</td>
            <td>{{ doc.status }}</td>
            <td>{{ doc.file_name }}</td>
            <td>{{ doc.file_size }} bytes</td>
            <td>
              <button class="btn btn-sm btn-warning me-1" @click="editDocument(doc)">Edit</button>
              <button class="btn btn-sm btn-danger" @click="deleteDocument(doc.id)">Delete</button>
            </td>
          </tr>
          <tr v-if="!documents.length">
            <td colspan="8" class="text-center">No documents found.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const API_URL = VITE_API_URL + '/documents/'

const documents = ref([])
const editMode = ref(false)

const form = ref({
  id: null,
  user_id: '',
  loan_id: '',
  document_name: '',
  file_name: '',
  file_path: '',
  file_size: '',
  status: 'pending',
  upload_date: new Date().toISOString(),
  remarks: ''
})

const filters = ref({
  user_id: '',
  loan_id: '',
  document_name: '',
  document_status: ''
})

const fetchDocuments = async () => {
  try {
    const params = { ...filters.value }
    const query = new URLSearchParams(params).toString()
    const { data } = await axios.get(`${API_URL}?${query}`)
    documents.value = data
  } catch (error) {
    console.error('Failed to fetch documents', error)
  }
}

const saveDocument = async () => {
  try {
    if (editMode.value) {
      await axios.put(`${API_URL}${form.value.id}/`, form.value)
    } else {
      await axios.post(API_URL, form.value)
    }
    await fetchDocuments()
    resetForm()
  } catch (error) {
    console.error('Failed to save document', error)
  }
}

const editDocument = (doc) => {
  form.value = { ...doc }
  editMode.value = true
}

const resetForm = () => {
  form.value = {
    id: null,
    user_id: '',
    loan_id: '',
    document_name: '',
    file_name: '',
    file_path: '',
    file_size: '',
    status: 'pending',
    upload_date: new Date().toISOString(),
    remarks: ''
  }
  editMode.value = false
}

const deleteDocument = async (id) => {
  if (confirm('Are you sure you want to delete this document?')) {
    try {
      await axios.delete(`${API_URL}${id}/`)
      await fetchDocuments()
    } catch (error) {
      console.error('Failed to delete document', error)
    }
  }
}

fetchDocuments()
</script>

<style scoped>
.table th,
.table td {
  vertical-align: middle;
}
</style>
