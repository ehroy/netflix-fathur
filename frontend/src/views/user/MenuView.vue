<!-- Email Wishlist Dashboard menggunakan Vue.js dan Tailwind CSS -->
<template>
  <Navbar />

  <DashboardLayout />
  <div class="md:ml-64 p-6">
    <div class="flex justify-between items-center mb-6">
      <button
        @click="toggleSidebar"
        class="md:hidden bg-blue-800 text-white p-2 rounded"
      >
        <i class="fas fa-bars"></i>
      </button>
      <h2 class="text-2xl font-bold">Email Wishlist</h2>
      <div class="relative w-64">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
          <i class="fas fa-search text-gray-400"></i>
        </span>
        <input
          type="text"
          v-model="searchQuery"
          @input="searchEmails"
          placeholder="Cari email..."
          class="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
    </div>
    <div v-if="emails.length === 0">Tidak ada hasil</div>
    <div>
      <!-- Daftar Email -->
      <div
        v-for="email in emails"
        :key="email.id"
        class="border-b border-gray-200 hover:bg-gray-100 cursor-pointer p-4"
        @click="selectEmail(email)"
      >
        <div class="flex justify-between items-center">
          <div class="font-medium">{{ email.sender }}</div>
          <div class="text-sm text-gray-500">{{ email.date }}</div>
        </div>
        <div class="text-gray-900 font-medium">{{ email.subject }}</div>
        <div class="text-gray-500 text-sm truncate">
          {{ email.body }}
        </div>
      </div>

      <!-- Modal -->
      <div
        v-if="selectedEmail"
        class="fixed inset-0 bg-transparent backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 px-4"
        @click.self="selectedEmail = null"
      >
        <div
          class="bg-white p-4 sm:p-6 w-full max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg rounded-lg shadow-lg relative overflow-auto max-h-[90vh]"
        >
          <button
            class="absolute top-2 right-2 text-gray-600 hover:text-black"
            @click="selectedEmail = null"
          >
            ✕
          </button>

          <div class="text-lg font-semibold mb-2">
            {{ selectedEmail.subject }}
          </div>
          <div class="text-sm text-gray-500 mb-1">
            Dari: {{ selectedEmail.sender }} - {{ selectedEmail.date }}
          </div>
          <div class="mt-4 prose max-w-full text-center text-white">
            <button
              @click="redirectToLink"
              class="bg-red-500 text-white p-2 rounded-md"
            >
              Netflix Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import Navbar from "@/layout/admin/Navbar.vue";
import DashboardLayout from "@/layout/user/DashboardLayout.vue";
import { SearchEmail } from "@/services/userServices.js";

function extractLinkFromText(text) {
  const match = text?.match(/\[(https:\/\/[^\]]+)\]/);
  return match?.[1] || "";
}
const sidebarOpen = ref(false);
const searchQuery = ref("");
const selectedEmail = ref(null);
const emails = ref([]);
async function selectEmail(email) {
  selectedEmail.value = email;
}
const props = defineProps({
  selectedEmail: Object,
});

const netflixLinks = computed(() => {
  if (!props.selectedEmail?.body) return [];
  const regex = /https:\/\/www\.netflix\.com[^\s"'<>]+/g;
  return [...props.selectedEmail.body.matchAll(regex)].map((match) => match[0]);
});
const searchEmails = async () => {
  if (!searchQuery.value.trim()) {
    emails.value = [];
    return;
  }

  try {
    const data = await SearchEmail(searchQuery.value);
    console.log(data.data);
    emails.value = data.data.mailbox;
  } catch (err) {
    console.error("Gagal mencari email:", err);
  }
};
const extractedLink = computed(() => {
  return selectedEmail.value
    ? extractLinkFromText(selectedEmail.value.body)
    : "";
});

const redirectToLink = () => {
  if (extractedLink.value) {
    window.open(extractedLink.value, "_blank");
  }
};
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css");
</style>
