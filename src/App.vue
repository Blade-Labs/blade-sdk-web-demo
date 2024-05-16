<template>
  <AppNav />

  <main class="p-8">
    <router-view />

    <AppOutput />
  </main>
</template>

<script setup>
  import AppNav from './components/AppNav.vue'
  import AppOutput from './components/AppOutput.vue'
</script>

<style lang="scss">
#app {
  min-height: 100vh;
}
</style>
