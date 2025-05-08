<!-- Email Wishlist Dashboard menggunakan Vue.js dan Tailwind CSS -->
<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <div
      class="fixed inset-y-0 left-0 w-64 bg-blue-800 text-white transition-transform duration-300 ease-in-out"
      :class="{
        'translate-x-0': sidebarOpen,
        '-translate-x-full md:translate-x-0': !sidebarOpen,
      }"
    >
      <div class="p-6">
        <h1 class="text-xl font-bold mb-6">Email Dashboard</h1>
        <nav>
          <ul class="space-y-2">
            <li>
              <a
                href="#"
                class="flex items-center p-2 rounded-lg hover:bg-blue-700"
              >
                <i class="fas fa-inbox mr-3"></i>
                <span>Inbox</span>
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center p-2 rounded-lg bg-blue-700">
                <i class="fas fa-star mr-3"></i>
                <span>Wishlist</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center p-2 rounded-lg hover:bg-blue-700"
              >
                <i class="fas fa-paper-plane mr-3"></i>
                <span>Sent</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center p-2 rounded-lg hover:bg-blue-700"
              >
                <i class="fas fa-trash mr-3"></i>
                <span>Trash</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- Main Content -->
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
            placeholder="Cari email..."
            class="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            @input="searchEmails"
          />
        </div>
      </div>

      <!-- Email Filter -->
      <div class="mb-4">
        <div class="flex space-x-2">
          <button
            @click="filterEmails('all')"
            :class="{
              'bg-blue-800 text-white': currentFilter === 'all',
              'bg-gray-200 text-gray-700': currentFilter !== 'all',
            }"
            class="px-4 py-2 rounded-lg"
          >
            Semua
          </button>
          <button
            @click="filterEmails('wishlist')"
            :class="{
              'bg-blue-800 text-white': currentFilter === 'wishlist',
              'bg-gray-200 text-gray-700': currentFilter !== 'wishlist',
            }"
            class="px-4 py-2 rounded-lg"
          >
            Wishlist
          </button>
        </div>
      </div>

      <!-- Email List -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div
          v-if="filteredEmails.length === 0"
          class="p-6 text-center text-gray-500"
        >
          Tidak ada email yang ditemukan.
        </div>
        <div v-else>
          <div
            v-for="(email, index) in filteredEmails"
            :key="index"
            class="border-b border-gray-200 hover:bg-gray-50 cursor-pointer p-4"
            @click="selectEmail(email)"
          >
            <div class="flex justify-between items-center">
              <div class="font-medium">{{ email.sender }}</div>
              <div class="text-sm text-gray-500">{{ email.date }}</div>
            </div>
            <div class="text-gray-900 font-medium">{{ email.subject }}</div>
            <div class="text-gray-500 text-sm truncate">
              {{ email.preview }}
            </div>
            <div class="flex mt-2">
              <span
                v-if="email.isWishlist"
                class="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full mr-2"
              >
                Wishlist
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Email Detail Modal -->
      <div
        v-if="selectedEmail"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      >
        <div
          class="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-screen overflow-y-auto"
        >
          <div class="p-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-bold">{{ selectedEmail.subject }}</h3>
              <button
                @click="selectedEmail = null"
                class="text-gray-500 hover:text-gray-700"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div class="mb-4">
              <div class="flex items-center mb-2">
                <div
                  class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3"
                >
                  <span class="text-blue-800 font-bold">{{
                    getInitials(selectedEmail.sender)
                  }}</span>
                </div>
                <div>
                  <div class="font-medium">{{ selectedEmail.sender }}</div>
                  <div class="text-sm text-gray-500">
                    {{ selectedEmail.senderEmail }}
                  </div>
                </div>
              </div>
              <div class="text-sm text-gray-500">{{ selectedEmail.date }}</div>
            </div>
            <div class="mb-4">
              <p class="whitespace-pre-line">{{ selectedEmail.content }}</p>
            </div>
            <div class="flex justify-end">
              <button
                @click="toggleWishlist(selectedEmail)"
                class="px-4 py-2 rounded-lg flex items-center"
                :class="{
                  'bg-yellow-100 text-yellow-800': selectedEmail.isWishlist,
                  'bg-gray-200 text-gray-700': !selectedEmail.isWishlist,
                }"
              >
                <i
                  class="fas"
                  :class="{
                    'fa-star': selectedEmail.isWishlist,
                    'fa-star-o': !selectedEmail.isWishlist,
                  }"
                ></i>
                <span class="ml-2">{{
                  selectedEmail.isWishlist
                    ? "Hapus dari Wishlist"
                    : "Tambah ke Wishlist"
                }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sidebarOpen: false,
      searchQuery: "",
      currentFilter: "all",
      selectedEmail: null,
      emails: [
        {
          id: 1,
          sender: "Admin Sistem",
          senderEmail: "admin@contoh.com",
          subject: "Selamat Datang di Dashboard Email",
          preview:
            "Halo, selamat datang di dashboard pencarian email wishlist Anda...",
          content:
            "Halo,\n\nSelamat datang di dashboard pencarian email wishlist Anda. Disini Anda dapat dengan mudah mencari email yang sudah Anda tandai sebagai wishlist.\n\nFitur-fitur yang tersedia:\n- Pencarian email berdasarkan kata kunci\n- Filter email wishlist\n- Menambah dan menghapus email dari wishlist\n\nTerima kasih telah menggunakan layanan kami.\n\nSalam,\nAdmin Sistem",
          date: "8 Mei 2025",
          isWishlist: true,
        },
        {
          id: 2,
          sender: "Tim Notifikasi",
          senderEmail: "notifikasi@contoh.com",
          subject: "Pemberitahuan Penting",
          preview:
            "Kami ingin memberitahukan bahwa ada perubahan pada sistem kami...",
          content:
            "Kami ingin memberitahukan bahwa ada perubahan pada sistem kami yang akan diterapkan mulai minggu depan. Perubahan ini termasuk peningkatan keamanan dan penambahan fitur baru untuk kenyamanan pengguna.\n\nHarap perhatikan bahwa Anda mungkin perlu memperbarui kata sandi Anda setelah pembaruan.\n\nTerima kasih atas pengertiannya.",
          date: "7 Mei 2025",
          isWishlist: false,
        },
        {
          id: 3,
          sender: "Penawaran Spesial",
          senderEmail: "promo@contoh.com",
          subject: "Diskon 50% untuk Pengguna Baru",
          preview:
            "Dapatkan diskon spesial hingga 50% untuk pengguna baru yang mendaftar minggu ini...",
          content:
            "Dapatkan diskon spesial hingga 50% untuk pengguna baru yang mendaftar minggu ini!\n\nPromo ini berlaku sampai akhir bulan Mei 2025. Jangan lewatkan kesempatan ini dan ajak teman Anda untuk bergabung.\n\nUntuk informasi lebih lanjut, silakan kunjungi halaman promo kami.",
          date: "6 Mei 2025",
          isWishlist: true,
        },
        {
          id: 4,
          sender: "Laporan Mingguan",
          senderEmail: "report@contoh.com",
          subject: "Laporan Aktivitas Minggu Ini",
          preview:
            "Berikut adalah ringkasan aktivitas Anda selama seminggu terakhir...",
          content:
            "Berikut adalah ringkasan aktivitas Anda selama seminggu terakhir:\n\n- 15 email terkirim\n- 27 email diterima\n- 5 email ditandai sebagai wishlist\n- 3 email dihapus\n\nTerima kasih telah menggunakan layanan kami. Jika ada pertanyaan, silakan hubungi tim dukungan.",
          date: "5 Mei 2025",
          isWishlist: false,
        },
        {
          id: 5,
          sender: "Pembaruan Sistem",
          senderEmail: "system@contoh.com",
          subject: "Pemeliharaan Sistem Terjadwal",
          preview:
            "Kami akan melakukan pemeliharaan sistem pada tanggal 10 Mei 2025...",
          content:
            "Kami akan melakukan pemeliharaan sistem pada tanggal 10 Mei 2025 mulai pukul 22.00 hingga 04.00 WIB. Selama periode ini, layanan mungkin tidak tersedia atau mengalami gangguan.\n\nKami mohon maaf atas ketidaknyamanan ini dan berterima kasih atas pengertian Anda.\n\nHormat kami,\nTim Pemeliharaan Sistem",
          date: "4 Mei 2025",
          isWishlist: true,
        },
      ],
      filteredEmails: [],
    };
  },
  created() {
    this.filteredEmails = [...this.emails];
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    searchEmails() {
      this.filterEmails(this.currentFilter);
    },
    filterEmails(filter) {
      this.currentFilter = filter;
      if (filter === "all") {
        this.filteredEmails = this.emails.filter(
          (email) =>
            email.sender
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase()) ||
            email.subject
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase()) ||
            email.preview
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase()) ||
            email.senderEmail
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase())
        );
      } else if (filter === "wishlist") {
        this.filteredEmails = this.emails.filter(
          (email) =>
            email.isWishlist &&
            (email.sender
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase()) ||
              email.subject
                .toLowerCase()
                .includes(this.searchQuery.toLowerCase()) ||
              email.preview
                .toLowerCase()
                .includes(this.searchQuery.toLowerCase()) ||
              email.senderEmail
                .toLowerCase()
                .includes(this.searchQuery.toLowerCase()))
        );
      }
    },
    selectEmail(email) {
      this.selectedEmail = email;
    },
    toggleWishlist(email) {
      email.isWishlist = !email.isWishlist;
      if (this.currentFilter === "wishlist" && !email.isWishlist) {
        this.selectedEmail = null;
        this.filterEmails("wishlist");
      }
    },
    getInitials(name) {
      return name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .substring(0, 2);
    },
  },
};
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css");
</style>
