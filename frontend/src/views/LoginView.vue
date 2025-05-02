<template>
  <div
    class="min-h-screen flex items-center justify-center bg-black bg-opacity-80 bg-cover bg-center px-4"
    style="
      background-image: url('https://assets.nflxext.com/ffe/siteui/vlv3/fa7be975-efc3-48c6-8188-f07fdd1aa476/web/ID-en-20250428-TRIFECTA-perspective_7c4e36ca-7867-4157-bdbd-3d5779ea5d79_small.jpg');
    "
  >
    <div
      class="bg-black bg-opacity-75 w-full max-w-md text-white rounded-md p-6 sm:p-8"
    >
      <h2 class="text-2xl sm:text-3xl font-bold mb-6 text-center">
        Sign In Email Netflix App
      </h2>
      <form @submit.prevent="login">
        <input
          v-model="email"
          placeholder="Email or phone number"
          class="bg-gray-800 text-white p-3 w-full mb-4 rounded text-sm sm:text-base"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="bg-gray-800 text-white p-3 w-full mb-4 rounded text-sm sm:text-base"
        />
        <button
          type="submit"
          class="bg-red-600 hover:bg-red-700 w-full py-3 rounded font-semibold text-sm sm:text-base"
        >
          Sign In
        </button>
      </form>
      <p class="text-red-400 mt-3 text-sm text-center">{{ error }}</p>
      <div class="flex justify-between text-xs sm:text-sm mt-4 text-gray-400">
        <label><input type="checkbox" class="mr-1" /> Remember me</label>
        <a href="#" class="hover:underline">Need help?</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { LoginUser } from "@/services/userServices.js";

const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();

const login = async () => {
  error.value = "";
  try {
    const respon = await LoginUser(email.value, password.value);
    if (respon.status === 200) {
      router.push("/dashboard");
    } else {
      router.push("/");
    }
  } catch (err) {
    error.value = err.response?.data?.message || "Login failed !!";
  }
};
// onMounted(async () => {
//   try {
//     const [loginRes] = await Promise.all([
//       LoginUser(email.value, password.value),
//     ]);
//     console.log(loginRes);
//   } catch (err) {
//     error.value = "Gagal mengambil data";
//   } finally {
//     loading.value = false;
//   }
// });
</script>
