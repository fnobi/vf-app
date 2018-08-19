<template lang="pug">
.cms-image(v-if="loading")
    | loading...
form.cms-image(v-else-if="previewMode" @submit.prevent="startEditing")
    .cms-image__image
        img.preview(:src="(remoteData || dummyImage) + '?' + timestamp")
    p.cms-image__button
        button edit
        button(@click.prevent="clearFile" v-if="remoteData") delete
form.cms-image(v-else @submit.prevent="endEditing")
    input(type="file" ref="fileInput")
    p.cms-image__button
        button ok
        button(@click.prevent="cancelEditing") cancel
</template>

<style lang="scss" scoped>
.cms-image {
    display: flex;
    align-items: center;
}

.cms-image__button {
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

.preview {
    display: block;
    max-height: 80px;
    width: auto;
}
</style>

<script>
import firebase from '@/firebase';
import firebaseSubscriber from '@/mixin/firebaseSubscriber';
import firebaseConfig from '@/const/firebaseConfig';

const STORAGE_ORIGIN = [
    '//storage.googleapis.com/',
    firebaseConfig.storageBucket,
].join('');

export default {
    name: 'cms-image',
    props: {
        refPath: {
            type: String,
            required: true,
        },
        baseWidth: {
            type: Number,
            default: 120,
        },
        baseHeight: {
            type: Number,
            default: 80,
        },
    },
    mixins: [firebaseSubscriber],
    data: () => ({
        previewMode: true,
        remoteData: null,
        loading: false,
        timestamp: 0,
    }),
    computed: {
        firebaseSubscription() {
            return {
                [this.refPath]: snapshot => this.setRemoteData(snapshot.val()),
            };
        },
        dummyImage() {
            return `//placehold.jp/${this.baseWidth}x${this.baseHeight}.png`;
        },
    },
    methods: {
        setRemoteData(text) {
            this.remoteData = text;
        },
        startEditing() {
            this.timestamp = Date.now();
            this.previewMode = false;
        },
        endEditing() {
            this.loading = true;
            this.previewMode = true;

            const { fileInput } = this.$refs;
            const { files } = fileInput;
            const [file] = files;
            const extMatch = file.name.match(/\.[^.]+/);
            const [ext] = extMatch;
            const filePath = `${this.refPath}${ext}`;

            const imageUrl = `${STORAGE_ORIGIN}${filePath}`;
            const fileNameChanged = this.remoteData !== imageUrl;

            return Promise.all([
                this.uploadFile(filePath, file),
                fileNameChanged ? this.removeRemoteFile() : Promise.resolve(),
            ])
                .then(() => this.firebaseRef(this.refPath).set(imageUrl))
                .finally(() => {
                    this.loading = false;
                });
        },
        clearFile() {
            this.loading = true;
            return Promise.resolve()
                .then(() =>
                    Promise.all([
                        this.removeRemoteFile(),
                        this.firebaseRef(this.refPath).remove(),
                    ])
                )
                .then(() => {
                    this.loading = false;
                });
        },
        uploadFile(filePath, file) {
            return firebase
                .storage()
                .ref()
                .child(filePath)
                .put(file);
        },
        removeRemoteFile() {
            const imageUrl = this.remoteData || '';
            if (imageUrl.indexOf(STORAGE_ORIGIN) !== 0) {
                return Promise.resolve();
            }
            const filePath = imageUrl.slice(STORAGE_ORIGIN.length);
            return firebase
                .storage()
                .ref()
                .child(filePath)
                .delete();
        },
        cancelEditing() {
            this.previewMode = true;
        },
    },
};
</script>
