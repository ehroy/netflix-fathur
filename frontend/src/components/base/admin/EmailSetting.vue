<template>
  <DashboardLayout>
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div
        class="flex flex-col md:flex-row items-center justify-between p-4 border-b"
      >
        <h3 class="text-lg font-medium mb-2 md:mb-0">Email IMAP Management</h3>
        <div
          class="flex flex-col md:flex-row w-full md:w-auto space-y-2 md:space-y-0 md:space-x-2"
        >
          <div class="relative flex-1">
            <input
              type="text"
              placeholder="Search emails..."
              class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              class="w-5 h-5 absolute right-3 top-2.5 text-gray-400"
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

          <button
            class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center justify-center"
          >
            <svg
              class="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0H13"
              ></path>
            </svg>
            Sync Email
          </button>

          <button
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center"
          >
            <svg
              class="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            Add IMAP
          </button>
        </div>
      </div>

      <div class="p-4">
        <div class="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="border rounded-lg p-4">
            <h4 class="text-md font-medium mb-4">IMAP Configuration</h4>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >IMAP Server</label
                >
                <input
                  type="text"
                  class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="imap.example.com"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Port</label
                >
                <input
                  type="text"
                  class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="993"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Username</label
                >
                <input
                  type="text"
                  class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="username@example.com"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Password</label
                >
                <input
                  type="password"
                  class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
              </div>
              <div class="flex items-center">
                <input
                  type="checkbox"
                  id="use-ssl"
                  class="rounded text-blue-500 focus:ring-blue-500"
                />
                <label for="use-ssl" class="ml-2 block text-sm text-gray-700"
                  >Use SSL</label
                >
              </div>
              <div class="pt-2">
                <button
                  class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
                >
                  Save Configuration
                </button>
              </div>
            </div>
          </div>

          <div class="border rounded-lg p-4">
            <h4 class="text-md font-medium mb-4">Email Search Filters</h4>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >From</label
                >
                <input
                  type="text"
                  class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="sender@example.com"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Subject Contains</label
                >
                <input
                  type="text"
                  class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="keywords"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Date Range</label
                >
                <div class="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    class="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="date"
                    class="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Folder</label
                >
                <select
                  class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>INBOX</option>
                  <option>Sent</option>
                  <option>Drafts</option>
                  <option>Spam</option>
                  <option>Trash</option>
                </select>
              </div>
              <div class="pt-2">
                <button
                  class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="overflow-x-auto border rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <input
                    type="checkbox"
                    class="rounded text-blue-500 focus:ring-blue-500"
                  />
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  From
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Subject
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Size
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="email in emails"
                :key="email.id"
                :class="{ 'bg-blue-50': email.unread }"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    class="rounded text-blue-500 focus:ring-blue-500"
                  />
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm" :class="{ 'font-bold': email.unread }">
                    {{ email.from }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm" :class="{ 'font-bold': email.unread }">
                    {{ email.subject }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-500">{{ email.date }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-500">{{ email.size }}</div>
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                >
                  <button class="text-blue-600 hover:text-blue-900 mr-3">
                    View
                  </button>
                  <button class="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>
<script setup>
import DashboardLayout from "@/layout/admin/DashboardLayout.vue";
import { ref } from "vue";
const emails = ref([
  {
    id: 1,
    from: "support@example.com",
    subject: "Your account has been created",
    date: "10 May 2025",
    size: "15 KB",
    unread: true,
  },
  {
    id: 2,
    from: "noreply@service.com",
    subject: "Password reset request",
    date: "09 May 2025",
    size: "22 KB",
    unread: false,
  },
  {
    id: 3,
    from: "team@company.org",
    subject: "Weekly Report: System Performance",
    date: "08 May 2025",
    size: "340 KB",
    unread: false,
  },
  {
    id: 4,
    from: "alerts@monitoring.io",
    subject: "URGENT: System Alert",
    date: "07 May 2025",
    size: "5 KB",
    unread: true,
  },
  {
    id: 5,
    from: "newsletter@updates.com",
    subject: "May Newsletter",
    date: "05 May 2025",
    size: "120 KB",
    unread: false,
  },
]);
</script>
