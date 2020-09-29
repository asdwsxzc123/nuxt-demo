<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{profile.username}}</h4>
            <p>{{profile.bio}}</p>
            <button
              class="btn btn-sm btn-outline-secondary action-btn"
              @click="profile.username === user.username ? $router.push('/settings'): onFollow(profile)"
            >
              <i :class="profile.username == user.username?  'ion-gear-a':'ion-plus-round'"></i>
              &nbsp; {{profile.username === user.username ? 'Edit Profile Setting':`${!profile.following ?'Follow': 'Unfollow'} ${profile.username}`}}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="tab === 'author'? 'active': ''"
                  href
                  @click.prevent="onTab('author')"
                >My Articles</a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="tab === 'favorited'? 'active': ''"
                  href
                  @click.prevent="onTab('favorited')"
                >Favorited Articles</a>
              </li>
            </ul>
          </div>

          <article-list :articles="articles" />
          <!-- 分页列表 -->
          <nav>
            <ul class="pagination">
              <li
                class="page-item"
                v-for="item in PageCount"
                :key="item"
                :class="{
                active: item === page
              }"
              >
                <a class="page-link" @click="onTab(tab,item)">{{item}}</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getUser } from "@/api/user.js";
import { deleteFollow, addFollow } from "@/api/article.js";
import { mapState } from "vuex";
import ArticleList from "@/pages/home/components/article-list";
import { getArticles } from "@/api/article.js";
export default {
  middleware: "authenticated",
  name: "ProfileIndex",
  data() {
    return {
      profile: {
        username: "",
        bio: "",
        image: "",
        following: false,
      },
      articles: [],
      page: 1,
      articlesCount: 0,
      limit: 10,
    };
  },
  computed: {
    ...mapState(["user"]),
    PageCount() {
      return Math.ceil(this.articlesCount / this.limit);
    },
  },
  components: { ArticleList },
  async mounted() {
    const { username } = this.$route.params;
    const {
      data: { profile },
    } = await getUser(username);
    this.profile = profile;
    this.onTab("favorited");
  },
  methods: {
    async onTab(tab, page) {
      const { username } = this.$route.params;
      const limit = this.limit;
      if (page) {
        this.page = page;
      }
      if (tab !== this.tab) {
        this.page = 1;
      }
      let key = "author";
      const baseParams = {
        limit,
        offset: (this.page - 1) * limit,
      };
      if (tab === "favorited") {
        key = "favorited";
      }
      this.tab = tab;
      const {
        data: { articlesCount, articles },
      } = await getArticles({ ...baseParams, [key]: username });
      this.articlesCount = articlesCount;
      this.articles = articles;
    },
    async onFollow(profile) {
      if (profile.following) {
        await deleteFollow(profile.username);
      } else {
        await addFollow(profile.username);
      }
      this.profile.following = !profile.following;
    },
  },
};
</script>