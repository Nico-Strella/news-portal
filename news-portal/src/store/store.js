import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentNewsList: [],
        newsHistoryList: [],
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
        }
    },
    actions: {
        async setCurrentNewsList(state) {
            try {
                await axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=099148be22804e849a0c6fe022b7cf5e')
                    .then(response => {
                        state.commit('setCurrentNewsList', response.data.articles)
                    });
            } catch (error) {
                console.log(error)
            }
        },
        addNewsToHistory(state, visitedNews) {
            state.commit('addNewsToHistory', visitedNews)
        },
        editNewsTitle(state, news, index) {
            if (news.title.length <= 140) {
                state.commit('editNewsTitle', news, index);
            }
        }
    },
    modules: {},
    getters: {
        getCurrentNewsList: state => state.currentNewsList,
        getCurrentNewsHistoryList: state => state.newsHistoryList,
    }
});