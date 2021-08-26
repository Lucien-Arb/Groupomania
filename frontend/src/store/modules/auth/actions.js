const axios = require('axios');

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/auth/'
})

export default {
    signup: ({ commit }, userInfos) => {
        return new Promise((resolve, reject) => {
            commit;
            instance.post('/signup', userInfos)
                .then(function (response) {
                    commit('setStatus', 'created');
                    resolve(response);
                    console.log(instance);
                })
                .catch(function (error) {
                    commit('setStatus', 'error_create');
                    reject(error);
                })
        })
    },
    login: ({ commit }, userInfos) => {
        commit('setStatus', 'loading');
        return new Promise((resolve, reject) => {
            instance.post('/login', userInfos)
                .then((response) => {
                    let log = JSON.parse(response.data);
                    localStorage.setItem('userId', log.userId);
                    localStorage.setItem('token', log.token);
                    localStorage.setItem('moderation', log.moderation);
                    commit('setStatus', 'login');
                    commit('logUser', localStorage);
                    resolve(response);
                    console.log(localStorage);
                })
                .catch((error) => {
                    commit('setStatus', 'error_login');
                    commit('logUser', null);
                    reject(error);
                })
        })

    },
    fetchAccessUser({ commit }) {
        commit('logUser', localStorage.getItem('user'));
    }

}