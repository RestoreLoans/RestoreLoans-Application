<template>
  <div class="container" style="margin-top: 30px;">
    <div class="card">
      <h1>Welcome, {{ userName }}!</h1>
      <p>Manage your loans and payments from your dashboard</p>
    </div>
    
    <div class="dashboard-grid">
      <div class="stat-card">
        <div class="stat-number">R{{ totalOutstanding }}</div>
        <div>Total Outstanding</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">{{ activeLoans }}</div>
        <div>Active Loans</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">R{{ totalPaid }}</div>
        <div>Total Paid</div>
      </div>
    </div>
    
    <div class="card">
      <h2>Quick Actions</h2>
      <div class="quick-actions">
        <router-link to="/loans/apply" class="action-btn btn btn-primary">
          Apply for Loan
        </router-link>
        <router-link to="/payments" class="action-btn btn btn-secondary">
          Make Payment
        </router-link>
        <router-link to="/historyview" class="action-btn btn btn-primary">
          View Statements
        </router-link>
      </div>
    </div>
    
    <div class="card" v-if="loans.length > 0">
      <h2>Your Loans</h2>
      <div class="loan-list">
        <div v-for="loan in loans" :key="loan._id" class="loan-item card">
          <h3>{{ loan.loanType }} Loan</h3>
          <p><strong>Amount:</strong> ${{ loan.amount }}</p>
          <p><strong>Balance:</strong> ${{ loan.balance }}</p>
          <p><strong>Status:</strong> {{ loan.status }}</p>
          <p><strong>Monthly Payment:</strong> ${{ loan.monthlyPayment }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import api from '../services/api'
import { useRouter } from 'vue-router'

export default {
  name: 'Dashboard',
  setup() {
    const authStore = useAuthStore()
    const loans = ref([])
    const payments = ref([])
    
    const userName ='Samkelo Ngubo' //computed(() => authStore.userName)
    
    const totalOutstanding = computed(() => {
      return loans.value.reduce((sum, loan) => sum + loan.balance, 0).toFixed(2)
    })
    
    const activeLoans = computed(() => {
      return loans.value.filter(loan => loan.status === 'active' || loan.status === 'approved').length
    })
    
    const totalPaid = computed(() => {
      return payments.value.reduce((sum, payment) => sum + payment.amount, 0).toFixed(2)
    })
    
  /*  const fetchLoans = async () => {
      try {
        const response = await api.get('/api/loans')
        loans.value = response.data
      } catch (error) {
        console.error('Error fetching loans:', error)
      }
    }
    
    const fetchPayments = async () => {
      try {
        const response = await api.get('/api/payments')
        payments.value = response.data
      } catch (error) {
        console.error('Error fetching payments:', error)
      }
    }*/
    
    const router = useRouter()

    const viewStatements = () => {
      router.push('/historyview')
    }
    
    onMounted(async () => {
     // await authStore.fetchProfile()
     // await fetchLoans()
     // await fetchPayments()
    })
    
    return {
      userName,
      loans,
      totalOutstanding,
      activeLoans,
      totalPaid,
      viewStatements
    }
  }
}
</script>

<style scoped>
.loan-list {
  display: grid;
  gap: 15px;
  margin-top: 20px;
}

.loan-item {
  background: #f8f9fa;
  border-left: 4px solid #007bff;
}
</style>

