import Vue from './core/instance/index'

window.log = console.log
window.warn = function(message){
  console.error(message)
}
window.error = function(message, vm){
  throw new Error(`${message} ${typeof vm === 'object' ? JSON.stringify(vm) : ''}`)
}

export default Vue
