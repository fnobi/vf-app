export function handleUserLogin({ commit }, user) {
    commit('setUserEmail', user ? user.email : null);
}
