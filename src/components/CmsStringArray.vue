<template lang="pug">
cms-array(:ref-path="refPath")
    cms-string(
        slot-scope="item"
        :ref-path="`${refPath}/${item.uid}`"
    )
</template>

<script>
import CmsArray from '@/components/CmsArray';
import CmsString from '@/components/CmsString';

export default {
    name: 'cms-string-array',
    components: {
        CmsArray,
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
