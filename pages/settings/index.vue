<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                  v-model="userParams.image"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  v-model="userParams.username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="userParams.bio"
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  v-model="userParams.email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  v-model="userParams.password"
                />
              </fieldset>
              <button
                class="btn btn-lg btn-primary pull-xs-right"
                @click.prevent="onEdit"
              >Update Settings</button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger" @click.prevent="onLogout">Or click here to logout.</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { editUser } from "@/api/user.js";
import { getUser } from "@/api/user.js";

const Cookie = require("js-cookie");

export default {
  middleware: "authenticated",
  name: "SettingIndex",
  data() {
    return {
      userParams: {
        image: '',
        username: '',
        bio: '',
        email: '',
        password: ''
      }
    };
  },
  computed: {
    ...mapState(['user'])
  },
  async mounted() {
    const { username } = this.user;
    const {
      data: { profile },
    } = await getUser(username);
    this.userParams = profile;
  },
  methods: {
    async onEdit() {
      await editUser({ user: this.userParams });
      this.$router.push(`/profile/${this.userParams.username}`);
    },
    onLogout() {
      this.$store.commit("setUser", null);
      Cookie.remove("user");
      this.$router.push("/");
    },
  },
};
</script>