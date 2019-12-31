import request from '@/utils/request';
import SERVER from './debug';

export interface PageActionParamsType {
    uuid?: string;
    payload?: object;
}

export async function queryPageLayout(path:string): Promise<any> {
    return request(SERVER + '/api/page_layout' + path);
}

export async function postPageAction(param:PageActionParamsType): Promise<any> {
    return request(SERVER + '/api/page_action', {
        method: 'POST',
        data: param,
    });
}