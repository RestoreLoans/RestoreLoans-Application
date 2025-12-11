<template>
  <div>
    <!-- Hero Section -->
    <section class="hero text-center py-5 bg-light">
      <div class="container">
        <h1 class="display-4">Get Your Loan Today</h1>
        <p class="lead">Fast, secure, and reliable lending solutions</p>
        <br />
<!--router-link to="/register" class="btn btn-primary btn-lg mt-3">Get Started</router-link-->
      </div>
    </section>

    <!-- Calculator Section -->
    <section class="calculator py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-sm-10 col-md-8 col-lg-6">
            <div class="card p-4 shadow-sm">
              <h2 class="mb-4 text-center">Loan Calculator</h2>

              <form @submit.prevent="handleButtonClick">
                <div class="form-group mb-3">
                  <label>Loan Amount (R)</label>
                  <input v-model="loanAmount" type="number" class="form-control" placeholder="Enter amount" />
                </div>

                <div class="form-group mb-4">
                  <label>Loan Duration (months)</label>
                  <select v-model="loanDuration" class="form-control">
                    <option value="">Select Loan Duration</option>
                    <option value="1">1 month</option>
                  </select>
                </div>

                <div v-if="calculation" class="result card p-3 mt-3 bg-light border">
                  <h4 class="mb-3 text-center">Loan Details</h4>
                  <p><strong>Monthly Payment:</strong> R{{ calculation.monthlyPayment }}</p>
                  <p><strong>Total Amount Repayable:</strong> R{{ calculation.totalAmount }}</p>
                  <p><strong>Interest Rate:</strong> {{ calculation.interestRate }}% per month</p>
                </div>

                <button type="submit" class="btn btn-primary w-100 mb-3">
                  {{ calculation ? 'Apply Now' : 'Calculate' }}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const loanAmount = ref('')
const loanDuration = ref('')
const calculation = ref(null)

const calculateLoan = () => {
  const amount = parseFloat(loanAmount.value)
  const duration = parseInt(loanDuration.value, 10)

  if (isNaN(amount) || amount <= 0 || isNaN(duration) || duration <= 0) {
    alert('Please enter valid loan amount and duration (in months).')
    return
  }

  // 5% monthly interest
  const monthlyInterest = 0.05
  const interest = amount * monthlyInterest * duration

  // Initiation fee: R165 + 10% of amount over R1,000
  const initiationFee = 165 + (amount > 1000 ? 0.1 * (amount - 1000) : 0)

  // Monthly service fee: R60 per month
  const monthlyServiceFee = 60 * duration

  // Total repayment
  const totalRepayment = amount + interest + initiationFee + monthlyServiceFee

  // Approximate monthly payment
  const monthlyPayment = totalRepayment / duration

  calculation.value = {
    monthlyPayment: monthlyPayment.toFixed(2),
    totalAmount: totalRepayment.toFixed(2),
    interestRate: (monthlyInterest * 100).toFixed(2)
  }
}

const handleButtonClick = () => {
  if (!calculation.value) {
    calculateLoan()
  } else {
    router.push('/login')
  }
}
</script>
