<template lang="pug">
.page-my-page
    p mypage
    p account: {{userEmail}}
    p
        button(@click="logout") logout
</template>

<style lang="scss" scoped>
</style>

<script>
import { mapState } from 'vuex';
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
    name: 'page-my-page',
    computed: {
        ...mapState(['userEmail']),
    },
    methods: {
        logout() {
            firebase.auth().signOut();
        },
    },
};
</script>
