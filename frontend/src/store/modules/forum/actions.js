const axios = require('axios');

const token = JSON.parse(localStorage.getItem('user'))['token'];

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/',
    headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + token }
});


export default {
    sendPost: ({ commit }, userInfos) => {
        return new Promise((resolve, reject) => {
            instance.post('/post',  userInfos)
            .then((response) => {
                const post = JSON.parse(response.data);
                console.log(userInfos);
                commit('setPosts', post);
                resolve(response);
            })
            .catch((error) => {
                commit('setPosts', null);
                reject(error);
            })
        });
        
    },modifyPost: ({ commit }, post ) => {
        return new Promise((resolve, reject) => {
            instance.put('/post/' + post.id, post.data)
            .then((response) => {
                const modifyPost = JSON.parse(response.data);
                commit('setPosts', modifyPost);
                resolve(response);
            })
            .catch((error) => {
                commit('setPosts', null);
                reject(error);
            })
        });
        
    },
    getAllPosts: ({ commit }, posts) => {
        return new Promise((resolve, reject) => {
            instance.get('/post', posts)
            .then((response) => {
                const posts = JSON.parse(response.data);
                commit('setPosts', posts);
                resolve(response);
            })
            .catch((error) => {
                reject(error);
                console.log(error);
            }) 
        })
    },
    deletePost: ({ commit }, postId) => {
            instance.delete('/post/' + postId)
            .then(response => {
                const postDeleted = JSON.parse(response.data);
                commit('setPosts', postDeleted);
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            })
    },
    getAllComs: ({ commit }, comInfos) => {
        return new Promise((resolve, reject) => {
            instance.get('/post/' + comInfos + '/comments')
            .then((response) => {
                const com = JSON.parse(response.data);
                commit('setComs', com);
                resolve(response);
                console.log(resolve)
            })
            .catch((error) => {
                reject(error);
                console.log(error);
            }) 
        })
    },
    sendCom: ({ commit }, comInfos) => {
        return new Promise((resolve, reject) => {
            instance.post('/post/' + comInfos.id + '/comments',  comInfos.data)
            .then((response) => {
                const com = JSON.parse(response.data);
                console.log(com);
                commit('setComs', com);
                resolve(response);
                console.log(comInfos)
            })
            .catch((error) => {
                commit('setPosts', null);
                reject(error);
            })
        });
    }
}