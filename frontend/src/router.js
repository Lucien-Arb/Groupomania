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
        { path: '/moderation', component: Mod, meta: {requiresAuth: true}},
    ]
});

router.beforeResolve(function(to, _, next) {
    console.log('test');
    if (to.meta.requiresAuth && !store.getters['auth/isAuthenticated']) {
      console.log('test');
      next('/auth');
    } else if (to.meta.requiresUnauth && store.getters['auth/isAuthenticated'] == true) {
      console.log(store.getters['auth/isAuthenticated'], 'test router guard');
      next({path: '/forum', replace: true});
    } else {
      next();
    }
  });

export default router;