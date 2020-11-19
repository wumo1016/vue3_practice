// 运行时的包 dom操作

export const nodeOps = {
  insert(child, parent, anchor){
    if(anchor){
      parent.insertBefore(child, anchor)
    } else {
      parent.appendChild(child)
    }
  },
  remove(child){
    const parent = child.parentNode
    parent && parent.removeChild(child)
  },
  createElement(tag){
    return document.createElement(tag)
  },
  hostSetElementText(el, text){
    el.textContent = text
  },
  hostPatchProps(el, key, prevProps, nextProps){
    if(/^on[a-z]+/i.test(key)){ // 事件
      const eventName = key.slice(2).toLowerCase()
      // 更新事件
      prevProps && el.removeEventListener(eventName, prevProps)
      nextProps && el.addEventListener(eventName, nextProps)
    } else {
      if(nextProps == null){
        return el.removeAttribute(key) // 删除元素上的属性
      }
      if(key === 'style'){
        for (const k in nextProps) {
          el.style[k] = nextProps[k]
        }
        for (const k in prevProps) {
          if(!nextProps.hasOwnProperty(k)){
            el.style[k] = null
          }
        }
      } else { // id class
        el.setAttribute(key, nextProps)
      }
    }
  },
}
