<template>
  <div>
    <div ref="editor" style="text-align:left"></div>
  </div>
</template>

<script>
import E from 'wangeditor'

export default {
  name: 'editor',
  model: {
    prop: 'editorContent',
    event: 'change'
  },
  mounted () {
    var editor = new E(this.$refs.editor)
    editor.customConfig.onchange = (html) => {
      this.$emit('change', html)
    }
    editor.create()
    console.log(this.editorContent)
    editor.txt.html(this.editorContent)
  },
  props: {
    editorContent: {
      required: true
    }
  }
}
</script>

<style scoped>
</style>
