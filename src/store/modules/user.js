import * as api from '@/services/user'
import $doRequest from '@/utils/formatFetch'

const user = {
  namespaced: true,
  state: {
    userList: {
      loading: false,
      data: []
    }
  },
  getters: {},
  mutations: {
    SET_USER_lIST: (state, result) => {
      console.log('SET_USER_lIST', result);
      state.userList.data = result;
    }
  },
  actions: {
    getUserList({ commit, state, dispatch }, query ){
      return $doRequest(api.getUserList(query), (result)=>{
        // TODO: 存入store
        commit('SET_USER_lIST', result);
      })
    }
  }
}

export default user
