import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
    namespaced: true,
    state() {
        return {
            posts: [
                {
                    id: 1,
                    title: 'Tchopy c\'est un bon',
                    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
                    fuga magni pariatur maxime minima mollitia illo consectetur amet,
                    sapiente fugiat minus deleniti dicta perferendis molestias a autem
                    totam quidem exercitationem`,
                    userId: "",
                    likes: 0
                }
            ]
        },
        {
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