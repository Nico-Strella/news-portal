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

      <v-col
        v-for="(news, index) in newsHistoryList"
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
</template>

<script>
import NewsCard from './NewsCard.vue'

export default {
  components: {
    NewsCard,
  },
  data() {
    return {
      newsHistoryList: []
    }
  },
  mounted() {
    this.newsHistoryList = this.$store.getters.getCurrentNewsHistoryList;
  }
};
</script>