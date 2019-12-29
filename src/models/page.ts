import { Effect } from 'dva';
import { Reducer } from 'redux';
import { notification } from 'antd';
import { queryPageLayout, postPageAction } from '@/services/page';

type PageElementDataType = any;
export interface PageElement {
    id?: string;
    type: string;
    name?: string;
    uuid?: string;
    title?: string;
    content?: PageElement[];
    data?: PageElementDataType;
    value?: string;
    text?: string;
    required_message?: string;
    placeholder?: string;

    columns?: any[];
    style?: any;
    row_actions?: PageElement[];
    table_actions?: PageElement[];
    footer?: PageElement[];
    link_to?: string | null;
    url?: string;
    icon?: string;
    level?: number;
    size?: number;
    tooltip?: string;
    inline?: boolean;
    show_trend?: boolean;

    on_submit?: string;
    on_click?: string;
    on_data?: string;
}

export interface PageModelState {
    pageLayout: {
        content: PageElement[];
    }
}

export interface PageModelType {
    namespace: 'page';
    state: PageModelState;
    effects: {
        fetch: Effect;
        submitAction: Effect;
        requestDataUpdate: Effect;
    };
    reducers: {
        savePageLayout: Reducer<PageModelState>;
        updateElementData: Reducer<PageModelState>;
        updateElement: Reducer<PageModelState>;
    }
}

const PageModel: PageModelType = {
    namespace: 'page',

    state: {
        pageLayout: { content: [] }
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(queryPageLayout, payload);
            yield put({
                type: 'savePageLayout', 
                payload: response,
            });
        },

        *submitAction({ payload }, { call, put }) {
            const parseResponse = (response:PageElement) => {
                switch(response.type) {
                    case 'CombinedAction':
                        if(response.content){                            
                            response.content.forEach(element => { parseResponse(element); });
                        }
                        break;
                    case 'NavigateTo':
                        window.location.href=response.url || '/';
                        break;
                    case 'Notification':
                        notification.open({ message: response.title, description: response.text });
                        break;
                }
            }
            const response = yield call(postPageAction, payload);
            parseResponse(response);
        },

        *requestDataUpdate({ payload }, { call, put }) {
            const response = yield call(postPageAction, payload);
            yield put({
                type: 'updateElementData', 
                payload: {
                    uuid: payload.uuid,
                    newData: response
                }
            });
        },
    },

    reducers: {
        savePageLayout(state, action) {
            return {
                ...state, 
                pageLayout: action.payload || {},
            };
        },

        updateElementData(state, action) {
            const switchElement = (els:PageElement[], uuid:string, 
                newData: PageElementDataType): PageElement[] => {
                return els.map(el=>{
                    if(el.uuid == uuid && el.data) {
                        return {...el, data: newData}
                    }
                    else if(el.content) {
                        return {
                            ...el, 
                            content:switchElement(el.content, uuid, newData)
                        };
                    }
                    else {
                        return el;
                    }
                })
            }

            return {
                ...state, 
                pageLayout: {
                    content: switchElement(state?.pageLayout.content || [], 
                        action.payload.uuid, action.payload.newData)
                } 
            };
        },


        // replace page element by id.
        // this is not used... yet.
        updateElement(state, action) {
            const switchElement = (els:PageElement[], id:string, 
                updater:(el:PageElement)=>PageElement): PageElement[] => {
                return els.map(el=>{
                    if(el.id == id) {
                        return updater(el);
                    }
                    else if(el.content) {
                        return {
                            ...el, 
                            content:switchElement(el.content, id, updater)
                        };
                    }
                    else {
                        return el;
                    }
                })
            }

            return {
                ...state, 
                pageLayout: {
                    content: switchElement(state?.pageLayout.content || [], 
                        action.payload.id, action.payload.updater)
                } 
            };
        }
    }
}

export default PageModel;