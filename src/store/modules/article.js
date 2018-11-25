import axios from '@/utils/fetch'

const article = {
  state: {
    list: [],
    total: 0
  },
  mutations: {
    SET_LIST(state, data) {
      state.list = data.list
      state.total = data.total
    }
  },
  actions: {
    addArticle({
      commit
    }, params) {
      return new Promise((resolve, reject) => {
        axios.post('article/add', params).then((res) => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    updateArticle({commit}, params) {
      return new Promise((resolve, reject) => {
        axios.post('article/edit', params).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getArticleList({commit}, params) {
      return new Promise((resolve, reject) => {
        axios.get('article/listData', params).then((res) => {
          commit('SET_LIST', res.data)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    ArticleDelete({commit}, params) {
      return new Promise((resolve, reject) => {
        axios.post('article/delete', params).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getType({
      commit
    }) {
      return new Promise((resolve, reject) => {
        axios.get('article/type').then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // markdown上传图片
    markdown_uploadImg({commit}, formData) {
      return new Promise((resolve, reject) => {
        axios.postFile('markdown_upload_img', formData).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}

export default article
