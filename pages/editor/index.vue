<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="article.title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="article.description"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="article.body"
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="tag"
                  @keyup.enter="addTag"
                />
                <div class="tag-list">
                  <span class="tag-default tag-pill" :key="tag" v-for="tag in article.tagList">
                    <i class="ion-close-round" @click="onDeleteTag(tag)"></i>
                    {{tag}}
                  </span>
                </div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click.prevent="onAdd"
              >Publish Article</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { addArticle, getArticle, editArticle } from "@/api/article.js";
export default {
  middleware: "authenticated",
  name: "EditorIndex",
  data() {
    return {
      article: {
        title: "",
        description: "",
        body: "",
        tagList: [],
      },
      tag: "",
    };
  },
  methods: {
    async onAdd() {
      const slug = this.$route.params.slug;
      let fn = editArticle;
      if (!slug) fn = addArticle;
      const {
        data: { article },
      } = await fn({
        article: this.article,
        slug: this.$route.params.slug,
      });
      this.$router.push(`/article/${article.slug}`);
    },
    onDeleteTag(tag) {
      this.article.tagList = this.article.tagList.filter((i) => i !== tag);
    },
    addTag(e) {
      this.article.tagList.push(this.tag);
      this.tag = "";
    },
    async getArticle(slug) {
      const {
        data: { article },
      } = await getArticle(slug);
      this.article = article;
    },
  },
  mounted() {
    const { slug } = this.$route.params;
    if (slug) {
      this.getArticle(slug);
    }
  },
};
</script>