<template>
  <div ref="refCanvasBox" class="canvas_box" id="pfmea-function-net"></div>
</template>

<script>
import G6 from '@antv/g6'
export default {
  data() {
    return {
      mockData: {
        data: [
          { Code: 'FU', Name: '安装模具' },
          { Code: 'R/C', Name: '无缺料' }
        ],
        children: [
          {
            position: 'left',
            data: [
              { Code: 'FU', Name: '功能1' },
              { Code: 'R/C', Name: '含水率不错检' }
            ]
          },
          {
            position: 'left',
            data: [
              { Code: 'FU', Name: '功能2' },
              { Code: 'R/C', Name: '内径' }
            ]
          },
          {
            position: 'right',
            data: [
              { Code: '人', Name: '要素1' },
              { Code: 'FU', Name: '舒服' },
              { Code: 'R/C', Name: '无缺料' }
            ]
          },
          {
            position: 'right',
            data: [
              { Code: '人', Name: '要素1' },
              { Code: 'FU', Name: '舒服' },
              { Code: 'R/C', Name: '内径' }
            ]
          },
          {
            position: 'right',
            data: [
              { Code: '人', Name: '要素1' },
              { Code: 'FU', Name: '安装模具' },
              { Code: 'R/C', Name: '外径' }
            ]
          }
        ]
      }
    }
  },

  async mounted() {
    await this.$nextTick()
    this.registerFn()
    this.initCanvas(this.mockData)
  },

  methods: {
    initCanvas(nodeData) {
      const container = this.$refs.refCanvasBox
      const graph = new G6.TreeGraph({
        container: 'pfmea-function-net',
        width: container.offsetWidth,
        height: container.offsetHeight,
        modes: {
          default: ['drag-canvas', 'zoom-canvas']
        },
        defaultNode: {
          type: 'function-net-rect'
        },
        defaultEdge: {
          type: 'cubic-horizontal'
        },
        layout: {
          type: 'mindmap',
          direction: 'H',
          getVGap: d => {
            return 15
          },
          getHGap: () => {
            return 30
          },
          getHeight: d => {
            return d.data.length * 20
          },
          getWidth: d => {
            return 250
          }
        }
      })

      graph.data(nodeData)
      graph.render()
      graph.fitCenter()
    },
    registerFn() {
      G6.registerNode(
        'function-net-rect',
        {
          shapeType: 'function-net-rect',
          draw(ctx, group) {
            const data = ctx.data
            // 绘制矩形
            const rect = group.addShape('rect', {
              attrs: {
                name: 'rect',
                fill: '#fff',
                stroke: '#409EFF',
                radius: 4,
                width: 250,
                height: 10 + 20 * data.length
              }
            })
            // 绘制文本
            let h = 10
            data.map(item => {
              const style = {
                color: '#000'
              }
              const text = group.addShape('text', {
                attrs: {
                  name: 'text',
                  x: 125,
                  y: h,
                  text: (item.Code ? `${item.Code}: ` : '') + item.Name,
                  fontSize: 14,
                  textAlign: 'center',
                  textBaseline: 'top',
                  fill: style.color,
                  cursor: 'pointer'
                }
              })
              const { width, height } = text.getBBox()
              h = h + height + 5
              item.width = width
            })
            return rect
          }
        },
        'rect'
      )
    }
  }
}
</script>

<style>
html,
body {
  height: 100%;
}
* {
  padding: 0;
  margin: 0;
}

#app {
  height: 100%;
}

.canvas_box {
  height: 100%;
}
</style>