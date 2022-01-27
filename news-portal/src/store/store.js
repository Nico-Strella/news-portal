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
        addNewsToHistory(state, payload) {
            state.newsHistoryList.push(payload);
        },
        setCurrentNewsList(state, payload) {
            state.currentNewsList = payload;
        },
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
        addNewsToHistory(state, payload) {
            state.commit('addNewsToHistory', payload)
        },
    },
    modules: {},
    getters: {
        getCurrentNewsList: state => state.currentNewsList,
        getCurrentNewsHistoryList: state => state.newsHistoryList,
    }
});