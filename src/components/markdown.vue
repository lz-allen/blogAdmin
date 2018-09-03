<template>
  <div class="markdown">
    <div class="title">
      <ul>
        <li>图片</li>
        <li>链接</li>
        <li>代码块</li>
        <li>分割线</li>
        <li>粗体</li>
        <li>斜体</li>
        <li>引用</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {}
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
}

</script>
<style lang="less" scoped>
  .markdown {
    .title{
      text-align: center;
      background-color: #eee;
      border-radius: 5px;
      ul{
        display: flex;
        padding: 0;
        justify-content: space-around;
        li{
          list-style: none;
          cursor: pointer;
          &:hover{
            color: rgb(53, 126, 236);
          }
        }
      }
    }
  }

</style>
