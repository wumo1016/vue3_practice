import { defineComponent, inject, computed, openBlock, createBlock, createVNode, withDirectives, vModelCheckbox, renderSlot, createTextVNode, toDisplayString } from 'vue';

var script = defineComponent({
    name: 'WmCheckbox',
    props: {
        name: String,
        indeterminate: Boolean,
        checked: Boolean,
        disabled: Boolean,
        modelValue: [String, Boolean, Number],
        label: [String, Boolean, Number],
    },
    emits: ['update:modelValue', 'change'],
    setup(props, { emit, slots }) {
        // 多选组
        const groupOptions = inject('group-data', {});
        const checked = computed(() => {
            const list = groupOptions.modelValue.value;
            return Array.isArray(list) ? list.includes(props.label) : false;
        });
        const changeGroupStatus = (value) => {
            if (groupOptions.name) {
                let ret = [...groupOptions.modelValue.value];
                if (value) {
                    ret.push(props.label);
                }
                else {
                    ret.splice(ret.findIndex((v) => v === props.label), 1);
                }
                groupOptions?.changeEvent(ret);
            }
        };
        const checkValue = computed({
            get() {
                return groupOptions.name ? checked.value : props.modelValue;
            },
            set(value) {
                emit('update:modelValue', value);
                changeGroupStatus(value);
            },
        });
        const change = (e) => {
            const target = e.target;
            const value = target.checked ? true : false;
            emit('change', value);
        };
        const changeStatus = () => {
            if (props.disabled)
                return;
            const value = !checkValue.value;
            emit('update:modelValue', value);
            emit('change', value);
            changeGroupStatus(value);
        };
        return {
            checkValue,
            change,
            changeStatus,
        };
    },
});

const _hoisted_1 = { class: "wm-checkbox" };
const _hoisted_2 = { class: "wm-checkbox__input" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div", _hoisted_1, [
    createVNode("span", _hoisted_2, [
      withDirectives(createVNode("input", {
        type: "checkbox",
        "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (_ctx.checkValue = $event)),
        name: _ctx.name,
        disabled: _ctx.disabled,
        indeterminate: _ctx.indeterminate,
        checked: _ctx.checked,
        onChange: _cache[2] || (_cache[2] = (...args) => (_ctx.change && _ctx.change(...args)))
      }, null, 40 /* PROPS, HYDRATE_EVENTS */, ["name", "disabled", "indeterminate", "checked"]), [
        [vModelCheckbox, _ctx.checkValue]
      ])
    ]),
    createVNode("span", {
      class: "wm-checkbox__label",
      onClick: _cache[3] || (_cache[3] = (...args) => (_ctx.changeStatus && _ctx.changeStatus(...args)))
    }, [
      renderSlot(_ctx.$slots, "default", {}, () => [
        createTextVNode(toDisplayString(_ctx.label), 1 /* TEXT */)
      ])
    ])
  ]))
}

script.render = render;
script.__file = "packages/checkbox/src/checkbox.vue";

script.install = (app) => {
    app.component(script.name, script);
};
const _Checkbox = script;

export default _Checkbox;
