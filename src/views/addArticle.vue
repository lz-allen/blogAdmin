<template>
  <div class="addArticle">
    <slot name="title">
       <h4 class="title">添加文章</h4>
    </slot>
    <div class="form">
      <el-form status-icon :model="articleInfo" :rules="rules" ref="forms" label-width="100px">
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
        <el-form-item label="缩略图" :label-width="formLabelWidth" prop="img">
          <div class="imgWrap" v-show="articleInfo.src">
            <img :src="articleInfo.src" alt="">
              <el-button type="danger" icon="el-icon-delete" @click="deleteImg"></el-button>
          </div>
          <input v-show="!articleInfo.src" accept="image/png,image/gif,image/jpeg" type="file" @change="insertImg">
        </el-form-item>
        <el-form-item label="文章内容" :label-width="formLabelWidth">
          <markdown @content="getContent" :textVal="articleInfo.textVal" ref="markdown"></markdown>
        </el-form-item>
        <el-form-item label="发布时间" :label-width="formLabelWidth" prop="publishTime">
    <el-date-picker class="publishTime" v-model="articleInfo.publishTime" type="date" placeholder="选择日期">
    </el-date-picker>
        </el-form-item>
        <el-form-item class="isVisible" label="是否可见" :label-width="formLabelWidth" prop="isVisible">
          <el-switch v-model="articleInfo.isVisible"></el-switch>
        </el-form-item>
    </el-form>
    <el-button class="btn" type="primary" :loading="loanding" @click="submit('forms')">
      <slot name="btn">创建文章</slot>
    </el-button>
    </div>
  </div>
</template>

<script>
import Markdown from '@/components/markdown'
export default {
  components: {
    Markdown
  },
  props: ['article'],
  data() {
    return {
      articleInfo: {
        type: 'JavaScript',
        title: '',
        desc: '',
        textVal: '',
        src: '',
        markdown: '',
        total: 0,
        comment: [],
        publishTime: new Date(),
        isVisible: true
      },
      loanding: false,
      typeArr: [],
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
        publishTime: [
          { required: true, message: '请选择文章的发布时间', trigger: 'change' }
        ],
        isVisible: [
          { required: true, message: '请选择', trigger: 'change', type: 'boolean' }
        ]
      },
      formLabelWidth: '100px'
    }
  },
  watch: {},
  computed: {},
  methods: {
    getContent(obj) {
      this.articleInfo.textVal = obj.textVal
      this.articleInfo.markdown = obj.markdown
    },
    getType() {
      this.$store.dispatch('getType').then(res => {
        this.typeArr = res.data
      })
    },
    async insertImg(e) {
      let formData = new FormData()
      formData.append('markdown_img', e.target.files[0])
      try {
        let data = await this.$store.dispatch('markdown_uploadImg', formData)
        if (data.data.markdown_img) {
          this.$message({
            type: 'success',
            message: '上传成功'
          })
        }
        this.articleInfo.src = data.data.markdown_img
      } catch (error) {
        this.$message({
          type: 'error',
          message: error
        })
      }
    },
    async deleteImg() {
      let filename = this.articleInfo.src.split('/')[5]
      try {
        let data = await this.$store.dispatch('markdown_deleteImg', { filename })
        if (data.data.code) {
          this.$message({
            type: 'success',
            message: '文件删除成功'
          })
          this.articleInfo.src = ''
        }
      } catch (error) {
        this.$message({
          type: 'error',
          message: error
        })
      }
    },
    setArticleInfo() {
      if (this.article) {
        for (const [key, value] of Object.entries(this.article)) {
          if (key === 'publishTime') {
            this.articleInfo[key] = new Date()
          }
          this.articleInfo[key] = value
        }
      }
    },
    submit(formName) {
      this.loanding = true
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          // 触发markdown组件的方法，使得父组件接收参数
          this.$refs.markdown.handleModelInput()
          if (this.article) {
            let data = await this.$store.dispatch('updateArticle', this.articleInfo)
            if (data.data.n) {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
            }
            this.loanding = false
            return
          }
          let data = await this.$store.dispatch('addArticle', this.articleInfo)
          if (data.data._id) {
            this.$message({
              type: 'success',
              message: '添加成功'
            })
            this.loanding = false
          }
        }
      })
    }
  },
  created() {
    this.getType()
    this.setArticleInfo()
  },
  mounted() {
  }
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
      width: 100%;
      .imgWrap{
        width: 12rem;
        height: 6rem;
        overflow: hidden;
        display: flex;
        justify-content: space-between;
        align-items: center;
        img{
          width: 6rem;
          height: 6rem;
        }
      }
    }
    .select,.publishTime{
      width: 100%;
    }
    .isVisible{
      text-align: left;
    }
  }

</style>
