/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */

import ProLayout, {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
  DefaultFooter,
} from '@ant-design/pro-layout';
import React, { useEffect, useState } from 'react';
import Link from 'umi/link';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { Icon, Result, Button } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';

import RightContent from '@/components/GlobalHeader/RightContent';
import { ConnectState } from '@/models/connect';
import { UserModelState } from '@/models/user';
import { DefaultSettings } from '../../config/defaultSettings';
import { isAntDesignPro } from '@/utils/utils';
import { getCurrentUser } from '@/utils/authority'
import logo from '../assets/logo.svg';

const noMatch = (
  <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
);

export interface BasicLayoutProps extends ProLayoutProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
  settings: DefaultSettings;
  dispatch: Dispatch;
  user: UserModelState;
}
export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
};

/**
 * use Authorized check all menu item
 */

const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
  menuList.map(item => {
    const localItem = {
      ...item,
      children: item.children ? menuDataRender(item.children) : [],
    };
    return localItem;
  });



const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const { dispatch, children, user, settings, location = { pathname: '/' } } = props;
  /**
   * constructor
   */
  const [menuData, setMenuData] = useState([]);

  const footerRender: BasicLayoutProps['footerRender'] = () =>  (
    <DefaultFooter
      copyright={settings.copyrightText ? settings.copyrightText : false}
      links={ Object.entries(settings.footerLinks).map(([title, url]) => 
        ({key: title, title: title, href: url, blankTarget:true})) }
    />
  );
  


  useEffect(() => {
    const currentUser = getCurrentUser();
    const fetchOptions = currentUser.token ? 
      { headers: { 'Authorization': currentUser.token } } : {}
    fetch('/api/main_menu', fetchOptions)
      .then(response => response.json())
      .then(data => {
        setMenuData(data.menu || []);
      });

    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });

      dispatch({
        type: 'settings/fetchSettings'
      });
    }
  }, []);

  /**
   * init variables
   */
  const handleMenuCollapse = (payload: boolean): void => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  };

  return (
    <ProLayout
      logo={settings.appLogo || logo}
      menuHeaderRender={(logoDom, titleDom) => (
        <Link to="/">
          {logoDom}
          {titleDom}
        </Link>
      )}
      headerRender={user.currentUser && user.currentUser.name ? undefined : false }
      onCollapse={handleMenuCollapse}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl || menuItemProps.children) {
          return defaultDom;
        }
        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers = []) => [
        {
          path: '/',
          breadcrumbName: formatMessage({
            id: 'menu.home',
            defaultMessage: 'Home',
          }),
        },
        ...routers,
      ]}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      footerRender={footerRender}
      menuDataRender={() => menuData}
      menuRender={menuData.length>0 ? undefined : false}
      formatMessage={formatMessage}
      rightContentRender={rightProps => <RightContent {...rightProps} />}
      {...props}
      {...settings}
    >
        {children}
    </ProLayout>
  );
};

export default connect(({ global, settings, user }: ConnectState) => ({
  collapsed: global.collapsed,
  settings,
  user,
}))(BasicLayout);
