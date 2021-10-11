export default {
    setPosts(state, post) {
        state.posts = post;
    },
    setComs(state, com) {
        state.comments = com;
    },
    setLikes(state, like) {
        state.likes = like;
    }
}