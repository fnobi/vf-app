<template lang="pug">
.page-my-page
    .title mypage
    .section
        | account: {{userEmail}}
    .section
        button(@click="logout") logout
    .section
        | memo:
        memo-pad(:path="privateMemoPath")
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
import MemoPad from '@/components/MemoPad';

export default {
    name: 'page-my-page',
    components: {
        MemoPad,
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
