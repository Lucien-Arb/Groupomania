export default {
    setPosts(state, post) {
        state.posts = post;
    },
    addPost(state, payload) {
        state.posts.push(payload);
    },
    setComs(state, com) {
        state.comments = com;
    },
    setLikes(state, like) {
        state.allLikes = like;
        state.posts.likes = like;
    }
}