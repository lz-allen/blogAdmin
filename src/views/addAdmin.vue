<template>
  <div class="addAdmin">
    <el-form :model="info" status-icon :rules="rules" ref="info" label-width="100px" class="demo-ruleForm">
      <el-form-item label="姓名" prop="name">
        <el-input type="text" v-model="info.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="userName">
        <el-input type="text" v-model="info.userName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="info.pass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="info.checkPass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="权限" prop="roles">
          <el-select
            v-model="info.roles"
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
      <el-form-item>
        <el-button type="primary" @click="submitForm('info')">提交</el-button>
        <el-button @click="resetForm('info')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      info: {
        name: '',
        userName: '',
        pass: '',
        checkPass: '',
        roles: ['default']
      },
      roles: [
        {label: '超级管理员', value: 'admin'},
        {label: '普通管理员', value: 'default'}
      ],
      rules: {
        name: { required: true, message: '请填写姓名', trigger: 'blur' },
        userName: { required: true, message: '请填写用户名', trigger: 'blur' },
        pass: [{
          required: true,
          validator: this.validatePass,
          trigger: 'blur'
        }],
        checkPass: [{
          required: true,
          validator: this.validatePass2,
          trigger: 'blur'
        }],
        roles: [
          { required: true, message: '请选择权限', trigger: 'change', type: 'array' }
        ]
      }
    }
  },
  watch: {},
  computed: {},
  methods: {
    validatePass(rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.info.checkPass !== '') {
          this.$refs.info.validateField('checkPass')
        }
        callback()
      }
    },
    validatePass2(rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.info.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  },
  created() {},
  mounted() {}
}

</script>
<style lang="less" scoped>
  .addAdmin {
    width: 50%;
    .select{
      width: 100%;
    }
  }

</style>
