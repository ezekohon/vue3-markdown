<template>
  <Suspense>
    <template #default>
      <Timeline />
    </template>
    <template #fallback>
      <progress class="progress is-primary"/>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import Timeline from '../components/Timeline.vue';
</script>

<style scoped>

</style>