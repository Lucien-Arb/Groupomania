import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
    namespaced: true,
    state() {
        return {
            posts: [
                {
                    id: -1,
                    title: 'Tchopy c\'est un bon',
                    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
                    fuga magni pariatur maxime minima mollitia illo consectetur amet,
                    sapiente fugiat minus deleniti dicta perferendis molestias a autem
                    totam quidem exercitationem`,
                    userId: "",
                    date: "01/01/2022",
                    likes: 0
                }
            ],
            comments : [
                {
                    id: -1,
                    userId: "",
                    postId: "",
                    comContent: `J'ai réussi à afficher mon premier commentaire wal hamdoulillah !`,
                    date: "01/01/2022"
                }
            ],
            allLikes : [
                {
                    nbLikes: "",
                    userId: "",
                    postId: "",
                    liked: false
                }
            ]
        }
    },
    mutations,
    actions,
    getters
}