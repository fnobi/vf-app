<template lang="pug">
form.ref-string-form(v-if="previewMode" @submit.prevent="startEditing")
    .ref-string-form__text(@click="startEditing" :data-empty="!remoteData")
        | {{remoteData || '−'}}
    p.ref-string-form__button
        button edit
form.ref-string-form(v-else @submit.prevent="endEditing")
    input.ref-string-form__text(v-model="editingData" type="text" ref="input")
    p.ref-string-form__button
        button(:disabled="!hasChange") ok
        button(@click.prevent="cancelEditing") cancel
</template>

<style lang="scss" scoped>
.ref-string-form {
    display: flex;
    align-items: center;
}

.ref-string-form__text {
    word-break: break-word;
    &[data-empty] {
        color: rgba(#000, 0.2);
    }
}

.ref-string-form__button {
    display: flex;
    flex-direction: row-reverse;
    text-align: right;
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
    name: 'ref-string-form',
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
