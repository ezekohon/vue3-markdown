<template>
  <PostWriter :post="post"/>
</template>

<script setup lang="ts">
import PostWriter from '../components/PostWriter.vue';
import { TimelinePost } from '../posts';
import { DateTime } from 'luxon'

const post: TimelinePost = {
    id: "1",
    created: DateTime.now(),
    title: "Post 1",
    markdown: '## Title',
}

</script>

<style scoped>

</style>