<template>
  <AppTabs :tabs="tabs" @selectActiveTab="selectActiveTab" />

  <div v-show="activeTab === 'transfer'">
    <p class="block mb-6 text-sm font-medium text-gray-600">
      Handles transferring of HBARs and tokens between accounts. Also, it retrieves the current balance.
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

    <div class="flex gap-4 flex-wrap mb-6 items-end">
      <div class="max-w-sm w-full">
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
      <div class="max-w-sm w-full">
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

  </div>

  <div v-show="activeTab === 'create'">
    <p class="block mb-6 text-sm font-medium text-gray-600">
      Allows the creation of new tokens, including fungible tokens and NFTs
    </p>

    <div class="flex gap-4 flex-wrap mb-6 items-end">
      <div class="max-w-sm w-full">
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

      <div class="max-w-sm w-full">
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

    <div class="flex gap-4 flex-wrap mb-6 items-end">
      <div class="max-w-sm w-full">
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
    
      <input
        type="file"
        name="uploadfile"
        id="img"
        style="display:none;"
        accept="image/*"
        @change="selectImage($event)"
      />
      <label
        for="img"
        class="max-h-10 text-white focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 whitespace-nowrap"
        :class="!store.state.isInit || !isCreate ? 'bg-indigo-300 hover:bg-indigo-500 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'"
        :disabled="!store.state.isInit || !isCreate"
      >Select Image</label>

      <button
        class="max-h-10 text-white focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 whitespace-nowrap"
        :class="!store.state.isInit || !isReadyToMint ? 'bg-indigo-300 hover:bg-indigo-500 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'"
        :disabled="!store.state.isInit || !isReadyToMint"
        type="button"
        @click="nftMint()"
      >
        NFT Mint
      </button>
    </div>
  </div>

  <div v-show="activeTab === 'actions'">
    <p class="block mb-6 text-sm font-medium text-gray-600">
      Provides various token-related actions such as retrieving token information, associating tokens with accounts, and dropping tokens.
    </p>

    <div class="flex gap-4 flex-wrap mb-6 items-end">
      <div class="max-w-sm w-full">
        <label for="tokenId2" class="block mb-2 text-sm font-medium text-gray-900">Token Id</label>
        <input
          v-model="tokenId2"
          type="text"
          id="tokenId2"
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
        @click="getTokenInfo()"
      >
        Get Token Info
      </button>
    </div>

    <div class="flex gap-4 flex-wrap mb-7 items-end">
      <div class="max-w-sm w-full">
        <label for="tempAccountId" class="block mb-2 text-sm font-medium text-gray-900">Account Id</label>
        <input
          v-model="tempAccountId"
          type="text"
          id="tempAccountId"
          class="text-gray-400 cursor-not-allowed bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          disabled
        >
      </div>
      
      <button
        class="max-h-10 text-white focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 whitespace-nowrap"
        :class="!store.state.isInit || !store.state.isAccount ? 'bg-indigo-300 hover:bg-indigo-500 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'"
        :disabled="!store.state.isInit || !store.state.isAccount"
        type="button"
        @click="associateToken()"
        v-tooltip="'Need to create account'"
      >
        Associate Token
      </button>

      <button
        class="max-h-10 text-white focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 whitespace-nowrap"
        :class="!store.state.isInit || !store.state.isAccount ? 'bg-indigo-300 hover:bg-indigo-500 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'"
        :disabled="!store.state.isInit || !store.state.isAccount"
        type="button"
        @click="dropTokens()"
        v-tooltip="'Need to create account'"
      >
        Drop Tokens
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
  import { NFTStorageConfig, NFTStorageProvider, KeyRecord, KeyType } from "@bladelabs/blade-sdk.js"

  import { ref, onMounted } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()

  const bladeSDK = BladeService.getInstance()

  const tabs = ref([
    { name: 'Transfer', value: 'transfer' },
    { name: 'Create', value: 'create' },
    { name: 'Actions', value: 'actions' }
  ])
  const activeTab = ref(null)

  const output = ref(store.state.output)
  const progress = ref(false)
  const isReadyToMint = ref(false)
  const isCreate = ref(false)

  const tempAccountId = ref(store.state.tempAccount?.accountId)
  const accountId = ref(demoConfig.accountId)
  const tokenId = ref(demoConfig.tokenId)
  const tokenId2 = ref(demoConfig.tokenId2)
  const privateKey = ref(demoConfig.privateKey)
  const receiver = ref(demoConfig.accountId2)
  const tokenName = ref(demoConfig.tokenName)
  const tokenSymbol = ref(demoConfig.tokenSymbol)
  const privateKey2 = ref(demoConfig.privateKey2)
  const nonce = ref(demoConfig.nonce)
  const amount = ref(1)
  const memo = ref('Test token transfer from WEB')
  const base64Image = ref('')

  const links = ref([
    { url: 'getbalance', name: 'Get Balance' },
    { url: 'transferhbars', name: 'Transfer Hbars' },
    { url: 'transfertokens', name: 'Transfer Tokens' },
    { url: 'createtoken', name: 'Create Token' },
    { url: 'nftmint', name: 'NFT Mint' },
    { url: 'gettokeninfo', name: 'Get Token Info' },
    { url: 'associatetoken', name: 'Associate Token' },
    { url: 'droptokens', name: 'Drop tokens' },
  ])

  const selectActiveTab = (value: any) => {
    activeTab.value = value

    getInfo()
  }

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
    progress.value = true

    const keys: KeyRecord[] = [
      {type: KeyType.admin, privateKey: privateKey2.value}
    ]

    const isNft = true
    const decimals = 0
    const initialSupply = 0
    const maxSupply = 250

    try {
      output.value = await bladeSDK.createToken(accountId.value, privateKey.value, tokenName.value, tokenSymbol.value, isNft, keys, decimals, initialSupply, maxSupply)
      tokenId.value = output.value.tokenId
      isCreate.value = true
    } catch (error) {
      output.value = error
    }

    progress.value = false
  }

  const associateToken = async () => {
    progress.value = true

    try {
      output.value = await bladeSDK.associateToken(tokenId2.value, store.state.tempAccount?.accountId, store.state.tempAccount?.privateKey)
    } catch (error) {
      output.value = error
    }

    progress.value = false
  }

  const selectImage = (event: any) => {
    const file = event.target.files[0]

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
          base64Image.value = e.target.result
          isReadyToMint.value = true
      }

      reader.readAsDataURL(file)
    }
  }

  const nftMint = async () => {
    progress.value = true

    const metaData = {
      name: 'NFTitle',
      score: 10,
      power: 4,
      intelligence: 6,
      speed: 10
    }

    const storageConfig: NFTStorageConfig = {
      provider: NFTStorageProvider.nftStorage,
      apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDZFNzY0ZmM0ZkZFOEJhNjdCNjc1NDk1Q2NEREFiYjk0NTE4Njk0QjYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwNDQ2NDUxODQ2MiwibmFtZSI6IkJsYWRlU0RLLXRlc3RrZXkifQ.t1wCiEuiTvcYOwssdZgiYaug4aF8ZrvMBdkTASojWGU"
    }

    try {
      output.value = await bladeSDK.nftMint(tokenId.value, accountId.value, privateKey.value, base64Image.value, metaData, storageConfig)
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
