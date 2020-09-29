<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ name }}</h1>
          <p class="text-xs-center">
            <nuxt-link v-if="!isLogin" to="/login">Have an account?</nuxt-link>
            <nuxt-link v-else to="/register">Need an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(message,field) in errors">
              <li :key="field">{{field}}: {{message}}</li>
            </template>
          </ul>

          <form @submit.prevent="onSave">
            <fieldset v-if="!isLogin" class="form-group">
              <input
                v-model="user.username"
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
                v-model="user.email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="user.password"
                required
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">{{ name }}</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { login, register, getUser } from "@/api/user.js";
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  middleware: "notAuthenticated",
  name: "login",
  computed: {
    isLogin() {
      return this.$route.name === "login";
    },
    name() {
      return this.isLogin ? "Sign in" : "Sign up";
    },
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
        username: "",
      },
      errors: {},
    };
  },
  methods: {
    async onSave() {
      try {
        let fn = register;
        if (this.isLogin) {
          fn = login;
          delete this.user.username;
        }

        const {
          data: { user },
        } = await fn({ user: this.user });
        const {
          data: { profile },
        } = await getUser(user.username);
        this.$store.commit("setUser", { ...profile, ...user });
        Cookie.set("user", { ...profile, ...user });
        // if (this.isLogin) {
        this.$router.push("/");
        // }
      } catch (error) {
        this.errors = error.data.errors;
      }
    },
  },
};
</script>
