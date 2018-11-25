const getters = {
  // 用户
  userName: state => state.user.name,
  userList: state => state.user.list,
  userTotal: state => state.user.total,
  // 文章
  articleList: state => state.article.list,
  articleTotal: state => state.article.total
}
export default getters
