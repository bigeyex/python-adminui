import request from '@/utils/request';

export interface PageActionParamsType {
    uuid?: string;
    payload?: object;
}

export async function queryPageLayout(path:string): Promise<any> {
    return request('/api/page_layout' + path);
}

export async function postPageAction(param:PageActionParamsType): Promise<any> {
    return request('/api/page_action', {
        method: 'POST',
        data: param,
    });
}