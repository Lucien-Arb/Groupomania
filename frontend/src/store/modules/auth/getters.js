export default {
    isAuthenticated(state) {
        return !!state.user;
    },
    userData(state) {
        return state.user;
    }
}