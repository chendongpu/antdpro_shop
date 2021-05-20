import request from '@/utils/request';
export async function fakeAccountLogin(params) {
  return request('/auth/login', {
    method: 'POST',
    data: params,
  });
}

export async function logout(params) {
    return request.post('/auth/logout');
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
