import { RouteRecordRaw } from "vue-router";

const justinRoutes: RouteRecordRaw[] = [
  {
    path: "/justin",
    component: () => import("src/layouts/MainLayout.vue"),
    children: [
      { path: "", redirect: "/justin/'login" },
      { path: "login", component: () => import("pages/LoginPage.vue") },
      {
        path: "game",
        component: () => import("pages/GamePage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "lobby",
        component: () => import("pages/LobbyPage.vue"),
        meta: { requiresAuth: true },
      },
      { path: "client-page", component: () => import("pages/ClientPage.vue") },
    ],
  },
];

export default justinRoutes;
