<template>
  <footer class="bg-dark text-light py-4">
    <div class="container">
      <div class="row align-items-start">
        <div class="col-12 col-md-5 mb-3 mb-md-0 text-center text-md-left">
          <router-link to="/" class="h5 text-decoration-none text-light d-block mb-1">
            Restore Loans
          </router-link>
          <p class="mb-0 small text-muted">Fast, secure, and reliable lending solutions</p>
        </div>

        <div class="col-12 col-md-4 mb-3 mb-md-0 text-center text-md-left">
          <h6 class="mb-2">Contact</h6>
          <p class="mb-1 small">Email: <a class="text-light" href="mailto:info@restoreloans.com">info@restoreloans.com</a></p>
          <p class="mb-1 small">Phone: <a class="text-light" href="tel:+27747776140">+27 74 777 6140</a></p>
          <p class="mb-0 small">Address: 62 Beacon Road, Florida North 1709</p>
        </div>

        <div class="col-12 col-md-3 text-center text-md-right">
          <h6 class="mb-2">Follow</h6>
          <div class="d-flex justify-content-center justify-content-md-end gap-2">
            <!-- Add social links later if needed -->
            <a class="btn btn-sm btn-outline-light" href="#" aria-label="Twitter">Twitter</a>
            <a class="btn btn-sm btn-outline-light" href="#" aria-label="Facebook">Facebook</a>
          </div>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-12 text-center small text-muted">
          &copy; {{ new Date().getFullYear() }} Restore Loans. All rights reserved.
        </div>
      </div>
    </div>
  </footer>
</template>
