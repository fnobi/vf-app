<template lang="pug">
cms-array(:ref-path="refPath")
    cms-image(
        slot-scope="item"
        :ref-path="`${refPath}/${item.uid}`"
    )
</template>

<script>
import CmsArray from '@/components/CmsArray';
import CmsImage from '@/components/CmsImage';

export default {
    name: 'cms-image-array',
    components: {
        CmsArray,
        CmsImage,
    },
    props: {
        refPath: {
            type: String,
            required: true,
        },
    },
};
</script>
