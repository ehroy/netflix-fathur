import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import DashboardView from "@/views/DashboardView.vue";
import api from "@/axios";
const routes = [
  { path: "/", name: "Login", component: LoginView },
  { path: "/dashboard", name: "Dashboard", component: DashboardView },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.name === "Login") {
    try {
      await api.get("/auth/me"); // Endpoint untuk memeriksa status login
      return next({ name: "Dashboard" });
    } catch {
      return next();
    }
  }

  if (to.name !== "Login") {
    try {
      await api.get("/auth/me");
      return next();
    } catch {
      return next({ name: "Login" });
    }
  }

  next();
});

export default router;
