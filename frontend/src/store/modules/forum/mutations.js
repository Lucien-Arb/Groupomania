export default {
    GET_POSTS(state, post) {
        state.posts = post;
    },
    ADD_POST(state, newPost) {
        state.posts.unshift(newPost);
    },
    UPDATE_POST(state, newPost) {
        const postIndex = state.posts.findIndex(
            p => p.id === newPost.id
        )
        state.posts[postIndex] = newPost;
        state.posts = [...state.posts];
    },
    DELETE_POST(state, post) {
        if (state.posts.id === post) {
            const postIndex = state.posts.findIndex( p => p.id === post);
            if (postIndex !== -1) {
                state.posts.splice(postIndex, 1);
            } 
        }
    },
    GET_COMS(state, com) {
        state.comments = com;
    },
    ADD_COM(state, newCom) {
        state.comments.push(newCom);
    },
    UPDATE_COM(state, newCom) {
        const comIndex = state.comments.findIndex(c => c.id === newCom.id);
        state.comments[comIndex] = newCom
    },
    DELETE_COM(state, com) {
        if (state.comments.id === com.comId) {
            const comIndex = state.comments.findIndex(c => c.id === com.id);
            if (comIndex !== -1) {
                state.comments.splice(comIndex, 1);
            }
        }
    },
    GET_LIKES(state, like) {
        state.allLikes = like;
        state.posts.likes = like;
    },
    ADD_LIKE(state, newLike) {
        state.likes = newLike;
    }
}