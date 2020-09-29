import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _25cb8a36 = () => interopDefault(import('../pages/layout' /* webpackChunkName: "" */))
const _0cd1d6eb = () => interopDefault(import('../pages/home' /* webpackChunkName: "" */))
const _e4bd6246 = () => interopDefault(import('../pages/login' /* webpackChunkName: "" */))
const _f8a047c6 = () => interopDefault(import('../pages/profile' /* webpackChunkName: "" */))
const _f8e88fa2 = () => interopDefault(import('../pages/settings' /* webpackChunkName: "" */))
const _19fcb079 = () => interopDefault(import('../pages/editor' /* webpackChunkName: "" */))
const _6a7a1f6a = () => interopDefault(import('../pages/article' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/fed-e-task-03-03/'),
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _25cb8a36,
    children: [{
      path: "",
      component: _0cd1d6eb,
      name: "home"
    }, {
      path: "/login",
      component: _e4bd6246,
      name: "login"
    }, {
      path: "/register",
      component: _e4bd6246,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _f8a047c6,
      name: "profile"
    }, {
      path: "/settings",
      component: _f8e88fa2,
      name: "settings"
    }, {
      path: "/editor",
      component: _19fcb079,
      name: "editor"
    }, {
      path: "/editor/:slug",
      component: _19fcb079,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _6a7a1f6a,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
