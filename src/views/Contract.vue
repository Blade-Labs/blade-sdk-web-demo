<template>
  <div class="flex gap-4 flex-wrap mb-6 items-end">
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
      class="max-h-10 text-white focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 whitespace-nowrap"
      :class="!store.state.isInit ? 'bg-indigo-300 hover:bg-indigo-500 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'"
      :disabled="!store.state.isInit"
      type="button"
      @click="contractCallFunction()"
    >
      Contract Call
    </button>

    <button
      class="max-h-10 text-white focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 whitespace-nowrap"
      :class="!store.state.isInit ? 'bg-indigo-300 hover:bg-indigo-500 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'"
      :disabled="!store.state.isInit"
      type="button"
      @click="contractCallQueryFunction()"
    >
      Contract Call Query
    </button>
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

  const contractId = ref(demoConfig.contractId)
  const accountId = ref(demoConfig.accountId)
  const privateKey = ref(demoConfig.privateKey)
  const message = ref(demoConfig.message)
  const mnemonic = ref(demoConfig.mnemonic)
  

  const contractCallFunction = async () => {
    // TODO: Need to add ContractFunctionParameters function
    progress.value = true

    const params = '' // ContractFunctionParameters().addString("${binding.editMnemonicMessageSignature.text} ${System.currentTimeMillis()}")
    const gas = 155000
    const bladePayFee = false

    try {
      output.value = await bladeSDK.contractCallFunction(contractId.value, 'set_message', params, accountId.value, privateKey.value, gas, bladePayFee)
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
    const gas = 155000
    const bladePayFee = false
    const returnTypes = ['string', 'int32']

    try {
      output.value = await bladeSDK.contractCallQueryFunction(contractId.value, 'get_message', params, accountId.value, privateKey.value, gas, bladePayFee, returnTypes)
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
