<template>
  <div class="overflow-x-auto">
    <table
      class="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg"
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
            <button
              @click="editUser(user)"
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
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import api from "@/axios"; // Pastikan path ini sesuai dengan struktur proyek Anda

const users = ref([]);

const fetchUsers = async () => {
  try {
    const response = await api.get("/users");
    users.value = response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

const editUser = (user) => {
  // Implementasi fungsi edit user
  console.log("Edit user:", user);
};

const deleteUser = async (id) => {
  try {
    await api.post(`/users/delete`, { id: id });
    fetchUsers();
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};
const addUser = async (email, password) => {
  try {
    await api.post(`/auth/register`, {
      email: email,
      password: password,
    });
    fetchUsers();
  } catch (error) {
    console.error("Error Register : ", error);
  }
};
onMounted(() => {
  fetchUsers();
});
</script>
