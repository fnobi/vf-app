import Vue from 'vue';
import firebase from 'firebase/app';
import 'firebase/database';

import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

// TODO: configファイル切る
firebase.initializeApp({
    apiKey: 'AIzaSyDdmkEzlUu9CS1mNccWDeCgsfnvuJ2wl80',
    authDomain: 'vf-app-cf2ac.firebaseapp.com',
    databaseURL: 'https://vf-app-cf2ac.firebaseio.com',
    projectId: 'vf-app-cf2ac',
    storageBucket: 'vf-app-cf2ac.appspot.com',
    messagingSenderId: '135643545064'
});

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
