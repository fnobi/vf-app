<template lang="pug">
.page-top
    .page-top__sub
        VueLogo
    .page-top__main
        h1.title vf-app
        p top
        p counter: {{count}}
</template>

<style lang="scss" scoped>
@import '@scss/common.scss';
.page-top {
    text-align: center;
    @include pc-layout {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

.title {
    font-weight: bold;
    margin-bottom: 1em;
}
</style>

<script>
import firebase from 'firebase/app';
import 'firebase/database';

import VueLogo from '@/components/VueLogo';

export default {
    name: 'page-top',
    data: () => ({
        count: 0
    }),
    components: {
        VueLogo
    },
    mounted() {
        // TODO: subscriberいれる
        const ref = firebase.database().ref('sandbox/count');
        ref.on('value', snapshot => {
            this.count = snapshot.val();
        });
        ref.transaction(count => {
            return count + 1;
        });
    }
};
</script>
