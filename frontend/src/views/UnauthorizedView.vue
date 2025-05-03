<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-red-600 mb-4">403 - Unauthorized</h1>
      <p class="text-lg text-gray-700 mb-6">
        You don't have permission to access this page.
      </p>
      <RouterLink
        to="/"
        class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Go Back Home
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>
