<template>
  <section class="py-5">
    <div class="container">
      <div class="card about-card shadow-sm">
        <div class="card-body">
          <div class="row">
            <div class="col-12 col-lg-8">
              <h1 class="mb-3">About Restore Loans</h1>
              <p class="lead text-muted">
                Restore Loans is a modern financial institution dedicated to providing
                accessible and transparent lending solutions to individuals and businesses.
              </p>

              <h2 class="mt-4">Our Mission</h2>
              <p>
                To restore financial freedom by providing fair, transparent, and accessible
                lending solutions that help our customers achieve their dreams and goals.
              </p>

              <h2 class="mt-4">Our Values</h2>
              <ul class="values-list list-unstyled">
                <li class="mb-2"><strong>Transparency:</strong> Clear terms and no hidden fees</li>
                <li class="mb-2"><strong>Accessibility:</strong> Simple application process</li>
                <li class="mb-2"><strong>Reliability:</strong> Dependable service and support</li>
                <li class="mb-2"><strong>Innovation:</strong> Modern technology for better experience</li>
              </ul>
            </div>

            <aside class="col-12 col-lg-4 mt-4 mt-lg-0">
              <div class="border rounded p-3 bg-light">
                <h5 class="mb-2">Contact</h5>
                <p class="mb-1 small">Email: <a href="mailto:support@restoreloans.co.za">support@restoreloans.co.za</a></p>
                <p class="mb-1 small">Phone: 1-800-RESTORE</p>
                <p class="mb-0 small">Hours: Mon–Fri, 9 AM – 6 PM</p>
              </div>

              <div class="mt-3 bg-warning p-3 rounded">
                <h6 class="mb-2">Important</h6>
                <p class="small mb-2">Missing loan repayments can have serious consequences:</p>
                <ul class="small mb-0">
                  <li>Late fees and additional interest charges</li>
                  <li>Negative impact on your credit score</li>
                  <li>Legal action may be taken</li>
                </ul>
              </div>
            </aside>
          </div>

          <hr class="my-4" />

          <h2 class="mb-3">Loan Process</h2>
          <div class="row gx-3 gy-3">
            <div class="col-12 col-md-6 col-lg-3">
              <div class="step p-3 h-100">
                <h3 class="h6">1. Application</h3>
                <p class="small mb-0">Complete our simple online application form with your personal and financial information.</p>
              </div>
            </div>
            <div class="col-12 col-md-6 col-lg-3">
              <div class="step p-3 h-100">
                <h3 class="h6">2. Review</h3>
                <p class="small mb-0">Our team reviews your application and verifies the provided information.</p>
              </div>
            </div>
            <div class="col-12 col-md-6 col-lg-3">
              <div class="step p-3 h-100">
                <h3 class="h6">3. Approval</h3>
                <p class="small mb-0">Once approved, you'll receive your loan terms and conditions.</p>
              </div>
            </div>
            <div class="col-12 col-md-6 col-lg-3">
              <div class="step p-3 h-100">
                <h3 class="h6">4. Disbursement</h3>
                <p class="small mb-0">Funds are transferred to your designated bank account.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<style scoped>
.about-card {
  border-radius: 12px;
  overflow: hidden;
}

.about-card .card-body {
  padding: 1.75rem;
}

.about-card h1 {
  color: #003a77;
  font-weight: 600;
}

.about-card h2 {
  color: #343a40;
  margin-top: 1rem;
}

.values-list li {
  margin-bottom: 0.5rem;
}

.step {
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

/* small adjustments */
@media (max-width: 576px) {
  .about-card .card-body {
    padding: 1rem;
  }

  .about-card h1 {
    font-size: 1.6rem;
  }
}
</style>
