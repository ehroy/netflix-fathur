<template>
  <div class="overflow-x-auto">
    <table
      class="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg border border-gray-800"
    >
      <thead class="bg-gray-100">
        <tr>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Email
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Role
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Allow Email
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr v-for="user in users" :key="user._id" class="hover:bg-gray-50">
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {{ user.email }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {{ user.role }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {{ user.allowedEmails.length }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            <button
              @click="openEditModal(user)"
              class="text-blue-600 hover:underline"
            >
              Edit
            </button>
            <button
              @click="deleteUser(user._id)"
              class="text-red-600 hover:underline ml-2"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal Popup dengan backdrop blur -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-xl">
        <div class="flex justify-between">
          <h2 class="text-xl font-bold mb-4">Edit User</h2>
          <button
            type="button"
            @click="closeModal"
            class="px-4 py-2 bg-red-500 text-white rounded flex"
          >
            Cancel
          </button>
        </div>

        <!-- Form -->
        <form @submit.prevent="saveChanges">
          <div class="mb-4">
            <label class="block text-sm font-medium">Email Allowlist</label>

            <!-- Input untuk menambahkan email baru -->
            <input
              v-model="newEmail"
              @keyup.enter="addEmail"
              class="w-full border p-2 rounded mb-2"
              type="email"
              placeholder="Add new email"
            />

            <!-- Tombol untuk menambahkan email ke list -->
            <button
              @click="addEmail"
              class="px-4 py-2 bg-blue-600 text-white rounded mb-4"
            >
              Add Email
            </button>

            <!-- Daftar email yang sudah ditambahkan -->
            <ul>
              <li
                v-for="(email, index) in editForm.allowlist_email"
                :key="index"
                class="flex justify-between items-center mb-2"
              >
                <span>{{ email }}</span>
                <button
                  @click="removeEmail(editForm.id, email)"
                  class="bg-red-500 text-gray-50 p-1 hover:underline rounded-lg"
                >
                  Remove
                </button>
              </li>
            </ul>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium">Role</label>
            <select v-model="editForm.role" class="w-full border p-2 rounded">
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <!-- Sesuaikan dengan role yang tersedia -->
            </select>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import {
  DeleteUser,
  GetUser,
  DeleteAllowList,
} from "@/services/userServices.js";
const users = ref([]);
const showModal = ref(false);
const fetchUsers = async () => {
  try {
    const response = await GetUser();
    users.value = response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};
const editForm = ref({
  id: null,
  allowlist_email: "",
  role: "",
});

function openEditModal(user) {
  editForm.value = {
    id: user._id,
    allowlist_email: user.allowedEmails || "",
    role: user.role || "",
  };
  showModal.value = true;
}
const deleteUser = async (id) => {
  try {
    await DeleteUser(id);
    fetchUsers();
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};
const removeEmail = async (email) => {
  try {
    console.log(editForm.value.id);
    await DeleteAllowList(editForm.value.id, email);
    fetchUsers();
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};
function closeModal() {
  showModal.value = false;
}

async function saveChanges() {
  try {
    console.log("Saving user...", editForm.value);

    // Setelah berhasil simpan:
    closeModal();
    fetchUsers();
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  fetchUsers();
});
</script>
