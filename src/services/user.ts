import request from '@/utils/request';
import SERVER from './debug';

export async function query(): Promise<any> {
  return request(SERVER + '/api/users');
}

export async function queryCurrent(): Promise<any> {
  return request(SERVER + '/api/currentUser');
}

export async function queryNotices(): Promise<any> {
  return request(SERVER + '/api/notices');
}
