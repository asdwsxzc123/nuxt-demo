<template>
  <div>
    <div class="article-preview" :key="article.slug" v-for="article in articles">
      <div class="article-meta">
        <nuxt-link
          :to="{
                name: 'profile',
                params: {
                  username: article.author.username
                }
              }"
        >
          <img :src="article.author.image" />
        </nuxt-link>
        <div class="info">
          <nuxt-link
            class="author"
            :to="{
                name: 'profile',
                params: {
                  username: article.author.username
                }
              }"
          >{{article.author.username}}</nuxt-link>
          <span class="date">{{article.createdAt| date}}</span>
        </div>
        <button
          class="btn btn-outline-primary btn-sm pull-xs-right"
          :class="{
                active: article.favorited
              }"
          :disabled="article.favoriteDisabled"
          @click="onFavorite(article)"
        >
          <i class="ion-heart"></i>
          {{article.favoritesCount}}
        </button>
      </div>
      <nuxt-link
        :to="{
              name: 'article',
              params: {
                slug: article.slug
              }
            }"
        class="preview-link"
      >
        <h1>{{article.title}}</h1>
        <p>{{article.description}}</p>
        <span>Read more...</span>
        <ul class="tag-list">
          <li
            v-for="tag in article.tagList"
            :key="tag"
            class="tag-default tag-pill tag-outline"
          >{{tag}}</li>
        </ul>
      </nuxt-link>
    </div>
  </div>
</template>
<script>
import { addFavorite, deleteFavorite } from "@/api/article";
export default {
  name: "ArticleList",
  props: {
    articles: {
      type: Array,
      required: true,
    },
  },
  
  methods: {
    async onFavorite(article) {
      const { favorited, slug } = article;
      article.favoriteDisabled = true;
      if (favorited) {
        await deleteFavorite(slug);
        article.favorited = false;
        article.favoritesCount -= 1;
      } else {
        await addFavorite(slug);
        article.favorited = true;
        article.favoritesCount += 1;
      }
      article.favoriteDisabled = false;
    },
  },
};
</script>