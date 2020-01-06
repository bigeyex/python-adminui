import request from '@/utils/request';
import SERVER from './debug';

export interface LoginParamsType {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return request(SERVER + '/api/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function performLogin(params: LoginParamsType) {
  return request(SERVER + '/api/login', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(SERVER + `/api/login/captcha?mobile=${mobile}`);
}
