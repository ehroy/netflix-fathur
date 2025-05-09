<template>
  <div class="flex h-screen bg-gray-100">
    <AdminLayout />
    <div
      class="flex-1 flex flex-col overflow-hidden md:ml-0 transition-all duration-300"
    >
      <Navbar />
      <main class="p-4 bg-gray-100">
        <slot />
      </main>
    </div>
  </div>
</template>
<script setup>
import AdminLayout from "@/layout/admin/AdminLayout.vue";
import Navbar from "@/layout/admin/Navbar.vue";
</script>
