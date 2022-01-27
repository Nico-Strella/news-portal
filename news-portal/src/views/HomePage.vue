<template>
  <v-app id='home'>
    <v-app-bar
      app
      color='rgba(19,84,122,1)'
      dark
      shrink-on-scroll
      prominent
      src='../assets/banner.jpg'
      fade-img-on-scroll
    >
      <template v-slot:img='{ props }'>
        <v-img
          v-bind='props'
          gradient='to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)'
        ></v-img>
      </template>

      <v-app-bar-title>
        <div>{{ title }}</div>
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab @click='() => setActiveTab("Headlines")'>Headlines</v-tab>
          <v-tab @click='() => setActiveTab("History")'>History</v-tab>
        </v-tabs>
      </template>

    </v-app-bar>
    <v-main>
      <NewsList v-if='isHeadlinesTabActived' />
      <NewsHistory v-if='isHistoryTabActived' />
    </v-main>
  </v-app>
</template>

<script>
import NewsList from '../components/NewsList.vue'
import NewsHistory from '../components/NewsHistory.vue'

export default {
  name: 'home',
  components: {
    NewsList,
    NewsHistory
  },
  data() {
    return {
      title: 'News',
      isHeadlinesTabActived: true,
      isHistoryTabActived: false,
    };
  },

  methods: {
    setActiveTab(title) {
      if (title === 'Headlines') {
        this.isHeadlinesTabActived = true;
        this.isHistoryTabActived = false;
      } else if (title === 'History') {
        this.isHeadlinesTabActived = false;
        this.isHistoryTabActived = true;
      }
    },
  },
};
</script>

<style>
  #home {
    background-image: linear-gradient(rgba(19,84,122,.5), rgba(128,208,199,.8)) !important;
  }
  
</style>
