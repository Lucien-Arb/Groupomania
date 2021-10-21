export default {
    setStatus: function (state, status) {
        state.status = status;
    },
    logUser: function (state, user) {
        console.log(state.user, user)
        state.user = user;
    },
    loginStop: (state, errorMessage) => {
        state.logginIn = false;
        state.loginError = errorMessage;
    },
};