import request from '@/utils/request';
export async function getUsers(params) {
  return request('/admin/users',{params});
}
export async function queryCurrent() {
  return request('/admin/user');

}
export async function queryNotices() {
  return request('/api/notices');
}
