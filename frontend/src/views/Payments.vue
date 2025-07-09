<template>
  <div class="container" style="margin-top: 30px;">
    <div class="card">
      <h2>Make a Payment</h2>
      <form @submit.prevent="handlePayment">
        <div class="form-group">
          <label>Select Loan</label>
          <select v-model="form.loanId" required>
            <option value="">Select a loan</option>
            <option v-for="loan in activeLoans" :key="loan._id" :value="loan._id">
              {{ loan.loanType }} - Balance: ${{ loan.balance }}
            </option>
          </select>
        </div>
        
        <div class="form-group">
          <label>Payment Amount ($)</label>
          <input v-model="form.amount" type="number" min="1" step="0.01" required>
        </div>
        
        <div class="form-group">
          <label>Payment Method</label>
          <select v-model="form.paymentMethod" required>
            <option value="">Select Payment Method</option>
            <option value="bank_account">Bank Account</option>
            <option value="credit_card">Credit Card</option>
            <option value="debit_card">Debit Card</option>
          </select>
        </div>
        
        <button type="submit" class="btn btn-primary" :disabled="loading">
          {{ loading ? 'Processing...' : 'Make Payment' }}
        </button>
      </form>
    </div>
    
    <div class="card" v-if="payments.length > 0">
      <h2>Payment History</h2>
      <div class="payment-history">
        <div v-for="payment in payments" :key="payment._id" class="payment-item">
          <div class="payment-info">
            <h4>${{ payment.amount }}</h4>
            <p>{{ payment.loanId.loanType }} Loan</p>
            <p>{{ formatDate(payment.paymentDate) }}</p>
            <span class="payment-status" :class="payment.status">
              {{ payment.status }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import api from '../services/api'

export default {
  name: 'Payments',
  setup() {
    const loading = ref(false)
    const loans = ref([])
    const payments = ref([])
    
    const form = ref({
      loanId: '',
      amount: '',
      paymentMethod: ''
    })
    
    const activeLoans = computed(() => {
      return loans.value.filter(loan => 
        (loan.status === 'active' || loan.status === 'approved') && loan.balance > 0
      )
    })
    
    const fetchLoans = async () => {
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
    }
    
    const handlePayment = async () => {
      loading.value = true
      try {
        await api.post('/api/payments', form.value)
        alert('Payment processed successfully!')
        form.value = { loanId: '', amount: '', paymentMethod: '' }
        await fetchLoans()
        await fetchPayments()
      } catch (error) {
        alert('Payment failed. Please try again.')
      } finally {
        loading.value = false
      }
    }
    
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString()
    }
    
    onMounted(async () => {
      await fetchLoans()
      await fetchPayments()
    })
    
    return {
      form,
      loading,
      activeLoans,
      payments,
      handlePayment,
      formatDate
    }
  }
}
</script>

<style scoped>
.payment-history {
  display: grid;
  gap: 15px;
  margin-top: 20px;
}

.payment-item {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  border-left: 4px solid #28a745;
}

.payment-info h4 {
  margin: 0 0 10px 0;
  color: #28a745;
}

.payment-status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
}

.payment-status.completed {
  background: #d4edda;
  color: #155724;
}

.payment-status.pending {
  background: #fff3cd;
  color: #856404;
}

.payment-status.failed {
  background: #f8d7da;
  color: #721c24;
}
</style>
