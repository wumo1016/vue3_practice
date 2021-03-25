import { defineComponent, pushScopeId, popScopeId, openBlock, createBlock, renderSlot, withScopeId } from 'vue';

var script = defineComponent({
    name: 'WmButtonGroup',
    setup() {
        return {};
    }
});

const _withId = /*#__PURE__*/withScopeId("data-v-3d8661d0");

pushScopeId("data-v-3d8661d0");
const _hoisted_1 = { class: "wm-button-group" };
popScopeId();

const render = /*#__PURE__*/_withId((_ctx, _cache, $props, $setup, $data, $options) => {
  return (openBlock(), createBlock("div", _hoisted_1, [
    renderSlot(_ctx.$slots, "default")
  ]))
});

script.render = render;
script.__scopeId = "data-v-3d8661d0";
script.__file = "packages/button/src/button-group.vue";

script.install = (app) => {
    app.component(script.name, script);
};
const _ButtonGroup = script;

export default _ButtonGroup;
