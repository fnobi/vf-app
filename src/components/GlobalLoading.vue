<template lang="pug">
.global-loading
    .loading loading...
</template>

<style lang="scss" scoped>
.global-loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>

<script>
export default {
    name: 'global-loading',
};
</script>
