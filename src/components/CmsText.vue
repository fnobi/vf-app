<template lang="pug">
form.cms-text(v-if="previewMode" @submit.prevent="startEditing")
    .cms-text__text--preview(
        v-html="previewData || '−'"
        @click="startEditing"
        :data-empty="!remoteData"
    )
    p.cms-text__button
        button edit
form.cms-text(v-else @submit.prevent="endEditing")
    textarea.cms-text__text--edit(v-model="editingData" ref="input")
    p.cms-text__button
        button(:disabled="!hasChange") ok
        button(@click.prevent="cancelEditing") cancel
</template>

<style lang="scss" scoped>
.cms-text {
    display: flex;
    align-items: flex-start;
}

.cms-text__text {
    flex-shrink: 1;
    line-height: 1.5;
    font-size: inherit;
    padding: 0;
    border: none;
    font-family: sans-serif;
}
.cms-text__text--preview {
    @extend .cms-text__text;
    &[data-empty] {
        color: rgba(#000, 0.2);
    }
}
.cms-text__text--edit {
    @extend .cms-text__text;
    width: 100%;
    min-height: 10em;
    background-color: rgba(#888, 0.2);
}

.cms-text__button {
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
    name: 'cms-text',
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
            setTimeout(() => {
                this.$refs.input.focus();
            });
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
