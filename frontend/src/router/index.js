import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [
  { path: '/', name: 'Home', component: () => import('../views/Home.vue') },
  { path: '/login', name: 'Login', component: () => import('../views/Login.vue') },
  { path: '/register', name: 'Register', component: () => import('../views/Register.vue') },
  { path: '/dashboard', name: 'Dashboard', component: () => import('../views/Dashboard.vue'), meta: { requiresAuth: false } },
  { path: '/loans/apply', name: 'LoanApplication', component: () => import('../views/LoanApplication.vue'), meta: { requiresAuth: true } },
  { path: '/company', name: 'Company', component: () => import('../views/company.vue'), meta: { requiresAuth: false } },
  { path:'/historyview', name: 'HistoryView', component: () => import('../views/HistoryView.vue') },  
  { path: '/payments', name: 'Payments', component: () => import('../views/Payments.vue'), meta: { requiresAuth: true } },
  { path: '/about', name: 'About', component: () => import('../views/About.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
