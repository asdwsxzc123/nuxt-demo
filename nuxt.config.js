import { base } from './config.js'
function getCmpt (resolve, path) {
  const basePages = 'pages'
  return resolve(__dirname, `${basePages}/${path}`)
}
module.exports = {
  router: {
    linkActiveClass: 'active',
    extendRoutes (routes, resolve) {
      const getC = (function (resolve) {
        return function (path) {
          return getCmpt(resolve, path)
        }
      })(resolve)
      const createRoute = (name, activeKey) => {
        if (name === 'home') {
          return {
            name,
            path: '',
            component: getC(`/${name}`)
          }
        }
        let path = `/${name}`
        if (activeKey) {
          path += `/:${activeKey}`
        }
        return {
          name,
          path,
          component: getC(`/${name}`)
        }
      }
      // 清除路由表
      routes.splice(0)
      routes.push(...[
        {
          path: '/',
          component: getC('/layout'),
          children: [
            createRoute('home'),
            createRoute('login'),
            {
              name: 'register',
              path: `/register`,
              component: getC(`/login`)
            },
            createRoute('profile', 'username'),
            createRoute('settings'),
            createRoute('editor'),
            createRoute('editor', 'slug'),
            createRoute('article', 'slug'),

          ]
        }
      ])
    },
    base
  },
  plugins: [
    '~/plugins/request.js',
    '~/plugins/dayjs.js',
  ],
  server: {
    host: '0.0.0.0',
    port: '3000'
  }
}