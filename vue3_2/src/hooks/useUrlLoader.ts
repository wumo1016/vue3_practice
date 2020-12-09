import axios from 'axios'
import { ref } from 'vue'

export default function useUrlLoader(url: string) {
  const result = ref(null)
  const loading = ref(true)
  const loaded = ref(false)
  const error = ref(null)
  axios
    .get(url)
    .then(res => {
      loaded.value = true
      result.value = res.data
    })
    .catch(e => {
      error.value = e
    })
    .finally(() => {
      loading.value = false
    })
  return {
    result,
    loading,
    loaded,
    error
  }
}
