import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
    namespaced: true,
    state() {
        return {
            status: '',
            user: {
                userId: -1,
                token: '',
                moderation: null,
            },
            logginIn: false,
            loginError: null
        }
            
    },
    mutations,
    actions,
    getters
}