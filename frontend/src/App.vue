<template>
  <div id="app" style="display: flex; flex-direction: column; min-height: 100vh;">
    <Navbar />
    <main style="flex: 1;">
      <router-view />
    </main>
    <Footer />
  </div>
</template>
<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  }
}
</script>
