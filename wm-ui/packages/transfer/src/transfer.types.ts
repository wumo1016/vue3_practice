export type Key = string | number
export type DataItem = {
  key: Key,
  label: string,
  disabled: boolean
}

export type Props = {
  key: Key,
  label: string,
  disabled: string
}

export interface ITransferProps {
  data: DataItem[],
  modelValue: Key[],
  props: Props
}