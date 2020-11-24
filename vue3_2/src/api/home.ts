import axios from './index'

export function getSlider<T>() {
  return axios.get<T, T>('/slider/list')
}
