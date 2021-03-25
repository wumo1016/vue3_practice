<template>
  <div class="wm-transfer__panel">
    <div class="title">列表1</div>
    <div class="list">
      <wm-checkbox-group v-model="checked">
        <div
          v-for="item in data"
          :key="item[props['key']]"
        >
          <wm-checkbox :label="item[props['label']]"></wm-checkbox>
        </div>
      </wm-checkbox-group>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs } from 'vue'
import { DataItem, Key, Props } from './transfer.types'
import WmCheckbox from '@wm-ui/checkbox'
import WmCheckboxGroup from '@wm-ui/checkbox-group'

export default defineComponent({
  name: 'WmTransferPanel',
  components: { WmCheckbox, WmCheckboxGroup },
  props: {
    data: {
      type: Array,
      default: [],
    },
    props: Object as PropType<Props>,
  },
  setup(props) {
    console.log(props.data)

    const panelState = reactive({
      checked: [],
      allChecked: false,
    })

    return {
      ...toRefs(panelState)
    }
  },
})
</script>
