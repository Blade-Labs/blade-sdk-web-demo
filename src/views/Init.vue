<template>
  <div class="home">
    <div class="flex gap-4">
      <div class="flex-grow">
        <label for="apiKey" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">apiKey</label>
        <input type="text" id="apiKey" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      </div>

      <div class="flex-grow">
        <label for="newtork" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a Newtork</label>

        <select id="newtork" class="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
        <label for="dAppCode" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">dAppCode</label>
        <input type="text" id="dAppCode" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      </div>

      <div class="flex-grow">
        <label for="sdkEnvironment" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a SdkEnvironment</label>

        <select id="sdkEnvironment" class="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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

  <div class="flex justify-end gap-4">
    <button
      class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
      type="button"
      @click="initBlade()"
    >
      Init
    </button>
    <button
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
      type="button"
      @click="getInfo()"
    >
      Get Info
    </button>
  </div>
</template>

<script lang="ts" setup>
  import { demoConfig } from '../config/demoConfig'
  import { SdkEnvironment } from '@bladelabs/blade-sdk.js'
  import { BladeService } from '../services/BladeService';

  import { ref } from 'vue'

  const bladeSDK = BladeService.getInstance()

  const output = ref(JSON.stringify(bladeSDK.getInfo(), null, 2))
  const progress = ref(false)

  const apiKey = ref(demoConfig.apiKey)
  const network = ref(demoConfig.network)
  const dAppCode = ref(demoConfig.dAppCode)
  const sdkEnvironment = ref(demoConfig.sdkEnvironment)

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
      output.value = JSON.stringify(
        await bladeSDK.init(apiKey.value, network.value, dAppCode.value, '', sdkEnvironment.value),
        null,
        2
      );
    } catch (error) {
      output.value = `Error:\n${JSON.stringify(error, null, 2)}`;
    }
  
    progress.value = false;
  }

  const getInfo = async () => {
    progress.value = true

    try {
      output.value = JSON.stringify(await bladeSDK.getInfo(), null, 2)
    } catch (error) {
      output.value = JSON.stringify(error, null, 2)
    }

    progress.value = false
  }
</script>
