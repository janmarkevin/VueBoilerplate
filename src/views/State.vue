<template>
  <section class="section">
    <div class="section__wrapper">
      <h1>{{ defaultUser }}</h1>
      <form @submit.prevent="addFriend" class="form">
        <div class="form__wrapper">
          <input class="form__input" type="text" name="friend" v-model="friendInput" placeholder="Friend's name">
          <button class="button" :disabled="friendInput.length === 0">Add Friend</button>
        </div>
      </form>

      <ul class="list" v-if="bookList.length > 0">
        <li
          class="list__item"
          v-for="(friend, index) in bookList"
          :key="index">
            {{ friend }}
          </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      defaultUser: '',
      friendInput: ''
    }
  },
  computed: {
    // friendList() {
    //   return this.$store.state.friends;
    // },
    bookList() {
      return this.$store.state.books;
    }
  },
  methods: {
    addFriend() {
      this.$store.commit('setFriend', this.friendInput);
      this.friendInput = '';
    }
  },
  mounted() {
    this.defaultUser = this.$store.state.user;
  }
}
</script>