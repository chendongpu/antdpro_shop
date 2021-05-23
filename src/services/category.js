import request from '@/utils/request';
export async function getCategory() {
  return request('/admin/category');

}
