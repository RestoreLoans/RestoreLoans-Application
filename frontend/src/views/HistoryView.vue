<template>
  <div class="container mt-4">
    <h2 class="mb-3">Statement History</h2>

    <!-- Search / Filter by User or Loan ID -->
    <div class="card p-3 mb-4">
      <h5>Filter History</h5>
      <div class="row mb-2">
        <div class="col-md-4 mb-2">
          <input v-model="filters.user_id" type="number" placeholder="User ID" class="form-control">
        </div>
        <div class="col-md-4 mb-2">
          <input v-model="filters.loan_id" type="number" placeholder="Loan ID" class="form-control">
        </div>
        <div class="col-md-4 mb-2">
          <button @click="fetchHistory" class="btn btn-primary w-100">Search</button>
        </div>
      </div>
    </div>

    <!-- Results Table -->
    <div class="card p-3">
      <h5>History Records</h5>
      <table class="table table-bordered mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Loan ID</th>
            <th>Type</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in history" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.user_id }}</td>
            <td>{{ item.loan_id }}</td>
            <td>{{ item.statement_type }}</td>
            <td>
              <a
                :href="item.file_path"
                class="btn btn-success btn-sm"
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                Download
              </a>
            </td>
          </tr>
          <tr v-if="!history.length">
            <td colspan="5" class="text-center">No history found.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

// ✅ API Base
const API_URL = VITE_API_URL + '/history/'

// ✅ Data
const history = ref([])
const filters = ref({
  user_id: '',
  loan_id: ''
})

// ✅ Fetch history with optional filters
const fetchHistory = async () => {
  try {
    const params = { ...filters.value }
    // remove empty filters
    Object.keys(params).forEach(key => {
      if (!params[key]) delete params[key]
    })

    const query = new URLSearchParams(params).toString()
    const url = query ? `${API_URL}?${query}` : API_URL

    const { data } = await axios.get(url)
    history.value = data
  } catch (error) {
    console.error('Failed to fetch history:', error)
  }
}

// Auto-fetch on load
fetchHistory()
</script>

<style scoped>
.table th,
.table td {
  vertical-align: middle;
}
</style>
