import request from '@/utils/request';
export async function ossConfig() {
  return request('/auth/oss/token');

}