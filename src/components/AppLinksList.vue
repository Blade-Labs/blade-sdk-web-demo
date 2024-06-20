<template>
  <div class="block bg-white border border-gray-200 bg-gray-100 rounded-lg">
    <h2 class="p-4 text-lg font-semibold text-white bg-indigo-500 rounded-t-lg">{{ title }}</h2>

    <ul class="p-4 w-fit">
      <li
        v-for="(link, index) in links"
        :key="index"
      >
        <a
          :href="`https://docs.bladelabs.io/docs#${link.url}`"
          target="_blank"
          class="text-indigo-500 font-medium flex items-center mb-1 hover:underline"
          rel="noopener noreferrer"
        >
          {{ link.name }}

          <svg class="h-2 ml-1" xmlns="http://www.w3.org/2000/svg" fill="#6366f1" viewBox="0 0 512 512"><path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"/></svg>
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
  import { defineProps } from 'vue'

  defineProps({
    title: {
      type: String,
      default: 'Reach out more in documentation:'
    },
    links: Array,
  })
</script>

<style lang="scss" scoped>
  a {
    width: fit-content;
  }
</style>