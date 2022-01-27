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
          gradient='to top right, rgba(128,208,199,.8), rgba(19,84,122,1)'
        ></v-img>
      </template>

      <v-app-bar-title>
        <div>{{ title }}</div>
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <v-text-field
        @focus='isSearchClosed = false'
        @blur='isSearchClosed = true'
        @input='debounceSearch'
        @keyup.enter="debounceSearch"
        v-model='searchQuery'
        placeholder="Search"
        prepend-inner-icon="mdi-magnify"
        class='expanding-search'
        :class="{'closed' : isSearchClosed && !searchQuery}"
        filled
        dense
        clearable
      ></v-text-field>

      <template v-slot:extension>
        <v-tabs
          align-with-title
          color='indigo darken-1'
        >
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
      isSearchClosed: true,
      searchQuery: null,
      counterApiRequest: 0,
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
    debounceSearch() {
      if (this.counterApiRequest == 0) {        
        clearTimeout(this.debounce)
        this.debounce = setTimeout(async () =>  {
          this.counterApiRequest++
          await this.$store.dispatch('searchNews', this.searchQuery)
          this.counterApiRequest--
        }, 1000);
      }
    }
  },
};
</script>

<style lang='sass'>
  #home
    background-image: linear-gradient(rgba(19,84,122,.5), rgba(128,208,199,.8)) !important

  .v-input.expanding-search
    transition: max-width 0.4s
    .v-input__slot
      background: transparent
      cursor: pointer !important
      &:before, &:after
        border-color: transparent !important
        color: transparent !important
    &.closed
      max-width: 45px
      .v-input__slot
        background: transparent !important
  .v-text-field__slot
    input
      background-color: rgba(0,0,0,0)
    
      

    
</style>
