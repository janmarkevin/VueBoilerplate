import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: 'Juan Dela Cruz',
    friends: [],
    books: [],
    favAuthor: [],
    bookSearch: []
  },
  mutations: {
    setFriend(state, value) {
      state.friends.push(value);
    },
    setAddBook(state, value) {
      state.books.push(value);
    },
    setFavAuthor(state, value) {
      state.favAuthor.push(value);
    },
    setBook(state, value) {
      state.bookSearch.push(value);
    }
  },
  actions: {
  },
  modules: {
  }
})
