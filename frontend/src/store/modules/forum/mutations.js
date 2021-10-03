export default {
    setPosts(state, post) {
        state.posts = post;
    },
    setComs(state, com) {
        console.log(com)
        state.comments = com;
    }
}