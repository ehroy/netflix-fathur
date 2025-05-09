<template>
  <div class="w-64 h-screen bg-gray-800 text-white flex flex-col">
    <div class="p-4 text-xl font-bold border-b border-gray-700">Dashboard</div>
    <nav class="flex-1 p-4 space-y-2">
      <!-- Menu umum -->
      <SidebarMenu to="/user">👤 User</SidebarMenu>
      <SidebarMenu to="/email-search">✉️ Email Search</SidebarMenu>

      <!-- Menu admin -->
      <div v-if="role === 'admin'" class="mt-4 border-t border-gray-700 pt-4">
        <p class="text-sm text-gray-400 mb-2">Admin Menu</p>
        <SidebarMenu to="/admin">🛠 Admin Panel</SidebarMenu>
      </div>
    </nav>
  </div>
</template>

<script setup>
import SidebarMenu from "@/components/layout/SidebarMenu.vue";
import { ref } from "vue";

// Untuk saat ini, hardcoded. Nanti bisa pakai store/API
const role = ref("user"); // ubah ke 'admin' untuk lihat menu admin
</script>
