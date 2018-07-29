<template lang="pug">
.page-top
    .page-top__sub
        img.logo(src="@img/logo.png")
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

.logo {
    display: block;
    margin: auto;
}
.title {
    font-weight: bold;
    margin-bottom: 1em;
}
</style>

<script>
export default {
    name: 'page-top'
};
</script>
