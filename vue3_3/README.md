## 编译过程
- 先将模板进行分析 生成对应的ast语法树 
- 做转化流程 transform 对动态节点做一些标记 指令 插槽 事件 属性等 patchFlag
- 生成代码字符串 codegen 

## Block概念 -> Block tree
- diff 算法的特点是递归遍历 每次比较同一层
- 能收集动态子节点的就是Block节点(有dynamicChildren属性)
- block的作用就是收集动态节点 dynamicChildren (将所有children都放到dynamicChildren中，无论多深都拍平)
- 在_createVNode的时候会判断节点是否是动态的 如果是就让外层的Block收集起来
- 会影响解构的都会标记为block节点  v-if v-else v-for(序列不稳定)
- 多个block组成的树
- 最终在 patch中会调用 patchBlockChildren

## patchFlag 对不同的动态节点进行标识
- 例如在patchElement中针对props判断，要么直接比对所有props，要么值比较class或style等

## 性能优化
- 1.静态节点 如果连续静态节点过多(>=9) 就会将其提取 直接使用 _createStaticVNode 创建
- 2.事件缓存 将事件处理函数存储起来
