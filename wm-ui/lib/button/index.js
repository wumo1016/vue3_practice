import { defineComponent, computed, openBlock, createBlock, createCommentVNode, createVNode, renderSlot } from 'vue';

var script = defineComponent({
    name: 'WmButton',
    props: {
        type: {
            type: String,
            default: '',
            validator: (v) => {
                return [
                    'primary',
                    'warning',
                    'danger',
                    'default',
                    'info',
                    'success',
                ].includes(v);
            },
        },
        icon: {
            type: String,
            default: '',
        },
        disabled: Boolean,
        loading: Boolean,
        round: Boolean,
    },
    emits: ['click'],
    setup(props, ctx) {
        // console.log(props.disabled);
        const classs = computed(() => {
            return [
                'wm-button',
                `wm-button--${props.type}`,
                {
                    'is-disabled': props.disabled,
                    'is-loading': props.loading,
                    'is-round': props.round,
                },
            ];
        });
        const handleClick = (e) => {
            ctx.emit('click', e);
        };
        return {
            classs,
            handleClick,
        };
    },
});

const _hoisted_1 = {
  key: 1,
  class: "wm-icon-loading"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("button", {
    class: _ctx.classs,
    onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.handleClick && _ctx.handleClick(...args))),
    disabled: _ctx.disabled
  }, [
    (_ctx.icon && !_ctx.loading)
      ? (openBlock(), createBlock("i", {
          key: 0,
          class: _ctx.icon
        }, null, 2 /* CLASS */))
      : createCommentVNode("v-if", true),
    (_ctx.loading)
      ? (openBlock(), createBlock("i", _hoisted_1))
      : createCommentVNode("v-if", true),
    createVNode("span", null, [
      renderSlot(_ctx.$slots, "default")
    ])
  ], 10 /* CLASS, PROPS */, ["disabled"]))
}

script.render = render;
script.__file = "packages/button/src/button.vue";

script.install = (app) => {
    app.component(script.name, script);
};
const _Button = script;

export default _Button;
