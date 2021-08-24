import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
    state: {
            status: '',
            user: {
                userId: -1,
                token: '',
                moderation: null,
            },
    },
    mutations,
    actions,
    getters
}