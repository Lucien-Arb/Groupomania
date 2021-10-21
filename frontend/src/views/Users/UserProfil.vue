<template>
  <div>
    <user-hero></user-hero>
    <section class="section columns is-centered is-mobile">
      <div
        class="
          column
          is-half-desktop is-three-fifths-tablet is-10-mobile is-half-widescreen
        "
      >
        <div class="box mt-4" v-if="hasUser">
          <div class="pl-4">
            <h2 class="title has-text-dark">Mon profil</h2>
            <div v-for="user in users" :key="user.id">
              <div v-if="toggleForm === null">
                <p class="mb-0 content is-medium"><strong>Prénom :</strong></p>
                <p class="mb-3 content is-medium ">{{ user.firstName }}</p>
                <p class="mb-0 content is-medium"><strong>Nom :</strong></p>
                <p class="mb-3 content is-medium">{{ user.lastName }}</p>
                <p class="mb-0 content is-medium"><strong>Email :</strong></p>
                <p class="mb-1 content is-medium">{{ user.email }}</p>
              </div>
              <form
                action=""
                @submit.prevent="submitForm(userId)"
                class="pt-0"
                v-else-if="toggleForm === userId"
              >
                <div class="field">
                  <label for="firstName" class="control content is-medium"><strong>Prénom :</strong></label>
                  <div class="control">
                    <input
                      type="text"
                      id="firstName"
                      class="input"
                      v-model.trim="firstName"
                    />
                  </div>
                </div>
                <div class="field">
                  <label for="lastName" class="control content is-medium"><strong>Nom :</strong></label>
                  <div class="control">
                    <input
                      type="text"
                      id="lastName"
                      class="input"
                      v-model.trim="lastName"
                    />
                  </div>
                </div>
                <div class="field">
                  <label for="email" class="control content is-medium"><strong>Email :</strong></label>
                  <div class="control">
                    <input
                      type="email"
                      id="email"
                      class="input"
                      v-model.trim="email"
                    />
                  </div>
                </div>
                <a
                  :id="userId"
                  class="button is-info mr-4 is-outlined"
                  @click="isClicked(userId)"
                >
                  <span>Retour</span>
                  <span class="icon is-small">
                    <i class="fas fa-undo-alt"></i>
                  </span>
                </a>
                <button :id="userId" class="button is-success">
                  <span>Valider</span>
                  <span class="icon is-small">
                    <i class="far fa-check-circle"></i>
                  </span>
                </button>
              </form>
              <p class="buttons mt-4 mb-2">
                <button
                  class="button is-info mr-4"
                  @click="isClicked(userId)"
                  v-show="toggleForm === null"
                >
                  <span>Modifier</span>
                  <span class="icon is-small">
                    <i class="fas fa-edit"></i>
                  </span>
                </button>
                <button
                  :id="userId"
                  class="button is-danger is-outlined"
                  @click="deleteUser(userId)"
                  v-show="toggleForm === null"
                >
                  <span>Supprimer</span>
                  <span class="icon is-small">
                    <i class="fas fa-trash"></i>
                  </span>
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import UserHero from "../../components/profil/UserHero.vue";

export default {
  props: {},
  data() {
    return {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      toggleForm: null,
    };
  },
  components: {
    UserHero,
  },
  computed: {
    userId() {
      let user = this.$store.getters["auth/userData"];
      return JSON.parse(user)['userId'];
      //return 1;
    },
    users() {
      return this.$store.state.account.users;
    },
    hasUser() {
      return this.$store.getters["account/hasUser"];
    },
  },
  methods: {
    loadUserInfos() {
      try {
        this.$store.dispatch("account/getMyInfos");
      } catch (error) {
        this.error = error.message || "Something went wrong !";
      }
    },
    isClicked(userId) {
      const user = this.$store.state.auth.user;
      userId = JSON.parse(user).userId;
      if (!this.toggleForm) {
        return (this.toggleForm += userId);
      } else {
        return (this.toggleForm = null);
      }
    },
    deleteUser(userId) {
      try {
        const user = this.$store.state.auth.user;
        userId = JSON.parse(user).userId;
        console.log(userId);
        this.$store.dispatch("account/deleteUser", userId);
        this.$store.dispatch("auth/logout");
        this.$router.replace("/auth")
      } catch (error) {
        this.error =
          "You can't delete this post, try later or contact administrator.";
      }
    },
    submitForm() {
      const userData = JSON.stringify({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
      });
      if (this.title === "" && this.content === "" && this.userId === null) {
        this.formIsValid = false;
        return;
      } else {
        this.$store.dispatch("account/modifyInfos", userData);
      }
      // document.location.reload();
    },
  },
  mounted() {
    this.loadUserInfos();

    // let user = this.$store.getters["auth/userData"];
    //   const userId = JSON.parse(user)['userId'];
    //   console.log(userId);
    //   return this.userId === userId;
  }
};
</script>

<style>
</style>