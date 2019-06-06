<template>
  <div id="wangeditor">
    <div ref="editor" style="text-align:left"></div>
  </div>
</template>

<script>
import E from 'wangeditor'

export default {
  name: 'editor',
  data () {
    return {
      editor: null,
      editorContent: ''
    }
  },
  mounted () {
    this.editor = new E(this.$refs.editor)
    this.editor.customConfig.onchange = (html) => {
      this.editorContent = html
      this.catchData(this.editorContent)
    }
    this.editor.create()
    console.log(this.init)
    this.editor.txt.html(this.init)
  },
  props: ['catchData', 'init'],
  watch: {
    content () {
      this.editor.txt.html(this.init)
    }
  }
}
</script>

<style scoped>
</style>
