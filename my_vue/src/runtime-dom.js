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
  hostPatchProps(el, key, value){
    if(/^on[a-z]+/i.test(key)){ // 事件
      const eventName = key.slice(2).toLowerCase()
      el.addEventListener(eventName, value)
    } else {
      if(key === 'style'){
        for (const k in value) {
          el.style[k] = value[k]
        }
      } else { // id class
        el.setAttribute(key, value)
      }
    }
  },
}
