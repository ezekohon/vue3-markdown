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
      {{ content }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { TimelinePost } from '../posts';
import { ref, onMounted } from 'vue'

const props = defineProps<{
    post: TimelinePost
}>()

const title = ref(props.post.title)
const content = ref(props.post.markdown)
const contentEditable = ref<HTMLDivElement>()

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