<template lang="pug">
.page-my-page
    .title mypage
    .section
        | account: {{userEmail}}
    .section
        button(@click="logout") logout
    .section
        .editor
            .editor__row
                p.editor__label title
                ref-string-form(:ref-path="`${privateMemoPath}/title`")
            .editor__row
                p.editor__label body
                ref-text-form(:ref-path="`${privateMemoPath}/body`")
</template>

<style lang="scss" scoped>
.title,
.section {
    margin: 1em;
}

.title {
    font-weight: bold;
}

.editor {
    border: solid 1px #eeeeee;
}
.editor__row {
    margin: 1em;
}
.editor__label {
    margin-bottom: 0.5em;
    font-weight: bold;
}
</style>

<script>
import { mapState } from 'vuex';
import firebase from '@/firebase';
import RefStringForm from '@/components/RefStringForm';
import RefTextForm from '@/components/RefTextForm';

export default {
    name: 'page-my-page',
    components: {
        RefStringForm,
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
