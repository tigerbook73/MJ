import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/client-page",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "login", component: () => import("pages/LoginPage.vue") },
      {
        path: "game",
        component: () => import("pages/IndexPage.vue"),
        // meta: { requiresAuth: true },
      },
      {
        path: "lobby",
        component: () => import("pages/LobbyPage.vue"),
        meta: { requiresAuth: true },
      },
      { path: "client-page", component: () => import("pages/ClientPage.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
