<template>
  <div>
    <the-header></the-header>
    <router-view></router-view>
  </div>

</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';
import { mapActions } from 'vuex';


export default {

  components: {
    TheHeader,
    },
    methods: {
      ...mapActions('auth', ['fetchAccessUser']),
    },
    created() {
      this.fetchAccessUser();
    }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

html, body {
  font-family: "Roboto", sans-serif;
    margin: 0;
    height:100%;
    width:100%;
    padding:0;
}

#app {
  background-color: #f3f1f1;
}

h1 {
  font-size: 1.7rem;
}
</style>