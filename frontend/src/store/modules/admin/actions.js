const axios = require('axios');

var token = localStorage.getItem('user');

if (token != null) {
    token = JSON.parse(token)['token'];
}

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/moderation/',
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
    }
});


export default {
    
    ///////////////////  POSTS ///////////////////

    getAllPosts: ({ commit }) => {
        return new Promise((resolve, reject) => {
            instance.get('/posts')
                .then((response) => {
                    const posts = JSON.parse(response.data);
                    console.log(posts)
                    commit('setPosts', posts);
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    },
    deletePost: ({
        commit
    }, postId) => {
        instance.delete('/post/' + postId)
            .then(response => {
                const postDeleted = JSON.parse(response.data);
                commit('setPosts', postDeleted);
            })
            .catch(error => {
                console.log(error);
            })
    },

    ///////////////////  COMMENTAIRES   ///////////////////

    getAllComs: ({
        commit
    }, postId) => {
        return new Promise((resolve, reject) => {
            instance.get('/post/' + postId + '/comments')
                .then((response) => {
                    const com = JSON.parse(response.data);
                    commit('setComs', com);
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                    console.log(error);
                })
        })
    },
    deleteCom: ({
        commit
    }, comId) => {
        instance.delete("/comment/" + comId)
            .then(response => {
                const comDeleted = JSON.parse(response.data);
                commit('setComs', comDeleted);
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            })
    },
}
