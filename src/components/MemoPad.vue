<template lang="pug">
form.memo-pad(@submit.prevent="submit")
    textarea.memo-pad__text(v-model="editing")
    p.memo-pad__button
        button ok
</template>

<style lang="scss" scoped>
.memo-pad {
    display: flex;
    height: 400px;
    flex-direction: column;
}

.memo-pad__text {
    height: 100%;
    flex-shrink: 1;
}

.memo-pad__button {
    margin-top: 1em;
    text-align: right;
}
</style>

<script>
export default {
    name: 'memo-pad',
    data: () => ({
        editing: null,
    }),
    methods: {
        submit() {},
    },
};
</script>
