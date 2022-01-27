<template>
  <v-container>
    <v-row>
      <v-col>

      </v-col>
    </v-row>
    <v-row
      justify="center"
      align="center"
    >
      <div
        v-if='loading'
        class='loader'
      >
        <square-grid
          background='#E3F2FD'
          size='100px'
        />
      </div>
      <v-col
        v-for="(news, index) in newsList"
        :key='index'
        cols='12'
        xs='12'
        sm='6'
        md='4'
        lg='3'
      >
        <NewsCard
          :news='news'
          :index='index'
          :isEditable=true
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { SquareGrid } from 'vue-loading-spinner'
import NewsCard from './NewsCard.vue'

export default {
  components: {
    NewsCard,
    SquareGrid,
  },
  data() {
    return {
      newsList: [],
      loading: false,
    };
  },
  async created() {
    if (this.newsList.length == 0) {
      this.loading = true
      try {
        // this is at purpose. I want to refresh the list everytime I go to this section of the website
        await this.$store.dispatch('setCurrentNewsList');
        this.newsList = this.$store.getters.getCurrentNewsList;
        this.loading = false
      } catch (error) {
        console.log(error)
        this.loading = false
      }
    }
  },
  methods: {
    updateNewsTitle(editedNews) {
      if (editedNews.length <= 140) {
        this.cards[editedNews.index].title = editedNews.modifiedNews.title;
      }
    },
  }
};
</script>

<style>
  .loader {
    margin-top: 200px
  }
</style>