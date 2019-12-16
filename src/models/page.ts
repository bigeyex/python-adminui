import { Effect } from 'dva';
import { Reducer } from 'redux';

import { queryPageLayout, postPageAction } from '@/services/page';

export interface Element {
    type: string;
    name?: string;
    uuid?: string;
    title?: string;
    content?: Element[];
    data?: any;
    requiredMessage?: string;
    placeholder?: string;

    columns?: [];
    style?: string;
    row_actions?: Element[];
    table_actions?: Element[];
    link_to?: string | null;
    icon?: string;
}

export interface PageModelState {
    pageLayout: {
        content: Element[];
    }
}

export interface PageModelType {
    namespace: 'page';
    state: PageModelState;
    effects: {
        fetch: Effect;
        submitAction: Effect;
    };
    reducers: {
        savePageLayout: Reducer<PageModelState>;
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
            yield call(postPageAction, payload);
        }
    },

    reducers: {
        savePageLayout(state, action) {
            return {
                ...state, 
                pageLayout: action.payload || {},
            };
        },

        updateElement(state, action) {
            //TODO: return the state with updated element 
            return state || { pageLayout: { content: [] } };
        }
    }
}

export default PageModel;