<template>
  <div>
    <div ref="editor" style="text-align:left"></div>
  </div>
</template>

<script>
import Editor from 'wangeditor'

export default {
  name: 'editor',
  data () {
    return {
      editorContent: ''
    }
  },
  mounted () {
    var editor = new Editor(this.$refs.editor)
    editor.customConfig.onchange = (html) => {
      this.editorContent = html
    }
    editor.create()
  }
}
</script>

<style scoped>
</style>
