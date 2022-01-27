<template>
  <v-hover v-slot="{ hover }">
    <v-card
      @click='redirectToNewsSourceWebsite'
      :elevation="hover ? 16 : 2"
      :class='{"on-hover": hover}'
      class='mx-auto news-card'
      max-width="344"
      gradient='to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)'
      height='400px'
    >
      <v-img
        :src="newsData.urlToImage"
        height="200px"
      ></v-img>

      <v-card-title
        v-if='edit'
        v-on:click.stop
        class='title-container pa-2 d-flex flex-column'
      >
        <v-textarea
          outlined
          :no-resize=true
          counter='140'
          autofocus
          height='110'
          class='text-area'
          :rules='rules'
          :value='newsData.title'
          :v-model='newsData.title'
          @blur='newsData.title = $event.target.value; edit = false; $store.dispatch("editNewsTitle", newsData, index);'
          @keyup.enter='newsData.title = $event.target.value; edit = false; $store.dispatch("editNewsTitle", newsData, index);'
          @focus='thisvalue = ""'
        ></v-textarea>
      </v-card-title>

      <v-card-title
        elevation='10'
        v-else
        :v-text='newsData.title'
        class='title-container pa-2 d-flex flex-column'
      >
        <div class='title'>
          {{newsData.title}}
        </div>
      </v-card-title>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          fab
          dark
          small
          color="orange lighten-2"
          v-on:click.stop
          @click='editTitle'
        >
          <v-icon dark>
            mdi-pencil
          </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: {
    news: Object,
    index: Number,
    isEditable: Boolean
  },
  data() {
    return {
      edit: false,
      newsData: this.news,
      rules: [v => v.length <= 140 || 'Max 140 characters'],
    }
  },
  created() {
    this.window = window;
  },
  methods: {
    editTitle() {
      this.edit = true;
    },
    redirectToNewsSourceWebsite() {
      this.$store.dispatch('addNewsToHistory', this.news);
      window.open(this.news.url);
    }
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus()
      }
    }
  }
};
</script>

<style>
  input {
    color:white;
    background-color: rgb(0,0,0,0.5);
    width: 100%
  }
  .news-card {
    transition: opacity .2s ease-in-out;
  }
  .news-card:not(.on-hover) {
    opacity: 0.8;
  }
  .title-container {
    height: 140px !important;
    white-space: normal;
    word-break: normal;
    overflow: hidden ;
  }
  .text-area{
    width: 100%;
  }
  textarea{
    -ms-overflow-style: none !important;  /* IE and Edge */
    scrollbar-width: none !important;  /* Firefox */
  }
  textarea::-webkit-scrollbar {
    display: none;
  }
  .title {
    overflow: hidden ;
  }
  .action-button-container {
    height: 100%;
  }
</style>