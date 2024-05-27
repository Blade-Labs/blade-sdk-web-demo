<template>
  <AppTabs :tabs="tabs" @selectActiveTab="selectActiveTab" />

  <div v-show="activeTab === 'contract function call'">
    <p class="block mb-6 text-sm font-medium text-gray-600">
      Facilitates calling a function on a smart contract, including specifying the contract ID, function name, parameters, and gas requirements.
    </p>

    <div class="flex gap-4 flex-wrap mb-6 items-end">
      <div class="max-w-sm w-full">
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

      <div class="max-w-sm w-full">
        <label for="contractId" class="block mb-2 text-sm font-medium text-gray-900">Contract Id</label>
        <input
          v-model="contractId"
          type="text"
          id="contractId"
          class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          :class="!store.state.isInit ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900'"
          :disabled="!store.state.isInit"
        >
      </div>

      <div class="max-w-sm w-full">
        <label for="functionName" class="block mb-2 text-sm font-medium text-gray-900">Function Name</label>
        <input
          v-model="functionName"
          type="text"
          id="functionName"
          class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          :class="!store.state.isInit ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900'"
          :disabled="!store.state.isInit"
        >
      </div>

      <div class="max-w-sm w-full">
        <label for="contractParams" class="block mb-2 text-sm font-medium text-gray-900">Parameters</label>
        <input
          v-model="contractParams"
          type="text"
          id="contractParams"
          class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          :class="!store.state.isInit ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900'"
          :disabled="!store.state.isInit"
        >
      </div>

      <div class="max-w-sm w-full">
        <label for="gas" class="block mb-2 text-sm font-medium text-gray-900">Gas</label>
        <input
          v-model="gas"
          type="text"
          id="gas"
          class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          :class="!store.state.isInit ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900'"
          :disabled="!store.state.isInit"
        >
      </div>

      <button
        class="max-h-10 text-white focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 whitespace-nowrap"
        :class="!store.state.isInit ? 'bg-indigo-300 hover:bg-indigo-500 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'"
        :disabled="!store.state.isInit"
        type="button"
        @click="contractCallFunction()"
      >
        Contract Call
      </button>
    </div>
  </div>

  <div v-show="activeTab === 'contract function call query'">
    <p class="block mb-6 text-sm font-medium text-gray-600">
      Allows querying a function on a smart contract with specified return types.
    </p>

    <div class="flex gap-4 flex-wrap mb-6 items-end">
      <div class="max-w-sm w-full">
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

      <div class="max-w-sm w-full">
        <label for="contractId" class="block mb-2 text-sm font-medium text-gray-900">Contract Id</label>
        <input
          v-model="contractId"
          type="text"
          id="contractId"
          class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          :class="!store.state.isInit ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900'"
          :disabled="!store.state.isInit"
        >
      </div>

      <div class="max-w-sm w-full">
        <label for="functionName" class="block mb-2 text-sm font-medium text-gray-900">Function Name</label>
        <input
          v-model="functionName"
          type="text"
          id="functionName"
          class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          :class="!store.state.isInit ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900'"
          :disabled="!store.state.isInit"
        >
      </div>

      <div class="max-w-sm w-full">
        <label for="contractParams" class="block mb-2 text-sm font-medium text-gray-900">Parameters</label>
        <input
          v-model="contractParams"
          type="text"
          id="contractParams"
          class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          :class="!store.state.isInit ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900'"
          :disabled="!store.state.isInit"
        >
      </div>

      <div class="max-w-sm w-full">
        <label for="gas" class="block mb-2 text-sm font-medium text-gray-900">Gas</label>
        <input
          v-model="gas"
          type="text"
          id="gas"
          class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          :class="!store.state.isInit ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900'"
          :disabled="!store.state.isInit"
        >
      </div>

      <div class="max-w-sm w-full">
        <label for="returnTypes" class="block mb-2 text-sm font-medium text-gray-900">Types</label>
        <input
          v-model="returnTypes"
          type="text"
          id="returnTypes"
          class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          :class="!store.state.isInit ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900'"
          :disabled="!store.state.isInit"
        >
      </div>

      <button
        class="max-h-10 text-white focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 whitespace-nowrap"
        :class="!store.state.isInit ? 'bg-indigo-300 hover:bg-indigo-500 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'"
        :disabled="!store.state.isInit"
        type="button"
        @click="contractCallQueryFunction()"
      >
        Contract Call Query
      </button>
    </div>
  </div>

  <div v-show="activeTab === 'sign'">
    <p class="block mb-6 text-sm font-medium text-gray-600">
      Provides signing functionalities for messages or transactions, along with verification capabilities.
    </p>

    <div class="flex gap-4 flex-wrap mb-6 items-end">
      <div class="max-w-sm w-full">
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

      <button
        class="max-h-10 text-white focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 whitespace-nowrap"
        :class="!store.state.isInit ? 'bg-indigo-300 hover:bg-indigo-500 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'"
        :disabled="!store.state.isInit"
        type="button"
        @click="sign()"
      >
        Sign
      </button>
      <button
        class="max-h-10 text-white focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 whitespace-nowrap"
        :class="!store.state.isInit ? 'bg-indigo-300 hover:bg-indigo-500 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'"
        :disabled="!store.state.isInit"
        type="button"
        @click="signVerify()"
      >
        Sign Verify
      </button>
    </div>
  </div>

  <AppOutput :data="output" :isLoading="progress" />
