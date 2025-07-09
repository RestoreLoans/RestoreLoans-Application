fix this as per above "<template>
  <div>
    <section class="hero">
      <div class="container">
        <h1>Get Your Loan Today</h1>
        <p>Fast, secure, and reliable lending solutions</p>
        <router-link to="/register" class="btn btn-primary">Get Started</router-link>
      </div>
    </section>
    
    <section class="calculator">
      <h2>Loan Calculator</h2>
      <div class="form-group">
        <label>Loan Amount</label>
        <input v-model="loanAmount" type="number" placeholder="Enter amount">
      </div>
      <div class="form-group">
        <label>Loan Term (months)</label>
        <input v-model="loanTerm" type="number" placeholder="Enter term">
      </div>
      <button @click="calculateLoan" class="btn btn-primary">Calculate</button>
      
      <div v-if="calculation" class="card" style="margin-top: 20px;">
        <h3>Loan Details</h3>
        <p><strong>Monthly Payment:</strong> ${{ calculation.monthlyPayment }}</p>
        <p><strong>Total Amount:</strong> ${{ calculation.totalAmount }}</p>
        <p><strong>Interest Rate:</strong> {{ calculation.interestRate }}%</p>
      </div>
    </section>
  </div>
</template>

<script>
import { ref } from 'vue'
import api from '../services/api'

export default {
  name: 'Home',
  setup() {
    const loanAmount = ref('')
    const loanTerm = ref('')
    const calculation = ref(null)
    
    const calculateLoan = async () => {
      try {
        const response = await api.post('api/loans/calculate', {
          amount: parseFloat(loanAmount.value),
          term: parseInt(loanTerm.value)
        })
        calculation.value = response.data
      } catch (error) {
        console.error('Calculation failed:', error)
      }
    }
    
    return {
      loanAmount,
      loanTerm,
      calculation,
      calculateLoan
    }
  }
}
</script>
