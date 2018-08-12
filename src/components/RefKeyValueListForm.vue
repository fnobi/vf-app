<template lang="pug">
multi-block(:ref-path="refPath")
    template(slot-scope="item")
        .cell
            ref-string-form(:ref-path="`${refPath}/${item.uid}/key`")
        .cell
            ref-text-form(:ref-path="`${refPath}/${item.uid}/value`")
</template>

<style lang="scss" scoped>
@import '@scss/common.scss';
.cell {
    margin-bottom: 0.5em;
    &:last-child {
        margin-bottom: 0;
    }
}
</style>

<script>
import MultiBlock from '@/components/MultiBlock';
import RefStringForm from '@/components/RefStringForm';
import RefTextForm from '@/components/RefTextForm';

export default {
    name: 'ref-key-value-list-form',
    components: {
        MultiBlock,
        RefStringForm,
        RefTextForm,
    },
    props: {
        refPath: {
            type: String,
            required: true,
        },
    },
};
</script>
