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

      <!-- Main Content -->
      <div class="ml-64 p-10">
        <div
          class="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow space-y-8"
        >
          <div class="flex justify-between items-center">
            <h1 class="text-3xl font-semibold">IMAP Search Settings</h1>
            <button
              @click="saveSetting"
              class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Simpan
            </button>
          </div>

          <!-- Subjects -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Subjects</label
            >
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="(s, i) in setting.subjects"
                :key="i"
                class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
              >
                {{ s }}
                <button
                  @click="removeSubject(i)"
                  class="ml-2 text-red-500 hover:text-red-700"
                >
                  &times;
                </button>
              </span>
            </div>
            <div class="flex gap-2">
              <input
                v-model="newSubject"
                @keyup.enter="addSubject"
                type="text"
                placeholder="Tambahkan subject..."
                class="border rounded px-3 py-2 w-full"
              />
              <button
                @click="addSubject"
                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Tambah
              </button>
            </div>
          </div>

          <!-- Folder -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Folder</label
            >
            <input
              v-model="setting.folder"
              type="text"
              class="border rounded px-3 py-2 w-full"
              placeholder="Contoh: INBOX"
            />
          </div>

          <!-- Since -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Since (Tanggal Awal)</label
            >
            <input
              v-model="setting.since"
              type="date"
              class="border rounded px-3 py-2 w-full"
            />
          </div>

          <!-- Delete Button -->
          <div class="flex justify-end">
            <button
              @click="deleteSetting"
              class="text-red-600 border border-red-600 px-4 py-2 rounded hover:bg-red-50"
            >
              Hapus Setting
            </button>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>
<script setup>
import DashboardLayout from "@/layout/admin/DashboardLayout.vue";
import { ref } from "vue";
import axios from "axios";

const setting = ref({
  subjects: [],
  folder: "INBOX",
  since: new Date().toISOString().split("T")[0],
});

const newSubject = ref("");
const settingId = "ganti_dengan_id_setting";

const loadSetting = async () => {
  const res = await axios.get(`/api/settings/${settingId}`);
  setting.value = res.data;
};

const addSubject = () => {
  const subject = newSubject.value.trim();
  if (subject && !setting.value.subjects.includes(subject)) {
    setting.value.subjects.push(subject);
    newSubject.value = "";
  }
};

const removeSubject = (index) => {
  setting.value.subjects.splice(index, 1);
};

const saveSetting = async () => {
  await axios.put(`/api/settings/${settingId}`, setting.value);
  alert("Setting disimpan!");
};

const deleteSetting = async () => {
  if (confirm("Yakin ingin menghapus setting ini?")) {
    await axios.delete(`/api/settings/${settingId}`);
    alert("Setting dihapus!");
  }
};

loadSetting();
</script>
