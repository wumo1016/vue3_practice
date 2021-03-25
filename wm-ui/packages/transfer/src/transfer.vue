<template>
  <div class="wm-transfer">
    <TransferPanel :data="sourceData" :props="props" />
    <div class="wm-transfer__buttons">
      <wm-button
        icon="wm-icon-arrow-left-bold"
        type="primary"
      ></wm-button>
      <wm-button
        icon="wm-icon-arrow-right-bold"
        type="primary"
      ></wm-button>
    </div>
    <TransferPanel :data="targetData" :props="props" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import TransferPanel from './transfer-panel.vue'
import WmButton from '@wm-ui/button'
import { DataItem, Key, Props } from './transfer.types'

export default defineComponent({
  name: 'WmTransfer',
  components: { TransferPanel, WmButton },
  props: {
    data: Array as PropType<DataItem[]>,
    modelValue: Array as PropType<Key[]>,
    props: {
      type: Object as PropType<Props>,
      default: {
        key: 'key',
        label: 'label',
        disabled: 'disabled',
      },
    },
  },
  setup(props) {
    const propsKey = computed(() => props.props.key)

    const data = computed(() => {
      return props.data.reduce((memo, current) => {
        memo[current[propsKey.value]] = current
        return memo
      }, {})
    })

    const sourceData = computed(() => {
      return props.data.filter(
        (v) => !props.modelValue.includes(v[propsKey.value])
      )
    })

    const targetData = computed(() => {
      return props.data.filter((v) =>
        props.modelValue.includes(v[propsKey.value])
      )
    })

    // console.log(sourceData.value)
    // console.log(targetData.value)
    return {
      sourceData,
      targetData
    }
  },
})
</script>

<style>
</style>