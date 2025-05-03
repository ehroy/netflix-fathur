<template>
  <div>
    <Navbar />
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">User Management</h1>
      <UserTable />
    </div>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import UserTable from "@/components/UserTable.vue";
</script>
