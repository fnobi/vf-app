<template lang="pug">
form.ref-text-form(v-if="previewMode" @submit.prevent="startEditing")
    .ref-text-form__text(v-html="previewData")
    p.ref-text-form__button
        button edit
form.ref-text-form(v-else @submit.prevent="endEditing")
    textarea.ref-text-form__text(v-model="editingData")
    p.ref-text-form__button
        button(:disabled="!hasChange") ok
        button(@click.prevent="cancelEditing") cancel
</template>

<style lang="scss" scoped>
.ref-text-form {
    display: flex;
    padding: 1em;
    flex-direction: column;
    background-color: #eee;
}

.ref-text-form__text {
    min-height: 10em;
    flex-shrink: 1;
}

.ref-text-form__button {
    display: flex;
    flex-direction: row-reverse;
    margin-top: 1em;
    button {
        margin-left: 0.5em;
        &:disabled {
            pointer-events: none;
            opacity: 0.5;
        }
    }
}
</style>

<script>
import firebaseSubscriber from '@/mixin/firebaseSubscriber';

export default {
    name: 'ref-text-form',
    props: {
        refPath: {
            type: String,
            required: true,
        },
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
                [this.refPath]: snapshot => this.setRemoteData(snapshot.val()),
            };
        },
        hasChange() {
            return this.editingData != this.remoteData;
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
            const ref = this.firebaseRef(this.refPath);
            ref.set(this.editingData);
            this.previewMode = true;
        },
        cancelEditing() {
            this.previewMode = true;
        },
    },
};
</script>
