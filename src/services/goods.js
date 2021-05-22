import request from '@/utils/request';
export async function getGoods(params) {
  return request('/admin/goods',{params});

}
