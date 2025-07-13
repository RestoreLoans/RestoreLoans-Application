<template>
  <div class="register-container">
    <div class="card register-card">
      <h2 class="text-center mb-4">Create Account</h2>
      
      <form @submit.prevent="handleRegister">
        <div class="form-group mb-3">
          <label>First Name</label>
          <input v-model="form.firstName" type="text" class="form-control" required>
        </div>
        
        <div class="form-group mb-3">
          <label>Last Name</label>
          <input v-model="form.lastName" type="text" class="form-control" required>
        </div>
        
        <div class="form-group mb-3">
          <label>Email</label>
          <input v-model="form.email" type="email" class="form-control" required>
        </div>
        
        <div class="form-group mb-3">
          <label>Password</label>
          <input v-model="form.password" type="password" class="form-control" required>
        </div>
        
        <div class="form-group mb-3">
          <label>Confirm Password</label>
          <input v-model="form.confirmPassword" type="password" class="form-control" required>
        </div>
        
        <div class="form-group mb-3">
          <label>ID Number</label>
          <input v-model="form.idNumber" type="text" class="form-control" required>
        </div>
        
        <div class="form-group mb-3">
          <label>Phone Number</label>
          <input v-model="form.phoneNumber" type="text" class="form-control" required>
        </div>
        
        <div class="form-group mb-4">
          <label>Gender</label>
          <select v-model="form.gender" class="form-control" required>
            <option disabled value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <button type="submit" class="btn btn-primary w-100" :disabled="loading">
          {{ loading ? 'Registering...' : 'Register' }}
        </button>

        <div v-if="error" class="alert alert-danger mt-3">
          {{ error }}
        </div>
      </form>
      
      <p class="text-center mt-3">
        Already have an account? <router-link to="/login">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import '../views/css/reg.css'

const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)
const error = ref('')

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  idNumber: '',
  phoneNumber: '',
  gender: ''
})

const handleRegister = async () => {
  error.value = ''

  if (form.value.password !== form.value.confirmPassword) {
    error.value = 'Passwords do not match'
    return
  }

  loading.value = true
  try {
    await authStore.register(form.value)
    router.push('/dashboard')
  } catch (err) {
    error.value = err.response?.data?.error || 'Registration failed'
  } finally {
    loading.value = false
  }
}
</script>

