import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Board',
    component: () => import('@/views/Board.vue'),
    children: [
      {
        path: 'task/:columnId/:taskId',
        name: 'Task',
        component: () => import('@/views/Task.vue')
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
