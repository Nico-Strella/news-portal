import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentNewsList: [],
        newsHistoryList: [],
        isLoading: false,
    },
    mutations: {
        setCurrentNewsList(state, payload) {
            state.currentNewsList = payload;
        },
        addNewsToHistory(state, visitedNews) {
            if (state.newsHistoryList.filter(news => news.url == visitedNews.url).length == 0) {
                state.newsHistoryList.push(visitedNews);
            }
        },
        editNewsTitle(state, news, index) {
            state.currentNewsList[index] = news;
        },
        setIsLoading(state, value) {
            state.isLoading = value;
        }
    },
    actions: {
        async setCurrentNewsList(state) {
            try {
                state.commit('setIsLoading', true);

                await axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=d345cde6dcbd44a2a10adeab1070e2ae')
                    .then(response => {
                        state.commit('setCurrentNewsList', response.data.articles)
                        state.commit('setIsLoading', false);
                    });
            } catch (error) {
                state.commit('setIsLoading', false);
                console.log(error)
            }
        },
        addNewsToHistory(state, visitedNews) {
            state.commit('addNewsToHistory', visitedNews)
        },
        editNewsTitle(state, news, index) {
            state.commit('editNewsTitle', news, index);
        },
        async searchNews(state, query) {
            try {
                if (query == '' || query == null) {
                    state.commit('setCurrentNewsList', []);
                    state.dispatch('setCurrentNewsList');
                } else {
                    state.commit('setIsLoading', true);
                    state.commit('setCurrentNewsList', []);
                    await axios.get(`https://newsapi.org/v2/top-headlines?q=${query}&apiKey=d345cde6dcbd44a2a10adeab1070e2ae`)
                        .then(response => {
                            state.commit('setCurrentNewsList', response.data.articles)
                            state.commit('setIsLoading', false);
                        });
                }
            } catch (error) {
                state.commit('setIsLoading', false);
                console.log(error)
            }
        },
        setIsLoading(state, value) {
            state.commit('setIsLoading', value);
        }
    },
    modules: {},
    getters: {
        getCurrentNewsList: state => state.currentNewsList,
        getCurrentNewsHistoryList: state => state.newsHistoryList,
        getIsLoading: state => state.isLoading,
    }
});