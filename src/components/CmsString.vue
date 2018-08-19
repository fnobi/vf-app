<template lang="pug">
form.cms-string(v-if="previewMode" @submit.prevent="startEditing")
    .cms-string__text(@click="startEditing" :data-empty="!remoteData")
        | {{remoteData || '−'}}
    p.cms-string__button
        button edit
form.cms-string(v-else @submit.prevent="endEditing")
    input.cms-string__text(v-model="editingData" type="text" ref="input")
    p.cms-string__button
        button(:disabled="!hasChange") ok
        button(@click.prevent="cancelEditing") cancel
</template>

<style lang="scss" scoped>
.cms-string {
    display: flex;
    align-items: center;
}

.cms-string__text {
    word-break: break-word;
    &[data-empty] {
        color: rgba(#000, 0.2);
    }
}

.cms-string__button {
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
    name: 'cms-string',
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
