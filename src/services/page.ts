import request from '@/utils/request';
import SERVER from './debug';
import { currentUser } from '@/utils/authority'

export interface PageActionParamsType {
    uuid?: string;
    payload?: object;
}

export async function queryPageLayout(path:string): Promise<any> {
    let headerOptions: {headers?:Record<string, string>}  = {};
    if(currentUser.token) {
        headerOptions.headers = {
            'Authorization': currentUser.token
        }
    }
    return request(SERVER + '/api/page_layout' + path, headerOptions);
}

export async function postPageAction(param:PageActionParamsType): Promise<any> {
    let options: {headers?:Record<string, string>}  = {};
    if(currentUser.token) {
        options.headers = {
            'Authorization': currentUser.token
        }
    }
    return request(SERVER + '/api/page_action', {
        method: 'POST',
        data: param,
        ...options
    });
}