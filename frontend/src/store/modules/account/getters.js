export default {
    hasUser(state) {
        return state.users && state.users.length > 0;
    },
}