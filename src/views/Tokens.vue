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

    <button
      class="max-h-10 text-white focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 whitespace-nowrap"
      :class="!store.state.isInit ? 'bg-indigo-300 hover:bg-indigo-500 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'"
      :disabled="!store.state.isInit"
      type="button"
      @click="getBalance()"
    >
      Get Balance
    </button>
  </div>

  <div class="flex gap-4 mb-6 flex-wrap items-end">
    <div class="flex-grow">
      <label for="receiver" class="block mb-2 text-sm font-medium text-gray-900">Receiver</label>
      <input
        v-model="receiver"
        type="text"
        id="receiver"
        class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        :class="!store.state.isInit ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900'"
        :disabled="!store.state.isInit"
      >
    </div>
    <div class="flex-grow">
      <label for="amount" class="block mb-2 text-sm font-medium text-gray-900">Amount</label>
      <input
        v-model="amount"
        type="text"
        id="amount"
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
      @click="transferHbars()"
    >
      Transfer Hbars
    </button>
    <button
      class="max-h-10 text-white focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 whitespace-nowrap"
      :class="!store.state.isInit ? 'bg-indigo-300 hover:bg-indigo-500 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'"
      :disabled="!store.state.isInit"
      type="button"
      @click="transferTokens()"
    >
      Transfer Tokens
    </button>
  </div>

  <div class="flex gap-4 mb-6 items-end">
    <div class="flex-grow">
      <label for="tokenName" class="block mb-2 text-sm font-medium text-gray-900">Token Name</label>
      <input
        v-model="tokenName"
        type="text"
        id="tokenName"
        class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        :class="!store.state.isInit ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900'"
        :disabled="!store.state.isInit"
      >
    </div>

    <div class="flex-grow">
      <label for="tokenSymbol" class="block mb-2 text-sm font-medium text-gray-900">Token Symbol</label>
      <input
        v-model="tokenSymbol"
        type="text"
        id="tokenSymbol"
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
      @click="createToken()"
    >
      Create Token
    </button>
  </div>

  <div class="flex gap-4 mb-6 items-end">
    <div class="flex-grow">
      <label for="tokenId" class="block mb-2 text-sm font-medium text-gray-900">Token Id</label>
      <input
        v-model="tokenId"
        type="text"
        id="tokenId"
        class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        :class="!store.state.isInit ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900'"
        :disabled="!store.state.isInit"
      >
    </div>
   
    <input type="file" name="uploadfile" id="img" style="display:none;"/>
    <label
      for="img"
      class="max-h-10 text-white focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 whitespace-nowrap"
      :class="!store.state.isInit ? 'bg-indigo-300 hover:bg-indigo-500 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'"
      :disabled="!store.state.isInit"
    >Click me to upload image</label>

    <button
      class="max-h-10 text-white focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 whitespace-nowrap"
      :class="!store.state.isInit ? 'bg-indigo-300 hover:bg-indigo-500 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'"
      :disabled="!store.state.isInit"
      type="button"
      @click="nftMint()"
    >
      NFT Mint
    </button>
  </div>



  <div class="flex justify-end gap-4 flex-wrap">
    <button
      class="max-h-10 text-white focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 whitespace-nowrap"
      :class="!store.state.isInit ? 'bg-indigo-300 hover:bg-indigo-500 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'"
      :disabled="!store.state.isInit"
      type="button"
      @click="getTokenInfo()"
    >
      Get Token Info
    </button>

    <button
      class="max-h-10 text-white focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 whitespace-nowrap"
      :class="!store.state.isInit || !isMint ? 'bg-indigo-300 hover:bg-indigo-500 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'"
      :disabled="!store.state.isInit || !isMint"
      type="button"
      @click="associateToken()"
    >
      Associate Token
    </button>

    <button
      class="max-h-10 text-white focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 whitespace-nowrap"
      :class="!store.state.isInit || !store.state.isAccount ? 'bg-indigo-300 hover:bg-indigo-500 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'"
      :disabled="!store.state.isInit || !store.state.isAccount"
      type="button"
      @click="dropTokens()"
    >
      Drop Tokens
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
  const isMint = ref(false)

  const accountId = ref(demoConfig.accountId)
  const tokenId = ref(demoConfig.tokenId)
  const privateKey = ref(demoConfig.privateKey)
  const receiver = ref(demoConfig.accountId2)
  const tokenName = ref(demoConfig.tokenName)
  const tokenSymbol = ref(demoConfig.tokenSymbol)
  const privateKey2Account = ref(demoConfig.privateKey2Account)
  const privateKey2 = ref(demoConfig.privateKey2)
  const nonce = ref(demoConfig.nonce)
  const amount = ref(1)
  const memo = ref('Test token transfer from WEB')

  const getBalance = async () => {
    progress.value = true

    try {
      output.value = await bladeSDK.getBalance(accountId.value)
    } catch (error) {
      output.value = error
    }

    progress.value = false
  }

  const transferHbars = async () => {
    progress.value = true

    try {
      output.value = await bladeSDK.transferHbars(accountId.value, privateKey.value, receiver.value, String(amount.value), memo.value)
    } catch (error) {
      output.value = error
    }

    progress.value = false
  }

  const transferTokens = async () => {
    progress.value = true

    try {
      output.value = await bladeSDK.transferTokens(tokenId.value, accountId.value, privateKey.value, receiver.value, String(amount.value), memo.value)
    } catch (error) {
      output.value = error
    }

    progress.value = false
  }

  const createToken = async () => {
    // progress.value = true

    // const keys = listOf(
    //   KeyRecord(Config.privateKey2, KeyType.admin)
    // )

    // try {
    //   console.log(accountId.value);
      
    //   output.value = await bladeSDK.createToken(accountId.value, privateKey.value, tokenName.value, tokenSymbol.value, true, )
    // } catch (error) {
    //   output.value = error
    // }

    // progress.value = false
  }

  const associateToken = async () => {
    progress.value = true

    try {
      output.value = await bladeSDK.associateToken(tokenId.value, privateKey2Account.value, privateKey2.value)
    } catch (error) {
      output.value = error
    }

    progress.value = false
  }

  const nftMint = async () => {
    // Need to finish it
    progress.value = true

    const metaData = {
      name: 'NFTitle',
      score: 10,
      power: 4,
      intelligence: 6,
      speed: 10
    }

    // storageConfig = NFTStorageConfig(
    //     provider = NFTStorageProvider.nftStorage,
    //     apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDZFNzY0ZmM0ZkZFOEJhNjdCNjc1NDk1Q2NEREFiYjk0NTE4Njk0QjYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwNDQ2NDUxODQ2MiwibmFtZSI6IkJsYWRlU0RLLXRlc3RrZXkifQ.t1wCiEuiTvcYOwssdZgiYaug4aF8ZrvMBdkTASojWGU"
    // ),

    try {
      output.value = await bladeSDK.nftMint(accountId.value, privateKey.value, metaData)

      isMint.value = true
    } catch (error) {
      output.value = error
    }

    progress.value = false
  }

  const getTokenInfo = async () => {
    progress.value = true

    try {
      output.value = await bladeSDK.getTokenInfo(tokenId.value)
    } catch (error) {
      output.value = error
    }

    progress.value = false
  }

  const dropTokens = async () => {
    progress.value = true

    try {
      output.value = await bladeSDK.dropTokens(store.state.tempAccount?.accountId, store.state.tempAccount?.privateKey, nonce.value)
    } catch (error) {
      output.value = error
    }

    progress.value = false
  }
</script>
