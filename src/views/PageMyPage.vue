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
                p.editor__label 名前
                cms-string(:ref-path="`${userProfilePath}/name`")
            .editor__row
                p.editor__label 自己紹介
                cms-text(:ref-path="`${userProfilePath}/body`")
            .editor__row
                p.editor__label タグ
                cms-string-array(:ref-path="`${userProfilePath}/tag`")
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
import CmsStringArray from '@/components/CmsStringArray';
import CmsText from '@/components/CmsText';

export default {
    name: 'page-my-page',
    components: {
        CmsString,
        CmsStringArray,
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
