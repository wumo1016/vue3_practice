<template>
  <div class="wm-transfer__panel">
    <div class="title">
      <wm-checkbox
        v-model="allChecked"
        @change="allChange"
        :indeterminate="indeterminate"
        >{{ type === "source" ? "列表一" : "列表二" }}</wm-checkbox
      >
    </div>
    <div class="list">
      <wm-checkbox-group v-model="checked">
        <div v-for="item in data" :key="item[keyProp]">
          <wm-checkbox :label="item[keyProp]" :disabled="item[disabledProp]">
            {{ item[labelProp] }}
          </wm-checkbox>
        </div>
      </wm-checkbox-group>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  reactive,
  toRefs,
  watch,
} from "vue";
import { DataItem, Key, Props } from "./transfer.types";
import WmCheckbox from "@wm-ui/checkbox";
import WmCheckboxGroup from "@wm-ui/checkbox-group";

export default defineComponent({
  name: "WmTransferPanel",
  components: { WmCheckbox, WmCheckboxGroup },
  props: {
    type: String,
    data: {
      type: Array,
      default: [],
    },
    props: Object as PropType<Props>,
  },
  emits: ["check-change"],
  setup(props, { emit }) {
    const keyProp = computed(() => props.props.key);
    const labelProp = computed(() => props.props.label);
    const disabledProp = computed(() => props.props.disabled);
    // 所有可选数据
    const canCheckData = computed(() =>
      props.data.filter((v) => !v[disabledProp.value])
    );

    const panelState = reactive({
      checked: [],
      allChecked: false,
      indeterminate: false,
    });

    // 监控选中的列表
    watch(
      () => panelState.checked,
      (value) => {
        panelState.allChecked = value.length && value.length === canCheckData.value.length;
        panelState.indeterminate =
          value.length && value.length < canCheckData.value.length;
        emit("check-change", props.type, value);
      }
    );

    // 监控传入的列表
    watch(
      () => props.data,
      (value, oldValue) => {
        if (value.length < oldValue.length) {
          panelState.checked = [];
        }
      }
    );
    // 全选按钮事件
    const allChange = (value) => {
      panelState.checked = value
        ? canCheckData.value.map((v) => v[keyProp.value])
        : [];
    };

    return {
      ...toRefs(panelState),
      keyProp,
      labelProp,
      disabledProp,
      allChange,
    };
  },
});
</script>
