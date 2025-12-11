<template>
  <footer class="footer">
    <div class="container footer-content">
      <div class="footer-brand">
        <router-link to="/" class="footer-logo">
          Restore Loans
        </router-link>
        <p class="footer-tagline">Fast, secure, and reliable lending solutions</p>
      </div>

        <div class="footer-contact">
        <p>Email: info@restoreloans.com</p>
        <p>Phone: +27747776140</p>
        <p>Address: 62 Beacon Road, Florida North 1709</p>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; {{ new Date().getFullYear() }} Restore Loans. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup>
// Keep only Bootstrap CSS; remove bootstrap-vue (Vue 2 only)
import 'bootstrap/dist/css/bootstrap.css'
</script>
