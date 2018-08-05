<template lang="pug">
GlobalLoading(v-if="isLoading")
router-view(v-else-if="isLoggedIn")
LoginForm(v-else)
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import { mapGetters, mapActions } from 'vuex';

import GlobalLoading from '@/components/GlobalLoading';
import LoginForm from '@/components/LoginForm';

export default {
    name: 'page-private',
    components: {
        GlobalLoading,
        LoginForm,
    },
    computed: {
        ...mapGetters(['isLoading', 'isLoggedIn']),
    },
    methods: {
        ...mapActions(['handleUserLogin']),
    },
    mounted() {
        firebase.auth().onAuthStateChanged(user => {
            this.handleUserLogin(user);
        });
        firebase.auth().getRedirectResult();
    },
    beforeDestroy() {
        firebase.auth().onAuthStateChanged(user => {
            /* dummy listener */
        });
    },
};
</script>
