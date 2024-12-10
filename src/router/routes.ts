import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/ConnectedPage.vue") },
      { path: "sign-in", component: () => import("pages/LoginPage.vue") },
      { path: "join-game", component: () => import("pages/JoinGamePage.vue"), meta: { requiresAuth: true } },
      { path: "game-page", component: () => import("pages/GamePage.vue") },
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
