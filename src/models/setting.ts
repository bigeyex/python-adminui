import { Reducer } from 'redux';
import { Effect } from 'dva';
import defaultSettings, { DefaultSettings } from '../../config/defaultSettings';
import { querySettings } from '../services/page';
import default_logo from '../assets/logo.svg';

export interface SettingModelType {
  namespace: 'settings';
  state: DefaultSettings;
  effects: {
    fetchSettings: Effect;
  }
  reducers: {
    changeSetting: Reducer<DefaultSettings>;
  };
}

const updateColorWeak: (colorWeak: boolean) => void = colorWeak => {
  const root = document.getElementById('root');
  if (root) {
    root.className = colorWeak ? 'colorWeak' : '';
  }
};

const SettingModel: SettingModelType = {
  namespace: 'settings',
  state: defaultSettings,
  effects: {
    *fetchSettings(_, { call, put }) {
      const settings = yield call(querySettings);
      if(settings.logo === null) {
        settings.logo = default_logo;
      }
      yield put({
        type: 'changeSetting',
        payload: settings,
      });
    },
  },
  reducers: {
    changeSetting(state = defaultSettings, { payload }) {
      const { colorWeak, contentWidth } = payload;

      if (state.contentWidth !== contentWidth && window.dispatchEvent) {
        window.dispatchEvent(new Event('resize'));
      }
      updateColorWeak(!!colorWeak);
      return {
        ...state,
        ...payload,
      };
    },
  },
};
export default SettingModel;
