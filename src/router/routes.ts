import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/home.vue'),
  },
  {
    path: '/introduction',
    name: 'Introduction',
    redirect: '/introduction/three',
    children: [
      {
        path: '/introduction/three',
        name: 'Three',

        component: () =>
          import(
            /* webpackChunkName: "three" */
            /* webpackPrefetch: true */
            '@/views/home/three.vue'
          ),
      },
      {
        path: '/introduction/two',
        name: 'Two',
        component: () =>
          import(
            /* webpackChunkName: "two" */
            /* webpackPrefetch: true */
            '@/views/home/two.vue'
          ),
      },
    ],
    // component: () => import("@/views/home/home.vue"),
  },
];

export default routes;
