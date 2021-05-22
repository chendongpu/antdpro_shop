import request from '@/utils/request';
export async function query() {
    return request('/api/users');
}
export async function getUsers(params) {
  return request('/admin/users',{params});
}
export async function queryCurrent() {
  return request('/admin/user');

}
export async function queryNotices() {
  return request('/api/notices');
}
export async function lockUser(uid) {
    return request.patch(`/admin/users/${uid}/lock`);
}
export async function addUser(params) {
    return request.post('/admin/users',{params});
}
export async function updateUser(uid,params) {
    return request.put(`/admin/users/${uid}`,{params});
}

export async function getUser(uid) {
    return request.get(`/admin/users/${uid}`);
}