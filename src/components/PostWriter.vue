<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">Post title</div>
        <input
          v-model="title"
          type="text"
          class="input">
        {{ title }}
      </div>

      <div
        ref="contentEditable"
        contenteditable></div>
    </div>
  </div>
  <div class="columns">
    <div class="column">
      <div
        ref="contentEditable"
        contenteditable
        @input="handleInput" 
      />
    </div>
    <div class="column">
      <div v-html="html"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TimelinePost } from '../posts';
import { ref, onMounted, watch, watchEffect } from 'vue'
import { marked } from "marked"
import highlightjs from "highlight.js"
const props = defineProps<{
    post: TimelinePost
}>()

const title = ref(props.post.title)
const content = ref(props.post.markdown)
const html = ref('')
const contentEditable = ref<HTMLDivElement>()

watch(content, (newContent) => {
  marked.parse(newContent, {
    gfm: true,
    breaks: true,
    highlight: (code) => {
      return highlightjs.highlightAuto(code).value
    }
  }, (err, parseResult) => {
    html.value = parseResult
  })
}, {immediate: true})

onMounted(() => {
    if (!contentEditable.value) {
        throw Error('ContentEditable DOM was not found.')
    }
    contentEditable.value.innerText = content.value
})

function handleInput() {
    if (!contentEditable.value) {
        throw Error('ContentEditable DOM was not found.')
    }
    content.value = contentEditable.value.innerText
}


</script>

<style scoped>

</style>