import firebase from 'firebase/app';
import _ from 'lodash';

const DEFAULT_EVENT = 'value';

export default {
    methods: {
        setFirebaseSubscription(subscription) {
            _.each(subscription, (listener, path) => {
                this.firebaseRef(path).on(DEFAULT_EVENT, listener);
            });
            this.firebaseSubscriptionCache = subscription;
        },
        clearFirebaseSubscription() {
            _.each(this.firebaseSubscriptionCache, (listener, path) => {
                this.firebaseRef(path).off(DEFAULT_EVENT, listener);
            });
        },
        firebaseRef(path) {
            if (!path) return null;
            return firebase.database().ref(path);
        }
    },
    watch: {
        firebaseSubscription(newValue) {
            this.clearFirebaseSubscription();
            this.setFirebaseSubscription(newValue);
        }
    },
    created() {
        this.setFirebaseSubscription(this.firebaseSubscription);
    },
    destroyed() {
        this.clearFirebaseSubscription();
    }
};
