const axios = require('axios');

var token = localStorage.getItem('user');

if (token != null) {
    token = JSON.parse(token)['token'];
}

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/',
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
    }
});


export default {
    
    ///////////////////  POSTS ///////////////////

    sendPost: ({
        commit
    }, userInfos) => {
        return new Promise((resolve, reject) => {
            instance.post('/post', userInfos)
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

    },
    modifyPost: ({
        commit
    }, post) => {
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
    getAllPosts: ({
        commit
    }, posts) => {
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
    deletePost: ({
        commit
    }, postId) => {
        instance.delete('/post/' + postId)
        console.log(postId)
            .then(response => {
                const postDeleted = JSON.parse(response.data);
                commit('setPosts', postDeleted);
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            })
    },

    ///////////////////  COMMENTAIRES   ///////////////////

    getAllComs: ({
        commit
    }, comInfos) => {
        return new Promise((resolve, reject) => {
            instance.get('/post/' + comInfos + '/comments')
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
    sendCom: ({
        commit
    }, comInfos) => {
        return new Promise((resolve, reject) => {
            instance.post('/post/' + comInfos.id + '/comments', comInfos.data)
                .then((response) => {
                    const com = JSON.parse(response.data);
                    console.log(com);
                    commit('setComs', com);
                    resolve(response);
                    console.log(comInfos)
                })
                .catch((error) => {
                    commit('setComs', null);
                    reject(error);
                })
        });
    },
    modifyCom: ({
        commit
    }, com) => {
        return new Promise((resolve, reject) => {
            instance.put('/post/comments/' + com.id, com.data)
                .then((response) => {
                    const modifyCom = JSON.parse(response.data);
                    commit('setComs', modifyCom);
                    resolve(response);
                })
                .catch((error) => {
                    commit('setComs', null);
                    reject(error);
                })
        });
    },
    deleteCom: ({
        commit
    }, comId) => {
        instance.delete("/post/comments/" + comId)
            .then(response => {
                const comDeleted = JSON.parse(response.data);
                commit('setComs', comDeleted);
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            })
    },


    /////////////////// LIKES ///////////////////

    getAllLikes: ({
  commit
    }, likes) => {
        return new Promise((resolve, reject) => {
            instance.get('/post/likes', likes)
                .then((response) => {
                    const likes = JSON.parse(response.data);
                    commit('setLikes', likes);
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                    console.log(error);
                })
        })
    },
    sendLikes: ({
        commit
    }, post) => {
        return new Promise((resolve, reject) => {
            instance.post('/post/' + post.postId + '/like', post.userData)
                .then((response) => {
                    const like = JSON.parse(response.data);
                    console.log(like);
                    commit('setLikes', like);
                    resolve(response);
                    console.log(response)
                })
                .catch((error) => {
                    commit('setLikes', null);
                    reject(error);
                    console.log(error);
                })
        });
    }
}