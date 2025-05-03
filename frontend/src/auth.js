import api from "@/axios";

export const getUser = async () => {
  try {
    const res = await api.get("/auth/me");
    return res.data; // { id, email, role, ... }
  } catch {
    return null;
  }
};

export const checkAuth = async (to, from, next) => {
  const user = await getUser();

  if (!user) {
    return next({ name: "Login" });
  }

  if (to.meta.role && to.meta.role !== user.role) {
    return next({ name: "Unauthorized" });
  }

  next();
};
