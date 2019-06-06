<template>
  <div>
    <div ref="editor" style="text-align:left"></div>
  </div>
</template>

<script>
import E from 'wangeditor'

export default {
  name: 'editor',
  data () {
    return {
      editor: null
    }
  },
  model: {
    prop: 'editorContent',
    event: 'change'
  },
  mounted () {
    this.editor = new E(this.$refs.editor)
    this.editor.customConfig.onchange = (html) => {
      this.$emit('change', html)
    }
    this.editor.create()
    this.editor.txt.html(this.editorContent)
  },
  props: {
    editorContent: {
      required: true
    }
  },
  watch: {
    editorContent (value) {
      this.editor.txt.html(value)
    }
  }
}
</script>

<style scoped>
</style>
