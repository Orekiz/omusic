import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/view/HomeView.vue')
  },
  {
    path: '/explore',
    component: () => import('@/view/Explore.vue')
  },
  // 没有匹配上的路由一律重定向到404路径
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/404'
  },
  {
    path: '/404',
    component: () => import('@/view/404.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
