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
                .then(response => {
                    console.log(response);
                    resolve()
                    instance.get('/post')
                        .then(response => {
                            const posts = JSON.parse(response.data);
                            commit('setPosts', posts)
                        })
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
                .then(response => {
                    console.log(response);
                    resolve()
                    instance.get('/post')
                        .then(response => {
                            const posts = JSON.parse(response.data);
                            commit('setPosts', posts);
                        })
                })
                .catch((error) => {
                    commit('setPosts', null);
                    reject(error);
                })
        });
    },
    getAllPosts: ({
        commit
    }) => {
        return new Promise((resolve, reject) => {
            instance.get('/post')
                .then((response) => {
                    const posts = JSON.parse(response.data);
                    console.log(posts);
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
                resolve(response);
                instance.get('/post')
                        .then(response => {
                            const posts = JSON.parse(response.data);
                            commit('setPosts', posts);
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
    sendCom: ({
        commit
    }, comInfos) => {
        return new Promise((resolve, reject) => {
            instance.post('/post/' + comInfos.id + '/comments', comInfos.data)
                .then((response) => {
                    resolve(response);
                    instance.get('/post/' + comInfos.id + '/comments')
                        .then((response) => {
                            const com = JSON.parse(response.data);
                            commit('setComs', com);
                            resolve(response);
                        })
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
                    resolve(response);
                    instance.get('/post/' + com.id + '/comments')
                        .then((response) => {
                            const com = JSON.parse(response.data);
                            commit('setComs', com);
                            resolve(response);
                        })
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
        return new Promise((resolve, reject) => {
            instance.delete("/post/comments/" + comId)
            .then((response) => {
                resolve(response);
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


    /////////////////// LIKES ///////////////////

    getAllLikes: ({
        commit
    }) => {
        return new Promise((resolve, reject) => {
            instance.get('/post/likes')
                .then((response) => {
                    const likes = JSON.parse(response.data);
                    commit('setLikes', likes);
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    },
    sendLikes: ({
        commit
    }, likes) => {
        return new Promise((resolve, reject) => {
            instance.post('/post/' + likes.postId + '/like', likes.userData)
                .then((response) => {
                    resolve(response);
                    
                })
                .catch((error) => {
                    commit('setLikes', null);
                    reject(error);
                })
        })
    }
}