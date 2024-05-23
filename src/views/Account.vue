<template>
  <div class="flex gap-4 flex-wrap mb-6">
    <div class="flex-grow">
      <label for="accountId" class="block mb-2 text-sm font-medium text-gray-900">Account Id</label>
      <input
        v-model="accountId"
        type="text"
        id="accountId"
        class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        :class="!store.state.isInit ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900'"
        :disabled="!store.state.isInit"
      >
    </div>

    <div class="flex-grow">
      <label for="mnemonic" class="block mb-2 text-sm font-medium text-gray-900">Mnemonic / Message / Signature</label>
      <input
        v-model="mnemonic"
        type="text"
        id="mnemonic"
        class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        :class="!store.state.isInit ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900'"
        :disabled="!store.state.isInit"
      >
    </div>
  </div>

  <div class="flex justify-end gap-4 flex-wrap">
    <button
      class="text-white focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 whitespace-nowrap	"
      :class="!store.state.isInit ? 'bg-green-300 hover:bg-green-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'"
      :disabled="!store.state.isInit"
      type="button"
      @click="createAccount()"
    >
      Create Account
    </button>
    <button
      class="text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 whitespace-nowrap	"
      type="button"
      :class="!store.state.isInit || !store.state.isAccount ? 'bg-blue-300 hover:bg-blue-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'"
      :disabled="!store.state.isInit || !store.state.isAccount"
      @click="getAccountInfo()"
    >
      Get Account Info
    </button>
    <button
      class="text-white focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 whitespace-nowrap	"
      type="button"
      :class="!store.state.isInit || !store.state.isAccount ? 'bg-red-300 hover:bg-red-500 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'"
      :disabled="!store.state.isInit || !store.state.isAccount"
      @click="deleteAccount()"
    >
      Delete Account
    </button>
    <button
      class="text-white focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 whitespace-nowrap	"
      :class="!store.state.isInit ? 'bg-indigo-300 hover:bg-indigo-500 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'"
      :disabled="!store.state.isInit"
      type="button"
      @click="getNodeList()"
    >
      Get Node List
    </button>
    <button
      class="text-white focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 whitespace-nowrap	"
      :class="!store.state.isInit ? 'bg-indigo-300 hover:bg-indigo-500 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'"
      :disabled="!store.state.isInit"
      type="button"
      @click="stakeToNode()"
    >
      Stake To Node
    </button>
    <button
      class="text-white focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 whitespace-nowrap	"
      :class="!store.state.isInit ? 'bg-indigo-300 hover:bg-indigo-500 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'"
      :disabled="!store.state.isInit"
      type="button"
      @click="getKeysFromMnemonic()"
    >
      Get Keys From Mnemonic
    </button>
    <button
      class="text-white focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 whitespace-nowrap	"
      :class="!store.state.isInit ? 'bg-indigo-300 hover:bg-indigo-500 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'"
      :disabled="!store.state.isInit"
      type="button"
      @click="searchAccounts()"
    >
      Search Accounts
    </button>
  </div>

  <AppOutput :data="output" :isLoading="progress" />
</template>

<script lang="ts" setup>
  import AppOutput from '../components/AppOutput.vue'

  import { demoConfig } from '../config/demoConfig'
  import { BladeService } from '../services/BladeService'

  import { ref } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()

  const bladeSDK = BladeService.getInstance()

  const output = ref(store.state.output)
  const progress = ref(false)

  const accountId = ref(demoConfig.accountId)
  const mnemonic = ref(demoConfig.mnemonic)

  const createAccount = async () => {
    progress.value = true

    try {
      output.value = await bladeSDK.createAccount()

      store.dispatch('setTempAccount', output.value)
      store.dispatch('setAccount')
    } catch (error) {
      output.value = error
    }

    progress.value = false;
  }

  const getAccountInfo = async () => {
    progress.value = true

    try {
      output.value = await bladeSDK.getAccountInfo(accountId.value)
    } catch (error) {
      output.value = error
    }

    progress.value = false
  }

  const deleteAccount = async () => {
    progress.value = true

    try {
      output.value = await bladeSDK.deleteAccount(store.state.tempAccount.accountId, store.state.tempAccount.value.privateKey, accountId.value, accountId.value, demoConfig.privateKey)
      store.dispatch('setTempAccount', null)
    } catch (error) {
      output.value = error
    }

    progress.value = false
  }

  const getNodeList = async () => {
    progress.value = true

    try {
      output.value = await bladeSDK.getNodeList()
    } catch (error) {
      output.value = error
    }

    progress.value = false
  }

  const stakeToNode = async () => {
    progress.value = true

    try {
      output.value = await bladeSDK.getNodeList()
    } catch (error) {
      output.value = error
    }

    progress.value = false
  }

  const getKeysFromMnemonic = async () => {
    progress.value = true

    try {
      output.value = await bladeSDK.getNodeList()
    } catch (error) {
      output.value = error
    }

    progress.value = false
  }

  const searchAccounts = async () => {
    progress.value = true

    try {
      output.value = await bladeSDK.searchAccounts(mnemonic.value)
    } catch (error) {
      output.value = error
    }

    progress.value = false
  }

  // const setUpdatedData = (key, value) => {
  //   Object.keys(output.value).forEach(key_obj => {
  //     if (key_obj === key) {
  //       output.value[key] = value

  //       store.dispatch('setAccountOutput', output.value)
  //     }
  //   })
  // }
</script>
