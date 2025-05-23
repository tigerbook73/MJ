import type { RouteRecordRaw } from "vue-router";

const simonRoutes: RouteRecordRaw[] = [
  {
    path: "/simon",
    component: () => import("src/simon/layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("src/simon/pages/ConnectedPage.vue") },
      { path: "sign-in", component: () => import("src/simon/pages/LoginPage.vue") },
      { path: "join-game", component: () => import("src/simon/pages/JoinGamePage.vue"), meta: { requiresAuth: true } },
      { path: "game-page", component: () => import("src/simon/pages/GamePage.vue") },
      { path: "index-page", component: () => import("src/simon/pages/IndexPage.vue") },
    ],
  },
];
export default simonRoutes;
