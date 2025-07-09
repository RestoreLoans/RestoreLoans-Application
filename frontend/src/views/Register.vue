<template>
  <div class="container" style="max-width: 500px; margin-top: 50px;">
    <div class="card">
      <h2>Register</h2>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label>First Name</label>
          <input v-model="form.firstName" type="text" required>
        </div>
        <div class="form-group">
          <label>Last Name</label>
          <input v-model="form.lastName" type="text" required>
        </div>
        <div class="form-group">
          <label>Email</label>
          <input v-model="form.email" type="email" required>
        </div>
        <div class="form-group">
          <label>Password</label>
          <input v-model="form.password" type="password" required>
        </div>
        <div class="form-group">
          <label>Confirm Password</label>
          <input v-model="form.confirmPassword" type="password" required>
        </div>
        <div class="form-group">
          <label>ID Number</label>
          <input v-model="form.idNumber" type="text" required>
        </div>
        <div class="form-group">
          <label>Phone Number</label>
          <input v-model="form.phoneNumber" type="text" required>
        </div>
        <div class="form-group">
          <label>Gender</label>
          <select v-model="form.gender" required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary" :disabled="loading">
          {{ loading ? 'Registering...' : 'Register' }}
        </button>
      </form>
      <p style="margin-top: 20px;">
        Already have an account? <router-link to="/login">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

export default {
  name: 'Register',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const loading = ref(false)
    
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
      if (form.value.password !== form.value.confirmPassword) {
        alert('Passwords do not match')
        return
      }
      
      loading.value = true
      try {
        await authStore.register(form.value)
        router.push('/dashboard')
      } catch (error) {
        alert(error.message || 'Registration failed')
      } finally {
        loading.value = false
      }
    }
    
    return {
      form,
      loading,
      handleRegister
    }
  }
}
</script>