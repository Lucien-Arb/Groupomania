<template>
<div>
  <form-post></form-post>
  <post></post>
</div>
  
</template>

<script>
import FormPost from '../../components/forum/FormPost.vue';
import Post from '../../components/forum/Post.vue';

export default {
  components: {
    FormPost,
    Post,
  }
}
</script>
