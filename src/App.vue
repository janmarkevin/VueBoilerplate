<template>
  <section id="app">
    <section class="section__header">
      <div class="section__wrapper">
        <div class="section__group">
          <h1>
            <a href="#">Library</a>
          </h1>
          <div id="nav" class="tab">
            <router-link to="/" class="tab__item"><img class="image" src="./assets/search.png" alt="Search"></router-link>
            <router-link to="/axios" class="tab__item"><img class="image" src="./assets/book.png" alt="Book"></router-link>
          </div>
        </div>
      </div>
    </section>
    <div class="section__main">
      <div class="section__wrapper">
        <div class="section__grid">
          <div class="section__content">
            <router-view/>
          </div>
          <div class="item">
            <div class="item__header">
              <h2>Favorite Author</h2>
            </div>
            <ul class="item__list">
              <li class="item__items" v-for="(favBook, index) in favAuthorList" :key="index">
                <div class="item__img-wrapper">
                  <img ref="bookImage" :src="favBook.image" :alt="favBook.title" class="item__img">
                </div>
                <div class="item__item-text">
                  <h3 class="item__title">{{ favBook.title }}</h3>
                  <p class="item__author">{{ favBook.author }}</p>
                </div>
                <div class="item__item-btn">
                  <button :value="favBook" @click.prevent="getFormValues(favBook)" type="button" class="button button--transparent" :disabled="bookList.includes(favBook)">
                    <img src="./assets/add.png" alt="add" v-if="!bookList.includes(favBook)">
                    <img src="./assets/check.png" alt="check" v-else>
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
  @import "./scss/style.scss";
</style>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      images: 'http://vuejs.org/assets/add.png'
    }
  },
  computed: {
    favAuthorList() {
      return this.$store.state.favAuthor;
    },
    bookList() {
      return this.$store.state.books;
    }
  },
  methods: {
    getFavBooks () {
      axios.get(`https://www.googleapis.com/books/v1/volumes?q=black+clover&maxResults=5`)
      .then(response => {
        const favBooks = response.data.items;

        favBooks.forEach(favBook => {
          const author = favBook.volumeInfo.authors;
          const info = {
            title: favBook.volumeInfo.title,
            author: author.join(', '),
            image: favBook.volumeInfo.imageLinks.smallThumbnail,
            id: favBook.id
          };
          this.$store.commit('setFavAuthor', info);
        });
      })
    },
    getFormValues(value) {
      this.$store.commit('setAddBook', value);
    }
  },
  created() {
    this.getFavBooks();
  }
}
</script>