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
                    const log = JSON.parse(response.data);
                    const user = JSON.stringify({
                        userId: log.userId,
                        token: log.token,
                        moderation: log.moderation
                    })
                    localStorage.setItem('user', user);
                    commit('loginStop', null);
                    commit('setStatus', 'login');
                    commit('logUser', {userId : log.userId, token: log.token, moderation: log.moderation});
                    resolve(response);
                    console.log(localStorage);
                })
                .catch((error) => {
                    commit('setStatus', 'error_login');
                    commit('loginStop', error.log.error);
                    commit('user', null);
                    reject(error);
                })
        })

    },
    fetchAccessUser({ commit }) {
        commit('logUser', localStorage.getItem('user'));
    },

}