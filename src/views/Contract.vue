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
          class="text-gray-400 cursor-not-allowed bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          disabled
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
        <label for="message" class="block mb-2 text-sm font-medium text-gray-900">Message</label>
        <input
          v-model="message"
          type="text"
          id="message"
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
        v-tooltip="'Call contract function. Directly or via BladeAPI using paymaster account (fee will be paid by Paymaster account), depending on your dApp configuration.'"
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
          class="text-gray-400 cursor-not-allowed bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          disabled
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
        v-tooltip="'Call query on contract function. Similar to contractCallFunction can be called directly or via BladeAPI using Paymaster account.'"
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
        <label for="message" class="block mb-2 text-sm font-medium text-gray-900">Message</label>
        <input
          v-model="message"
          type="text"
          id="message"
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
        v-tooltip="'Sign base64-encoded message with private key. Returns hex-encoded signature'"
      >
        Sign
      </button>
    </div>

    <div class="flex gap-4 flex-wrap mb-6 items-end">
      <div class="max-w-sm w-full">
        <label for="signedMessage" class="block mb-2 text-sm font-medium text-gray-900">Signature</label>
        <input
          v-model="signedMessage"
          type="text"
          id="signedMessage"
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
        @click="signVerify()"
        v-tooltip="'Verify message signature by public key'"
      >
        Verify
      </button>
    </div>
  </div>

  <AppLinksList :links="links" />

  <AppOutput :data="output" :isLoading="progress" />
</template>

<script lang="ts" setup>
  import AppOutput from '../components/AppOutput.vue'
  import AppTabs from '../components/AppTabs.vue'
  import AppLinksList from '../components/AppLinksList.vue'

  import { demoConfig } from '../config/demoConfig'
  import { BladeService } from '../services/BladeService'
  import { ParametersBuilder } from "@bladelabs/blade-sdk.js"
  import { Buffer } from "buffer"

  import { ref, onMounted } from 'vue'
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
  const returnTypes = ref('string, int32')
  const functionName = ref('set_message')
  const output = ref(store.state.output)
  const progress = ref(false)

  const contractId = ref(demoConfig.contractId)
  const accountId = ref(demoConfig.accountId)
  const privateKey = ref(demoConfig.privateKey)
  const publicKey = ref(demoConfig.publicKey)
  const message = ref(demoConfig.message)
  const signedMessage = ref('')

  const links = ref([
    { url: 'contractcallfunction', name: 'Contract Call' },
    { url: 'contractcallqueryfunction', name: 'Contract Call Query' },
    { url: 'sign', name: 'Sign' },
    { url: 'signverify', name: 'Verify' },
  ])
  
  const selectActiveTab = (value: any) => {
    activeTab.value = value

    if (value === 'contract function call') {
      functionName.value = 'set_message'
    }

    if (value === 'contract function call query') {
      functionName.value = 'get_message'
    }

    getInfo()
  }

  const contractCallFunction = async () => {
    progress.value = true

    const params = new ParametersBuilder().addString(`${message.value} ${new Date().getTime()}`)
    const bladePayFee = false

    try {
      output.value = await bladeSDK.contractCallFunction(contractId.value, 'set_message', params, accountId.value, privateKey.value, gas.value, bladePayFee)
    } catch (error) {
      output.value = error
    }

    progress.value = false
  }

  const contractCallQueryFunction = async () => {
    progress.value = true

    const bladePayFee = false
    const params = new ParametersBuilder()
    const typesArr = returnTypes.value.split(', ')

    try {
      output.value = await bladeSDK.contractCallQueryFunction(contractId.value, 'get_message', params, accountId.value, privateKey.value, gas.value, bladePayFee, typesArr)
    } catch (error) {
      output.value = error
    }

    progress.value = false
  }

  const sign = async () => {
    progress.value = true

    const encodedString = Buffer.from(message.value).toString("base64")

    try {
      output.value = await bladeSDK.sign(encodedString, privateKey.value)
      signedMessage.value = output.value.signedMessage
    } catch (error) {
      output.value = error
    }

    progress.value = false
  }

  const signVerify = async () => {
    progress.value = true

    const encodedString = Buffer.from(message.value).toString("base64")

    try {
      output.value = await bladeSDK.signVerify(encodedString, signedMessage.value, publicKey.value)
    } catch (error) {
      output.value = error
    }

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

  onMounted(() => {
    getInfo()
  })
</script>
