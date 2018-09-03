<template>
  <div class="adminEdit">
    <el-dialog title="管理员编辑" :visible.sync="dialogFormVisible" center @close="close">
      <el-form :model="userInfo" :rules="rules" ref="form">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="userName">
          <el-input type="text" v-model="userInfo.userName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input type="text" v-model="userInfo.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="原密码" :label-width="formLabelWidth" prop="oldPwd">
          <el-input type="password" v-model="userInfo.oldPwd" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth" prop="pwd">
          <el-input type="password" v-model="userInfo.pwd" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限" :label-width="formLabelWidth" prop="roles">
           <el-select
              v-model="userInfo.roles"
              multiple
              default-first-option
              placeholder="请选择权限标签"
              class="select"
            >
              <el-option
                v-for="item in roles"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('form')" :loading="loading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  props: ['userInfo'],
  data() {
    return {
      roles: [
        {label: '超级管理员', value: 'admin'},
        {label: '普通管理员', value: 'default'}
      ],
      rules: {
        userName: [
          { required: true, message: '请填写用户名', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请填写姓名', trigger: 'blur' }
        ],
        oldPwd: [
          { required: true, message: '请填写原密码', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请填写密码', trigger: 'blur' }
        ],
        roles: [
          { required: true, message: '请选择权限', trigger: 'change', type: 'array' }
        ]
      },
      formLabelWidth: '120px',
      dialogFormVisible: true,
      loading: false
    }
  },
  watch: {},
  computed: {},
  methods: {
    close() {
      this.$emit('close')
    },
    submitForm(formName) {
      this.loading = true
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          try {
            setTimeout(() => {
              this.loading = false
              this.close()
              this.$router.push('/adminList')
            }, 1000)
          } catch (e) {
            this.loading = false
          }
        } else {
          this.loading = false
          return false
        }
      })
    }
  },
  created() {},
  mounted() {}
}

</script>
<style lang="less" scoped>
  .adminEdit {
     text-align: center;
     padding: 0 100px;
    .select{
      width: 100%;
    }
  }

</style>
