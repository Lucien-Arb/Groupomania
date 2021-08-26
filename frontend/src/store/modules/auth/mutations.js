export default {
    setStatus: function (state, status) {
        state.status = status;
    },
    logUser: function (state, user) {
        state.user = user;
    },
    loginStop: (state, errorMessage) => {
        state.logginIn = false;
        state.loginError = errorMessage;
    },
};