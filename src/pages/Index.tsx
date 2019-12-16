import React, { Component } from 'react';
import { Dispatch, AnyAction } from 'redux';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { Card, Typography, Alert } from 'antd';
import { connect } from 'dva';
import { PageModelState } from '@/models/page';
import FormPart from './pageParts/form';
import renderElements from './pageParts/element'
import {RouteComponentProps, withRouter} from "react-router";


type PageProps = RouteComponentProps & {
  dispatch: Dispatch<AnyAction>,
  spec: PageModelState
}



class AdminPage extends Component<PageProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'page/fetch',
      payload: location.pathname
    });
  }

  componentDidUpdate(prevProps:any) {
    if(this.props.location != prevProps.location) {
      this.props.dispatch({
        type: 'page/fetch',
        payload: location.pathname
      });
    }
  }

  render() {
    const { spec, dispatch } = this.props;

    let pageElements:[JSX.Element?] = [];
    if(spec.pageLayout.content) {
      pageElements = renderElements(spec.pageLayout.content, dispatch);
    }

    return (
      <PageHeaderWrapper>
        {pageElements}
      </PageHeaderWrapper>
    )
  }
}

export default connect(({ page }:{ page: PageModelState }) =>
      ({ spec:page }))(withRouter(AdminPage));
