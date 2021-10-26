<template>
  <li >
    <article class="media">
      <div class="media-content p-5 background">
        <div
          class="content columns is-mobile is-tablet is-desktop is-widescreen"
        >
          <p class="column is-10">
            {{ comContent }}
            <br />
          </p>
          <div class="column is-2">
            <div :id="comId" role="menu">
              <a @click="deleteCom(comId)">
                <span class="icon has-text-danger pl-3" id="dropdown"
                  ><i class="fas fa-trash pr-2"></i
                ></span>
              </a>
            </div>
          </div>
        </div>
        <p>{{ date }}</p>
      </div>
    </article>
  </li>
</template>

<script>
export default {
  props: ["comContent", "date", "comId"],
  data() {
    return {
      modifyMyCom: null,
      content: "",
    };
  },
  methods: {
    deleteCom(comId) {
      try {
        this.$store.dispatch("admin/deleteCom", comId);
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
@media screen and (max-width: 769px) {

  #dropdown .pl-3 {
   padding-right: 1rem!important;
   padding-left: 0rem!important
  }

}
</style>