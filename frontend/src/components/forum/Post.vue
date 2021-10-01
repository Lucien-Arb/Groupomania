<template>
  <section class="section columns is-centered is-mobile pt-0">
    <ul
      class="
        column
        is-half-desktop is-three-fifths-tablet is-10-mobile is-half-widescreen
      "
      v-if="hasPosts"
    >
      <li v-for="post in posts" :key="post.id" class="card mt-4 p-6">
        <div>
          <div class="columns is-mobile is-tablet is-desktop is-widescreen">
            <div class="column is-8 pb-0">
              <h3 class="title is-3">{{ post.title }}</h3>
            </div>
            <div class="column is-6 is-offset-2">
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
              <button class="button is-normal is-primary is-centered">
                <span class="content-heading-weight">Submit form</span>
              </button>
              <!-- <p > Erreur !</p> -->
            </form>
          </div>
          <div v-else>
            <p class="subtitle is-6 has-text-info">
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
            <a class="likes column is-4">
              <p class="has-text-link">
                <i class="far fa-heart has-text-danger"></i>
                {{ post.likes }} Likes
              </p>
            </a>
            <a class="comments column is-5" @click="toggleCom(post.id)">
              <p class="has-text-link">
                <i class="far fa-comment"></i> Commentaires
              </p>
            </a>
          </div>
          <ul v-if="seeCom === post.id">
            <div @click="loadComs(post.id)">
              <comments 
              v-for="com in comments" 
              :key="com.id"
              :comId="com.id"
              :postId="post.id"
              :comContent="com.content"
              :date="com.date"
              ></comments>
            </div>
              
          </ul>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import comments from "./Comments.vue";

export default {
  components: {
    comments,
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
    };
  },
  computed: {
    posts() {
      return this.$store.state.forum.posts;
    },
    hasPosts() {
      return this.$store.getters["forum/hasPosts"];
    },
    comments() {
      console.log('test')
      return this.$store.state.forum.comments;
    }
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
      document.location.reload();
      try {
        this.$store.dispatch("forum/deletePost", postId);
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
      const id = JSON.parse(localStorage.getItem("user"))["userId"];

      const postData = JSON.stringify({
        userId: id,
        title: this.title,
        content: this.content,
        postId: postId,
      });

      if (this.title === "" && this.content === "" && this.userId === null) {
        this.formIsValid = false;
        return;
      } else {
        this.$store.dispatch("forum/modifyPost", {
          id: postId,
          data: postData,
        });
      }
      document.location.reload();
    },
    toggleCom(postId) {
      if (!this.seeCom) {
        console.log(postId)
        
        return (this.seeCom += postId);
      } else  return (this.seeCom = null);
      
    },
    loadComs(postId) {
      console.log('test')
      try {
        console.log('test')
        this.$store.dispatch("forum/getAllComs", postId);
      } catch(error) {
        this.error = error.message || "Something went wrong !";
      }
    }
  },
  mounted() {
    this.loadPosts();
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
</style>