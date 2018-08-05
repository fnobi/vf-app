export function handleUserLogin({ commit }, user) {
    commit('setIsAuthLoading', false);
    commit('setUserEmail', user ? user.email : null);
}
