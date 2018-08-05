export function updateAuthState({ commit }, user) {
    commit('setIsAuthLoading', false);
    commit('setUserEmail', user ? user.email : null);
}
