export default {
    isAuthenticated(state) {
        console.log(state.user, !!state.user, state);
        return !!state.user;
    },
    userData(state) {
        return state.user;
    }
}