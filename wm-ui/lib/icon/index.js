import { openBlock, createBlock } from 'vue';

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

export default _Icon;
