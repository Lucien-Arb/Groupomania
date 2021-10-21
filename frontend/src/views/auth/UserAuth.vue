<template>
  <div class="background">
    <section class="section columns is-centered is-mobile">
      <div class=" card
        column
        is-half-desktop
        is-three-fifths-tablet
        is-10-mobile
        is-half-widescreen
        p-6">
        <h1>{{ submitButtonCaption }}</h1>
        <div class="columns has-text-centered mt-1">
          <p v-if="mode == 'login'" class="column">Vous n'avez pas de compte ?<br> <a @click="switchAuthMode()">Créer un compte</a></p>
          <p v-else class="column">Vous avez déjà un compte ?<br> <a @click="switchAuthMode()">Se connecter</a></p>
        </div>
         <h4 v-if="enterYourInfo == true" class="m-4 columns has-text-centered">
           <span class="has-text-info title is-5"> Entrez votre email et votre mot de passe.</span>
        </h4>
        <form action="" @submit.prevent="submitForm" class="pt-0">
          <div class="field" v-if="!wantToConnect">
            <label for="firstName" class="control">Firstname</label>
            <div class="control">
              <input
                type="text"
                id="firstName"
                class="input"
                placeholder="Arthur..."
                v-model.trim="firstName"
              />
            </div>
          </div>
          <div class="field" v-if="!wantToConnect">
            <label for="lastName" class="control">Lastname</label>
            <div class="control">
              <input
                type="text"
                id="lastName"
                class="input"
                placeholder="Durand..."
                v-model.trim="lastName"
              />
            </div>
          </div>
          <div class="field">
            <label for="email" class="control">Email</label>
            <div class="control">
              <input
                type="email"
                id="email"
                class="input"
                placeholder="jules@gmail.com..."
                v-model.trim="email"
              />
            </div>
          </div>
          <div class="field">
            <label for="password" class="control">Mot de passe</label>
            <div class="control">
              <input
                type="password"
                id="password"
                class="input"
                v-model.trim="password"
              />
            </div>
          </div>
          <div class="field is-grouped buttons is-centered is-justify-content-center">
            <h4 v-if="!formIsValid || mode == 'login' && status == 'error_login'  " class="m-4 content has-text-danger">
              Vérifiez les champs. Votre email doit contenir '@' et votre mot de
              passe doit être d'au moins 8 caractères.
            </h4>
            <button  class="button is-normal is-primary mt-4 pl-6 pr-6" to="/forum">
              <span v-if="status == 'loading' ">Connexion en cours...</span>
              <span v-else>{{ submitButtonCaption }}</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      formIsValid: true,
      mode: "login",
      wantToConnect: true,
      enterYourInfo: false,
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === "login") {
        return "Se connecter";
      } else {
        return "Créer un compte";
      }
    },
    ...mapState('auth', ['user', 'status']),
  },
  methods: {
    submitForm() {
      this.formIsValid = true;
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 8
      ) {
        this.formIsValid = false;
        return;
      }

      const signup = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
      };

      const login = {
        email: this.email,
        password: this.password,
      };

        if (this.mode === "login") {
          this.$store.dispatch("auth/login", login);
          this.$store.dispatch("auth/fetchAccessUser", login);
        } else {
          this.$store.dispatch("auth/signup", signup);
          this.mode = "login";
          this.wantToConnect = true;
          this.enterYourInfo = true;
          this.email = "";
          this.password = "";
        }
    },
    switchAuthMode() {
      if (this.mode === "login") {
        this.mode = "signup";
        this.wantToConnect = false;
      } else {
        this.mode = "login";
        this.wantToConnect = true;
      }
    },
    
  },
};
</script>

<style scoped>
label {
  font-size: 1.3rem;
  font-weight: 600;
}

h1 {
  font-size: 1.7rem;
  padding-top: 2rem;
  display: flex;
  justify-content: center;
}

form {
  padding: 2rem;
}

.background {
  background: url(../../assets/paris2.jpg) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  display: block;
  height: 100vh;
  padding: 60px;
  padding-left: 120px;
  box-sizing: border-box;
}
</style>