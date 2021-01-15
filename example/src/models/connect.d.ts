import type { AnyAction } from 'redux';
import type { MenuDataItem } from '@ant-design/pro-layout';
import type { RouterTypes } from 'umi';
import { GlobalModelState } from './global';
import { DefaultSettings as SettingModelState } from '../../config/defaultSettings';
import { UserModelState } from './user';
import type { StateType } from './login';

export { GlobalModelState, SettingModelState, UserModelState };

export type Loading = {
  global: boolean;
  effects: Record<string, boolean | undefined>;
  models: {
    global?: boolean;
    menu?: boolean;
    setting?: boolean;
    user?: boolean;
    login?: boolean;
  };
};

export type ConnectState = {
  global: GlobalModelState;
  loading: Loading;
  settings: SettingModelState;
  user: UserModelState;
  login: StateType;
};

export type Route = {
  routes?: Route[];
} & MenuDataItem;

/** @type T: Params matched in dynamic routing */
export type ConnectProps<T = any> = {
  dispatch?: Dispatch<AnyAction>;
} & Partial<RouterTypes<Route, T>>;
