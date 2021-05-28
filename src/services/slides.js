import request from '@/utils/request';

export async function getSlides(params) {
  return request('/admin/slides',{params});
}

export async function changeStatus(id) {
    return request.patch(`/admin/slides/${id}/status`);
}
export async function addSlides(data) {
    return request.post('/admin/slides',{data});
}
export async function updateSlides(id,data) {
    return request.put(`/admin/slides/${id}`,{data});
}

export async function deleteSlides(id) {
    return request.delete(`/admin/slides/${id}`);
}

export async function showSlides(id) {
    return request.get(`/admin/slides/${id}`);
}