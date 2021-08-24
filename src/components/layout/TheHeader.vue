<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <h1>
        <router-link to="/" class="navbar-item has-text-white"
          >Groupomania</router-link
        >
      </h1>
      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div class="navbar-menu">
      <ul class="navbar-start pt-2 ml-6">
        <li>
          <router-link to="/profil" class="navbar-item has-text-white"
            >Mon profil</router-link
          >
        </li>
        <li>
          <router-link to="/forum" class="navbar-item has-text-white"
            >Forum</router-link
          >
        </li>
        <li>
          <router-link to="/modération" class="navbar-item has-text-white"
            >Devenir modérateur</router-link
          >
        </li>
      </ul>
    </div>
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <router-link to="/auth" class="button is-danger is-light"
            >Se déconnecter</router-link
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {};
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
</style>