<template lang="pug">
.page-top
    .page-top__sub
        VueLogo
    .page-top__main
        h1.title vf-app
        p top
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

export default {
    name: 'page-top',
    components: {
        VueLogo
    }
};
</script>
