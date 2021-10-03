<template>
  <li>
    <article class="media column">
      <div class="media-content p-5 background">
        <div
          class="content columns is-mobile is-tablet is-desktop is-widescreen"
        >
          <div class="field column is-10" v-if="modifyMyCom === comId">
           <form action="put" @submit.prevent="submitForm(comId)">
              <p class="control">
                <textarea
                  class="textarea"
                  placeholder="Ajouter un commentaire..."
                  v-model.trim="content"
                ></textarea>
              </p>
              <div class="field ">
                <p class="control">
                  <button class="button is-success is-outlined">Publier</button>
                </p>
              </div>
            </form>
          </div>
          <p class="column is-10" v-else>
            {{ comContent }}
            <br />
          </p>
          <div class="column is-2">
            <div
              class="dropdown"
              @click="activeIt(comId)"
              :id="comId"
              :ref="'element' + comId"
            >
              <div class="dropdown-trigger has-text-info">
                <button
                  class="button three-dots"
                  aria-haspopup="true"
                  :aria-controls="comId"
                >
                  <span class="icon is-small"
                    ><i class="fas fa-ellipsis-v" aria-hidden="true"></i
                  ></span>
                </button>
              </div>
              <div class="dropdown-menu" :id="comId" role="menu">
                <div class="dropdown-content">
                  <a
                    class="dropdown-item"
                    @click="isClicked(comContent, comId)"
                  >
                    <span class="icon has-text-info pl-6">
                      <i class="fas fa-edit pr-2 pl-2"></i> Modifier</span
                    >
                  </a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" @click="deleteCom(comId)">
                    <span class="icon has-text-danger pl-6"
                      ><i class="fas fa-trash pr-2"></i> Delete</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p> {{ date }} </p>
      </div>
    </article>
  </li>
</template>

<script>
export default {
  props: ["postId", "comContent", "date", "comId"],
  data() {
    return {
      modifyMyCom: null,
      content: ""
    }
  },
  methods: {
    activeIt(comId) {
      // const superId = "element" + postId;
      // const number = this.$refs[superId];

      const currentNum = document.getElementById(comId);
      console.log(comId);
      if (currentNum.className === "dropdown") {
        return currentNum.classList.add("is-active");
      } else {
        return currentNum.classList.remove("is-active");
      }
    },
    isClicked(comContent, postId) {
      this.content = comContent;

      if (!this.modifyMyCom) {
        return (this.modifyMyCom += postId);
      } else return (this.modifyMyCom = null);
    },
    submitForm(comId) {
      const comData = JSON.stringify({
        content: this.content
      });

      if (this.content === "") {
        this.formIsValid = false;
        return;
      } else {
        this.$store.dispatch("forum/modifyCom", {
          id: comId,
          data: comData,
        });
      }
      document.location.reload();
    },
    deleteCom(comId) {
      try {
        this.$store.dispatch("forum/deleteCom", comId);
        document.location.reload();
      } catch (error) {
        this.error =
          "You can't delete this com, try later or contact administrator.";
      }
    },
  },
};
</script>

<style scoped>
.background {
  background-color: #e2ebfb;
  border-radius: 8px;
}
.three-dots {
  border: none;
  background-color: transparent;
  transform: rotate(90deg);
}

.three-dots:hover {
  border-radius: 50px;
  background-color: #f8fbff;
}

.three-dots:focus,
.three-dots:active,
.three-dots:focus:not(:active){
  border: none;
  border-style: none;
  box-shadow: none;
}

@media screen and (max-width: 768px) {
  .media-content {
    overflow-x: initial;
  }
}
</style>