</template>

<script lang="ts" setup>
  import AppOutput from '../components/AppOutput.vue'
  import AppTabs from '../components/AppTabs.vue'

  import { demoConfig } from '../config/demoConfig'
  import { BladeService } from '../services/BladeService'

  import { ref } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()

  const bladeSDK = BladeService.getInstance()

  const tabs = ref([
    { name: 'Contract Function Call', value: 'contract function call' },
    { name: 'Contract Function Call Query', value: 'contract function call query' },
    { name: 'Sign', value: 'sign' }
  ])
  const activeTab = ref(null)
  
  const gas = ref(155000)
  const contractParams = ref('')
  const returnTypes = ref('string, int32')
  const functionName = ref('set_message')
  const output = ref(store.state.output)
  const progress = ref(false)

  const contractId = ref(demoConfig.contractId)
  const accountId = ref(demoConfig.accountId)
  const privateKey = ref(demoConfig.privateKey)
  const message = ref(demoConfig.message)
  const mnemonic = ref(demoConfig.mnemonic)
  
  const selectActiveTab = (value) => {
    activeTab.value = value

    if (value === 'contract function call') {
      functionName.value = 'set_message'
    }

    if (value === 'contract function call query') {
      functionName.value = 'get_message'
    }
  }

  const contractCallFunction = async () => {
    // TODO: Need to add ContractFunctionParameters function
    progress.value = true

    const params = '' // ContractFunctionParameters().addString("${binding.editMnemonicMessageSignature.text} ${System.currentTimeMillis()}")
    const bladePayFee = false

    try {
      output.value = await bladeSDK.contractCallFunction(contractId.value, 'set_message', contractParams.value, accountId.value, privateKey.value, gas.value, bladePayFee)
      console.log(output.value);
      
    } catch (error) {
      output.value = error
    }

    progress.value = false
  }

  const contractCallQueryFunction = async () => {
    // TODO: Need to add ContractFunctionParameters function
    progress.value = true

    const params = '' // ContractFunctionParameters()
    const bladePayFee = false

    const typesArr = returnTypes.value.split(',')

    try {
      output.value = await bladeSDK.contractCallQueryFunction(contractId.value, 'get_message', contractParams.value, accountId.value, privateKey.value, gas.value, bladePayFee, typesArr)
    } catch (error) {
      output.value = error
    }

    progress.value = false
  }

  const sign = async () => {
    progress.value = true

    const encodedString = btoa(mnemonic.value)

    try {
      output.value = await bladeSDK.sign(encodedString, privateKey.value)
    } catch (error) {
      output.value = error
    }

    progress.value = false
  }

  const signVerify = async () => {
    // TODO: Need to check error
    progress.value = true

    const encodedString = btoa(message.value)

    try {
      output.value = await bladeSDK.signVerify(encodedString, mnemonic.value, privateKey.value)
    } catch (error) {
      output.value = error
    }

    progress.value = false
  }
</script>
