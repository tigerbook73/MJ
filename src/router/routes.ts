import exampleRoutes from "src/example/router/routes";
import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "connect", component: () => import("pages/ConnectPage.vue") },
      { path: "join-game", component: () => import("pages/JoinGamePage.vue") },
      { path: "client-page", component: () => import("pages/ClientPage.vue") },
    ],
  },
  // example routes
  ...exampleRoutes,

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
