import request from '@/utils/request';
export async function getGoods(params) {
  return request('/admin/goods',{params});

}

export async function isOn(goodsid) {
    return request.patch(`/admin/goods/${goodsid}/on`);
}
export async function isRecommend(goodsid) {
    return request.patch(`/admin/goods/${goodsid}/recommend`);
}
export async function addGoods(params) {
    return request.post('/admin/goods',{params});
}

export async function showGoods(id) {
    return request.get(`/admin/goods/${id}?include=category`);
}

export async function updateGoods(id,params) {
    return request.put(`/admin/goods/${id}`,{params});
}