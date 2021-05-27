import request from '@/utils/request';
export async function getOrders(params) {
  return request('/admin/orders',{params:{...params,include:'goods,user,orderDetails'}});
}

export async function showOrders(id) {
    return request.get(`/admin/orders/${id}?include=goods,user,orderDetails`);
}

export async function postOrders(id,data) {
    return request.patch(`/admin/orders/${id}/post`,{data});
}