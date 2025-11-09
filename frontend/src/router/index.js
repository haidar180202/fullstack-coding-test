import { createRouter, createWebHistory } from 'vue-router';
import MyProfile from '../components/UserProfile.vue';
import RandomProfile from '../views/RandomProfile.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

const routes = [
  {
    path: '/',
    name: 'MyProfile',
    component: MyProfile,
    meta: { requiresAuth: true },
  },
  {
    path: '/random-profile',
    name: 'RandomProfile',
    component: RandomProfile,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('token');

  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;