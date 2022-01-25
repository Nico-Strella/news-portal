import NewsCard from '../components/NewsCard.vue';

<template>
  <v-app id='news-detail'>
    <AppBar :title='title' />
    <v-main>
      <v-container>
        <h1 class='title'>News {{ $route.params.id }}</h1>
        <br />
        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque voluptates veritatis alias reiciendis, illum, iste quae velit ab numquam aliquam optio, labore perspiciatis. Nisi iste, facere dolores accusantium eum vel! </p>
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
    };
  },
};
</script>

<style scoped>
  .title {
     text-overflow: ellipsis;
  }
</style>
