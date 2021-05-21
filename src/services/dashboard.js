import request from '@/utils/request';
export async function fetchDashboard() {
  return request('/admin/index');

}
