<template>
  <section class="section columns is-centered is-mobile pt-0">
    <ul
      class="
        column
        is-half-desktop is-three-fifths-tablet is-10-mobile is-half-widescreen
      "
      v-if="hasPosts"
    >
      <li v-for="post in posts" :key="post.id" class="card mt-4 p-6" id="mobile-padding">
        <div>
          <div class="columns is-mobile is-tablet is-desktop is-widescreen">
            <div class="column is-8 pb-0">
              <h3 class="title is-3" id="mobile-title">{{ post.title }}</h3>
            </div>
            <div class="column is-2 ml-6 pt-4" id="dropdown">
              <a @click="deletePost(post.id)">
                <span class="icon has-text-danger pl-6"
                  ><i class="fas fa-trash pr-2"></i
                ></span>
              </a>
            </div>
          </div>
          <div>
            <p class="subtitle is-6 has-text-info" id="subtitle">
              Publié par :
              <strong class="has-text-info"
                >{{ post.firstName }} {{ post.lastName }}</strong
              >
              le {{ post.date }}
            </p>
            <div class="text pb-3">
              <p>
                {{ post.content }}
              </p>
            </div>
          </div>
          <div
            class="columns is-mobile is-tablet is-desktop is-widescreen pt-2"
          >
            <!-- <p @click="">See the likes</p> -->
            <a class="likes column is-4">
              <p class="has-text-link">
                <i
                  class="far fa-heart has-text-danger"
                  v-if="seeLike == post.likes"
                ></i>
                <i class="fas fa-heart has-text-danger" v-else></i>
                {{ post.likes }} Likes
              </p>
            </a>
            <a class="comments column is-5" @click="toggleCom(post.id)">
              <p class="has-text-link" @click="loadComs(post.id)">
                <i class="far fa-comment"></i> Commentaires
              </p>
            </a>
          </div>
           <ul v-if="seeCom === post.id">
              <comments-admin
              v-for="com in comments"
              :key="com.id"
              :comId="com.id"
              :comContent="com.comContent"
              :date="com.date"
            ></comments-admin>
           </ul>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import commentsAdmin from './commentsAdmin.vue';

export default {
  components: { commentsAdmin },
  data() {
    return {
      title: "",
      content: "",
      formIsValid: true,
      seeCom: null,
      comContent: "",
      date: "",
      seeLike: false,
      allLikes: [],
      dataLike: {
        liked: false,
        nbLikes: "",
        postId: "",
        userId: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      posts: "admin/allPosts",
      hasPosts: "forum/hasPosts",
    }),
    comments() {
      return this.$store.state.admin.comments;
    },
  },
  methods: {
    loadPosts() {
      try {
        this.$store.dispatch("admin/getAllPosts");
      } catch (error) {
        this.error = error.message || "Something went wrong !";
      }
    },
    deletePost(postId) {
      try {
        this.$store.dispatch("admin/deletePost", postId);
      } catch (error) {
        this.error =
          "You can't delete this post, try later or contact administrator.";
      }
    },
    loadComs(postId) {
      try {
        this.$store.dispatch("admin/getAllComs", postId);
      } catch (error) {
        this.error = error.message || "Something went wrong !";
      }
    },
    toggleCom(postId) {
      if (!this.seeCom) {
        return (this.seeCom += postId);
      } else return (this.seeCom = null);
    },
  },
  created() {
    this.loadPosts();
  },
};
</script>

<style scoped>
@media screen and (max-width: 769px) {
  #mobile-padding {
    padding: 1.7rem!important;
  }

  #mobile-title {
    font-size: 1.6rem;
  }

  #dropdown {
    flex: none;
    margin-left: 0%!important;
  }

  #subtitle {
    font-size: 0.9rem;
  }
}
</style>