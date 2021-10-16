<template>
  <nav class="navbar is-dark " role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <h1>
        <router-link to="/" class="navbar-item has-text-white"
          >Groupomania</router-link
        >
      </h1>
      <a
        id="burger"
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        @click="toogleBurger()"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div class="navbar-menu">
      <ul class="navbar-start pt-2 ml-6">
        <li>
          <router-link to="/profil" class="navbar-item"
            ><a>Mon profil</a></router-link
          >
        </li>
        <li>
          <router-link to="/forum" class="navbar-item"
            ><a>Forum</a></router-link
          >
        </li>
        <li v-if="this.admin == 1">
          <router-link to="/moderation" class="navbar-item"
            ><a>Modération</a></router-link
          >
        </li>
        <!-- <li v-else>
          <router-link to="/" class="navbar-item"
            ><a>Modération</a></router-link
          >
        </li> -->
      </ul>
    </div>
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <router-link
            to="/auth"
            class="button is-danger is-light"
            @click="logout"
            >Se déconnecter</router-link
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      admin: "",
    }
  },
  methods: {
    logout() {
      return this.$store.dispatch("auth/logout");
    },
    toogleBurger() {
      const currentId = document.getElementById("burger");
      currentId.classList.toggle('is-active');
      const currentClass = document.querySelector(".navbar-menu");
      currentClass.classList.toggle("is-active");
    },
  },
  mounted() {
    let user = this.$store.getters["auth/userData"]
    this.admin = JSON.parse(user)['moderation'];
    console.log(this.admin)
  }
};
</script>

<style scoped>
h1 {
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: 0.2rem;
}

li {
  font-size: 1.5rem;
}

a {
  color: #fff;
}

a:focus, a:focus-within, a:hover, a:active {
    background-color: rgb(231, 229, 229)!important;
    color: #363636!important;
  }

@media screen and (max-width: 1009px) {
  a {
    color: #fff; 
  }
  .navbar-menu {
    background-color: #363636 ;
  }
 
} 
</style>