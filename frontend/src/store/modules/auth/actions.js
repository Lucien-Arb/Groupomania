const axios = require('axios');

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/auth/'
})

export default {
    signup: ({ commit }, userInfos) => {
        return new Promise((resolve, reject) => {
            commit;
            instance.post('/signup', userInfos)
                .then((response) => {
                    commit('setStatus', 'created');
                    resolve(response);
                })
                .catch((error) => {
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
                    console.log(response.data, userInfos)
                    const log = JSON.parse(response.data);
                    const user = JSON.stringify({
                        userId: log.userId,
                        token: log.token,
                        moderation: log.moderation
                    })
                    localStorage.setItem('user', user);
                    commit('loginStop', null);
                    commit('setStatus', 'loggedIn');
                    commit('logUser', user);
                    resolve(response);
                })
                .catch((error) => {
                    commit('setStatus', 'error_login');
                    commit('user', null);
                    reject(error);
                })
        })
    },
    fetchAccessUser({ commit }) {
        if (localStorage.getItem('user') !== "") {
            commit('logUser', localStorage.getItem('user'));
        }
    },
    logout({commit}) {
           //  dispatch('fetchAccessUser');
            commit('logUser', localStorage.removeItem('user'));
    }

}