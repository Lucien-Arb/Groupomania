const axios = require('axios');

const token = JSON.parse(localStorage.getItem('user'))['token'];

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/',
    headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + token }
});

export default {
    getMyInfos: ({ commit }, userData) => {
        return new Promise((resolve, reject) => {
            instance.get('/auth/', userData)
            .then((response) => {
                const userData = JSON.parse(response.data);
                commit('getUserInfos', userData);
                console.log(response);
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },
    modifyInfos: ({ commit }, userData) => {
        return new Promise((resolve, reject) => {
            instance.put('/auth/', userData)
            .then((response) => {
                const modifyProfil = JSON.parse(response.data);
                commit('getUserInfos', modifyProfil);
                console.log(response)
                resolve(response);
            })
            .catch((error) => {
                commit('getUserInfos', null);
                reject(error);
            })
        })
    },
    deleteUser: ({ commit }) => {
            instance.delete('/auth/')
            .then(response => {
                const userDeleted = JSON.parse(response.data);
                commit('getUserInfos', userDeleted);
                console.log(userDeleted)
            })
            .catch(error => {
                commit('getUserInfos', null);
                console.log(error)
            })
    }
}