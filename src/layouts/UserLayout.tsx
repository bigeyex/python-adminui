import { DefaultFooter, MenuDataItem, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet } from 'react-helmet';
import Link from 'umi/link';
import React, {useEffect} from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import { DefaultSettings } from '../../config/defaultSettings';
import SelectLang from '@/components/SelectLang';
import { ConnectProps, ConnectState } from '@/models/connect';
import logo from '../assets/logo.svg';
import styles from './UserLayout.less';

export interface UserLayoutProps extends ConnectProps {
  breadcrumbNameMap: { [path: string]: MenuDataItem };
  settings: DefaultSettings
}

const UserLayout: React.SFC<UserLayoutProps> = props => {
  const {
    settings,
    dispatch,
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    breadcrumb,
    formatMessage,
    ...props,
  });

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'settings/fetchSettings'
      });
    }
  }, []);


  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={settings.appLogo || logo} />
                <span className={styles.title}>{settings.title}</span>
              </Link>
            </div>
          </div>
          {children}
        </div>
        <DefaultFooter 
          copyright={settings.copyrightText ? settings.copyrightText : false}
          links={ Object.entries(settings.footerLinks).map(([title, url]) => 
            ({key: title, title: title, href: url, blankTarget:true})) }
        />
      </div>
    </>
  );
};

export default connect(({ settings }: ConnectState) => ({
  ...settings,settings
}))(UserLayout);
