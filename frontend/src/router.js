import { createRouter, createWebHistory } from "vue-router";

import Forum from './views/Forum/Forum.vue';
import UsersProfil from './views/Users/UserProfil.vue';
import UserAuth from './views/auth/UserAuth.vue';
import Mod from './views/Users/Mod.vue';
import store from './store/index.js';

const router = createRouter ({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/auth'},
        { path: '/auth', component: UserAuth, meta: {requiresUnauth: true}},
        { path: '/forum', component: Forum, meta: {requiresAuth: true}},
        { path: '/profil', component: UsersProfil, meta: {requiresAuth: true}},
        { path: '/modération', component: Mod, meta: {requiresAuth: true}},
    ]
});

router.beforeEach(function(to, _, next) {
    if (to.meta.requiresAuth && !store.getters['auth/isAuthenticated']) {
      next('/auth');
    } else if (to.meta.requiresUnauth && store.getters['auth/isAuthenticated']) {
      next('/profil');
    } else {
      next();
    }
  });

export default router;