<template>
  <section class="hero is-medium is-link">
    <div class="hero-body">
        <p class="title">
            Bienvenue {{ fullName }} !
        </p>
        <p class="subtitle">
            Vous êtes dans votre espace personnel. Ici, vous pourrez modifier vos informations.
        </p>
    </div>
</section>
</template>

<script>

export default {
    computed: {
       fullName() {
           const user = this.$store.state.account.users;
          return user[0].firstName.charAt(0).toUpperCase() + user[0].firstName.slice(1) + ' ' + user[0].lastName.charAt(0).toUpperCase() + user[0].lastName.slice(1);
       }
    }
    
}
</script>

<style>

</style>