<template>
  <div class="background">
    <section class="section columns is-centered">
      <div class="card column is-half-desktop is-two-thirds-tablet is-five-quarter-mobile is-one-third-widescreen">
        <h1>{{ submitButtonCaption }}</h1>
        <p v-if="mode == 'login'">Vous n'avez pas de compte ? <a @click="switchAuthMode()">Créer un compte</a></p>
        <p v-else>Vous avez déjà un compte ? <a @click="switchAuthMode()">Se connecter</a></p>
        <form action="" @submit.prevent="submitForm">
          <div class="field" v-if="!wantToConnect">
            <label for="firstName" class="control">Firstname</label>
            <div class="control">
              <input
                type="text"
                id="firstName"
                class="input"
                placeholder="Tchoppi..."
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
                placeholder="Sampedro..."
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
                placeholder="sampedro.tchoppi@gmail.com..."
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
                placeholder="Minimum 8 caractères"
                v-model.trim="password"
              />
            </div>
          </div>
          <div class="field is-grouped buttons is-centered">
            <p v-if="!formIsValid" class="m-4">
              Vérifiez les champs. Votre email doit contenir '@' et votre mot de
              passe doit être d'au moins 8 caractères.
            </p>
            <button  class="button is-normal is-primary column is-centered">
              <span >{{ submitButtonCaption }}</span>
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
    ...mapState(['user'])
  },
  methods: {
    
    async submitForm() {
      this.formIsValid = true;
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 8
      ) {
        this.formIsValid = false;
        return;
      }

      const actionPayloadSignup = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
      };

      const actionPayloadLogin = {
        email: this.email,
        password: this.password,
      };

      try {
        if (this.mode === "login") {
          await this.$store.dispatch("login", actionPayloadLogin);
        } else {
          await this.$store.dispatch("signup", actionPayloadSignup);
        }
        this.$router.replace("/profil");
      } catch (err) {
        this.error =
          err.message ||
          `Nous n'avons pas pu vous authentifier, esssayez à nouveau.`;
      }

      this.isLoading = false;
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
    handleError() {
      this.error = null;
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