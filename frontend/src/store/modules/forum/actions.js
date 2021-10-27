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
    }, newPost) => {
        return new Promise((resolve, reject) => {
            instance.post('/post', newPost)
                .then(response => {
                    const post = JSON.parse(newPost);
                    commit('ADD_POST', post);
                    resolve(response)
                    instance.get('/post')
                        .then(response => {
                            const posts = JSON.parse(response.data);
                            commit('GET_POSTS', posts);
                        })
                })
                .catch((error) => {
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
                    const postInfo = JSON.parse(post.data);
                    commit('UPDATE_POST', postInfo);
                    resolve(response);
                })
                .catch((error) => {
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
                    commit('GET_POSTS', posts);
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    },
    deletePost: ({
        commit
    }, post) => {
        return new Promise((resolve, reject) => {
            instance.delete('/post/' + post.id, post)
                .then((response) => {
                    const postInfo = JSON.parse(response.data);
                    commit('DELETE_POST', postInfo);
                    resolve(response);
                    instance.get('/post')
                        .then(response => {
                            const posts = JSON.parse(response.data);
                            commit('GET_POSTS', posts);
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
                    commit('GET_COMS', com);
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    },
    sendCom: ({
        commit
    }, comInfos) => {
        return new Promise((resolve, reject) => {
            instance.post('/post/' + comInfos.id + '/comments', comInfos.data)
                .then((response) => {
                    let new_comment = JSON.parse(response.data)
                    console.log(new_comment, comInfos.data)
                    commit('ADD_COM', new_comment);
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    },
    modifyCom: ({
        commit
    }, comInfos) => {
        return new Promise((resolve, reject) => {
            instance.put('/post/comments/' + comInfos.id, comInfos.data)
                .then((response) => {
                    let com = JSON.parse(comInfos.data);
                    console.log(response.data, com)
                    commit('UPDATE_COM', com);
                    resolve(response);
                    instance.get('/post/' + comInfos.id + '/comments')
                        .then((response) => {
                            const com = JSON.parse(response.data);
                            commit('GET_COMS', com);
                            resolve(response);
                        })
                })
                .catch((error) => {
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
                    const com = JSON.parse(comId);
                    commit('DELETE_COM', com);
                    resolve(response);
                    instance.get('/post/' + comId + '/comments')
                        .then((response) => {
                            const com = JSON.parse(response.data);
                            commit('GET_COMS', com);
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
                })
        })
    },
    sendLikes: ({
        commit
    }, post) => {
        return new Promise((resolve, reject) => {
            instance.post('/post/' + post.postId + '/like', post.userData)
                .then((response) => {
                    const like = JSON.parse(post.userData);
                    commit('ADD_LIKE', like);
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    }
}