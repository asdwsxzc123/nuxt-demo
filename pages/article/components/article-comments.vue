<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
          v-model="comment.body"
        ></textarea>
      </div>
      <div class="card-footer">
        <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
        <button class="btn btn-sm btn-primary" @click.prevent="onComment">Post Comment</button>
      </div>
    </form>

    <div v-for="comment in comments" :key="comment.id" class="card">
      <div class="card-block">
        <p class="card-text">{{comment.body}}</p>
      </div>
      <div class="card-footer">
        <nuxt-link
          :to="{
          name: 'profile',
          params:{
            username: comment.author.username
          }
        }"
          class="comment-author"
        >
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>&nbsp;
        <nuxt-link
          :to="{
          name: 'profile',
          params:{
            username: comment.author.username
          }
        }"
          class="comment-author"
        >{{comment.author.username}}</nuxt-link>
        <span class="date-posted">{{comment.createdAt|date()}}</span>
        <span v-if="comment.author.username === user.username" class="mod-options">
          <i class="ion-trash-a" @click="onDeleteComment(comment)"></i>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { getComments, addComments, deleteComments } from "@/api/article.js";
import { mapState } from "vuex";

export default {
  name: "ArticleComments",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      comments: [],
      comment: { body: "" },
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  async mounted() {
    const { data } = await getComments(this.article.slug);
    this.comments = data.comments;
  },
  methods: {
    async onComment() {
      const {
        data: { comment },
      } = await addComments({
        comment: this.comment,
        slug: this.article.slug,
      });
      this.comments.unshift(comment);
      this.comment.body = "";
    },
    async onDeleteComment(comment) {
      await deleteComments(this.article.slug, comment.id);
      this.comments = this.comments.filter((i) => i.id !== comment.id);
    },
  },
};
</script>