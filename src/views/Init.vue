<template>
  <h1 class="mb-2 text-lg font-semibold text-gray-900 bg-white">
    Welcome to Blade SDK demo app
  </h1>

  <p class="block mb-6 text-sm font-medium text-gray-600">
    This section provides a brief introduction to the Blade SDK demo app, highlighting its purpose and key features.
  </p>

  <div class="block p-6 bg-white border border-gray-200 bg-gray-100 rounded-lg mb-6">
    <p class="mb-4 text-lg font-semibold text-gray-900">
      Init Blade section
    </p>

    <div class="flex gap-4 flex-wrap">
      <div class="flex-grow">
        <label for="apiKey" class="block mb-2 text-sm font-medium text-gray-900">apiKey</label>
        <input
          v-model="apiKey"
          type="text"
          id="apiKey"
          class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          :class="store.state.isInit ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900'"
          :disabled="store.state.isInit"
        >
      </div>

      <div class="flex-grow">
        <label for="newtork" class="block mb-2 text-sm font-medium text-gray-900">Select a Newtork</label>

        <select
          v-model="network"
          id="newtork"
          class="block w-full p-2.5 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          :class="store.state.isInit ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900'"
          :disabled="store.state.isInit"
        >
          <option
            v-for="item in networks"
            :key="item.value"
            :value="item.value"
          >
            {{ item.name }}
          </option>
        </select>
      </div>

      <div class="flex-grow">
        <label for="dAppCode" class="block mb-2 text-sm font-medium text-gray-900">dAppCode</label>
        <input
          v-model="dAppCode"
          type="text"
          id="dAppCode"
          class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          :class="store.state.isInit ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900'"
          :disabled="store.state.isInit"
        >
      </div>

      <div class="flex-grow">
        <label for="sdkEnvironment" class="block mb-2 text-sm font-medium text-gray-900">Select a SdkEnvironment</label>

        <select
          v-model="sdkEnvironment"
          id="sdkEnvironment"
          class="block w-full p-2.5 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          :class="store.state.isInit ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900'"
          :disabled="store.state.isInit"
        >
          <option
            v-for="item in sdkEnvironments"
            :key="item.value"
            :value="item.value"
          >
            {{ item.name }}
          </option>
        </select>
      </div>
    </div>
  </div>

  <div class="block p-6 bg-white border border-gray-200 bg-gray-100 rounded-lg mb-6">
    <p class="mb-4 text-lg font-semibold text-gray-900">
      Demo data section
    </p>

    <div class="flex gap-4 flex-wrap">
      <div class="flex-grow">
        <label for="accountId" class="block mb-2 text-sm font-medium text-gray-900">Account Id</label>
        <input
          v-model="accountId"
          type="text"
          id="accountId"
          class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          :class="store.state.isInit ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900'"
          :disabled="store.state.isInit"
        >
      </div>

      <div class="flex-grow">
        <label for="privateKey" class="block mb-2 text-sm font-medium text-gray-900">Private Key</label>
        <input
          v-model="privateKey"
          type="text"
          id="privateKey"
          class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          :class="store.state.isInit ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900'"
          :disabled="store.state.isInit"
        >
      </div>

      <div class="flex-grow">
        <label for="publicKey" class="block mb-2 text-sm font-medium text-gray-900">Public Key</label>
        <input
          v-model="publicKey"
          type="text"
          id="publicKey"
          class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          :class="store.state.isInit ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900'"
          :disabled="store.state.isInit"
        >
      </div>

      <div class="flex-grow">
        <label for="contractId" class="block mb-2 text-sm font-medium text-gray-900">Contract Id</label>
        <input
          v-model="contractId"
          type="text"
          id="contractId"
          class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          :class="store.state.isInit ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900'"
          :disabled="store.state.isInit"
        >
      </div>

      <div class="flex-grow">
        <label for="tokenId" class="block mb-2 text-sm font-medium text-gray-900">Token Id</label>
        <input
          v-model="tokenId"
          type="text"
          id="tokenId"
          class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          :class="store.state.isInit ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900'"
          :disabled="store.state.isInit"
        >
      </div>
    </div>
  </div>

  <div class="flex justify-end flex-wrap gap-4">
    <button
      type="button"
      class="text-white focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 whitespace-nowrap"
      :class="store.state.isInit ? 'bg-green-300 hover:bg-green-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'"
      :disabled="store.state.isInit"
      @click="initBlade()"
      v-tooltip="'Required: apiKey, network, dAppCode'"
    >
      Init
    </button>
    <button
      class="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 whitespace-nowrap"
      type="button"
      @click="getInfo()"
    >
      Get Info
    </button>
    <button
      class="text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 whitespace-nowrap"
      type="button"
      :class="!store.state.isInit ? 'bg-red-300 hover:bg-red-500 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'"
      :disabled="!store.state.isInit"
      @click="stopBlade()"
    >
      Stop
    </button>
  </div>

  <AppOutput :data="output" :isLoading="progress" />
</template>

<script lang="ts" setup>
  import AppOutput from '../components/AppOutput.vue'

  import { demoConfig } from '../config/demoConfig'
  import { SdkEnvironment } from '@bladelabs/blade-sdk.js'
  import { BladeService } from '../services/BladeService'

  import { ref } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()

  const bladeSDK = BladeService.getInstance()

  const output = ref(store.state.output)
  const progress = ref(false)

  const apiKey = ref(demoConfig.apiKey)
  const network = ref(demoConfig.network)
  const dAppCode = ref(demoConfig.dAppCode)
  const sdkEnvironment = ref(demoConfig.sdkEnvironment)

  const accountId = ref(demoConfig.accountId)
  const privateKey = ref(demoConfig.privateKey)
  const publicKey = ref(demoConfig.publicKey)
  const contractId = ref(demoConfig.contractId)
  const tokenId = ref(demoConfig.tokenId)

  const networks = ref([
    { name: 'Testnet', value: 'Testnet' },
    { name: 'Mainnet', value: 'Mainnet' }
  ])

  const sdkEnvironments = ref([
    { name: 'CI', value: SdkEnvironment.CI },
    { name: 'Prod', value: SdkEnvironment.Prod },
  ])

  const initBlade = async () => {
    progress.value = true

    try {
      output.value = await bladeSDK.init(apiKey.value, network.value, dAppCode.value, '', sdkEnvironment.value)

      store.dispatch('setInit')
    } catch (error) {
      output.value = error
    }
  
    progress.value = false
  }

  const stopBlade = async () => {
    progress.value = true

    output.value = 'Blade stopped'
    store.dispatch('stopBlade')

    progress.value = false
  }

  const getInfo = async () => {
    progress.value = true

    try {
      output.value = await bladeSDK.getInfo()
    } catch (error) {
      output.value = error
    }

    progress.value = false
  }
</script>
