<template>
  <nav class="navbar navbar-expand-md">
    <div class="container">
      <router-link to="/" class="navbar-brand">
        Restore Loans
      </router-link>

      <button class="navbar-toggler" type="button" @click="menuOpen = !menuOpen">
        <span class="navbar-toggler-icon">☰</span>
      </button>

      <div :class="['collapse navbar-collapse', { show: menuOpen }]">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><router-link class="nav-link" to="/" @click="closeMenu">Home</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/about" @click="closeMenu">About</router-link></li>
          <!-- <li class="nav-item"><router-link class="nav-link" to="/company" @click="closeMenu">Company</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/bank" @click="closeMenu">Bank</router-link></li> -->
          <li v-if="!isAuthenticated" class="nav-item"><router-link class="nav-link" to="/login" @click="closeMenu">Login</router-link></li>
          <li v-if="!isAuthenticated" class="nav-item"><router-link class="nav-link" to="/register" @click="closeMenu">Register</router-link></li>
          <li v-if="isAuthenticated" class="nav-item"><router-link class="nav-link" to="/dashboard" @click="closeMenu">Dashboard</router-link></li>
          <li v-if="isAuthenticated" class="nav-item"><router-link class="nav-link" to="/historyview" @click="closeMenu">History</router-link></li>
          <li v-if="isAuthenticated" class="nav-item"><button @click="handleLogout" class="btn btn-outline-light ms-2">Logout</button></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

// Import Bootstrap CSS only (Bootstrap-Vue is Vue 2 only)
import 'bootstrap/dist/css/bootstrap.css'

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
  menuOpen.value = false
}
</script>
