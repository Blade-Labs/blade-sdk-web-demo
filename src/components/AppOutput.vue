<template>
  <div class="mt-8 border border-gray-200 rounded-lg">
    <p class="p-4 border-b border-gray-200"><strong>Output</strong></p>
    <vue-json-pretty  v-if="!isLoading" :data="data" class="bg-gray-100 p-4 text-sm font-mono text-gray-800" />

    <div v-else class="bg-gray-100 p-4 overflow-y-auto">
      <svg class="w-44" version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
          <path fill="rgb(99, 102, 241)" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
            <animateTransform 
              attributeName="transform" 
              attributeType="XML" 
              type="rotate"
              dur="1s" 
              from="0 50 50"
              to="360 50 50" 
              repeatCount="indefinite" />
        </path>
      </svg>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import VueJsonPretty from 'vue-json-pretty'
  import 'vue-json-pretty/lib/styles.css'

  import { defineProps } from 'vue'

  defineProps({
    data: Object,
    isLoading: Boolean
  })
</script>
