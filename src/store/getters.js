export function isLoggedIn(state) {
    return state.userEmail && state.userUid;
}

export function isLoading(state) {
    return !!state.isAuthLoading;
}
