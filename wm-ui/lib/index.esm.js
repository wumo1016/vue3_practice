import { defineComponent, openBlock, createBlock, createVNode } from 'vue';

var script$1 = defineComponent({
  name: 'WmButton'
});

const _hoisted_1 = /*#__PURE__*/createVNode("button", null, "按钮", -1 /* HOISTED */);

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div", null, [
    _hoisted_1
  ]))
}

script$1.render = render$1;
script$1.__file = "packages/button/src/button.vue";

script$1.install = (app) => {
    app.component(script$1.name, script$1);
};
const _Button = script$1;

var script = {
    name: 'WmIcon',
    props: {
      name: {
        type: String,
        default: ''
      }
    }
  };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("i", {
    class: `wm-icon-${$props.name}`
  }, null, 2 /* CLASS */))
}

script.render = render;
script.__file = "packages/icon/src/icon.vue";

script.install = (app) => {
    app.component(script.name, script);
};
const _Icon = script;

const components = [
    _Button,
    _Icon
];
const install = (app) => {
    components.forEach(component => {
        app.component(component.name, component);
    });
};
var index = {
    install
};
// 打包esm
// yarn add rollup rollup-plugin-typescript2 @rollup/plugin-node-resolve rollup-plugin-vue -D

export default index;
