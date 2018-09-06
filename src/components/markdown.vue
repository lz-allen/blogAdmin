<template>
  <div class="markdown">
    <div class="title">
      <ul>
        <li>图片
          <input class="upFile" type="file" @change="insertImg">
        </li>
        <li @click="maskBol=true">链接</li>
        <li @click="insertCode">代码块</li>
        <li @click="setCursorPosition($refs.text, '***')">分割线</li>
        <li @click="setCursorPosition($refs.text, '****', 2)">粗体</li>
        <li @click="setCursorPosition($refs.text, '**', 1)">斜体</li>
        <li @click="setCursorPosition($refs.text, '> ', 2)">引用</li>
      </ul>
    </div>
    <div class="content">
      <div class="left">
        <textarea class="textarea" v-model="val" ref="text" @input="handleModelInput" @keydown.tab="tabMarkdown"></textarea>
      </div>
      <div class="right hljs" v-html="renderHtml"></div>
    </div>
    <div class="mask" v-show="maskBol" @click="maskBol=false">
      <div class="link-text" @click.stop="">
        <el-input type="text" v-model="link" class="link-input"></el-input>
        <el-button type="primary" @click="insertLink">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import marked from 'marked'
import highlightJs from 'highlight.js'
export default {
  components: {},
  props: {},
  data() {
    return {
      val: '',
      maskBol: false,
      link: 'http://'
    }
  },
  watch: {},
  computed: {
    renderHtml() {
      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true, // 允许 Git Hub标准的markdown.
        tables: true, // 允许支持表格语法。该选项要求 gfm 为true。
        breaks: true, // 允许回车换行。该选项要求 gfm 为true。
        pedantic: false, // 尽可能地兼容 markdown.pl的晦涩部分。不纠正原始模型任何的不良行为和错误。
        sanitize: true, // 对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
        smartLists: true, // 使用比原生markdown更时髦的列表。 旧的列表将可能被作为pedantic的处理内容过滤掉.
        smartypants: false, // 使用更为时髦的标点，比如在引用语法中加入破折号。
        highlight: function(code) {
          return highlightJs.highlightAuto(code).value
        }
      })
      return marked(this.val)
    }
  },
  methods: {
    tabMarkdown(e) { // tab键
      e.preventDefault()
      let indent = '    '
      let start = this.textarea.selectionStart
      let end = this.textarea.selectionEnd
      let selected = window.getSelection().toString()
      selected = indent + selected.replace(/\n/g, '\n' + indent)
      this.textarea.value = this.textarea.value.substring(0, start) + selected + this.textarea.value.substring(end)
      this.textarea.setSelectionRange(start + indent.length, start + selected.length)
    },
    handleModelInput() {
      this.$emit('input', this.val)
    },
    insertImg(e) {
      console.log(e)
      let formData = new FormData()
      let img = ''
      formData.append('markdown_img', e.target.files[0])
      let val = `![图片描述](${img})`
      this.setCursorPosition(this.$refs.text, val, 6)
    },
    insertLink() {
      let linkArr = this.link.split(' ')
      console.log(linkArr)
      let val = ''
      this.maskBol = false
      val = linkArr[1] ? `[${linkArr[1]}](${linkArr[0]})` : `[链接一下](${linkArr[0]})`
      console.log(val)
      this.setCursorPosition(this.$refs.text, val, 5)
      this.link = 'http://'
    },
    insertCode() {
      let val = `
\`\`\`

\`\`\``
      this.setCursorPosition(this.$refs.text, val, val.length - 4)
    },
    setCursorPosition(dom, val, posLen) {
      var cursorPosition = 0
      if (dom.selectionStart) {
        cursorPosition = dom.selectionStart
      }
      this.insertAtCursor(dom, val)
      dom.focus()
      dom.setSelectionRange(dom.value.length, cursorPosition + (posLen || val.length))
      this.val = dom.value
    },
    insertAtCursor(dom, val) { // 光标所在位置插入字符
      let sel
      if (document.selection) {
        dom.focus()
        sel = document.selection.createRange()
        sel.text = val
        sel.select()
      } else if (dom.selectionStart || dom.selectionStart === '0') {
        let startPos = dom.selectionStart
        let endPos = dom.selectionEnd
        let restoreTop = dom.scrollTop
        dom.value = dom.value.substring(0, startPos) + val + dom.value.substring(endPos, dom.value.length)
        if (restoreTop > 0) {
          dom.scrollTop = restoreTop
        }
        dom.focus()
        dom.selectionStart = startPos + val.length
        dom.selectionEnd = startPos + val.length
      } else {
        dom.value += val
        dom.focus()
      }
    }

  },
  created() {},
  mounted() {
    this.textarea = this.$refs.text
  }
}

</script>
<style lang="less" scoped>
  .markdown {
    .title {
      text-align: center;
      background-color: #eee;
      border-radius: 5px;

      ul {
        display: flex;
        padding: 0;
        justify-content: space-around;

        li {
          padding: 0 10px;
          position: relative;
          list-style: none;
          cursor: pointer;

          &:hover {
            color: rgb(53, 126, 236);
          }

          .upFile {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
          }
        }
      }
    }

    .content {
      border: 1px solid #ddd;
      display: flex;

      .left {
        width: 50%;
        height: 500px;
        padding: 10px;
      }

      .right {
        flex: 1;
        height: 500px;
        overflow-y: scroll;
        border-left: 1px solid #ddd;
      }

      .textarea {
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        resize: none;
        padding-right: 10px;
        font-size: 14px;
      }
    }

    .mask {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, .5);
    }

    .link-text {
      width: 500px;
      text-align: center;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);

      .link-input {
        width: 400px;
      }
    }
  }

</style>
