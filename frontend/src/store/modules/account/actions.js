const axios = require('axios');

var token = localStorage.getItem('user');

if (token != null) {
    token = JSON.parse(token)['token'];
}

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/',
    headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + token }
});

export default {
    getMyInfos: ({ commit }, userData) => {
        return new Promise((resolve, reject) => {
            instance.get('/auth', userData)
            .then((response) => {
                const userData = JSON.parse(response.data);
                commit('getUserInfos', userData);
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },
    modifyInfos: ({ commit }, userData) => {
        return new Promise((resolve, reject) => {
            instance.put('/auth', userData)
            .then((response) => {
                resolve(response);
                instance.get('/auth', userData)
                    .then((response) => {
                        const userData = JSON.parse(response.data);
                        commit('getUserInfos', userData);
                        resolve(response);
                    })
            })
            .catch((error) => {
                commit('getUserInfos', null);
                reject(error);
            })
        })
    },
    deleteUser: ({ commit }, userData) => {
        return new Promise((resolve, reject) => {
            instance.delete('/auth/')
            .then((response) => {
                resolve(response);
                instance.get('/auth', userData)
                    .then((response) => {
                        const userData = JSON.parse(response.data);
                        commit('getUserInfos', userData);
                        resolve(response);
                    })

            })
            .catch((error) => {
                reject(error)
            })
        })
    }
}