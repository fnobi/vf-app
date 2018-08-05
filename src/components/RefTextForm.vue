<template lang="pug">
form.ref-text-form(v-if="previewMode" @submit.prevent="startEditing")
    .ref-text-form__text--preview(v-html="previewData")
    p.ref-text-form__button
        button edit
form.ref-text-form(v-else @submit.prevent="endEditing")
    textarea.ref-text-form__text--edit(v-model="editingData")
    p.ref-text-form__button
        button(:disabled="!hasChange") ok
        button(@click.prevent="cancelEditing") cancel
</template>

<style lang="scss" scoped>
.ref-text-form {
    display: flex;
    padding: 1em;
    background-color: #eee;
    align-items: flex-start;
}

.ref-text-form__text {
    width: 100%;
    flex-shrink: 1;
}
.ref-text-form__text--preview {
    @extend .ref-text-form__text;
}
.ref-text-form__text--edit {
    @extend .ref-text-form__text;
    min-height: 10em;
}

.ref-text-form__button {
    display: flex;
    flex-direction: column-reverse;
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
