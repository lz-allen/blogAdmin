<template>
  <div class="articleList">
    <div class="search">
      <el-input
        placeholder="请输入内容"
        v-model="inputVal">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button class="searchBtn" type="primary" icon="el-icon-search">搜索</el-button>
    </div>
    <div class="table">
      <el-table
        :data="tableData"
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
             <div v-if="scope.column.property === 'isVisibble'">{{scope.row.isVisibble?'是':'否'}}</div>
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
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      inputVal: '',
      dialogIsShow: false,
      pageSize: 10,
      currentPage: 1,
      articleTotal: 100,
      articleInfo: {},
      tableData: [
        {
          id: '5b73efe90adcd5ebd82448c7',
          type: 'JavaScript',
          title: 'CSS3兼容',
          desc: 'CSS3中-moz、-ms、-webkit和-o分别代表什么意思',
          publishTime: '2018-08-30 23:57:27',
          isVisibble: true
        },
        {
          id: '5b73efe90adcd5ebd82448c8',
          type: 'CSS',
          title: 'CSS3兼容',
          desc: 'CSS3中-moz、-ms、-webkit和-o分别代表什么意思',
          publishTime: '2018-08-30 07:57:27',
          isVisibble: true
        }
      ],
      headerOptions: [
        {
          label: '类型',
          width: '80',
          prop: 'type',
          filters: [
            { text: 'HTML', value: 'HTML' },
            { text: 'CSS', value: 'CSS' },
            { text: 'JavaScript', value: 'JavaScript' },
            { text: 'Vue', value: 'Vue' },
            { text: 'Webpack', value: 'Webpack' },
            { text: 'Node', value: 'Node' },
            { text: 'MongoDB', value: 'MongoDB' },
            { text: '服务器相关', value: '服务器相关' }
          ]
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
          width: '120',
          prop: 'publishTime',
          sort: true
        },
        {
          label: '是否可见',
          width: '60',
          prop: 'isVisibble'
        }
      ]
    }
  },
  watch: {},
  computed: {},
  methods: {
    filterTag(value, row) {
      if (row.type === value) return row
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除,是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.tableData.splice(index, 1)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  created() {},
  mounted() {}
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
