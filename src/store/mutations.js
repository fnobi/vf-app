export function setUserEmail(state, userEmail) {
    state.userEmail = userEmail;
}

export function setUserUid(state, userUid) {
    state.userUid = userUid;
}

export function setIsAuthLoading(state, flag) {
    state.isAuthLoading = !!flag;
}
