export default {
    GET_INFOS(state, user) {
        state.users = user;
    },
    UPDATE_USER(state, newInfos) {
        const userIndex = state.users.findIndex(
            u => u.id === newInfos.id
        )
        state.users[userIndex] = newInfos;
        state.users = [...state.users];
    },
    DELETE_USER(state, user) {
        if (state.users.id === user.userId) {
            const userIndex = state.users.findIndex( u => u.id === user.id);
            if (userIndex !== -1) {
                state.users.splice(userIndex, 1);
            } 
        }
    }
}