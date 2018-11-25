<template>
  <div class="articleEdit">
    <el-dialog title="文章编辑" width="80%" :visible.sync="dialogFormVisible" center @close="close">
      <add-article :article="articleInfo">
        <h4 slot="title" class="title">修改文章</h4>
        <span slot="btn">更新文章</span>
      </add-article>
    </el-dialog>
  </div>
</template>

<script>
import AddArticle from '@/views/addArticle'
export default {
  components: {
    AddArticle
  },
  props: ['articleInfo'],
  data() {
    return {
      dialogFormVisible: true
    }
  },
  watch: {},
  computed: {},
  methods: {
    close() {
      this.$emit('close')
    }
  },
  created() {},
  mounted() {}
}

</script>
<style lang="less" scoped>
  .articleEdit {
    .title{
      text-align: left;
      color: #606266;
      font-size: 14px;
    }
  }
</style>
