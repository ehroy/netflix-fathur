<template>
  <form
    @submit.prevent="submitUserForm"
    class="space-y-4 bg-white border rounded-lg p-4 shadow"
  >
    <div>
      <label class="block text-sm font-medium mb-1">Username</label>
      <input
        v-model="form.username"
        type="text"
        required
        class="w-full border rounded px-3 py-2"
        placeholder="Enter username"
      />
    </div>

    <div>
      <label class="block text-sm font-medium mb-1">Password</label>
      <input
        v-model="form.password"
        type="password"
        required
        class="w-full border rounded px-3 py-2"
        placeholder="Enter password"
      />
    </div>

    <div class="flex gap-2">
      <button
        type="submit"
        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Register
      </button>
      <button
        type="button"
        class="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
        @click="$emit('cancel')"
      >
        Cancel
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["submit", "cancel"]);

const form = ref({
  username: "",
  password: "",
});

function submitUserForm() {
  emit("submit", { ...form.value });
  form.value = { username: "", password: "" };
}
</script>
