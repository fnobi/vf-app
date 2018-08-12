<template lang="pug">
multi-block(:ref-path="refPath")
    ref-string-form(
        slot-scope="item"
        :ref-path="`${refPath}/${item.uid}`"
    )
</template>

<script>
import MultiBlock from '@/components/MultiBlock';
import RefStringForm from '@/components/RefStringForm';

export default {
    name: 'ref-string-array-form',
    components: {
        MultiBlock,
        RefStringForm,
    },
    props: {
        refPath: {
            type: String,
            required: true,
        },
    },
};
</script>
