import NewsCard from '../components/NewsCard.vue';

<template>
  <v-app id='news-detail'>
    <AppBar :title='title' />
    <v-main>
      <v-container>
        <h1 class='title'>{{ news.title }}</h1>
        <br />
        <p> {{ news.description }} </p>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'news-detail',
  data() {
    return {
      title: 'News Detail',
      news: {}
    };
  },
  mounted() {
    console.log(this.$route.query.news);
    this.news = JSON.parse(this.$route.query.news);
  }
};
</script>

<style scoped>
  .title {
     text-overflow: ellipsis;
  }
</style>
