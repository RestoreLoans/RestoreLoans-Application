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
</script>

<style scoped>
.footer {
  background-color: #333b44;
  color: white;
  padding-top: 2rem;
  margin-top: 3rem;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2rem;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.2);
}

.footer-logo {
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.2rem;
}

.footer-tagline {
  margin-top: 0.5rem;
  font-size: 0.9rem;
}

.footer-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-nav a {
  color: white;
  text-decoration: none;
}

.footer-nav a:hover {
  text-decoration: underline;
}

.footer-contact p {
  margin: 0.3rem 0;
  font-size: 0.9rem;
}

.footer-bottom {
  text-align: center;
  padding: 0.5rem 0;
  font-size: 0.85rem;
  background-color: #343a40
}
</style>
