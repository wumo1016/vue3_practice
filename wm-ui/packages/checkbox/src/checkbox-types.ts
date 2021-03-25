
export interface ICheckboxProps {
  indeterminate?: boolean, // 是否单选
  checked?: boolean, // 是否选中
  name?: string, // 原生name
  disabled?: boolean, // 是否禁用
  label?: string | number | boolean, // group使用
  modelValue?: string | number | boolean // 绑定的值
}
