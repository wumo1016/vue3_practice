<template>
  <div class="wm-transfer">
    <TransferPanel
      type="source"
      :data="sourceData"
      :props="props"
      @checkChange="setCheckedData"
    />
    <div class="wm-transfer__buttons">
      <wm-button
        icon="wm-icon-arrow-left-bold"
        type="primary"
        @click="transferSource"
        :disabled="targetChecked.length < 1"
      ></wm-button>
      <wm-button
        icon="wm-icon-arrow-right-bold"
        type="primary"
        @click="transferTarget"
        :disabled="sourceChecked.length < 1"
      ></wm-button>
    </div>
    <TransferPanel
      type="target"
      :data="targetData"
      :props="props"
      @checkChange="setCheckedData"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import TransferPanel from "./transfer-panel.vue";
import WmButton from "@wm-ui/button";
import { DataItem, Key, Props } from "./transfer.types";

export default defineComponent({
  name: "WmTransfer",
  components: { TransferPanel, WmButton },
  props: {
    data: Array as PropType<DataItem[]>,
    modelValue: Array as PropType<Key[]>,
    props: {
      type: Object as PropType<Props>,
      default: {
        key: "key",
        label: "label",
        disabled: "disabled",
      },
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const propsKey = computed(() => props.props.key);
    // 左侧列表数据
    const sourceData = computed(() => {
      return props.data.filter(
        (v) => !props.modelValue.includes(v[propsKey.value])
      );
    });
    // 右侧列表数据
    const targetData = computed(() => {
      return props.data.filter((v) =>
        props.modelValue.includes(v[propsKey.value])
      );
    });

    let sourceChecked = ref([]);
    let targetChecked = ref([]);
    // 设置左右的选中数据
    const setCheckedData = (type, value) => {
      if (type === "source") {
        sourceChecked.value = value;
      } else {
        targetChecked.value = value;
      }
    };
    // 向右添加数据
    const transferTarget = () => {
      const data = [].concat(
        props.modelValue,
        sourceChecked.value
      );
      emit('update:modelValue', data)
    };
    // 向左添加数据
    const transferSource = () => {
      const data = props.modelValue.filter(v => !targetChecked.value.includes(v))
      emit('update:modelValue', data)
    };

    return {
      sourceData,
      targetData,
      setCheckedData,
      transferTarget,
      transferSource,
      sourceChecked,
      targetChecked,
    };
  },
});
</script>

<style>
</style>