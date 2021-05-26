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
export async function addGoods(data) {
    return request.post('/admin/goods',{data});
}

export async function showGoods(id) {
    return request.get(`/admin/goods/${id}?include=category`);
}

export async function updateGoods(id,data) {
    return request.put(`/admin/goods/${id}`,{data});
}