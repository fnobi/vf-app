<template lang="pug">
form.memo-pad(v-if="previewMode" @submit.prevent="startEditing")
    .memo-pad__text(v-html="previewData")
    p.memo-pad__button
        button edit
form.memo-pad(v-else @submit.prevent="endEditing")
    textarea.memo-pad__text(v-model="editingData")
    p.memo-pad__button
        button ok
</template>

<style lang="scss" scoped>
.memo-pad {
    display: flex;
    height: 400px;
    padding: 1em;
    flex-direction: column;
    background-color: #eee;
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
import firebaseSubscriber from '@/mixin/firebaseSubscriber';

export default {
    name: 'memo-pad',
    props: {
        path: String,
    },
    mixins: [firebaseSubscriber],
    data: () => ({
        previewMode: true,
        editingData: null,
        remoteData: null,
    }),
    computed: {
        firebaseSubscription() {
            return {
                [this.path]: snapshot => this.setRemoteData(snapshot.val()),
            };
        },
        previewData() {
            return (this.remoteData || '').replace(/\n/g, '<br />');
        },
    },
    methods: {
        setRemoteData(text) {
            this.remoteData = text;
        },
        startEditing() {
            this.editingData = this.remoteData;
            this.previewMode = false;
        },
        endEditing() {
            const ref = this.firebaseRef(this.path);
            ref.set(this.editingData);
            this.previewMode = true;
        },
    },
};
</script>
