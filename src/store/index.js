import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import article from './modules/article'
import permission from './modules/permisson'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    article,
    permission
  },
  getters
})

export default store
