<template lang="pug">
.page-my-page
    .title mypage
    .section
        | account: {{userEmail}}
    .section
        button(@click="logout") logout
    .section
        ref-text-form(:ref-path="privateMemoPath")
</template>

<style lang="scss" scoped>
.title,
.section {
    margin: 1em;
}

.title {
    font-weight: bold;
}
</style>

<script>
import { mapState } from 'vuex';
import firebase from '@/firebase';
import RefTextForm from '@/components/RefTextForm';

export default {
    name: 'page-my-page',
    components: {
        RefTextForm,
    },
    computed: {
        ...mapState(['userEmail', 'userUid']),
        privateMemoPath() {
            return `/privateMemo/${this.userUid}`;
        },
    },
    methods: {
        logout() {
            firebase.auth().signOut();
        },
    },
};
</script>
