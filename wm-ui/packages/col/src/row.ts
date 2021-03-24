import { computed, defineComponent, h } from "vue";

export default defineComponent({
    name: 'WmRow',
    props: {
        tag: {
            type: String,
            default: 'div'
        },
        gutter: {
            type: Number,
            default: 0
        },
        justify: {
            type: String,
            default: 'start'
        }
    },
    setup(props, { slots }) {
        const classs = computed(() => {
            const ret = ['wm-row']
            return ret
        })
        return () => {
            return h(props.tag, {
                class: classs.value
            }, slots.default?.())
        }
    }
})
