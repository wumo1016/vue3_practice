import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

// https://vue-next-template-explorer.netlify.app/ 以下代码编译而来

/* 案例1 */
{/* <div>
  {{name}}
</div>
<p>
  {{age}}
<span>{{age}}</span>
</p> */}
/* 案例2 */
{/* <template>
  <div v-if="flag">
    <p>hello</p>
    <div>{{ name }}</div>
  </div>
  <div v-else>
    <div>{{ name }}</div>
    <p>hello</p>
  </div>
</template> */}


// import { createVNode as _createVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createBlock as _createBlock, createCommentVNode as _createCommentVNode } from "vue"

// export function render(_ctx, _cache, $props, $setup, $data, $options) {
//   return (_openBlock(), _createBlock("template", null, [
//     (_ctx.flag)
//       ? (_openBlock(), _createBlock("div", { key: 0 }, [
//           _createVNode("p", null, "hello"),
//           _createVNode("div", null, _toDisplayString(_ctx.name), 1 /* TEXT */)
//         ]))
//       : (_openBlock(), _createBlock("div", { key: 1 }, [
//           _createVNode("div", null, _toDisplayString(_ctx.name), 1 /* TEXT */),
//           _createVNode("p", null, "hello")
//         ]))
//   ]))
// }


// console.log(render({ name: 'zf', age: 123 }));

// Check the console for the AST
