<template>
  <Navbar />
  <div class="px-10">
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">User Customer</h1>
      <UserTable />
    </div>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import UserTable from "@/components/UserTable.vue";
</script>
