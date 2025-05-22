import { RouteRecordRaw } from "vue-router";

const justinRoutes: RouteRecordRaw[] = [
  {
    path: "/justin",
    component: () => import("src/justin/layouts/MainLayout.vue"),
    children: [
      { path: "", redirect: "/justin/login" },
      { path: "login", component: () => import("src/justin/pages/LoginPage.vue") },
      {
        path: "game",
        component: () => import("src/justin/pages/GamePage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "lobby",
        component: () => import("src/justin/pages/LobbyPage.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
];

export default justinRoutes;
