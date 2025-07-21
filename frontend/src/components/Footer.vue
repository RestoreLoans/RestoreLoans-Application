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
        <p>Phone: 555-555-5555</p>
        <p>Address: 123 Main St, Anytown, USA</p>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; {{ new Date().getFullYear() }} Restore Loans. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup>
import '../views/css/style.css'
</script>
