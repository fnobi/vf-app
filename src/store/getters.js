export function isLoggedIn(state) {
    return !!state.userEmail;
}

export function isLoading(state) {
    return !!state.isAuthLoading;
}
