<template>
  <div class="flex">
    <Sidebar />
    <main class="flex-1 p-4">
      <slot />
    </main>
  </div>
</template>

<script setup>
import Sidebar from "@/components/layout/Sidebar.vue";
</script>
