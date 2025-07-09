<template>
  <div class="container" style="margin-top: 30px;">
    <div class="card">
      <h1>About Restore Loans</h1>
      <p>
        Restore Loans is a modern financial institution dedicated to providing 
        accessible and transparent lending solutions to individuals and businesses.
      </p>
      
      <h2>Our Mission</h2>
      <p>
        To restore financial freedom by providing fair, transparent, and accessible 
        lending solutions that help our customers achieve their dreams and goals.
      </p>
      
      <h2>Our Values</h2>
      <ul>
        <li><strong>Transparency:</strong> Clear terms and no hidden fees</li>
        <li><strong>Accessibility:</strong> Simple application process</li>
        <li><strong>Reliability:</strong> Dependable service and support</li>
        <li><strong>Innovation:</strong> Modern technology for better experience</li>
      </ul>
      
      <h2>Loan Process</h2>
      <div class="process-steps">
        <div class="step">
          <h3>1. Application</h3>
          <p>Complete our simple online application form with your personal and financial information.</p>
        </div>
        <div class="step">
          <h3>2. Review</h3>
          <p>Our team reviews your application and verifies the provided information.</p>
        </div>
        <div class="step">
          <h3>3. Approval</h3>
          <p>Once approved, you'll receive your loan terms and conditions.</p>
        </div>
        <div class="step">
          <h3>4. Disbursement</h3>
          <p>Funds are transferred to your designated bank account.</p>
        </div>
      </div>
      
      <h2>Important Information</h2>
      <div class="warning-box">
        <h3>Missed Repayments</h3>
        <p>
          Missing loan repayments can have serious consequences:
        </p>
        <ul>
          <li>Late fees and additional interest charges</li>
          <li>Negative impact on your credit score</li>
          <li>Legal action may be taken</li>
          <li>Potential asset seizure for secured loans</li>
        </ul>
        <p>
          <strong>Please ensure you can afford the repayments before applying for a loan.</strong>
        </p>
      </div>
      
      <h2>Contact Us</h2>
      <p>
        For any questions or support, please contact our customer service team:
      </p>
      <ul>
        <li>Email: support@restoreloans.com</li>
        <li>Phone: 1-800-RESTORE</li>
        <li>Hours: Monday-Friday, 9 AM - 6 PM</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.process-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.step {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.step h3 {
  color: #007bff;
  margin-bottom: 10px;
}

.warning-box {
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
}

.warning-box h3 {
  color: #856404;
  margin-bottom: 15px;
}

.warning-box ul {
  margin: 10px 0;
  padding-left: 20px;
}
</style>