<template>
  <aside
    :class="[
      'bg-gray-800 text-white w-64 flex flex-col transition-all duration-300',
      sidebarOpen ? 'translate-x-0' : '-translate-x-64 md:translate-x-0',
    ]"
    class="fixed md:relative z-10 h-full"
  >
    <!-- Logo and Brand -->
    <div class="flex items-center justify-between p-4 border-b border-gray-700">
      <div class="flex items-center space-x-2">
        <svg
          class="w-8 h-8 text-blue-500"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
          ></path>
        </svg>
        <h1 class="text-xl font-bold">Admin Panel</h1>
      </div>
      <button @click="toggleSidebar" class="md:hidden">
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </div>

    <!-- Navigation Menu -->
    <nav class="flex-1 overflow-y-auto py-4">
      <div class="px-4 mb-4">
        <div class="relative">
          <input
            type="text"
            placeholder="Search..."
            class="w-full rounded bg-gray-700 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            class="w-4 h-4 absolute right-3 top-2.5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
      </div>

      <div class="space-y-2">
        <p
          class="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider"
        >
          Main
        </p>
        <router-link
          @click.prevent="activeMenu = 'dashboard'"
          :class="{ 'bg-gray-900 text-blue-500': activeMenu === 'dashboard' }"
          class="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700"
          to="/dashboard"
        >
          <svg
            class="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            ></path>
          </svg>
          <span>Dashboard</span>
        </router-link>

        <router-link
          @click.prevent="activeMenu = 'users'"
          :class="{ 'bg-gray-900 text-blue-500': activeMenu === 'users' }"
          class="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700"
          to="/dashboard/user"
        >
          <svg
            class="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            ></path>
          </svg>
          <span>User Management</span>
        </router-link>

        <router-link
          to="/dashboard/imap-settings"
          @click.prevent="activeMenu = 'email'"
          :class="{ 'bg-gray-900 text-blue-500': activeMenu === 'email' }"
          class="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700"
        >
          <svg
            class="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            ></path>
          </svg>
          <span>Email IMAP</span>
        </router-link>
      </div>

      <div class="mt-6 space-y-2">
        <p
          class="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider"
        >
          Settings
        </p>

        <a
          href="#"
          @click.prevent="activeMenu = 'settings'"
          :class="{ 'bg-gray-900 text-blue-500': activeMenu === 'settings' }"
          class="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700"
        >
          <svg
            class="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
          </svg>
          <span>Settings</span>
        </a>

        <a
          href="#"
          @click.prevent="activeMenu = 'profile'"
          :class="{ 'bg-gray-900 text-blue-500': activeMenu === 'profile' }"
          class="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700"
        >
          <svg
            class="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            ></path>
          </svg>
          <span>Profile</span>
        </a>
      </div>
    </nav>

    <!-- User profile at bottom -->
    <div class="border-t border-gray-700 p-4">
      <div class="flex items-center">
        <div
          class="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold"
        >
          JD
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium">John Doe</p>
          <p class="text-xs text-gray-400">Administrator</p>
        </div>
        <button class="ml-auto">
          <svg
            class="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </aside>
</template>
<script setup>
import { ref, computed } from "vue";
const sidebarOpen = ref(false);
const activeMenu = ref("dashboard");
console.log(activeMenu.value);
function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
}
const pageTitle = computed(() => {
  switch (activeMenu.value) {
    case "dashboard":
      return "Dashboard";
    case "users":
      return "User Management";
    case "email":
      return "Email IMAP";
    case "settings":
      return "Settings";
    case "profile":
      return "Profile";
    default:
      return "Dashboard";
  }
});
</script>
