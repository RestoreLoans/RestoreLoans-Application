<template>
  <nav class="navbar">
    <div class="container">
      <router-link to="/" class="navbar-brand">
        Restore Loans
      </router-link>
      <button class="navbar-toggler" @click="menuOpen = !menuOpen">
        ☰
      </button>
      <ul class="navbar-nav">
        <li><router-link to="/" @click="closeMenu">Home</router-link></li>
        <li><router-link to="/about" @click="closeMenu">About</router-link></li>
        <li><router-link to="/company" @click="closeMenu">company</router-link></li>
        <li v-if="!isAuthenticated">
          <router-link to="/login" @click="closeMenu">Login</router-link>
        </li>
        <li v-if="!isAuthenticated">
          <router-link to="/register" @click="closeMenu">Register</router-link>
        </li>
        <li v-if="isAuthenticated">
          <router-link to="/dashboard" @click="closeMenu">Dashboard</router-link>
        </li>
        <li v-if="isAuthenticated">
          <button @click="handleLogout" class="btn btn-secondary">Logout</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import '../components/style.css'

const router = useRouter()
const authStore = useAuthStore()
const menuOpen = ref(false)

const isAuthenticated = computed(() => authStore.isAuthenticated)

const handleLogout = () => {
  authStore.logout()
  router.push('/')
  menuOpen.value = false
}

const closeMenu = () => {
  menuOpen.value = true
}
</script>

