import exampleRoutes from "src/example/router/routes";
import { RouteRecordRaw } from "vue-router";
import justinRoutes from "../justin/router/routes";

const routes: RouteRecordRaw[] = [
  // justin routes
  ...justinRoutes,

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
