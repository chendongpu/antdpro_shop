import request from '@/utils/request';
export async function getCategory() {
  return request('/admin/category');

}
export async function showCategory(id) {
    return request.get(`/admin/category/${id}`);
}

export async function addCategory(data) {
    return request.post('/admin/category',{data});
}
export async function updateCategory(id,data) {
    return request.put(`/admin/category/${id}`,{data});
}