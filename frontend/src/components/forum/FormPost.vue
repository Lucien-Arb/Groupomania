<template>
  <section class="section columns is-centered is-mobile">
    <div
      class="
        card
        column
        is-half-desktop
        is-three-fifths-tablet
        is-10-mobile
        is-half-widescreen
        p-6
      "
      id="mobile-padding"
    >
      <h2 class="pb-4 has-text-centered title is-1" id="mobile-title">Exprimez-vous</h2>
      <form action="" @submit.prevent="submitForm">
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
         <div class="field ">
            <!-- <p v-if="!formIsValid" class="m-4">
              Vérifiez les champs. Votre email doit contenir '@' et votre mot de
              passe doit être d'au moins 8 caractères.
            </p> -->
            <button  class="button is-normal py-3 px-6
             groupomania-red-back has-text-white is-centered">
              <span class="content-heading-weight">Envoyer</span>
            </button>
            <!-- <p > Erreur !</p> -->
          </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      content: "",
      formIsValid: true,
    }
  },
  methods: {
    loadUserInfos() {
      try {
        this.$store.dispatch("account/getMyInfos");
      } catch (error) {
        this.error = error.message || "Something went wrong !";
      }
    },
    submitForm() {
      let userId = this.$store.getters["auth/userData"];
      const id = JSON.parse(userId)['userId'];

      let user = this.$store.getters["account/userData"];
      const firstName = (user)[0]['firstName'];
      const lastName = (user)[0]['lastName'];

      const postData = JSON.stringify({
        userId: id,
        title: this.title,
        content: this.content,
        firstName: firstName,
        lastName: lastName,
        likes: 0,
      })
      console.log(postData);

      if (this.title === "" && this.content === "" && this.userId === null) {
        this.formIsValid = false;
        return;
      } else {
        this.$store.dispatch("forum/sendPost", postData);
        this.title = "";
        this.content = "";
      }

    }
  },
  mounted() {
    this.loadUserInfos();
    // let userId = this.$store.getters["auth/userData"];
    // let user = this.$store.getters["account/userData"];
    //  const firstName = (user)[0]['firstName']
    // console.log(userId, user, firstName)
  }

};
</script>

<style scoped>
@media screen and (max-width: 769px) {
  #mobile-padding {
    padding: 1.7rem!important;
  }

  #mobile-title {
    font-size: 2rem;
  }
}
</style>