export default {
    allPosts(state) {
        return state.posts;
    },
    hasPosts(state) {
        return state.posts && state.posts.length > 0;
    },
    allLikes(state) {
        return state.likes;
    }

}