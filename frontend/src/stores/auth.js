import { defineStore } from 'pinia'
import api from '../services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('access_token') || null,
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.token,
    userName: (state) => state.user ? `${state.user.firstName} ${state.user.lastName}` : ''
  },
  
  actions: {
    async login(credentials) {
      try {
        const response = await api.post('/auth/login', credentials)
        this.token = response.data.access_token
        this.user = response.data.user
        localStorage.setItem('access_token', this.token)
        return response.data
      } catch (error) {
        throw error.response.data
      }
    },
    
    async register(userData) {
      try {
        const response = await api.post('/auth/register', userData)
        this.token = response.data.access_token
        this.user = response.data.user
        localStorage.setItem('access_token', this.token)
        return response.data
      } catch (error) {
        throw error.response.data
      }
    },
    
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('access_token')
    },
    
    async fetchProfile() {
      try {
        const response = await api.get('/api/user/profile')
        this.user = response.data
      } catch (error) {
        this.logout()
      }
    }
  }
})

// src/services/api.js
import axios from 'axios'