<template>
  <div class="container history-container mt-4">
    <h2 class="mb-3 text-center">Statement History</h2>

    <!-- Search / Filter by User or Loan ID -->
    <div class="card filter-card p-3 mb-4 shadow-sm">
      <h5 class="text-center mb-3">Filter History</h5>
      <div class="row justify-content-center mb-2">
        <div class="col-12 col-md-4 mb-2 d-flex justify-content-center">
          <input v-model="filters.user_id" type="number" placeholder="User ID" class="form-control text-center filter-input" />
        </div>
        <div class="col-12 col-md-4 mb-2 d-flex justify-content-center">
          <input v-model="filters.loan_id" type="number" placeholder="Loan ID" class="form-control text-center filter-input" />
        </div>
        <br/>
        <div class="col-12 col-md-4 mb-2 d-flex justify-content-center">
          <button @click="fetchHistory" class="btn btn-primary w-100 w-md-auto filter-btn">Search</button>
        </div>
      </div>
    </div>

    <!-- Results Table -->
    <div class="card p-3 shadow-sm">
      <h5 class="text-center">History Records</h5>
      <div class="table-responsive">
        <table class="table table-bordered mt-3 align-middle">
          <thead class="table-light">
              <tr class="bg-gray-200">
      <th class="text-center border border-gray-300 px-2 py-1">ID</th>
      <th class="text-center border border-gray-300 px-2 py-1">User ID</th>
      <th class="text-center border border-gray-300 px-2 py-1">Loan Type</th>
      <th class="text-center border border-gray-300 px-2 py-1">Status</th>
      <th class="text-center border border-gray-300 px-2 py-1">Loan Amount</th>
      <th class="text-center border border-gray-300 px-2 py-1">Interest Rate</th>
      <th class="text-center border border-gray-300 px-2 py-1">Monthly Installment</th>
      <th class="text-center border border-gray-300 px-2 py-1">Start Date</th>
      <th class="text-center border border-gray-300 px-2 py-1">End Date</th>
      <th class="text-center border border-gray-300 px-2 py-1">Created At</th>
    </tr>
          </thead>
          <tbody>
            <tr v-for="item in history" :key="item.id">
           <td class="text-center">{{ item.id }}</td>
  <td class="text-center">{{ item.user_id }}</td>
  <td class="text-center">{{ item.loan_type }}</td>
  <td class="text-center">{{ item.status }}</td>
  <td class="text-center">{{ item.loan_amount }}</td>
  <td class="text-center">{{ item.interest_rate }}%</td>
  <td class="text-center">{{ item.monthly_installment }}</td>
    <td class="text-center">{{ item.start_date }}</td>


      <td class="text-center">{{ item.end_date }}</td>
              <td class="text-center">
                <a
                  :href="item.file_path"
                  class="btn btn-success btn-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                  :download="`statement-${item.id}.pdf`"
                  v-if="item.file_path && item.file_path.endsWith('.pdf')"
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useAuthStore } from '../stores/auth'
import { useDashboardAuthStore } from '../stores/dashboard'


const authStore = useAuthStore()
const dashboardStore = useDashboardAuthStore()

const loandata = ref([])

const history = ref([])
const filters = ref({
  user_id: '',
  loan_id: ''
})
onMounted(() => {
  try {
    console.log("logged in");
 dashboardStore.getYourLoans()
history.value = dashboardStore.loans;

  
  } catch (error) {
    console.error('Failed to fetch history:', error)
  }
})

const fetchHistory = async () => {

}

onMounted(fetchHistory)
</script>

<style scoped>
.history-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 10px;
}

.filter-card {
  background: #f8f9fa;
  border-radius: 12px;
  border: none;
}

.filter-input {
  min-width: 200px;
  max-width: 250px;
}

.filter-btn {
  min-width: 120px;
}

.card {
  border-radius: 12px;
}

.table th,
.table td {
  vertical-align: middle;
  text-align: center;
}

.table th {
  background: #f1f3f5;
  font-weight: 600;
}

@media (max-width: 767px) {
  .history-container {
    padding: 0 2px;
  }
  .filter-card,
  .card {
    padding: 1rem 0.5rem !important;
  }
  .filter-input,
  .filter-btn {
    width: 100% !important;
    min-width: unset;
    max-width: unset;
  }
  .table-responsive {
    font-size: 0.95rem;
  }
  .table th,
  .table td {
    padding: 0.5rem 0.25rem;
  }
}
</style>
