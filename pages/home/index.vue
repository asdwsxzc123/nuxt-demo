<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="user" class="nav-item">
                <nuxt-link
                  exact
                  class="nav-link"
                  :class="{
                    active: tab === 'your_feed'
                  }"
                  :to="{
                  name: 'home',
                  query: {
                    tab: 'your_feed'
                  }
                }"
                >Your Feed</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  exact
                  class="nav-link"
                  :class="{
                    active: tab === 'global_feed'
                  }"
                  :to="{
                  name: 'home',
                  }"
                >Global Feed</nuxt-link>
              </li>

              <li v-if="tag" class="nav-item">
                <nuxt-link
                  exact
                  class="nav-link"
                  :class="{
                    active: tab === 'tag'
                  }"
                  :to="{
                  name: 'home',
                  query: {
                    tab: 'tag',
                    tag
                  }
                }"
                ># {{tag}}</nuxt-link>
              </li>
            </ul>
          </div>

          <!-- 文章列表 -->
          <article-list :articles="articles" />
          <!-- 分页列表 -->
          <nav>
            <ul class="pagination">
              <li
                class="page-item"
                v-for="item in totalPage"
                :key="item"
                :class="{
                active: item === page
              }"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                name: 'home',
                query: {
                  page: item,
                  tag:$route.query.tag,
                  tab
                }
              }"
                >{{item}}</nuxt-link>
              </li>
            </ul>
          </nav>
        </div>

        <!-- tag -->
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <template v-for="(tag) in tags">
                <nuxt-link
                  :key="tag"
                  :to="{
                  name: 'home',
                  query: {
                    tag,
                    tab: 'tag'
                  }
                }"
                  class="tag-pill tag-default"
                >{{tag}}</nuxt-link>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getArticles, getYourFeedArticles } from "@/api/article";
import ArticleList from "./components/article-list";
import { getTags } from "@/api/tag";
import { mapState } from "vuex";
export default {
  name: "HomeIndex",
  async asyncData({ query }) {
    let { tag, page, tab = "global_feed" } = query;
    page = Number(page || 1);
    const limit = 10;
    const fnArticles = tab === "your_feed" ? getYourFeedArticles : getArticles;
    const [articleRes, tagRes] = await Promise.all([
      fnArticles({
        limit,
        offset: (page - 1) * limit,
        tag,
      }),
      getTags(),
    ]);
    const { articles, articlesCount } = articleRes.data;
    const {
      data: { tags },
    } = tagRes;
    articles.forEach((article) => (article.favoriteDisabled = false));
    return {
      articles,
      articlesCount,
      page,
      limit,
      tags,
      tab,
      tag,
    };
  },
  watchQuery: ["page", "tag", "tab"],
  components: { ArticleList },
  computed: {
    ...mapState(["user"]),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    },
  },
};
</script>