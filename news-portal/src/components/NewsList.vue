<template>
  <v-container>
    <v-row justify='end'>
      <v-col
        v-if='!loading'
        cols="1"
      >
        <v-dialog
          v-model="dialog"
          scrollable
          max-width="300px"
          class='opacity'
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="indigo darken-1"
              dark
              v-bind="attrs"
              v-on="on"
            >
              Filter
            </v-btn>
          </template>
          <v-card>
            <v-card-title>Select News Source</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 300px;">
              <v-checkbox
                v-model="filter"
                v-for="(newsSource, index) in sourcesList"
                :key='index'
                :label="newsSource.name"
                :value="newsSource.name"
              ></v-checkbox>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn
                color="blue darken-1"
                text
                @click="dialog = false"
              >
                Close
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="applyFilter"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
import axios from 'axios'
import { SquareGrid } from 'vue-loading-spinner'
import NewsCard from './NewsCard.vue'
import filterNewsSource from '../utilities/filter';

export default {
  components: {
    NewsCard,
    SquareGrid,
  },
  data() {
    return {
      loading: false,
      sourcesList: [],
      hasError: false,
      dialog: false,
      filter: [],
      newsList: []
    };
  },
  async created() {
    this.fetchNews();
  },
  mounted() {
    this.loading = this.$store.state.isLoading
  },
  watch: {
    '$store.state.currentNewsList'() {
      this.newsList = this.$store.state.currentNewsList;
    },
    '$store.state.isLoading'() {
      this.loading = this.$store.state.isLoading;
    }
  },
  methods: {
    applyFilter() {
      this.$store.dispatch('filterNews', this.filter);
      this.newsList = this.filter.length > 0 ? filterNewsSource(this.$store.getters.getCurrentNewsList, this.filter) : this.fetchNews();
      this.dialog = false;
    },
    async fetchNews() {
      try {
        // this is at purpose. I want to refresh the list everytime I go to this section of the website
        await this.$store.dispatch('setCurrentNewsList');
        this.newsList = this.$store.getters.getCurrentNewsList;
      } catch (error) {
        console.log(error)
      }

      try {
        await axios.get('https://newsapi.org/v2/sources?apiKey=d345cde6dcbd44a2a10adeab1070e2ae')
          .then(response => {
            this.sourcesList = response.data.sources;
          });
      } catch (error) {
        console.log(error)
        this.hasError = true;
      }
    }
  }
};
</script>

<style>
  .loader {
    margin-top: 200px
  }
</style>