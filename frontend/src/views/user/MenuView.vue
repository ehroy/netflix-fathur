<template>
  <div class="p-4 max-w-5xl mx-auto">
    <h1 class="text-2xl font-semibold mb-4">Inbox</h1>

    <input
      v-model="searchTerm"
      @input="filterMessages"
      type="text"
      placeholder="Search messages..."
      class="w-full p-2 border border-gray-300 rounded mb-4"
    />

    <div v-if="filteredMessages.length === 0" class="text-gray-500">
      No messages found.
    </div>

    <table class="w-full table-auto border-collapse" v-else>
      <thead>
        <tr class="bg-gray-100">
          <th class="text-left p-2 border">From</th>
          <th class="text-left p-2 border">Subject</th>
          <th class="text-left p-2 border">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="msg in filteredMessages"
          :key="msg.id"
          class="hover:bg-gray-50 transition"
        >
          <td class="p-2 border">{{ msg.from }}</td>
          <td class="p-2 border">{{ msg.subject }}</td>
          <td class="p-2 border">{{ formatDate(msg.date) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const messages = ref([]);
const searchTerm = ref("");
const filteredMessages = ref([]);

const dummyData = [
  {
    id: 1,
    from: "admin@vintia.com",
    subject: "Welcome to Vintia!",
    date: "2025-04-25T10:00:00Z",
  },
  {
    id: 2,
    from: "noreply@netflix.com",
    subject: "Your Subscription is Active",
    date: "2025-04-26T13:45:00Z",
  },
  {
    id: 3,
    from: "support@someemail.com",
    subject: "Password Reset Link",
    date: "2025-04-27T08:15:00Z",
  },
];

const filterMessages = () => {
  const term = searchTerm.value.toLowerCase();
  filteredMessages.value = messages.value.filter(
    (msg) =>
      msg.from.toLowerCase().includes(term) ||
      msg.subject.toLowerCase().includes(term)
  );
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleString();
};

onMounted(() => {
  messages.value = dummyData;
  filteredMessages.value = [...messages.value];
});
</script>
