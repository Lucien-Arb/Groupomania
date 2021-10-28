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
            <div class="column is-2 is-offset-2" id="dropdown" v-if="post.userId === userId">
              <div
                class="dropdown"
                @click="activeIt(post.id)"
                :id="post.id"
                :ref="'element' + post.id"
              >
                <div class="dropdown-trigger has-text-info">
                  <button
                    class="button"
                    aria-haspopup="true"
                    :aria-controls="post.id"
                  >
                    <span class="icon is-small"
                      ><i class="fas fa-ellipsis-v" aria-hidden="true"></i
                    ></span>
                  </button>
                </div>
                <div class="dropdown-menu" :id="post.id" role="menu">
                  <div class="dropdown-content">
                    <a
                      class="dropdown-item"
                      @click="isClicked(post.title, post.content, post.id)"
                    >
                      <span class="icon has-text-info pl-6">
                        <i class="fas fa-edit pr-2 pl-2"></i> Modifier</span
                      >
                    </a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" @click="deletePost(post.id)">
                      <span class="icon has-text-danger pl-6"
                        ><i class="fas fa-trash pr-2"></i> Delete</span
                      >
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="modifyMyPost === post.id" class="ok">
            <form action="put" @submit.prevent="submitForm(post.id)">
              <div class="field">
                <label for="title" class="control">Titre :</label>
                <div class="control">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    class="input"
                    placeholder="Nouvelle recrue"
                    v-model.trim="title"
                  />
                </div>
              </div>
              <div class="field">
                <label for="content" class="control">Texte</label>
                <div class="control">
                  <textarea
                    name="content"
                    id="content"
                    class="textarea"
                    placeholder="Ecrivez ce qu'il vous plaît..."
                    rows="4"
                    v-model.trim="content"
                  ></textarea>
                </div>
              </div>
              <button class="button is-normal px-6 groupomania-red-back has-text-white is-centered">
                <span class="content-heading-weight">Publier</span>
              </button>
            </form>
          </div>
          <div v-else>
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
              <p class="has-text-link" @click="sendLike(post.id, post.likes)">
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
            <comments
              v-for="com in comments"
              :key="com.id"
              :comId="com.id"
              :postId="post.id"
              :comContent="com.comContent"
              :date="com.date"
              :seeCom="post.id"
              :comUserId="com.userId"
            ></comments>
          </ul>
          <form-comments
            v-if="seeCom === post.id"
            :postId="post.id"
            :seeCom="post.id"
          ></form-comments>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import Comments from "./Comments.vue";
import FormComments from "./FormComments.vue";
import { mapGetters } from "vuex";
import axios from "axios";

var token = localStorage.getItem("user");
if (token != null) {
  token = JSON.parse(token)["token"];
}
const instance = axios.create({
  baseURL: "http://localhost:3000/api/",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  },
});

export default {
  components: {
    Comments,
    FormComments,
  },
  data() {
    return {
      modifyMyPost: null,
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
        postId: "",
        userId: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      posts: "forum/allPosts",
      hasPosts: "forum/hasPosts",
    }),
    comments() {
      return this.$store.state.forum.comments;
    },
    getLikes() {
      return this.$store.state.forum.allLikes;
    },
    userId() {
      let user = this.$store.getters["auth/userData"];
      return JSON.parse(user)['userId'];
    },
  },
  methods: {
    loadPosts() {
      try {
        this.$store.dispatch("forum/getAllPosts");
      } catch (error) {
        this.error = error.message || "Something went wrong !";
      }
    },
    deletePost(postId) {
      var user = this.$store.getters["auth/userData"];
      user = JSON.parse(user)['userId'];
      try {
        this.$store.dispatch("forum/deletePost", {
          id: postId,
          userId: user
        });
      } catch (error) {
        this.error =
          "You can't delete this post, try later or contact administrator.";
      }
    },
    activeIt(postId) {
      // const superId = "element" + postId;
      // const number = this.$refs[superId];

      const currentNum = document.getElementById(postId);

      if (currentNum.className === "dropdown") {
        return currentNum.classList.add("is-active");
      } else {
        return currentNum.classList.remove("is-active");
      }
    },
    isClicked(postTitle, postContent, postId) {
      this.title = postTitle;
      this.content = postContent;

      if (!this.modifyMyPost) {
        return (this.modifyMyPost += postId);
      } else return (this.modifyMyPost = null);
    },
    submitForm(postId) {
      const postData = JSON.stringify({
        title: this.title,
        content: this.content,
        id: postId,
      });

      if (this.title === "" && this.content === "" && this.userId === null) {
        this.formIsValid = false;
        return;
      } else {
        this.$store.dispatch("forum/modifyPost", {
          id: postId,
          data: postData,
        });
        this.isClicked();
      }
    },
    toggleCom(postId) {
      if (!this.seeCom) {
        return (this.seeCom += postId);
      } else return (this.seeCom = null);
    },
    loadComs(postId) {
      try {
        this.$store.dispatch("forum/getAllComs", postId);
      } catch (error) {
        this.error = error.message || "Something went wrong !";
      }
    },
      sendLike(postId, likes) {
      const id = JSON.parse(localStorage.getItem("user"))["userId"];

      this.allLikes.forEach(element => {
        if (element.postId == postId && element.userId == id) {
            this.dataLike.nbLikes = likes+-1;
            this.dataLike.liked = true;
          } 
          else if (this.dataLike.liked === false) {
          this.dataLike.nbLikes = likes + 1;
        }
      });

      this.dataLike.postId = postId;
      this.dataLike.userId = id;
      const data = JSON.stringify(this.dataLike);

      try {
        this.$store.dispatch("forum/sendLikes", {
          postId: postId,
          userData: data,
        });
        window.location.reload();
      } catch {
        this.error = "Vous ne pouvez pas liker ce post.";
      }
    },
    likes() {
       instance
      .get("http://localhost:3000/api/post/likes", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        let likes = JSON.parse(response.data);
        this.allLikes = likes;
      })
      .catch((error) => {
        console.log(error);
      });
    }
  },
  created() {
    this.loadPosts();
  },
  mounted() {
    this.likes();
  },
};
</script>

<style scoped>

button {
  border: none;
}

button:hover {
  border: 0.5px solid;
}

@media screen and (max-width: 769px) {
  #mobile-padding {
    padding: 1.7rem!important;
  }

  #mobile-title {
    font-size: 1.6rem;
  }

  #dropdown {
    flex: none;
    margin-left: 0%;
  }

  #subtitle {
    font-size: 0.9rem;
  }
}
</style>