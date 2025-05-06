import exampleRoutes from "src/example/router/routes";
import simonRoutes from "src/simon/router/routes";
import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("src/pages/ErrorNotFound.vue"),
  },

  // example routes
  ...exampleRoutes,

  // simon routes
  ...simonRoutes,

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
