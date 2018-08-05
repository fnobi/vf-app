<template lang="pug">
router-view(v-if="isLoggedIn")
LoginForm(v-else)
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import { mapGetters, mapActions } from 'vuex';

import LoginForm from '@/components/LoginForm';

export default {
    name: 'page-private',
    components: {
        LoginForm,
    },
    computed: {
        ...mapGetters(['isLoggedIn']),
    },
    methods: {
        ...mapActions(['handleUserLogin']),
    },
    mounted() {
        firebase.auth().onAuthStateChanged(user => {
            console.log('on auth state changed');
            this.handleUserLogin(user);
        });
        firebase.auth().getRedirectResult();
    },
    beforeDestroy() {
        firebase.auth().onAuthStateChanged(user => {
            console.log('dummy listener');
        });
    },
};
</script>
