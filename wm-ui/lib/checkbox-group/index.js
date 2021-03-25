import { defineComponent, provide, computed, pushScopeId, popScopeId, openBlock, createBlock, renderSlot, withScopeId } from 'vue';

var script = defineComponent({
    name: 'WmCheckboxGroup',
    props: {
        modelValue: Array
    },
    emits: ['change', 'update:modelValue'],
    setup(props, { emit }) {
        const changeEvent = (vaule) => {
            emit('change', vaule);
            emit('update:modelValue', vaule);
        };
        provide('group-data', {
            name: 'checkboxGroup',
            modelValue: computed(() => props.modelValue),
            changeEvent
        });
        return {};
    },
});

const _withId = /*#__PURE__*/withScopeId("data-v-7289a290");

pushScopeId("data-v-7289a290");
const _hoisted_1 = { class: "wu-checkbox-group" };
popScopeId();

const render = /*#__PURE__*/_withId((_ctx, _cache, $props, $setup, $data, $options) => {
  return (openBlock(), createBlock("div", _hoisted_1, [
    renderSlot(_ctx.$slots, "default")
  ]))
});

script.render = render;
script.__scopeId = "data-v-7289a290";
script.__file = "packages/checkbox/src/checkbox-group.vue";

script.install = (app) => {
    app.component(script.name, script);
};
const _CheckboxGroup = script;

export default _CheckboxGroup;
