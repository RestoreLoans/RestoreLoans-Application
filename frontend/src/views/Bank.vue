<template>
  <div class="bank-container">
    <div class="centered-content">
      <h2 class="mb-4 text-center" alingn="center">Bank Details Management</h2>
      <!-- FORM -->
      <div class="card mb-4 p-4 form-card">
        <h5 class="mb-3 text-center">{{ editMode ? 'Edit Bank Detail' : 'Add New Bank Detail' }}</h5>
        <form @submit.prevent="saveBankDetail">
          <div class="table-responsive">
            <table class="table table-bordered align-middle mb-0 form-table">
              <tbody>
                <tr>
                  <th class="form-label" style="width: 30%">Bank Name</th>
                  <td><input v-model="form.bank_name" class="form-control" required></td>
                </tr>
                <tr>
                  <th class="form-label">Branch Name</th>
                  <td><input v-model="form.branch_name" class="form-control" required></td>
                </tr>
                <tr>
                  <th class="form-label">Branch Code</th>
                  <td><input v-model="form.branch_code" class="form-control" required></td>
                </tr>
                <tr>
                  <th class="form-label">Account Holder Name</th>
                  <td><input v-model="form.account_holder_name" class="form-control" required></td>
                </tr>
                <tr>
                  <th class="form-label">Account Number</th>
                  <td><input v-model="form.account_number" class="form-control" required></td>
                </tr>
                <tr>
                  <th class="form-label">Account Type</th>
                  <td>
                    <select v-model="form.account_type" class="form-control" required>
                      <option value="">Select Type</option>
                      <option value="savings">Savings</option>
                      <option value="cheque">Cheque</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td></td>
                </tr>
                <tr>
                  <td colspan="2" class="text-center pt-3">
                    <button type="submit" class="btn btn-primary px-4">
                      {{ editMode ? 'Update' : 'Create' }}
                    </button>
                    <button v-if="editMode" @click="cancelEdit" type="button" class="btn btn-secondary ms-2 px-4">
                      Cancel
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </form>
      </div>
      <!-- LIST -->
      <div class="card p-4 list-card">
        <h5 class="mb-3 text-center">All Bank Details</h5>
        <div class="table-responsive">
          <table class="table table-striped align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Bank Name</th>
                <th>Branch</th>
                <th>Account Holder</th>
                <th>Account Number</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in bankDetails" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.bank_name }}</td>
                <td>{{ item.branch_name }}</td>
                <td>{{ item.account_holder_name }}</td>
                <td>{{ item.account_number }}</td>
                <td>{{ item.account_type }}</td>
                <td>
                  <button class="btn btn-sm btn-warning me-2" @click="editBankDetail(item)">Edit</button>
                  <button class="btn btn-sm btn-danger" @click="deleteBankDetail(item.id)">Delete</button>
                </td>
              </tr>
              <tr v-if="!bankDetails.length">
                <td colspan="7" class="text-center">No records found.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted ,computed} from 'vue'
import { useBankStore } from '../stores/bank'
import { useAuthStore } from '../stores/auth'
import { ElMessage } from 'element-plus'
const authStore = useAuthStore()
const bankStore = useBankStore()




const bankDetails = ref([])
const form = ref({

  bank_name: '',
  branch_name: '',
  branch_code: '',
  account_holder_name: '',
  account_number: '',
  account_type: '',
  user_id:  authStore.user.id   // Replace with actual user_id if needed
})
const editMode = ref(false)
const bankInformation = ref(null);
onMounted(async() => {
  try {
 
        computed(() => authStore.user.id  )
        console.log("medupe");
        console.log(authStore.user )

     
           await  bankStore.getBank(authStore.user.bank_id )
             bankInformation.value = bankStore.bankInformation;
   
  } catch (error) {
    console.error('Failed to fetch history:', error)
  }
})


const saveBankDetail = async () => {
  try {

      await bankStore.addBank( form.value)
      await  authStore.getProfile(authStore.user.id );
      await  bankStore.getBank(authStore.user.bank_id )
             bankInformation.value = bankStore.bankInformation;

      await fetchBankDetails()
      ElMessage.success('Bank detail saved successfully!')
      resetForm()
  } catch (err) {
    console.error('Save failed:', err)
  }
}

const editBankDetail = (item) => {
  form.value = { ...item }
  editMode.value = true
}

const cancelEdit = () => {
  resetForm()
}

const resetForm = () => {
  form.value = {
    id: user.id,
    bank_name: '',
    branch_name: '',
    branch_code: '',
    account_holder_name: '',
    account_number: '',
    account_type: '',
    user_id: 1
  }
  editMode.value = false
}

const deleteBankDetail = async (id) => {
  if (confirm('Are you sure you want to delete this bank detail?')) {
    try {
      await axios.delete(`${API_URL}${id}/`)
      await fetchBankDetails()
    } catch (err) {
      console.error('Delete failed:', err)
    }
  }
}


</script>

<style scoped>
.bank-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: #f5f6fa;
  padding-top: 40px;
}
.centered-content {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}
.form-card, .list-card {
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  margin-bottom: 32px;
}
.form-label {
  font-weight: 500;
  background: #f8f9fa;
  border-radius: 6px;
  padding: 8px 12px;
}
.form-table th, .form-table td {
  vertical-align: middle;
  border: 1px solid #e9ecef;
}
.form-table th {
  width: 30%;
  min-width: 120px;
}
.form-table input.form-control, .form-table select.form-control {
  width: 100%;
  min-width: 120px;
}
.form-control {
  border-radius: 2px !important;
  border: 1px solid #d1d5db;
  height: 35px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.03);
  transition: border-color 0.2s;
}
.form-control:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0,123,255,0.08);
}
select.form-control {
  border-radius: 8px !important;
}
.btn {
  min-width: 100%;
  align-items: center;
}
</style>

