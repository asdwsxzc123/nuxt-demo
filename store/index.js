import cookieparser from 'cookieparser'
// 在服务端渲染期间,都同一个实例
// 防止数据冲突,定义成函数
export const state = () => {
  return {
    user: null
  }
}
export const mutations = {
  setUser (state, data) {
    state.user = data
  },
}
export const actions = {
  // 特殊的action,会在服务端渲染期间自动调用
  nuxtServerInit ({ commit }, { req }) {
    let user = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (error) {
      }
    }
    commit('setUser', user)
  }
}

