import request from '@/utils/request';
import { getCurrentUser } from '@/utils/authority'

export interface PageActionParamsType {
    uuid?: string;
    payload?: object;
}

export async function queryPageLayout(path:string): Promise<any> {
    let headerOptions: {headers?:Record<string, string>}  = {};
    const currentUser = getCurrentUser();
    if(currentUser.token) {
        headerOptions.headers = {
            'Authorization': currentUser.token
        }
    }
    return request('/api/page_layout' + path, headerOptions);
}

export async function postPageAction(param:PageActionParamsType): Promise<any> {
    let options: {headers?:Record<string, string>}  = {};
    const currentUser = getCurrentUser();
    if(currentUser.token) {
        options.headers = {
            'Authorization': currentUser.token
        }
    }
    return request('/api/page_action', {
        method: 'POST',
        data: param,
        ...options
    });
}

export async function querySettings(): Promise<any> {
    return request('/api/app_settings');
  }
  