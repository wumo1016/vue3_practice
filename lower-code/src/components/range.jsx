import { defineComponent, computed } from 'vue'

export default defineComponent({
  props: {
    start: {
      type: Number
    },
    end: {
      type: Number
    }
  },
  emits: ['update:start', 'update:end'],
  setup(props, ctx) {
    const start = computed({
      get() {
        return props.start
      },
      set(value) {
        ctx.emit('update:start', value)
      }
    })

    const end = computed({
      get() {
        return props.end
      },
      set(value) {
        ctx.emit('update:end', value)
      }
    })

    return () => (
      <div class="range">
        <input type="text" v-model={start.value} />
        <span>~</span>
        <input type="text" v-model={end.value} />
      </div>
    )
  }
})
