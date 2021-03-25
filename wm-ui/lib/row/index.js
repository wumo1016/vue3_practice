import { defineComponent, provide, computed, h } from 'vue';

var Row = defineComponent({
    name: 'WmRow',
    props: {
        tag: {
            type: String,
            default: 'div'
        },
        gutter: {
            type: [Number, String],
            default: 0
        },
        justify: {
            type: String,
            default: 'start'
        }
    },
    setup(props, { slots }) {
        provide('RowGetter', props.gutter); // 提供给所有子组件
        const classs = computed(() => {
            const ret = [
                'wm-row',
                props.justify != 'start' ? `is-justify-${props.justify}` : ''
            ];
            return ret;
        });
        const style = computed(() => {
            if (props.gutter != 0) {
                const value = -(Number(props.gutter) / 2) + 'px';
                return {
                    marginLeft: value,
                    marginRight: value,
                };
            }
        });
        return () => {
            return h(props.tag, {
                class: classs.value,
                style: style.value,
            }, slots.default?.());
        };
    }
});

Row.install = (app) => {
    app.component(Row.name, Row);
};

export default Row;
