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
        return new Promise((resolve, reject) => {
        instance.delete('/post/' + postId)
            .then((response) => {
                const postDeleted = JSON.parse(response.data);
                commit('setPosts', postDeleted);
                instance.get('/posts')
                .then((response) => {
                    const posts = JSON.parse(response.data);
                    commit('setPosts', posts);
                    resolve(response);
                })
            })
            .catch((error) => {
                reject(error);
            })
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
        return new Promise((resolve, reject) => {
        instance.delete("/comment/" + comId)
            .then(response => {
                const comDeleted = JSON.parse(response.data);
                commit('setComs', comDeleted);
                instance.get('/post/' + comId + '/comments')
                .then((response) => {
                    const com = JSON.parse(response.data);
                    commit('setComs', com);
                    resolve(response);
                })
            })
            .catch((error) => {
                reject(error);
            })
        })
    },


    ///////////////////  USERS   ///////////////////

    getAllUsers: ({ commit }) => {
        return new Promise((resolve, reject) => {
            instance.get('/users/')
            .then((response) => {
                const users = JSON.parse(response.data);
                commit('setUsers', users);
                resolve();
            })
            .catch((error) => {
                reject(error);
            })
        })
    },

    deleteUser: ({
        commit
    }, userId) => {
        return new Promise((resolve, reject) => {
        instance.delete("/user/" + userId)
            .then((response) => {
                const userDeleted = JSON.parse(response.data);
                commit('setUsers', userDeleted);
                resolve(response);
                instance.get('/users/')
                    .then((response) => {
                        const users = JSON.parse(response.data);
                        commit('setUsers', users);
                        resolve();
                    })
            })
            .catch((error) => {
                reject(error);
            })
        })
    },

}
