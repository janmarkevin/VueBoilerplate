<template>
  <section class="search">
    <div class="search__group">
      <input type="text" placeholder="Book Title / Author" class="search__input" v-model="bookSearchValue">
      <button class="button button--search" @click="getBooks" :disabled="bookSearchValue.length === 0">Search</button>
    </div>
    <div class="item item--search">
      <ul class="item__list" v-if="bookList.length > 0">
        <li class="item__items item__items--search" v-for="(book, index) in bookList" :key="index">
          <div class="item__img-wrapper">
            <img :src="book.image" :alt="book.title" class="item__img">
          </div>
          <div class="item__item-text item__item-text--search">
            <h3 class="item__title">{{ book.title }}</h3>
            <p class="item__author">{{ book.author }}</p>
          </div>
          <div class="item__item-btn item__item-btn--search">
            <button :value="book" v-on:click="getAddIdBooks(book)" class="button button--transparent">
              <img src="../assets/add.png" alt="add">
            </button>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss">
  @import "../scss/style.scss";
</style>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      bookSearchValue: "",
      bookList: []
    }
  },
  methods: {
    getBooks() {
      this.bookList = [];
      axios.get(`https://www.googleapis.com/books/v1/volumes?q=` + this.bookSearchValue + `&maxResults=20`)
      .then(response => {
        const books = response.data.items;

        books.forEach(book => {
          const authorsList = book.volumeInfo.authors;
          const info = {
            title: book.volumeInfo.title,
            author: authorsList.join(', '),
            image: book.volumeInfo.imageLinks.smallThumbnail,
            id: book.id
          };
          this.bookList.push(info)
          this.bookSearchValue = "";
        });
      })
    },
    getAddIdBooks(value) {
      this.$store.commit('setAddBook', value);
    }
  }
}
</script>