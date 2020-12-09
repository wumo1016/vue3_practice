// import { onMounted, onUnmounted, reactive, ref } from 'vue'
// export default function useMousePosition() {
//   const x = ref(0)
//   const y = ref(0)
//   const upadteMouse = (e: MouseEvent) => {
//     x.value = e.pageX
//     y.value = e.pageY
//   }
//   onMounted(() => {
//     document.addEventListener('click', upadteMouse)
//   })
//   onUnmounted(() => {
//     document.removeEventListener('click', upadteMouse)
//   })
//   return {
//     x,
//     y
//   }
// }

import { onMounted, onUnmounted, reactive, toRefs } from 'vue'
export default function useMousePosition() {
  const data = reactive({
    x: 0,
    y: 0
  })
  const upadteMouse = (e: MouseEvent) => {
    data.x = e.pageX
    data.y = e.pageY
  }
  onMounted(() => {
    document.addEventListener('click', upadteMouse)
  })
  onUnmounted(() => {
    document.removeEventListener('click', upadteMouse)
  })
  return {
    ...toRefs(data)
  }
}
