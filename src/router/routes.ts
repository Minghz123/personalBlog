import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/home/home.vue"),
  },
  {
    path: "/introduction",
    name: "Introduction",
    redirect: "/introduction/three",
    children: [
      {
        path: "/introduction/three",
        name: "Three",
        component: () => import("@/views/home/three.vue"),
      },
    ],
    // component: () => import("@/views/home/home.vue"),
  },
];

export default routes;
