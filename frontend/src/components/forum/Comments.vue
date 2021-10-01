<template>
    <div>
      <li >
        <article class="media">
          <div class="media-content">
            <div class="content background p-5 mb-5">
              <p>
                {{ comContent }}
                <br />
              </p>
              <p><strong> {{ date }} </strong></p>
            </div>
          </div>
        </article>
      </li>
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
              <button class="button is-success is-outlined">Publier</button>
            </p>
          </div>
        </div>
      </form>
    </div>
</template>

<script>
export default {
  props: [ 'postId','comContent', 'date', 'comId'],
  emits: [ 'loadMyComs' ],
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
      console.log(comData)
      console.log(postId)

      if (this.content === "" && this.userId === null) {
        this.formIsValid = false;
        return;
      } else {
        this.$store.dispatch("forum/sendCom", {
          id: postId,
          data: comData,
        });
      }
     // document.location.reload();
    }
    
    
  },
}
</script>

<style scoped>
.background {
  background-color: #e2ebfb;
  border-radius: 8px;
}
</style>