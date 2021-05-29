import request from '@/utils/request';
export async function getComments(params) {
  return request('/admin/comments',{params:{...params,include:'goods,user'}});
}

export async function showComments(id) {
    return request.get(`/admin/comments/${id}?include=goods,user`);
}

export async function replyComments(id,data) {
    return request.patch(`/admin/comments/${id}/reply`,{data});
}