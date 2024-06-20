<template>
  <AppTabs :tabs="tabs" @selectActiveTab="selectActiveTab" />

  <div v-show="activeTab === 'create'">
    <p class="block mb-6 text-sm font-medium text-gray-600">
      This section provides a brief introduction to the Blade SDK demo app, highlighting its purpose and key features.
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
        type="button"
        :class="!store.state.isInit ? 'bg-indigo-300 hover:bg-indigo-500 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'"
        :disabled="!store.state.isInit"
        @click="getAccountInfo()"
      >
        Get Account Info
      </button>
    </div>

    <div class="flex gap-4 flex-wrap mb-6 items-end">
      <button
        class="max-h-10 text-white focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 whitespace-nowrap"
        :class="!store.state.isInit || store.state.isAccount ? 'bg-green-300 hover:bg-green-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'"
        :disabled="!store.state.isInit || store.state.isAccount"
        type="button"
        @click="createAccount()"
      >
        Create Account
      </button>

      <button
        class="max-h-10 text-white focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 whitespace-nowrap"
        type="button"
        :class="!store.state.isInit || !store.state.isAccount ? 'bg-red-300 hover:bg-red-500 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'"
        :disabled="!store.state.isInit || !store.state.isAccount"
        @click="deleteAccount()"
      >
        Delete Account {{ store?.state?.tempAccount?.accountId ? `(${store?.state?.tempAccount?.accountId})` : '' }}
      </button>
    </div>
  </div>

  <div v-show="activeTab === 'import'">
    <p class="block mb-6 text-sm font-medium text-gray-600">
      Facilitates importing an existing account using a private key or mnemonic phrase.
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
        class="max-h-10 text-white focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 whitespace-nowrap	"
        :class="!store.state.isInit ? 'bg-indigo-300 hover:bg-indigo-500 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'"
        :disabled="!store.state.isInit"
        type="button"
        @click="searchAccounts()"
      >
        Search Accounts
      </button>
    </div>
  </div>

  <div v-show="activeTab === 'stake'">
    <p class="block mb-6 text-sm font-medium text-gray-600">
      Enables staking functionalities, including fetching the node list and performing stake/unstake actions.
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
        <label for="stake" class="block mb-2 text-sm font-medium text-gray-900">Select a node</label>

        <select
          v-model="stake"
          id="stake"
          class="block w-full p-2.5 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          :class="store.state.isInit && stakes.length <= 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900'"
          :disabled="store.state.isInit && stakes.length <= 1"
        >
          <option
            v-for="item in stakes"
            :key="item.value"
            :value="item.value"
          >
            {{ item.name }}
          </option>
        </select>
      </div>

      <button
        class="max-h-10 text-white focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 whitespace-nowrap	"
        :class="!store.state.isInit ? 'bg-indigo-300 hover:bg-indigo-500 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'"
        :disabled="!store.state.isInit"
        type="button"
        @click="stakeToNode()"
        v-tooltip="'Stake/unstake account'"
      >
        Stake To Node
      </button>
    </div>

    <div class="flex gap-4 flex-wrap mb-6 items-end">
      <button
          class="max-h-10 text-white focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 whitespace-nowrap	"
          :class="!store.state.isInit ? 'bg-indigo-300 hover:bg-indigo-500 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'"
          :disabled="!store.state.isInit"
          type="button"
          @click="getNodeList()"
        >
          Get Node List
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

  import { ref, onMounted } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()

  const bladeSDK = BladeService.getInstance()

  const output = ref(store.state.output)
  const progress = ref(false)

  const accountId = ref(demoConfig.accountId)
  const mnemonic = ref(demoConfig.mnemonic)

  const stakes = ref([
    { name: 'Unstake', value: '-1' },
  ])
  const stake = ref('-1')
  const tabs = ref([
    { name: 'Create', value: 'create' },
    { name: 'Mnemonic or Private key', value: 'import' },
    { name: 'Stake', value: 'stake' }
  ])
  const activeTab = ref(null)

  const links = ref([
    { url: 'getaccountinfo', name: 'Get Account Info' },
    { url: 'createaccount', name: 'Create Account' },
    { url: 'deleteaccount', name: 'Delete Account' },
    { url: 'searchaccounts', name: 'Search Accounts' },
    { url: 'staketonode', name: 'Stake To Node' },
    { url: 'getnodelist', name: 'Get Node List' },
  ])

  const selectActiveTab = (value: any) => {
    activeTab.value = value

    getInfo()
  }

  const createAccount = async () => {
    progress.value = true

    try {
      output.value = await bladeSDK.createAccount()

      accountId.value = output.value.accountId

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
      output.value = await bladeSDK.deleteAccount(store.state.tempAccount.accountId, store.state.tempAccount.privateKey, demoConfig.accountId, demoConfig.accountId, demoConfig.privateKey)
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
      output.value = await bladeSDK.stakeToNode(accountId.value, demoConfig.privateKey, Number(stake.value))
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

  const getInfo = async () => {
    progress.value = true

    try {
      output.value = await bladeSDK.getInfo()
    } catch (error) {
      output.value = error
    }

    progress.value = false
  }

  onMounted(async() => {
    getInfo()

    if (store.state.isInit) {
      const nodeList = await bladeSDK.getNodeList()
  
      nodeList.nodes.forEach((node: any) => {
        stakes.value.push({
          name: `${node.node_id}: ${node.description}`,
          value: node.node_id
        })
      })
    }
  })
</script>
