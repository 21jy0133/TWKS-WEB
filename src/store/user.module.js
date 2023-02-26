import AuthService from '../services/auth.service';

const userDetail = JSON.parse(localStorage.getItem('userDetail'));
const initialState = userDetail
  ? { userDetail }
  : { userDetail: null };

export const user = {
  namespaced: true,
  state: initialState,
  actions: {
    getUserDetail({ commit }) {
      return AuthService.my().then(
        user => {
          commit('setUserDetail', user);
          return Promise.resolve(user);
        },
        error => {
          commit('Failure');
          return Promise.reject(error);
        }
      );
    },
    clear({ commit }) { 
      commit('setUserDetail', null);
    }

  },
  mutations: {
    setUserDetail(state, user) {
      state.userDetail = user;
    },
    
  }
};