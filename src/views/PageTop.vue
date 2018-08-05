<template lang="pug">
.page-top
    .page-top__sub
        vue-logo
    .page-top__main
        h1.title vf-app
        p(@click="countUp") counter: {{count}}
        p
            router-link(:to="{ name: 'my-page' }") my page
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
import VueLogo from '@/components/VueLogo';
import firebaseSubscriber from '@/mixin/firebaseSubscriber';

const COUNTER_REF = 'sandbox/count';

export default {
    name: 'page-top',
    components: {
        VueLogo,
    },
    mixins: [firebaseSubscriber],
    data: () => ({
        count: 0,
    }),
    computed: {
        firebaseSubscription() {
            return {
                [COUNTER_REF]: snapshot => this.setCounter(snapshot.val()),
            };
        },
    },
    methods: {
        setCounter(num) {
            this.count = num;
        },
        countUp() {
            this.firebaseRef(COUNTER_REF).transaction(count => {
                return (count || 0) + 1;
            });
        },
    },
    mounted() {
        this.countUp();
    },
};
</script>
