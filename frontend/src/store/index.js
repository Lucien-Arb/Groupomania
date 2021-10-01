import { createStore } from 'vuex';

import authModule from './modules/auth/index.js';
import forumModule from './modules/forum/index.js';
import accountModule from './modules/account/index.js';

const store = createStore({
    modules: {
        auth: authModule,
        forum: forumModule,
        account: accountModule,
    },
})

export default store;