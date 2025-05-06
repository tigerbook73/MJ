import { RouteRecordRaw } from "vue-router";

const exampleRoutes: RouteRecordRaw[] = [
  {
    path: "/example",
    component: () => import("src/example/layouts/MainLayout.vue"),
    children: [
      { path: "", redirect: "/example/connecting" },
      { path: "connecting", component: () => import("src/example/pages/ConnectingPage.vue") },
      { path: "sign-in", component: () => import("src/example/pages/SignInPage.vue") },
      { path: "rooms", component: () => import("src/example/pages/RoomPage.vue") },
      { path: "game", component: () => import("src/example/pages/GamePage.vue") },
    ],
  },
];
export default exampleRoutes;
