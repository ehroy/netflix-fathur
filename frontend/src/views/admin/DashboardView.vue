<!-- App.vue -->
<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <AdminLayout />
    <!-- Main Content Area -->

    <div
      class="flex-1 flex flex-col overflow-hidden md:ml-0 transition-all duration-300"
    >
      <!-- Top Navbar -->
      <Navbar />
      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto bg-gray-100 p-4">
        <!-- Dashboard Content -->
        <div v-if="activeMenu === 'dashboard'" class="mb-6">
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
          >
            <div class="bg-white rounded-lg shadow p-4">
              <div class="flex items-center">
                <div class="p-3 rounded-full bg-blue-100 text-blue-500">
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
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    ></path>
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-gray-500 text-sm">Total Users</p>
                  <h3 class="font-bold text-2xl">245</h3>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-lg shadow p-4">
              <div class="flex items-center">
                <div class="p-3 rounded-full bg-green-100 text-green-500">
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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-gray-500 text-sm">Total Emails</p>
                  <h3 class="font-bold text-2xl">1,234</h3>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-lg shadow p-4">
              <div class="flex items-center">
                <div class="p-3 rounded-full bg-yellow-100 text-yellow-500">
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
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    ></path>
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-gray-500 text-sm">Activity Rate</p>
                  <h3 class="font-bold text-2xl">78%</h3>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-lg shadow p-4">
              <div class="flex items-center">
                <div class="p-3 rounded-full bg-red-100 text-red-500">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-gray-500 text-sm">Avg. Response Time</p>
                  <h3 class="font-bold text-2xl">4.5h</h3>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="bg-white rounded-lg shadow p-4">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-medium">Recent Activities</h3>
                <button class="text-blue-500 text-sm">View All</button>
              </div>

              <div class="space-y-4">
                <div
                  v-for="(activity, index) in recentActivities"
                  :key="index"
                  class="flex items-start"
                >
                  <div
                    :class="[
                      'w-8 h-8 rounded-full flex items-center justify-center text-white',
                      activity.colorClass,
                    ]"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        :d="activity.icon"
                      ></path>
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm font-medium">{{ activity.title }}</p>
                    <p class="text-xs text-gray-500">{{ activity.time }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-lg shadow p-4">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-medium">System Status</h3>
                <button class="text-blue-500 text-sm">Refresh</button>
              </div>

              <div class="space-y-4">
                <div
                  v-for="(status, index) in systemStatus"
                  :key="index"
                  class="flex flex-col"
                >
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-sm font-medium">{{ status.name }}</span>
                    <span class="text-sm">{{ status.value }}</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div
                      class="bg-blue-500 h-2 rounded-full"
                      :style="{ width: status.percentage }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Email IMAP Content -->

        <!-- Settings Content -->
        <div
          v-if="activeMenu === 'settings'"
          class="bg-white rounded-lg shadow overflow-hidden"
        >
          <div class="p-4 border-b">
            <h3 class="text-lg font-medium">System Settings</h3>
          </div>

          <div class="p-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="col-span-1">
                <ul class="space-y-1">
                  <li>
                    <button
                      @click="activeSettingsTab = 'general'"
                      :class="{
                        'bg-blue-100 text-blue-700':
                          activeSettingsTab === 'general',
                      }"
                      class="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
                    >
                      <svg
                        class="mr-3 h-5 w-5"
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
                      General
                    </button>
                  </li>
                  <li>
                    <button
                      @click="activeSettingsTab = 'security'"
                      :class="{
                        'bg-blue-100 text-blue-700':
                          activeSettingsTab === 'security',
                      }"
                      class="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
                    >
                      <svg
                        class="mr-3 h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        ></path>
                      </svg>
                      Security
                    </button>
                  </li>
                  <li>
                    <button
                      @click="activeSettingsTab = 'notifications'"
                      :class="{
                        'bg-blue-100 text-blue-700':
                          activeSettingsTab === 'notifications',
                      }"
                      class="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
                    >
                      <svg
                        class="mr-3 h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        ></path>
                      </svg>
                      Notifications
                    </button>
                  </li>
                  <li>
                    <button
                      @click="activeSettingsTab = 'email'"
                      :class="{
                        'bg-blue-100 text-blue-700':
                          activeSettingsTab === 'email',
                      }"
                      class="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
                    >
                      <svg
                        class="mr-3 h-5 w-5"
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
                      Email
                    </button>
                  </li>
                  <li>
                    <button
                      @click="activeSettingsTab = 'integrations'"
                      :class="{
                        'bg-blue-100 text-blue-700':
                          activeSettingsTab === 'integrations',
                      }"
                      class="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
                    >
                      <svg
                        class="mr-3 h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                        ></path>
                      </svg>
                      Integrations
                    </button>
                  </li>
                </ul>
              </div>

              <div class="col-span-2">
                <!-- General Settings -->
                <div v-if="activeSettingsTab === 'general'" class="space-y-6">
                  <h4 class="text-lg font-medium">General Settings</h4>

                  <div class="space-y-4">
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-1"
                        >Application Name</label
                      >
                      <input
                        type="text"
                        value="Admin Dashboard"
                        class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-1"
                        >Application URL</label
                      >
                      <input
                        type="text"
                        value="https://admin.example.com"
                        class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-1"
                        >Time Zone</label
                      >
                      <select
                        class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option>UTC</option>
                        <option>America/New_York</option>
                        <option>Europe/London</option>
                        <option>Asia/Tokyo</option>
                      </select>
                    </div>

                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-1"
                        >Date Format</label
                      >
                      <select
                        class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option>YYYY-MM-DD</option>
                        <option>MM/DD/YYYY</option>
                        <option>DD/MM/YYYY</option>
                      </select>
                    </div>

                    <div class="flex items-center justify-between pt-2">
                      <span></span>
                      <button
                        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Security Settings -->
                <div v-if="activeSettingsTab === 'security'" class="space-y-6">
                  <h4 class="text-lg font-medium">Security Settings</h4>

                  <div class="space-y-4">
                    <div class="flex items-center justify-between">
                      <div>
                        <h5 class="text-sm font-medium">
                          Two Factor Authentication
                        </h5>
                        <p class="text-sm text-gray-500">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <div class="flex items-center">
                        <span
                          class="mr-3 text-sm"
                          :class="
                            twoFAEnabled ? 'text-green-500' : 'text-gray-500'
                          "
                        >
                          {{ twoFAEnabled ? "Enabled" : "Disabled" }}
                        </span>
                        <button
                          @click="twoFAEnabled = !twoFAEnabled"
                          :class="[
                            'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
                            twoFAEnabled ? 'bg-blue-500' : 'bg-gray-200',
                          ]"
                        >
                          <span
                            :class="[
                              'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                              twoFAEnabled ? 'translate-x-5' : 'translate-x-0',
                            ]"
                          ></span>
                        </button>
                      </div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div>
                        <h5 class="text-sm font-medium">Session Timeout</h5>
                        <p class="text-sm text-gray-500">
                          Automatically log out after inactivity
                        </p>
                      </div>
                      <select
                        class="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option>15 minutes</option>
                        <option>30 minutes</option>
                        <option>1 hour</option>
                        <option>4 hours</option>
                      </select>
                    </div>

                    <div class="flex items-center justify-between">
                      <div>
                        <h5 class="text-sm font-medium">
                          Password Requirements
                        </h5>
                        <p class="text-sm text-gray-500">
                          Set minimum strength requirements
                        </p>
                      </div>
                      <select
                        class="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option>Medium</option>
                        <option>Strong</option>
                        <option>Very Strong</option>
                      </select>
                    </div>

                    <div class="pt-2">
                      <button
                        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                      >
                        Update Security Settings
                      </button>
                    </div>
                  </div>
                </div>

                <!-- More tabs can be added here -->
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- Footer -->
      <footer class="bg-white p-4 border-t">
        <div class="flex items-center justify-between">
          <p class="text-sm text-gray-600">
            &copy; 2025 Admin Dashboard. All rights reserved.
          </p>
          <div class="text-sm text-gray-600">v1.0.0</div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import AdminLayout from "@/layout/admin/AdminLayout.vue";
import Navbar from "@/layout/admin/Navbar.vue";
const sidebarOpen = ref(false);
const activeMenu = ref("dashboard");
const activeSettingsTab = ref("general");
const twoFAEnabled = ref(false);

const recentActivities = ref([
  {
    title: "New user registered",
    time: "2 minutes ago",
    icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
    colorClass: "bg-blue-500",
  },
  {
    title: "System update completed",
    time: "1 hour ago",
    icon: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4",
    colorClass: "bg-green-500",
  },
  {
    title: "Error alert: Server connection failed",
    time: "2 hours ago",
    icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
    colorClass: "bg-red-500",
  },
  {
    title: "Database backup successful",
    time: "1 day ago",
    icon: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4",
    colorClass: "bg-yellow-500",
  },
]);

const systemStatus = ref([
  { name: "CPU Usage", value: "23%", percentage: "23%" },
  { name: "Memory Usage", value: "45%", percentage: "45%" },
  { name: "Disk Space", value: "67%", percentage: "67%" },
  { name: "Network", value: "28%", percentage: "28%" },
]);

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
// Computed
</script>
