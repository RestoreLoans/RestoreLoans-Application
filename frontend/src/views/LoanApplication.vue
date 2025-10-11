<template>
  <div class="container" style="max-width: 600px; margin-top: 30px;">
    <div class="card p-4 shadow">
      <h2 class="text-center mb-4">Apply for a Loan</h2>

      <form @submit.prevent="handleSubmit">
        <!-- Loan Type -->
    <!--    <div class="form-group mb-3">
          <label>Loan Type</label>
          <select v-model="form.loanType" class="form-control" required>
            <option disabled value="">Select Loan Type</option>
            <option value="Home">Home Loan</option>
            <option value="Personal">Personal Loan</option>
            <option value="Auto">Auto Loan</option>
            <option value="Business">Business Loan</option>
          </select>
        </div>-->

        <!-- Loan Amount -->
        <div class="form-group mb-3">
          <label>Loan Amount ($)</label>
          <input
            v-model.number="form.amount"
            type="number"
            class="form-control"
            min="1000"
            max="1000000"
            required
            placeholder="Enter amount"
          >
        </div>
         <!-- Calculate Button -->
        <div class="d-grid gap-2 mb-3">
          <button
            type="button"
            @click="calculateLoan"
            class="btn btn-secondary"
          >
            Calculate Loan
          </button>
        </div><br>

        <!-- Loan Calculation Result -->
        <div v-if="calculation" class="card bg-light p-3 mb-4">
          <h4 class="mb-3">Loan Calculation</h4>
     
          <p><strong>Monthly Payment:</strong> R{{ calculation.monthlyPayment }}</p>
          <p><strong>Total Amount Payable:</strong> R{{ calculation.totalAmount }}</p>
          <p><strong>Interest Rate:</strong> {{ calculation.interestRate }}% per month</p>
        </div>

    <!-- Bank Statement -->
    <table class="table table-bordered table-responsive mb-4">
      <thead>
        <tr>
          <th>Document Type</th>
          <th>Upload</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Bank Statement</td>
          <td>
            <input type="file" @change="e => handleFileUpload(e, 'bankStatement')" />
          </td>
        </tr>
        <tr>
          <td>ID Copy</td>
          <td>
            <input type="file" @change="e => handleFileUpload(e, 'idCopy')" />
          </td>
        </tr>
        <tr>
          <td>Payslip</td>
          <td>
            <input type="file" @change="e => handleFileUpload(e, 'payslip')" />
          </td>
        </tr>
      </tbody>
    </table>

        <!-- Terms Agreement -->
        <div class="form-check mb-4">
          <input
            type="checkbox"
            id="agreeTerms"
            v-model="form.agreeTerms"
            class="form-check-input"
            required
          >

          <label class="form-check-label" for="agreeTerms">
            I agree to the terms and conditions
          </label>
        </div>


        <!-- Error Alert -->
        <div v-if="error" class="alert alert-danger mb-3">
          {{ error }}
        </div><br>

        <!-- Submit Button -->
        <div class="d-grid gap-2">
          <button
            type="submit"
            class="btn btn-primary"
            :disabled="loading || !calculation"
          >
            {{ loading ? 'Submitting...' : 'Submit Application' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref,computed } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '../stores/auth'
import { useDashboardAuthStore } from '../stores/dashboard'


const authStore = useAuthStore()
const dashboardStore = useDashboardAuthStore()

const router = useRouter()
const loading = ref(false)
const calculation = ref(null)
const error = ref('')
const files = ref({
  bankStatement: null,
  idCopy: null,
  payslip: null,
})
const form = ref({
  loanType: '',
  amount: '',
  term: '1',
  agreeTerms: false
})
const uploadStatus = ref("")
const allFilesSelected = computed(() =>
  files.value.bankStatement && files.value.idCopy && files.value.payslip
)

const calculateLoan = async () => {
  error.value = ''
calculation.value = {
  monthlyPayment: 0,
  value: 0,
  totalAmount: 0,
  interestRate: 0,
};

  if (!form.value.amount || !form.value.term || form.value.amount < 1000) {
    error.value = 'Please enter a valid loan amount and term'
    return
  }

  try {
  const P = form.value.amount;
    
   const monthlyRate = 0.10;
     const n = form.value.term ;
  if (monthlyRate === 0) {
    return P / n;
  }
  const  month=P * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
       calculation.value.monthlyPayment = month.toFixed(2) ;
              calculation.value.interestRate = 10 ;
             calculation.value.totalAmount = (month ).toFixed(2);
   
  } catch (err) {
    error.value = err.response?.data?.error || 'Calculation failed. Please try again.'
    console.error('Calculation failed:', err)
  }
}
function getEndOfMonthPlusMonths(offset) {
  const date = new Date();
  date.setMonth(date.getMonth() + offset + 1, 0); // day 0 means last day of previous month
  return date.toISOString().split('T')[0];
}
function handleFileUpload(event, type) {
  files.value[type] = event.target.files[0]
}
const handleSubmit = async () => {
  error.value = ''

  if (!calculation.value) {
    error.value = 'Please calculate your loan first.'
    return
  }

  if (!form.value.agreeTerms) {
    error.value = 'You must agree to the terms and conditions.'
    return
  }

  loading.value = true
  try {

const loanData = {
  loan_type: 'home',
  loan_amount: form.value.amount,
  interest_rate: 27,
  loan_term: form.value.term,
  monthly_installment: calculation.value.monthlyPayment,
  start_date: getEndOfMonthPlusMonths(0),
  end_date: getEndOfMonthPlusMonths(form.value.term),
  user_id: authStore.user.id
}

    const formData = new FormData();
    formData.append("monthly_installment", calculation.value.monthlyPayment);
    formData.append("loan_amount", form.value.amount);
    formData.append("loan_type", "home");
    formData.append("start_date", getEndOfMonthPlusMonths(0));
    formData.append("end_date", getEndOfMonthPlusMonths(form.value.term));
    formData.append("interest_rate", 10);
    formData.append("loan_term", 1);
    formData.append("user_id", authStore.user.id);

    // File inputs – example with <input type="file">
   
      formData.append("bank_statement", files.value.bankStatement);
   

      formData.append("proof_of_residence", files.value.payslip);
   

      formData.append("id_document", files.value.idCopy);


      await dashboardStore.loan(formData);
 
    alert('Loan application submitted successfully!')
    router.push('/dashboard')
  } catch (err) {
    error.value = err.response?.data?.error || 'Application failed. Please try again11.' + err
  } finally {
    loading.value = false
  }
}
</script>
<style scoped>
.container {
  max-width: 700px;
  margin: auto;
}
</style>
