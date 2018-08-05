<template lang="pug">
router-view(v-if="isLoggedIn")
LoginForm(v-else)
</template>

<script>
import { mapGetters } from 'vuex';
import LoginForm from '@/components/LoginForm';

export default {
    name: 'page-private',
    components: {
        LoginForm,
    },
    computed: {
        ...mapGetters(['isLoggedIn']),
    },
};
</script>
