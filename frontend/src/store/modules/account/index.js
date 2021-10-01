import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
    namespaced: true,
    state() {
        return {
            users: [
                {
                    id: 1,
                    firstName: "Tchopy",
                    lastName: "Sampedro",
                    email: "sampepe@gmail.com",
                    password: "okokman",
                }
            ]
        }
            
    },
    mutations,
    actions,
    getters
}