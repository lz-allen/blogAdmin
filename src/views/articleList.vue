<template>
  <div class="articleList">
    <div class="search">
      <el-input
        placeholder="请输入内容"
        v-model="inputVal"
        @keyup.enter.native="getArticleList">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button class="searchBtn" type="primary" :loading="loading" icon="el-icon-search" @click="getArticleList">搜索</el-button>
    </div>
    <div class="table">
      <el-table
        :data="articleList"
        stripe
        border
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column label="#" type="index" header-align="center" width="60"></el-table-column>
        <el-table-column show-overflow-tooltip v-if="item.filters" v-for="item in headerOptions" :prop="item.prop" :key="item.label" :label="item.label" :min-width="item.width" :filters="item.filters" :filter-method="filterTag" header-align="center">
          <template slot-scope="scope">
            <div v-if="scope.column.property === 'type'">
              <el-tag class="tag" type="primary" close-transition>{{scope.row.type}}</el-tag>
            </div>
          </template>
        </el-table-column>
         <el-table-column show-overflow-tooltip v-if="!item.filters" v-for="item in headerOptions" :prop="item.prop" :key="item.label" :label="item.label" :min-width="item.width" :sortable="item.sort" header-align="center">
          <template slot-scope="scope">
             <div v-if="scope.column.property === 'isVisible'">{{scope.row.isVisible? '是' : '否'}}</div>
             <div v-else-if="scope.column.property === 'publishTime'">{{scope.row.publishTime | formatTime}}</div>
            <div v-else>{{scope.row[scope.column.property] || '无'}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作"
          header-align="center"
          min-width="120"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        :current-page="currentPage"
        layout="total, sizes, prev, pager, next, jumper"
        :total="articleTotal">
      </el-pagination>
    </div>
    <article-edit v-if="dialogIsShow" :articleInfo="articleInfo" @close="close"></article-edit>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import formatTime from '@/utils/formatTime'
import ArticleEdit from '@/views/articleEdit'
export default {
  components: {
    ArticleEdit
  },
  props: {},
  data() {
    return {
      loading: false,
      inputVal: '',
      dialogIsShow: false,
      pageSize: 10,
      currentPage: 1,
      articleInfo: {},
      headerOptions: [
        {
          label: '类型',
          width: '80',
          prop: 'type',
          filters: []
        },
        {
          label: '标题',
          width: '80',
          prop: 'title',
          sort: true
        },
        {
          label: '描述',
          width: '120',
          prop: 'desc'
        },
        {
          label: '发布时间',
          width: '140',
          prop: 'publishTime',
          sort: true
        },
        {
          label: '是否可见',
          width: '60',
          prop: 'isVisible'
        }
      ]
    }
  },
  watch: {},
  computed: {
    ...mapGetters(['articleList', 'articleTotal'])
  },
  filters: {
    formatTime
  },
  methods: {
    close() {
      this.dialogIsShow = false
      this.getArticleList()
    },
    filterTag(value, row) {
      if (row.type === value) return row
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getArticleList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getArticleList()
    },
    handleEdit(index, row) {
      this.dialogIsShow = true
      this.articleInfo = row
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除,是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(async() => {
        let data = await this.$store.dispatch('ArticleDelete', {_id: row._id})
        if (data.data.n) {
          this.articleList.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getArticleList()
        } else {
          this.$message({
            type: 'error',
            message: '删除失败'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async getArticleList() {
      this.loading = true
      try {
        await this.$store.dispatch('getArticleList', {
          keywords: this.inputVal,
          currentPage: this.currentPage,
          pageSize: this.pageSize
        })
        this.loading = false
      } catch (err) {
        this.loading = false
      }
    },
    getType() {
      this.$store.dispatch('getType').then(res => {
        this.headerOptions[0].filters = res.data
      })
    }
  },
  created() {
    this.getType()
    this.getArticleList()
  },
  mounted() {
  }
}

</script>
<style lang="less" scoped>
  .articleList {
    text-align: center;
    .search{
      display: flex;
      width: 400px;
      justify-content: space-between;
      .searchBtn{
        margin-left: 4px;
      }
    }
    .table{
      margin-top: 20px;
    }
    .pagination{
      text-align: right;
      margin-top: 20px;
    }
  }

</style>
