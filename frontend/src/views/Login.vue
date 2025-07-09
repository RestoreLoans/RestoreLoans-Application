<template>
  <div class="container" style="max-width: 400px; margin-top: 50px;">
    <div class="card">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Email</label>
          <input v-model="form.email" type="email" required>
        </div>
        <div class="form-group">
          <label>Password</label>
          <input v-model="form.password" type="password" required>
        </div>
        <button type="submit" class="btn btn-primary" :disabled="loading">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>
      <p style="margin-top: 20px;">
        Don't have an account? <router-link to="/register">Register</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

export default {
  name: 'Login',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const loading = ref(false)
    
    const form = ref({
      email: '',
      password: ''
    })
    
    const handleLogin = async () => {
      loading.value = true
      try {
        await authStore.login(form.value)
        router.push('/dashboard')
      } catch (error) {
        alert(error.message || 'Login failed')
      } finally {
        loading.value = false
      }
    }
    
    return {
      form,
      loading,
      handleLogin
    }
  }
}
</script>