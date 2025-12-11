<template>
  <div class="center-container">
    <div class="card p-4 shadow mb-5">
      <h2 class="mb-4 text-center">Make a Payment</h2>
      <form @submit.prevent="handlePayment">
        <div class="form-group mb-3">
          <label for="loanId">Select Loan</label>
          <select
            id="loanId"
            v-model="form.loanId"
            class="form-control"
            required
          >
            <option disabled value="">Select a loan</option>
            <option
              v-for="loan in activeLoans"
              :key="loan._id"
              :value="loan._id"
            >
              {{ loan.loanType }} - Balance: ${{ loan.balance.toFixed(2) }}
            </option>
          </select>
        </div>

        <div class="form-group mb-3">
          <label for="amount">Payment Amount (ZAR)</label>
          <input
            id="amount"
            v-model.number="form.amount"
            type="number"
            min="0.01"
            step="0.01"
            class="form-control"
            placeholder="Enter payment amount"
            required
          />
        </div>

        <div class="form-group mb-4">
          <label for="paymentMethod">Payment Method</label>
          <select
            id="paymentMethod"
            v-model="form.paymentMethod"
            class="form-control"
            required
          >
            <option disabled value="">Select Payment Method</option>
            <option value="bank_account">Bank Account</option>
            <option value="credit_card">Credit Card</option>
            <option value="debit_card">Debit Card</option>
          </select>
        </div>

        <button
          type="submit"
          class="btn btn-primary w-100"
          :disabled="loading"
        >
          {{ loading ? 'Processing...' : 'Make Payment' }}
        </button>

        <div v-if="error" class="alert alert-danger mt-3">
          {{ error }}
        </div>
      </form>
    </div>

    <div v-if="payments.length" class="card p-4 shadow">
      <h2 class="mb-4 text-center">Payment History</h2>
      <div class="payment-history">
        <div
          v-for="payment in payments"
          :key="payment._id"
          class="payment-item"
        >
          <div class="payment-info">
            <h4>${{ payment.amount.toFixed(2) }}</h4>
            <p>{{ payment.loanId.loanType }} Loan</p>
            <p>{{ formatDate(payment.paymentDate) }}</p>
            <span
              class="payment-status"
              :class="payment.status.toLowerCase()"
            >
              {{ payment.status }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../services/api'

const loading = ref(false)
const error = ref('')
const loans = ref([])
const payments = ref([])

const form = ref({
  loanId: '',
  amount: '',
  paymentMethod: ''
})

const activeLoans = computed(() =>
  loans.value.filter(
    loan =>
      (loan.status === 'active' || loan.status === 'approved') &&
      loan.balance > 0
  )
)

const fetchLoans = async () => {
  try {
    const response = await api.get('/loans')
    loans.value = response.data
  } catch (err) {
    console.error('Error fetching loans:', err)
    error.value = 'Failed to load loans. Please try again later.'
  }
}

const fetchPayments = async () => {
  try {
    const response = await api.get('/payments')
    payments.value = response.data
  } catch (err) {
    console.error('Error fetching payments:', err)
    error.value = 'Failed to load payments. Please try again later.'
  }
}

const handlePayment = async () => {
  error.value = ''

  if (!form.value.loanId || !form.value.amount || !form.value.paymentMethod) {
    error.value = 'Please fill out all fields.'
    return
  }
  if (form.value.amount <= 0) {
    error.value = 'Payment amount must be greater than zero.'
    return
  }

  loading.value = true
  try {
    await api.post('/payments', {
      loanId: form.value.loanId,
      amount: form.value.amount,
      paymentMethod: form.value.paymentMethod
    })
    alert('Payment processed successfully!')
    form.value = { loanId: '', amount: '', paymentMethod: '' }
    await fetchLoans()
    await fetchPayments()
  } catch (err) {
    console.error('Payment failed:', err)
    error.value = err.response?.data?.error || 'Payment failed. Please try again.'
  } finally {
    loading.value = false
  }
}

const formatDate = dateStr => new Date(dateStr).toLocaleDateString()

onMounted(() => {
  fetchLoans()
  fetchPayments()
})
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
  display: inline-block;
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

<style scoped>

.center-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f5f6fa;
  margin-top: 30px;
  min-height: 100vh;
}

.center-container > .card {
  width: 100%;
  max-width: 700px;
}
</style>
