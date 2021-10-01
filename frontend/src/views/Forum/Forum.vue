<template>
<div>
  <form-post></form-post>
  
  <post></post>

  <ul>
    <!-- <li v-for="post in allPosts" :key="post.id">
      {{ post.title }}
    </li> -->
  </ul>
</div>
  
</template>

<script>
import FormPost from '../../components/forum/FormPost.vue';
import Post from '../../components/forum/Post.vue';

export default {
  components: {
    FormPost,
    Post,
  },
  computed: {
    // allPosts() {
    //   console.log(this.$store.getters['profil/posts'])
    //   return this.$store.getters['profil/posts'];
    // }
  }
}
</script>

<style>

</style>