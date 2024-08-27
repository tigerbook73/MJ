import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/connect",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "connect", component: () => import("pages/ConnectPage.vue") },
      { path: "game", component: () => import("pages/IndexPage.vue") },
      { path: "lobby", component: () => import("pages/LobbyPage.vue") },
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
