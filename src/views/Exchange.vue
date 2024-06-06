<template>
  <AppTabs :tabs="tabs" @selectActiveTab="selectActiveTab" />

  <div v-show="activeTab === 'exchange'">
    <p class="block mb-6 text-sm font-medium text-gray-600">
      Manages exchange operations such as buying, selling, or swapping tokens.
    </p>

    <div class="flex gap-4 mb-6 flex-wrap items-end">
      <div class="max-w-sm w-full">
        <label for="strategy" class="block mb-2 text-sm font-medium text-gray-900">Strategy</label>

        <select
          v-model="strategy"
          id="strategy"
          class="block w-full p-2.5 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          :class="!store.state.isInit ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900'"
          :disabled="!store.state.isInit"
          @change="changeStrategy()"
        >
          <option
            v-for="item in strategies"
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
        @click="exchangeGetQuotes()"
        v-tooltip="'Required: sourceCode, sourceAmount, targetCode, strategy'"
      >
        Exchange Get Quotes
      </button>
    </div>

    <div class="flex gap-4 mb-6 items-end">
      <div class="max-w-sm w-full">
        <label for="source" class="block mb-2 text-sm font-medium text-gray-900">Source</label>
        <input
          v-model="source"
          type="text"
          id="source"
          class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          :class="!store.state.isInit ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900'"
          :disabled="!store.state.isInit"
        >
      </div>

      <div class="max-w-sm w-full">
        <label for="amount" class="block mb-2 text-sm font-medium text-gray-900">Amount</label>
        <input
          v-model="amount"
          type="number"
          id="amount"
          class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          :class="!store.state.isInit ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900'"
          :disabled="!store.state.isInit"
        >
      </div>

      <div class="max-w-sm w-full">
        <label for="target" class="block mb-2 text-sm font-medium text-gray-900">Target</label>
        <input
          v-model="target"
          type="text"
          id="target"
          class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          :class="!store.state.isInit ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900'"
          :disabled="!store.state.isInit"
        >
      </div>
    </div>

    <div class="flex gap-4 mb-6 items-end">
      <div class="max-w-sm w-full">
        <label for="service" class="block mb-2 text-sm font-medium text-gray-900">Service</label>

        <select
          v-model="service"
          id="service"
          class="block w-full p-2.5 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          :class="!store.state.isInit || !isSwap ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900'"
          :disabled="!store.state.isInit || !isSwap"
        >
          <option
            v-for="item in services"
            :key="item"
            :disabled="item === 'Select Service'"
            :value="item"
          >
            {{ item }}
          </option>
        </select>
      </div>

      <button
        class="max-h-10 text-white focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 whitespace-nowrap	"
        :class="!store.state.isInit || !isSwap ? 'bg-indigo-300 hover:bg-indigo-500 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'"
        :disabled="!store.state.isInit || !isSwap"
        type="button"
        @click="swapTokens()"
        v-tooltip="'Required: accountId, accountPrivateKey, sourceCode, sourceAmount, targetCode, slippage, serviceId'"
      >
        Swap Tokens
      </button>

      <button
        class="max-h-10 text-white focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 whitespace-nowrap	"
        :class="!store.state.isInit || !isBuy ? 'bg-indigo-300 hover:bg-indigo-500 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'"
        :disabled="!store.state.isInit || !isBuy"
        type="button"
        @click="getTradeUrl()"
        v-tooltip="'Required: strategy, accountId, sourceCode, sourceAmount, targetCode, slippage, serviceId, redirectUrl'"
      >
        Get Trade Url
      </button>
    </div>
  </div>

  <div v-show="activeTab === 'price'">
    <p class="block mb-6 text-sm font-medium text-gray-600">
      Provides functionalities to retrieve the list of coins and their prices.
    </p>

    <div class="flex gap-4 flex-wrap mb-6 items-end">
      <div class="max-w-sm w-full">
        <label for="coinSearch" class="block mb-2 text-sm font-medium text-gray-900">Coin Search</label>
        <input
          v-model="coinSearch"
          type="text"
          id="coinSearch"
          class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          :class="!store.state.isInit ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900'"
          :disabled="!store.state.isInit"
        >
      </div>

      <div class="max-w-sm w-full">
        <label for="currency" class="block mb-2 text-sm font-medium text-gray-900">Currency</label>
        <input
          v-model="currency"
          type="text"
          id="currency"
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
        @click="getCoinPrice()"
        v-tooltip="'Required: search, currency'"
      >
        Get Coin Price
      </button>

      <button
        class="max-h-10 text-white focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 whitespace-nowrap	"
        :class="!store.state.isInit ? 'bg-indigo-300 hover:bg-indigo-500 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'"
        :disabled="!store.state.isInit"
        type="button"
        @click="getCoinList()"
      >
        Get Coin List
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
  import { CryptoFlowServiceStrategy } from "@bladelabs/blade-sdk.js"

  import { ref } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()

  const bladeSDK = BladeService.getInstance()

  const tabs = ref([
    { name: 'Exchange', value: 'exchange' },
    { name: 'Price', value: 'price' }
  ])
  const activeTab = ref(null)

  const output = ref(store.state.output)
  const progress = ref(false)

  const service = ref('Select Service')
  const strategy = ref('Buy')
  const source = ref('EUR')
  const amount = ref(50)
  const target = ref('HBAR')
  const redirectUrl = ref('')
  const currency = ref('eur')

  const isSwap = ref(false)
  const isBuy = ref(false)

  const services = ref(['Select Service'])
  const strategies = ref([
    { name: 'Buy', value: 'Buy' },
    { name: 'Sell', value: 'Sell' },
    { name: 'Swap', value: 'Swap' }
  ])

  const coinSearch = ref(demoConfig.coinSearch)
  const accountId = ref(demoConfig.accountId)
  const privateKey = ref(demoConfig.privateKey)
    
  const selectActiveTab = (value: any) => {
    activeTab.value = value
  }

  const changeStrategy = () => {
    if (strategy.value === 'Buy') {
      source.value = 'EUR'
      amount.value = 50
      target.value = 'HBAR'

      isSwap.value = false
    } else if (strategy.value === 'Sell') {
      source.value = 'USDC'
      amount.value = 30
      target.value = 'PHP'

      isSwap.value = false
      isBuy.value = false
    } else {
      source.value = 'HBAR'
      amount.value = 2
      target.value = 'KARATE'

      isBuy.value = false
    }
  }

  const getStrategyFromValue = (value: any) => {
      switch (value) {
        case 'Buy':
          return CryptoFlowServiceStrategy.BUY
        case 'Sell':
          return CryptoFlowServiceStrategy.SELL
        case 'Swap':
          return CryptoFlowServiceStrategy.SWAP
        default:
          return CryptoFlowServiceStrategy.BUY
      }
    }
  
  const getCoinList = async () => {
    progress.value = true

    try {
      const response = await bladeSDK.getCoinList()

      output.value = response.coins.slice(0, 100)
      
    } catch (error) {
      output.value = error
    }

    progress.value = false
  }

  const getCoinPrice = async () => {
    progress.value = true

    try {
      output.value = await bladeSDK.getCoinPrice(coinSearch.value, currency.value)
    } catch (error) {
      output.value = error
    }

    progress.value = false
  }

  const exchangeGetQuotes = async () => {
    progress.value = true

    services.value = ['Select Service']    

    try {
      output.value = await bladeSDK.exchangeGetQuotes(source.value, amount.value, target.value, getStrategyFromValue(strategy.value))

      output.value.quotes.forEach((quote: any)  => {
        services.value.push(quote.service.id)
      })

      if (services.value.length > 1 && strategy.value === 'Swap') {
        isSwap.value = true
      } else if (services.value.length > 1 && strategy.value === 'Buy') {
        isBuy.value = true
      }

    } catch (error) {
      output.value = error
    }

    progress.value = false
  }

  const swapTokens = async () => {
    progress.value = true

    const slippage = 0.5

    try {
      output.value = await bladeSDK.swapTokens(accountId.value, privateKey.value, source.value, amount.value, target.value, slippage, service.value)
      
    } catch (error) {
      output.value = error
    }

    progress.value = false
  }

  const getTradeUrl = async () => {
    progress.value = true

    const slippage = 0.5

    try {
      output.value = await bladeSDK.getTradeUrl(CryptoFlowServiceStrategy.BUY, accountId.value, source.value, amount.value, target.value, slippage, service.value, redirectUrl.value)
      
    } catch (error) {
      output.value = error
    }

    progress.value = false
  }
</script>
