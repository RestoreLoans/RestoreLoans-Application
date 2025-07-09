<template>
  <div class="container" style="max-width: 600px; margin-top: 30px;">
    <div class="card">
      <h2>Apply for a Loan</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>Loan Type</label>
          <select v-model="form.loanType" required>
            <option value="">Select Loan Type</option>
            <option value="Home">Home Loan</option>
            <option value="Personal">Personal Loan</option>
            <option value="Auto">Auto Loan</option>
            <option value="Business">Business Loan</option>
          </select>
        </div>
        
        <div class="form-group">
          <label>Loan Amount ($)</label>
          <input v-model="form.amount" type="number" min="1000" max="1000000" required>
        </div>
        
        <div class="form-group">
          <label>Loan Term (months)</label>
          <select v-model="form.term" required>
            <option value="">Select Term</option>
            <option value="12">12 months</option>
            <option value="24">24 months</option>
            <option value="36">36 months</option>
            <option value="48">48 months</option>
            <option value="60">60 months</option>
          </select>
        </div>
        
        <div v-if="calculation" class="card" style="background: #e3f2fd; margin: 20px 0;">
          <h3>Loan Calculation</h3>
          <p><strong>Monthly Payment:</strong> ${{ calculation.monthlyPayment }}</p>
          <p><strong>Total Amount Payable:</strong> ${{ calculation.totalAmount }}</p>
          <p><strong>Interest Rate:</strong> {{ calculation.interestRate }}% per annum</p>
        </div>
        
        <div class="form-group">
          <button type="button" @click="calculateLoan" class="btn btn-secondary">
            Calculate Loan
          </button>
        </div>
        
        <div class="form-group">
          <label>
            <input type="checkbox" v-model="form.agreeTerms" required>
            I agree to the terms and conditions
          </label>
        </div>
        
        <button type="submit" class="btn btn-primary" :disabled="loading || !calculation">
          {{ loading ? 'Submitting...' : 'Submit Application' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'

export default {
  name: 'LoanApplication',
  setup() {
    const router = useRouter()
    const loading = ref(false)
    const calculation = ref(null)
    
    const form = ref({
      loanType: '',
      amount: '',
      term: '',
      agreeTerms: false
    })
    
    const calculateLoan = async () => {
      if (!form.value.amount || !form.value.term) {
        alert('Please enter amount and term first')
        return
      }
      
      try {
        const response = await api.post('/api/loans/calculate', {
          amount: parseFloat(form.value.amount),
          term: parseInt(form.value.term)
        })
        calculation.value = response.data
      } catch (error) {
        console.error('Calculation failed:', error)
      }
    }
    
    const handleSubmit = async () => {
      loading.value = true
      try {
        await api.post('/api/loans/apply', {
          loanType: form.value.loanType,
          amount: parseFloat(form.value.amount),
          term: parseInt(form.value.term)
        })
        alert('Loan application submitted successfully!')
        router.push('/dashboard')
      } catch (error) {
        alert('Application failed. Please try again.')
      } finally {
        loading.value = false
      }
    }
    
    return {
      form,
      loading,
      calculation,
      calculateLoan,
      handleSubmit
    }
  }
}
</script>
