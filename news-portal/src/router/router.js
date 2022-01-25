import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '../views/HomePage';
import NewsDetail from '../views/NewsDetail';

Vue.use(VueRouter);

const routes = [
    {
        name: 'Home',
        path: '/',
        component: HomePage
    },
    {
        name: 'News Detail',
        path: '/News/:newsId',
        component: NewsDetail,
        props: true,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes
});

export default router;