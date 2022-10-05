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
        :ref="contentEditable"
        contenteditable></div>
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
const contentEditable = ref<HTMLDivElement>()

onMounted(() => {
    console.log(contentEditable.value?.innerText);
})
</script>

<style scoped>

</style>