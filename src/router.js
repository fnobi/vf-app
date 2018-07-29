import Vue from 'vue';
import Router from 'vue-router';
import PageTop from '@/views/PageTop';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'top',
            component: PageTop
        }
    ]
});
