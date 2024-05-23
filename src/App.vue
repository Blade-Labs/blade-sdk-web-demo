<template>
  <AppNav />

  <main class="p-8">
    <router-view />
  </main>
</template>

<script setup>
  import AppNav from './components/AppNav.vue'
</script>

<style lang="scss">
#app {
  min-height: 100vh;
}
</style>
