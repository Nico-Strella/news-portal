<template>
  <v-hover v-slot="{ hover }">

    <v-card
      @click='redirectToNewsDetailPage'
      :elevation="hover ? 16 : 2"
      :class='{"on-hover": hover}'
      class='mx-auto'
      max-width="344"
      gradient='to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)'
      height='400px'
    >
      <v-img
        :src="newsData.urlToImage"
        height="200px"
      ></v-img>

      <v-row>
        <v-col>
          <v-row>
            <v-col>
              <v-card-title
                v-if='edit'
                v-on:click.stop
                class='title-container'
              >
                <input
                  type='text'
                  :value='newsData.title'
                  :v-model='newsData.title'
                  @blur='newsData.title = $event.target.value; edit = false; $emit("input", {modifiedNews: newsData, index: index});'
                  @keyup.enter='newsData.title = $event.target.value; edit = false; $emit("input", {modifiedNews: newsData, index: index});'
                  v-focus=''
                >
              </v-card-title>

              <v-card-title
                elevation='10'
                v-else
                :v-text='newsData.title'
                class='title-container'
              >
                <div class='title'>
                  {{newsData.title}}
                </div>
              </v-card-title>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-card-actions class='action-button-container'>
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
            </v-col>
          </v-row>
        </v-col>
      </v-row>

    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: {
    news: Object,
    index: Number
  },
  data() {
    return {
      edit: false,
      newsData: this.news
    }
  },
  methods: {
    redirectToNewsDetailPage() {
      this.$router.push({ name: 'News Detail', params: { newsId: this.index } });
    },
    editTitle() {
      this.edit = true;
    }
  },
  watch: {
    value: function () {
      this.newsTitle = this.news.title;
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

<style scoped>
  input {
    color:white;
    background-color: rgb(0,0,0,0.5);
    width: 100%
  }
  .v-card {
    transition: opacity .2s ease-in-out;
  }
  .v-card:not(.on-hover) {
    opacity: 0.8;
  }
  .content-container {
    max-height: 200px;
  }
  .title-container {
    max-height: 119px !important;
    white-space: normal;
    word-break: normal;
    overflow: hidden ;
  }
  .title {
    overflow: hidden ;
  }
  .action-button-container {
    max-height: 100px !important;
  }
</style>