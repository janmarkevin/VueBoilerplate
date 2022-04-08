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
            <p>Remove from library</p>
            <div>{{ book.id }}</div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

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
    getBooks() {
      for (let i = 0; i < this.bookList.length; i++ ) {
        this.id = this.bookList[i];
        console.log(this.id);

        axios.get(`https://www.googleapis.com/books/v1/volumes?q=` +this.id)
        .then(response => {
          const listIdsBooks = response.data.items;

          listIdsBooks.forEach(listIdsBook => {
            const author = listIdsBook.volumeInfo.authors;
            const info = {
              title: listIdsBook.volumeInfo.title,
              author: author.join(', '),
              image: listIdsBook.volumeInfo.imageLinks.smallThumbnail,
              id: listIdsBook.id
            };
            this.$store.commit('setAddBook', info)
          })
        })
      }
    }
  },
  created() {
    this.getBooks();
  }
}
</script>