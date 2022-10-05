
<template>
  <div class="section">
    <div class="container">
      <NavBar></NavBar>
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue'
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
</style>