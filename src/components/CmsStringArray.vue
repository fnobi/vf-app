<template lang="pug">
multi-block(:ref-path="refPath")
    cms-string(
        slot-scope="item"
        :ref-path="`${refPath}/${item.uid}`"
    )
</template>

<script>
import MultiBlock from '@/components/MultiBlock';
import CmsString from '@/components/CmsString';

export default {
    name: 'cms-string-array',
    components: {
        MultiBlock,
        CmsString,
    },
    props: {
        refPath: {
            type: String,
            required: true,
        },
    },
};
</script>
