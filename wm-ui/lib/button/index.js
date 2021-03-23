import { defineComponent, openBlock, createBlock, createVNode } from 'vue';

var script = defineComponent({
  name: 'WmButton'
});

const _hoisted_1 = /*#__PURE__*/createVNode("button", null, "按钮", -1 /* HOISTED */);

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div", null, [
    _hoisted_1
  ]))
}

script.render = render;
script.__file = "packages/button/src/button.vue";

script.install = (app) => {
    app.component(script.name, script);
};
const _Button = script;

export default _Button;
