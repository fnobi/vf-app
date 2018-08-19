<template lang="pug">
.cms-pulldown
    select(v-model="editingData" @change="submit")
        option(v-for="option in options" :value="option") {{option}}
</template>

<style lang="scss" scoped>
.cms-pulldown {
}
</style>

<script>
import firebaseSubscriber from '@/mixin/firebaseSubscriber';

export default {
    name: 'cms-pulldown',
    props: {
        refPath: {
            type: String,
            required: true,
        },
        options: {
            type: Array,
            required: true,
        },
    },
    mixins: [firebaseSubscriber],
    data: () => ({
        editingData: null,
        remoteData: null,
    }),
    computed: {
        firebaseSubscription() {
            return {
                [this.refPath]: snapshot => this.setRemoteData(snapshot.val()),
            };
        },
    },
    methods: {
        setRemoteData(value) {
            this.remoteData = this.editingData = value;
        },
        submit() {
            const ref = this.firebaseRef(this.refPath);
            ref.set(this.editingData);
        },
    },
};
</script>
