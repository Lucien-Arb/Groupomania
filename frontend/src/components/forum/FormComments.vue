<template>
  <form class="media" @submit.prevent="sendCom(postId)">
    <div class="media-content">
      <div class="field">
        <p class="control">
          <textarea
            class="textarea"
            placeholder="Ajouter un commentaire..."
            v-model.trim="content"
          ></textarea>
        </p>
      </div>
      <div class="field">
        <p class="control">
          <button class="button groupomania-red-back has-text-white">Publier</button>
        </p>
      </div>
    </div>
  </form>
</template>

<script>
export default {
    props: [ 'postId' ],
  data() {
    return {
      content: "",
    }
  },
  methods : {
    sendCom(postId) {
    const id = JSON.parse(localStorage.getItem("user"))["userId"];

      const comData = JSON.stringify({
        userId: id,
        content: this.content,
        comId: this.comId
      });
        
      if (this.content === "" && this.userId === null) {
        this.formIsValid = false;
        return;
      } else {
        this.$store.dispatch("forum/sendCom", {
          id: postId,
          data: comData,
        });
      }
      this.content = "";
    }
  },
};
</script>

<style>
.background {
  background-color: #e2ebfb;
  border-radius: 8px;
}
</style>