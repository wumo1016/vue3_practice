function getSequence(arr) {
  const result = [0] // 默认以0作为开头
  const p = arr.slice() // 拷贝一份
  const len = arr.length
  let i, j, u, v, c
  for (i = 0; i < len; i++) {
    const arrI = arr[i]
    if (arrI !== 0) {
      // 这里要和新数组的最后一项对比
      j = result[result.length - 1]
      // 当前项比新数组的最后一项大
      if (arrI > arr[j]) {
        p[i] = j // 将当前最后一项 放到p对应的索引上
        result.push(i)
        continue
      }
      // 二分查找 
      u = 0
      v = result.length - 1
      while(u < v){
        c = (u + v) / 2 | 0 // 向下取整
        if(arr[result[c]] < arrI){
          u = c + 1
        } else {
          v = c
        }
      }
      // u = v
      // 当前遇到的这个比当前数组中的那个值小
      if(arr[result[u]] > arrI){
        if(u > 0){
          p[i] = result[u - 1]
        }
        result[u] = i // 这里有可能把前面的换掉了，导致结果有问题
      }
    }
  }
  u = result.length
  v = result[u-1]
  while(u-- > 0){
    result[u] = v
    v = p[v]
  }
  return result
}

const res = getSequence([2,3,4,1,2,3,4])
console.log(res)
