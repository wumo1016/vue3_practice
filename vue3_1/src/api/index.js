import { request } from '@/utils/axios'

export function getPlanList() {
  return request({
    url: '/plan',
    method: 'get'
  })
}

export function addPlanList(data) {
  return request({
    url: '/plan',
    method: 'post',
    data
  })
}

export function deletePlanList(id) {
  return request({
    url: '/plan',
    method: 'delete',
    parsms: { id }
  })
}
