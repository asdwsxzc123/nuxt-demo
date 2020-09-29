<template>
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
        :to="{
          name: 'profile',
          params: {
            username: article.author.username
          }
        }"
        class="author"
      >{{article.author.username}}</nuxt-link>
      <span class="date">{{article.createdAt|date()}}</span>
    </div>
    <template v-if="article.author.username !== user.username">
      <button
        @click="onFollow(article)"
        class="btn btn-sm btn-outline-secondary"
        :class="{
      active: article.author.following
    }"
      >
        <i class="ion-plus-round"></i>
        &nbsp; {{article.author.following?'Unfollow':'Follow'}} {{article.author.username}}
      </button>
      &nbsp;&nbsp;
      <button
        @click="onFavorite(article)"
        class="btn btn-sm btn-outline-primary"
        :class="{
      active: article.favorited
    }"
      >
        <i class="ion-heart"></i>
        &nbsp; {{article.favorited?'Unfavorite':'Favorite'}} Article
        <span
          class="counter"
        >({{article.favoritesCount}})</span>
      </button>
    </template>
    <template v-else>
      <button @click="onEdit(article)" class="btn btn-sm btn-outline-secondary">
        <i class="ion-edit"></i>
        &nbsp; Edit Article
      </button>
      &nbsp;&nbsp;
      <button @click="onDelete(article)" class="btn btn-sm btn-outline-danger">
        <i class="ion-trash-a"></i>
        &nbsp; Delete Article
      </button>
    </template>
  </div>
</template>
<script>
import { mapState } from "vuex";
import {
  deleteArticle,
  deleteFollow,
  addFollow,
  addFavorite,
  deleteFavorite,
} from "@/api/article.js";
export default {
  name: "ArticleMeta",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(["user"]),
  },
  head() {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: "my custom description",
        },
      ],
    };
  },
  methods: {
    async onDelete(article) {
      await deleteArticle(article.slug);
    },
    onEdit(article) {
      this.$router.push(`/editor/${article.slug}`);
    },
    async onFollow(article) {
      let fn = deleteFollow;
      if (!article.author.following) fn = addFollow;
      await fn(article.author.username);
      article.author.following = !article.author.following;
    },
    async onFavorite(article) {
      let fn = addFavorite;
      if (article.favorited) fn = deleteFavorite;
      await fn(article.slug);
      if (article.favorited) {
        article.favoritesCount -= 1;
      } else {
        article.favoritesCount += 1;
      }
      article.favorited = !article.favorited;
    },
  },
};
</script>