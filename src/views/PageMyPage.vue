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
                cms-string(:ref-path="`${userProfilePath}/title`")
            .editor__row
                p.editor__label body
                cms-text(:ref-path="`${userProfilePath}/body`")
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
import CmsString from '@/components/CmsString';
import CmsText from '@/components/CmsText';

export default {
    name: 'page-my-page',
    components: {
        CmsString,
        CmsText,
    },
    computed: {
        ...mapState(['userEmail', 'userUid']),
        userProfilePath() {
            return `/userProfile/${this.userUid}`;
        },
    },
    methods: {
        logout() {
            firebase.auth().signOut();
        },
    },
};
</script>
