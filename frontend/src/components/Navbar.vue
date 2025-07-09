<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-content">
        <router-link to="/" class="navbar-brand">
          Restore Loans
        </router-link>
        
        <ul class="navbar-nav">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/about">About</router-link></li>
          <li v-if="!isAuthenticated"><router-link to="/login">Login</router-link></li>
          <li v-if="!isAuthenticated"><router-link to="/register">Register</router-link></li>
          <li v-if="isAuthenticated"><router-link to="/dashboard">Dashboard</router-link></li>
          <li v-if="isAuthenticated">
            <button @click="logout" class="btn btn-secondary">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from '../stores/auth'

export default {
  name: 'Navbar',
  setup() {
    const authStore = useAuthStore()
    
    return {
      isAuthenticated: authStore.isAuthenticated,
      logout: () => {
        authStore.logout()
        this.$router.push('/')
      }
    }
  }
}
</script>