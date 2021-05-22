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
