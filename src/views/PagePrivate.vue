<template lang="pug">
global-loading(v-if="isLoading")
router-view(v-else-if="isLoggedIn")
login-form(v-else)
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import firebase from '@/firebase';
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
        ...mapActions(['updateAuthState']),
    },
    created() {
        this._unsubscribe = firebase.auth().onAuthStateChanged(user => {
            this.updateAuthState(user);
        });
        firebase.auth().getRedirectResult();
    },
    beforeDestroy() {
        if (this._unsubscribe) {
            this._unsubscribe();
        }
    },
};
</script>
