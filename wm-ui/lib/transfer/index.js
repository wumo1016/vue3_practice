import { defineComponent, computed, reactive, watch, toRefs, resolveComponent, openBlock, createBlock, createVNode, withCtx, createTextVNode, toDisplayString, Fragment, renderList, ref } from 'vue';
import WmCheckbox from '@wm-ui/checkbox';
import WmCheckboxGroup from '@wm-ui/checkbox-group';
import WmButton from '@wm-ui/button';

var script$1 = defineComponent({
    name: "WmTransferPanel",
    components: { WmCheckbox, WmCheckboxGroup },
    props: {
        type: String,
        data: {
            type: Array,
            default: [],
        },
        props: Object,
    },
    emits: ["check-change"],
    setup(props, { emit }) {
        const keyProp = computed(() => props.props.key);
        const labelProp = computed(() => props.props.label);
        const disabledProp = computed(() => props.props.disabled);
        // 所有可选数据
        const canCheckData = computed(() => props.data.filter((v) => !v[disabledProp.value]));
        const panelState = reactive({
            checked: [],
            allChecked: false,
            indeterminate: false,
        });
        // 监控选中的列表
        watch(() => panelState.checked, (value) => {
            panelState.allChecked = value.length && value.length === canCheckData.value.length;
            panelState.indeterminate =
                value.length && value.length < canCheckData.value.length;
            emit("check-change", props.type, value);
        });
        // 监控传入的列表
        watch(() => props.data, (value, oldValue) => {
            if (value.length < oldValue.length) {
                panelState.checked = [];
            }
        });
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

const _hoisted_1$1 = { class: "wm-transfer__panel" };
const _hoisted_2$1 = { class: "title" };
const _hoisted_3 = { class: "list" };

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_wm_checkbox = resolveComponent("wm-checkbox");
  const _component_wm_checkbox_group = resolveComponent("wm-checkbox-group");

  return (openBlock(), createBlock("div", _hoisted_1$1, [
    createVNode("div", _hoisted_2$1, [
      createVNode(_component_wm_checkbox, {
        modelValue: _ctx.allChecked,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (_ctx.allChecked = $event)),
        onChange: _ctx.allChange,
        indeterminate: _ctx.indeterminate
      }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(_ctx.type === "source" ? "列表一" : "列表二"), 1 /* TEXT */)
        ]),
        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["modelValue", "onChange", "indeterminate"])
    ]),
    createVNode("div", _hoisted_3, [
      createVNode(_component_wm_checkbox_group, {
        modelValue: _ctx.checked,
        "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => (_ctx.checked = $event))
      }, {
        default: withCtx(() => [
          (openBlock(true), createBlock(Fragment, null, renderList(_ctx.data, (item) => {
            return (openBlock(), createBlock("div", {
              key: item[_ctx.keyProp]
            }, [
              createVNode(_component_wm_checkbox, {
                label: item[_ctx.keyProp],
                disabled: item[_ctx.disabledProp]
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(item[_ctx.labelProp]), 1 /* TEXT */)
                ]),
                _: 2 /* DYNAMIC */
              }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["label", "disabled"])
            ]))
          }), 128 /* KEYED_FRAGMENT */))
        ]),
        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["modelValue"])
    ])
  ]))
}

script$1.render = render$1;
script$1.__file = "packages/transfer/src/transfer-panel.vue";

var script = defineComponent({
    name: "WmTransfer",
    components: { TransferPanel: script$1, WmButton },
    props: {
        data: Array,
        modelValue: Array,
        props: {
            type: Object,
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
            return props.data.filter((v) => !props.modelValue.includes(v[propsKey.value]));
        });
        // 右侧列表数据
        const targetData = computed(() => {
            return props.data.filter((v) => props.modelValue.includes(v[propsKey.value]));
        });
        let sourceChecked = ref([]);
        let targetChecked = ref([]);
        // 设置左右的选中数据
        const setCheckedData = (type, value) => {
            if (type === "source") {
                sourceChecked.value = value;
            }
            else {
                targetChecked.value = value;
            }
        };
        // 向右添加数据
        const transferTarget = () => {
            const data = [].concat(props.modelValue, sourceChecked.value);
            emit('update:modelValue', data);
        };
        // 向左添加数据
        const transferSource = () => {
            const data = props.modelValue.filter(v => !targetChecked.value.includes(v));
            emit('update:modelValue', data);
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

const _hoisted_1 = { class: "wm-transfer" };
const _hoisted_2 = { class: "wm-transfer__buttons" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_TransferPanel = resolveComponent("TransferPanel");
  const _component_wm_button = resolveComponent("wm-button");

  return (openBlock(), createBlock("div", _hoisted_1, [
    createVNode(_component_TransferPanel, {
      type: "source",
      data: _ctx.sourceData,
      props: _ctx.props,
      onCheckChange: _ctx.setCheckedData
    }, null, 8 /* PROPS */, ["data", "props", "onCheckChange"]),
    createVNode("div", _hoisted_2, [
      createVNode(_component_wm_button, {
        icon: "wm-icon-arrow-left-bold",
        type: "primary",
        onClick: _ctx.transferSource,
        disabled: _ctx.targetChecked.length < 1
      }, null, 8 /* PROPS */, ["onClick", "disabled"]),
      createVNode(_component_wm_button, {
        icon: "wm-icon-arrow-right-bold",
        type: "primary",
        onClick: _ctx.transferTarget,
        disabled: _ctx.sourceChecked.length < 1
      }, null, 8 /* PROPS */, ["onClick", "disabled"])
    ]),
    createVNode(_component_TransferPanel, {
      type: "target",
      data: _ctx.targetData,
      props: _ctx.props,
      onCheckChange: _ctx.setCheckedData
    }, null, 8 /* PROPS */, ["data", "props", "onCheckChange"])
  ]))
}

script.render = render;
script.__file = "packages/transfer/src/transfer.vue";

script.install = (app) => {
    app.component(script.name, script);
};
const _Transfer = script;

export default _Transfer;
