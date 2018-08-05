<template lang="pug">
.login-form
    button(@click="loginWithGoogle") login with google
</template>

<style lang="scss" scoped>
.login-form {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
    name: 'login-form',
    methods: {
        loginWithGoogle() {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithRedirect(provider);
        },
    },
};
</script>
