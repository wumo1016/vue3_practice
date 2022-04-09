// 节点相关常量
export const enum NODE {
  width = 150, // 节点宽
  height = 30, // 节点宽
  downHSpace = 40, // 向下节点水平间距
  rightHSpace = 30, // 向右节点水平间距
  verticalSpace = 20 // 节点垂直间距
}
// 节点样式
export interface INodeStyle {
  color: string // 字体颜色
  bgColor: string // 背景颜色
  bColor: string // 边框颜色
  fontSize: number // 字体大小
  symbol: string // 符号文本连接符
}
// 节点展开方向
export const enum NODE_DIRECTION {
  down = 'DOWN',
  right = 'RIGHT'
}
// 节点数据
export interface INodeData {
  Oid: string
  Name: string
  Direction: NODE_DIRECTION // 展开方向
  Expand: boolean // 是否展开
  Children: INodeData[]
  x: number
  y: number
  [key: string]: any
}
// 节点
export interface INode {
  id: string
  x: number
  y: number
  [key: string]: any
}
// 边
export interface IEdge {
  source: string
  target: string
  rightLength?: number
  downLength?: number
  rightIndex?: number
  downIndex?: number
  [key: string]: any
}
