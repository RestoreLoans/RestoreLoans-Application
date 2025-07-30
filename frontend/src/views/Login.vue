<template>
  <div class="login-container">
    <div class="card login-card">
      <h2 class="text-center mb-4">Login</h2>

      <form @submit.prevent="handleLogin">
        <div class="form-group mb-3">
          <label>Email</label>
          <input
            v-model="form.email"
            type="email"
            class="form-control"
            required
          >
        </div>

        <div class="form-group mb-4">
          <label>Password</label>
          <input
            v-model="form.password"
            type="password"
            class="form-control"
            required
          >
        </div>

        <button
          type="submit"
          class="btn btn-primary w-100"
          :disabled="loading"
        >
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>

        <div v-if="error" class="alert alert-danger mt-3">
          {{ error }}
        </div>
      </form>

      <p class="text-center mt-3">
        Don't have an account?
        <router-link to="/register">Register</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import '../views/css/login.css'



const router = useRouter()
const auth = useAuthStore()

const loading = ref(false)
const error = ref('')

const form = ref({
  email: '',
  password: ''
})

const handleLogin = async () => {
  loading.value = true
  error.value = ''
    const payload = {
       username: form.value.email,
      password: form.value.password,

    }
      const data = new URLSearchParams();
  data.append('grant_type', 'password');
  data.append('username', form.value.email);
  data.append('password', form.value.password);
  data.append('scope', '');
  data.append('client_id', 'string');
  data.append('client_secret', 'string');

  try {
    await auth.login(data)
    console.log('Login successful')
    router.push('/dashboard')
  } catch (err) {
    if (err.response?.data?.detail) {
      error.value = err.response.data.detail
    } else if (err.response?.data) {
      error.value = JSON.stringify(err.response.data)
    } else {
      error.value = 'Login failed. Please check your credentials.'
    }
  } finally {
    loading.value = false
  }
}
</script>

