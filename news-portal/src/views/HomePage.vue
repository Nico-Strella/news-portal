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
        <v-row>
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
              v-bind:news='news'
              :index='index + 1'
            />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NewsCard from '../components/NewsCard.vue';
import axios from 'axios'

export default {
  name: 'home',
  components: {
    NewsCard,
  },
  data() {
    return {
      title: 'News Headlines',
      newsList: []
    };
  },
  mounted() {
    if (this.newsList.length == 0) {
      this.getNews();
    }
  },
  methods: {
    updateNewsTitle(editedNews) {
      console.log(editedNews);
      this.cards[editedNews.index].title = editedNews.modifiedNews.title;
    },
    getNews() {
      axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=099148be22804e849a0c6fe022b7cf5e')
        .then(response => {
          this.newsList = response.data.articles;
          console.log(response);
        });
    }
  },
};
</script>

<style>
  #home {
    background-image: linear-gradient(rgba(128,208,199,.8), rgba(19,84,122,.5)) !important;
  }
</style>
