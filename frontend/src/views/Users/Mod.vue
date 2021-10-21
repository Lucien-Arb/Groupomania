<template>
  <div v-if="hasUser">
    <section class="hero is-small is-link p-6">
      <div class="hero-body">
        <p class="title">Espace administration de : {{ fullName }} !</p>
        <p class="subtitle">
          Les boutons ci-dessous vous permettent de voir les posts publiés sur
          le forum ainsi que leurs commentaires. Vous pourrez supprimé ceux qui
          ne respectent pas le réglement interne en cas de besoin.
        </p>
      </div>
    </section>
    <section class="section columns is-centered is-mobile mt-6">
      <div
        class="
          column
          is-half-desktop is-three-fifths-tablet is-10-mobile is-half-widescreen
        "
      >
        <button class="button is-info mr-4" @click="togglePosts()">
          <span>Publications et Commentaires</span>
          <span class="icon is-small">
            <i class="fas fa-edit"></i>
          </span>
        </button>
        <button class="button is-primary mr-4 mobile-style" @click="toggleUsers()">
          <span>Utilisateurs</span>
          <span class="icon is-small">
            <i class="fas fa-users"></i>
          </span>
        </button>
      </div>
    </section>
    <users-posts v-show="seePosts == true"></users-posts>
    <users-admin v-show="seeUsers == true"></users-admin>
  </div>
</template>

<script>
import usersPosts from "../../components/admin/usersPosts.vue";
import usersAdmin from "../../components/admin/usersAdmin.vue";

export default {
  components: {
    usersPosts,
    usersAdmin,
  },
  data() {
    return {
      seePosts: false,
      seeUsers: false,
    };
  },
  computed: {
    users() {
      return this.$store.state.account.users;
    },
    hasUser() {
      return this.$store.getters["account/hasUser"];
    },
    fullName() {
      const user = this.$store.state.account.users;
      return (
        user[0].firstName.charAt(0).toUpperCase() +
        user[0].firstName.slice(1) +
        " " +
        user[0].lastName.charAt(0).toUpperCase() +
        user[0].lastName.slice(1)
      );
    },
  },
  methods: {
    togglePosts() {
      if (!this.seePosts) {
        return (this.seePosts += true);
      } else return (this.seePosts = false);
    },
    toggleUsers() {
      if (!this.seeUsers) {
        return (this.seeUsers += true);
      } else return (this.seeUsers = false);
    },
    loadUserInfos() {
      try {
        this.$store.dispatch("account/getMyInfos");
      } catch (error) {
        this.error = error.message || "Something went wrong !";
      }
    },
  },
  mounted() {
    this.loadUserInfos();
  }
};
</script>

<style scoped>
</style>