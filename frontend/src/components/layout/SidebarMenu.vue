<template>
  <router-link
    :to="to"
    class="block py-2 px-4 rounded hover:bg-gray-700"
    :class="{ 'bg-gray-700': isActive }"
  >
    <slot />
  </router-link>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";

const props = defineProps({
  to: String,
});

const route = useRoute();
const isActive = computed(() => route.path.startsWith(props.to));
</script>
