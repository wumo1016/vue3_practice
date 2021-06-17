/*
 * @Descripttion:
 * @Author: wyb
 * @LastEditors: wyb
 * @LastEditTime: 2021-06-17 18:24:46
 */
import ElButton from "element-plus/lib/el-button";
import {
  defineComponent,
  openBlock,
  createBlock,
  createCommentVNode,
  renderSlot,
  ref,
} from "vue";

export default defineComponent({
  name: "YyButton",
  extends: ElButton,
  props: {
    click: Function,
  },
  emits: ["click"],
  setup(props, ctx) {
    const load = ref(false);
    const handleClick = (evt) => {
      ctx.emit("click", evt);
      if (props.click) {
        load.value = true;
        Promise.resolve(props.click()).finally(() => {
          load.value = false;
        });
      }
    };
    return {
      handleClick,
      load,
    };
  },
  render(_ctx, _cache) {
    const _hoisted_1 = {
      key: 0,
      class: "el-icon-loading",
    };
    const _hoisted_2 = { key: 2 };
    return (
      openBlock(),
      createBlock(
        "button",
        {
          class: [
            "el-button",
            _ctx.type ? "el-button--" + _ctx.type : "",
            _ctx.size ? "el-button--" + _ctx.size : "",
            {
              "is-disabled": _ctx.disabled,
              "is-loading": _ctx.loading || _ctx.load,
              "is-plain": _ctx.plain,
              "is-round": _ctx.round,
              "is-circle": _ctx.circle,
            },
          ],
          disabled: _ctx.disabled || _ctx.loading,
          autofocus: _ctx.autofocus,
          type: _ctx.nativeType,
          onClick:
            _cache[1] ||
            (_cache[1] = (...args) =>
              _ctx.handleClick && _ctx.handleClick(...args)),
        },
        [
          _ctx.loading || _ctx.load
            ? (openBlock(), createBlock("i", _hoisted_1))
            : createCommentVNode("v-if", true),
          _ctx.icon && !_ctx.loading
            ? (openBlock(),
              createBlock(
                "i",
                {
                  key: 1,
                  class: _ctx.icon,
                },
                null,
                2 /* CLASS */
              ))
            : createCommentVNode("v-if", true),
          _ctx.$slots.default
            ? (openBlock(),
              createBlock("span", _hoisted_2, [
                renderSlot(_ctx.$slots, "default"),
              ]))
            : createCommentVNode("v-if", true),
        ],
        10 /* CLASS, PROPS */,
        ["disabled", "autofocus", "type"]
      )
    );
  },
});
