<template>
  <DashboardLayout>
    <!-- User Management Content -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div
        class="flex flex-col md:flex-row items-center justify-between p-4 border-b"
      >
        <h3 class="text-lg font-medium mb-2 md:mb-0">User Management</h3>
        <div
          class="flex flex-col md:flex-row w-full md:w-auto space-y-2 md:space-y-0 md:space-x-2"
        >
          <div class="relative">
            <input
              type="text"
              placeholder="Search users..."
              class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              class="w-5 h-5 absolute right-3 top-2.5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>

          <!-- Tombol untuk memunculkan form -->
          <button
            @click="showForm = true"
            class="mb-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <svg
              class="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add User
          </button>

          <!-- Modal -->
          <div
            v-if="showForm"
            class="fixed inset-0 z-50 flex items-center justify-center"
          >
            <!-- Overlay -->
            <div
              class="absolute inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm bg-opacity-60"
              @click="showForm = false"
            ></div>

            <!-- Modal Form -->
            <div
              class="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md z-10"
            >
              <UserForm @submit="handleUserSubmit" @cancel="showForm = false" />
            </div>
          </div>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Role
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email Allowlist
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="user in users" :key="user.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div
                    class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium"
                  >
                    {{ user.initials }}
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      {{ user.name }}
                    </div>
                    <div class="text-sm text-gray-500">{{ user.id }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ user.email }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ user.role }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ user.allowedEmails.length }}
                </div>
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
              >
                <button
                  @click="openEditModal(user)"
                  class="text-blue-600 hover:text-blue-900 mr-3"
                >
                  Edit
                </button>
                <button
                  @click="deleteUser(user._id)"
                  class="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
                  class="flex justify-between items-center mb-2 border px-2"
                >
                  <label class="flex items-center gap-2 w-full">
                    <input
                      type="checkbox"
                      :value="email"
                      v-model="selectedEmails"
                    />
                    <span class="flex-1">{{ email }}</span>
                    <button
                      type="button"
                      @click="removeEmail(email)"
                      class="text-red-600 p-1 rounded-lg hover:text-red-700"
                    >
                      Remove
                    </button>
                  </label>
                </li>
              </ul>
            </div>
            <button
              @click="removeSelectedEmails"
              class="mt-2 px-4 py-2 bg-red-600 text-white rounded"
              :disabled="selectedEmails.length === 0"
            >
              Delete Selected ({{ selectedEmails.length }})
            </button>
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
  </DashboardLayout>
</template>
<script setup>
import DashboardLayout from "@/layout/admin/DashboardLayout.vue";
import { ref, onMounted } from "vue";
import {
  DeleteUser,
  GetUser,
  DeleteAllowList,
  AddAllowlist,
  AddUser,
} from "@/services/userServices.js";
import UserForm from "@/components/base/admin/form/UserForm.vue";
const selectedEmails = ref([]);
const users = ref([]);
const newEmail = ref("");
const showModal = ref(false);

const showForm = ref(false);

async function handleUserSubmit(data) {
  try {
    console.log(data);
    await AddUser(data.username, data.password);

    showForm.value = false;
  } catch (error) {
    console.error("Error registering user:", error);
    alert("Failed to register user");
  }
}
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
const createUser = async (email, password) => {
  try {
    await AddUser(email, password);
    fetchUsers();
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};
const deleteUser = async (id) => {
  try {
    await DeleteUser(id);
    fetchUsers();
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};
const addEmail = async () => {
  try {
    await AddAllowlist(editForm.value.id, newEmail.value);
    fetchUsers();
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};
const removeEmail = async (email) => {
  try {
    console.log(email);
    await DeleteAllowList(editForm.value.id, email);
    fetchUsers();
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};
function closeModal() {
  showModal.value = false;
}
async function removeSelectedEmails() {
  // Hapus dari object allowlist_email
  selectedEmails.value.forEach(async (email) => {
    await DeleteAllowList(editForm.value.id, email);
  });
  fetchUsers();
  selectedEmails.value = []; // reset setelah hapus
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
