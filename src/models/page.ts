import { Effect } from 'dva';
import { Dispatch, Reducer } from 'redux';
import { notification } from 'antd';
import { queryPageLayout, postPageAction } from '@/services/page';

type PageElementDataType = any;
export interface PageElement {
    id?: string;
    type: string;
    subtype?: string;
    name?: string;
    uuid: string;
    title?: string;
    content?: PageElement[];
    data?: PageElementDataType;
    value?: any;
    text?: string;
    required_message?: string;
    placeholder?: string;

    columns?: any[];
    labels?: any;
    format?: any;
    style?: any;
    row_actions?: PageElement[];
    table_actions?: PageElement[];
    filter_form?: PageElement;
    actions?: PageElement[];
    footer?: PageElement[];
    link_to?: string | null;
    max?: number; min?: number;
    tags?: boolean; multiple?: boolean;
    range?: boolean;
    url?: string;
    icon?: string;
    level?: number;
    size?: any;
    color?: string;
    tooltip?: string;
    inline?: boolean;
    show_trend?: boolean;
    interval?: number;
    visible?: boolean;

    on_submit?: string;
    on_click?: string;
    on_change?: string;
    on_data?: string;
    element?: PageElement;
}

export interface PageModelState {
    pageLayout?: {
        content: PageElement[];
    },
    modalForm?: {
        form: PageElement | null;
        modalVisible: boolean
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
        showModalForm: Reducer<PageModelState>;
        closeModalForm: Reducer<PageModelState>;
    }
}

const PageModel: PageModelType = {
    namespace: 'page',

    state: {
        pageLayout: { content: [] },
        modalForm: { form: null, modalVisible: false }
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(queryPageLayout, payload);
            if (response.error_type) {
                if (response.error_type == '403') {
                    window.location.href = '/user/login?errorTitle='+response.title+'&errorMsg='+response.message;
                }
            }
            else {
                yield put({
                    type: 'savePageLayout', 
                    payload: response,
                });
            }
            
        },

        *submitAction({ payload }, { call, put }) {
            const parseResponse:any = function*(response:PageElement) {
                if(Array.isArray(response)) {
                    for(let i=0; i<response.length; i++) {
                        yield *parseResponse(response[i]);
                    }                     
                }
                switch(response.type) {
                    case 'CombinedAction':
                        if(response.content){       
                            for(let i=0; i<response.content.length; i++) {
                                yield *parseResponse(response.content[i]);
                            }                     
                        }
                        break;
                    case 'NavigateTo':
                        window.location.href=response.url || '/';
                        break;
                    case 'Notification':
                        notification.open({ message: response.title, description: response.text });
                        break;
                    case 'UpdateElement':
                        yield put({
                            type: 'updateElement',
                            payload: {
                                id: response.id,
                                element: response
                            }
                        });
                        break;
                    case 'ReplaceElement':
                        yield put({
                            type: 'updateElement',
                            payload: {
                                id: response.id,
                                element: response.element,
                                replace: true
                            }
                        });
                        break;
                    case 'ShowModalForm':
                        yield put({
                            type: 'showModalForm',
                            payload: response
                        });
                        break;
                    case 'CloseModalForm':
                        yield put({
                            type: 'closeModalForm',
                            payload: response
                        });
                        break;
                }
            }
            const response = yield call(postPageAction, payload);
            yield *parseResponse(response);
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
                    content: switchElement(state?.pageLayout?.content || [], 
                        action.payload.uuid, action.payload.newData)
                } 
            };
        },

        updateElement(state, action) {
            const switchElement = (els:PageElement[], id:string, 
                newElement:PageElement): PageElement[] => {
                return els.map(el=>{
                    if(el.id == id) {
                        if(action.payload.replace) {
                            return newElement;
                        }
                        else {
                            return {...el, ...newElement, 'type': el.type}
                        }
                    }
                    else {
                        let newAttributes = {}
                        // some attribute have nested elements, need to recursively find id and replace content
                        const elementAttributes = ['content', 'row_actions', 'table_actions', 'footer']
                        elementAttributes.forEach(attr => {
                            if(attr in el) {
                                newAttributes[attr] = switchElement(el[attr], id, newElement);
                            }
                            
                        });
                        if(Object.keys(elementAttributes).length > 0) {
                            return {...el, ...newAttributes}
                        }
                        else {
                            return el;
                        }
                    }
                })
            }
            return {
                ...state, 
                pageLayout: {
                    content: switchElement(state?.pageLayout?.content || [], 
                        action.payload.id, action.payload.element)
                } 
            };
        },

        showModalForm(state, action) { 
            return {
                ...state,
                modalForm: { form: action.payload, modalVisible: true }
            }
        },

        closeModalForm(state) { 
            return {
                ...state,
                modalForm: { form: state!.modalForm!.form, modalVisible: false }
            }
        }
    }
}

export interface ElementProps {
    spec: PageElement;
    dispatch: Dispatch<any>;
    passDown: any;         // pass down attributes down the tree. e.g. getFieldDecorator function of the form 
                              // if the form controls are nested in containers
}

type ElementComponentCreator = ({ spec, dispatch, passDown }:ElementProps)=>any;
export let elementComponentRegistry: {[type:string]: ElementComponentCreator} = {};
export default PageModel;