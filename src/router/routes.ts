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
  {
    path: "/example",
    component: () => import("src/example/layouts/ExampleLayout.vue"),
    children: [
      { path: "", redirect: "/example/connecting" },
      { path: "connecting", component: () => import("src/example/pages/ConnectingPage.vue") },
      { path: "sign-in", component: () => import("src/example/pages/SignInPage.vue") },
      { path: "rooms", component: () => import("src/example/pages/RoomPage.vue") },
      { path: "game", component: () => import("src/example/pages/GamePage.vue") },
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
