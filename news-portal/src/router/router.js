import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '../views/HomePage';

Vue.use(VueRouter);

const routes = [
    {
        name: 'Home',
        path: '/',
        component: HomePage
    },
];

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes
});

export default router;