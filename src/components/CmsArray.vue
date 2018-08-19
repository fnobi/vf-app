<template lang="pug">
.cms-array
    .item(v-for="uid in itemKeys")
        .item__content
            slot(:uid="uid" :item="remoteData[uid]")
        .item__close(@click="pullList(uid)") ×
    .add
        .add__button
            button(@click.prevent="pushList") add
</template>

<style lang="scss" scoped>
@import '@scss/common.scss';

.add {
    display: flex;
}

.add__button {
    cursor: pointer;
}

.item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 1em;
}
.item__content {
    width: 100%;
}
.item__close {
    margin-left: 0.5em;
    cursor: pointer;
    line-height: 1;
}
</style>

<script>
import _ from 'lodash';
import firebaseSubscriber from '@/mixin/firebaseSubscriber';

export default {
    name: 'cms-array',
    props: {
        refPath: {
            type: String,
            required: true,
        },
    },
    mixins: [firebaseSubscriber],
    data: () => ({
        remoteData: {},
        placeholders: [],
    }),
    computed: {
        firebaseSubscription() {
            return {
                [this.refPath]: snapshot => this.setRemoteData(snapshot.val()),
            };
        },
        itemKeys() {
            return _(this.remoteData)
                .keys()
                .concat(this.placeholders)
                .uniq()
                .value()
                .sort();
        },
    },
    methods: {
        setRemoteData(obj) {
            this.remoteData = obj || {};
        },
        pushList() {
            const { key } = this.firebaseRef(this.refPath).push();
            this.placeholders.push(key);
        },
        pullList(uid) {
            this.placeholders = _.without(this.placeholders, uid);
            this.firebaseRef(this.refPath)
                .child(uid)
                .remove();
        },
    },
};
</script>
