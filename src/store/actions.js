export function updateAuthState({ commit }, user) {
    commit('setIsAuthLoading', false);
    commit('setUserEmail', user ? user.email : null);
    commit('setUserUid', user ? user.uid : null);
}
