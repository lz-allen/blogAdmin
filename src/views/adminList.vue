<template>
  <div class="adminList">
    <div class="search">
      <el-input
        placeholder="请输入内容"
        @keyup.enter.native="getUserList"
        v-model="inputVal">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button class="searchBtn" type="primary" :loading="loading" icon="el-icon-search" @click="getUserList">搜索</el-button>
    </div>
    <div class="table">
        <el-table
          :data="userList"
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
              <div v-else-if="scope.column.property === 'loginTime'">{{scope.row[scope.column.property]| formatTime}}</div>
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
        :current-page="currentPage"
        layout="sizes, prev, next, jumper"
        :total="userTotal">
      </el-pagination>
    </div>
    <admin-edit v-if="dialogIsShow" :userInfo="userInfo" @close="close"></admin-edit>
  </div>
</template>

<script>
import AdminEdit from '@/views/adminEdit'
import { mapGetters } from 'vuex'
import formatTime from '@/utils/formatTime'
export default {
  components: {
    AdminEdit
  },
  adminEditIsShow: false,
  props: {},
  data() {
    return {
      inputVal: '',
      dialogIsShow: false,
      pagesize: 10,
      loading: false,
      currentPage: 1,
      userInfo: {},
      headerOptions: [
        {
          label: '用户名',
          width: '80',
          prop: 'username'
        },
        {
          label: '姓名',
          width: '80',
          prop: 'name'
        },
        {
          label: '权限',
          width: '100',
          prop: 'roles'
        },
        {
          label: '登录时间',
          width: '140',
          prop: 'loginTime'
        }
      ]
    }
  },
  filters: {
    formatTime
  },
  watch: {},
  computed: {
    ...mapGetters(['userList', 'userTotal'])
  },
  methods: {
    close() {
      this.dialogIsShow = false
      this.getUserList()
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.getUserList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getUserList()
    },
    handleEdit(index, row) {
      this.dialogIsShow = true
      this.userInfo = JSON.parse(JSON.stringify(row))
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除,是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(async() => {
        let data = await this.$store.dispatch('userDelete', {_id: row._id})
        if (data.data.n) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.userList.splice(index, 1)
        } else {
          this.$message({
            type: 'error',
            message: data.msg
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async getUserList() {
      this.loading = true
      try {
        await this.$store.dispatch('getUserList', {
          keywords: this.inputVal,
          currentPage: this.currentPage,
          pageSize: this.pagesize
        })
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    }
  },
  created() {
    this.getUserList()
  }
}

</script>
<style lang="less" scoped>
  .adminList {
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
