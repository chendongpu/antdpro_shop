import request from '@/utils/request';
export async function fakeAccountLogin(data) {
  return request('/auth/login', {
    method: 'POST',
    data,
  });
}

export async function logout(params) {
    return request.post('/auth/logout');
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
