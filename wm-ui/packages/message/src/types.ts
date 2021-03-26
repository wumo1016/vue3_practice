
export type TMessageType = 'success' | 'warning' | 'info' | 'error'

export interface IMessageOptions {
  id?: string,
  message?: string,
  type?: TMessageType,
  duration?: number,
  center?: boolean,
  onClose?: () => void,
  offset?: number
}

export type IMessageParams = IMessageOptions | string
