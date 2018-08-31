<template>
  <div class="adminList">
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
          <el-table-column v-for="item in headerOptions" :prop="item.prop" :key="item.label" :label="item.label" :min-width="item.width" header-align="center">
            <template slot-scope="scope">
              <div v-if="scope.column.property === 'roles'">
                <el-tag class="tag" type="primary" close-transition v-for="(tag,index) in scope.row.roles" :key="index">{{tag}}</el-tag>
              </div>
              <div v-else>{{scope.row[scope.column.property] || '无'}}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作"
            header-align="center"
            min-width="150"
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
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="userTotal">
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
      pageindex: 1,
      pagesize: 10,
      userTotal: 100,
      tableData: [
        {
          _id: '5b73efe90adcd5ebd82448c7',
          createTime: '2018-08-30 07:57:27',
          loginTime: '2018-08-30 01:21:33',
          userName: '64567878',
          name: 'lxxf',
          roles: ['admin']
        },
        {
          _id: '5b73efe90adcd5ebd82448c8',
          createTime: '2018-08-30 07:57:27',
          loginTime: '2018-08-30 01:21:33',
          userName: 'zfsd',
          name: '我',
          roles: ['default']
        }
      ],
      headerOptions: [
        {
          label: '用户名',
          width: '100',
          prop: 'userName'
        },
        {
          label: '姓名',
          width: '100',
          prop: 'name'
        },
        {
          label: '权限',
          width: '100',
          prop: 'roles'
        },
        {
          label: '登录时间',
          width: '120',
          prop: 'loginTime'
        }
      ]
    }
  },
  watch: {},
  computed: {},
  methods: {
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
  .adminList {
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
