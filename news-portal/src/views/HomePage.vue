import NewsCard from '../components/NewsCard.vue';

<template>
  <v-app
    id='home'
    @input="updateNewsTitle"
  >
    <AppBar :title='title' />
    <v-main>
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
              :index='index + 1'
            />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'
import { SquareGrid } from 'vue-loading-spinner'
import NewsCard from '../components/NewsCard.vue'


export default {
  name: 'home',
  components: {
    NewsCard,
    SquareGrid,
  },
  data() {
    return {
      title: 'News Headlines',
      newsList: [],
      loading: false,
    };
  },
  async created() {
    if (this.newsList.length == 0) {
      this.loading = true
      try {
        axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=099148be22804e849a0c6fe022b7cf5e')
          .then(response => {
            this.newsList = response.data.articles;
            this.loading = false
          });
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
  },
};
</script>

<style>
  #home {
    background-image: linear-gradient(rgba(19,84,122,.5), rgba(128,208,199,.8)) !important;
  }
  .loader {
    margin-top: 200px
  }
</style>
