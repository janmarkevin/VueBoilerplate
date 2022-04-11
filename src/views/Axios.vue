<template>
  <section class="section">
    <div class="section__wrapper">
      <div class="section__group">
        <h2 class="section__header-second">My Library</h2>
      </div>
    </div>
    <div class="item item--search">
      <ul class="item__list">
        <li class="item__items item__items--search" v-for="(book, index) in bookList" :key="index">
          <div class="item__img-wrapper">
            <img :src="book.image" :alt="book.title" class="item__img">
          </div>
          <div class="item__item-text item__item-text--library">
            <h3 class="item__title">{{ book.title }}</h3>
            <p class="item__author">{{ book.author }}</p>
          </div>
          <div class="item__item-btn item__item-btn--library">
            <button :value="book" class="button button--library" @click.prevent="removeBook(book)">Remove from library</button>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      id: ''
    }
  },
  computed: {
    bookList() {
      return this.$store.state.books;
    }
  },
  methods: {
    removeBook(value) {
      this.bookList.splice(this.bookList.indexOf(value), 1);
    }
  },
  created() {
  }
}
</script>