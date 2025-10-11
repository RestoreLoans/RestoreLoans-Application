<template>
  <div class="container my-4">
    <h2 class="mb-4">Bank Details Management</h2>

    <!-- FORM -->
    <div class="card mb-4 p-3">
      <h5>{{ editMode ? 'Edit Bank Detail' : 'Add New Bank Detail' }}</h5>
      <form @submit.prevent="saveBankDetail">
        <div class="row">
          <div class="col-md-6 mb-3">
            <label>Bank Name</label>
            <input v-model="form.bank_name" class="form-control" required>
          </div>
          <div class="col-md-6 mb-3">
            <label>Branch Name</label>
            <input v-model="form.branch_name" class="form-control" required>
          </div>
          <div class="col-md-6 mb-3">
            <label>Branch Code</label>
            <input v-model="form.branch_code" class="form-control" required>
          </div>
          <div class="col-md-6 mb-3">
            <label>Account Holder Name</label>
            <input v-model="form.account_holder_name" class="form-control" required>
          </div>
          <div class="col-md-6 mb-3">
            <label>Account Number</label>
            <input v-model="form.account_number" class="form-control" required>
          </div>
          <div class="col-md-6 mb-3">
            <label>Account Type</label>
            <select v-model="form.account_type" class="form-control" required>
              <option value="">Select Type</option>
              <option value="savings">Savings</option>
              <option value="cheque">Cheque</option>
            </select>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">
          {{ editMode ? 'Update' : 'Create' }}
        </button>
        <button v-if="editMode" @click="cancelEdit" type="button" class="btn btn-secondary ms-2">
          Cancel
        </button>
      </form>
    </div>

    <!-- LIST -->
    <div class="card p-3">
      <h5 class="mb-3">All Bank Details</h5>
      <table class="table table-striped">
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
</template>

<script setup>
import { ref, onMounted ,computed} from 'vue'
import { useBankStore } from '../stores/bank'
import { useAuthStore } from '../stores/auth'
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


    
 //   await fetchBankDetails()
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
    id: null,
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
.card {
  border-radius: 8px;
  background-color: #fff;
}
.btn {
  min-width: 80px;
}
</style>
