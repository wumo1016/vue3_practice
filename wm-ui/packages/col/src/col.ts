import { computed, defineComponent, h, inject } from "vue";

export default defineComponent({
    name: 'WmCol',
    props: {
        tag: {
            type: String,
            default: 'div'
        },
        span: {
            type: [Number, String],
            default: 24
        },
        offset: {
            type: [Number, String],
            default: 0
        }
    },
    setup(props, { slots }) {

        const gutter = inject('RowGetter', 0)

        const style = computed(() =>{
            if(gutter != 0){
                const value = gutter/2 + 'px'
                return {
                    paddingLeft: value,
                    paddingRight: value,
                }
            }
        })

        const classs = computed(() => {
            const pos = ['span', 'offset'] as const;
            const ret = ['wm-col']
            pos.forEach(item => {
                const size = props[item]
                if(!isNaN(Number(size)) && size > 0){
                    ret.push(`wm-col-${item}-${size}`)
                }
            })
            return ret
        })
        
        return () => {
            return h(props.tag, {
                class: classs.value,
                style: style.value,
            }, slots.default?.())
        }
    }
})
