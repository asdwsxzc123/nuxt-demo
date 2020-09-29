<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{article.title}}</h1>

        <article-meta :article="article" />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
      </div>
      <ul class="tag-list">
        <li
          v-for="tag in article.tagList"
          :key="tag"
          class="tag-default tag-pill tag-outline"
        >{{tag}}</li>
      </ul>
      <hr />

      <div class="article-actions">
        <article-meta :article="article" />
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <article-comments :article="article"></article-comments>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getArticle } from "@/api/article.js";
import MarkdownIt from "markdown-it";
import ArticleMeta from "./components/article-meta";
import ArticleComments from "./components/article-comments";
export default {
  middleware: "authenticated",
  name: "ArticleIndex",
  async asyncData({ params }) {
    const { slug } = params;
    const {
      data: { article },
    } = await getArticle(slug);
    const md = new MarkdownIt();
    article.body = md.render(article.body);
    return { article };
  },
  components: {
    ArticleMeta,
    ArticleComments,
  },
};
</script>