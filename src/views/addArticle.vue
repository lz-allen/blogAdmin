<template>
  <div class="addArticle">
    <h4 class="title">添加文章</h4>
    <div class="form">
      <el-form status-icon :model="articleInfo" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="文章类型" :label-width="formLabelWidth" prop="type">
          <el-select class="select" v-model="articleInfo.type" clearable placeholder="请选择">
              <el-option
                v-for="item in typeArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="文章标题" :label-width="formLabelWidth" prop="title">
          <el-input type="text" v-model="articleInfo.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="文章描述" :label-width="formLabelWidth" prop="desc">
          <el-input type="text" v-model="articleInfo.desc" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="文章内容" :label-width="formLabelWidth" prop="content">
          <markdown></markdown>
        </el-form-item>
        <el-form-item label="发布时间" :label-width="formLabelWidth" prop="publishTime">
    <el-date-picker class="publishTime" v-model="articleInfo.publishTime" type="date" placeholder="选择日期">
    </el-date-picker>
        </el-form-item>
        <el-form-item class="isVisible" label="是否可见" :label-width="formLabelWidth" prop="isVisible">
          <el-switch v-model="articleInfo.isVisible"></el-switch>
        </el-form-item>
    </el-form>
    <el-button type="primary">创建文章</el-button>
    </div>
  </div>
</template>

<script>
import Markdown from '@/components/markdown'
export default {
  components: {
    Markdown
  },
  props: {},
  data() {
    return {
      articleInfo: {
        type: 'JavaScript',
        title: '',
        desc: '',
        content: '',
        publishTime: new Date(),
        isVisible: true
      },
      typeArr: [
        { text: 'HTML', value: 'HTML' },
        { text: 'CSS', value: 'CSS' },
        { text: 'JavaScript', value: 'JavaScript' },
        { text: 'Vue', value: 'Vue' },
        { text: 'Webpack', value: 'Webpack' },
        { text: 'Node', value: 'Node' },
        { text: 'MongoDB', value: 'MongoDB' },
        { text: '服务器相关', value: '服务器相关' }
      ],
      rules: {
        type: [
          {required: true, message: '请选择文章类型', trigger: 'change'}
        ],
        title: [
          { required: true, message: '请填写标题', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请填写详情', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请填写内容', trigger: 'blur' }
        ],
        publishTime: [
          { required: true, message: '请选择文章的发布时间', trigger: 'change', type: 'date' }
        ],
        isVisible: [
          { required: true, message: '请选择', trigger: 'change', type: 'boolean' }
        ]
      },
      formLabelWidth: '120px'
    }
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
}

</script>
<style lang="less" scoped>
  .addArticle {
    display: flex;
    flex-direction: column;
    align-items: center;
    .title{
      width: 100%;
      color: #333;
      margin: 10px 0;
    }
    .form{
      width: 80%;
    }
    .select,.publishTime{
      width: 100%;
    }
    .isVisible{
      text-align: left;
    }
  }

</style>
