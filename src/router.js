import Vue from 'vue';
import Router from 'vue-router';
import PageTop from '@/views/PageTop';
import PagePrivate from '@/views/PagePrivate';
import PageMyPage from '@/views/PageMyPage';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'top',
            component: PageTop,
        },
        {
            path: '/private-area',
            component: PagePrivate,
            children: [
                {
                    path: '/',
                    name: 'my-page',
                    component: PageMyPage,
                },
            ],
        },
    ],
});
