import exampleRoutes from "src/example/router/routes";
import simonRoutes from "src/simon/router/routes";
import { RouteRecordRaw } from "vue-router";
import justinRoutes from "../justin/router/routes";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("src/pages/ErrorNotFound.vue"),
  },

  // example routes
  ...exampleRoutes,

  // justin routes
  ...justinRoutes,

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
