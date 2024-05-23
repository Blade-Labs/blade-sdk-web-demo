<template>
  <nav class="bg-white border-gray-200 shadow-md">
    <div class="flex flex-wrap items-center justify-between mx-auto p-8">
      <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img :src="require('../assets/images/logo.svg')" class="h-8" alt="Flowbite Logo" />
      </a>
      <button type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-expanded="false" @click="toggleMenu()">
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
      </button>
      <div
        class="w-full md:block md:w-auto"
        :class="{ 'hidden': !isMenuActive }"
      >
        <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
          <li
            v-for="item in menuItems"
            :key="item.label"
          >
            <RouterLink
              class="block py-2 px-3 rounded text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              :class="{ 'text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:p-0': $route.path === item.url }"
              :to="item.url"
            >
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isDesktop = ref(false)
const isMenuActive = ref(false)
const mobileMenuOpen = ref(false)
const menuItems = ref([
  {
    label: 'Init',
    url: "/",
  },
  {
    label: 'Account',
    url: "/account",
  },
  {
    label: 'Tokens',
    url: "/tokens",
  },
  {
    label: 'Contract',
    url: "/contract",
  },
  {
    label: 'Exchange',
    url: "/exchange",
  }
])

const toggleMenu = () => {
  if (!isDesktop.value) {
    isMenuActive.value = !isMenuActive.value
  }
}

const onResize = () =>  {
  isDesktop.value = window.innerWidth > 768 ? true : false 
}

onMounted(() => {
  window.addEventListener('resize', onResize)
  onResize()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
})
</script>

<style>

</style>