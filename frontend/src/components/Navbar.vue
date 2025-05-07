<template>
  <nav class="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg px-10">
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0 flex items-center">
            <i class="fas fa-users-cog text-white text-2xl mr-2"></i>
            <span class="text-white font-bold text-xl">DASHBOARD ADMIN</span>
          </div>
        </div>
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <button
              @click="addNewUser"
              class="bg-white text-indigo-600 px-4 py-2 rounded-md text-sm font-medium shadow-sm hover:bg-indigo-50"
            >
              <i class="fas fa-plus mr-1"></i> New User
            </button>
          </div>
          <div class="hidden md:ml-4 md:flex md:items-center">
            <div class="ml-3 relative user-menu">
              <div>
                <button
                  @click="toggleUserMenu"
                  class="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white"
                >
                  <span class="sr-only">Open user menu</span>
                  <img
                    class="h-10 w-10 rounded-full"
                    :src="`https://i.pravatar.cc/40`"
                    :alt="user.name"
                  />
                </button>
              </div>
              <!-- User dropdown menu -->
              <div
                v-if="isUserMenuOpen"
                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
              >
                <router-link
                  to="/profile"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >Your Profile</router-link
                >
                <router-link
                  to="/account"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >Account</router-link
                >
                <button
                  @click="logout"
                  class="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
          <div class="md:hidden flex items-center ml-4">
            <button
              @click="toggleMobileMenu"
              class="text-white hover:text-gray-200 focus:outline-none"
            >
              <i class="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="isMobileMenuOpen" class="md:hidden bg-indigo-800">
      <div class="pt-4 pb-3 border-t border-indigo-700">
        <div class="flex items-center px-5">
          <div class="flex-shrink-0">
            <img
              :src="`https://i.pravatar.cc/40`"
              :alt="user.name"
              class="rounded-full w-10 h-10"
            />
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-white">{{ user.name }}</div>
            <div class="text-sm font-medium text-indigo-300">
              {{ user.email }}
            </div>
          </div>
        </div>
        <div class="mt-3 px-2 space-y-1">
          <router-link
            to="/profile"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:bg-indigo-700 hover:text-white"
            >Your Profile</router-link
          >
          <router-link
            to="/account"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:bg-indigo-700 hover:text-white"
            >Account</router-link
          >
          <button
            @click="logout"
            class="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:bg-indigo-700 hover:text-white"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

const router = useRouter();
const route = useRoute();

const currentRoute = computed(() => route.path);
const isMobileMenuOpen = ref(false);
const isUserMenuOpen = ref(false);
const unreadNotifications = ref(3);
const user = ref({
  name: "Admin User",
  email: "admin@example.com",
  avatar: null,
});

// Watch for route changes to close mobile menu
watch(
  () => route.path,
  (newPath) => {
    isMobileMenuOpen.value = false;
  }
);

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  if (isMobileMenuOpen.value) {
    isUserMenuOpen.value = false;
  }
}

function toggleUserMenu() {
  isUserMenuOpen.value = !isUserMenuOpen.value;
}

function addNewUser() {
  router.push("/users/new");
}

function showNotifications() {
  // Logic to show notifications
  unreadNotifications.value = 0;
}

async function logout() {
  try {
    // Call logout API
    await axios.post("/api/auth/logout");
    // Clear any local authentication data
    localStorage.removeItem("authToken");
    // Redirect to login page
    router.push("/login");
  } catch (error) {
    console.error("Logout failed:", error);
    // Handle logout error
  }
}
const addUser = async (email, password) => {
  try {
    await api.post(`/auth/register`, {
      email: email,
      password: password,
    });
    fetchUsers();
  } catch (error) {
    console.error("Error Register : ", error);
  }
};
// Handle click outside to close user menu
function handleClickOutside(event) {
  const isClickInsideUserMenu = event.target.closest(".user-menu");
  if (!isClickInsideUserMenu && isUserMenuOpen.value) {
    isUserMenuOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
