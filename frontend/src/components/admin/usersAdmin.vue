<template>
<section class="section columns is-centered is-mobile">
      <div
        class="
          column
          is-half-desktop is-three-fifths-tablet is-12-mobile is-half-widescreen
        "
      >
        <h3 class="title box p-5" id="title">Les utilisateurs sont classés par odre alphabétique en partant de la lettre "A".</h3>
        <ul class="" >
          <li class="pl-4 box mt-4"  v-for="user in users" :key="user.id">
            <div>
              <div>
                <p class="mb-0 content is-medium"><strong>Prénom :</strong></p>
                <p class="mb-3 content is-medium ">{{ user.firstName }}</p>
                <p class="mb-0 content is-medium"><strong>Nom :</strong></p>
                <p class="mb-3 content is-medium">{{ user.lastName }}</p>
                <p class="mb-0 content is-medium"><strong>Email :</strong></p>
                <p class="mb-1 content is-medium">{{ user.email }}</p>
              </div>
              <p class="buttons mt-4 mb-2">
                <button
                  :id="user.id"
                  class="button groupomania-red-back has-text-white"
                  @click="deleteUser(user.id)"
                >
                  <span>Supprimer</span>
                  <span class="icon is-small">
                    <i class="fas fa-trash"></i>
                  </span>
                </button>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
</template>

<script>
  import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters({
      users: "admin/allUsers",
    })
   
  },
  methods: {
    loadUsers() {
      try {
        this.$store.dispatch("admin/getAllUsers");
      } catch (error) {
        this.error = error.message || "Something went wrong !";
      }
    },
    deleteUser(userId) {
      try {
        this.$store.dispatch("admin/deleteUser", userId);
      } catch (error) {
        this.error =
          "You can't delete this post, try later or contact administrator.";
      }
    },
  },
  created() {
    this.loadUsers();
  },
}
</script>

<style scoped>
@media screen and (max-width: 769px) {
  #title {
    font-size: 1.5rem;
  }
}
</style>