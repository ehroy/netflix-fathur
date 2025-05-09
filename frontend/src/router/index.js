import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import DashboardView from "@/views/admin/DashboardView.vue";
import UserTable from "@/components/base/admin/UserTable.vue";
import EmailSetting from "@/components/base/admin/EmailSetting.vue";

import { checkAuth } from "@/auth.js";
import api from "@/axios";
import UserMenu from "@/views/user/MenuView.vue";
import UnauthorizedView from "@/views/UnauthorizedView.vue";
const routes = [
  { path: "/", name: "Login", component: LoginView },
  { path: "/unauthorized", name: "Unauthorized", component: UnauthorizedView },
  {
    path: "/dashboard",
    name: "DashboardView",
    component: DashboardView,
    meta: { role: "admin" },
  },
  {
    path: "/dashboard/user",
    name: "UserTable",
    component: UserTable,
    meta: { role: "admin" },
  },
  {
    path: "/dashboard/imap-settings",
    name: "EmailSetting",
    component: EmailSetting,
    meta: { role: "admin" },
  },
  {
    path: "/email",
    name: "UserMenu",
    component: UserMenu,
    meta: { role: "user" },
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.name === "Login") {
    try {
      const res = await api.get("/auth/me");
      const role = res.data.user?.role;

      if (role === "admin") {
        return next({ name: "DashboardView" });
      } else if (role === "user") {
        return next({ name: "UserMenu" });
      }
    } catch {
      return next(); // belum login, tetap di halaman Login
    }
  }

  try {
    const res = await api.get("/auth/me"); // Mengambil data user untuk pengecekan role
    console.log("User data:", res.data.user.role); // Debug: lihat response API
    const role = res.data.user?.role; // Pastikan 'role' ada dalam response

    // Cek role dan redirect sesuai akses
    if (to.name === "DashboardView") {
      if (role !== "admin") {
        console.log("Redirecting to UserMenu, role is not admin");
        return next({ name: "UserMenu" });
      }
    }

    if (to.name === "UserMenu") {
      if (role !== "user") {
        console.log("Redirecting to Dashboard, role is not user");
        return next({ name: "DashboardView" });
      }
    }

    return next();
  } catch (e) {
    console.log("Error fetching user data:", e); // Debug: cek error API
    return next({ name: "Login" });
  }
});

// router.beforeEach(checkAuth);
export default router;
