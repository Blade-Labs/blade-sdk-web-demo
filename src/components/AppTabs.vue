<template>
  <ul class="flex flex-wrap gap-2 text-sm font-medium text-center text-gray-500 border-b border-gray-200 mb-6">
    <li
      v-for="tab in tabs"
      :key="tab.value"
    >
      <button 
        class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50"
        :class="{'text-indigo-600 bg-gray-100': isActive === tab.value}"
        @click="selectActiveTab(tab.value)"
      >
        {{ tab.name }}
      </button>

    </li>
</ul>
</template>

<script setup>
  import { ref, onMounted, defineProps, defineEmits } from 'vue'

  const props = defineProps({
    tabs: Array,
  })

  const emit = defineEmits(['selectActiveTab'])

  const isActive = ref(null)

  const selectActiveTab = (tabValue) => {
    props.tabs.forEach((tab) => {
      if (tab.value === tabValue) {
        isActive.value = tabValue

        emit('selectActiveTab', isActive.value)
      }
    })
  }

  onMounted(() => {
    selectActiveTab(props.tabs[0].value)
  })
</script>

<style>

</style>