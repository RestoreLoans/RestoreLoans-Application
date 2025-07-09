<template>
  <div class="container" style="max-width: 400px; margin-top: 50px;">
    <div class="card p-4 shadow">
      <h2 class="text-center mb-4">Login</h2>

      <form @submit.prevent="handleLogin">
        <div class="form-group mb-3">
          <label>Email</label>
          <input v-model="form.email" type="email" class="form-control" required>
        </div>

        <div class="form-group mb-4">
          <label>Password</label>
          <input v-model="form.password" type="password" class="form-control" required>
        </div>

        <button type="submit" class="btn btn-primary w-100" :disabled="loading">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>

        <div v-if="error" class="alert alert-danger mt-3">
          {{ error }}
        </div>
      </form>

      <p class="text-center mt-3">
        Don't have an account? <router-link to="/register">Register</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)
const error = ref('')

const form = ref({
  email: '',
  password: ''
})

const handleLogin = async () => {
  error.value = ''
  loading.value = true
  try {
    await authStore.login(form.value)
    router.push('/dashboard')
  } catch (err) {
    error.value = err.response?.data?.error || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>
